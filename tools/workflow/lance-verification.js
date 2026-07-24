#!/usr/bin/env node
"use strict";

/**
 * lance-verification — prepare la chaine Mode B (ou un agent Mode A).
 *
 * Usage:
 *   node tools/workflow/lance-verification.js <univers> <cible> [exercice] [options]
 *
 * Exemples:
 *   node tools/workflow/lance-verification.js zyvah maths
 *   node tools/workflow/lance-verification.js zyvah maths:2
 *   node tools/workflow/lance-verification.js zyvah maths:2 seance:1
 *   node tools/workflow/lance-verification.js zyvah maths:2 1:3
 *   node tools/workflow/lance-verification.js lovyc fr:1 mission:2:ecran:5 --only=ctp
 *   npm run verify -- zyvah maths
 *
 * Cible:
 *   maths | fr | ses          → tous les modules de la matiere (ordre croissant)
 *   maths:2 | fr:1 | ...      → un module precis
 *
 * Options:
 *   --only=prof|ctp|architecte|ux|auditeur   Mode A (un seul agent)
 *   --skip-ux                                Saute l'etape UX dans la chaine
 *   --with-tests                             Force les tests Architecte (defaut si etape incluse)
 *   --no-tests                               Ne lance pas les tests
 *   --dry-run                                Affiche le plan sans ecrire de fichier
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..");

const UNIVERS_MAP = {
    lovyc: "Lovyc",
    zyvah: "Zyvah"
};

const MATIERE_MAP = {
    fr: { draft: "fr", dir: "Francais", agent: "PROF_FRANCAIS_4E", label: "Francais" },
    francais: { draft: "fr", dir: "Francais", agent: "PROF_FRANCAIS_4E", label: "Francais" },
    maths: { draft: "maths", dir: "Maths", agent: "PROF_MATH_SCIENCES_2NDE", label: "Maths" },
    math: { draft: "maths", dir: "Maths", agent: "PROF_MATH_SCIENCES_2NDE", label: "Maths" },
    ses: { draft: "ses", dir: "SES", agent: "PROF_SES_2NDE", label: "SES" }
};

const CHAIN_STEPS = [
    {
        id: "prof",
        order: 1,
        title: "Prof — revue fond",
        agentFile: null, // resolu dynamiquement
        checklist: [
            "Objectif pedagogique de l'ecran clair et mesurable",
            "Reponse / corrige vrai (faits, calculs, mecanismes)",
            "Distracteurs credibles (quiz) ; pas de piege hors objectif",
            "Hint progressif sans spoiler de la solution",
            "Feedback utile et non punitif",
            "Ancrage profil / terrain coherent (pas decoratif trompeur)",
            "Niveau aligne curriculum / progression deja vue",
            "Enchainement logique avec l'ecran precedent / suivant"
        ]
    },
    {
        id: "ctp",
        order: 2,
        title: "CTP — revue mecanique",
        agentFile: "CONSULTANT_TECHNIQUE_PEDAGOGIQUE.md",
        checklist: [
            "Correspondance explicite consigne → validation → feedback",
            "Keywords / variantes suffisants (sans accepter n'importe quoi)",
            "Tolerance adaptee matiere + age (FR strict vs autres matieres)",
            "Hints FR en 3 phases si write/challenge concernes",
            "Pas de validation qui contredit l'objectif pedagogique du Prof"
        ]
    },
    {
        id: "architecte",
        order: 3,
        title: "Architecte — sync + tests",
        agentFile: "ARCHITECTE_PEDAGO_WEB.md",
        checklist: [
            "Draft = source de verite ; HTML aligne",
            "Navigation / storage / prerequis coherents",
            "Tests locaux passants sur le module cible",
            "Contraintes technique respectees (vanilla, moteur partage)"
        ]
    },
    {
        id: "ux",
        order: 4,
        title: "UX/UI — mobile",
        agentFile: "UX_UI_DESIGNER_MOBILE.md",
        checklist: [
            "Lisibilite smartphone (contrastes, tailles tactiles)",
            "Pas de friction inutile sur l'ecran cible",
            "Hierarchie visuelle claire (consigne > actions)"
        ],
        optional: true
    },
    {
        id: "auditeur",
        order: 5,
        title: "Auditeur — gate release",
        agentFile: "AUDITEUR_QUALITE_PEDAGO_TECH.md",
        checklist: [
            "Aucun Critique ouvert dans les etapes precedentes",
            "Risques transverses echantillonnes (pas revue ecran/ecran)",
            "Verdict: GO | GO_WITH_RISK | NO_GO"
        ]
    }
];

function printHelpAndExit(code = 0) {
    const help = `Usage:
  node tools/workflow/lance-verification.js <univers> <cible> [exercice] [options]

Univers:  lovyc | zyvah
Cible:    maths | fr | ses          (tous les modules de la matiere)
          maths:2 | fr:1 | ses:0    (un module)
          maths_2 | zyvah_maths_module_2
Exercice: (omission = module entier ; interdit si cible = matiere seule)
  seance:1 | mission:1 | s1 | m1
  1:3 | seance:1:ecran:3 | m1e3

Options:
  --only=prof|ctp|architecte|ux|auditeur
  --skip-ux
  --with-tests | --no-tests
  --dry-run
  --help
`;
    process.stdout.write(help);
    process.exit(code);
}

function nowParts(date = new Date()) {
    const pad = (n) => String(n).padStart(2, "0");
    return {
        date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
        time: `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`,
        readable: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    };
}

function parseArgs(argv) {
    const positional = [];
    const opts = {
        only: null,
        skipUx: false,
        withTests: null,
        dryRun: false,
        help: false
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--help" || arg === "-h") opts.help = true;
        else if (arg === "--dry-run") opts.dryRun = true;
        else if (arg === "--skip-ux") opts.skipUx = true;
        else if (arg === "--with-tests") opts.withTests = true;
        else if (arg === "--no-tests") opts.withTests = false;
        else if (arg.startsWith("--only=")) opts.only = arg.slice("--only=".length).trim().toLowerCase();
        else if (arg === "--only") opts.only = String(argv[++i] || "").trim().toLowerCase();
        else if (arg.startsWith("-")) {
            throw new Error(`Option inconnue: ${arg}`);
        } else {
            positional.push(arg);
        }
    }

    return { positional, opts };
}

function normalizeUnivers(raw) {
    const key = String(raw || "").trim().toLowerCase();
    if (!UNIVERS_MAP[key]) {
        throw new Error(`Univers invalide: "${raw}". Attendu: lovyc | zyvah`);
    }
    return { key, dir: UNIVERS_MAP[key] };
}

function resolveMatiereOnly(matiereRaw) {
    const matiere = MATIERE_MAP[String(matiereRaw || "").toLowerCase()];
    if (!matiere) {
        throw new Error(`Matiere invalide: "${matiereRaw}". Attendu: fr | maths | ses`);
    }
    return matiere;
}

function resolveMatiere(matiereRaw, num) {
    const matiere = resolveMatiereOnly(matiereRaw);
    if (!Number.isInteger(num) || num < 0) {
        throw new Error(`Numero de module invalide: "${num}"`);
    }
    return { matiere, num };
}

/**
 * @returns {{ kind: "module", moduleInfo: object } | { kind: "subject", matiere: object }}
 */
