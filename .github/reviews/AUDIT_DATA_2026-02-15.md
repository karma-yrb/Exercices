# Audit Donnees & Exploitation - 2026-02-15

## Meta
- Date: 2026-02-15
- Auditeur: Codex (re-audit technique)
- Scope (global + zones auditees): tracking runtime + pipeline notes + couverture validateurs
- Version/commit: `340ce46` (HEAD)

## Verdict global
- Statut: `GO_WITH_RISK`
- Risque global: `Modere`

## Synthese executif
- Points forts:
  - Pipeline notes: validation schema/qualite en place (`tools/notes/sync-notes.js`).
  - Test dedie notes pipeline integre au runner (`tests/validators/notes-pipeline-validator.js`, `tests/test-runner.js`).
  - Regressions d'encodage maintenant couvertes par test global (`tests/validators/encoding-validator.js`).
  - Suite locale verte: `node tests/test-runner.js` -> 59/59.
- Risques prioritaires:
  - Consentement IP: absence de preuve technique explicite en payload.
  - Metadata tracking: fallback URL encore active tant que `TRACKING_SUBJECT` / `TRACKING_MODULE` ne sont pas declares dans les modules.
- Decision de gate:
  - Pas de blocage release immediate.
  - Correctifs P0 requis avant prochaine revue data/compliance.

## Findings (ordonnes par severite)

### 1) [Majeur] Consentement IP non prouve techniquement dans le payload
- Portee: `Securite`
- Fichier:
  - `assets/shared/engine.js`
  - `assets/shared/engine_math.js`
  - `docs/governance/TRACKING_POLICY.md`
- Ligne:
  - `assets/shared/engine.js:860`
  - `assets/shared/engine_math.js:1028`
  - `docs/governance/TRACKING_POLICY.md:40`
- Constat:
  - L'IP reste bien opt-in (`TRACKING_INCLUDE_IP === true`), mais aucun champ de preuve de consentement (timestamp/acteur/version) n'est embarque dans la logique runtime.
  - La policy decrit le cadre family mode, mais la preuve technique n'est pas tracee dans l'evenement.
- Impact:
  - Difficulte d'audit ex-post si le mode de consentement evolue ou si le perimetre sort du family mode.
- Action corrective:
  - Ajouter champs explicites (ex: `consent_mode`, `consent_at`, `consent_actor`) dans le payload quand IP active.
  - Ajouter test de non-regression sur presence/absence de ces champs.
- Test de non-regression:
  - Cas 1: IP OFF -> pas de champ IP ni consent.
  - Cas 2: IP ON sans preuve -> echec validation.
  - Cas 3: IP ON avec preuve -> validation OK.
- Statut: `Open`

### 2) [Majeur] Metadata tracking encore dependante du fallback URL
- Portee: `Tests`
- Fichier:
  - `assets/shared/engine.js`
  - `assets/shared/engine_math.js`
- Ligne:
  - `assets/shared/engine.js:68`
  - `assets/shared/engine.js:73`
  - `assets/shared/engine_math.js:79`
  - `assets/shared/engine_math.js:84`
- Constat:
  - Le moteur supporte bien `APP_CONFIG.TRACKING_SUBJECT` et `APP_CONFIG.TRACKING_MODULE`.
  - A date, ces champs ne sont pas declares dans les pages modules (scan repo: aucune occurrence dans `Lovyc/` et `Zyvah/`).
- Impact:
  - Changement de structure de dossiers/URL peut degrader la qualite des donnees tracking.
- Action corrective:
  - Declarer explicitement `TRACKING_SUBJECT` et `TRACKING_MODULE` dans chaque `APP_CONFIG` de module/mission.
  - Conserver le parsing URL uniquement en fallback de secours.
- Test de non-regression:
  - Ajouter une regle validateur: warning/erreur si config tracking explicite absente sur pages mission.
- Statut: `In progress`

### 3) [Mineur] Validation schema notes manuelles
- Portee: `Workflow`
- Fichier: `tools/notes/sync-notes.js`
- Ligne:
  - `tools/notes/sync-notes.js:28`
  - `tools/notes/sync-notes.js:34`
  - `tools/notes/sync-notes.js:57`
- Constat:
  - Validation format date ISO, bornes note, champs requis et unicite id en place.
- Impact:
  - Reduction forte des erreurs de saisie dans `notes_master`/`notes_index`.
- Action corrective:
  - Aucun correctif immediate requis.
- Test de non-regression:
  - Conserver tests d'entrees invalides dans pipeline CI locale.
- Statut: `Closed`

### 4) [Mineur] Test automatise du pipeline notes
- Portee: `Tests`
- Fichier:
  - `tests/validators/notes-pipeline-validator.js`
  - `tests/test-runner.js`
- Ligne:
  - `tests/validators/notes-pipeline-validator.js:4`
  - `tests/test-runner.js:180`
- Constat:
  - Validator dedie present et execute par le runner global.
- Impact:
  - Regressions structurelles detectees avant push/deploy.
- Action corrective:
  - Aucun correctif immediate requis.
- Test de non-regression:
  - Maintenir ce controle dans le gate standard commit/push.
- Statut: `Closed`

## Information (risk acceptance)
- RA-001 maintenu: absence d'ACK applicatif sur sync cloud (`no-cors`) acceptee tant que `docs/governance/RISK_ACCEPTANCE.md` reste actif et revu periodiquement.

## Questions / hypotheses
- Le projet reste en mode familial prive (hypothese conforme a `TRACKING_POLICY.md`).
- Aucun changement backend tracking externe depuis RA-001.

## Controle final
- Workflow Git/hook verifie: Oui (pre-commit + pre-push actifs).
- Tests executes: Oui (`node tests/test-runner.js` -> 59/59).
- Qualite validateurs verifiee: Oui (tracking + notes pipeline + encoding).
- Points accessibilite verifies: Non (hors scope de cet audit data).
- Points securite verifies: Partiel (tracking data uniquement).
- Conformite mineurs verifiee: Partiel (consent proof technique reste ouvert).

## Plan de remediation
- P0 (immediat):
  - Introduire preuve technique de consentement quand IP est active.
  - Definir schema minimal et tests associes.
- P1 (court terme):
  - Declarer `TRACKING_SUBJECT` / `TRACKING_MODULE` dans tous les modules actifs.
  - Ajouter controle automatique de presence config tracking explicite.
- P2 (amelioration continue):
  - Revue RA-001 trimestrielle.
  - Durcir rapport console du test-runner (texte ASCII propre, lisibilite stable).

## Decision
- Conditions de merge/push:
  - Aucun Critique ouvert.
  - P0 planifie avec owner/date.
- Date cible de re-audit: 2026-03-15
