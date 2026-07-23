#!/usr/bin/env node
"use strict";

/**
 * Génère les HTML d'un module Français Lovyc depuis son draft markdown.
 * Usage: node tools/workflow/build-fr-module-html.js <num> [--dry-run]
 * Ex: node tools/workflow/build-fr-module-html.js 3
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const moduleNum = Number.parseInt(process.argv[2], 10);
const dryRun = process.argv.includes("--dry-run");

if (!Number.isInteger(moduleNum) || moduleNum < 0) {
    process.stderr.write("Usage: node tools/workflow/build-fr-module-html.js <num>\n");
    process.exit(1);
}

const draftPath = path.join(repoRoot, "docs", "modules", `lovyc_fr_module_${moduleNum}.md`);
const outDir = path.join(repoRoot, "Lovyc", "Francais", `Module_${moduleNum}`);

const STORAGE_BY_NUM = {
    0: "lovyc_fr_w0_v1",
    1: "lovyc_fr_w1_v2",
    2: "lovyc_fr_w2_v2",
    3: "lovyc_fr_w3_v1",
    4: "lovyc_fr_w4_v1"
};

const PREREQ_BY_NUM = {
    1: { key: "lovyc_fr_w0_v1", min: 1 },
    2: { key: "lovyc_fr_w1_v2", min: 5 },
    3: { key: "lovyc_fr_w2_v2", min: 5 },
    4: { key: "lovyc_fr_w3_v1", min: 5 }
};

const MODULE_META = {
    3: {
        lobbyTitle: "Phrase Complexe",
        lobbyIntro: "Agent Lovyc, tu enchaînes les idées. Coordination, subordination et connecteurs : ton rapport devient net.",
        tag: "LIENS LOGIQUES",
        icons: ["🔗", "🧩", "⚡", "🧭", "🎖️"]
    },
    4: {
        lobbyTitle: "Argumentation",
        lobbyIntro: "Mission convaincre : thèse, arguments, exemples, puis un compte-rendu clair et structuré.",
        tag: "CONVAINCRE",
        icons: ["🎯", "🧠", "⚖️", "📋", "🏆"]
    }
};

const storageKey = STORAGE_BY_NUM[moduleNum];
if (!storageKey) {
    process.stderr.write(`Storage key manquante pour module ${moduleNum}\n`);
    process.exit(1);
}

function stripQuotes(s) {
    return String(s || "")
        .trim()
        .replace(/^["'«»]+|["'«»]+$/g, "")
        .trim();
}

function parseQuotedList(raw) {
    if (!raw) return [];
    const matches = [...String(raw).matchAll(/"([^"]*)"/g)];
    if (matches.length) return matches.map((m) => m[1]);
    return String(raw)
        .split(",")
        .map((s) => stripQuotes(s))
        .filter(Boolean);
}

function splitMissions(content) {
    const re = /^##\s+Mission\s+(\d+)\s*[-–—]?\s*(.*)$/gim;
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

function splitScreens(missionBody) {
    const re = /^###\s+(?:Ecran|Écran)\s+(\d+)\s*[-–—]\s*(.+)$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(missionBody)) !== null) {
        matches.push({ num: Number.parseInt(m[1], 10), titleLine: (m[2] || "").trim(), start: m.index, headerLen: m[0].length });
    }
    return matches.map((item, idx) => {
        const end = idx + 1 < matches.length ? matches[idx + 1].start : missionBody.length;
        return { num: item.num, titleLine: item.titleLine, block: missionBody.slice(item.start, end) };
    });
}

function fieldLines(block, name) {
    const re = new RegExp(`-\\s*${name}\\s*:\\s*(.+)`, "i");
    const m = block.match(re);
    return m ? m[1].trim() : null;
}

function collectTexts(block) {
    const texts = [];
    const re = /-\s*(?:Texte|Liste|Exemple)\s*:\s*(.+)/gi;
    let m;
    while ((m = re.exec(block)) !== null) {
        texts.push(m[1].trim());
    }
    return texts;
}

function parseRequirements(block) {
    const reqStart = block.search(/-\s*Requirements\s*:/i);
    if (reqStart === -1) return null;
    const after = block.slice(reqStart);
    const endMatch = after.search(/\n-\s*(?:Hint|Hint2|Hint3|Feedback)\s*:/i);
    const field = endMatch === -1 ? after : after.slice(0, endMatch);

    const reqs = {};
    const mode = field.match(/mode\s*:\s*"(.+?)"/i);
    if (mode) reqs.mode = mode[1];

    const kw = field.match(/keywords\s*:\s*(.+)/i);
    if (kw) reqs.keywords = parseQuotedList(kw[1]);

    const groups = [];
    const groupRe = /-\s*\[([^\]]+)\]/g;
    let gm;
    while ((gm = groupRe.exec(field)) !== null) {
        const g = parseQuotedList(gm[1]);
        if (g.length) groups.push(g);
    }
    if (groups.length) reqs.keywordGroups = groups;

    const minWords = field.match(/minWords\s*:\s*(\d+)/i);
    if (minWords) reqs.minWords = Number.parseInt(minWords[1], 10);

    const minSentences = field.match(/minSentences\s*:\s*(\d+)/i);
    if (minSentences) reqs.minSentences = Number.parseInt(minSentences[1], 10);

    const enforce = field.match(/enforceKeywords\s*:\s*(true|false)/i);
    if (enforce) reqs.enforceKeywords = enforce[1].toLowerCase() === "true";

    const must = field.match(/mustInclude\s*:\s*(.+)/i);
    if (must) reqs.mustInclude = parseQuotedList(must[1]);

    return Object.keys(reqs).length ? reqs : null;
}

function parseOptions(raw) {
    if (!raw) return [];
    return raw
        .split('" / "')
        .map((opt) => opt.replace(/^"|"$/g, "").trim())
        .filter(Boolean);
}

function lessonContent(texts) {
    const chunks = texts.map((t) => {
        const cleaned = stripQuotes(t);
        if (cleaned.includes(" / ")) {
            return cleaned
                .split(" / ")
                .map((part) => stripQuotes(part))
                .map((part) => `<p>${escapeHtml(part)}</p>`)
                .join("");
        }
        return `<p>${escapeHtml(cleaned)}</p>`;
    });
    return `\n                    <div class="content-chunk">\n                    ${chunks.join("\n                    ")}\n                    </div>`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
}

function shortTitle(titleLine) {
    return titleLine.replace(/^(lesson|interactive|write|challenge)\s*[-–—]\s*/i, "").trim();
}

