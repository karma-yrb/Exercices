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
            const mustInclude = Array.isArray(reqs.mustInclude) ? reqs.mustInclude : [];
            const mode = reqs.mode || 'keywords';
            const trimmed = (text || '').trim();

            if (trimmed.length < 2) {
                return { handled: true, ok: false, msg: 'Message trop court pour etre valide.' };
            }

            if (mustInclude.length > 0) {
                const rawLower = trimmed.toLowerCase();
                for (const token of mustInclude) {
                    if (!token) continue;
                    if (/[a-zA-Z\u00C0-\u017F]/.test(token)) {
                        if (!rawLower.includes(token.toLowerCase())) {
                            return { handled: true, ok: false, msg: 'Ta phrase doit contenir : ' + token + '.' };
                        }
                    } else {
                        if (!trimmed.includes(token)) {
                            return { handled: true, ok: false, msg: 'N\'oublie pas le signe : ' + token };
                        }
                    }
                }
            }

            let keywordsValidated = false;
            let missingKeywords = [];
            
            if (keywords.length > 0) {
                const cleanText = normalizeText(trimmed);
                const normKeywords = keywords.map(k => normalizeText(k));
                
                // Fonction pour vérifier la présence d'un mot exact (whole word)
                // Comme normalizeText peut supprimer des caractères, on utilise une simulation de \b
                const hasWord = (word) => ` ${cleanText} `.includes(` ${word} `);

                if (reqs.enforceKeywords) {
                    // Logique AND : Tous les mots requis
                    missingKeywords = keywords.filter((k, i) => !hasWord(normKeywords[i]));
                    keywordsValidated = missingKeywords.length === 0;

                    if (!keywordsValidated) {
                        return { handled: true, ok: false, msg: 'Objectif non atteint. Il te manque : ' + missingKeywords.join(', ') + '.' };
                    }
                } else {
                    // Logique OR : Au moins un mot requis
                    keywordsValidated = normKeywords.some(hasWord);

                    if (!keywordsValidated) {
                        return { handled: true, ok: false, msg: 'Objectif non atteint. Tu dois utiliser : ' + keywords.join(' ou ') + '.' };
                    }
                }
                
                // Si on n'est pas en sentence mode, on valide directement si keywords ok
                if (keywordsValidated && mode === 'keywords') {
                    const grammar = await checkGrammar(trimmed);
                    if (!grammar.ok) return { handled: true, ok: false, msg: grammar.msg };
                    return { handled: true, ok: true, msg: 'Parfait. Vocabulaire precis.' };
                }
            }

            if (mode === 'verb') {
                if (trimmed.includes(' ')) {
                    return { handled: true, ok: false, msg: 'Un seul verbe est attendu.' };
                }
                if (isVerbLike(trimmed, normalizeText)) {
                    const grammar = await checkGrammar(trimmed);
                    if (!grammar.ok) return { handled: true, ok: false, msg: grammar.msg };
                    return { handled: true, ok: true, msg: 'Correct, verbe valide. On visait un mot plus precis.' };
                }
                return { handled: true, ok: false, msg: 'Ce mot ne ressemble pas a un verbe conjugue.' };
            }

            if (mode === 'sentence') {
                const forbidden = reqs.forbidden || [];
                const cleanText = normalizeText(trimmed);

                for (const f of forbidden) {
                    if (cleanText.includes(normalizeText(f))) {
                        return { handled: true, ok: false, msg: `Tu dois remplacer le mot "${f}" !` };
                    }
                }

                if (trimmed.length < 10) {
                    return { handled: true, ok: false, msg: 'Ta phrase semble trop courte.' };
                }

                const grammar = await checkGrammar(trimmed);
                if (!grammar.ok) return { handled: true, ok: false, msg: grammar.msg };

                if (keywordsValidated) {
                    return { handled: true, ok: true, msg: 'Parfait. Vocabulaire precis.' };
                }

                return { handled: true, ok: true, msg: 'Transmission validee. Phrase bien construite !' };
            }

            return { handled: false };
        }
    };
})();
