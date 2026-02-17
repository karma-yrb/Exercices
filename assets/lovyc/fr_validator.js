/* French-specific validation plugin for Lovyc modules. */
(function () {
    const thirdGroupWhitelist = new Set([
        'est', 'sont', 'suis', 'es', 'etes', 'sommes',
        'a', 'as', 'avons', 'avez', 'ont', 'ai', 'avais', 'avait', 'avaient',
        'va', 'vas', 'allons', 'allez', 'vont',
        'fait', 'fais', 'faisons', 'faites', 'font',
        'dit', 'dis', 'disons', 'dites', 'disent',
        'prend', 'prends', 'prennent', 'prenons', 'prenez',
        'met', 'mets', 'mettons', 'mettez', 'mettent',
        'peut', 'peux', 'pouvons', 'pouvez', 'peuvent',
        'veut', 'veux', 'voulons', 'voulez', 'veulent',
        'doit', 'dois', 'devons', 'devez', 'doivent',
        'vient', 'viens', 'venons', 'venez', 'viennent',
        'tient', 'tiens', 'tenons', 'tenez', 'tiennent',
        'sort', 'sors', 'sortons', 'sortez', 'sortent',
        'part', 'pars', 'partons', 'partez', 'partent',
        'voit', 'vois', 'voyons', 'voyez', 'voient',
        'fait', 'faites', 'font',
        'lit', 'lis', 'lisons', 'lisez', 'lisent',
        'ecrit', 'ecris', 'ecrivons', 'ecrivez', 'ecrivent',
        'produit', 'produis', 'produisons', 'produisez', 'produisent',
        'conduit', 'conduis', 'conduisons', 'conduisez', 'conduisent',
        'offre', 'offres', 'offrons', 'offrez', 'offrent',
        'ouvre', 'ouvres', 'ouvrons', 'ouvrez', 'ouvrent',
        'croit', 'crois', 'croyons', 'croyez', 'croient',
        'sait', 'sais', 'savons', 'savez', 'savent',
        'peint', 'peins', 'peignons', 'peignez', 'peignent',
        'vient', 'vient', 'viennent',
        'eteint', 'eteints', 'eteignons', 'eteignez', 'eteignent'
    ]);

    function isVerbLike(word, normalizeFn) {
        if (!word || word.length < 3) return false;
        if (!/^[a-zA-Z\u00C0-\u017F\-']+$/.test(word)) return false;
        const normalized = normalizeFn(word);
        // Common present/future/imparfait endings.
        if (/(e|es|ent|ons|ez|ai|as|a|ont|ais|ait|aient|er|ir|re)$/.test(normalized)) return true;

        // 3rd-group irregular forms whitelist to reduce false positives.
        return thirdGroupWhitelist.has(normalized);
    }

    function normalizeStrictText(text) {
        return (text || '')
            .toString()
            .trim()
            .replace(/[’`]/g, "'")
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    function escapeRegex(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function stripDiacritics(value) {
        return (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function hasDiacritics(value) {
        return stripDiacritics(value) !== value;
    }

    function hasTokenStrict(normalizedRawStrict, token) {
        if (!token) return false;
        const strictToken = normalizeStrictText(token);
        if (!strictToken) return false;

        if (/[a-zA-Z\u00C0-\u017F]/.test(strictToken)) {
            const escaped = escapeRegex(strictToken);
            const strictPattern = new RegExp("(^|[^\\p{L}\\p{N}\\-])" + escaped + "([^\\p{L}\\p{N}\\-]|$)", 'u');
            if (strictPattern.test(normalizedRawStrict)) return true;

            // Legacy FR content may still ship unaccented keywords in config.
            // In that case accept accented learner input as equivalent token.
            if (!hasDiacritics(strictToken)) {
                const accentlessRaw = stripDiacritics(normalizedRawStrict);
                const accentlessToken = stripDiacritics(strictToken);
                const accentlessEscaped = escapeRegex(accentlessToken);
                const loosePattern = new RegExp("(^|[^\\p{L}\\p{N}\\-])" + accentlessEscaped + "([^\\p{L}\\p{N}\\-]|$)", 'u');
                return loosePattern.test(accentlessRaw);
            }
            return false;
        }

        return normalizedRawStrict.includes(strictToken);
    }

    function countSentences(text) {
        return (text.match(/[.!?]+/g) || []).length;
    }

    function detectOralRegisterIssue(text) {
        const normalized = normalizeStrictText(text);
        const oralPatterns = [
            { pattern: /\by'?a\b/u, source: "y'a", expected: 'il y a' },
            { pattern: /(^|[.!?]\s*)y a\b/u, source: 'y a', expected: 'il y a' }
        ];

        for (const oral of oralPatterns) {
            if (oral.pattern.test(normalized)) return oral;
        }
        return null;
    }

    function isFillBlankStep(step) {
        const q = step && (step.q || step.question || '');
        const normalizedQ = (q || '').toLowerCase();
        return normalizedQ.includes('____') || normalizedQ.includes('complete la phrase');
    }

    async function checkGrammar(text) {
        try {
            const params = new URLSearchParams();
            params.append('text', text);
            params.append('language', 'fr');
            const response = await fetch('https://api.languagetool.org/v2/check', {
                method: 'POST',
                body: params
            });
            const data = await response.json();
            if (data.matches && data.matches.length > 0) {
                // Ignore errors on specific names and proper nouns
                const filteredMatches = data.matches.filter(m => {
                    const token = text.substr(m.offset, m.length);
                    const ignored = ['Lovyc', 'Zyvah'];
                    if (ignored.includes(token)) return false;
                    // Ignore some specific LanguageTool rules that might be too strict for names
                    if (m.rule.issueType === 'misspelling' && /^[A-Z]/.test(token)) return false;
                    return true;
                });

                if (filteredMatches.length > 0) {
                    const error = filteredMatches[0];
                    const token = text.substr(error.offset, error.length);
                    if (error.rule && error.rule.issueType && error.rule.issueType !== 'misspelling') {
                        return { ok: false, msg: 'Verifie la grammaire ou la ponctuation autour de: ' + (token || 'cette partie') + '.' };
                    }
                    return { ok: false, msg: 'Orthographe a corriger: ' + (token || 'erreur detectee') + '.' };
                }
            }
        } catch (e) {
            return { ok: true, msg: '' };
        }
        return { ok: true, msg: '' };
    }

    window.FrValidator = {
        validate: async function ({ text, step, normalizeText }) {
            if (!step || !step.requirements) return { handled: false };

            const reqs = step.requirements || {};
            const keywords = Array.isArray(reqs.keywords) ? reqs.keywords : [];
            const keywordGroups = Array.isArray(reqs.keywordGroups) ? reqs.keywordGroups : [];
            const mustInclude = Array.isArray(reqs.mustInclude) ? reqs.mustInclude : [];
            const mode = reqs.mode || 'keywords';
            const trimmed = (text || '').trim();
            const fillBlank = isFillBlankStep(step);
            const hasOneWordTarget = Number(reqs.minWords) <= 1 || fillBlank;
            const minChars = Number(reqs.minChars) || (hasOneWordTarget ? 1 : 3);

            if (!trimmed || trimmed.length < minChars) {
                return { handled: true, ok: false, msg: 'Message trop court pour etre valide.' };
            }

            const nonCopyHints = [step.hint, step.hintLight, step.hint1, step.hintGuided, step.hint2]
                .filter(Boolean)
                .map(h => normalizeText(h));
            if (nonCopyHints.includes(normalizeText(trimmed))) {
                return { handled: true, ok: false, msg: 'Reformule avec tes propres mots au lieu de copier l\'indice.' };
            }

            const normalizedRaw = normalizeText(trimmed);
            const normalizedRawStrict = normalizeStrictText(trimmed);
            const antiCheatPhrases = ['objectif non atteint', 'il te manque', 'tu dois utiliser', 'reessayer le scan'];
            if (antiCheatPhrases.some(p => normalizedRaw.includes(p))) {
                return { handled: true, ok: false, msg: 'Ne copie pas le message d\'erreur, reponds a la consigne.' };
            }

            const requiresWrittenRegister = mode === 'sentence' || step.type === 'challenge';
            if (requiresWrittenRegister) {
                const oralIssue = detectOralRegisterIssue(trimmed);
                if (oralIssue) {
                    return {
                        handled: true,
                        ok: false,
                        msg: 'Evite la forme orale "' + oralIssue.source + '". Ecris "' + oralIssue.expected + '".'
                    };
                }
            }

            const expectsSentenceForm = mode === 'sentence' && !fillBlank && !hasOneWordTarget;
            if (expectsSentenceForm) {
                const firstLetterMatch = trimmed.match(/[A-Za-z\u00C0-\u017F]/);
                if (firstLetterMatch && firstLetterMatch[0] !== firstLetterMatch[0].toUpperCase()) {
                    return { handled: true, ok: false, msg: 'Commence ta phrase par une majuscule.' };
                }

                const withoutClosingMarks = trimmed.replace(/[\s"'»)\]]+$/u, '');
                if (!/[.!?]$/.test(withoutClosingMarks)) {
                    return { handled: true, ok: false, msg: 'Ajoute un point final (ou ? ! ) a la fin de la phrase.' };
                }
            }

            if (mustInclude.length > 0) {
                for (const token of mustInclude) {
                    if (!token) continue;
                    if (!hasTokenStrict(normalizedRawStrict, token)) {
                        if (/[a-zA-Z\u00C0-\u017F]/.test(token)) {
                            return { handled: true, ok: false, msg: 'Ta phrase doit contenir : ' + token + '.' };
                        }
                        return { handled: true, ok: false, msg: 'N\'oublie pas le signe : ' + token };
                    }
                }
            }

            if (keywordGroups.length > 0) {
                const missingGroups = keywordGroups.filter(group =>
                    !Array.isArray(group) || !group.some(token => hasTokenStrict(normalizedRawStrict, token))
                );
                if (missingGroups.length > 0) {
                    const expected = missingGroups
                        .map(group => Array.isArray(group) && group.length > 0 ? group[0] : null)
                        .filter(Boolean);
                    return { handled: true, ok: false, msg: 'Objectif non atteint. Il manque un element de : ' + expected.join(', ') + '.' };
                }
            }

            let keywordsValidated = keywords.length === 0;
            let missingKeywords = [];

            if (keywords.length > 0) {
                if (reqs.enforceKeywords) {
                    missingKeywords = keywords.filter(k => !hasTokenStrict(normalizedRawStrict, k));
                    keywordsValidated = missingKeywords.length === 0;
                    if (!keywordsValidated) {
                        return { handled: true, ok: false, msg: 'Objectif non atteint. Il te manque : ' + missingKeywords.join(', ') + '.' };
                    }
                } else {
                    keywordsValidated = keywords.some(k => hasTokenStrict(normalizedRawStrict, k));
                    if (!keywordsValidated) {
                        return { handled: true, ok: false, msg: 'Objectif non atteint. Tu dois utiliser au moins un mot-cle attendu (ex: ' + keywords[0] + ').' };
                    }
                }
            }

            if (reqs.minWords) {
                const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
                if (wordCount < reqs.minWords) {
                    return { handled: true, ok: false, msg: 'Ta reponse est trop courte (' + wordCount + ' mots). Minimum: ' + reqs.minWords + '.' };
                }
            }

            if (reqs.minSentences) {
                const sentenceCount = countSentences(trimmed);
                if (sentenceCount < reqs.minSentences) {
                    return { handled: true, ok: false, msg: 'Ajoute ' + reqs.minSentences + ' phrase(s) complete(s).' };
                }
            }

            if (mode === 'verb') {
                if (trimmed.includes(' ')) {
                    return { handled: true, ok: false, msg: 'Seul un verbe est attendu.' };
                }
                if (!isVerbLike(trimmed, normalizeText)) {
                    return { handled: true, ok: false, msg: 'Ce mot ne ressemble pas a un verbe conjugue.' };
                }
            }

            if (mode === 'sentence' && Array.isArray(reqs.forbidden) && reqs.forbidden.length > 0) {
                const forbiddenHit = reqs.forbidden.find(f => normalizedRaw.includes(normalizeText(f)));
                if (forbiddenHit) {
                    return { handled: true, ok: false, msg: 'Tu dois remplacer le mot "' + forbiddenHit + '".' };
                }
            }

            const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
            const containsLetters = /[A-Za-z\u00C0-\u017F]/.test(trimmed);
            const shouldCheckGrammar = (mode === 'sentence' || mode === 'verb' || mode === 'keywords')
                && containsLetters
                && !fillBlank;
            if (shouldCheckGrammar) {
                const grammar = await checkGrammar(trimmed);
                if (!grammar.ok) return { handled: true, ok: false, msg: grammar.msg };
            }

            if (mode === 'keywords') {
                return { handled: true, ok: true, msg: 'Parfait. Vocabulaire precis.' };
            }

            if (mode === 'verb') {
                return { handled: true, ok: true, msg: 'Correct, verbe valide.' };
            }

            if (mode === 'sentence') {
                if (keywordsValidated) {
                    return { handled: true, ok: true, msg: 'Parfait. Vocabulaire precis.' };
                }
                return { handled: true, ok: true, msg: 'Transmission validee. Phrase bien construite !' };
            }

            return { handled: false };
        }
    };
})();