function toStep(screen) {
    const typeMatch = screen.titleLine.match(/^(lesson|interactive|write|challenge)\b/i);
    const type = (typeMatch ? typeMatch[1] : "lesson").toLowerCase();
    const title = shortTitle(screen.titleLine);
    const step = { type, title };

    if (type === "lesson") {
        step.content = lessonContent(collectTexts(screen.block));
        return step;
    }

    if (type === "interactive") {
        const question = stripQuotes(fieldLines(screen.block, "Question") || "");
        const options = parseOptions(fieldLines(screen.block, "Options") || "");
        const answerText = stripQuotes(fieldLines(screen.block, "Réponse") || fieldLines(screen.block, "Reponse") || "");
        let answer = options.findIndex((opt) => opt === answerText);
        if (answer < 0) {
            answer = options.findIndex((opt) => opt.toLowerCase() === answerText.toLowerCase());
        }
        if (answer < 0) answer = 0;
        step.question = question;
        step.options = options;
        step.answer = answer;
        step.feedback = stripQuotes(fieldLines(screen.block, "Feedback") || "Correct.");
        return step;
    }

    if (type === "write" || type === "challenge") {
        step.question = stripQuotes(fieldLines(screen.block, "Question") || "");
        const reqs = parseRequirements(screen.block);
        if (reqs) step.requirements = reqs;
        const hint = fieldLines(screen.block, "Hint");
        const hint2 = fieldLines(screen.block, "Hint2");
        const hint3 = fieldLines(screen.block, "Hint3");
        if (hint) step.hint = stripQuotes(hint);
        if (hint2) step.hint2 = stripQuotes(hint2);
        if (hint3) step.hint3 = stripQuotes(hint3);
        step.feedback = stripQuotes(fieldLines(screen.block, "Feedback") || "Bien.");
        return step;
    }

    return null;
}

