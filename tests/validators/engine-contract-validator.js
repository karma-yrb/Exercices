/**
 * Validateur contrat moteur (engine.js)
 * Bloque les formats legacy qui passent les tests contenu
 * mais ne s'affichent pas (ex. Module_2 plat + #step-container).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEEKDATA_REGEX = /(const|var|let)\s+weekData\s*=\s*(\[[\s\S]*?\]);/;

const REQUIRED_MISSION_DOM = [
    'view-content',
    'step-title',
    'step-body',
    'footer',
    'btn-prev',
    'btn-next'
];

const REQUIRED_INDEX_DOM = [
    'view-lobby',
    'days-grid'
];

function evaluateLiteral(literal) {
    const script = new vm.Script(`(${literal})`);
    const context = vm.createContext(Object.create(null));
    return script.runInContext(context, { timeout: 1000 });
}

function hasElementId(html, id) {
    const re = new RegExp(`id\\s*=\\s*["']${id}["']`, 'i');
    return re.test(html);
}

function parseWeekDataLiteral(html) {
    const match = html.match(WEEKDATA_REGEX);
    if (!match) {
        return { error: 'weekData introuvable', data: null };
    }
    try {
        const data = evaluateLiteral(match[2]);
        if (!Array.isArray(data)) {
            return { error: 'weekData n\'est pas un tableau', data: null };
        }
        return { error: null, data };
    } catch (error) {
        return { error: `weekData illisible: ${error.message}`, data: null };
    }
}

function engineReadableAnswer(step) {
    if (step.a !== undefined) return step.a;
    if (step.answer !== undefined) return step.answer;
    return undefined;
}

function engineReadableBody(step) {
    return step.body || step.content || '';
}

class EngineContractValidator {
    constructor(targetPath) {
        this.targetPath = targetPath;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        try {
            const stat = fs.statSync(this.targetPath);
            if (stat.isDirectory()) {
                this.validateDirectory(this.targetPath);
            } else {
                this.validateFile(this.targetPath);
            }
            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur contrat engine: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: this.warnings };
        }
    }

    validateDirectory(dir) {
        const missions = fs.readdirSync(dir)
            .filter((name) => /^mission_\d+\.html$/i.test(name))
            .sort((a, b) => {
                const na = Number.parseInt(a.match(/(\d+)/)[1], 10);
                const nb = Number.parseInt(b.match(/(\d+)/)[1], 10);
                return na - nb;
            });

        if (missions.length === 0) {
            this.errors.push('Aucune mission_*.html trouvée');
            return;
        }

        missions.forEach((name) => this.validateFile(path.join(dir, name)));

        const indexPath = path.join(dir, 'index.html');
        if (fs.existsSync(indexPath)) {
            this.validateIndexFile(indexPath);
        }
    }

    validateFile(filePath) {
        const name = path.basename(filePath);
        if (/^index\.html$/i.test(name)) {
            this.validateIndexFile(filePath);
            return;
        }
        this.validateMissionFile(filePath);
    }

    validateMissionFile(filePath) {
        const label = path.basename(filePath);
        const html = fs.readFileSync(filePath, 'utf8');
        this.validateMissionContent(html, label);
    }

    validateIndexFile(filePath) {
        const label = path.basename(filePath);
        const html = fs.readFileSync(filePath, 'utf8');
        this.validateIndexContent(html, label);
    }

    /** @public for fixture unit checks */
    validateMissionContent(html, label = 'mission') {
        if (!/assets\/shared\/engine\.js/i.test(html)) {
            this.errors.push(`${label}: script engine.js manquant`);
        }

        if (/id\s*=\s*["']step-container["']/i.test(html)) {
            this.errors.push(`${label}: #step-container legacy détecté (le moteur utilise #step-title / #step-body)`);
        }

        REQUIRED_MISSION_DOM.forEach((id) => {
            if (!hasElementId(html, id)) {
                this.errors.push(`${label}: élément #${id} manquant`);
            }
        });

        if (!/SINGLE_MISSION_MODE\s*:/i.test(html)) {
            this.errors.push(`${label}: APP_CONFIG.SINGLE_MISSION_MODE manquant`);
        } else if (!/SINGLE_MISSION_MODE\s*:\s*(true|[1-9]\d*)\b/i.test(html)) {
            this.errors.push(`${label}: SINGLE_MISSION_MODE doit être truthy (true ou entier > 0)`);
        }

        const parsed = parseWeekDataLiteral(html);
        if (parsed.error) {
            this.errors.push(`${label}: ${parsed.error}`);
            return;
        }

        const data = parsed.data;
        const isNested = data.length > 0 && data.every((day) => day && Array.isArray(day.steps));

        if (!isNested) {
            this.errors.push(
                `${label}: weekData doit être nested [{ id, title, steps: [...] }] (format plat legacy rejeté)`
            );
            // Continuer l'analyse des steps plats pour remonter text/correct legacy.
            if (data.length > 0 && data[0] && data[0].type) {
                this.validateSteps(data, `${label} (flat)`);
                this.smokeFirstStep(data[0], `${label} (flat)`);
            }
            return;
        }

        data.forEach((day, dayIdx) => {
            const dayLabel = `${label} mission[${dayIdx}]`;
            if (day.id === undefined || day.id === null || String(day.id).trim() === '') {
                this.errors.push(`${dayLabel}: id manquant`);
            }
            if (!day.title || String(day.title).trim() === '') {
                this.warnings.push(`${dayLabel}: title manquant`);
            }
            if (!Array.isArray(day.steps) || day.steps.length === 0) {
                this.errors.push(`${dayLabel}: steps vide`);
                return;
            }
            this.validateSteps(day.steps, dayLabel);
            this.smokeFirstStep(day.steps[0], dayLabel);
        });
    }

    validateIndexContent(html, label = 'index') {
        if (!/assets\/shared\/engine\.js/i.test(html)) {
            this.errors.push(`${label}: script engine.js manquant`);
        }

        REQUIRED_INDEX_DOM.forEach((id) => {
            if (!hasElementId(html, id)) {
                this.errors.push(`${label}: élément #${id} manquant`);
            }
        });

        const parsed = parseWeekDataLiteral(html);
        if (parsed.error) {
            this.errors.push(`${label}: ${parsed.error}`);
            return;
        }

        parsed.data.forEach((day, idx) => {
            if (!day || day.id === undefined || day.id === null) {
                this.errors.push(`${label} day[${idx}]: id manquant`);
            }
            if (!day.title) {
                this.warnings.push(`${label} day[${idx}]: title manquant`);
            }
            if (Array.isArray(day.steps)) {
                this.warnings.push(
                    `${label} day[${idx}]: steps présents sur index (lobby attendu sans steps, redirection via BASE_PATH)`
                );
            }
        });
    }

    validateSteps(steps, label) {
        steps.forEach((step, idx) => {
            const stepLabel = `${label} step ${idx + 1}`;
            if (!step || !step.type) {
                this.errors.push(`${stepLabel}: type manquant`);
                return;
            }

            const type = String(step.type).toLowerCase();

            if (type === 'msg' || type === 'lesson') {
                const body = engineReadableBody(step);
                if (!body || String(body).trim() === '') {
                    if (step.text) {
                        this.errors.push(
                            `${stepLabel}: champ "text" legacy — le moteur lit body|content uniquement`
                        );
                    } else {
                        this.errors.push(`${stepLabel}: body/content manquant`);
                    }
                }
            }

            if (type === 'quiz' || type === 'interactive') {
                const answer = engineReadableAnswer(step);
                const opts = step.opts || step.options;
                if (answer === undefined) {
                    if (step.correct !== undefined) {
                        this.errors.push(
                            `${stepLabel}: champ "correct" legacy — le moteur lit a|answer uniquement`
                        );
                    } else {
                        this.errors.push(`${stepLabel}: réponse a|answer manquante`);
                    }
                } else if (opts && (answer < 0 || answer >= opts.length)) {
                    this.errors.push(`${stepLabel}: index réponse hors plage (${answer})`);
                }
            }

            if (type === 'write' || type === 'challenge') {
                const q = step.q || step.question;
                if (!q || String(q).trim() === '') {
                    this.errors.push(`${stepLabel}: question q|question manquante`);
                }
            }
        });
    }

    /**
     * Smoke léger : simule ce que renderStep lit pour le 1er écran.
     * Pas de jsdom — vérifie seulement que les champs engine-readable existent.
     */
    smokeFirstStep(step, label) {
        if (!step) {
            this.errors.push(`${label}: smoke render impossible (step 0 absent)`);
            return;
        }

        const type = String(step.type || '').toLowerCase();
        const titleOk = !!(step.title && String(step.title).trim());
        if (!titleOk) {
            this.warnings.push(`${label}: smoke — title vide (header d'étape vide)`);
        }

        if (type === 'msg' || type === 'lesson') {
            if (!engineReadableBody(step)) {
                this.errors.push(`${label}: smoke — body/content vide, écran blanc`);
            }
        } else if (type === 'quiz' || type === 'interactive') {
            if (engineReadableAnswer(step) === undefined) {
                this.errors.push(`${label}: smoke — aucune réponse engine-readable`);
            }
        } else if (type === 'write' || type === 'challenge') {
            if (!(step.q || step.question)) {
                this.errors.push(`${label}: smoke — question absente`);
            }
        }
    }
}

