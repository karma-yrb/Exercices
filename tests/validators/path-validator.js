/**
 * Validateur de chemins
 * Bloque les liens de navigation interdits (ex: ../Exercices/)
 */

const fs = require('fs');
const path = require('path');

class PathValidator {
    constructor(htmlDir) {
        this.htmlDir = htmlDir;
        this.errors = [];
        this.warnings = [];
        this.forbidden = ['../Exercices/'];
    }

    validate() {
        try {
            if (!fs.existsSync(this.htmlDir)) {
                this.warnings.push(`Dossier HTML introuvable: ${this.htmlDir}`);
                return { valid: true, errors: [], warnings: this.warnings };
            }

            const files = fs.readdirSync(this.htmlDir)
                .filter(file => file.endsWith('.html'))
                .map(file => path.join(this.htmlDir, file));

            files.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                this.forbidden.forEach(forbiddenPath => {
                    if (content.includes(forbiddenPath)) {
                        this.errors.push(`Chemin interdit detecte: ${forbiddenPath} dans ${path.basename(filePath)}`);
                    }
                });
            });

            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur validation chemins: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: [] };
        }
    }
}

module.exports = PathValidator;
