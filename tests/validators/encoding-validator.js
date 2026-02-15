/**
 * Validateur d'integrite d'encodage UTF-8.
 * Detecte les sequences mojibake courantes dans les fichiers de production.
 */

const fs = require('fs');
const path = require('path');

class EncodingValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.errors = [];
        this.warnings = [];
        this.maxErrors = 200;

        this.targets = [
            'index.html',
            'assets',
            'Lovyc',
            'Zyvah',
            path.join('docs', 'modules')
        ];

        this.allowedExtensions = new Set(['.html', '.js', '.css', '.md']);

        // Patterns de mojibake frequents (UTF-8 lu/reecrit avec mauvais charset)
        this.mojibakePatterns = [
            /[\u00C3][\u0080-\u00BF]/g,             // ex: Ã© Ã¨ Ã‰
            /[\u00C2][\u0080-\u00BF]/g,             // ex: Â² Â©
            /[\u00E2][\u0080-\u00BF]{1,2}/g,        // ex: â€™ â†’
            /[\u00F0][\u0090-\u00BF][\u0080-\u00BF]{1,2}/g, // ex: ðŸ...
            /[\u00EF][\u00B8][\u0080-\u00BF]/g,      // ex: ï¸
            /\uFFFD/g                                // caractere de remplacement
        ];
    }

    validate() {
        try {
            const files = this.collectTargetFiles();

            files.forEach(filePath => {
                if (this.errors.length >= this.maxErrors) return;
                this.scanFile(filePath);
            });

            if (this.errors.length >= this.maxErrors) {
                this.warnings.push(`Analyse tronquee apres ${this.maxErrors} erreurs`);
            }

            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        } catch (error) {
            this.errors.push(`Erreur validation encodage: ${error.message}`);
            return { valid: false, errors: this.errors, warnings: this.warnings };
        }
    }

    collectTargetFiles() {
        const files = [];

        this.targets.forEach(relativeTarget => {
            const absoluteTarget = path.join(this.rootDir, relativeTarget);
            if (!fs.existsSync(absoluteTarget)) return;

            const stats = fs.statSync(absoluteTarget);
            if (stats.isFile()) {
                if (this.isAllowedFile(absoluteTarget)) files.push(absoluteTarget);
                return;
            }

            this.walk(absoluteTarget, files);
        });

        return files;
    }

    walk(dirPath, files) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                this.walk(fullPath, files);
                continue;
            }

            if (this.isAllowedFile(fullPath)) {
                files.push(fullPath);
            }
        }
    }

    isAllowedFile(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return this.allowedExtensions.has(ext);
    }

    scanFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');

        for (const pattern of this.mojibakePatterns) {
            pattern.lastIndex = 0;
            let match = pattern.exec(content);

            while (match) {
                const index = match.index;
                const token = match[0];
                const pos = this.indexToLineCol(content, index);
                const relPath = path.relative(this.rootDir, filePath).replace(/\\/g, '/');

                this.errors.push(
                    `${relPath}:${pos.line}:${pos.col} sequence suspecte "${this.escapePreview(token)}"`
                );

                if (this.errors.length >= this.maxErrors) return;
                match = pattern.exec(content);
            }
        }
    }

    indexToLineCol(content, index) {
        let line = 1;
        let col = 1;

        for (let i = 0; i < index; i++) {
            if (content[i] === '\n') {
                line++;
                col = 1;
            } else {
                col++;
            }
        }

        return { line, col };
    }

    escapePreview(text) {
        return text
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t');
    }
}

module.exports = EncodingValidator;
