#!/usr/bin/env node
/**
 * Test Runner - Orchestrateur de Tests
 * Lance tous les validators sur les modules spécifiés
 */

const fs = require('fs');
const path = require('path');
const MarkdownValidator = require('./validators/markdown-validator');
const HtmlValidator = require('./validators/html-validator');
const SyncValidator = require('./validators/sync-validator');
const WriteResponseValidator = require('./validators/write-response-validator');
const PathValidator = require('./validators/path-validator');

class TestRunner {
    constructor() {
        this.results = {
            totalTests: 0,
            passed: 0,
            failed: 0,
            warnings: 0
        };
    }

    run(moduleFilter = null) {
        console.log('╔═══════════════════════════════════════════════════════╗');
        console.log('║   🧪 TEST RUNNER - Validation des Modules           ║');
        console.log('╚═══════════════════════════════════════════════════════╝\n');

        const modules = this.discoverModules();
        const toTest = moduleFilter 
            ? modules.filter(m => m.name.includes(moduleFilter))
            : modules;

        if (toTest.length === 0) {
            console.log(`❌ Aucun module trouvé${moduleFilter ? ` pour "${moduleFilter}"` : ''}\n`);
            return;
        }

        toTest.forEach(module => this.testModule(module));

        this.printSummary();
    }

    discoverModules() {
        const docsDir = path.join(__dirname, '..', 'docs', 'modules');
        const modules = [];

        if (!fs.existsSync(docsDir)) {
            console.error('❌ Dossier docs/modules/ introuvable');
            return [];
        }

        const files = fs.readdirSync(docsDir);
        
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const match = file.match(/^(lovyc|zyvah)_([a-z]+)_module_(\d+)\.md$/);
                if (match) {
                    const [, enfant, matiere, num] = match;
                    modules.push({
                        name: `${enfant}_${matiere}_module_${num}`,
                        enfant,
                        matiere,
                        num,
                        draftPath: path.join(docsDir, file),
                        htmlDir: this.findHtmlDir(enfant, matiere, num)
                    });
                }
            }
        });

        return modules;
    }

    findHtmlDir(enfant, matiere, num) {
        // Mapping des noms de dossiers
        const enfantMap = { lovyc: 'Lovyc', zyvah: 'Zyvah' };
        const matiereMap = { 
            fr: 'Francais',
            francais: 'Francais',
            math: 'Maths',
            maths: 'Maths',
            ses: 'SES'
        };

        const enfantDir = enfantMap[enfant.toLowerCase()] || enfant;
        const matiereDir = matiereMap[matiere.toLowerCase()] || matiere;

        return path.join(__dirname, '..', enfantDir, matiereDir, `Module_${num}`);
    }

    testModule(module) {
        console.log(`\n${'═'.repeat(60)}`);
        console.log(`📦 MODULE: ${module.name.toUpperCase()}`);
        console.log(`${'═'.repeat(60)}\n`);

        const expectedMissions = this.getExpectedMissions(module.draftPath);

        // Test 1: Validation Draft Markdown
        console.log('🔍 Test 1/3: Validation Draft Markdown...');
        const mdValidator = new MarkdownValidator(module.draftPath);
        const mdResult = mdValidator.validate();
        this.printResult('Draft Markdown', mdResult);

        // Test 2: Validation HTML (chaque mission)
        console.log('\n🔍 Test 2/5: Validation Fichiers HTML...');
        if (!fs.existsSync(module.htmlDir)) {
            console.log(`  ⚠️  Dossier HTML introuvable: ${module.htmlDir}`);
            this.results.warnings++;
        } else {
            for (let i = 1; i <= expectedMissions; i++) {
                const htmlPath = path.join(module.htmlDir, `mission_${i}.html`);
                if (fs.existsSync(htmlPath)) {
                    const htmlValidator = new HtmlValidator(htmlPath);
                    const htmlResult = htmlValidator.validate();
                    this.printResult(`  Mission ${i}`, htmlResult);
                } else {
                    console.log(`  ❌ Mission ${i}: Fichier manquant`);
                    this.results.failed++;
                }
            }
        }

        // Test 3: Synchronisation Draft ↔ HTML
        console.log('\n🔍 Test 3/5: Synchronisation Draft ↔ HTML...');
        if (fs.existsSync(module.htmlDir)) {
            const syncValidator = new SyncValidator(module.draftPath, module.htmlDir);
            const syncResult = syncValidator.validate();
            this.printResult('Synchronisation', syncResult);
        } else {
            console.log('  ⏭️  Skipped (dossier HTML manquant)');
        }

        // Test 4: Validation Réponses Write (10+ propositions)
        console.log('\n🔍 Test 4/5: Tests Réponses Write (10+ propositions)...');
        if (fs.existsSync(module.htmlDir)) {
            const writeValidator = new WriteResponseValidator(module.htmlDir, module.draftPath);
            const writeResult = writeValidator.validate();
            this.printResult('Tests Write', writeResult);
        } else {
            console.log('  ⏭️  Skipped (dossier HTML manquant)');
        }

        // Test 5: Validation chemins interdits
        console.log('\n🔍 Test 5/5: Validation des chemins de navigation...');
        const pathValidator = new PathValidator(module.htmlDir);
        const pathResult = pathValidator.validate();
        this.printResult('Chemins', pathResult);
    }

    getExpectedMissions(draftPath) {
        try {
            const content = fs.readFileSync(draftPath, 'utf-8');
            const metaMatch = content.split('## Meta')[1];
            if (!metaMatch) return 5;

            const missionsMatch = metaMatch.match(/-\s*Missions:\s*(\d+)/i);
            if (missionsMatch) return parseInt(missionsMatch[1], 10);
        } catch (e) {
            return 5;
        }

        return 5;
    }

    printResult(label, result) {
        this.results.totalTests++;

        if (result.valid && result.warnings.length === 0) {
            console.log(`  ✅ ${label}: OK`);
            this.results.passed++;
        } else if (result.valid && result.warnings.length > 0) {
            console.log(`  ⚠️  ${label}: OK avec warnings (${result.warnings.length})`);
            result.warnings.forEach(w => console.log(`      ⚠️  ${w}`));
            this.results.warnings += result.warnings.length;
            this.results.passed++;
        } else {
            console.log(`  ❌ ${label}: ÉCHOUÉ (${result.errors.length} erreurs)`);
            result.errors.forEach(e => console.log(`      ❌ ${e}`));
            if (result.warnings.length > 0) {
                result.warnings.forEach(w => console.log(`      ⚠️  ${w}`));
                this.results.warnings += result.warnings.length;
            }
            this.results.failed++;
        }
    }

    printSummary() {
        console.log('\n\n' + '═'.repeat(60));
        console.log('📊 RÉSUMÉ DES TESTS');
        console.log('═'.repeat(60));
        console.log(`Total de tests: ${this.results.totalTests}`);
        console.log(`✅ Réussis:     ${this.results.passed}`);
        console.log(`❌ Échoués:     ${this.results.failed}`);
        console.log(`⚠️  Warnings:    ${this.results.warnings}`);
        console.log('═'.repeat(60));

        if (this.results.failed === 0) {
            console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !\n');
            process.exit(0);
        } else {
            console.log(`\n💥 ${this.results.failed} test(s) ont échoué.\n`);
            process.exit(1);
        }
    }
}

// Exécution
const args = process.argv.slice(2);
const filter = args[0] || null;

const runner = new TestRunner();
runner.run(filter);