function parseCibleToken(universKey, raw) {
    const token = String(raw || "").trim().toLowerCase();

    let match = token.match(/^(lovyc|zyvah)_([a-z]+)_module_(\d+)$/);
    if (match) {
        if (match[1] !== universKey) {
            throw new Error(`Le module "${token}" ne correspond pas a l'univers "${universKey}"`);
        }
        return { kind: "module", moduleInfo: resolveMatiere(match[2], Number.parseInt(match[3], 10)) };
    }

    match = token.match(/^([a-z]+)[:_]module[_:]?(\d+)$/) || token.match(/^([a-z]+)[:_](\d+)$/);
    if (match) {
        return { kind: "module", moduleInfo: resolveMatiere(match[1], Number.parseInt(match[2], 10)) };
    }

    match = token.match(/^module[_:]?(\d+)$/);
    if (match) {
        throw new Error(`Module ambigu "${token}" : precise la matiere (ex: maths:${match[1]})`);
    }

    // Matiere seule → tous les modules
    if (MATIERE_MAP[token]) {
        return { kind: "subject", matiere: resolveMatiereOnly(token) };
    }

    throw new Error(`Cible invalide: "${raw}". Ex: maths | maths:2 | fr:1 | zyvah_maths_module_2`);
}

function discoverSubjectModules(universKey, matiere) {
    const docsDir = path.join(repoRoot, "docs", "modules");
    if (!fs.existsSync(docsDir)) {
        throw new Error("Dossier docs/modules/ introuvable");
    }

    const prefix = `${universKey}_${matiere.draft}_module_`;
    const modules = fs.readdirSync(docsDir)
        .map((file) => {
            const match = file.match(new RegExp(`^${prefix}(\\d+)\\.md$`, "i"));
            if (!match) return null;
            return resolveMatiere(matiere.draft, Number.parseInt(match[1], 10));
        })
        .filter(Boolean)
        .sort((a, b) => a.num - b.num);

    if (modules.length === 0) {
        throw new Error(`Aucun module trouve pour ${universKey} / ${matiere.label}`);
    }

    return modules;
}