/** Fixtures pour prouver qu'un HTML legacy Module_2 échoue. */
function runSelfCheck({ exitOnFailure = true } = {}) {
    const legacy = `<!DOCTYPE html><html><body>
<div id="view-content" class="view active"><div id="step-container"></div></div>
<script>
window.APP_CONFIG = { STORAGE_KEY: 'x', MISSION_ID: 1 };
const weekData = [
  { type: "msg", title: "Intro", text: "Hello **world**" },
  { type: "quiz", title: "Q", q: "2+2?", opts: ["3","4"], correct: 1, feed: "ok" }
];
</script>
<script src="../../../assets/shared/engine.js"></script>
</body></html>`;

    const v = new EngineContractValidator(__filename);
    v.validateMissionContent(legacy, 'fixture-legacy');
    const failed = v.errors.length > 0;
    const expectedSignals = [
        'step-container',
        'nested',
        'step-title',
        'SINGLE_MISSION',
        'text" legacy',
        'correct" legacy'
    ];
    const joined = v.errors.join(' | ');
    const missing = expectedSignals.filter((s) => !joined.includes(s));
    if (!failed || missing.length) {
        const message = `SELF-CHECK FAILED (missing: ${missing.join(', ') || 'none'}; errors=${v.errors.length})`;
        if (exitOnFailure) {
            console.error(message);
            console.error('errors:', v.errors);
            process.exit(1);
        }
        throw new Error(message);
    }
    if (exitOnFailure && require.main === module) {
        console.log(`SELF-CHECK OK (${v.errors.length} erreurs détectées sur fixture legacy)`);
    }
    return { ok: true, errorsDetected: v.errors.length };
}

module.exports = EngineContractValidator;
module.exports.runSelfCheck = runSelfCheck;
module.exports.parseWeekDataLiteral = parseWeekDataLiteral;

if (require.main === module) {
    const arg = process.argv[2];
    if (arg === '--self-check') {
        runSelfCheck({ exitOnFailure: true });
    } else if (arg) {
        const result = new EngineContractValidator(arg).validate();
        console.log(JSON.stringify(result, null, 2));
        process.exit(result.valid ? 0 : 1);
    } else {
        runSelfCheck({ exitOnFailure: true });
    }
}
