// Active STORAGE_KEY per module — single source of truth for hubs + tests.
// Bump _vK here AND in module APP_CONFIG when progression must be invalidated.
// Independent from product APP_VERSION.
window.APP_STORAGE_KEYS = {
    lovyc_fr_w0: 'lovyc_fr_w0_v1',
    lovyc_fr_w1: 'lovyc_fr_w1_v2',
    lovyc_fr_w2: 'lovyc_fr_w2_v2',
    zyvah_maths_w0: 'zyvah_maths_w0_v1',
    zyvah_maths_w1: 'zyvah_maths_w1_v1',
    zyvah_maths_w2: 'zyvah_maths_w2_v1',
    zyvah_maths_w3: 'zyvah_maths_w3_v1',
    zyvah_ses_w0: 'zyvah_ses_w0_v1',
    zyvah_ses_w1: 'zyvah_ses_w1_v2'
};

window.storageKey = function storageKey(moduleId) {
    const keys = window.APP_STORAGE_KEYS || {};
    return keys[moduleId] || null;
};
