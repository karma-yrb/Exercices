# Rapport Audit Global Projet

## Meta
- Date: 2026-02-11
- Auditeur: Auditeur Qualite Pedago-Tech
- Scope: Global repo (workflow, tests, securite, conformite, pedagogie)
- Version/commit: working tree local

## Verdict global
- Statut: NO_GO
- Risque global: Eleve

## Synthese executif
- Points forts: suite de tests metier OK (56/56), hooks pre/post-commit presents localement.
- Risques prioritaires: gate de release contournable + manque de versioning des documents de gouvernance + collecte IP mineurs sans cadre explicite.
- Decision de gate: bloquer release tant que les Critiques restent ouverts.

## Findings (ordonnes par severite)

### 1) [Critique] Gate release contournable (push/deploiement possible sans tests valides)
- Portee: Workflow
- Fichier: `.github/WORKFLOW_GIT.md:53`
- Ligne: 53
- Constat: `git commit --no-verify` est explicitement autorise et `post-commit` pousse quand meme (`.github/WORKFLOW_GIT.md:56`, `.git-hooks/post-commit:21`, `.git-hooks/post-commit:23`). En parallele, le workflow Pages deploye sur push main sans job de tests (`.github/workflows/static.yml:6`, `.github/workflows/static.yml:37`, `.github/workflows/static.yml:40`).
- Impact: un commit non verifie peut etre pousse puis deploye, avec risque de regression en prod.
- Action corrective: ajouter un job CI tests obligatoire avant deploy; imposer branch protection; supprimer/encadrer le bypass `--no-verify` pour release.
- Test de non-regression: simuler commit `--no-verify` en branche de test et verifier blocage merge/deploy sans statut CI vert.
- Statut: Open

### 2) [Majeur] Documentation de gouvernance critique non versionnee
- Portee: Global
- Fichier: `.gitignore:1`
- Ligne: 1
- Constat: `.github/agents/`, `.github/copilot-instructions.md`, `.github/context/` sont ignores (`.gitignore:1-3`). Seul `.github/WORKFLOW_GIT.md` est versionne dans cet espace.
- Impact: perte de reproductibilite des regles, difficultes d'onboarding, audits non reproductibles entre machines.
- Action corrective: versionner une version sanitisee des instructions/contextes ou des templates publics; separer les donnees sensibles dans un dossier local dedie.
- Test de non-regression: cloner le repo vierge et verifier que les regles audit/agents/contextes minimum sont disponibles sans copie manuelle.
- Statut: Open

### 3) [Majeur] Collecte et export IP + identite enfant sans garde-fou explicite
- Portee: Securite
- Fichier: `assets/shared/engine.js:718`
- Ligne: 718
- Constat: recuperation IP via ipify puis envoi a Google Apps Script avec champ enfant/module/date (`assets/shared/engine.js:725`, `assets/shared/engine.js:737`, `assets/shared/engine.js:741`; idem `assets/shared/engine_math.js:813`, `assets/shared/engine_math.js:820`, `assets/shared/engine_math.js:832`, `assets/shared/engine_math.js:836`) sans trace de mecanisme de consentement/opt-out documente.
- Impact: risque conformite mineurs (CNIL/COPPA), risque legal et reput.
- Action corrective: ajouter flag de tracking off par defaut, consentement explicite, minimisation/anonymisation (hash IP), politique retention et documentation.
- Test de non-regression: verifier qu'en mode par defaut aucune IP/identite n'est envoyee; en mode opt-in, tracer et journaliser le consentement.
- Statut: Open

### 4) [Majeur] Usage de `eval` dans les validateurs de tests
- Portee: Tests
- Fichier: `tests/validators/html-validator.js:57`
- Ligne: 57
- Constat: `eval` execute du code extrait des HTML/drafts (`tests/validators/sync-validator.js:105`).
- Impact: execution arbitraire potentielle pendant les tests si contenu malveillant est introduit.
- Action corrective: remplacer `eval` par parsing structurel controle (parser JS/AST ou `vm` sandbox strict avec timeout/context bloque).
- Test de non-regression: injecter payload malveillant de test et verifier qu'il est rejete sans execution.
- Statut: Open

### 5) [Mineur] Incoherence operatoire `npm test` sous PowerShell verrouille
- Portee: Workflow
- Fichier: `tests/README.md:12`
- Ligne: 12
- Constat: la doc pousse `npm test` (`tests/README.md:12`, `.github/WORKFLOW_GIT.md:27`) mais l'environnement courant bloque `npm.ps1` (ExecutionPolicy), alors que `node tests/test-runner.js` fonctionne.
- Impact: friction onboarding Windows, faux signal d'echec outillage.
- Action corrective: documenter commande de secours `node tests/test-runner.js` en priorite et ajouter note Windows (`npm.cmd` ou policy scope process).
- Test de non-regression: verifier commandes sur shell Windows standard + Git Bash.
- Statut: Open

## Questions / hypotheses
- L'ignorance de `.github/context/` et `.github/agents/` est-elle volontaire pour garder ces contenus strictement locaux/sensibles ?
- Le tracking IP est-il contractuellement valide (base legale, information parentale, retention) ?

## Controle final
- Workflow Git/hook verifie: Oui (pre/post-commit presents localement)
- Tests executes: Oui (`node tests/test-runner.js`)
- Qualite validateurs verifiee: Partielle (risque `eval`)
- Points accessibilite verifies: Partiel (check structurel, pas d'audit WCAG outille ici)
- Points securite verifies: Partiel (risques identifies)
- Conformite mineurs verifiee: Non (elements manquants detectes)

## Plan de remediation
- P0 (immediat): fermer Finding 1 (gate release) + cadrer Finding 3 (donnees mineurs).
- P1 (court terme): traiter Finding 2 (versioning gouvernance) + Finding 4 (`eval`).
- P2 (amelioration continue): harmoniser outillage Windows/docs (Finding 5).

## Decision
- Conditions de merge/push: aucun Critique ouvert; plan valide pour les Majeurs en cours.
- Date cible de re-audit: apres correction P0/P1.
