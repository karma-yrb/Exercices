// Parent progress report — single source of truth for hubs + dashboard.
// Depends on storage-keys.js (storageKey / APP_STORAGE_KEYS).
(function (global) {
    const PARENT_EMAIL = 'karmafr@gmail.com';

    /** Active modules shown in progress reports and dashboard aggregates. */
    const MODULES = [
        { id: 'lovyc_fr_w0', track: 'lovyc', label: 'Initiation', total: 1, unit: 'mission' },
        { id: 'lovyc_fr_w1', track: 'lovyc', label: 'Module 1', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w2', track: 'lovyc', label: 'Module 2', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w3', track: 'lovyc', label: 'Module 3', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w4', track: 'lovyc', label: 'Module 4', total: 5, unit: 'mission' },
        { id: 'zyvah_maths_w0', track: 'zyvah', label: 'Maths — Initiation', total: 1, unit: 'seance' },
        { id: 'zyvah_maths_w1', track: 'zyvah', label: 'Maths — Module 1', total: 1, unit: 'seance' },
        { id: 'zyvah_maths_w2', track: 'zyvah', label: 'Maths — Module 2', total: 5, unit: 'seance' },
        { id: 'zyvah_maths_w3', track: 'zyvah', label: 'Maths — Module 3', total: 5, unit: 'seance' },
        { id: 'zyvah_ses_w0', track: 'zyvah', label: 'SES — Initiation', total: 1, unit: 'seance' },
        { id: 'zyvah_ses_w1', track: 'zyvah', label: 'SES — Module 1', total: 5, unit: 'seance' }
    ];

    const TRACK_TITLES = {
        lovyc: 'Lovyc',
        zyvah: 'Zyvah'
    };

    function resolveStorageKey(moduleId) {
        if (typeof global.storageKey === 'function') {
            return global.storageKey(moduleId);
        }
        const keys = global.APP_STORAGE_KEYS || {};
        return keys[moduleId] || null;
    }

    function getCompletedCount(moduleId) {
        const key = resolveStorageKey(moduleId);
        if (!key) return 0;
        try {
            const raw = global.localStorage.getItem(key);
            if (!raw) return 0;
            const state = JSON.parse(raw);
            if (state && Array.isArray(state.completedDays)) {
                return state.completedDays.length;
            }
            if (Array.isArray(state)) return state.length;
            return 0;
        } catch (e) {
            return 0;
        }
    }

    function listModules(track) {
        if (!track) return MODULES.slice();
        return MODULES.filter((m) => m.track === track);
    }

    function hasStoredState(moduleId) {
        const key = resolveStorageKey(moduleId);
        return !!(key && global.localStorage.getItem(key));
    }

    function getModuleProgress(moduleId) {
        const mod = MODULES.find((m) => m.id === moduleId);
        if (!mod) return null;
        const done = getCompletedCount(moduleId);
        return {
            id: mod.id,
            track: mod.track,
            label: mod.label,
            done: done,
            total: mod.total,
            unit: mod.unit,
            percent: mod.total > 0 ? (done / mod.total) * 100 : 0,
            started: done > 0 || hasStoredState(moduleId)
        };
    }

    function getTrackProgress(track) {
        const modules = listModules(track).map((m) => getModuleProgress(m.id));
        let done = 0;
        let total = 0;
        modules.forEach((m) => {
            done += m.done;
            total += m.total;
        });
        return {
            track: track,
            title: TRACK_TITLES[track] || track,
            modules: modules,
            done: done,
            total: total,
            percent: total > 0 ? (done / total) * 100 : 0
        };
    }

    function unitLabel(unit, count) {
        if (unit === 'seance') return count > 1 ? 'seances' : 'seance';
        return count > 1 ? 'missions' : 'mission';
    }

    function buildChildReport(track) {
        const progress = getTrackProgress(track);
        const lines = progress.modules.map((m) => {
            return `- ${m.label} : ${m.done}/${m.total} ${unitLabel(m.unit, m.total)}`;
        });
        return `Salut !\n\nVoilà ma progression ${progress.title} :\n${lines.join('\n')}`;
    }

    function buildParentReport() {
        const date = new Date().toLocaleDateString('fr-FR');
        let report = `RAPPORT D'AVANCEMENT - ${date}\n\n`;
        ['lovyc', 'zyvah'].forEach((track) => {
            const progress = getTrackProgress(track);
            report += `=== ${progress.title} (${progress.done}/${progress.total}) ===\n`;
            progress.modules.forEach((m) => {
                if (!m.started) {
                    report += `[${m.label}] : Pas encore commencé.\n`;
                } else {
                    report += `[${m.label}] : ${m.done}/${m.total} ${unitLabel(m.unit, m.total)} validée(s).\n`;
                }
            });
            report += '\n';
        });
        return report.trim() + '\n';
    }

    function openMailto(subject, body) {
        const mailto = `mailto:${PARENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        global.location.href = mailto;
        return mailto;
    }

    function sendChildReport(track) {
        const title = TRACK_TITLES[track] || track;
        return openMailto(`Progression ${title}`, buildChildReport(track));
    }

    function sendParentReport() {
        return openMailto("Rapport d'apprentissage", buildParentReport());
    }

    const api = {
        PARENT_EMAIL: PARENT_EMAIL,
        MODULES: MODULES,
        getCompletedCount: getCompletedCount,
        listModules: listModules,
        getModuleProgress: getModuleProgress,
        getTrackProgress: getTrackProgress,
        buildChildReport: buildChildReport,
        buildParentReport: buildParentReport,
        sendChildReport: sendChildReport,
        sendParentReport: sendParentReport,
        openMailto: openMailto
    };

    global.ProgressReport = api;

    /** Hub buttons: Partager mon avancement */
    global.sendReport = function sendReport(track) {
        if (!track) {
            console.error('sendReport(track) requires "lovyc" or "zyvah"');
            return null;
        }
        return sendChildReport(track);
    };

    /** Dashboard: Générer le rapport */
    global.generateParentReport = function generateParentReport() {
        return sendParentReport();
    };
})(window);
