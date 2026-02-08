// ENGINE SPA - UNIVERSAL
// Handles progress, navigation and rendering for all modules

let el = {};
let state = null;
let appData = [];

function init() {
    console.log("Engine Booting...");
    
    // 1. Elements
    el = {
        lobby: document.getElementById('view-lobby'),
        content: document.getElementById('view-content'),
        grid: document.getElementById('days-grid'),
        bar: document.getElementById('main-bar'),
        progText: document.getElementById('progress-text'),
        tag: document.getElementById('session-tag'),
        footer: document.getElementById('footer'),
        btnNext: document.getElementById('btn-next'),
        stepTitle: document.getElementById('step-title'),
        stepBody: document.getElementById('step-body')
    };

    if (!el.lobby) {
        console.error("Lobby not found");
        return;
    }

    // 2. Data
    appData = window.weekData || window.missionData || [];
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };

    // 3. State
    try {
        const saved = localStorage.getItem(config.STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : null;
        state = parsed || { completedDays: [], currentDay: null, currentStep: 0 };
    } catch(e) {
        state = { completedDays: [], currentDay: null, currentStep: 0 };
    }

    // 4. Render
    renderLobby();
    updateGlobalProgress();
    
    // 5. Events
    if (el.btnNext) {
        el.btnNext.onclick = () => {
            const day = appData.find(d => d.id === state.currentDay);
            if (day && state.currentStep < day.steps.length - 1) {
                state.currentStep++;
                renderStep();
            } else {
                completeDay();
            }
            saveState();
        };
    }
}

function saveState() {
    const config = window.APP_CONFIG || { STORAGE_KEY: 'default_v1' };
    localStorage.setItem(config.STORAGE_KEY, JSON.stringify(state));
}

function updateGlobalProgress() {
    if (!appData.length) return;
    const total = appData.length;
    const count = state.completedDays.length;
    const percent = Math.round((count / total) * 100);
    
    if (el.bar) el.bar.style.width = percent + "%";
    if (el.progText) {
        const prefix = window.weekData ? "SYNCHRO TACTIQUE : " : "PROGRESSION : ";
        el.progText.innerText = prefix + percent + "%";
    }
}

function renderLobby() {
    if (!el.lobby) return;
    el.lobby.classList.add('active');
    if (el.content) el.content.classList.remove('active');
    if (el.footer) el.footer.classList.add('hidden');
    
    if (el.tag) el.tag.innerText = window.weekData ? "CENTRE DE COMMANDE" : "TABLEAU DE BORD";
    
    if (el.grid) {
        el.grid.innerHTML = "";
        appData.forEach((day, index) => {
            const isLocked = index > 0 && !state.completedDays.includes(appData[index-1].id);
            const isDone = state.completedDays.includes(day.id);
            
            const card = document.createElement('div');
            card.className = `day-card ${isLocked ? 'locked' : ''} ${isDone ? 'completed' : ''}`;
            
            let iconContent = isDone ? '✓' : (day.icon || index + 1);
            if (!isDone && window.icons && window.icons[index]) iconContent = window.icons[index];

            card.innerHTML = `
                <div class="icon">${iconContent}</div>
                <div class="day-info">
                    <h3>${(window.weekData ? 'MISSION' : 'BLOCK')} ${day.id} : ${day.title}</h3>
                    <p>${day.intro}</p>
                </div>
            `;
            if (!isLocked) card.onclick = () => startDay(day.id);
            el.grid.appendChild(card);
        });
    }
}

function startDay(id) {
    state.currentDay = id;
    state.currentStep = 0;
    if (el.lobby) el.lobby.classList.remove('active');
    if (el.content) el.content.classList.add('active');
    if (el.footer) el.footer.classList.remove('hidden');
    if (el.tag) el.tag.innerText = `MISSION ${id}`;
    if (el.content) el.content.scrollTop = 0;
    renderStep();
    saveState();
}

