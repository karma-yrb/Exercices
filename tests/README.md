# Tests Automatises - Modules Pedagogiques

## Objectif
Valider automatiquement la qualite des modules avant deploiement pour eviter les bugs pedagogiques.

## Requis avant commit

Tous les modules doivent passer les tests avant commit.

```bash
# Commande recommandee (compatible PowerShell)
node tests/test-runner.js

# Option npm (si npm.ps1 n'est pas bloque)
npm test
```

Si `npm test` est bloque par la policy PowerShell, utiliser:

```bash
npm.cmd test
# ou
node tests/test-runner.js
```

### Installation du hook Git (recommande)

```bash
# Copier le hook pre-commit
cp .git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Les tests se lancent automatiquement avant chaque commit
```

## Lancer les tests

```bash
# Tous les modules
node tests/test-runner.js

# Un module specifique
node tests/test-runner.js lovyc_fr_module_1
```

## Ce qui est teste

### 1. Validation Markdown (drafts)
- Structure complete (15 ecrans par mission par defaut)
- Support `Missions:` et `ScreensPerMission:` dans la section Meta
- Pas d'options dupliquees dans les MCQ
- Keywords presents dans les `write`/`challenge`
- Format coherent (titre, question, feedback)

### 2. Validation HTML (fichiers missions)
- Synchronisation avec le draft
- Tableau `weekData` valide (15 steps par defaut)
- Support `expectedSteps` dans `weekData`
- Pas d'options identiques dans `interactive`
- Reponses (`answer`) dans la plage valide

### 3. Synchronisation Draft <-> HTML (contenu)
- Questions identiques entre draft et HTML
- Options MCQ identiques (ordre, contenu)
- Bonne reponse coherente avec les options du draft
- Titres et types synchronises

### 4. Tests reponses Write (validation)
- 10+ propositions testees par exercice write/challenge
- Variantes de casse, ponctuation, ordre des mots
- Reponses valides (avec keywords) acceptees
- Reponses invalides (sans keywords) rejetees
- Verification mode `verb` vs `sentence`

### 5. Validation des chemins de navigation
- Bloque tout lien vers `../Exercices/`

## Format du rapport

```text
=== LOVYC FR MODULE 1 ===
OK Mission 1 : 15 ecrans OK
KO Mission 2 : Ecran 9 - Options dupliquees dans interactive
...

RESULTAT : 2 erreurs, 1 warning
```

## Ajouter un test custom

Editer `validators/custom-rules.js` et ajouter une regle:

```javascript
rules.push({
  name: "Verifier XXX",
  test: (step) => step.question.includes("interdit"),
  error: "Mot interdit detecte"
});
```