function parseExerciceToken(raw) {
    if (!raw || raw === "all" || raw === "module" || raw === "*") {
        return { kind: "module", seance: null, ecran: null };
    }

    const token = String(raw).trim().toLowerCase();

    let match = token.match(/^(?:seance|mission|s|m)[:_]?(\d+)[:_]?(?:ecran|e|screen)?[:_]?(\d+)?$/);
    if (match) {
        const seance = Number.parseInt(match[1], 10);
        const ecran = match[2] ? Number.parseInt(match[2], 10) : null;
        return { kind: ecran ? "ecran" : "seance", seance, ecran };
    }

    match = token.match(/^(\d+)[:_\-](\d+)$/);
    if (match) {
        return {
            kind: "ecran",
            seance: Number.parseInt(match[1], 10),
            ecran: Number.parseInt(match[2], 10)
        };
    }

    match = token.match(/^(?:ecran|e|screen)[:_]?(\d+)$/);
    if (match) {
        throw new Error(`Ecran seul ambigu ("${raw}") : precise la seance (ex: 1:${match[1]})`);
    }

    throw new Error(`Exercice invalide: "${raw}". Ex: seance:1 | 1:3 | mission:2:ecran:5`);
}

function resolvePaths(univers, moduleInfo) {
    const draftName = `${univers.key}_${moduleInfo.matiere.draft}_module_${moduleInfo.num}.md`;
    const draftPath = path.join(repoRoot, "docs", "modules", draftName);
    const htmlDir = path.join(
        repoRoot,
        univers.dir,
        moduleInfo.matiere.dir,
        `Module_${moduleInfo.num}`
    );

    return {
        draftName,
        draftPath,
        draftRel: path.relative(repoRoot, draftPath).replace(/\\/g, "/"),
        htmlDir,
        htmlRel: path.relative(repoRoot, htmlDir).replace(/\\/g, "/")
    };
}