function renderStep() {
    const day = appData.find(d => d.id === state.currentDay);
    if (!day) return;
    const step = day.steps[state.currentStep];
    const isBoss = (state.currentStep === day.steps.length - 1);
    
    if (el.content) {
        el.content.scrollTop = 0;
        el.content.classList.toggle('boss-mode', isBoss);
    }
    
    if (el.stepTitle) el.stepTitle.innerText = step.title;
    
    if (el.btnNext) {
        el.btnNext.disabled = ['interactive', 'quiz', 'challenge', 'write'].includes(step.type);
        el.btnNext.innerText = isBoss ? "VALIDER LA MISSION" : "ÉTAPE SUIVANTE";
        el.btnNext.classList.toggle('boss-btn', isBoss);
    }

    const body = step.body || step.content || "";
    const q = step.q || step.question || "";
    const opts = step.opts || step.options || [];
    const a = (step.a !== undefined) ? step.a : step.answer;
    const feed = step.feed || step.feedback || "Correct !";

    if (!el.stepBody) return;

    if (step.type === 'lesson' || step.type === 'msg') {
        el.stepBody.innerHTML = body;
    } else if (step.type === 'write' || step.type === 'challenge') {
        let hintHtml = "";
        let bossIcon = isBoss ? '<span class="boss-icon">👾</span>' : '';
        
        if (step.hint) {
            hintHtml = `
                <button class="hint-btn" onclick="this.nextElementSibling.classList.toggle('hidden')">💡 INDICE</button>
                <div class="hint-box hidden">${step.hint}</div>
            `;
        }
        el.stepBody.innerHTML = `
            ${bossIcon}
            <p class="content-chunk">${q}</p>
            <div style="margin-top:20px; display: flex; flex-direction: column; gap: 15px;">
                ${hintHtml}
                <input type="text" id="input-write" placeholder="Tape ta réponse ici..." class="btn-opt" 
                       style="background: rgba(255,255,255,0.05); border-style: dashed; width: 100%; cursor: text; margin-bottom: 0;">
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
                
                // Mode de validation intelligent (Alerte Tactique)
                if (step.requirements) {
                    check.disabled = true;
                    check.innerText = "SCAN EN COURS...";
                    
                    const result = await validateTactical(val, step.requirements);
                    
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
                        check.disabled = false;
                        check.innerText = "RÉESSAYER LE SCAN";
                        input.classList.add('shake');
                        feedArea.innerHTML = `<p style="color: #ff4757; font-size: 0.85rem; margin-top: 10px;"><b>⚠️</b> ${result.msg}</p>`;
                        setTimeout(() => input.classList.remove('shake'), 400);
                    }
                } else {
                    // Fallback : Mode classique (comparaison exacte)
                    const cleanVal = val.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
                    const sols = Array.isArray(a) ? a : [a];
                    const ok = sols.some(s => s.toString().toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"") === cleanVal);
                    
                    if (ok) {
                        input.disabled = true; 
                        check.disabled = true;
                        feedArea.innerHTML = `<p style="color: var(--success); margin-top: 10px;"><b>✓</b> ${feed}</p>`;
                        if (el.btnNext) el.btnNext.disabled = false;
                    } else {
                        input.classList.add('shake'); 
                        feedArea.innerHTML = `<p style="color: #ff4757; font-size: 0.85rem; margin-top: 10px;"><b>⚠️</b> Signal instable. Vérifie l'ordre ou l'orthographe !</p>`;
                        setTimeout(() => input.classList.remove('shake'), 400);
                    }
                }
            };
        }
    } else {
        el.stepBody.innerHTML = `<p class="content-chunk">${q}</p>`;
        const area = document.createElement('div'); 
        area.className = "interactive-area";
        area.style.marginTop = "20px";
        opts.forEach((o, i) => {
            const btn = document.createElement('button');
            btn.className = "btn-opt"; 
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

async function validateTactical(text, reqs) {
    if (!text || text.length < 5) return { ok: false, msg: "Message trop court pour être valide." };

    // 1. Vérification des Mots-Clés Requis (Filtre Pédagogique)
    if (reqs.keywords) {
        const found = reqs.keywords.some(k => text.toLowerCase().includes(k.toLowerCase()));
        if (!found) return { ok: false, msg: `Objectif non atteint. N'oublie pas d'utiliser : ${reqs.keywords.join(', ')}.` };
    }

    // 2. Scan Grammatical Live (LanguageTool API)
    try {
        const params = new URLSearchParams();
        params.append('text', text);
        params.append('language', 'fr');

        const response = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            body: params
        });
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
            const error = data.matches[0];
            // Nettoyage pédagogique du message technique
            let msg = error.message;
            if (error.rule.issueType === 'misspelling') msg = `Erreur de saisie : '${error.context.text.substr(error.context.offset, error.context.length)}' semble mal écrit.`;
            if (msg.includes('Sujet et verbe ne semblent pas s’accorder')) msg = "Alerte Accord : Ton verbe n'est pas synchronisé avec ton sujet !";
            
            return { ok: false, msg: msg };
        }
    } catch (e) {
        console.error("API de grammaire injoignable, validation locale uniquement.");
    }

    return { ok: true };
}

function completeDay() {
    const lastDayId = state.currentDay;
    if (!state.completedDays.includes(lastDayId)) {
        state.completedDays.push(lastDayId);
    }
    
    // Synchro Cloud (Google Sheets)
    syncWithParent(lastDayId);

    state.currentDay = null; 
    state.currentStep = 0;
    renderLobby(); 
    updateGlobalProgress();
}

async function syncWithParent(dayId) {
    const childName = (window.APP_CONFIG && window.APP_CONFIG.STORAGE_KEY.includes('lovyc')) ? 'Lovyc' : 'Zyvah';
    const subject = window.location.pathname.split('/').slice(-3, -2)[0] || 'Général';
    const url = "https://script.google.com/macros/s/AKfycbyNHvhCg9mtYfhuPKdy89iaFaKMGtfzRMHNlzB5nqXpC_DRIRnpMj7VjgnTjTpdvV9R/exec";

    try {
        // Utilisation de text/plain pour éviter les erreurs CORS preflight avec Google Apps Script
        await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                child: childName,
                subject: subject,
                mission: dayId,
                date: new Date().toISOString()
            })
        });
        console.log("Synchro Cloud envoyée.");
    } catch (e) {
        console.log("Echec de la synchro Cloud.");
    }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
