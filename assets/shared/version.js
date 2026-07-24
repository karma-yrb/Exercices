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

    function createVersionLink(notesUrl) {
        const link = document.createElement('a');
        link.id = 'app-version-badge';
        link.href = notesUrl;
        link.title = 'Notes de version';
        link.textContent = 'v' + VERSION;
        link.setAttribute('aria-label', 'Version produit ' + VERSION + ' — ouvrir les notes de version');
        return link;
    }

    function styleInlineLink(link) {
        link.style.cssText = [
            'display:inline-block',
            'font-family:Outfit,system-ui,Segoe UI,sans-serif',
            'font-size:11px',
            'font-weight:700',
            'letter-spacing:0.08em',
            'text-transform:uppercase',
            'text-decoration:none',
            'color:#94a3b8',
            'transition:color 0.2s ease'
        ].join(';');
        link.addEventListener('mouseenter', () => { link.style.color = '#93c5fd'; });
        link.addEventListener('mouseleave', () => { link.style.color = '#94a3b8'; });
    }

    function createFooterBar(notesUrl) {
        const bar = document.createElement('footer');
        bar.id = 'app-version-footer';
        bar.setAttribute('role', 'contentinfo');
        bar.style.cssText = [
            'flex-shrink:0',
            'display:flex',
            'justify-content:center',
            'align-items:center',
            'gap:8px',
            'width:100%',
            'padding:6px 12px',
            'padding-bottom:calc(6px + env(safe-area-inset-bottom, 0px))',
            'background:rgba(15,23,42,0.96)',
            'border-top:1px solid rgba(96,165,250,0.28)',
            'z-index:20'
        ].join(';');

        const link = createVersionLink(notesUrl);
        styleInlineLink(link);
        bar.appendChild(link);
        return bar;
    }

    function injectFooter(notesUrl) {
        if (document.getElementById('app-version-badge') || document.getElementById('app-version-footer')) return;
        if (!document.body) return;

        const bar = createFooterBar(notesUrl);
        const app = document.getElementById('app');

        if (app) {
            // Inside the app column so buttons stay above and nothing overlaps.
            // Safe-area is owned by this strip — drop it from the action footer.
            const actionFooter = document.getElementById('footer')
                || app.querySelector('.footer-nav, .footer');
            if (actionFooter) {
                actionFooter.style.paddingBottom = '14px';
            }
            app.appendChild(bar);
            return;
        }

        // Pages without #app: fixed viewport footer + reserved space.
        bar.style.position = 'fixed';
        bar.style.left = '0';
        bar.style.right = '0';
        bar.style.bottom = '0';
        bar.style.zIndex = '40';
        document.body.appendChild(bar);

        const reserve = () => {
            const h = Math.ceil(bar.getBoundingClientRect().height) || 32;
            document.body.style.paddingBottom = h + 'px';
        };
        reserve();
        window.addEventListener('resize', reserve, { passive: true });
    }

    function render() {
        const notesUrl = releaseNotesUrl();
        const hasSlots = fillLabeledSlots(notesUrl);
        // Hub pages already expose the version in their site footer — no extra chrome.
        if (hasSlots) return;
        injectFooter(notesUrl);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
