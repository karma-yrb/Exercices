/**
 * Validateur des pages checkpoint (pauses entre seances).
 * Ce ne sont pas des SPA weekData : on valide existence + navigation.
 */

const fs = require('fs');
const path = require('path');

class CheckpointValidator {
    constructor(draftPath, htmlDir) {
        this.draftPath = draftPath;
        this.htmlDir = htmlDir;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        try {
            if (!fs.existsSync(this.htmlDir)) {
                this.warnings.push(`Dossier HTML introuvable: ${this.htmlDir}`);
                return { valid: true, errors: [], warnings: this.warnings };
            }

            const draftMentions = this.countDraftCheckpoints();
            const checkpointFiles = this.listCheckpointFiles();
            const missionLinks = this.collectMissionCheckpointLinks();

            if (draftMentions === 0 && checkpointFiles.length === 0) {
                return { valid: true, errors: [], warnings: [] };
            }

            if (draftMentions > 0 && checkpointFiles.length < draftMentions) {
                this.errors.push(
                    `Draft annonce ${draftMentions} checkpoint(s) mais ${checkpointFiles.length} fichier(s) checkpoint_*.html trouve(s)`
                );
            }

            if (checkpointFiles.length > draftMentions && draftMentions > 0) {
                this.warnings.push(
                    `${checkpointFiles.length} fichier(s) checkpoint_*.html pour ${draftMentions} mention(s) dans le draft`
                );
            }

            checkpointFiles.forEach(fileName => {
                this.validateCheckpointFile(fileName, missionLinks);
            });

            Object.entries(missionLinks).forEach(([target, sources]) => {
                const targetPath = path.join(this.htmlDir, target);
                if (!fs.existsSync(targetPath)) {
                    this.errors.push(
                        `Lien cassé vers ${target} depuis ${sources.join(', ')}`
                    );
                }
            });

            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur validation checkpoints: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: this.warnings };
        }
    }

    countDraftCheckpoints() {
        if (!fs.existsSync(this.draftPath)) return 0;
        const content = fs.readFileSync(this.draftPath, 'utf-8');
        const indexHits = content.match(/^\s*\d+\.\s*checkpoint\b/gim) || [];
        const screenHits = content.match(/###\s+(?:Ecran|Écran|Ã‰cran)\s+\d+\s+-\s*checkpoint\b/gi) || [];
        return Math.max(indexHits.length, screenHits.length);
    }

    listCheckpointFiles() {
        return fs.readdirSync(this.htmlDir)
            .filter(file => /^checkpoint_\d+\.html$/i.test(file))
            .sort((a, b) => {
                const na = parseInt(a.match(/(\d+)/)[1], 10);
                const nb = parseInt(b.match(/(\d+)/)[1], 10);
                return na - nb;
            });
    }

    collectMissionCheckpointLinks() {
        const links = {};
        const missionFiles = fs.readdirSync(this.htmlDir)
            .filter(file => /^mission_\d+\.html$/i.test(file));

        missionFiles.forEach(fileName => {
            const content = fs.readFileSync(path.join(this.htmlDir, fileName), 'utf-8');
            const matches = content.matchAll(
                /(?:href|location\.href)\s*=\s*['"](checkpoint_\d+\.html)['"]/gi
            );
            for (const match of matches) {
                const target = match[1].toLowerCase();
                if (!links[target]) links[target] = [];
                if (!links[target].includes(fileName)) links[target].push(fileName);
            }
        });

        return links;
    }

    validateCheckpointFile(fileName, missionLinks) {
        const filePath = path.join(this.htmlDir, fileName);
        const content = fs.readFileSync(filePath, 'utf-8');
        const key = fileName.toLowerCase();

        if (!missionLinks[key] || missionLinks[key].length === 0) {
            this.warnings.push(
                `${fileName}: aucun lien entrant depuis une mission_*.html`
            );
        }

        const continueTargets = [...content.matchAll(
            /(?:href|location\.href)\s*=\s*['"]([^'"]+\.html)['"]/gi
        )].map(match => match[1]);

        if (continueTargets.length === 0) {
            this.errors.push(`${fileName}: aucun lien de continuation (.html)`);
            return;
        }

        continueTargets.forEach(target => {
            if (target.includes('://') || target.startsWith('/')) return;
            const resolved = path.join(this.htmlDir, target);
            if (!fs.existsSync(resolved)) {
                this.errors.push(`${fileName}: lien cassé vers ${target}`);
            }
        });

        if (!/btn-main|CONTINUER|continuer/i.test(content)) {
            this.warnings.push(`${fileName}: bouton CONTINUER non detecte`);
        }
    }
}

module.exports = CheckpointValidator;
