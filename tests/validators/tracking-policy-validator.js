/**
 * Tracking policy validator.
 * Ensures tracking safeguards are documented and enforced in engine payloads.
 */

const fs = require('fs');
const path = require('path');

class TrackingPolicyValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.errors = [];
        this.warnings = [];
    }

    validate() {
        this.checkPolicyDocument();
        this.checkEngine(path.join(this.rootDir, 'assets', 'shared', 'engine.js'), 'engine.js');
        this.checkEngine(path.join(this.rootDir, 'assets', 'shared', 'engine_math.js'), 'engine_math.js');

        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings
        };
    }

    checkPolicyDocument() {
        const policyPath = path.join(this.rootDir, 'docs', 'governance', 'TRACKING_POLICY.md');
        if (!fs.existsSync(policyPath)) {
            this.errors.push('Policy manquante: docs/governance/TRACKING_POLICY.md');
            return;
        }

        const content = fs.readFileSync(policyPath, 'utf-8');
        const requiredMarkers = [
            'TRACKING_INCLUDE_IP',
            'false',
            'retention',
            'consent',
            'actor_id',
            'device_id',
            'session_id'
        ];

        requiredMarkers.forEach(marker => {
            if (!content.toLowerCase().includes(marker.toLowerCase())) {
                this.errors.push(`Policy incomplete: "${marker}" manquant dans TRACKING_POLICY.md`);
            }
        });
    }

    checkEngine(enginePath, label) {
        if (!fs.existsSync(enginePath)) {
            this.errors.push(`Fichier manquant: ${label}`);
            return;
        }

        const content = fs.readFileSync(enginePath, 'utf-8');

        if (!content.includes("const includeIp = config.TRACKING_INCLUDE_IP === true;")) {
            this.errors.push(`${label}: includeIp doit etre strictement opt-in (=== true)`);
        }

        if (!content.includes("if (includeIp) payload.ip = clientIP;")) {
            this.errors.push(`${label}: payload.ip doit etre ajoute uniquement en opt-in`);
        }

        const payloadMatch = content.match(/const payload\s*=\s*\{([\s\S]*?)\};/);
        if (!payloadMatch) {
            this.errors.push(`${label}: bloc payload introuvable`);
            return;
        }

        const payloadBlock = payloadMatch[1];
        const requiredFields = ['actor_id', 'device_id', 'session_id', 'event_time', 'tracking_version'];
        requiredFields.forEach(field => {
            if (!payloadBlock.includes(`${field}:`)) {
                this.errors.push(`${label}: champ payload manquant (${field})`);
            }
        });

        if (payloadBlock.includes('\nip:') || payloadBlock.includes('\n        ip:')) {
            this.errors.push(`${label}: ip ne doit pas etre present en dur dans payload`);
        }
    }
}

module.exports = TrackingPolicyValidator;
