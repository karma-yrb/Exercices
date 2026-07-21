# Risk Acceptance Register

## RA-001 - Sync Cloud delivery acknowledgement
- **Date**: 2026-02-13
- **Scope**: tracking sync vers service externe (Google Apps Script)
- **Decision**: risque accepte par le proprietaire du projet
- **Rationale**: service opere et supervise en environnement familial prive; verification externe hors perimetre repository
- **Audit rule**: ne pas ouvrir de finding sur l'absence d'ACK applicatif du sync cloud tant que RA-001 est actif
- **Owner**: Proprietaire du projet
- **Review cadence**: trimestrielle ou en cas de changement de backend

## RA-002 - Afro-Pop Math Tour en legacy isole
- **Date**: 2026-07-21
- **Scope**: `Zyvah/Afro-Pop_Math_Tour/` (P1–P4 HTML standalone)
- **Decision**: conserver en legacy hors pipeline ; ne pas integrer (draft / moteur / hubs / tests)
- **Rationale**: parcours orphelin (aucun lien hub), format hors norme, cout d'integration disproportionne vs usage courant ; le parcours Maths standard reste la voie officielle
- **Audit rule**: ne pas ouvrir de finding Critique/Majeur sur l'absence de draft, sync, moteurs ou tests pour ce dossier tant que RA-002 est actif
- **Owner**: Proprietaire du projet
- **Review cadence**: semestrielle, ou si reintegration / archivage decide
- **Voir aussi**: `Zyvah/Afro-Pop_Math_Tour/README.md`

## RA-003 - Push direct sur main (solo) sans required status checks pre-push
- **Date**: 2026-07-21
- **Scope**: protection branche `main` + workflow `lance pub` (commit/push direct)
- **Decision**: conserver l'option A — push direct sur `main` apres tests locaux ; ne pas imposer `Require status checks to pass` ni `enforce_admins` pour ce flux
- **Rationale**: projet en solo ; les hooks locaux (`pre-commit` / `pre-push`) + le job CI `Tests` avant `Deploy Pages` suffisent ; les required checks GitHub avant push sont incompatibles avec le flux direct documente dans `.github/WORKFLOW_GIT.md`
- **Audit rule**: ne pas ouvrir de finding Critique/Majeur sur l'absence de required status checks / enforce_admins sur `main` tant que RA-003 est actif et que le deploy Pages reste conditionne par `Tests`
- **Owner**: Proprietaire du projet
- **Review cadence**: si passage a un travail a plusieurs, ou changement du workflow Git
- **Voir aussi**: `.github/WORKFLOW_GIT.md` (section Protection branche)
