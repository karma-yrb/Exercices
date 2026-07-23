#!/usr/bin/env node
"use strict";

/**
 * Génère les HTML d'un module Maths Zyvah depuis son draft markdown.
 * Usage: node tools/workflow/build-maths-module-html.js <num> [--dry-run]
 * Ex: node tools/workflow/build-maths-module-html.js 3
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const moduleNum = Number.parseInt(process.argv[2], 10);
const dryRun = process.argv.includes("--dry-run");

if (!Number.isInteger(moduleNum) || moduleNum < 0) {
    process.stderr.write("Usage: node tools/workflow/build-maths-module-html.js <num>\n");
    process.exit(1);
}

const draftPath = path.join(repoRoot, "docs", "modules", `zyvah_maths_module_${moduleNum}.md`);
const outDir = path.join(repoRoot, "Zyvah", "Maths", `Module_${moduleNum}`);
const storageModuleId = `zyvah_maths_w${moduleNum}`;
const prereqModuleId = moduleNum > 0 ? `zyvah_maths_w${moduleNum - 1}` : null;
const prereqMin = moduleNum === 1 ? 1 : (moduleNum > 1 ? 5 : null);

function mdInlineToHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
}

function parseQuotedList(raw) {
    if (!raw) return [];
    const matches = [...String(raw).matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`/g)];
    if (matches.length) return matches.map((m) => m[1] || m[2] || m[3]);
    return String(raw)
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["'`]|["'`]$/g, ""))
        .filter(Boolean);
}

function parseKeywordGroups(block) {
    const line = block.match(/keywordGroups\s*:\s*(.+)/i);
    if (!line) return [];
    const raw = line[1].trim();
    // Format: [["a","b"],["c"]]
    const groups = [];
    const groupRe = /\[([^\]]*)\]/g;
    let m;
    // Skip outer if present
    const inner = raw.replace(/^\[/, "").replace(/\]$/, "");
    while ((m = groupRe.exec(raw)) !== null) {
        const g = parseQuotedList(`[${m[1]}]`);
        if (g.length) groups.push(g);
    }
    // If nested [[...]] the first match might be wrong; try JSON-ish
    if (groups.length === 0 && raw.includes("[")) {
        try {
            const jsonish = raw.replace(/'/g, '"');
            const parsed = JSON.parse(jsonish);
            if (Array.isArray(parsed)) {
                parsed.forEach((g) => {
                    if (Array.isArray(g) && g.length) groups.push(g.map(String));
                });
            }
        } catch {
            // ignore
        }
    }
    return groups;
}

function splitSeances(content) {
    const re = /^##\s+(?:Mission|S(?:e|é)ance)\s+(\d+)\s*[-–—]?\s*(.*)$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(content)) !== null) {
        matches.push({ num: Number.parseInt(m[1], 10), title: (m[2] || "").trim(), start: m.index, headerLen: m[0].length });
    }
    return matches.map((item, idx) => {
        const end = idx + 1 < matches.length ? matches[idx + 1].start : content.length;
        return { num: item.num, title: item.title, body: content.slice(item.start + item.headerLen, end) };
    });
}

function splitScreens(seanceBody) {
    const re = /^###\s+(?:Ecran|Écran)\s+(\d+)\s*[-–—]\s*(.+)$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(seanceBody)) !== null) {
        matches.push({ num: Number.parseInt(m[1], 10), titleLine: (m[2] || "").trim(), start: m.index, headerLen: m[0].length });
    }
    return matches.map((item, idx) => {
        const end = idx + 1 < matches.length ? matches[idx + 1].start : seanceBody.length;
        return { num: item.num, titleLine: item.titleLine, block: seanceBody.slice(item.start, end) };
    });
}

function extractField(block, names) {
    for (const name of names) {
        const re = new RegExp(`\\*\\*${name}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[A-ZÉÀÂÄÈÊËÎÏÔÙÛÜÇ ]+:\\*\\*|\\n---|\\n### |$)`, "i");
        const m = block.match(re);
        if (m) return m[1].trim();
    }
    return null;
}

function extractType(titleLine, block) {
    const fromTitle = titleLine.match(/^(msg|lesson|quiz|write|challenge|interactive|checkpoint)\b/i);
    if (fromTitle) return fromTitle[1].toLowerCase() === "lesson" ? "msg" : fromTitle[1].toLowerCase();
    const t = extractField(block, ["Type"]);
    if (!t) return "msg";
    const cleaned = t.replace(/`/g, "").trim().toLowerCase();
    if (cleaned === "lesson") return "msg";
    return cleaned;
}

function stripQuotes(s) {
    return String(s || "")
        .trim()
        .replace(/^["'`]+|["'`]+$/g, "")
        .trim();
}

function parseOptions(block) {
    const field = extractField(block, ["Options"]);
    if (!field) return { opts: [], correct: 0 };
    const lines = field.split(/\n/).map((l) => l.trim()).filter((l) => l.startsWith("-"));
    let correct = 0;
    const opts = lines.map((line, idx) => {
        let text = line.replace(/^-+\s*/, "").trim();
        const isCorrect = /✅/.test(text);
        text = text.replace(/✅/g, "").trim();
        text = stripQuotes(text);
        if (isCorrect) correct = idx;
        return text;
    });
    return { opts, correct };
}