function extractMeta(content) {
    const metaStart = content.search(/^## Meta\s*$/im);
    if (metaStart === -1) return {};
    const after = content.slice(metaStart + content.slice(metaStart).match(/^## Meta\s*$/im)[0].length);
    const next = after.match(/\n##\s+/);
    const section = next ? after.slice(0, next.index) : after;
    const get = (re) => {
        const m = section.match(re);
        return m ? m[1].trim() : null;
    };
    return {
        theme: get(/-\s*Theme\s*:\s*(.+)/i),
        agentPedago: get(/-\s*AgentPedago\s*:\s*(.+)/i),
        seances: Number.parseInt(get(/-\s*(?:Missions|Seances|Séances)\s*:\s*(\d+)/i) || "", 10) || null,
        screensPerSeance: Number.parseInt(get(/-\s*ScreensPer(?:Mission|Seance|Séance)\s*:\s*(\d+)/i) || "", 10) || null
    };
}

function splitSeances(content) {
    const re = /^##\s+(?:Mission|S(?:e|é)ance)\s+(\d+)\s*[-–—]?\s*(.*)$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(content)) !== null) {
        matches.push({
            num: Number.parseInt(m[1], 10),
            title: (m[2] || "").trim(),
            start: m.index,
            headerLen: m[0].length
        });
    }

    return matches.map((item, idx) => {
        const end = idx + 1 < matches.length ? matches[idx + 1].start : content.length;
        const body = content.slice(item.start + item.headerLen, end);
        return {
            num: item.num,
            title: item.title,
            body,
            screens: splitScreens(body)
        };
    });
}

function splitScreens(seanceBody) {
    const re = /^###\s+(?:Ecran|Écran)\s+(\d+)\s*[-–—]\s*(.+)$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(seanceBody)) !== null) {
        matches.push({
            num: Number.parseInt(m[1], 10),
            titleLine: (m[2] || "").trim(),
            start: m.index,
            headerLen: m[0].length
        });
    }

    return matches.map((item, idx) => {
        const end = idx + 1 < matches.length ? matches[idx + 1].start : seanceBody.length;
        const body = seanceBody.slice(item.start, end).trim();
        const typeMatch = item.titleLine.match(/^(msg|lesson|quiz|write|challenge|interactive|checkpoint)\b/i);
        return {
            num: item.num,
            titleLine: item.titleLine,
            type: typeMatch ? typeMatch[1].toLowerCase() : null,
            body
        };
    });
}

function selectScope(seances, exercice) {
    if (exercice.kind === "module") {
        return {
            label: "module entier",
            seances,
            screens: seances.flatMap((s) => s.screens.map((sc) => ({ seance: s.num, ...sc })))
        };
    }

    const seance = seances.find((s) => s.num === exercice.seance);
    if (!seance) {
        throw new Error(`Seance/mission ${exercice.seance} introuvable dans le draft`);
    }

    if (exercice.kind === "seance") {
        return {
            label: `seance ${seance.num}`,
            seances: [seance],
            screens: seance.screens.map((sc) => ({ seance: seance.num, ...sc }))
        };
    }

    const screen = seance.screens.find((sc) => sc.num === exercice.ecran);
    if (!screen) {
        throw new Error(`Ecran ${exercice.ecran} introuvable dans la seance ${exercice.seance}`);
    }

    return {
        label: `seance ${seance.num} / ecran ${screen.num}`,
        seances: [seance],
        screens: [{ seance: seance.num, ...screen }]
    };
}

function listHtmlMissions(htmlDir, seanceFilter) {
    if (!fs.existsSync(htmlDir)) return [];
    const files = fs.readdirSync(htmlDir)
        .filter((name) => /^mission_\d+\.html$/i.test(name))
        .sort((a, b) => {
            const na = Number.parseInt(a.match(/(\d+)/)[1], 10);
            const nb = Number.parseInt(b.match(/(\d+)/)[1], 10);
            return na - nb;
        });

    return files
        .map((name) => {
            const num = Number.parseInt(name.match(/(\d+)/)[1], 10);
            return {
                num,
                name,
                rel: path.relative(repoRoot, path.join(htmlDir, name)).replace(/\\/g, "/")
            };
        })
        .filter((item) => (seanceFilter == null ? true : item.num === seanceFilter));
}

function extractHtmlStep(htmlPath, ecranNum) {
    try {
        const html = fs.readFileSync(htmlPath, "utf8");
        const match = html.match(/const\s+weekData\s*=\s*(\[[\s\S]*?\]);/);
        if (!match) return null;
        const data = Function(`"use strict"; return (${match[1]});`)();
        if (!Array.isArray(data) || data.length === 0) return null;
        // Support nested engine format [{ id, title, steps }] and legacy flat steps [].
        const steps = Array.isArray(data[0] && data[0].steps) ? data[0].steps : data;
        if (ecranNum < 1 || ecranNum > steps.length) return null;
        return steps[ecranNum - 1];
    } catch {
        return null;
    }
}

function buildSteps(opts, profAgentFile) {
    let steps = CHAIN_STEPS.map((step) => ({
        ...step,
        agentFile: step.id === "prof" ? profAgentFile : step.agentFile
    }));

    if (opts.only) {
        const allowed = new Set(CHAIN_STEPS.map((s) => s.id));
        if (!allowed.has(opts.only)) {
            throw new Error(`--only invalide: "${opts.only}". Attendu: ${[...allowed].join("|")}`);
        }
        steps = steps.filter((s) => s.id === opts.only);
    } else if (opts.skipUx) {
        steps = steps.filter((s) => s.id !== "ux");
    }

    return steps;
}

function runModuleTests(moduleFilter) {
    const result = spawnSync("node", ["tests/test-runner.js", moduleFilter], {
        cwd: repoRoot,
        encoding: "utf8"
    });
    const output = `${result.stdout || ""}\n${result.stderr || ""}`.trim();
    const lines = output ? output.split(/\r?\n/) : [];
    const tail = lines.slice(Math.max(0, lines.length - 30));

    return {
        executed: true,
        exitCode: result.status == null ? 1 : result.status,
        status: result.status === 0 ? "passed" : "failed",
        filter: moduleFilter,
        tail
    };
}

function checklistMarkdown(items) {
    return items.map((item) => `- [ ] ${item}`).join("\n");
}

function truncateBlock(text, maxChars = 3500) {
    if (!text) return "_(contenu vide)_";
    if (text.length <= maxChars) return text;
    return `${text.slice(0, maxChars)}\n\n… _(tronque, ${text.length - maxChars} caracteres restants dans le draft)_`;
}

function buildMarkdown(ctx) {
    const modeLabel = ctx.opts.only
        ? `Mode A — agent seul (\`${ctx.opts.only}\`)`
        : "Mode B — chaine complete";

    const stepsBlock = ctx.steps.map((step, idx) => {
        const agentRel = step.agentFile
            ? `.github/agents/${step.agentFile}`
            : "(agent Prof selon matiere)";
        return `### Etape ${idx + 1} — ${step.title}
- Agent: \`${agentRel}\`
- Statut: \`pending\`
- Severite a renseigner: Critique / Majeur / Mineur
- Verdict etape: \`OPEN\` | \`PASS\` | \`BLOCKED\`

${checklistMarkdown(step.checklist)}

**Findings etape ${idx + 1}**
- (a completer)
`;
    }).join("\n");

    const maxFullExtracts = ctx.exercice.kind === "module" ? 0 : (ctx.exercice.kind === "seance" ? 20 : 5);
    const bodyLimit = ctx.exercice.kind === "seance" ? 1200 : 3500;
    const includeFullExtracts = ctx.scope.screens.length <= maxFullExtracts;
    const indexBlock = ctx.scope.screens.map((screen) => {
        return `- S${screen.seance} E${screen.num} [\`${screen.type || "?"}\`] ${screen.titleLine}`;
    }).join("\n");

    const screenBlocks = includeFullExtracts
        ? ctx.scope.screens.map((screen) => {
            const htmlMission = ctx.htmlMissions.find((m) => m.num === screen.seance);
            const htmlStep = htmlMission
                ? extractHtmlStep(path.join(repoRoot, htmlMission.rel), screen.num)
                : null;
            const htmlJson = htmlStep
                ? `\`\`\`json\n${JSON.stringify(htmlStep, null, 2)}\n\`\`\``
                : "_Step HTML non extrait (mission absente ou weekData illisible)._";

            return `### Seance ${screen.seance} — Ecran ${screen.num}
- Titre draft: ${screen.titleLine}
- Type: \`${screen.type || "?"}\`
- HTML: ${htmlMission ? `\`${htmlMission.rel}\` (index ${screen.num})` : "_mission HTML absente_"}

#### Extrait draft
\`\`\`markdown
${truncateBlock(screen.body, bodyLimit)}
\`\`\`

#### Step HTML (si dispo)
${htmlJson}
`;
        }).join("\n")
        : `> Perimetre large (${ctx.scope.screens.length} ecrans) : index seulement.\n> Relancer avec \`seance:N\` ou \`N:M\` pour extraire le detail.\n\n### Index des ecrans\n${indexBlock}\n`;

    const testsSection = ctx.tests.executed
        ? [
            `- Filtre: \`${ctx.tests.filter}\``,
            `- Statut: **${ctx.tests.status}** (exit=${ctx.tests.exitCode})`,
            ctx.tests.status === "failed" && ctx.tests.tail.length
                ? `\n\`\`\`\n${ctx.tests.tail.join("\n")}\n\`\`\``
                : ""
        ].join("\n")
        : "- Tests non executes (`--no-tests` ou etape Architecte hors perimetre).";

    const htmlList = ctx.htmlMissions.length
        ? ctx.htmlMissions.map((m) => `- \`${m.rel}\``).join("\n")
        : "- Aucun `mission_*.html` trouve.";

    return `# VERIFICATION CHAIN

Genere le: ${ctx.generatedAt}
Baseline: \`docs/governance/AGENTS_BASELINE.md\`

## Cible
- Univers: **${ctx.univers.dir}** (\`${ctx.univers.key}\`)
- Matiere: **${ctx.moduleInfo.matiere.label}**
- Module: **${ctx.moduleInfo.num}**
- Perimetre exercice: **${ctx.scope.label}**
- Mode: ${modeLabel}
- Ecrans dans le perimetre: ${ctx.scope.screens.length}

## Fichiers
- Draft: \`${ctx.paths.draftRel}\`
- HTML dir: \`${ctx.paths.htmlRel}\`
- Agent Prof: \`.github/agents/${ctx.profAgentFile}\`

### Meta draft
- Theme: ${ctx.meta.theme || "?"}
- AgentPedago: ${ctx.meta.agentPedago || "?"}
- Seances: ${ctx.meta.seances ?? "?"}
- ScreensPerSeance: ${ctx.meta.screensPerSeance ?? "?"}

### Missions HTML visees
${htmlList}

## Regle de chaine
1. Completer les etapes dans l'ordre ci-dessous.
2. Ne passer a N+1 que si N n'a plus de **Critique** ouvert.
3. UX est optionnelle (ecran nouveau / redesign) sauf \`--only=ux\`.
4. Remplir les findings puis le verdict global.

## Etapes
${stepsBlock}

## Contenu a verifier
${screenBlocks || "_Aucun ecran selectionne._"}

## Tests Architecte (auto)
${testsSection}

## Verdict global
- Statut: \`OPEN\` | \`GO\` | \`GO_WITH_RISK\` | \`NO_GO\`
- Critiques ouverts:
- Risques residuels:
- Prochaine action:

## Relance
\`\`\`bash
node tools/workflow/lance-verification.js ${ctx.univers.key} ${ctx.moduleInfo.matiere.draft}:${ctx.moduleInfo.num}${ctx.exercice.kind === "module" ? "" : ctx.exercice.kind === "seance" ? ` seance:${ctx.exercice.seance}` : ` ${ctx.exercice.seance}:${ctx.exercice.ecran}`}${ctx.opts.only ? ` --only=${ctx.opts.only}` : ""}${ctx.opts.skipUx ? " --skip-ux" : ""}
\`\`\`
`;
}

function writeVerificationFiles(outDir, fileName, markdown) {
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, fileName);
    const latestPath = path.join(outDir, "LAST_VERIFICATION.md");
    fs.writeFileSync(outPath, markdown, "utf8");
    fs.writeFileSync(latestPath, markdown, "utf8");
    return {
        outPath,
        latestPath,
        relOut: path.relative(repoRoot, outPath).replace(/\\/g, "/"),
        relLatest: path.relative(repoRoot, latestPath).replace(/\\/g, "/")
    };
}

