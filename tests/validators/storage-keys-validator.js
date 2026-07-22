/**
 * Valide la coherence des STORAGE_KEY modules ↔ hubs ↔ registre.
 */
const fs = require('fs');
const path = require('path');

class StorageKeysValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.errors = [];
        this.warnings = [];
        this.registryPath = path.join(rootDir, 'assets', 'shared', 'storage-keys.js');
        this.hubFiles = [
            'index.html',
            'Lovyc/index.html',
            'Zyvah/index.html',
            'Zyvah/Maths/index.html',
            'Zyvah/SES/index.html'
        ];
        this.enfantMap = { lovyc: 'Lovyc', zyvah: 'Zyvah' };
        this.matiereMap = {
            fr: 'Francais',
            maths: 'Maths',
            ses: 'SES'
        };
    }

    loadRegistry() {
        if (!fs.existsSync(this.registryPath)) {
            this.errors.push('Registre manquant: assets/shared/storage-keys.js');
            return null;
        }
        const raw = fs.readFileSync(this.registryPath, 'utf8');
        const keys = {};
        const re = /^\s*([a-z0-9_]+)\s*:\s*['"]([a-z0-9_]+)['"]/gim;
        let match;
        while ((match = re.exec(raw)) !== null) {
            keys[match[1]] = match[2];
        }
        if (Object.keys(keys).length === 0) {
            this.errors.push('Registre storage-keys.js vide ou illisible');
            return null;
        }
        return keys;
    }

    extractKeyLiterals(content) {
        const found = new Set();
        const re = /['"]((?:lovyc|zyvah)_[a-z]+_w\d+_v\d+)['"]/gi;
        let match;
        while ((match = re.exec(content)) !== null) found.add(match[1]);
        return [...found];
    }

    moduleDirFor(moduleId) {
        const match = moduleId.match(/^(lovyc|zyvah)_([a-z]+)_w(\d+)$/);
        if (!match) return null;
        const [, enfant, matiere, num] = match;
        const enfantDir = this.enfantMap[enfant];
        const matiereDir = this.matiereMap[matiere];
        if (!enfantDir || !matiereDir) return null;
        return path.join(this.rootDir, enfantDir, matiereDir, `Module_${num}`);
    }

    validateModules(registry) {
        Object.entries(registry).forEach(([moduleId, expectedKey]) => {
            const dir = this.moduleDirFor(moduleId);
            if (!dir || !fs.existsSync(dir)) {
                this.warnings.push(`Module HTML absent pour ${moduleId}`);
                return;
            }
            const prefix = expectedKey.replace(/_v\d+$/, '');
            fs.readdirSync(dir)
                .filter((f) => f.endsWith('.html'))
                .forEach((file) => {
                    const rel = path.relative(this.rootDir, path.join(dir, file)).replace(/\\/g, '/');
                    const content = fs.readFileSync(path.join(dir, file), 'utf8');
                    const declared = [...content.matchAll(/STORAGE_KEY\s*:\s*['"]([a-z0-9_]+)['"]/gi)]
                        .map((m) => m[1]);
                    declared.forEach((key) => {
                        if (key !== expectedKey) {
                            this.errors.push(`${rel}: STORAGE_KEY="${key}" (attendu ${expectedKey})`);
                        }
                    });
                    this.extractKeyLiterals(content).forEach((key) => {
                        if (key.replace(/_v\d+$/, '') === prefix && key !== expectedKey) {
                            this.errors.push(`${rel}: cle obsolete ${key} (actif ${expectedKey})`);
                        }
                    });
                });
        });
    }

    validateHubs(registry) {
        this.hubFiles.forEach((rel) => {
            const filePath = path.join(this.rootDir, rel);
            if (!fs.existsSync(filePath)) {
                this.warnings.push(`Hub absent: ${rel}`);
                return;
            }
            const content = fs.readFileSync(filePath, 'utf8');
            const found = this.extractKeyLiterals(content);
            Object.entries(registry).forEach(([moduleId, expectedKey]) => {
                const prefix = expectedKey.replace(/_v\d+$/, '');
                found
                    .filter((k) => k.replace(/_v\d+$/, '') === prefix)
                    .forEach((key) => {
                        if (key !== expectedKey) {
                            this.errors.push(`${rel}: reference ${key} (attendu ${expectedKey} pour ${moduleId})`);
                        }
                    });
            });
        });
    }

    validate() {
        try {
            const registry = this.loadRegistry();
            if (!registry) {
                return { valid: false, errors: this.errors, warnings: this.warnings };
            }
            this.validateModules(registry);
            this.validateHubs(registry);
            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur storage-keys: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: this.warnings };
        }
    }
}

module.exports = StorageKeysValidator;