function parseRequirements(block) {
    const field = extractField(block, ["Requirements"]);
    if (!field) return null;
    const reqs = {};
    const kw = field.match(/keywords\s*:\s*(.+)/i);
    if (kw) reqs.keywords = parseQuotedList(kw[1]);
    const groups = parseKeywordGroups(field);
    if (groups.length) reqs.keywordGroups = groups;
    const minWords = field.match(/minWords\s*:\s*(\d+)/i);
    if (minWords) reqs.minWords = Number.parseInt(minWords[1], 10);
    const validationType = field.match(/validationType\s*:\s*"?([a-zA-Z_]+)"?/i);
    if (validationType) reqs.validationType = validationType[1];
    const enforce = field.match(/enforceKeywords\s*:\s*(true|false)/i);
    if (enforce) reqs.enforceKeywords = enforce[1].toLowerCase() === "true";
    return Object.keys(reqs).length ? reqs : null;
}

function shortTitle(titleLine) {
    return titleLine.replace(/^(msg|lesson|quiz|write|challenge|interactive|checkpoint)\s*[-–—]\s*/i, "").trim();
}

function toStep(screen) {
    const type = extractType(screen.titleLine, screen.block);
    const title = shortTitle(screen.titleLine);
    const step = { type, title };

    if (type === "msg") {
        const texte = extractField(screen.block, ["Texte", "Text"]);
        step.body = `<p class="content-chunk">${mdInlineToHtml(stripQuotes(texte || ""))}</p>`;
        return step;
    }

    if (type === "quiz" || type === "interactive") {
        const q = extractField(screen.block, ["Question"]);
        const { opts, correct } = parseOptions(screen.block);
        const feed = extractField(screen.block, ["Feedback"]);
        step.q = mdInlineToHtml(stripQuotes(q || ""));
        step.opts = opts;
        step.a = correct;
        step.feed = mdInlineToHtml(stripQuotes(feed || "Correct !"));
        return step;
    }

    if (type === "write" || type === "challenge") {
        const q = extractField(screen.block, ["Question"]);
        const hint = extractField(screen.block, ["Hint"]);
        const feed = extractField(screen.block, ["Feedback"]);
        step.q = mdInlineToHtml(stripQuotes(q || "")).replace(/<br><br>/g, "<br><br>");
        const reqs = parseRequirements(screen.block);
        if (reqs) step.requirements = reqs;
        if (hint) step.hint = mdInlineToHtml(stripQuotes(hint));
        step.feed = mdInlineToHtml(stripQuotes(feed || "Correct !"));
        return step;
    }

    // checkpoint ignored in mission steps
    return null;
}

