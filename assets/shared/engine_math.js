// Compatibility shim — prefer loading engine.js directly.
// Synchronously loads the unified engine for any leftover engine_math.js references.
(function loadUnifiedEngine(global) {
    if (global.__UNIFIED_ENGINE_LOADED__) return;

    const current = document.currentScript;
    if (!current || !current.src) {
        throw new Error('engine_math.js shim requires a script src');
    }

    const target = current.src.replace(/engine_math\.js(\?[^#]*)?(#.*)?$/i, 'engine.js$1$2');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', target, false);
    xhr.send(null);
    if (xhr.status !== 0 && (xhr.status < 200 || xhr.status >= 300)) {
        throw new Error('Failed to load unified engine.js (' + xhr.status + ')');
    }

    // eslint-disable-next-line no-eval
    (0, eval)(xhr.responseText);
    global.__UNIFIED_ENGINE_LOADED__ = true;
})(window);
