# Rapport Re-audit Global Projet

## Meta
- Date: 2026-02-12
- Auditeur: Auditeur Qualite Pedago-Tech
- Scope: Global repo (workflow, tests, securite, conformite, pedagogie)
- Version/commit: `2801749` (origin/main)

## Verdict global
- Statut: GO_WITH_RISK
- Risque global: Modere

## Synthese executif
- Progression nette: P1 technique ferme (gouvernance versionnee + suppression de eval), policy tracking versionnee, et suite de tests 57/57 OK.
- Risques prioritaires restants: bypass possible des checks sur `main` par acteur privilegie.
- Decision de gate: autoriser iteration, mais ne pas considerer la gouvernance totalement stabilisee tant que P0 restants ne sont pas fermes.

## Findings (ordonnes par severite)

### 1) [Majeur] Gate release encore contournable par compte privilegie
- Portee: Workflow
- Fichier: `.github/workflows/static.yml:39`, `.github/workflows/static.yml:44`, `.github/WORKFLOW_GIT.md:100`
- Ligne: 39, 44, 100
- Constat: la CI impose bien `tests -> deploy`, mais un push vers `main` a ete accepte avec message serveur "Bypassed rule violations ... Required status check Tests is in progress".
- Impact: possibilite de publier sur `main` avant validation finale des checks si bypass autorise.
- Action corrective: dans Branch protection/ruleset, interdire bypass admin/roles, exiger status check `Tests` pour merge/push, preferer merge PR + auto-merge.
- Test de non-regression: tenter un push direct sur `main` avec checks in-progress et verifier rejet automatique.
- Statut: Open

### 2) [Closed] Cadrage tracking formalise (policy + tests de non-regression)
- Portee: Securite
- Fichier: `assets/shared/engine.js`, `assets/shared/engine_math.js`, `docs/governance/TRACKING_POLICY.md`, `tests/validators/tracking-policy-validator.js`
- Ligne: n/a
- Constat: IP reste strictement opt-in (`TRACKING_INCLUDE_IP === true`), policy versionnee ajoutee, et controle automatique dans le test runner.
- Impact: reduction forte du risque de derive de tracking.
- Action corrective: maintenir policy + validator synchronises a chaque evolution du payload.
- Test de non-regression: le runner valide l'absence d'IP en dur, la presence des champs `actor_id/device_id/session_id`, et la regle opt-in IP.
- Statut: Closed

### 3) [Closed] Gouvernance minimale maintenant versionnee
- Portee: Global
- Fichier: `README.md:26`, `docs/governance/README.md:3`, `docs/governance/AGENTS_BASELINE.md:14`, `docs/governance/CONTEXT_BASELINE.md:15`
- Ligne: 26, 3, 14, 15
- Constat: baseline publique ajoutee (`docs/governance/*`) avec role auditeur global + severity model + gate "no open Critique".
- Impact: reproductibilite d'audit et onboarding ameliorees meme sans `.github/context` prive.
- Action corrective: maintenir cette baseline synchronisee avec les pratiques reelles.
- Test de non-regression: clone propre du repo puis verification presence baseline governance.
- Statut: Closed

### 4) [Closed] Suppression de `eval` dans validateurs
- Portee: Tests
- Fichier: `tests/validators/weekdata-parser.js:11`, `tests/validators/weekdata-parser.js:13`, `tests/validators/html-validator.js:46`, `tests/validators/sync-validator.js:33`
- Ligne: 11, 13, 46, 33
- Constat: parsing migre vers `vm.Script(...).runInContext(..., { timeout: 100 })` via helper partage; plus d'usage `eval`.
- Impact: reduction du risque d'execution arbitraire pendant tests.
- Action corrective: conserver parser partage unique et garder timeout/context stricts.
- Test de non-regression: injecter un literal malforme/malveillant et verifier rejet sans execution.
- Statut: Closed

### 5) [Closed] Friction Windows doc tests corrigee
- Portee: Workflow
- Fichier: `tests/README.md`, `.github/WORKFLOW_GIT.md`
- Ligne: n/a
- Constat: la documentation met maintenant `node tests/test-runner.js` en commande recommandee, avec note explicite PowerShell (`npm.cmd test`).
- Impact: confusion ponctuelle en environnement verrouille.
- Action corrective: maintenir cette priorite dans toute nouvelle documentation de test.
- Test de non-regression: verification sur PowerShell standard + Git Bash.
- Statut: Closed

## Controle final
- Workflow Git/hook verifie: Oui
- Tests executes: Oui (`node tests/test-runner.js` le 2026-02-12, 57/57)
- Qualite validateurs verifiee: Oui (parser sandbox)
- Points accessibilite verifies: Partiel (pas d'audit WCAG outille ici)
- Points securite verifies: Oui (tracking policy + tests automatises)
- Conformite mineurs verifiee: Partielle (reste le cadre legal/operationnel selon contexte d'usage)

## Plan de remediation
- P0 (immediat):
  - Fermer Finding 1 (branch protection anti-bypass effective).
- P1 (court terme):
  - Maintenir baseline gouvernance et verifier a chaque re-audit (Finding 3 deja ferme).
  - Maintenir parser securise et ajouter test malveillant dedie (Finding 4 ferme + hardening).
- P2 (amelioration continue):
  - Surveiller la coherence docs/tests lors des prochaines evolutions.

## Etat P0/P1/P2 (resume)
- P0: Partiellement ferme (gate bypass: Open)
- P1: Ferme (gouvernance + eval)
- P2: Ferme (harmonisation docs Windows/tests effectuee)

## Decision
- Conditions de merge/push: aucun Critique ouvert (ok), mais exiger cloture P0 avant phase "release stabilisee".
- Date cible de re-audit: apres cloture gate anti-bypass (proposition: 2026-02-19).