function extractIntros(content) {
    const intros = {};
    const re = /##\s+Mission\s+(\d+)[\s\S]*?###\s+Objectifs pédagogiques[\s\S]*?- (.+)/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
        intros[Number.parseInt(m[1], 10)] = stripQuotes(m[2]).slice(0, 120);
    }
    return intros;
}

function missionHtml({ mission, steps, moduleNum, storageKey, isLast }) {
    const successTitle = isLast ? `MODULE ${moduleNum} VALIDE !` : "MISSION ACCOMPLIE !";
    const successText = isLast
        ? "Ton signal est net. Les liens logiques tiennent. Direction le prochain module."
        : "Ton grade a ete mis a jour. La transmission est fluide et structuree.";
    const nextBox = isLast
        ? `<div class="box-concept next-mission-call">
                <span>MODULE TERMINE</span><br>
                POUR LE PROCHAIN MODULE.
            </div>`
        : `<div class="box-concept next-mission-call">
                <span>REVIENS DEMAIN</span><br>
                POUR LA SUITE.
            </div>`;

    const weekData = [{ id: mission.num, title: mission.title, steps }];

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo= ">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Lovyc - Mission ${mission.num} | Module ${moduleNum}</title>
    <link rel="stylesheet" href="../../../assets/lovyc/tactical.css">
</head>
<body>

<div id="app">
    <div class="header">
        <div class="progress-meta">
            <span id="progress-text">MISSION EN COURS</span>
            <span id="session-tag">${(MODULE_META[moduleNum] && MODULE_META[moduleNum].tag) || "MISSION"}</span>
        </div>
        <div class="bar-container"><div id="main-bar" class="bar-fill"></div></div>
    </div>

    <div id="view-content" class="view active">
        <h2 id="step-title" style="margin-bottom:20px;"></h2>
        <div id="step-body"></div>
    </div>

    <div id="view-success" class="view">
        <div class="success-card">
            <div class="visual-anchor">
                <svg viewBox="0 0 200 200" style="width: 180px; height: 180px;">
                    <path d="M60 40 L140 40 L130 100 Q100 130 70 100 Z" fill="none" stroke="var(--accent)" stroke-width="4" />
                    <text x="100" y="82" text-anchor="middle" style="fill: var(--accent); font-family: var(--font-mono); font-weight: 900; font-size: 20px;">MVP</text>
                </svg>
            </div>
            <h1 class="success-title">${successTitle}</h1>
            <p class="success-text">${successText}</p>
            ${nextBox}
            <button onclick="location.href='index.html'" class="btn-main">RETOUR</button>
        </div>
    </div>

    <div class="footer-nav hidden" id="footer">
        <div class="btn-group">
            <button id="btn-prev" class="btn-nav hidden">RETOUR</button>
            <button id="btn-next" class="btn-main">CONTINUER</button>
        </div>
    </div>
</div>

<script src="../../../assets/shared/engine.js?v=20260210"></script>
<script src="../../../assets/lovyc/fr_validator.js?v=20260210"></script>
<script>
    window.APP_CONFIG = {
        STORAGE_KEY: ${JSON.stringify(storageKey)},
        SINGLE_MISSION_MODE: ${mission.num},
        TRACKING_SUBJECT: "Francais",
        TRACKING_MODULE: "Module_${moduleNum}",
    };

    const weekData = ${JSON.stringify(weekData, null, 4)};

    document.addEventListener('DOMContentLoaded', () => initEngine(weekData));
</script>

</body>
</html>
`;
}

function indexHtml({ missions, intros, moduleNum, storageKey }) {
    const meta = MODULE_META[moduleNum] || {
        lobbyTitle: `MODULE ${moduleNum}`,
        lobbyIntro: "Suite du parcours Tactical Comms.",
        icons: ["🎯", "📡", "🔥", "💎", "🚀"]
    };
    const prereq = PREREQ_BY_NUM[moduleNum];
    const weekData = missions.map((m, idx) => ({
        id: m.num,
        title: m.title,
        intro: intros[m.num] || `Mission ${m.num}/5.`,
        icon: meta.icons[idx] || "🎯"
    }));

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo= ">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Lovyc - ${meta.lobbyTitle} | Module ${moduleNum}</title>
    <link rel="stylesheet" href="../../../assets/lovyc/tactical.css">
</head>
<body>

<div id="app">
    <div class="header">
        <div class="progress-meta">
            <span id="progress-text">SYNCHRO TACTIQUE : 0%</span>
            <span id="session-tag">CENTRE DE COMMANDE</span>
        </div>
        <div class="bar-container"><div id="main-bar" class="bar-fill"></div></div>
    </div>

    <div id="view-lobby" class="view active">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
            <div style="width: 50px; height: 50px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px var(--accent-glow);">
                <svg viewBox="0 0 24 24" style="width: 30px; fill: #000;"><path d="M14,10H19.5L14,4.5V10M5,2H15L21,8V20A2,2 0 0,1 19,22H5C3.89,22 3,21.1 3,20V4C3,2.89 3.89,2 5,2M5,4V20H19V12H12V4H5Z"/></svg>
            </div>
            <h1 class="lobby-title" style="margin-bottom: 0;">${meta.lobbyTitle}</h1>
        </div>
        <p class="lobby-intro">${meta.lobbyIntro}</p>
        
        <div class="days-grid" id="days-grid">
        </div>

        <a href="../../index.html" class="btn-nav" style="margin-top: 30px; width: 100%; text-align: center; display: block; border: 1px solid rgba(255,255,255,0.1);">RETOUR AU CENTRE DE COMMANDE</a>
    </div>
</div>

<script>
    window.APP_CONFIG = {
        STORAGE_KEY: ${JSON.stringify(storageKey)},
        ${prereq ? `PREREQUISITE_KEY: ${JSON.stringify(prereq.key)},` : ""}
        ${prereq ? `PREREQUISITE_MIN: ${prereq.min},` : ""}
        MODULE_NAME: "MODULE ${moduleNum}",
        MISSION_LABEL: "MISSION",
        BASE_PATH: './'
    };

    const weekData = ${JSON.stringify(weekData, null, 4)};
</script>
<script src="../../../assets/shared/engine.js?v=20260210"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => initEngine(weekData));
</script>

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
    const missions = splitMissions(content);
    const intros = extractIntros(content);

    if (missions.length === 0) {
        process.stderr.write("Aucune mission trouvee.\n");
        process.exit(1);
    }

    const built = missions.map((mission) => {
        const screens = splitScreens(mission.body);
        const steps = screens.map(toStep).filter(Boolean);
        return { mission, steps };
    });

    if (dryRun) {
        built.forEach(({ mission, steps }) => {
            process.stdout.write(`Mission ${mission.num}: ${steps.length} steps\n`);
        });
        return;
    }

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
        path.join(outDir, "index.html"),
        indexHtml({
            missions: built.map((b) => b.mission),
            intros,
            moduleNum,
            storageKey
        }),
        "utf8"
    );

    built.forEach(({ mission, steps }, idx) => {
        const html = missionHtml({
            mission,
            steps,
            moduleNum,
            storageKey,
            isLast: idx === built.length - 1
        });
        fs.writeFileSync(path.join(outDir, `mission_${mission.num}.html`), html, "utf8");
        process.stdout.write(`OK mission_${mission.num}.html (${steps.length} steps)\n`);
    });

    process.stdout.write(`OK index.html\n`);
    process.stdout.write(`Sortie: ${path.relative(repoRoot, outDir).replace(/\\/g, "/")}\n`);
}

main();