function buildSubjectIndexMarkdown(ctx) {
    const modeLabel = ctx.opts.only
        ? `Mode A — agent seul (\`${ctx.opts.only}\`)`
        : "Mode B — chaine complete";

    const rows = ctx.results.map((item, idx) => {
        const tests = item.tests.executed
            ? `${item.tests.status} (exit=${item.tests.exitCode})`
            : "not-run";
        return `| ${idx + 1} | Module_${item.moduleInfo.num} | ${item.scope.screens.length} | ${tests} | \`${item.relOut}\` | OPEN |`;
    }).join("\n");

    const order = ctx.results.map((item) => `Module_${item.moduleInfo.num}`).join(" → ");

    return `# VERIFICATION CHAIN — MATIERE

Genere le: ${ctx.generatedAt}
Baseline: \`docs/governance/AGENTS_BASELINE.md\`

## Cible
- Univers: **${ctx.univers.dir}** (\`${ctx.univers.key}\`)
- Matiere: **${ctx.matiere.label}**
- Perimetre: **tous les modules** (${ctx.results.length})
- Ordre: ${order}
- Mode: ${modeLabel}

## Regle
1. Traiter les modules **dans l'ordre croissant**.
2. Pour chaque module, ouvrir son brief et suivre la chaine (Prof → CTP → Architecte → UX? → Auditeur).
3. Ne passer au module suivant que si le module courant n'a plus de **Critique** ouvert.
4. Remplir le verdict matiere a la fin.

## Index des briefs module
| # | Module | Ecrans | Tests | Brief | Verdict |
|---|---|---|---|---|---|
${rows}

## Verdict matiere
- Statut: \`OPEN\` | \`GO\` | \`GO_WITH_RISK\` | \`NO_GO\`
- Modules bloques:
- Critiques ouverts:
- Prochaine action:

## Relance
\`\`\`bash
node tools/workflow/lance-verification.js ${ctx.univers.key} ${ctx.matiere.draft}${ctx.opts.only ? ` --only=${ctx.opts.only}` : ""}${ctx.opts.skipUx ? " --skip-ux" : ""}${ctx.opts.withTests === false ? " --no-tests" : ""}
\`\`\`
`;
}

