#!/usr/bin/env node
"use strict";

/**
 * do-commit — commit detaile a partir de l'etat du working tree.
 *
 * Alias chat (C:\\Dev\\AGENTS.md): "do commit"
 * npm: npm run do-commit
 *
 * Options:
 *   --summary "texte"   Contexte conversation / intention (ajoute au message)
 *   --dry-run           Affiche le message et la liste des fichiers, sans commit
 *   --no-verify         Passe --no-verify a git commit (deconseille)
 */

const { execSync, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const repoRoot = path.resolve(__dirname, "..", "..");

const SECRET_PATTERNS = [
    /^\.env(\.|$)/i,
    /credentials\.json$/i,
    /secrets?\./i,
    /\.pem$/i,
    /\.key$/i
];

function parseArgs(argv) {
    const opts = { summary: "", dryRun: false, noVerify: false };
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--dry-run") opts.dryRun = true;
        else if (arg === "--no-verify") opts.noVerify = true;
        else if (arg === "--summary") {
            opts.summary = String(argv[++i] || "").trim();
        } else if (arg.startsWith("--summary=")) {
            opts.summary = arg.slice("--summary=".length).trim();
        }
    }
    return opts;
}

function run(command, options = {}) {
    return execSync(command, {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        ...options
    }).trim();
}

function tryRun(command) {
    try {
        return { ok: true, out: run(command) };
    } catch (error) {
        return {
            ok: false,
            out: ((error.stdout || "") + (error.stderr || "")).toString().trim(),
            code: Number.isInteger(error.status) ? error.status : 1
        };
    }
}

function isSecret(filePath) {
    const base = path.basename(filePath);
    return SECRET_PATTERNS.some((re) => re.test(base) || re.test(filePath));
}

