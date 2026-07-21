/**
 * Validateur FR dedie.
 * Verifie que les regles FR critiques sont implementees et bien chargees.
 */

const fs = require('fs');
const path = require('path');
const { extractWeekDataFromContent } = require('./weekdata-parser');

class FrQualityValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        this.checkFrValidatorImplementation();
        this.checkFrenchMissionIntegration();

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings
        };
    }

    checkFrValidatorImplementation() {
        const validatorPath = path.join(this.rootDir, 'assets', 'lovyc', 'fr_validator.js');
        if (!fs.existsSync(validatorPath)) {
            this.errors.push('FR validator manquant: assets/lovyc/fr_validator.js');
            return;
        }

        const content = fs.readFileSync(validatorPath, 'utf-8');
        const requiredChecks = [
            {
                label: 'Detection oralite',
                pattern: /detectOralRegisterIssue/
            },
            {
                label: 'Regle y\'a -> il y a',
                pattern: /source:\s*["']y'a["'][\s\S]*expected:\s*["']il y a["']/
            },
            {
                label: 'Majuscule initiale',
                pattern: /Commence ta phrase par une majuscule/
            },
            {
                label: 'Ponctuation finale',
                pattern: /Ajoute un point final/
            },
            {
                label: 'Plugin expose',
                pattern: /window\.FrValidator/
            },
            {
                label: 'Validation plugin async',
                pattern: /validate:\s*async function/
            }
        ];

        requiredChecks.forEach(check => {
            if (!check.pattern.test(content)) {
                this.errors.push(`fr_validator.js: regle manquante (${check.label})`);
            }
        });

        if (!/api\.languagetool\.org\/v2\/check/.test(content)) {
            this.warnings.push('fr_validator.js: endpoint LanguageTool introuvable (verification orthographe/grammaire)');
        }
    }

    checkFrenchMissionIntegration() {
        const frRoot = path.join(this.rootDir, 'Lovyc', 'Francais');
        if (!fs.existsSync(frRoot)) {
            this.warnings.push('Dossier FR introuvable: Lovyc/Francais');
            return;
        }

        const missionFiles = this.findMissionFiles(frRoot);
        missionFiles.forEach(filePath => {
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = extractWeekDataFromContent(content);
            const relative = path.relative(this.rootDir, filePath).replace(/\\/g, '/');

            if (parsed.error) {
                this.errors.push(`${relative}: weekData non lisible (${parsed.error})`);
                return;
            }

            const steps = Array.isArray(parsed.steps) ? parsed.steps : [];
            const needsFrValidator = steps.some(step => ['write', 'challenge'].includes(step.type));
            const hasFrValidatorScript = /fr_validator\.js/i.test(content);

            if (needsFrValidator && !hasFrValidatorScript) {
                this.errors.push(`${relative}: write/challenge present sans chargement fr_validator.js`);
            }
        });
    }

    findMissionFiles(startDir) {
        const files = [];

        const walk = (dirPath) => {
            const entries = fs.readdirSync(dirPath, { withFileTypes: true });
            entries.forEach(entry => {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    walk(fullPath);
                    return;
                }
                if (/^mission_\d+\.html$/i.test(entry.name)) {
                    files.push(fullPath);
                }
            });
        };

        walk(startDir);
        return files;
    }
}

module.exports = FrQualityValidator;