function verifyOneModule({ univers, moduleInfo, exercice, opts, generated }) {
    const paths = resolvePaths(univers, moduleInfo);

    if (!fs.existsSync(paths.draftPath)) {
        throw new Error(`Draft introuvable: ${paths.draftRel}`);
    }

    const draftContent = fs.readFileSync(paths.draftPath, "utf8");
    const meta = extractMeta(draftContent);
    const seances = splitSeances(draftContent);
    if (seances.length === 0) {
        throw new Error(`Aucune seance/mission trouvee dans ${paths.draftRel}`);
    }

    const scope = selectScope(seances, exercice);
    const seanceFilter = exercice.kind === "module" ? null : exercice.seance;
    const htmlMissions = listHtmlMissions(paths.htmlDir, seanceFilter);
    const profAgentFile = `${moduleInfo.matiere.agent}.md`;
    const steps = buildSteps(opts, profAgentFile);

    const shouldRunTests = opts.withTests === true
        || (opts.withTests !== false && steps.some((s) => s.id === "architecte"));

    const moduleFilter = `${univers.key}_${moduleInfo.matiere.draft}_module_${moduleInfo.num}`;
    const tests = shouldRunTests
        ? runModuleTests(moduleFilter)
        : { executed: false, exitCode: null, status: "not-run", filter: moduleFilter, tail: [] };

    const ctx = {
        generatedAt: generated.readable,
        univers,
        moduleInfo,
        exercice,
        paths,
        meta,
        scope,
        htmlMissions,
        profAgentFile,
        steps,
        tests,
        opts
    };

    const markdown = buildMarkdown(ctx);

    if (opts.dryRun) {
        return { ctx, markdown, relOut: "(dry-run)", tests, failed: tests.executed && tests.status === "failed" };
    }

    const outDir = path.join(repoRoot, ".github", "context", "verifications");
    const scopeSlug = exercice.kind === "module"
        ? "module"
        : exercice.kind === "seance"
            ? `s${exercice.seance}`
            : `s${exercice.seance}e${exercice.ecran}`;
    const onlySlug = opts.only ? `_${opts.only}` : "";
    const fileName = `VERIFY_${univers.key}_${moduleInfo.matiere.draft}_m${moduleInfo.num}_${scopeSlug}${onlySlug}_${generated.date}_${generated.time}.md`;
    const written = writeVerificationFiles(outDir, fileName, markdown);

    return {
        ctx,
        markdown,
        ...written,
        moduleInfo,
        scope,
        tests,
        failed: tests.executed && tests.status === "failed"
    };
}

