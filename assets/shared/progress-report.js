// Parent progress report — single source of truth for hubs + dashboard.
// Depends on storage-keys.js (storageKey / APP_STORAGE_KEYS).
(function (global) {
    const PARENT_EMAIL = 'karmafr@gmail.com';

    /** Active modules shown in progress reports and dashboard aggregates. */
    const MODULES = [
        { id: 'lovyc_fr_w0', track: 'lovyc', subject: 'fr', label: 'Initiation', total: 1, unit: 'mission' },
        { id: 'lovyc_fr_w1', track: 'lovyc', subject: 'fr', label: 'Module 1', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w2', track: 'lovyc', subject: 'fr', label: 'Module 2', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w3', track: 'lovyc', subject: 'fr', label: 'Module 3', total: 5, unit: 'mission' },
        { id: 'lovyc_fr_w4', track: 'lovyc', subject: 'fr', label: 'Module 4', total: 5, unit: 'mission' },
        { id: 'zyvah_maths_w0', track: 'zyvah', subject: 'maths', label: 'Maths — Initiation', total: 1, unit: 'seance' },
        { id: 'zyvah_maths_w1', track: 'zyvah', subject: 'maths', label: 'Maths — Module 1', total: 1, unit: 'seance' },
        { id: 'zyvah_maths_w2', track: 'zyvah', subject: 'maths', label: 'Maths — Module 2', total: 5, unit: 'seance' },
        { id: 'zyvah_maths_w3', track: 'zyvah', subject: 'maths', label: 'Maths — Module 3', total: 5, unit: 'seance' },
        { id: 'zyvah_ses_w0', track: 'zyvah', subject: 'ses', label: 'SES — Initiation', total: 1, unit: 'seance' },
        { id: 'zyvah_ses_w1', track: 'zyvah', subject: 'ses', label: 'SES — Module 1', total: 5, unit: 'seance' }
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

    /**
     * @param {string|{track?: string, subject?: string}|null} filter
     *   string = track id (legacy) ; object = { track, subject }
     */
    function listModules(filter) {
        if (!filter) return MODULES.slice();
        if (typeof filter === 'string') {
            return MODULES.filter((m) => m.track === filter);
        }
        return MODULES.filter((m) => {
            if (filter.track && m.track !== filter.track) return false;
            if (filter.subject && m.subject !== filter.subject) return false;
            return true;
        });
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
            subject: mod.subject,
            label: mod.label,
            done: done,
            total: mod.total,
            unit: mod.unit,
            percent: mod.total > 0 ? (done / mod.total) * 100 : 0,
            started: done > 0 || hasStoredState(moduleId),
            complete: done >= mod.total
        };
    }

    function isComplete(moduleId) {
        const progress = getModuleProgress(moduleId);
        return !!(progress && progress.complete);
    }

    function aggregateProgress(modules) {
        let done = 0;
        let total = 0;
        modules.forEach((m) => {
            done += m.done;
            total += m.total;
        });
        const avgPercent = modules.length
            ? modules.reduce((sum, m) => sum + m.percent, 0) / modules.length
            : 0;
        return {
            modules: modules,
            done: done,
            total: total,
            percent: total > 0 ? (done / total) * 100 : 0,
            averagePercent: avgPercent
        };
    }

    function getTrackProgress(track) {
        const modules = listModules(track).map((m) => getModuleProgress(m.id));
        return Object.assign({ track: track, title: TRACK_TITLES[track] || track }, aggregateProgress(modules));
    }

    function getSubjectProgress(subject) {
        const modules = listModules({ subject: subject }).map((m) => getModuleProgress(m.id));
        return Object.assign({ subject: subject }, aggregateProgress(modules));
    }

    function unitLabel(unit, count) {
        if (unit === 'seance') return count > 1 ? 'seances' : 'seance';
        return count > 1 ? 'missions' : 'mission';
    }

    function countLabel(progress, uppercase) {
        if (!progress) return '';
        const unit = unitLabel(progress.unit, progress.total);
        const label = `${progress.done}/${progress.total} ${unit}`;
        return uppercase ? label.toUpperCase() : label;
    }

    function setBarWidth(elementOrId, percent) {
        const el = typeof elementOrId === 'string'
            ? global.document.getElementById(elementOrId)
            : elementOrId;
        if (!el) return;
        el.style.width = Math.max(0, Math.min(100, percent)) + '%';
    }

    /**
     * @param {Element|null} card
     * @param {{ mode?: 'class'|'glass', chevron?: Element|null }} [options]
     */
    function lockCard(card, options) {
        if (!card) return;
        const opts = options || {};
        if (opts.mode === 'glass') {
            card.style.opacity = '0.5';
            card.style.filter = 'grayscale(1)';
            card.style.pointerEvents = 'none';
            if (opts.chevron) {
                opts.chevron.innerHTML = '<span style="font-size: 20px;">🔒</span>';
            }
            return;
        }
        card.classList.add('locked');
        card.style.pointerEvents = 'none';
        const icon = card.querySelector('.icon');
        if (icon) icon.textContent = '🔒';
    }

    /**
     * Wire a subject hub: sequential unlock from catalog totals.
     * @param {{
     *   steps: Array<{ moduleId: string, cardId: string, href: string, unlockAfter?: string|null }>,
     *   upcoming?: Array<{ cardId: string }>,
     *   barId?: string,
     *   percentMode?: 'average'|'weighted'
     * }} config
     */
    function setupSubjectHub(config) {
        const doc = global.document;
        const steps = config.steps || [];
        const upcoming = config.upcoming || [];
        const moduleIds = steps.map((s) => s.moduleId);
        const modules = moduleIds.map((id) => getModuleProgress(id)).filter(Boolean);
        const agg = aggregateProgress(modules);
        const percent = config.percentMode === 'weighted' ? agg.percent : agg.averagePercent;
        if (config.barId) setBarWidth(config.barId, percent);

        steps.forEach((step) => {
            const card = doc.getElementById(step.cardId);
            if (!card) return;
            const unlocked = !step.unlockAfter || isComplete(step.unlockAfter);
            if (!unlocked) {
                lockCard(card);
                return;
            }
            card.onclick = function () {
                global.location.href = step.href;
            };
        });

        upcoming.forEach((item) => {
            lockCard(doc.getElementById(item.cardId));
        });

        return agg;
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
        isComplete: isComplete,
        getTrackProgress: getTrackProgress,
        getSubjectProgress: getSubjectProgress,
        countLabel: countLabel,
        setBarWidth: setBarWidth,
        lockCard: lockCard,
        setupSubjectHub: setupSubjectHub,
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
