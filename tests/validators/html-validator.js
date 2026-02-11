/**
 * Validateur HTML
 * Vérifie la cohérence des fichiers mission HTML avec les drafts
 */

const fs = require('fs');
const path = require('path');

class HtmlValidator {
    constructor(filePath) {
        this.filePath = filePath;
        this.content = '';
        this.errors = [];
        this.warnings = [];
        this.weekData = null;
        this.expectedSteps = 15;
    }

    validate() {
        try {
            this.content = fs.readFileSync(this.filePath, 'utf-8');
            
            this.extractWeekData();
            if (!this.weekData) {
                this.errors.push('Impossible d\'extraire weekData');
                return { valid: false, errors: this.errors, warnings: [] };
            }

            this.checkStepsCount();
            this.checkDuplicateOptions();
            this.checkAnswerValidity();
            this.checkRequiredFields();
            
            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur lecture fichier: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: [] };
        }
    }

    extractWeekData() {
        // Extraire le tableau weekData depuis le script
        // Format attendu: const/var weekData = [{ id: 1, steps: [...] }]
        const match = this.content.match(/(const|var)\s+weekData\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
        if (!match) {
            this.errors.push('weekData non trouvé dans le fichier');
            return;
        }

        try {
            // Utiliser eval dans un contexte isolé pour supporter les template literals
            const isolatedCode = `(function() { ${match[0]} return weekData; })()`;
            const data = eval(isolatedCode);
            
            // weekData est un tableau avec un objet contenant steps
            if (Array.isArray(data) && data[0] && Array.isArray(data[0].steps)) {
                this.weekData = data[0].steps;
                if (Number.isInteger(data[0].expectedSteps)) {
                    this.expectedSteps = data[0].expectedSteps;
                }
            } else if (Array.isArray(data)) {
                // Si c'est déjà un tableau de steps directement
                this.weekData = data;
            } else {
                this.errors.push('Structure weekData invalide');
            }
        } catch (e) {
            this.errors.push(`Parsing weekData échoué: ${e.message}`);
        }
    }

    checkStepsCount() {
        if (!this.weekData) return;
        
        if (this.weekData.length !== this.expectedSteps) {
            this.errors.push(`Nombre de steps incorrect: ${this.weekData.length}/${this.expectedSteps}`);
        }
    }

    checkDuplicateOptions() {
        if (!this.weekData) return;

        this.weekData.forEach((step, idx) => {
            const opts = step.options || step.opts;
            if (step.type === 'interactive' && opts) {
                const unique = [...new Set(opts)];
                if (opts.length !== unique.length) {
                    this.errors.push(`Step ${idx + 1} (${step.title}): Options dupliquées`);
                }
            }
        });
    }

    checkAnswerValidity() {
        if (!this.weekData) return;

        this.weekData.forEach((step, idx) => {
            if (step.type === 'interactive') {
                const answer = (step.answer !== undefined) ? step.answer : (step.a !== undefined ? step.a : step.correct);
                const opts = step.options || step.opts;
                if (answer === undefined) {
                    this.errors.push(`Step ${idx + 1} (${step.title}): Réponse manquante`);
                } else if (opts && (answer < 0 || answer >= opts.length)) {
                    this.errors.push(`Step ${idx + 1} (${step.title}): Index de réponse invalide (${answer})`);
                }
            }
        });
    }

    checkRequiredFields() {
        if (!this.weekData) return;

        this.weekData.forEach((step, idx) => {
            // Tous les types doivent avoir title
            if (!step.title || step.title.trim() === '') {
                const hasFallback = !!(step.q || step.question || step.body || step.text);
                if (hasFallback) {
                    this.warnings.push(`Step ${idx + 1}: Titre manquant`);
                } else {
                    this.errors.push(`Step ${idx + 1}: Titre manquant`);
                }
            }

            // Les types interactifs/write doivent avoir question
            if (['interactive', 'write', 'challenge'].includes(step.type)) {
                const question = step.question || step.q;
                if (!question || question.trim() === '') {
                    this.errors.push(`Step ${idx + 1} (${step.title}): Question manquante`);
                }

                // Feedback obligatoire
                const feedback = step.feedback || step.feed;
                if (!feedback || feedback.trim() === '') {
                    this.warnings.push(`Step ${idx + 1} (${step.title}): Feedback manquant`);
                }
            }

            // Les write/challenge doivent avoir requirements
            if (['write', 'challenge'].includes(step.type)) {
                if (!step.requirements || !step.requirements.keywords) {
                    this.warnings.push(`Step ${idx + 1} (${step.title}): Keywords manquants`);
                }
            }
        });
    }
}

module.exports = HtmlValidator;