function missionHtml({ seance, steps, moduleNum, storageModuleId, isLast, checkpointAfter }) {
    let successNext;
    if (checkpointAfter) {
        successNext = `<div class="box-concept next-mission-call"><span>CHECKPOINT</span><br>Pause méritée</div>
            <button onclick="window.location.href='checkpoint_${checkpointAfter}.html'" class="btn-main">CONTINUER</button>`;
    } else if (isLast) {
        successNext = `<div class="box-concept next-mission-call"><span>MODULE TERMINÉ</span><br>Retour hub Maths</div>
            <button onclick="window.location.href='../index.html'" class="btn-main">RETOUR HUB</button>`;
    } else {
        successNext = `<div class="box-concept next-mission-call"><span>DIRECTION</span><br>Seance ${seance.num + 1}</div>
            <button onclick="window.location.href='index.html'" class="btn-main">RETOUR SEANCES</button>`;
    }

    const weekData = [{
        id: seance.num,
        title: seance.title,
        steps
    }];

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Seance ${seance.num} - ${seance.title.replace(/"/g, "")}</title>
    <link rel="stylesheet" href="../../../assets/zyvah/studio.css">
</head>
<body>

<div id="app">
    <div class="header">
        <div class="progress-meta">
            <span id="progress-text">SYNCHRO : 0%</span>
            <span id="session-tag">Seance ${seance.num}/5</span>
        </div>
        <div class="bar-container"><div id="main-bar" class="bar-fill"></div></div>
    </div>

    <div id="view-content" class="view active">
        <h2 id="step-title"></h2>
        <div id="step-body"></div>
        <div id="footer" class="footer">
            <button id="btn-prev" class="btn-nav">RETOUR</button>
            <button id="btn-next" class="btn-nav">ÉTAPE SUIVANTE</button>
        </div>
    </div>

    <div id="view-success" class="view">
        <div class="success-card">
            <div class="visual-anchor">
                <svg viewBox="0 0 24 24" style="width:100px;height:100px;fill:var(--accent);filter: drop-shadow(0 0 10px var(--accent-glow));">
                    <path d="M12,4L12,14.71C11.53,14.26 10.89,14 10.19,14A2.69,2.69 0 0,0 7.5,16.69C7.5,18.18 8.7,19.38 10.19,19.38C11.68,19.38 12.88,18.18 12.88,16.69V7H17.31V4H12M10.19,18.13C9.4,18.13 8.75,17.48 8.75,16.69C8.75,15.9 9.4,15.25 10.19,15.25C10.97,15.25 11.63,15.9 11.63,16.69C11.63,17.48 10.97,18.13 10.19,18.13Z"/>
                </svg>
            </div>
            <h1 class="success-title">Seance ${seance.num} TERMINÉE !</h1>
            <p class="success-text">${seance.title}</p>
            ${successNext}
        </div>
    </div>
</div>

<script src="../../../assets/shared/storage-keys.js"></script>
<script>
    window.APP_CONFIG = {
        STORAGE_KEY: storageKey(${JSON.stringify(storageModuleId)}),
        SINGLE_MISSION_MODE: true,
        MISSION_LABEL: "SEANCE",
        QUIT_HREF: "index.html",
        TRACKING_SUBJECT: "Maths",
        TRACKING_MODULE: "Module_${moduleNum}",
        BASE_PATH: "./"
    };

    const weekData = ${JSON.stringify(weekData, null, 4)};
</script>

<script src="../../../assets/shared/engine.js"></script>

</body>
</html>
`;
}

function indexHtml({ seances, moduleNum, storageModuleId, prereqModuleId, prereqMin }) {
    const days = seances.map((s) => ({
        id: s.num,
        icon: ["🎚️", "✨", "➕", "✖️", "🏆"][s.num - 1] || "🎧",
        title: s.title,
        intro: `Seance ${s.num}/5 · ~12 min`
    }));

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Zyvah - Studio Maths | Module ${moduleNum} - Fractions & Partage</title>
    <link rel="stylesheet" href="../../../assets/zyvah/studio.css">
</head>
<body>

<div id="app">
    <div class="header">
        <div class="progress-meta">
            <span id="progress-text">SYNCHRO STUDIO MATHS : 0%</span>
            <span id="session-tag">MODULE ${moduleNum}</span>
        </div>
        <div class="bar-container"><div id="main-bar" class="bar-fill"></div></div>
    </div>

    <div id="view-lobby" class="view active">
        <div style="display:flex; justify-content: space-between; align-items: flex-start;">
            <div>
                <h1 class="lobby-title">Studio Fractions & Partage</h1>
                <p class="lobby-intro">Zyvah, découpe les gains comme un split de master. Remédiation Cycle 4 → pont Seconde.</p>
            </div>
            <div style="margin-top: 5px;">
                <svg viewBox="0 0 24 24" style="width:40px;height:40px;fill:var(--accent);filter: drop-shadow(0 0 5px var(--accent-glow));">
                    <path d="M12,4L12,14.71C11.53,14.26 10.89,14 10.19,14A2.69,2.69 0 0,0 7.5,16.69C7.5,18.18 8.7,19.38 10.19,19.38C11.68,19.38 12.88,18.18 12.88,16.69V7H17.31V4H12M10.19,18.13C9.4,18.13 8.75,17.48 8.75,16.69C8.75,15.9 9.4,15.25 10.19,15.25C10.97,15.25 11.63,15.9 11.63,16.69C11.63,17.48 10.97,18.13 10.19,18.13Z"/>
                </svg>
            </div>
        </div>
        <div class="days-grid" id="days-grid"></div>
        <a href="../index.html" class="btn-nav" style="margin-top: 30px; width: 100%; text-align: center; display: block; border: 1px solid rgba(255,255,255,0.1);">RETOUR STUDIO</a>
    </div>
</div>

<script src="../../../assets/shared/storage-keys.js"></script>
<script>
    window.APP_CONFIG = {
        STORAGE_KEY: storageKey(${JSON.stringify(storageModuleId)}),
        MODULE_NAME: "Fractions & Partage",
        MISSION_LABEL: "SEANCE",
        ${prereqModuleId ? `PREREQUISITE_KEY: storageKey(${JSON.stringify(prereqModuleId)}),` : ""}
        ${prereqMin != null ? `PREREQUISITE_MIN: ${prereqMin},` : ""}
        BASE_PATH: "./"
    };

    const weekData = ${JSON.stringify(days, null, 4)};
</script>

<script src="../../../assets/shared/engine.js"></script>

</body>
</html>
`;
}

function checkpointHtml(n, moduleNum) {
    const pct = n === 1 ? "40%" : "80%";
    const nextMission = n === 1 ? 3 : 5;
    const acquis = n === 1
        ? `<p>✅ Anatomie d'une part</p><p>✅ Simplification / comparaison</p>`
        : `<p>✅ Additions / soustractions</p><p>✅ Produits / quotients</p>`;
    const coming = n === 1
        ? `<p>🔜 Additions & soustractions</p><p>🔜 Produits & quotients</p>`
        : `<p>🔜 Split Master (synthèse)</p>`;

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Checkpoint Studio ${n}/2</title>
    <link rel="stylesheet" href="../../../assets/zyvah/studio.css">
</head>
<body>
<div id="app">
    <div class="view active">
        <div class="success-card" style="margin-top: 50px;">
            <h1 class="success-title">🎧 CHECKPOINT STUDIO - Pause Méritée</h1>
            <div class="box-concept" style="margin: 25px 0; padding: 20px; text-align:left;">
                <p>Bravo Zyvah ! Tu as bouclé <b>${pct} du module</b>.</p>
                <h3 style="color: var(--accent);">Acquis validés :</h3>
                ${acquis}
                <h3 style="color: var(--accent);">À venir :</h3>
                ${coming}
                <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.85;">Prends une pause de 5 min. Progression sauvegardée.</p>
            </div>
            <button onclick="window.location.href='mission_${nextMission}.html'" class="btn-main">CONTINUER</button>
        </div>
    </div>
</div>
</body>
</html>
`;
}

function main() {
    if (!fs.existsSync(draftPath)) {
        process.stderr.write(`Draft introuvable: ${draftPath}\n`);
        process.exit(1);
    }

    const content = fs.readFileSync(draftPath, "utf8");
    const seances = splitSeances(content).filter((s) => !/^Notes Techniques/i.test(s.title));
    if (seances.length === 0) {
        process.stderr.write("Aucune seance trouvee.\n");
        process.exit(1);
    }

    const built = seances.map((seance) => {
        const screens = splitScreens(seance.body);
        const steps = screens.map(toStep).filter(Boolean);
        return { seance, steps };
    });

    if (dryRun) {
        built.forEach(({ seance, steps }) => {
            process.stdout.write(`Seance ${seance.num}: ${steps.length} steps\n`);
        });
        return;
    }

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
        path.join(outDir, "index.html"),
        indexHtml({
            seances: built.map((b) => b.seance),
            moduleNum,
            storageModuleId,
            prereqModuleId,
            prereqMin
        }),
        "utf8"
    );

    built.forEach(({ seance, steps }, idx) => {
        const checkpointAfter = seance.num === 2 ? 1 : (seance.num === 4 ? 2 : null);
        const html = missionHtml({
            seance,
            steps,
            moduleNum,
            storageModuleId,
            isLast: idx === built.length - 1,
            checkpointAfter
        });
        fs.writeFileSync(path.join(outDir, `mission_${seance.num}.html`), html, "utf8");
        process.stdout.write(`OK mission_${seance.num}.html (${steps.length} steps)\n`);
    });

    fs.writeFileSync(path.join(outDir, "checkpoint_1.html"), checkpointHtml(1, moduleNum), "utf8");
    fs.writeFileSync(path.join(outDir, "checkpoint_2.html"), checkpointHtml(2, moduleNum), "utf8");
    process.stdout.write(`OK index.html + checkpoints\n`);
    process.stdout.write(`Sortie: ${path.relative(repoRoot, outDir).replace(/\\/g, "/")}\n`);
}

main();
