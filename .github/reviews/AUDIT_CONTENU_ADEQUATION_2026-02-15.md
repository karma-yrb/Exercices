# Audit Adequation Contenu - 2026-02-15

## Meta
- Date: 2026-02-15
- Scope: adequation entre notes recoltees, modules livres, thematiques developpees, plan initial
- Perimetre: tous profils et modules actifs (`Lovyc`, `Zyvah`)

## Sources utilisees
- Plan initial: `.github/context/CURRICULUM.md`
- Progression declaree: `.github/context/PROGRESS.md`
- Profils apprenants: `.github/context/profils.md`
- Drafts modules: `docs/modules/*.md`
- Contenus publies: `Lovyc/**/Module_*/mission_*.html`, `Zyvah/**/Module_*/mission_*.html`
- Notes recoltees: `local_library/reports/notes_master.json`, `local_library/reports/notes_overrides.json`
- Diagnostic cible disponible: `local_library/reports/zyvah_ses_corrections_diagnostic.md`
- Qualite technique: `node tests/test-runner.js` -> 59/59 OK

## Etat des lieux (contenu reel publie)

### Lovyc (Fr)
- Modules actifs: `Module_0`, `Module_1`, `Module_2`
- Missions publiees: 11 (1 + 5 + 5)
- Themes couverts:
  - fondamentaux ecriture (M0)
  - structure de phrase, accords, homophones, ponctuation de base (M1)
  - ponctuation avancee, dialogue/incise, intensite, precision (M2)

### Zyvah (Maths)
- Modules actifs: `Module_0`, `Module_1`, `Module_2`
- Seances publiees: 7 (1 + 1 + 5) + 2 checkpoints
- Themes couverts:
  - regles de calcul + priorites operatoires
  - calcul litteral complet (developper, identites remarquables, factoriser, equations)

### Zyvah (SES)
- Modules actifs: `Module_0`, `Module_1`
- Seances publiees: 6 (1 + 5)
- Themes couverts:
  - initiation SES
  - offre/demande, couts/profit, socialisation, image d'entreprise, synthese

## Lecture des notes recoltees

### Zyvah Maths
- 8 notes scorees, moyenne: **0.81/20**
- Derniere note: 2026-02-04, theme "Inequations produits, quotient", score 0/20
- Themes faibles recents: inequations, taux d'evolutions, fonctions, ensembles/intervalles

### Zyvah SES
- 5 notes, 3 scorees, moyenne: **6.99/20**
- Derniere entree: 2026-01-14 "Non rendu" (pas de score)
- Diagnostic cible disponible: faiblesse sur `VA/PIB`, `nominal/reel`, methodes de calcul

### Lovyc Francais
- 2 notes scorees, moyenne: **7/20**
- Tendance recente meilleure: 14/20 (2026-01-15)
- Point faible identifie: recitation expressive (0/20) non traitee explicitement dans les modules actuels

## Adequation plan initial vs realise

### Zyvah (plan 8 semaines Maths/SES)
- Couverture estimee: **5/8 semaines**
- Couverts:
  - S1 priorites de calcul (ok)
  - S4 SES budget/couts (partiel via SES M1)
  - S6 offre/demande (ok)
  - S7 calcul litteral (ok)
  - S8 entreprise (ok)
- Non couverts:
  - S2 fractions/partage
  - S3 puissances/multiplicateurs
  - S5 pythagore

### Lovyc (plan 8 semaines Francais)
- Couverture estimee: **Mois 1 partiel fort, Mois 2 non demarre**
- Couverts:
  - S1 structure syntaxique (ok)
  - S2 ponctuation expressive (ok)
  - S4 orthographe grammaticale accords/homophones (ok)
- Partiel:
  - S8 synthese (present en boss finaux mais sans bloc argumentatif complet)
- Non couverts:
  - S3 lexique/registres
  - S5 coordination/subordination
  - S6 conjugaison du recit
  - S7 argumentation

## Findings (efficacite pedagogique)

### 1) [Majeur] Decalage fort entre notes Zyvah Maths et sequence de modules
- Constat:
  - Les notes faibles les plus recentes portent sur inequations/taux/fonctions, non cibles par les modules publies.
  - Le parcours est passe rapidement a un bloc lourd de calcul litteral (M2, 75 ecrans).
- Impact:
  - Risque de progression fragile (pre-requis non consolides sur themes notes en echec).
- Action:
  - Inserer un module de remediation cible avant extension du parcours.

### 2) [Majeur] Zyvah SES: contenu publie partiellement aligne avec diagnostic corrections
- Constat:
  - Le diagnostic cible releve des lacunes `VA/PIB`, `nominal/reel`, taux.
  - Le module SES actuel couvre surtout marche/profit/socialisation/image.
- Impact:
  - Les erreurs observees risquent de persister.
- Action:
  - Construire un module SES suivant focalise sur `VA/PIB` + `nominal/reel` + mini-cas calcules.

### 3) [Majeur] Lovyc: progression arretee avant les objectifs du Mois 2
- Constat:
  - Modules 1-2 couvrent bien bases + ponctuation, mais pas phrase complexe/argumentation.
- Impact:
  - Objectif final "convaincre" du plan initial non atteint.
- Action:
  - Prioriser 2 modules: phrase complexe (M3) puis argumentation/synthese (M4).

### 4) [Mineur] Base de notes heterogene et peu dense pour Lovyc
- Constat:
  - Seulement 2 notes structurees.
- Impact:
  - Calibration fine difficile (risque de sur/sous-difficulte).
- Action:
  - Ajouter un diagnostic corrections detaille Lovyc (meme format que SES Zyvah).

### 5) [Mineur] Cohesion documentaire perfectible
- Constat:
  - `PROGRESS.md` contient des statuts non alignes avec l'existant publie.
  - `CTP_REVIEW_Zyvah_Maths_Modules_1_2.md` reference un fichier retire (`docs/modules/zyvah_maths_module_1_v2.md`).
- Impact:
  - Perte de lisibilite pour le pilotage.
- Action:
  - Mettre a jour references et statuts de progression.

## Ce qui peut etre modifie pour etre plus efficace

### P0 (immediat, fort ROI)
1. `Zyvah Maths Module_3` "Remediation prerequis" (inequations 1er degre, taux, fonctions, intervalles), en 5 seances courtes.
2. `Zyvah SES Module_2` aligne sur diagnostic corrections: `VA`, `PIB`, nominal/reel, calculs guides.
3. `Lovyc Francais Module_3` phrase complexe: coordination/subordination + connecteurs.
4. Mettre a jour `PROGRESS.md` et liens de revue pour supprimer les incoherences de pilotage.

### P1 (court terme)
1. `Lovyc Francais Module_4` argumentation + compte-rendu structure (objectif Mois 2).
2. Ajouter `local_library/reports/lovyc_fr_corrections_diagnostic.md` (format standard).
3. Standardiser un mini "pretest 5 ecrans" en debut de chaque nouveau module.

### P2 (amelioration continue)
1. Appliquer la grille du playbook (`local_library/reports/remediation_playbook.md`) automatiquement a chaque nouvelle note.
2. Ajouter KPI de sortie de module (score boss final + temps + erreurs dominantes) dans le suivi.
3. Revue mensuelle adequation plan/notes/modules avec un rapport dedie.

## Decision
- Verdict adequation globale: `GO_WITH_GAPS`
- Priorite execution: fermer P0 avant de lancer de nouveaux modules hors perimetre cible.
