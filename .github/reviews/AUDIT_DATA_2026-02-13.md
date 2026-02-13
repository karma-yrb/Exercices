# Audit Donnees & Exploitation - 2026-02-13

## Portee
- Pipeline notes locales (saisie manuelle)
- Tracking runtime (payload cloud, identifiants, consentement)
- Couverture de verification/tests liees aux donnees

## Resultat global
- **Statut**: Risque **Majeur** (pas de blocage critique immediate, mais plusieurs risques de derive donnees)
- **Tests modules**: `node tests/test-runner.js` -> 57/57 OK

## Findings

### Majeur 1 - Consentement non enforce cote code
- **Constat**: la policy exige un consentement avant IP tracking, mais le code n'applique qu'un flag technique.
- **Evidence**:
  - `docs/governance/TRACKING_POLICY.md:36` (consentement requis)
  - `assets/shared/engine.js:742` (`TRACKING_INCLUDE_IP === true`)
  - `assets/shared/engine_math.js:909` (`TRACKING_INCLUDE_IP === true`)
- **Impact**: l'activation du flag suffit a envoyer l'IP sans trace explicite de consentement capture.
- **Action**: ajouter une preuve de consentement locale (timestamp + acteur) avant d'autoriser l'IP.

### Majeur 2 - Qualite de donnees tracking dependante du path URL
- **Constat**: `subject` et `module` sont derives du chemin URL.
- **Evidence**:
  - `assets/shared/engine.js:719`
  - `assets/shared/engine.js:724`
  - `assets/shared/engine_math.js:889`
  - `assets/shared/engine_math.js:893`
- **Impact**: changement de structure dossier => metadata fausse en base (matiere/module).
- **Action**: alimenter `subject`/`module` depuis `APP_CONFIG` explicite, fallback URL seulement en secours.

### Information - Sync cloud (risque accepte)
- **Constat**: envoi tracking en `no-cors`, sans ACK applicatif.
- **Statut audit**: non reporte en finding actif (RA-001).
- **Reference**: `docs/governance/RISK_ACCEPTANCE.md`.

### Mineur 1 - Pipeline notes sans validation de schema
- **Constat**: le script notes ne valide pas le format date ni la coherence des notes.
- **Evidence**:
  - `tools/notes/sync-notes.js:31`
  - `tools/notes/sync-notes.js:39`
- **Impact**: erreurs de saisie (date invalide, note incoherente) propagent directement dans `notes_master`.
- **Action**: ajouter des controles (date ISO, note >= 0, normalisation /20), et bloquer les entrees invalides.

### Mineur 2 - Pas de test automatise du pipeline notes
- **Constat**: les tests existants couvrent modules/tracking policy, pas le pipeline notes manuel.
- **Evidence**:
  - `tests/test-runner.js` (pas de suite dediee `tools/notes`)
- **Impact**: regressions possibles sur structure `notes_master`/`notes_index` sans alerte CI.
- **Action**: ajouter un validator `notes-pipeline-validator.js` (schema + tri date desc + champs obligatoires).

## Recommandations prioritaires
1. Enforcer consentement IP (proof flag + horodatage) avant envoi.
2. Migrer `subject/module` vers des champs config explicites (plus URL parsing fragile).
3. Ajouter ACK/retry pour sync cloud (sortir de `no-cors`).
4. Valider schema notes manuelles + tests automatiques dedies.
