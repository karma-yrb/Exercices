// ENGINE SPA - UNIVERSAL (Robust Version + Math Support)
// Handles progress, navigation and rendering for all modules

let el = {};
let state = null;
let appData = [];
let attemptCount = 0; // Compteur de tentatives pour hints progressifs
let inactivityMonitor = {
    lastActivity: Date.now(),
    intervalId: null,
    autoPauseTimerId: null,
    promptShown: false,
    promptAfterMs: 15 * 60 * 1000,
    autoPauseMs: 60 * 1000
};

// Helper pour une validation robuste (ignore les accents et la ponctuation)
const normalizeText = (t) => t ? t.toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") 
    .replace(/[.,/#!$%^&*;:{}=\\-_`~()]/g, "") : "";

function splitNormalizedWords(text) {
    return normalizeText(text)
        .split(/[\s']+/)
        .map(w => w.trim())
        .filter(Boolean);
}

function hasRequiredToken(rawText, normalizedWords, keyword) {
    if (!keyword) return false;
    const token = String(keyword);
    if (/[a-zA-Z\u00C0-\u017F]/.test(token)) {
        const norm = normalizeText(token);
        if (!norm) return false;
        return normalizedWords.includes(norm) || normalizedWords.some(w => w.startsWith(norm) || norm.startsWith(w));
    }
    return rawText.includes(token);
}

function toIdString(value) {
    return value === undefined || value === null ? null : value.toString();
}

function findDayById(dayId) {
    const target = toIdString(dayId);
    if (!target) return null;
    return appData.find(d => d && toIdString(d.id) === target) || null;
}

const TRACKING_DEVICE_KEY = 'learning_device_id_v1';

function makeTrackingId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return `${prefix}_${window.crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateDeviceId() {
    try {
        const existing = localStorage.getItem(TRACKING_DEVICE_KEY);
        if (existing) return existing;
        const created = makeTrackingId('dev');
        localStorage.setItem(TRACKING_DEVICE_KEY, created);
        return created;
    } catch (error) {
        return makeTrackingId('dev_mem');
    }
}

function inferActorId(config) {
    if (config && config.TRACKING_ACTOR_ID) return String(config.TRACKING_ACTOR_ID);
    const storageKey = (config && config.STORAGE_KEY) ? config.STORAGE_KEY.toLowerCase() : '';
    if (storageKey.includes('lovyc')) return 'lovyc';
    if (storageKey.includes('zyvah')) return 'zyvah';
    return 'unknown';
}

function getUnitLabel(config) {
    if (config && config.MISSION_LABEL) return String(config.MISSION_LABEL).trim().toUpperCase();
    const actor = inferActorId(config);
    return actor === 'zyvah' ? 'SEANCE' : 'MISSION';
}

function renderBossVisual(config) {
    const actor = inferActorId(config);

    if (actor === 'zyvah') {
        return `
            <div class="boss-visual-container">
                <svg viewBox="0 0 100 100" class="boss-svg" style="color: var(--accent);">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.25" />
                    <rect x="20" y="18" width="60" height="64" rx="10" fill="none" stroke="currentColor" stroke-width="3" />
                    <path d="M30 68 V52 M42 68 V44 M54 68 V36 M66 68 V48" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    <path d="M30 34 L42 30 L54 34 L66 26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="30" cy="34" r="2.5" fill="currentColor" />
                    <circle cx="42" cy="30" r="2.5" fill="currentColor" />
                    <circle cx="54" cy="34" r="2.5" fill="currentColor" />
                    <circle cx="66" cy="26" r="2.5" fill="currentColor" />
                </svg>
                <div class="boss-label">DEFI MANAGER</div>
            </div>
        `;
    }

    return `
        <div class="boss-visual-container">
            <svg viewBox="0 0 100 100" class="boss-svg" style="color: var(--danger);">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.3" />
                <path d="M25 40 L50 20 L75 40 L75 70 L50 90 L25 70 Z" fill="none" stroke="currentColor" stroke-width="3" />
                <rect x="35" y="45" width="10" height="4" fill="currentColor">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="55" y="45" width="10" height="4" fill="currentColor">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                </rect>
                <path d="M40 70 L60 70" fill="none" stroke="currentColor" stroke-width="2" />
                <path d="M20 50 L10 50 M90 50 L80 50 M50 10 L50 20 M50 90 L50 80" stroke="currentColor" stroke-width="1" />
            </svg>
            <div class="boss-label">MENACE DETECTEE</div>
        </div>
    `;
}

function getTrackingSubject(config, pathParts) {
    if (config && config.TRACKING_SUBJECT) return String(config.TRACKING_SUBJECT);
    return pathParts[pathParts.length - 3] || 'General';
}

function getTrackingModule(config, pathParts) {
    if (config && config.TRACKING_MODULE) return String(config.TRACKING_MODULE);
    const folder = pathParts[pathParts.length - 2] || '';
    const file = pathParts[pathParts.length - 1] ? pathParts[pathParts.length - 1].replace('.html', '') : '';
    return `${folder} / ${file}`.trim();
}

function getTrackingConsentProof(config) {
    const mode = (config && config.TRACKING_CONSENT_MODE) ? String(config.TRACKING_CONSENT_MODE).trim() : '';
    const actor = (config && config.TRACKING_CONSENT_ACTOR) ? String(config.TRACKING_CONSENT_ACTOR).trim() : '';
    const atRaw = (config && config.TRACKING_CONSENT_AT) ? String(config.TRACKING_CONSENT_AT).trim() : '';

    let at = '';
    if (atRaw) {
        const parsed = new Date(atRaw);
        if (!Number.isNaN(parsed.getTime())) {
            at = parsed.toISOString();
        }
    }

    return {
        valid: Boolean(mode && actor && at),
        mode,
        actor,
        at
    };
}

// ========================================
// MATHEMATICAL NORMALIZATION FUNCTIONS
// ========================================

/**
 * Normalise une expression mathématique pour comparaison intelligente
 * - Convertit x² → x^2, ² → ^2
 * - Unifie espaces et multiplication implicite (2x → 2*x)
 * - Supprime espaces autour des opérateurs
 * - Lowercase
 */
const normalizeMath = (text) => {
    if (!text) return "";
    let result = text.toString().trim().toLowerCase();
    
    // Conversion exposants Unicode → notation ^
    result = result.replace(/²/g, "^2");
    result = result.replace(/³/g, "^3");
    
    // Multiplication implicite : 2x → 2*x, 3a → 3*a
    result = result.replace(/(\d)([a-z])/gi, "$1*$2");
    
    // Suppression des espaces excessifs
    result = result.replace(/\s+/g, "");
    
    return result;
};

/**
 * Extrait les nombres d'une réponse d'équation
 * Exemple : "-3, 5" → ["-3", "5"]
 * Exemple : "x = 0 ou x = -7" → ["0", "-7"]
 */
const extractNumbers = (text) => {
    if (!text) return [];
    // Regex pour capturer nombres (entiers ou décimaux, avec signe -)
    const matches = text.match(/-?\d+\.?\d*/g);
    return matches ? matches.map(n => n.trim()) : [];
};

/**
 * Compare deux listes de nombres (ordre indépendant)
 * Retourne true si les listes contiennent les mêmes nombres
 */
const sameNumbers = (arr1, arr2) => {
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;
    
    const sorted1 = arr1.slice().sort();
    const sorted2 = arr2.slice().sort();
    
    return sorted1.every((val, idx) => val === sorted2[idx]);
};

/**
 * Détecte si le texte contient des symboles mathématiques
 * Utile pour fallback : si pas de symboles math, validation textuelle normale
 */
const containsMathSymbols = (text) => {
    if (!text) return false;
    const mathPattern = /[+\-*/^²³()=xyzabc\d]/i;
    return mathPattern.test(text);
};

// ========================================
// END MATHEMATICAL FUNCTIONS
// ========================================

// Alias for external calls - Defined early to avoid race conditions
window.initEngine = (data) => {
    console.log("External initEngine called.");
    if (data) window.weekData = data;
    
    // Refresh appData from window.weekData
    const findData = () => {
        return window.weekData || window.missionData || (typeof weekData !== 'undefined' ? weekData : []);
    };
    appData = findData();

    if (window.engineInitialized) {
        boot(); 
    } else {
        init();
    }
};

function init() {
    if (window.engineInitialized) return;
    window.engineInitialized = true;
    console.log('Engine Booting - Robust Mode...');
    
    try {
        // 1. Element Mapping
        el = {
            app: document.getElementById('app'),
            lobby: document.getElementById('view-lobby'),
            content: document.getElementById('view-content'),
            success: document.getElementById('view-success'),
            grid: document.getElementById('days-grid'),
            bar: document.getElementById('main-bar'),
            progText: document.getElementById('progress-text'),
            tag: document.getElementById('session-tag'),
            footer: document.getElementById('footer'),
            btnPrev: document.getElementById('btn-prev'),
            btnNext: document.getElementById('btn-next'),
            stepTitle: document.getElementById('step-title'),
            stepBody: document.getElementById('step-body')
        };

        if (!el.lobby && !el.content) {
            console.error('Critical: No view-lobby or view-content found in DOM.');
            return;
        }

        // 2. Data loading (Aggressive capture)
        const findData = () => {
            return window.weekData || window.missionData || (typeof weekData !== 'undefined' ? weekData : []);
        };
        
        appData = findData();
        
        // If empty, try again in 50ms (handles some race conditions with sync script tags)
        if (!appData || appData.length === 0) {
            setTimeout(() => {
                appData = findData();
                console.log('Retry Data Capture - Missions found:', appData.length);
                if (appData && appData.length > 0) boot();
                else {
                    // Final fallback to UI message
                    if (el.grid) el.grid.innerHTML = '<p style="color:var(--text-dim); text-align:center; padding:20px;">Chargement des données...</p>';
                }
            }, 50);
        } else {
            boot();
        }

    } catch (err) {
        showFatalError(err);
    }
}

function boot() {
    console.log('Missions loaded:', appData.length);
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };
    
    // 3. State Initialization (Safe Merge)
    try {
        const saved = localStorage.getItem(config.STORAGE_KEY);
        const parsed = (saved && saved !== 'undefined') ? JSON.parse(saved) : {};
        const cleanParsed = parsed || {};
        state = {
            completedDays: Array.isArray(cleanParsed.completedDays) ? cleanParsed.completedDays.map(id => id.toString()) : [],
            currentDay: (typeof cleanParsed.currentDay !== 'undefined' && cleanParsed.currentDay !== null) ? cleanParsed.currentDay.toString() : null,
            currentStep: cleanParsed.currentStep || 0,
            startTime: cleanParsed.startTime || null,
            sessionId: cleanParsed.sessionId || null
        };
    } catch(e) {
        console.warn('State recovery failed:', e);
        state = { completedDays: [], currentDay: null, currentStep: 0, startTime: null, sessionId: null };
    }

    // 4. Initial Rendering
    if (config.SINGLE_MISSION_MODE && appData.length > 0) {
        const dayId = toIdString(appData[0] && appData[0].id);
        // Force le démarrage de la mission unique présente sur la page
        if (dayId && state.currentDay !== dayId) {
            state.currentDay = dayId;
            state.currentStep = 0;
            state.startTime = new Date().toISOString();
            state.sessionId = makeTrackingId('sess');
            saveState();
        }
    }

    const currentDayData = findDayById(state.currentDay);
    if (state.currentDay && currentDayData && currentDayData.steps) {
        renderStep();
    } else {
        renderLobby();
    }
    updateGlobalProgress();
    
    // 5. Global Navigation Events
    if (el.btnPrev) {
        el.btnPrev.onclick = () => {
            if (state.currentStep > 0) {
                state.currentStep--;
                renderStep();
                saveState();
            } else {
                showQuitModal();
            }
        };
    }

    if (el.btnNext) {
        el.btnNext.onclick = () => {
            const day = findDayById(state.currentDay);
            if (day && state.currentStep < day.steps.length - 1) {
                state.currentStep++;
                attemptCount = 0; // Reset compteur à chaque nouvelle étape
                renderStep();
            } else {
                completeDay();
            }
            saveState();
        };
    }
    
    injectStyles();
    injectModal();
    startInactivityMonitor();
    console.log('Engine Initialized Successfully.');
}

function injectStyles() {
    if (document.getElementById('engine-styles')) return;
    const s = document.createElement('style');
    s.id = 'engine-styles';
    s.innerHTML = `
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center;
            z-index: 9999; backdrop-filter: blur(8px);
            opacity: 0; pointer-events: none; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modal-overlay.active { opacity: 1; pointer-events: all; }
        .modal-content {
            background: #111; border: 1px solid rgba(255,255,255,0.1); padding: 30px;
            border-radius: 24px; max-width: 85%; width: 340px; text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8); transform: translateY(20px); transition: 0.3s;
        }
        .modal-overlay.active .modal-content { transform: translateY(0); }
        .modal-title { color: #fff; font-size: 1.2rem; margin-bottom: 15px; font-weight: 700; }
        .modal-text { color: var(--text-dim, #888); font-size: 0.95rem; line-height: 1.5; margin-bottom: 25px; }
        .modal-btns { display: flex; gap: 12px; }
        .quit-confirm-btn { background: #ff4757 !important; border-color: #ff4757 !important; color: #fff !important; }
        .quit-cancel-btn { background: rgba(255,255,255,0.05) !important; color: #fff !important; }
        #btn-prev.quit-style { color: #ff4757; border-color: rgba(255, 71, 87, 0.3); }
    `;
    document.head.appendChild(s);
}

function injectModal() {
    if (document.getElementById('quit-modal')) return;
    const config = window.APP_CONFIG || {};
    const unitLabel = getUnitLabel(config);
    const unitLabelLower = unitLabel.toLowerCase();
    const m = document.createElement('div');
    m.id = 'quit-modal';
    m.className = 'modal-overlay';
    m.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">Abandonner la ${unitLabelLower} ?</div>
            <p class="modal-text">Ta progression dans cet exercice sera perdue. Es-tu sûr de vouloir nous quitter Agent ?</p>
            <div class="modal-btns">
                <button class="btn-nav quit-cancel-btn" style="flex:1" onclick="hideQuitModal()">RESTER</button>
                <button class="btn-nav quit-confirm-btn" style="flex:1" onclick="abandonMission()">QUITTER</button>
            </div>
        </div>
    `;
    document.body.appendChild(m);
}

function showQuitModal() {
    document.getElementById('quit-modal').classList.add('active');
}

function hideQuitModal() {
    document.getElementById('quit-modal').classList.remove('active');
}

function isMissionActive() {
    return !!(state && state.currentDay && el.content && el.content.classList.contains('active'));
}

function markSessionActivity() {
    inactivityMonitor.lastActivity = Date.now();
    if (inactivityMonitor.promptShown) {
        dismissInactivityPrompt(true);
    }
}

function dismissInactivityPrompt(resetSessionClock) {
    const modal = document.getElementById('inactivity-modal');
    if (modal) modal.classList.remove('active');
    inactivityMonitor.promptShown = false;

    if (inactivityMonitor.autoPauseTimerId) {
        clearTimeout(inactivityMonitor.autoPauseTimerId);
        inactivityMonitor.autoPauseTimerId = null;
    }

    if (resetSessionClock && isMissionActive()) {
        state.startTime = new Date().toISOString();
        state.sessionId = makeTrackingId('sess');
        saveState();
    }
}

function showInactivityPrompt() {
    let modal = document.getElementById('inactivity-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'inactivity-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-title">Toujours la ?</div>
                <p class="modal-text">Appuie sur CONTINUER si tu es encore en session.</p>
                <div class="modal-btns">
                    <button class="btn-nav quit-cancel-btn" style="flex:1" onclick="continueSessionAfterIdle()">CONTINUER</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    inactivityMonitor.promptShown = true;
    modal.classList.add('active');
    inactivityMonitor.autoPauseTimerId = setTimeout(() => {
        dismissInactivityPrompt(true);
    }, inactivityMonitor.autoPauseMs);
}

window.continueSessionAfterIdle = function continueSessionAfterIdle() {
    dismissInactivityPrompt(true);
};

function startInactivityMonitor() {
    if (inactivityMonitor.intervalId) return;

    const config = window.APP_CONFIG || {};
    const promptMs = Number(config.INACTIVITY_PROMPT_MS);
    const autoPauseMs = Number(config.INACTIVITY_AUTO_PAUSE_MS);
    inactivityMonitor.promptAfterMs = Number.isFinite(promptMs) && promptMs > 0 ? promptMs : (15 * 60 * 1000);
    inactivityMonitor.autoPauseMs = Number.isFinite(autoPauseMs) && autoPauseMs > 0 ? autoPauseMs : (60 * 1000);
    inactivityMonitor.lastActivity = Date.now();

    ['pointerdown', 'keydown', 'input', 'touchstart'].forEach((eventName) => {
        document.addEventListener(eventName, markSessionActivity, { passive: true });
    });
    window.addEventListener('focus', markSessionActivity);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            markSessionActivity();
        }
    });

    inactivityMonitor.intervalId = setInterval(() => {
        if (!isMissionActive() || inactivityMonitor.promptShown) return;
        const idleFor = Date.now() - inactivityMonitor.lastActivity;
        if (idleFor >= inactivityMonitor.promptAfterMs) {
            showInactivityPrompt();
        }
    }, 10000);
}

function showFatalError(err) {
    console.error('FATAL ENGINE ERROR:', err);
    const errorDiv = document.createElement('div');
    errorDiv.style = 'position:fixed; top:20px; left:20px; right:20px; background:red; color:white; padding:15px; z-index:9999; font-family:monospace; font-size:12px; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.5);';
    errorDiv.innerHTML = '<b>FATAL ENGINE ERROR:</b><br>' + err.message + '<br><br>Stack:<br>' + (err.stack ? err.stack.substring(0, 200) : 'No stack trace');
    document.body.appendChild(errorDiv);
}

function saveState() {
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };
    localStorage.setItem(config.STORAGE_KEY, JSON.stringify(state));
}

function updateGlobalProgress() {
    const total = appData.length;
    if (total === 0) return;
    
    const count = state.completedDays.length;
    const percent = Math.round((count / total) * 100);
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };
    
    if (el.bar) el.bar.style.width = percent + '%';
    if (el.progText) {
        let prefix = 'PROGRESSION : ';
        if (config.MODULE_NAME) {
            prefix = `SYNCHRO ${config.MODULE_NAME} : `;
        } else if (window.weekData) {
            prefix = 'SYNCHRO TACTIQUE : ';
        }
        el.progText.innerText = prefix + percent + '%';
    }
}

function setActiveView(viewName) {
    ['lobby', 'content', 'success'].forEach((key) => {
        if (el[key]) el[key].classList.remove('active');
    });

    if (el.footer) {
        if (viewName === 'content') el.footer.classList.remove('hidden');
        else el.footer.classList.add('hidden');
    }

    if (viewName && el[viewName]) {
        el[viewName].classList.add('active');
        if (typeof el[viewName].scrollTop === 'number') el[viewName].scrollTop = 0;
    }

    if (el.app && viewName !== 'content') {
        el.app.classList.remove('story-layout-active');
    }
}

function renderLobby() {
    if (!el.lobby) return;
    setActiveView('lobby');
    
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };
    const unitLabel = getUnitLabel(config);
    const unitLabelLower = unitLabel.toLowerCase();
    
    // Check if whole module is locked by prerequisite
    let moduleLocked = false;
    let prerequisiteName = "le module précédent";
    if (config.PREREQUISITE_KEY) {
        let preReq = null;
        try {
            preReq = localStorage.getItem(config.PREREQUISITE_KEY);
        } catch (e) {
            // localStorage indisponible (file:// ou contexte bloque) -> pas de verrouillage
            preReq = null;
        }

        if (!preReq) {
            moduleLocked = true;
        } else {
            try {
                const preData = JSON.parse(preReq);
                const minRequired = config.PREREQUISITE_MIN || 1;
                if (!preData.completedDays || preData.completedDays.length < minRequired) {
                    moduleLocked = true;
                }
            } catch(e) { moduleLocked = true; }
        }
    }

    if (el.grid) {
        el.grid.innerHTML = '';
        if (appData.length === 0) {
            el.grid.innerHTML = `<p style="color:var(--text-dim); text-align:center; padding:20px;">Aucune ${unitLabelLower} disponible.</p>`;
            return;
        }

        if (moduleLocked) {
            el.grid.innerHTML = `
                <div class="lock-overlay-lobby" style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; background: rgba(255,71,87,0.05); border: 2px dashed var(--danger); border-radius: 20px; margin: 20px 0;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🔒</div>
                    <h3 style="color: var(--danger); margin-bottom: 10px; font-weight: 800;">ACCÈS REFUSÉ</h3>
                    <p style="color: var(--text-dim);">Tu dois d'abord terminer <b>${config.PREREQUISITE_KEY.includes('w1') ? 'le MODULE 1' : 'le module précédent'}</b> pour déverrouiller ces transmissions.</p>
                </div>
            `;
            return;
        }

        appData.forEach((day, index) => {
            const dayIdStr = toIdString(day && day.id);
            if (!dayIdStr) return;
            const isDone = state.completedDays.includes(dayIdStr);
            const prevDayId = index > 0 ? toIdString(appData[index - 1] && appData[index - 1].id) : null;
            const isLocked = index > 0 && (!prevDayId || !state.completedDays.includes(prevDayId));
            
            const card = document.createElement('div');
            card.className = `day-card ${isLocked ? 'locked' : ''} ${isDone ? 'completed' : ''}`;
            
            let iconContent = isDone ? '✓' : (day.icon || (index + 1));

            card.innerHTML = `
                <div class="icon">${iconContent}</div>
                <div class="day-info">
                    <h3>${day.title}</h3>
                    <p>${day.intro || day.description || ''}</p>
                </div>
            `;
            
            if (!isLocked) {
                card.onclick = () => {
                    // If BASE_PATH is set, we are on an index page and want to redirect
                    if (config.BASE_PATH) {
                        window.location.href = `${config.BASE_PATH}mission_${day.id}.html`;
                    } else {
                        startDay(dayIdStr);
                    }
                };
            }
            el.grid.appendChild(card);
        });
    }
}

function startDay(dayIdStr) {
    state.currentDay = dayIdStr;
    state.currentStep = 0;
    state.startTime = new Date().toISOString();
    state.sessionId = makeTrackingId('sess');
    markSessionActivity();
    attemptCount = 0; // Reset compteur au démarrage
    saveState();
    renderStep();
}

function renderStep() {
    const day = findDayById(state.currentDay);
    if (!day || !day.steps) {
        state.currentDay = null;
        renderLobby();
        return;
    }
    
    const step = day.steps[state.currentStep];
    if (!step) {
        state.currentStep = 0;
        renderLobby();
        return;
    }
    
    const isBoss = step.type === 'challenge';
    const config = window.APP_CONFIG || {};
    
    setActiveView('content');
    
    if (el.content) {
        const hasStoryDots = !!document.getElementById('story-dots');
        const useStoryLayout = hasStoryDots && (step.type === 'lesson' || step.type === 'msg');
        el.content.classList.toggle('boss-mode', isBoss);
        el.content.classList.toggle('story-layout', useStoryLayout);
        if (el.app) el.app.classList.toggle('story-layout-active', useStoryLayout);
    }
    
    if (el.stepTitle) el.stepTitle.innerText = step.title;
    
    if (el.btnPrev) {
        el.btnPrev.classList.remove('hidden');
        const isFirst = state.currentStep === 0;
        el.btnPrev.innerText = isFirst ? 'QUITTER' : 'RETOUR';
        el.btnPrev.classList.toggle('quit-style', isFirst);
    }
    
    if (el.btnNext) {
        el.btnNext.disabled = ['interactive', 'quiz', 'challenge', 'write'].includes(step.type);
        const unitLabel = getUnitLabel(config);
        el.btnNext.innerText = isBoss ? `VALIDER LA ${unitLabel}` : 'ÉTAPE SUIVANTE';
        el.btnNext.classList.toggle('boss-btn', isBoss);
    }

    const body = step.body || step.content || '';
    const q = step.q || step.question || '';
    const opts = step.opts || step.options || [];
    const a = (step.a !== undefined) ? step.a : step.answer;
    const feed = step.feed || step.feedback || 'Correct !';

    if (!el.stepBody) return;

    if (step.type === 'lesson' || step.type === 'msg') {
        el.stepBody.innerHTML = body;
    } else if (step.type === 'write' || step.type === 'challenge') {
        let hintHtml = '';
        const bossIcon = isBoss ? renderBossVisual(config) : '';
        
        // Dynamic Question Formatting (Extracting text inside <i>)
        let formattedQ = q.replace(/<i>(.*?)<\/i>/g, '<div class="tactical-data">$1</div>');

        // Système de hints progressifs (hint1 après 2 échecs, hint2 après 3 échecs)
        if (step.hint1 || step.hint2 || step.hint) {
            let hintContent = '';
            let hintLabel = '💡 INDICE';
            
            if (attemptCount >= 3 && step.hint2) {
                // Niveau 2 : Hint détaillé après 3+ échecs
                hintContent = step.hint2;
                hintLabel = '💡 INDICE DÉTAILLÉ';
            } else if (attemptCount >= 2 && step.hint1) {
                // Niveau 1 : Hint léger après 2+ échecs
                hintContent = step.hint1;
                hintLabel = '💡 MÉTHODE';
            } else if (step.hint) {
                // Fallback : hint classique (pour compatibilité)
                hintContent = step.hint;
            }
            
            if (hintContent) {
                hintHtml = `
                    <button class="hint-btn" onclick="this.nextElementSibling.classList.toggle('hidden')">${hintLabel}</button>
                    <div class="hint-box hidden">${hintContent}</div>
                `;
            }
        }
        el.stepBody.innerHTML = `
            ${ bossIcon}
            <p class="content-chunk" style="font-size: 1.15rem; line-height: 1.6; color: var(--text); background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border-left: 3px solid var(--accent);">${formattedQ}</p>
            <div style="margin-top:20px; display: flex; flex-direction: column; gap: 15px;">
                ${hintHtml}
                <textarea id="input-write" placeholder="Tape ta réponse ici..." class="btn-opt" 
                       style="background: rgba(255,255,255,0.05); border-style: dashed; width: 100%; cursor: text; margin-bottom: 0; min-height: 100px; padding: 15px; resize: none; overflow-y: auto; text-transform: none;"></textarea>
                <button id="btn-check-write" class="btn-main">VÉRIFIER</button>
                <div id="write-feedback"></div>
            </div>
        `;

        const input = document.getElementById('input-write');
        const check = document.getElementById('btn-check-write');
        const feedback = document.getElementById('write-feedback');

        if (check && input) {
            check.onclick = async () => {
                const val = input.value.trim();
                const feedArea = feedback;

                if (window.FrValidator && typeof window.FrValidator.validate === 'function') {
                    const pluginResult = await window.FrValidator.validate({ text: val, step, normalizeText });
                    if (pluginResult && pluginResult.handled) {
                        if (pluginResult.ok) {
                            input.disabled = true;
                            check.classList.add('hidden');
                            feedArea.innerHTML = `
                                <div class="success-badge">
                                    <p style="color: var(--success); font-weight: bold; margin: 0;"><b>✓</b> ${pluginResult.msg || feed}</p>
                                </div>
                            `;
                            if (el.btnNext) el.btnNext.disabled = false;
                        } else {
                            check.disabled = false;
                            check.innerText = 'RÉESSAYER LE SCAN';
                            input.classList.add('shake');
                            feedArea.innerHTML = '<p style="color: #ff4757; font-size: 0.85rem; margin-top: 10px;"><b>⚠️</b> ' + pluginResult.msg + '</p>';
                            setTimeout(() => input.classList.remove('shake'), 400);
                        }
                        return;
                    }
                }

                if (step.requirements) {
                    check.disabled = true;
                    check.innerText = 'SCAN EN COURS...';

                    const result = await validateTactical(val, step.requirements, step);

                    if (result.ok) {
                        input.disabled = true;
                        check.classList.add('hidden');
                        feedArea.innerHTML = `
                            <div class="success-badge">
                                <p style="color: var(--success); font-weight: bold; margin: 0;"><b>✓</b> ${feed}</p>
                            </div>
                        `;
                        if (el.btnNext) el.btnNext.disabled = false;
                    } else {
                        attemptCount++; // Incrémenter au premier échec validation Requirements
                        check.disabled = false;
                        check.innerText = 'RÉESSAYER LE SCAN';
                        input.classList.add('shake');
                        feedArea.innerHTML = '<p style="color: #ff4757; font-size: 0.85rem; margin-top: 10px;"><b>⚠️</b> ' + result.msg + '</p>';
                        setTimeout(() => input.classList.remove('shake'), 400);
                        
                        // Re-render pour afficher hint si seuils atteints
                        if (attemptCount === 2 || attemptCount === 3) {
                            setTimeout(() => renderStep(), 500);
                        }
                    }
                } else {
                    const cleanVal = normalizeText(val);
                    const sols = Array.isArray(a) ? a : [a];
                    const ok = sols.some(s => normalizeText(s) === cleanVal);

                    if (ok) {
                        input.disabled = true; 
                        check.disabled = true;
                        feedArea.innerHTML = '<p style="color: var(--success); margin-top: 10px;"><b>✓</b> ' + feed + '</p>';
                        if (el.btnNext) el.btnNext.disabled = false;
                    } else {
                        attemptCount++; // Incrémenter au second type d'échec (fallback sans requirements)
                        input.classList.add('shake'); 
                        feedArea.innerHTML = '<p style="color: #ff4757; font-size: 0.85rem; margin-top: 10px;"><b>⚠️</b> Signal instable. Vérifie l\'ordre ou l\'orthographe !</p>';
                        setTimeout(() => input.classList.remove('shake'), 400);
                        
                        // Re-render pour afficher hint si seuils atteints
                        if (attemptCount === 2 || attemptCount === 3) {
                            setTimeout(() => renderStep(), 500);
                        }
                    }
                }
            };
        }
    } else {
        el.stepBody.innerHTML = '<p class="content-chunk">' + q + '</p>';
        const area = document.createElement('div'); 
        area.className = 'interactive-area';
        area.style.marginTop = '20px';
        opts.forEach((o, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn-opt'; 
            btn.innerText = o;
            btn.onclick = () => {
                if (i === a) {
                    btn.classList.add('correct');
                    if (el.btnNext) el.btnNext.disabled = false;
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => btn.classList.remove('wrong'), 500);
                }
            };
            area.appendChild(btn);
        });
        el.stepBody.appendChild(area);
    }
}

// ========================================
// VALIDATION FUNCTION (WITH MATH SUPPORT)
// ========================================

async function validateTactical(text, reqs, step) {
    const rawText = (text || '').trim();
    const hasOneWordTarget = Number(reqs && reqs.minWords) <= 1;
    const minChars = Number(reqs && reqs.minChars) || (hasOneWordTarget ? 1 : 3);

    if (!rawText || rawText.length < minChars) {
        return { ok: false, msg: 'Reponse trop courte.' };
    }

    if (step && step.hint && normalizeText(step.hint) === normalizeText(rawText)) {
        return { ok: false, msg: 'Reformule avec tes propres mots au lieu de copier l\'indice.' };
    }

    const normalizedRaw = normalizeText(rawText);
    const antiCheatPhrases = ['objectif non atteint', 'il te manque', 'tu dois utiliser', 'reessayer le scan'];
    if (antiCheatPhrases.some(p => normalizedRaw.includes(p))) {
        return { ok: false, msg: 'Ne copie pas le message d\'erreur, reponds a la consigne.' };
    }

    if (reqs && Array.isArray(reqs.forbidden)) {
        const forbiddenHit = reqs.forbidden.find(f => normalizedRaw.includes(normalizeText(f)));
        if (forbiddenHit) {
            return { ok: false, msg: 'Tu dois remplacer "' + forbiddenHit + '".' };
        }
    }

    const looksNumeric = !!(reqs && Array.isArray(reqs.keywords) && reqs.keywords.length > 0 && reqs.keywords.every(k => /^-?\d+(\.\d+)?$/.test(k)));
    if (looksNumeric) {
        const userNumbers = extractNumbers(rawText);
        if (sameNumbers(userNumbers, reqs.keywords)) {
            return { ok: true };
        }
        return { ok: false, msg: 'Resultat incorrect. Verifie ton calcul.' };
    }

    if (reqs && reqs.validationType === 'algebraic') {
        const userMath = normalizeMath(rawText);
        const normKeywords = (reqs.keywords || []).map(k => normalizeMath(k));

        const allPresent = normKeywords.every(kw => userMath.includes(kw));
        if (!allPresent) {
            const missing = (reqs.keywords || []).filter((k, i) => !userMath.includes(normKeywords[i]));
            return {
                ok: false,
                msg: 'Expression incomplete. Elements manquants : ' + missing.join(', ')
            };
        }

        if (reqs.minWords) {
            const terms = userMath.split(/[\s+\-*/()]+/).filter(t => t.length > 0);
            if (terms.length < reqs.minWords) {
                return {
                    ok: false,
                    msg: 'Expression trop simple. Detaille davantage.'
                };
            }
        }

        return { ok: true };
    }

    if (reqs && reqs.validationType === 'equation' && reqs.expectNumbers) {
        const userNumbers = extractNumbers(rawText);
        const expectedNumbers = reqs.keywords || [];

        if (sameNumbers(userNumbers, expectedNumbers)) {
            return { ok: true };
        }
        return {
            ok: false,
            msg: 'Solutions incorrectes. Verifie tes calculs.'
        };
    }

    const normalizedWords = splitNormalizedWords(rawText);

    if (reqs && Array.isArray(reqs.keywordGroups) && reqs.keywordGroups.length > 0) {
        const missingGroups = reqs.keywordGroups.filter(group =>
            !Array.isArray(group) || !group.some(keyword => hasRequiredToken(rawText, normalizedWords, keyword))
        );
        if (missingGroups.length > 0) {
            const expected = missingGroups
                .map(group => Array.isArray(group) && group.length > 0 ? group[0] : null)
                .filter(Boolean);
            return { ok: false, msg: 'Objectif non atteint. Il manque un element de : ' + expected.join(', ') + '.' };
        }
    }

    if (reqs && Array.isArray(reqs.keywords) && reqs.keywords.length > 0) {
        if (reqs.enforceKeywords) {
            const missing = reqs.keywords.filter(keyword => !hasRequiredToken(rawText, normalizedWords, keyword));
            if (missing.length > 0) {
                return { ok: false, msg: 'Objectif non atteint. Il te manque : ' + missing.join(', ') + '.' };
            }
        } else {
            const found = reqs.keywords.some(keyword => hasRequiredToken(rawText, normalizedWords, keyword));
            if (!found) {
                return { ok: false, msg: 'Objectif non atteint. Tu dois utiliser au moins un mot-cle attendu (ex: ' + reqs.keywords[0] + ').' };
            }
        }
    }

    if (reqs && reqs.minWords) {
        const words = rawText.split(/\s+/).filter(Boolean).length;
        if (words < reqs.minWords) {
            return { ok: false, msg: 'Ta reponse est trop courte (' + words + ' mots). Minimum: ' + reqs.minWords + '.' };
        }
    }

    if (reqs && reqs.minSentences) {
        const sentenceCount = (rawText.match(/[.!?]+/g) || []).length;
        if (sentenceCount < reqs.minSentences) {
            return { ok: false, msg: 'Ajoute ' + reqs.minSentences + ' phrase(s) complete(s).' };
        }
    }

    if (containsMathSymbols(rawText)) {
        return { ok: true };
    }

    try {
        const params = new URLSearchParams();
        params.append('text', rawText);
        params.append('language', 'fr');

        const response = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            body: params
        });
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
            const error = data.matches[0];
            let msg = error.message;
            if (error.rule.issueType === 'misspelling') msg = 'Erreur de saisie : ' + error.context.text.substr(error.context.offset, error.context.length) + ' semble mal ecrit.';
            if (msg.includes('Sujet et verbe ne semblent pas s\'accorder')) msg = 'Alerte Accord : Ton verbe n\'est pas synchronise avec ton sujet !';

            return { ok: false, msg: msg };
        }
    } catch (e) {
        console.error('API de grammaire injoignable, validation locale uniquement.');
    }

    return { ok: true };
}
function completeDay() {
    const lastDayId = state.currentDay;
    if (lastDayId && !state.completedDays.includes(lastDayId)) {
        state.completedDays.push(lastDayId);
    }
    dismissInactivityPrompt(false);
    syncWithParent(lastDayId, 'TERMINE');

    state.currentDay = null; 
    state.currentStep = 0;
    saveState();
    
    if (el.success) {
        renderSuccess();
    } else {
        renderLobby(); 
        updateGlobalProgress();
    }
}

