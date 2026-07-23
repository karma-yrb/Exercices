// Shared initiation story navigation: swipe + progress dots.
// Expects #view-content, #btn-next/#btn-prev, optional #story-dots, weekData + APP_CONFIG.
(function (global) {
    function setupStorySwipe(areaId) {
        const area = global.document.getElementById(areaId || 'view-content');
        if (!area) return;

        let startX = 0;
        let startY = 0;
        let startTime = 0;

        area.addEventListener('touchstart', (e) => {
            const touch = e.changedTouches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });

        area.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const elapsed = Date.now() - startTime;

            if (elapsed > 650) return;
            if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

            if (deltaX < 0) {
                const next = global.document.getElementById('btn-next');
                if (next) next.click();
            } else {
                const prev = global.document.getElementById('btn-prev');
                if (prev) prev.click();
            }
        }, { passive: true });
    }

    function setupStoryDots(weekData, dotsId) {
        const dots = global.document.getElementById(dotsId || 'story-dots');
        if (!dots || !weekData || !weekData[0] || !weekData[0].steps) return;

        const total = weekData[0].steps.length;

        function getCurrentStep() {
            try {
                const config = global.APP_CONFIG || {};
                const saved = global.localStorage.getItem(config.STORAGE_KEY);
                const parsed = saved ? JSON.parse(saved) : null;
                if (parsed && parsed.currentDay === '1' && typeof parsed.currentStep === 'number') {
                    return parsed.currentStep;
                }
            } catch (e) {
                return 0;
            }
            return 0;
        }

        function renderDots() {
            const current = Math.max(0, Math.min(total - 1, getCurrentStep()));
            let html = '';
            for (let i = 0; i < total; i++) {
                html += '<span class="story-dot' + (i === current ? ' active' : '') + '"></span>';
            }
            dots.innerHTML = html;
        }

        renderDots();
        global.setInterval(renderDots, 300);
    }

    function initStoryNav(options) {
        const opts = options || {};
        setupStorySwipe(opts.areaId);
        setupStoryDots(opts.weekData || global.weekData, opts.dotsId);
    }

    global.initStoryNav = initStoryNav;
    global.setupStorySwipe = setupStorySwipe;
    global.setupStoryDots = setupStoryDots;
})(window);
