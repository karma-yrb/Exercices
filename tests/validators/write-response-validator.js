/**
 * Validateur de reponses write.
 * Simule localement les contraintes pedagogiques declarees dans le draft.
 */

const fs = require('fs');

class WriteResponseValidator {
    constructor(htmlDir, draftPath) {
        this.htmlDir = htmlDir;
        this.draftPath = draftPath;
        this.errors = [];
        this.warnings = [];
        this.testCases = [];
    }

    validate() {
        this.extractWriteExercises();

        if (this.testCases.length === 0) {
            return { valid: true, errors: [], warnings: [] };
        }

        this.testCases.forEach(testCase => {
            const tested = this.generateAndTestResponses(testCase);
            if (tested < 5) {
                this.warnings.push(
                    `Mission ${testCase.mission}, Ecran ${testCase.screen}: Seulement ${tested} propositions testees (minimum requis: 5)`
                );
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
            const missionBlocks = content.split(/## Mission \d+/).slice(1);

            missionBlocks.forEach((missionBlock, missionIdx) => {
                const screenBlocks = missionBlock.split(/### (?:Ecran|Écran|Ã‰cran) \d+/).slice(1);

                screenBlocks.forEach((screenBlock, screenIdx) => {
                    const typeMatch = screenBlock.match(/- (write|challenge) -/i);
                    if (!typeMatch) return;

                    const modeMatch = screenBlock.match(/mode:\s*"(.+?)"/i);
                    const keywordsLine = screenBlock.match(/keywords:\s*(.+)/i);
                    const mustIncludeLine = screenBlock.match(/mustInclude:\s*(.+)/i);
                    const minWordsMatch = screenBlock.match(/minWords:\s*(\d+)/i);
                    const enforceMatch = screenBlock.match(/enforceKeywords:\s*(true|false)/i);

                    const keywords = this.parseQuotedList(keywordsLine ? keywordsLine[1] : '');
                    const mustInclude = this.parseQuotedList(mustIncludeLine ? mustIncludeLine[1] : '');

                    if (keywords.length === 0 && mustInclude.length === 0 && !minWordsMatch) return;

                    this.testCases.push({
                        mission: missionIdx + 1,
                        screen: screenIdx + 1,
                        type: typeMatch[1].toLowerCase(),
                        mode: modeMatch ? modeMatch[1].toLowerCase() : 'sentence',
                        keywords,
                        mustInclude,
                        enforceKeywords: enforceMatch ? enforceMatch[1].toLowerCase() === 'true' : false,
                        minWords: minWordsMatch ? parseInt(minWordsMatch[1], 10) : 0
                    });
                });
            });
        } catch (error) {
            this.errors.push(`Erreur lecture draft: ${error.message}`);
        }
    }

    parseQuotedList(line) {
        if (!line) return [];
        const items = [];
        const matches = line.matchAll(/"([^"]+)"/g);
        for (const match of matches) {
            items.push(match[1]);
        }
        return items;
    }

    generateAndTestResponses(testCase) {
        const { keywords, mode, enforceKeywords, mustInclude, minWords } = testCase;
        let testCount = 0;

        if (mode === 'verb') {
            keywords.forEach(verb => {
                this.testResponse(testCase, verb, true);
                this.testResponse(testCase, verb.toUpperCase(), true);
                this.testResponse(testCase, `${verb} `, true);
                testCount += 3;
            });
            this.testResponse(testCase, 'maison', false);
            this.testResponse(testCase, '123', false);
            this.testResponse(testCase, 'deux mots', false);
            return testCount + 3;
        }

        const minWordsTarget = Math.max(minWords || 0, 10);
        const filler = ['delta', 'sigma', 'kappa', 'vecteur', 'module', 'phrase', 'niveau', 'applique', 'corrige', 'structure'];

        const buildSentence = ({
            includeAllKeywords = false,
            includeAnyKeyword = true,
            includeMust = true,
            words = minWordsTarget,
            appendTerminal = true
        }) => {
            const parts = [];

            if (includeAllKeywords) {
                parts.push(...keywords);
            } else if (includeAnyKeyword && keywords.length > 0) {
                parts.push(keywords[0]);
            }

            if (includeMust) {
                mustInclude.forEach(token => {
                    if (!parts.includes(token)) parts.push(token);
                });
            }

            while (this.countWords(parts.join(' ')) < words) {
                parts.push(filler[parts.length % filler.length]);
            }

            let sentence = parts.join(' ');
            if (appendTerminal && !/[.!?]$/.test(sentence) && !sentence.includes('.')) {
                sentence += '.';
            }
            return sentence;
        };

        const valid = buildSentence({
            includeAllKeywords: enforceKeywords,
            includeAnyKeyword: keywords.length > 0,
            includeMust: true
        });
        this.testResponse(testCase, valid, true);
        testCount++;

        const validCaps = valid.charAt(0).toUpperCase() + valid.slice(1);
        this.testResponse(testCase, validCaps, true);
        testCount++;

        if (enforceKeywords && keywords.length > 1) {
            const missingOne = buildSentence({
                includeAllKeywords: true,
                includeAnyKeyword: true,
                includeMust: true
            }).replace(new RegExp(`(^|[^\\p{L}\\p{N}'-])${this.escapeRegex(this.normalizeText(keywords[0]))}([^\\p{L}\\p{N}'-]|$)`, 'iu'), ' ');
            this.testResponse(testCase, missingOne, false);
            testCount++;
        }

        mustInclude.forEach(token => {
            let withoutMust = buildSentence({
                includeAllKeywords: enforceKeywords,
                includeAnyKeyword: keywords.length > 0,
                includeMust: true,
                appendTerminal: token !== '.'
            });
            while (withoutMust.includes(token)) {
                withoutMust = withoutMust.replace(token, '');
            }
            this.testResponse(testCase, withoutMust, false);
            testCount++;
        });

        if (minWords > 1) {
            const tooShort = buildSentence({
                includeAllKeywords: enforceKeywords,
                includeAnyKeyword: keywords.length > 0,
                includeMust: true,
                words: Math.max(1, minWords - 1)
            });
            this.testResponse(testCase, tooShort, false);
            testCount++;
        }

        this.testResponse(testCase, 'Oui.', false);
        this.testResponse(testCase, 'Non', false);
        this.testResponse(testCase, '', false);
        testCount += 3;

        return testCount;
    }

    normalizeText(text) {
        return (text || '')
            .toString()
            .trim()
            .replace(/[’`]/g, "'")
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    countWords(text) {
        const words = this.normalizeText(text).match(/[\p{L}\p{N}'-]+/gu);
        return words ? words.length : 0;
    }

    escapeRegex(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    tokenIsLexical(token) {
        return /[\p{L}\p{N}]/u.test(token);
    }

    hasToken(response, token) {
        const rawText = this.normalizeText(response);
        const rawToken = this.normalizeText(token);
        if (!rawToken) return false;

        if (this.tokenIsLexical(rawToken)) {
            const escaped = this.escapeRegex(rawToken);
            const pattern = new RegExp(`(^|[^\\p{L}\\p{N}'-])${escaped}([^\\p{L}\\p{N}'-]|$)`, 'iu');
            return pattern.test(rawText);
        }

        return rawText.includes(rawToken);
    }

    evaluateResponse(testCase, response) {
        const { mode, keywords, enforceKeywords, minWords, mustInclude } = testCase;
        const trimmed = (response || '').trim();

        if (!trimmed) return false;
        if (trimmed.length < 2) return false;

        if (mode === 'verb') {
            if (trimmed.includes(' ')) return false;
            return keywords.some(kw => this.normalizeText(kw) === this.normalizeText(trimmed));
        }

        if (mode === 'sentence' && trimmed.length < 10) return false;
        if (minWords > 0 && this.countWords(trimmed) < minWords) return false;

        if (mustInclude.length > 0) {
            const hasAllMust = mustInclude.every(token => this.hasToken(trimmed, token));
            if (!hasAllMust) return false;
        }

        if (keywords.length === 0) return true;

        if (enforceKeywords) {
            return keywords.every(kw => this.hasToken(trimmed, kw));
        }

        return keywords.some(kw => this.hasToken(trimmed, kw));
    }

    testResponse(testCase, response, shouldPass) {
        const passes = this.evaluateResponse(testCase, response);

        if (passes !== shouldPass && response.trim() !== '') {
            this.warnings.push(
                `Mission ${testCase.mission}, Ecran ${testCase.screen}: Test inattendu pour "${response}" (attendu: ${shouldPass ? 'PASS' : 'FAIL'}, obtenu: ${passes ? 'PASS' : 'FAIL'})`
            );
        }
    }
}

module.exports = WriteResponseValidator;
