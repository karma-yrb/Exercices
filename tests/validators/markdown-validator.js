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
        this.expectedMissions = 5;
        this.expectedScreens = 15;
    }

    validate() {
        try {
            this.content = fs.readFileSync(this.filePath, 'utf-8');
            this.loadExpectations();
            
            this.checkStructure();
            this.checkPedagogicalEvidence();
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
        const missionMatches = this.content.match(/## (?:Mission|S(?:e|é)ance) \d+/g);
        if (!missionMatches || missionMatches.length !== this.expectedMissions) {
            this.errors.push(`Nombre de missions incorrect: ${missionMatches?.length || 0}/${this.expectedMissions}`);
        }
    }

    extractMetaSection() {
        const metaStart = this.content.search(/^## Meta\s*$/im);
        if (metaStart === -1) return '';

        const afterMeta = this.content.slice(metaStart + this.content.slice(metaStart).match(/^## Meta\s*$/im)[0].length);
        const nextHeadingMatch = afterMeta.match(/\n##\s+/);
        if (!nextHeadingMatch) return afterMeta;
        return afterMeta.slice(0, nextHeadingMatch.index);
    }

    checkPedagogicalEvidence() {
        const metaSection = this.extractMetaSection();
        if (!metaSection) return;

        const agentMatch = metaSection.match(/-\s*AgentPedago\s*:\s*(.+)/i);
        const sourcesMatch = metaSection.match(/-\s*SourcesPedago\s*:\s*(.+)/i);
        const cardsMatch = metaSection.match(/-\s*CartesLocalLibrary\s*:\s*(.+)/i);

        if (!agentMatch) {
            this.errors.push('Meta: AgentPedago manquant (preuve d\'usage agent)');
        }

        if (!sourcesMatch) {
            this.errors.push('Meta: SourcesPedago manquant (preuve d\'usage SDV)');
        } else {
            const sources = sourcesMatch[1];
            if (!/CURRICULUM/i.test(sources) || !/PROGRESS/i.test(sources)) {
                this.errors.push('Meta: SourcesPedago doit contenir CURRICULUM et PROGRESS');
            }
        }

        if (!cardsMatch) {
            this.errors.push('Meta: CartesLocalLibrary manquant (preuve d\'usage local_library)');
        } else {
            const cards = cardsMatch[1];
            if (!/local_library\/cards\//i.test(cards.replace(/\\/g, '/'))) {
                this.errors.push('Meta: CartesLocalLibrary doit pointer vers local_library/cards/');
            }
        }
    }

    checkMissions() {
        const missions = this.content.split(/## (?:Mission|S(?:e|é)ance) \d+/).slice(1);
        
        missions.forEach((mission, idx) => {
            const missionNum = idx + 1;
            
            // Vérifier Index technique
            if (!mission.includes('### Index technique')) {
                this.errors.push(`Mission ${missionNum}: Index technique manquant`);
            }

            // Compter les écrans
            const screens = mission.match(/### (?:Ecran|Écran) \d+/g);
            if (!screens || screens.length !== this.expectedScreens) {
                this.errors.push(`Mission ${missionNum}: ${screens?.length || 0} écrans au lieu de ${this.expectedScreens}`);
            }

            // Vérifier que le dernier écran est un Boss
            if (screens && screens.length > 0 && this.expectedScreens >= 15) {
                const lastScreenContent = mission.split(/### (?:Ecran|Écran) \d+/).pop();
                if (!lastScreenContent.includes('challenge') && !lastScreenContent.includes('Boss')) {
                    this.warnings.push(`Mission ${missionNum}: Écran 15 devrait être un Boss/challenge`);
                }
            }
        });
    }

    loadExpectations() {
        const metaSection = this.extractMetaSection();
        if (!metaSection) return;

        const missionsMatch = metaSection.match(/-\s*(?:Missions|Seances|Séances)\s*:\s*(\d+)/i);
        const screensMatch = metaSection.match(/-\s*ScreensPer(?:Mission|Seance|Séance)\s*:\s*(\d+)/i);

        if (!missionsMatch) {
            this.errors.push('Meta: Missions ou Seances manquant (nombre attendu obligatoire)');
        } else {
            this.expectedMissions = parseInt(missionsMatch[1], 10);
        }

        if (!screensMatch) {
            this.errors.push('Meta: ScreensPerMission ou ScreensPerSeance manquant');
        } else {
            this.expectedScreens = parseInt(screensMatch[1], 10);
        }
    }

    checkDuplicateOptions() {
        const interactiveBlocks = this.content.split(/### (?:Ecran|Écran) \d+ - interactive/);
        
        interactiveBlocks.forEach((block, idx) => {
            if (idx === 0) return; // Skip avant premier écran
            
            const optionsMatch = block.match(/-\s*Options\s*:\s*(.+)/);
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
        const writeBlocks = this.content.split(/### (?:Ecran|Écran) \d+ - (write|challenge)/);
        
        for (let i = 1; i < writeBlocks.length; i += 2) {
            const block = writeBlocks[i + 1];
            if (!block) continue;

            const hasRequirements = /Requirements\s*:/i.test(block);
            const hasKeywords = /keywords\s*:/i.test(block)
                || /keywordGroups\s*:/i.test(block)
                || /minWords\s*:/i.test(block);
            
            if (!(hasRequirements && hasKeywords)) {
                const screenMatch = block.match(/^([^\n]+)/);
                this.warnings.push(`Écran write/challenge sans keywords: ${screenMatch ? screenMatch[1] : 'inconnu'}`);
            }
        }
    }

    checkAmbiguousQuestions() {
        const forbiddenPhrases = [
            { phrase: "quel mot est L'Agent", suggestion: 'Utiliser "Quel mot est le sujet ?"' },
            { phrase: 'Quel mot indique l\'action', suggestion: 'Utiliser "Quel mot est le verbe ?"' },
            { phrase: 'ordre S+V+C', suggestion: 'Utiliser "ordre sujet + verbe + complément"' },
            { phrase: 'ordre S + V + C', suggestion: 'Utiliser "ordre sujet + verbe + complément"' },
            { phrase: 'phrases S+V+C', suggestion: 'Utiliser "phrases avec sujet, verbe et complément"' },
            { phrase: 'phrase S+V+C', suggestion: 'Utiliser "phrase avec sujet, verbe et complément"' },
            { phrase: 'L\'Agent (Sujet)', suggestion: 'Utiliser directement "Le sujet"' },
            { phrase: 'L\'Action (Verbe)', suggestion: 'Utiliser directement "Le verbe"' },
            { phrase: 'L\'Objectif (Complément)', suggestion: 'Utiliser directement "Le complément"' },
            { phrase: 'flux de données', suggestion: 'Formuler la consigne en français clair (sujet, verbe, complément)' }
        ];

        forbiddenPhrases.forEach(({ phrase, suggestion }) => {
            if (this.content.includes(phrase)) {
                this.warnings.push(`Question ambiguë détectée: "${phrase}" → ${suggestion}`);
            }
        });
    }
}

module.exports = MarkdownValidator;