function main() {
    let parsed;
    try {
        parsed = parseArgs(process.argv.slice(2));
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        printHelpAndExit(1);
    }

    if (parsed.opts.help || parsed.positional.length === 0) {
        printHelpAndExit(parsed.opts.help ? 0 : 1);
    }

    try {
        if (parsed.positional.length < 2) {
            throw new Error("Arguments requis: <univers> <cible> [exercice]");
        }

        const univers = normalizeUnivers(parsed.positional[0]);
        const cible = parseCibleToken(univers.key, parsed.positional[1]);
        const generated = nowParts();

        if (cible.kind === "subject") {
            if (parsed.positional[2]) {
                throw new Error(
                    `Exercice "${parsed.positional[2]}" incompatible avec une matiere entiere. ` +
                    `Utilise un module precis (ex: ${cible.matiere.draft}:2 ${parsed.positional[2]}).`
                );
            }

            const modules = discoverSubjectModules(univers.key, cible.matiere);
            const exercice = { kind: "module", seance: null, ecran: null };
            const results = [];
            let anyFailed = false;

            process.stdout.write(
                `Matiere ${univers.dir}/${cible.matiere.label}: ${modules.length} module(s) → ${modules.map((m) => m.num).join(", ")}\n`
            );

            for (const moduleInfo of modules) {
                const result = verifyOneModule({
                    univers,
                    moduleInfo,
                    exercice,
                    opts: parsed.opts,
                    generated
                });
                results.push(result);
                anyFailed = anyFailed || result.failed;

                process.stdout.write(
                    `- Module_${moduleInfo.num}: ${result.relOut} (${result.scope.screens.length} ecran(s)` +
                    `${result.tests.executed ? `, tests=${result.tests.status}` : ""})\n`
                );

                if (parsed.opts.dryRun) {
                    process.stdout.write(result.markdown);
                    process.stdout.write("\n---\n");
                }
            }

            if (!parsed.opts.dryRun) {
                const indexMarkdown = buildSubjectIndexMarkdown({
                    generatedAt: generated.readable,
                    univers,
                    matiere: cible.matiere,
                    results,
                    opts: parsed.opts
                });
                const outDir = path.join(repoRoot, ".github", "context", "verifications");
                const onlySlug = parsed.opts.only ? `_${parsed.opts.only}` : "";
                const fileName = `VERIFY_${univers.key}_${cible.matiere.draft}_all${onlySlug}_${generated.date}_${generated.time}.md`;
                const written = writeVerificationFiles(outDir, fileName, indexMarkdown);

                process.stdout.write(`Index matiere: ${written.relOut}\n`);
                process.stdout.write(`Derniere verification: ${written.relLatest}\n`);
            }

            process.stdout.write(`Mode: ${parsed.opts.only ? `A (${parsed.opts.only})` : "B (chaine)"}\n`);
            process.stdout.write("Traite les modules dans l'ordre croissant via l'index.\n");

            if (anyFailed) process.exitCode = 1;
            return;
        }

        const exercice = parseExerciceToken(parsed.positional[2]);
        const result = verifyOneModule({
            univers,
            moduleInfo: cible.moduleInfo,
            exercice,
            opts: parsed.opts,
            generated
        });

        if (parsed.opts.dryRun) {
            process.stdout.write(result.markdown);
            process.stdout.write("\n");
            if (result.tests.executed) {
                process.stdout.write(`Tests: ${result.tests.status} (exit=${result.tests.exitCode})\n`);
            }
            return;
        }

        process.stdout.write(`Verification generee: ${result.relOut}\n`);
        process.stdout.write(`Derniere verification: ${result.relLatest}\n`);
        process.stdout.write(
            `Perimetre: ${univers.dir} / ${cible.moduleInfo.matiere.label} Module_${cible.moduleInfo.num} / ${result.scope.label} (${result.scope.screens.length} ecran(s))\n`
        );
        process.stdout.write(`Mode: ${parsed.opts.only ? `A (${parsed.opts.only})` : "B (chaine)"}\n`);
        if (result.tests.executed) {
            process.stdout.write(`Tests Architecte: ${result.tests.status} (exit=${result.tests.exitCode})\n`);
        }
        process.stdout.write("Ouvre le fichier et execute les etapes dans l'ordre.\n");

        if (result.failed) process.exitCode = 1;
    } catch (error) {
        process.stderr.write(`Erreur: ${error.message}\n`);
        process.exit(1);
    }
}

main();
