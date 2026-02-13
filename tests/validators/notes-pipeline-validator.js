const fs = require('fs');
const path = require('path');

class NotesPipelineValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        const reportsDir = path.join(this.rootDir, 'local_library', 'reports');
        const overridesPath = path.join(reportsDir, 'notes_overrides.json');
        const masterPath = path.join(reportsDir, 'notes_master.json');

        if (!fs.existsSync(overridesPath) || !fs.existsSync(masterPath)) {
            this.warnings.push('Notes pipeline non present localement (fichiers ignores): test saute');
            return { valid: true, errors: this.errors, warnings: this.warnings };
        }

        let overrides;
        let master;
        try {
            overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf-8').replace(/^\uFEFF/, ''));
            master = JSON.parse(fs.readFileSync(masterPath, 'utf-8').replace(/^\uFEFF/, ''));
        } catch (e) {
            this.errors.push(`JSON notes invalide: ${e.message}`);
            return { valid: false, errors: this.errors, warnings: this.warnings };
        }

        const manualEntries = Array.isArray(overrides.manual_entries) ? overrides.manual_entries.filter(e => e && e.keep !== false) : [];
        const generatedEntries = Array.isArray(master.entries) ? master.entries : [];

        if (master.source !== 'manual_entries') {
            this.errors.push('notes_master.json: source doit etre "manual_entries"');
        }

        if (manualEntries.length !== generatedEntries.length) {
            this.errors.push(`notes_master.json: nb entrees incoherent (${generatedEntries.length} vs ${manualEntries.length})`);
        }

        for (let i = 1; i < generatedEntries.length; i += 1) {
            if (generatedEntries[i - 1].date < generatedEntries[i].date) {
                this.errors.push('notes_master.json: tri date desc invalide');
                break;
            }
        }

        generatedEntries.forEach((entry, idx) => {
            ['id', 'date', 'subject', 'learner', 'note_raw'].forEach((field) => {
                if (!Object.prototype.hasOwnProperty.call(entry, field)) {
                    this.errors.push(`notes_master.json: entree ${idx} champ manquant (${field})`);
                }
            });
        });

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings
        };
    }
}

module.exports = NotesPipelineValidator;
