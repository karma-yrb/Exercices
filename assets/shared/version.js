// Product version — keep in sync with package.json "version".
// Not related to module STORAGE_KEY _vK revisions.
window.APP_VERSION = '2.5.0';

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
        return shared + '../../notes-de-version.html';
    }

    function fillFooterSlot(notesUrl) {
        const el = document.getElementById('app-version');
        if (!el) return false;
        const label = 'Version ' + VERSION;
        if (el.tagName === 'A') {
            el.textContent = label;
            el.setAttribute('href', notesUrl);
        } else {
            el.textContent = label;
        }
        return true;
    }

    function injectBadge(notesUrl) {
        if (document.getElementById('app-version-badge')) return;
        if (document.getElementById('app-version')) return;

        const badge = document.createElement('a');
        badge.id = 'app-version-badge';
        badge.href = notesUrl;
        badge.title = 'Notes de version';
        badge.textContent = 'v' + VERSION;
        badge.setAttribute('aria-label', 'Version produit ' + VERSION + ' — ouvrir les notes de version');
        badge.style.cssText = [
            'position:fixed',
            'right:10px',
            'bottom:10px',
            'z-index:9999',
            'font-family:system-ui,Segoe UI,sans-serif',
            'font-size:11px',
            'font-weight:600',
            'letter-spacing:0.04em',
            'text-decoration:none',
            'color:rgba(148,163,184,0.85)',
            'background:rgba(6,7,13,0.55)',
            'border:1px solid rgba(255,255,255,0.08)',
            'border-radius:999px',
            'padding:4px 10px',
            'backdrop-filter:blur(6px)',
            '-webkit-backdrop-filter:blur(6px)',
            'opacity:0.75',
            'transition:opacity 0.2s ease, color 0.2s ease'
        ].join(';');
        badge.addEventListener('mouseenter', () => {
            badge.style.opacity = '1';
            badge.style.color = 'rgba(96,165,250,0.95)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.opacity = '0.75';
            badge.style.color = 'rgba(148,163,184,0.85)';
        });
        document.body.appendChild(badge);
    }

    function render() {
        const notesUrl = releaseNotesUrl();
        fillFooterSlot(notesUrl);
        injectBadge(notesUrl);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
