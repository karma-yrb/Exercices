# Referentiel Audit Qualite Pedago-Tech (Global Projet)

Ce referentiel definit les controles a appliquer sur l'ensemble du projet.

## 1) Objectif
- Eviter les derives de qualite dans le temps.
- Detecter les risques transverses avant qu'ils deviennent structurels.
- Maintenir la coherence entre pedagogie, technique, workflow et conformite.

## 2) Axes d'audit global

### A. Gouvernance et coherence documentaire
- Alignement entre pratiques reelles et docs (`WORKFLOW_GIT`, instructions, agents).
- Roles d'agents complementaires et non contradictoires.
- Sources de verite identifiees et appliquees.

### B. Architecture et dette technique
- Structure du repo comprehensible et maintenable.
- Reutilisation correcte des moteurs/styles partages.
- Identification et suivi de dette technique.

### C. Workflow et qualite de delivery
- Hooks/tests executes selon workflow.
- Gate de qualite applique avant release.
- Absence de bypass non documente.

### D. Qualite des tests et validateurs
- Couverture des chemins critiques:
  - sync draft/html,
  - validations write/challenge,
  - navigation.
- Seuil de robustesse suffisant contre reponses triviales.

### E. Securite applicative
- Validation des entrees et sanitation.
- Absence de vecteurs d'injection evidents.
- Surface d'attaque reduite (zero dependance non necessaire).

### F. Accessibilite et UX
- Criteres WCAG/RGAA sur parcours essentiels.
- Lisibilite, contrastes, ergonomie tactile, navigation clavier.

### G. Donnees et conformite mineurs
- Minimisation des donnees.
- Limitation de retention.
- Transparence des traitements.

### H. Pedagogie (volet metier)
- Alignement curriculum/profils/progress.
- Cohesion draft/html/feedback.
- Niveau d'exigence adapte (notamment en Francais).

## 3) Grille de severite
- `Critique`: risque systemique, blocage release, non-conformite forte.
- `Majeur`: ecart significatif impactant qualite ou fiabilite.
- `Mineur`: amelioration necessaire mais non bloquante.

## 4) Cadence recommandee
- Hebdomadaire: audit rapide des changements recents.
- Mensuel: audit complet global.
- Avant release majeure: audit de gate.

## 5) Sources externes de reference
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Input Validation Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- RGAA: https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/
- NIST SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- FTC COPPA: https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy
- CNIL (mineurs): https://www.cnil.fr/fr/enfants-et-ecrans-les-recommandations-de-la-cnil-pour-les-proteger

## 6) Regle de priorisation
- En cas de conflit: securite apprenant + conformite + coherence pedagogique priment.

## 7) Regles d'exception (risk acceptance)
- Un risque documente dans `docs/governance/RISK_ACCEPTANCE.md` n'est pas reporte comme finding actif tant que:
  - la decision est datee,
  - un owner est defini,
  - une cadence de revue est explicite.