function parseStatus() {
    const raw = tryRun("git status --porcelain").out || "";
    if (!raw) return [];
    return raw.split(/\r?\n/).filter(Boolean).map((line) => {
        // Porcelain v1: XY<space>PATH (path may start with '.')
        const match = line.match(/^(?<code>.{2}) (?<file>.+)$/);
        if (!match) {
            return { code: "??", file: line.trim() };
        }
        let file = match.groups.file.trim();
        if (file.startsWith("\"") && file.endsWith("\"")) {
            file = file.slice(1, -1).replace(/\\([\\\"])/g, "$1");
        }
        if (file.includes(" -> ")) file = file.split(" -> ").pop().trim();
        return { code: match.groups.code, file };
    });
}

function categorize(file) {
    const normalized = file.replace(/\\/g, "/");
    if (normalized.startsWith("tests/")) return "tests";
    if (normalized.startsWith("docs/modules/")) return "drafts";
    if (normalized.startsWith("docs/governance/") || normalized.startsWith(".github/")) {
        return "governance";
    }
    if (normalized.startsWith("Zyvah/Afro-Pop")) return "legacy";
    if (normalized.startsWith("assets/")) return "runtime";
    if (normalized === "README.md" || normalized === "package.json") return "docs";
    if (normalized.startsWith("tools/")) return "tools";
    return "other";
}

function categoryTitle(key) {
    return {
        tests: "Tests & validateurs",
        drafts: "Drafts modules",
        governance: "Gouvernance & workflow",
        legacy: "Parcours legacy",
        runtime: "Runtime",
        docs: "Documentation",
        tools: "Outils workflow",
        other: "Autres"
    }[key] || key;
}

function inferSubject(groups, summary) {
    if (summary) {
        const first = summary.split(/\r?\n/).map((l) => l.trim()).find(Boolean) || "";
        if (first.length > 0 && first.length <= 72) return first;
        if (first.length > 72) return first.slice(0, 69) + "...";
    }

    const keys = Object.keys(groups);
    if (keys.includes("tests") && keys.includes("governance")) {
        return "chore: audit follow-ups (tests, governance, meta drafts)";
    }
    if (keys.includes("tests")) return "test: strengthen validators and coverage";
    if (keys.includes("governance")) return "docs: update governance and workflow decisions";
    if (keys.includes("drafts")) return "docs: normalize module draft metadata";
    if (keys.includes("tools")) return "chore: add workflow tooling";
    return "chore: sync working tree changes";
}

function buildMessage({ files, summary, stat }) {
    const groups = {};
    files.forEach((file) => {
        const key = categorize(file);
        if (!groups[key]) groups[key] = [];
        groups[key].push(file);
    });

    const subject = inferSubject(groups, summary);
    const lines = [subject, ""];

    if (summary) {
        const body = summary.trim();
        // Evite de dupliquer la premiere ligne deja reprise comme subject
        const bodyLines = body.split(/\r?\n/);
        if (bodyLines[0] && bodyLines[0].trim() === subject) {
            const rest = bodyLines.slice(1).join("\n").trim();
            if (rest) {
                lines.push(rest);
                lines.push("");
            }
        } else {
            lines.push(body);
            lines.push("");
        }
    }

    lines.push("Details:");
    Object.keys(groups).sort().forEach((key) => {
        lines.push(`- ${categoryTitle(key)}:`);
        groups[key].forEach((file) => lines.push(`  - ${file}`));
    });

    if (stat) {
        lines.push("");
        lines.push("Diffstat:");
        stat.split(/\r?\n/).filter(Boolean).forEach((line) => {
            lines.push(`  ${line}`);
        });
    }

    return lines.join("\n");
}

function stageFiles(files) {
    // Staging via git add -A puis unstage des secrets eventuels
    const addAll = spawnSync("git", ["add", "-A"], {
        cwd: repoRoot,
        encoding: "utf8"
    });
    if (addAll.status !== 0) {
        console.error(addAll.stderr || addAll.stdout || "git add -A failed");
        process.exit(addAll.status || 1);
    }

    const secrets = files.filter(isSecret);
    if (secrets.length > 0) {
        spawnSync("git", ["restore", "--staged", "--", ...secrets], {
            cwd: repoRoot,
            encoding: "utf8"
        });
        console.error("do-commit: fichiers sensibles exclus du staging:");
        secrets.forEach((file) => console.error(`  - ${file}`));
        process.exit(1);
    }
}

function main() {
    const opts = parseArgs(process.argv.slice(2));

    if (!fs.existsSync(path.join(repoRoot, ".git"))) {
        console.error("do-commit: pas de depot git ici.");
        process.exit(1);
    }

    const status = parseStatus();
    if (status.length === 0) {
        console.log("do-commit: aucune modification a committer.");
        process.exit(0);
    }

    const blocked = status.filter((entry) => isSecret(entry.file));
    if (blocked.length > 0) {
        console.error("do-commit: fichiers sensibles exclus, commit annule:");
        blocked.forEach((entry) => console.error(`  - ${entry.file}`));
        process.exit(1);
    }

    const files = status.map((entry) => entry.file);
    const stat = tryRun("git diff --stat HEAD").out
        || tryRun("git diff --stat").out
        || "";

    const message = buildMessage({ files, summary: opts.summary, stat });

    console.log("do-commit: fichiers detects:");
    files.forEach((file) => console.log(`  - ${file}`));
    console.log("\n--- message ---\n" + message + "\n---------------\n");

    if (opts.dryRun) {
        console.log("do-commit: dry-run, aucun commit cree.");
        process.exit(0);
    }

    stageFiles(files);

    const commitArgs = ["commit", "-m", message];
    if (opts.noVerify) commitArgs.push("--no-verify");

    const commit = spawnSync("git", commitArgs, {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: "inherit"
    });

    if (commit.status !== 0) {
        process.exit(commit.status || 1);
    }

    const head = tryRun("git log -1 --oneline");
    console.log("\ndo-commit: OK — " + (head.out || "commit cree"));
}

main();
