/**
 * Validateur de Synchronisation
 * Vérifie que les HTML correspondent bien aux drafts Markdown
 */

const fs = require('fs');
const path = require('path');

class SyncValidator {
    constructor(draftPath, htmlDir) {
        this.draftPath = draftPath;
        this.htmlDir = htmlDir;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        try {
            const draftContent = fs.readFileSync(this.draftPath, 'utf-8');
            const missions = this.extractMissionsFromDraft(draftContent);

            for (let i = 1; i <= 5; i++) {
                const htmlPath = path.join(this.htmlDir, `mission_${i}.html`);
                if (!fs.existsSync(htmlPath)) {
                    this.errors.push(`Mission ${i}: Fichier HTML manquant`);
                    continue;
                }

                const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
                const weekData = this.extractWeekDataFromHtml(htmlContent);
                
                if (!weekData) {
                    this.errors.push(`Mission ${i}: Impossible d'extraire weekData`);
                    continue;
                }

                this.compareMission(i, missions[i - 1], weekData);
            }

            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur validation sync: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: [] };
        }
    }

    extractMissionsFromDraft(content) {
        const missions = [];
        const missionBlocks = content.split(/## Mission \d+/).slice(1);

        missionBlocks.forEach(block => {
            const screens = [];
            const screenBlocks = block.split(/### Ecran \d+/).slice(1);

            screenBlocks.forEach(screenBlock => {
                const titleMatch = screenBlock.match(/- ([a-z]+) - (.+)/);
                const questionMatch = screenBlock.match(/- Question: "(.+?)"/);
                const optionsMatch = screenBlock.match(/- Options: (.+)/);
                const reponseMatch = screenBlock.match(/- Reponse: "(.+?)"/);
                
                if (titleMatch) {
                    const screen = {
                        type: titleMatch[1],
                        title: titleMatch[2],
                        question: questionMatch ? questionMatch[1] : null
                    };

                    // Extraire les options pour interactive
                    if (optionsMatch && titleMatch[1] === 'interactive') {
                        screen.options = optionsMatch[1]
                            .split('" / "')
                            .map(opt => opt.replace(/^"|"$/g, '').trim());
                        screen.answer = reponseMatch ? reponseMatch[1] : null;
                    }

                    screens.push(screen);
                }
            });

            missions.push(screens);
        });

        return missions;
    }

    extractWeekDataFromHtml(content) {
        const match = content.match(/(const|var)\s+weekData\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
        if (!match) return null;

        try {
            const isolatedCode = `(function() { ${match[0]} return weekData; })()`;
            const data = eval(isolatedCode);
            
            // Extraire les steps si la structure est { id, steps }
            if (Array.isArray(data) && data[0] && Array.isArray(data[0].steps)) {
                return data[0].steps;
            } else if (Array.isArray(data)) {
                return data;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    compareMission(missionNum, draftScreens, htmlSteps) {
        // Vérifier le nombre d'écrans
        if (!draftScreens || draftScreens.length !== htmlSteps.length) {
            this.warnings.push(
                `Mission ${missionNum}: Nombre d'écrans différent (draft: ${draftScreens?.length || 0}, HTML: ${htmlSteps.length})`
            );
            return;
        }

        // Comparer chaque écran
        draftScreens.forEach((screen, idx) => {
            const step = htmlSteps[idx];

            // Vérifier type
            if (screen.type !== step.type) {
                this.warnings.push(
                    `Mission ${missionNum}, Écran ${idx + 1}: Type différent (draft: ${screen.type}, HTML: ${step.type})`
                );
            }

            // Vérifier title
            const normalizedDraftTitle = this.normalizeText(screen.title);
            const normalizedHtmlTitle = this.normalizeText(step.title);
            
            if (normalizedDraftTitle !== normalizedHtmlTitle) {
                this.warnings.push(
                    `Mission ${missionNum}, Écran ${idx + 1}: Titre différent\n  Draft: "${screen.title}"\n  HTML: "${step.title}"`
                );
            }

            // Vérifier question pour interactive/write/challenge
            if (screen.question && step.question) {
                const draftQ = this.normalizeText(screen.question);
                const htmlQ = this.normalizeText(this.stripHtml(step.question));
                
                // Tolérance : Ignorer si la différence est < 20% (balises HTML, reformulations mineures)
                const similarity = this.calculateSimilarity(draftQ, htmlQ);
                if (similarity < 0.8) {
                    this.warnings.push(
                        `Mission ${missionNum}, Écran ${idx + 1}: Question significativement différente (similarité: ${Math.round(similarity * 100)}%)`
                    );
                }
            }

            // Vérifier options pour interactive
            if (screen.type === 'interactive' && screen.options && step.options) {
                if (screen.options.length !== step.options.length) {
                    this.warnings.push(
                        `Mission ${missionNum}, Écran ${idx + 1}: Nombre d'options différent (draft: ${screen.options.length}, HTML: ${step.options.length})`
                    );
                } else {
                    // Comparer chaque option
                    screen.options.forEach((opt, optIdx) => {
                        const draftOpt = this.normalizeText(opt);
                        const htmlOpt = this.normalizeText(step.options[optIdx]);
                        if (draftOpt !== htmlOpt) {
                            this.warnings.push(
                                `Mission ${missionNum}, Écran ${idx + 1}, Option ${optIdx + 1}: Contenu différent`
                            );
                        }
                    });
                }

                // Vérifier que la bonne réponse correspond
                if (screen.answer && step.answer !== undefined) {
                    const draftAnswerIdx = screen.options.findIndex(opt => 
                        this.normalizeText(opt) === this.normalizeText(screen.answer)
                    );
                    if (draftAnswerIdx !== -1 && draftAnswerIdx !== step.answer) {
                        this.errors.push(
                            `Mission ${missionNum}, Écran ${idx + 1}: Index de réponse incorrect (draft veut "${screen.answer}", HTML pointe vers "${step.options[step.answer]}")`
                        );
                    }
                }
            }
        });
    }

    stripHtml(text) {
        if (!text) return '';
        return text
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&eacute;/g, 'é')
            .replace(/&egrave;/g, 'è')
            .replace(/&agrave;/g, 'à')
            .replace(/&ccedil;/g, 'ç')
            .trim();
    }

    calculateSimilarity(str1, str2) {
        // Calcul de similarité simple (ratio de Levenshtein simplifié)
        if (str1 === str2) return 1.0;
        
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        // Compter les caractères communs
        let matches = 0;
        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }
        
        return matches / longer.length;
    }

    normalizeText(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .replace(/[éèêë]/g, 'e')
            .replace(/[àâä]/g, 'a')
            .replace(/[ôö]/g, 'o')
            .replace(/[ùûü]/g, 'u')
            .replace(/[ïî]/g, 'i')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '');
    }
}

module.exports = SyncValidator;
