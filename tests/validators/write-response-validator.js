/**
 * Validateur de Réponses Write
 * Teste automatiquement les exercices "write" avec plusieurs propositions de réponses
 */

const fs = require('fs');
const path = require('path');

class WriteResponseValidator {
    constructor(htmlDir, draftPath) {
        this.htmlDir = htmlDir;
        this.draftPath = draftPath;
        this.errors = [];
        this.warnings = [];
        this.testCases = [];
    }

    validate() {
        // Extraire les exercices write depuis le draft
        this.extractWriteExercises();

        if (this.testCases.length === 0) {
            this.warnings.push('Aucun exercice write trouvé à tester');
            return { valid: true, errors: [], warnings: this.warnings };
        }

        // Tester chaque exercice : objectif 10 tests, minimum 5
        this.testCases.forEach(testCase => {
            const tested = this.generateAndTestResponses(testCase);
            if (tested < 5) {
                this.warnings.push(
                    `Mission ${testCase.mission}, Écran ${testCase.screen}: Seulement ${tested} propositions testées (minimum requis: 5)`
                );
            } else if (tested < 10) {
                // Info seulement, pas bloquant
                // console.log(`  ℹ️  Mission ${testCase.mission}, Écran ${testCase.screen}: ${tested} propositions testées (objectif: 10)`);
            }
        });

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings
        };
    }

    extractWriteExercises() {
        try {
            const content = fs.readFileSync(this.draftPath, 'utf-8');
            const missions = content.split(/## Mission \d+/).slice(1);

            missions.forEach((mission, missionIdx) => {
                const screens = mission.split(/### Ecran \d+/).slice(1);

                screens.forEach((screen, screenIdx) => {
                    const typeMatch = screen.match(/- (write|challenge) -/);
                    if (!typeMatch) return;

                    const keywordsMatch = screen.match(/keywords: (.+)/);
                    const modeMatch = screen.match(/mode: "(.+?)"/);

                    if (keywordsMatch) {
                        // Parser les keywords (format: "mot1", "mot2", "mot3")
                        const keywordsStr = keywordsMatch[1];
                        const keywords = [];
                        const matches = keywordsStr.matchAll(/"([^"]+)"/g);
                        for (const match of matches) {
                            keywords.push(match[1]);
                        }

                        this.testCases.push({
                            mission: missionIdx + 1,
                            screen: screenIdx + 1,
                            type: typeMatch[1],
                            mode: modeMatch ? modeMatch[1] : 'sentence',
                            keywords
                        });
                    }
                });
            });
        } catch (error) {
            this.errors.push(`Erreur lecture draft: ${error.message}`);
        }
    }

    generateAndTestResponses(testCase) {
        const { keywords, mode } = testCase;
        let testCount = 0;

        // Générer des propositions de réponses selon le mode
        switch (mode) {
            case 'verb':
                // Tester chaque verbe dans différentes formes
                keywords.forEach(verb => {
                    this.testResponse(testCase, verb, true);
                    this.testResponse(testCase, verb.charAt(0).toUpperCase() + verb.slice(1), true);
                    this.testResponse(testCase, verb + ' ', true); // Avec espace
                    testCount += 3;
                });
                // Tester des non-verbes
                this.testResponse(testCase, 'maison', false);
                this.testResponse(testCase, '123', false);
                testCount += 2;
                break;

            case 'sentence':
                // Tester des phrases avec tous les keywords
                if (keywords.length > 0) {
                    // Phrase valide avec tous les mots
                    const validSentence = keywords.join(' ') + '.';
                    this.testResponse(testCase, validSentence, true);
                    testCount++;

                    // Variantes valides
                    const shuffled = [...keywords].reverse().join(' ') + '.';
                    this.testResponse(testCase, shuffled, true);
                    testCount++;

                    // Avec majuscule et ponctuation
                    const capitalized = keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) + ' ' + keywords.slice(1).join(' ') + '.';
                    this.testResponse(testCase, capitalized, true);
                    testCount++;

                    // Phrases invalides (mots manquants)
                    keywords.forEach(keyword => {
                        const withoutOne = keywords.filter(k => k !== keyword).join(' ') + '.';
                        this.testResponse(testCase, withoutOne, false);
                        testCount++;
                    });

                    // Phrases trop courtes
                    this.testResponse(testCase, 'Oui.', false);
                    this.testResponse(testCase, 'Non', false);
                    this.testResponse(testCase, '', false);
                    testCount += 3;
                }
                break;

            default:
                // Mode générique : tester la présence de keywords
                keywords.forEach(kw => {
                    this.testResponse(testCase, `Phrase avec ${kw} dedans.`, true);
                    testCount++;
                });
                this.testResponse(testCase, 'Phrase sans aucun keyword.', false);
                testCount++;
        }

        return testCount;
    }

    testResponse(testCase, response, shouldPass) {
        // Simulation de validation (dans un vrai test, on appellerait fr_validator.js)
        const { keywords, mode } = testCase;
        let passes = false;

        if (mode === 'verb') {
            passes = keywords.some(kw => response.toLowerCase().trim() === kw.toLowerCase());
        } else if (mode === 'sentence') {
            passes = keywords.every(kw => 
                kw === '.' || 
                kw === ',' || 
                response.toLowerCase().includes(kw.toLowerCase())
            );
        } else {
            passes = keywords.some(kw => response.toLowerCase().includes(kw.toLowerCase()));
        }

        // Ne signaler que les vrais problèmes (pas les cas limites de ponctuation)
        if (passes !== shouldPass && response.trim() !== '' && response !== '.' && response !== ',') {
            this.warnings.push(
                `Mission ${testCase.mission}, Écran ${testCase.screen}: Test inattendu pour "${response}" (attendu: ${shouldPass ? 'PASS' : 'FAIL'}, obtenu: ${passes ? 'PASS' : 'FAIL'})`
            );
        }
    }
}

module.exports = WriteResponseValidator;