function renderSuccess() {
    setActiveView('success');
}

function getQuitHref(config) {
    if (config && typeof config.QUIT_HREF === 'string' && config.QUIT_HREF.trim()) {
        return config.QUIT_HREF.trim();
    }

    const path = (window.location.pathname || '').replace(/\\/g, '/');
    if (/\/module_\d+\/mission_\d+\.html$/i.test(path)) {
        return 'index.html';
    }

    return 'index.html';
}

function abandonMission() {
    const lastDayId = state.currentDay;
    if (!lastDayId) return;
    
    hideQuitModal();
    dismissInactivityPrompt(false);
    syncWithParent(lastDayId, 'ABANDONNE');

    state.currentDay = null;
    state.currentStep = 0;
    saveState();

    const config = window.APP_CONFIG || {};
    if (config.SINGLE_MISSION_MODE) {
        window.location.href = getQuitHref(config);
    } else {
        renderLobby();
        updateGlobalProgress();
    }
}

async function syncWithParent(dayId, status = 'TERMINE') {
    const config = window.APP_CONFIG || {};
    const childName = (config.STORAGE_KEY && config.STORAGE_KEY.includes('lovyc')) ? 'Lovyc' : 'Zyvah';
    const pathParts = window.location.pathname.split('/');
    const subject = getTrackingSubject(config, pathParts);
    const moduleName = getTrackingModule(config, pathParts);
    
    const day = findDayById(dayId);
    const missionId = dayId;
    const unitLabel = getUnitLabel(config);
    const missionTitle = day ? day.title : unitLabel;
    
    const endTime = new Date();
    const startTime = state.startTime ? new Date(state.startTime) : endTime;
    const durationMin = Math.max(0, Math.round((endTime - startTime) / 60000));
    const actorId = inferActorId(config);
    const deviceId = getOrCreateDeviceId();
    if (!state.sessionId) {
        state.sessionId = makeTrackingId('sess');
        saveState();
    }

    const includeIp = config.TRACKING_INCLUDE_IP === true;
    const consentProof = getTrackingConsentProof(config);
    const includeIpWithConsent = includeIp && consentProof.valid;
    if (includeIp && !consentProof.valid) {
        console.warn('TRACKING_INCLUDE_IP actif sans preuve de consentement valide: IP ignoree.');
    }

    let clientIP = 'Inconnue';
    if (includeIpWithConsent) {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipJson = await ipRes.json();
            clientIP = ipJson.ip || 'Inconnue';
        } catch (e) {
            console.log('Impossible de récupérer l\'IP');
        }
    }

    const baseUrl = 'https://script.google.com/macros/s/AKfycbyNHvhCg9mtYfhuPKdy89iaFaKMGtfzRMHNlzB5nqXpC_DRIRnpMj7VjgnTjTpdvV9R/exec';
    const payload = {
        child: childName,
        subject: subject,
        module: moduleName,
        mission_id: missionId,
        mission_title: missionTitle,
        status: status,
        date: endTime.toLocaleDateString('fr-FR'),
        start_time: startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        end_time: endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        duration: durationMin + ' min',
        actor_id: actorId,
        device_id: deviceId,
        session_id: state.sessionId,
        event_time: endTime.toISOString(),
        tracking_version: 'v2_actor_device_session'
    };
    if (includeIpWithConsent) payload.ip = clientIP;
    if (includeIpWithConsent) payload.consent_mode = consentProof.mode;
    if (includeIpWithConsent) payload.consent_at = consentProof.at;
    if (includeIpWithConsent) payload.consent_actor = consentProof.actor;

    try {
        await fetch(baseUrl, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload)
        });
        console.log('Synchro Cloud envoyée (POST).');
    } catch (e) {
        console.error('Echec de la synchro Cloud:', e);
    }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();



