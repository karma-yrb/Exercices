#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..");
const withTests = process.argv.includes("--with-tests");

function run(command) {
    try {
        return {
            ok: true,
            out: execSync(command, {
                cwd: repoRoot,
                encoding: "utf8",
                stdio: ["ignore", "pipe", "pipe"]
            }).trim()
        };
    } catch (error) {
        return {
            ok: false,
            out: (error.stdout || "").toString().trim(),
            err: (error.stderr || "").toString().trim(),
            code: Number.isInteger(error.status) ? error.status : 1
        };
    }
}

function parseAheadBehind(raw) {
    if (!raw) return { behind: null, ahead: null };
    const parts = raw.split(/\s+/).filter(Boolean);
    if (parts.length < 2) return { behind: null, ahead: null };
    const behind = Number.parseInt(parts[0], 10);
    const ahead = Number.parseInt(parts[1], 10);
    return {
        behind: Number.isFinite(behind) ? behind : null,
        ahead: Number.isFinite(ahead) ? ahead : null
    };
}

function parseStatusLines(raw) {
    if (!raw) return [];
    return raw
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => ({
            code: line.slice(0, 2),
            file: line.slice(3).trim()
        }));
}

function nowParts(date) {
    const pad = (n) => String(n).padStart(2, "0");
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    return {
        date: `${y}-${m}-${d}`,
        time: `${hh}-${mm}-${ss}`,
        readable: `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    };
}

function findLatestAudit() {
    const reviewsDir = path.join(repoRoot, ".github", "reviews");
    if (!fs.existsSync(reviewsDir)) return null;

    const files = fs.readdirSync(reviewsDir)
        .filter((name) => name.toLowerCase().endsWith(".md"));

    if (files.length === 0) return null;

    const enriched = files.map((name) => {
        const fullPath = path.join(reviewsDir, name);
        const stat = fs.statSync(fullPath);
        const dateMatch = name.match(/(\d{4}-\d{2}-\d{2})/);
        const parsedDate = dateMatch ? new Date(`${dateMatch[1]}T00:00:00`) : null;
        return { name, stat, parsedDate };
    });

    enriched.sort((a, b) => {
        const aScore = a.parsedDate ? a.parsedDate.getTime() : 0;
        const bScore = b.parsedDate ? b.parsedDate.getTime() : 0;
        if (aScore !== bScore) return bScore - aScore;
        return b.stat.mtimeMs - a.stat.mtimeMs;
    });

    return `.github/reviews/${enriched[0].name}`;
}

function runTestsIfRequested() {
    if (!withTests) {
        return {
            executed: false,
            exitCode: null,
            status: "not-run",
            tail: []
        };
    }

    const result = spawnSync("node", ["tests/test-runner.js"], {
        cwd: repoRoot,
        encoding: "utf8"
    });

    const output = `${result.stdout || ""}\n${result.stderr || ""}`.trim();
    const lines = output ? output.split(/\r?\n/) : [];
    const sanitized = lines.map((line) => line.replace(/[^\x20-\x7E]/g, "?"));
    const tail = sanitized.slice(Math.max(0, sanitized.length - 25));

    const totalMatch = output.match(/Total de tests:\s*(\d+)/i);
    const successMatch = output.match(/R.{0,3}ussis:\s*(\d+)/i);
    const failedMatch = output.match(/.{0,2}chou.{0,3}:\s*(\d+)/i);
    const warningMatch = output.match(/Warnings:\s*(\d+)/i);

    return {
        executed: true,
        exitCode: result.status,
        status: result.status === 0 ? "passed" : "failed",
        tail,
        summary: {
            total: totalMatch ? Number.parseInt(totalMatch[1], 10) : null,
            passed: successMatch ? Number.parseInt(successMatch[1], 10) : null,
            failed: failedMatch ? Number.parseInt(failedMatch[1], 10) : null,
            warnings: warningMatch ? Number.parseInt(warningMatch[1], 10) : null
        }
    };
}

function makeActionChecklist(ctx) {
    const items = [];

    if (ctx.behind !== null && ctx.behind > 0) {
        items.push(`Synchroniser avec l'upstream (${ctx.behind} commit(s) de retard): \`git pull --rebase\`.`);
    }

    if (ctx.isDirty) {
        items.push("Verifier puis valider les modifs locales: `je valide`.");
    } else if (ctx.ahead !== null && ctx.ahead > 0) {
        items.push(`Pousser les commit(s) locaux (${ctx.ahead}): \`git push\`.`);
    }

    if (!ctx.tests.executed) {
        items.push("Lancer les tests avant release si necessaire: `node tests/test-runner.js`.");
    } else if (ctx.tests.status === "failed") {
        items.push("Corriger les tests en echec avant commit/release.");
    }

    if (items.length === 0) {
        items.push("Aucun blocage git detecte. Le contexte est pret pour un nouveau chat.");
    }

    return items;
}

function toBulletList(lines, emptyText) {
    if (!lines || lines.length === 0) return `- ${emptyText}`;
    return lines.map((line) => `- ${line}`).join("\n");
}

