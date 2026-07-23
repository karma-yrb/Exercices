// Product version — keep in sync with package.json "version".
// Not related to module STORAGE_KEY _vK revisions.
window.APP_VERSION = '2.6.0';

(function mountProductVersionUi() {
    const VERSION = window.APP_VERSION || '?.?.?';

    function sharedDirFromScript() {
        const nodes = document.querySelectorAll('script[src*="version.js"]');
        const last = nodes[nodes.length - 1];
        const src = (document.currentScript && document.currentScript.src) || (last && last.src) || '';
        if (!src) return null;
        return src.replace(/version\.js(\?[^#]*)?(#.*)?$/i, '');
    }

    function releaseNotesUrl() {
        const shared = sharedDirFromScript();
        if (!shared) return 'notes-de-version.html';
        try {
            return new URL('../../notes-de-version.html', shared).href;
        } catch (e) {
            return shared + '../../notes-de-version.html';
        }
    }

    function fillLabeledSlots(notesUrl) {
        const label = 'Version ' + VERSION;
        let filled = false;
        ['app-version', 'app-version-header'].forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.tagName === 'A') {
                el.textContent = label;
                el.setAttribute('href', notesUrl);
            } else {
                el.textContent = label;
            }
            filled = true;
        });
        return filled;
    }

    function injectBadge(notesUrl) {
        if (document.getElementById('app-version-badge')) return;
        if (!document.body) return;

        const badge = document.createElement('a');
        badge.id = 'app-version-badge';
        badge.href = notesUrl;
        badge.title = 'Notes de version';
        badge.textContent = 'v' + VERSION;
        badge.setAttribute('aria-label', 'Version produit ' + VERSION + ' — ouvrir les notes de version');
        badge.style.cssText = [
            'position:fixed',
            'right:12px',
            'bottom:12px',
            'z-index:99999',
            'font-family:Outfit,system-ui,Segoe UI,sans-serif',
            'font-size:12px',
            'font-weight:700',
            'letter-spacing:0.08em',
            'text-transform:uppercase',
            'text-decoration:none',
            'color:#e2e8f0',
            'background:rgba(15,23,42,0.92)',
            'border:1px solid rgba(96,165,250,0.45)',
            'border-radius:999px',
            'padding:6px 12px',
            'box-shadow:0 4px 18px rgba(0,0,0,0.35)',
            'backdrop-filter:blur(8px)',
            '-webkit-backdrop-filter:blur(8px)',
            'opacity:1',
            'transition:color 0.2s ease, border-color 0.2s ease, background 0.2s ease'
        ].join(';');
        badge.addEventListener('mouseenter', () => {
            badge.style.color = '#93c5fd';
            badge.style.borderColor = 'rgba(147,197,253,0.8)';
            badge.style.background = 'rgba(30,41,59,0.95)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.color = '#e2e8f0';
            badge.style.borderColor = 'rgba(96,165,250,0.45)';
            badge.style.background = 'rgba(15,23,42,0.92)';
        });
        document.body.appendChild(badge);
    }

    function render() {
        const notesUrl = releaseNotesUrl();
        fillLabeledSlots(notesUrl);
        // Always show a fixed badge so the version is visible without scrolling.
        injectBadge(notesUrl);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
