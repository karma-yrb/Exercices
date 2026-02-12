/**
 * Validateur de synchronisation.
 * Verifie que les HTML correspondent aux drafts markdown.
 */

const fs = require('fs');
const path = require('path');
const { extractWeekDataFromContent } = require('./weekdata-parser');

class SyncValidator {
    constructor(draftPath, htmlDir) {
        this.draftPath = draftPath;
        this.htmlDir = htmlDir;
        this.errors = [];
        this.warnings = [];
        this.expectedMissions = 5;
    }

    validate() {
        try {
            const draftContent = fs.readFileSync(this.draftPath, 'utf-8');
            this.loadExpectations(draftContent);
            const missions = this.extractMissionsFromDraft(draftContent);

            for (let i = 1; i <= this.expectedMissions; i++) {
                const htmlPath = path.join(this.htmlDir, `mission_${i}.html`);
                if (!fs.existsSync(htmlPath)) {
                    this.errors.push(`Mission ${i}: Fichier HTML manquant`);
                    continue;
                }

                const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
                const parsed = extractWeekDataFromContent(htmlContent);
                if (parsed.error || !parsed.steps) {
                    this.errors.push(`Mission ${i}: Impossible d'extraire weekData`);
                    continue;
                }

                this.compareMission(i, missions[i - 1], parsed.steps);
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
            const screenBlocks = block.split(/### (?:Ecran|Écran|Ã‰cran) \d+/).slice(1);

            screenBlocks.forEach(screenBlock => {
                const titleMatch = screenBlock.match(/- ([a-z]+) - (.+)/i);
                const questionMatch = screenBlock.match(/- Question:\s*(.+)/i);
                const optionsMatch = screenBlock.match(/- Options: (.+)/i);
                const reponseMatch = screenBlock.match(/- Reponse: "(.+?)"/i);

                if (!titleMatch) return;

                const screen = {
                    type: (titleMatch[1] || '').toLowerCase(),
                    title: (titleMatch[2] || '').trim(),
                    question: questionMatch ? this.cleanDraftQuestion(questionMatch[1]) : null
                };

                if (optionsMatch && screen.type === 'interactive') {
                    screen.options = optionsMatch[1]
                        .split('" / "')
                        .map(opt => opt.replace(/^"|"$/g, '').trim());
                    screen.answer = reponseMatch ? reponseMatch[1] : null;
                }

                screens.push(screen);
            });

            missions.push(screens);
        });

        return missions;
    }

    loadExpectations(content) {
        const metaMatch = content.split('## Meta')[1];
        if (!metaMatch) return;

        const missionsMatch = metaMatch.match(/-\s*Missions:\s*(\d+)/i);
        if (missionsMatch) this.expectedMissions = parseInt(missionsMatch[1], 10);
    }

    compareMission(missionNum, draftScreens, htmlSteps) {
        if (!draftScreens || draftScreens.length !== htmlSteps.length) {
            this.warnings.push(
                `Mission ${missionNum}: Nombre d'ecrans different (draft: ${draftScreens?.length || 0}, HTML: ${htmlSteps.length})`
            );
            return;
        }

        draftScreens.forEach((screen, idx) => {
            const step = htmlSteps[idx] || {};

            if (screen.type !== step.type) {
                this.warnings.push(
                    `Mission ${missionNum}, Ecran ${idx + 1}: Type different (draft: ${screen.type}, HTML: ${step.type})`
                );
            }

            const normalizedDraftTitle = this.normalizeText(screen.title);
            const normalizedHtmlTitle = this.normalizeText(step.title);
            if (normalizedDraftTitle !== normalizedHtmlTitle) {
                this.warnings.push(
                    `Mission ${missionNum}, Ecran ${idx + 1}: Titre different\n  Draft: "${screen.title}"\n  HTML: "${step.title}"`
                );
            }

            if (screen.question && step.question) {
                const rawDraftQ = this.cleanDraftQuestion(screen.question);
                const rawHtmlQ = this.cleanDraftQuestion(this.stripHtml(step.question));

                const draftInstruction = this.normalizeQuestion(this.extractInstruction(rawDraftQ));
                const htmlInstruction = this.normalizeQuestion(this.extractInstruction(rawHtmlQ));

                if (draftInstruction !== htmlInstruction) {
                    const draftQ = this.normalizeQuestion(rawDraftQ);
                    const htmlQ = this.normalizeQuestion(rawHtmlQ);

                    if (draftQ !== htmlQ) {
                        const similarity = this.calculateSimilarity(draftQ, htmlQ);
                        if (similarity < 0.6) {
                            this.warnings.push(
                                `Mission ${missionNum}, Ecran ${idx + 1}: Question significativement differente (similarite: ${Math.round(similarity * 100)}%)`
                            );
                        }
                    }
                }
            }

            if (screen.type === 'interactive' && screen.options && step.options) {
                if (screen.options.length !== step.options.length) {
                    this.warnings.push(
                        `Mission ${missionNum}, Ecran ${idx + 1}: Nombre d'options different (draft: ${screen.options.length}, HTML: ${step.options.length})`
                    );
                } else {
                    screen.options.forEach((opt, optIdx) => {
                        const draftOpt = this.normalizeText(opt);
                        const htmlOpt = this.normalizeText(step.options[optIdx]);
                        if (draftOpt !== htmlOpt) {
                            this.warnings.push(
                                `Mission ${missionNum}, Ecran ${idx + 1}, Option ${optIdx + 1}: Contenu different`
                            );
                        }
                    });
                }

                if (screen.answer && step.answer !== undefined) {
                    const draftAnswerIdx = screen.options.findIndex(opt =>
                        this.normalizeText(opt) === this.normalizeText(screen.answer)
                    );
                    if (draftAnswerIdx !== -1 && draftAnswerIdx !== step.answer) {
                        this.errors.push(
                            `Mission ${missionNum}, Ecran ${idx + 1}: Index de reponse incorrect (draft veut "${screen.answer}", HTML pointe vers "${step.options[step.answer]}")`
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

    cleanDraftQuestion(text) {
        if (!text) return '';
        return text.toString().trim().replace(/^"+/, '').replace(/"+$/, '').trim();
    }

    extractInstruction(text) {
        const cleaned = this.cleanDraftQuestion(text);
        const parenPos = cleaned.indexOf('(');
        if (parenPos > 0) return cleaned.slice(0, parenPos).trim();
        return cleaned;
    }

    calculateSimilarity(str1, str2) {
        if (str1 === str2) return 1.0;

        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) return 1.0;

        let matches = 0;
        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }

        return matches / longer.length;
    }

    normalizeText(text) {
        if (!text) return '';

        const mojibakeFixed = text
            .replace(/Ã©/g, 'é')
            .replace(/Ã¨/g, 'è')
            .replace(/Ãª/g, 'ê')
            .replace(/Ã«/g, 'ë')
            .replace(/Ã /g, 'à')
            .replace(/Ã¢/g, 'â')
            .replace(/Ã¤/g, 'ä')
            .replace(/Ã´/g, 'ô')
            .replace(/Ã¶/g, 'ö')
            .replace(/Ã¹/g, 'ù')
            .replace(/Ã»/g, 'û')
            .replace(/Ã¼/g, 'ü')
            .replace(/Ã¯/g, 'ï')
            .replace(/Ã®/g, 'î')
            .replace(/Ã§/g, 'ç');

        return mojibakeFixed
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[()"]/g, '')
            .replace(/[^a-z0-9]/g, '');
    }

    normalizeQuestion(text) {
        if (!text) return '';
        return this.normalizeText(text.replace(/"/g, ' '));
    }
}

module.exports = SyncValidator;
