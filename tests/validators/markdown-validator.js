/**
 * Validateur de Drafts Markdown
 * Vérifie la structure et la cohérence des fichiers .md des modules
 */

const fs = require('fs');
const path = require('path');

class MarkdownValidator {
    constructor(filePath) {
        this.filePath = filePath;
        this.content = '';
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        try {
            this.content = fs.readFileSync(this.filePath, 'utf-8');
            
            this.checkStructure();
            this.checkMissions();
            this.checkDuplicateOptions();
            this.checkKeywords();
            this.checkAmbiguousQuestions();
            
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

    checkStructure() {
        // Vérifier présence Meta
        if (!this.content.includes('## Meta')) {
            this.errors.push('Section Meta manquante');
        }

        // Vérifier présence des missions
        const missionMatches = this.content.match(/## Mission \d+/g);
        if (!missionMatches || missionMatches.length !== 5) {
            this.errors.push(`Nombre de missions incorrect: ${missionMatches?.length || 0}/5`);
        }
    }

    checkMissions() {
        const missions = this.content.split(/## Mission \d+/).slice(1);
        
        missions.forEach((mission, idx) => {
            const missionNum = idx + 1;
            
            // Vérifier Index technique
            if (!mission.includes('### Index technique')) {
                this.errors.push(`Mission ${missionNum}: Index technique manquant`);
            }

            // Compter les écrans
            const screens = mission.match(/### Ecran \d+/g);
            if (!screens || screens.length !== 15) {
                this.errors.push(`Mission ${missionNum}: ${screens?.length || 0} écrans au lieu de 15`);
            }

            // Vérifier que le dernier écran est un Boss
            if (screens && screens.length > 0) {
                const lastScreenContent = mission.split(/### Ecran \d+/).pop();
                if (!lastScreenContent.includes('challenge') && !lastScreenContent.includes('Boss')) {
                    this.warnings.push(`Mission ${missionNum}: Écran 15 devrait être un Boss/challenge`);
                }
            }
        });
    }

    checkDuplicateOptions() {
        const interactiveBlocks = this.content.split(/### Ecran \d+ - interactive/);
        
        interactiveBlocks.forEach((block, idx) => {
            if (idx === 0) return; // Skip avant premier écran
            
            const optionsMatch = block.match(/- Options: (.+)/);
            if (optionsMatch) {
                const options = optionsMatch[1].split('" / "')
                    .map(opt => opt.replace(/^"|"$/g, '').trim());
                
                const unique = [...new Set(options)];
                if (options.length !== unique.length) {
                    const screenMatch = block.match(/^([^\n]+)/);
                    this.errors.push(`Options dupliquées détectées: ${screenMatch ? screenMatch[1] : 'écran inconnu'}`);
                }
            }
        });
    }

    checkKeywords() {
        const writeBlocks = this.content.split(/### Ecran \d+ - (write|challenge)/);
        
        for (let i = 1; i < writeBlocks.length; i += 2) {
            const block = writeBlocks[i + 1];
            if (!block) continue;

            const hasKeywords = block.includes('- Requirements:') && 
                               (block.includes('keywords:') || block.includes('minWords:'));
            
            if (!hasKeywords) {
                const screenMatch = block.match(/^([^\n]+)/);
                this.warnings.push(`Écran write/challenge sans keywords: ${screenMatch ? screenMatch[1] : 'inconnu'}`);
            }
        }
    }

    checkAmbiguousQuestions() {
        const forbiddenPhrases = [
            { phrase: 'Quel mot est un Verbe ?', suggestion: 'Utiliser "Quel mot indique l\'action"' },
            { phrase: 'Quel mot est un verbe ?', suggestion: 'Utiliser "Quel mot indique l\'action"' }
        ];

        forbiddenPhrases.forEach(({ phrase, suggestion }) => {
            // Recherche exacte avec le point d'interrogation pour éviter les faux positifs
            if (this.content.includes(phrase)) {
                this.warnings.push(`Question ambiguë détectée: "${phrase}" → ${suggestion}`);
            }
        });
    }
}

module.exports = MarkdownValidator;