function buildMarkdown(ctx) {
    const statusLines = ctx.statusEntries.map((entry) => `\`${entry.code} ${entry.file}\``);
    const commitsToPushLines = ctx.commitsToPush
        ? ctx.commitsToPush.split(/\r?\n/).filter(Boolean)
        : [];
    const recentCommitLines = ctx.recentCommits
        ? ctx.recentCommits.split(/\r?\n/).filter(Boolean)
        : [];
    const hasTestSummary = ctx.tests.summary &&
        [ctx.tests.summary.total, ctx.tests.summary.passed, ctx.tests.summary.failed, ctx.tests.summary.warnings]
            .some((value) => Number.isFinite(value));
    const testSummaryLines = hasTestSummary
        ? [
            `- total: ${ctx.tests.summary.total ?? "?"}`,
            `- passed: ${ctx.tests.summary.passed ?? "?"}`,
            `- failed: ${ctx.tests.summary.failed ?? "?"}`,
            `- warnings: ${ctx.tests.summary.warnings ?? "?"}`
        ].join("\n")
        : "- resume non detecte dans la sortie test";

    const testTailBlock = ctx.tests.tail.length > 0 && ctx.tests.status === "failed"
        ? `\n\`\`\`\n${ctx.tests.tail.join("\n")}\n\`\`\``
        : "";
    const actions = makeActionChecklist(ctx);

    return `# HANDOFF CHAT

Genere le: ${ctx.generatedAt}
Repo: ${ctx.repoName}
Racine: \`${ctx.repoRoot}\`

## Resume executif
- Branche: \`${ctx.branch || "inconnue"}\`
- HEAD: \`${ctx.headShort || "inconnu"}\` (${ctx.headSubject || "sans message"})
- Upstream: \`${ctx.upstream || "aucun"}\`
- Divergence: ahead=${ctx.ahead ?? "?"} / behind=${ctx.behind ?? "?"}
- Worktree: ${ctx.isDirty ? "dirty" : "clean"}
- Dernier audit detecte: ${ctx.latestAudit || "aucun fichier d'audit detecte"}

## Etat du depot
\`\`\`
${ctx.statusShort || "(etat indisponible)"}
\`\`\`

## Fichiers modifies localement
${toBulletList(statusLines, "Aucune modification locale.")}

## Derniers commits
${toBulletList(recentCommitLines, "Aucun commit trouve.")}

## Commits locaux non pousses
${toBulletList(commitsToPushLines, "Aucun commit local a pousser.")}

## Tests
- Mode script: ${withTests ? "resume:tests (tests executes)" : "resume (tests non executes)"}
- Statut: ${ctx.tests.status}${ctx.tests.executed ? ` (exit=${ctx.tests.exitCode})` : ""}
${ctx.tests.executed ? testSummaryLines : "- (tests non executes)"}
${testTailBlock}

## Actions tests/release a faire
${toBulletList(actions, "Aucune action requise.")}

## Commandes utiles
- Generer handoff rapide: \`npm run resume\`
- Generer handoff + execution tests: \`npm run resume:tests\`
- Validation complete du repo: \`je valide\`
`;
}

function main() {
    const generated = nowParts(new Date());
    const repoName = path.basename(repoRoot);

    const branch = run("git rev-parse --abbrev-ref HEAD").out;
    const headShort = run("git rev-parse --short HEAD").out;
    const headSubject = run("git log -1 --pretty=format:%s").out;
    const upstreamRes = run("git rev-parse --abbrev-ref --symbolic-full-name @{u}");
    const upstream = upstreamRes.ok ? upstreamRes.out : null;

    const statusShort = run("git status -sb").out;
    const statusRaw = run("git status --porcelain=v1").out;
    const statusEntries = parseStatusLines(statusRaw);
    const isDirty = statusEntries.length > 0;

    let ahead = null;
    let behind = null;
    if (upstream) {
        const divergenceRes = run("git rev-list --left-right --count @{u}...HEAD");
        const parsed = parseAheadBehind(divergenceRes.out);
        ahead = parsed.ahead;
        behind = parsed.behind;
    }

    const commitsToPush = upstream
        ? run("git log --oneline @{u}..HEAD").out
        : "";
    const recentCommits = run("git log --date=iso --pretty=format:\"%h | %ad | %an | %s\" -n 12").out;
    const latestAudit = findLatestAudit();
    const tests = runTestsIfRequested();

    const ctx = {
        generatedAt: generated.readable,
        repoName,
        repoRoot,
        branch,
        headShort,
        headSubject,
        upstream,
        ahead,
        behind,
        statusShort,
        statusEntries,
        isDirty,
        commitsToPush,
        recentCommits,
        latestAudit,
        tests
    };

    const handoffDir = path.join(repoRoot, ".github", "context", "handoffs");
    fs.mkdirSync(handoffDir, { recursive: true });

    const fileName = `HANDOFF_${generated.date}_${generated.time}.md`;
    const handoffPath = path.join(handoffDir, fileName);
    const latestPath = path.join(handoffDir, "LAST_HANDOFF.md");

    const markdown = buildMarkdown(ctx);
    fs.writeFileSync(handoffPath, markdown, "utf8");
    fs.writeFileSync(latestPath, markdown, "utf8");

    const relHandoff = path.relative(repoRoot, handoffPath).replace(/\\/g, "/");
    const relLatest = path.relative(repoRoot, latestPath).replace(/\\/g, "/");

    process.stdout.write(`Handoff genere: ${relHandoff}\n`);
    process.stdout.write(`Derniere copie: ${relLatest}\n`);
    process.stdout.write("Tu peux ouvrir un nouveau chat en joignant ce fichier.\n");
}

main();
