# Tests Automatisés - Modules Pédagogiques

## 🎯 Objectif
Valider automatiquement la qualité des modules **avant** déploiement pour éviter les bugs pédagogiques.

## ⚠️ REQUIS AVANT COMMIT

**TOUS les modules DOIVENT passer les tests avant d'être committés.**

```bash
# Avant chaque commit
npm test

# Si des erreurs : corriger puis re-tester
# Recommit seulement quand tous les tests passent ✅
```

### Installation du Hook Git (Recommandé)

```bash
# Copier le hook pre-commit
cp .git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Désormais, les tests se lancent automatiquement avant chaque commit
```

## 🚀 Lancer les Tests

```bash
node tests/test-runner.js
```

Ou pour un module spécifique :
```bash
node tests/test-runner.js lovyc_fr_module_1
```

## 🔍 Ce qui est Testé

### 1. **Validation Markdown** (drafts)
- Structure complète (par défaut 15 écrans par mission)
- Support `Missions:` et `ScreensPerMission:` dans la section Meta
- Pas d'options dupliquées dans les MCQ
- Keywords présents dans les `write`/`challenge`
- Format cohérent (titre, question, feedback)

### 2. **Validation HTML** (fichiers missions)
- Synchronisation avec le draft
- Tableau `weekData` valide (par défaut 15 steps)
- Support `expectedSteps` dans `weekData`
- Pas d'options identiques dans `interactive`
- Réponses (`answer`) dans la plage valide

### 3. **Synchronisation Draft ↔ HTML** (contenu)
- **Questions identiques** entre draft et HTML
- **Options MCQ identiques** (ordre, contenu)
- **Bonne réponse cohérente** avec les options du draft
- Titres et types synchronisés

### 4. **Tests Réponses Write** (validation)
- **10+ propositions testées** par exercice write/challenge
- Variantes de casse, ponctuation, ordre des mots
- Réponses valides (avec keywords) acceptées
- Réponses invalides (sans keywords) rejetées
- Vérification mode `verb` vs `sentence`

### 5. **Validation des chemins de navigation**
- Bloque tout lien vers `../Exercices/`

## 📊 Format du Rapport

```
=== LOVYC FR MODULE 1 ===
✅ Mission 1 : 15 écrans OK
❌ Mission 2 : Écran 9 - Options dupliquées dans interactive
✅ Mission 3 : 15 écrans OK
...

RÉSULTAT : 2 erreurs, 1 warning
```

## 🛠️ Ajouter un Test Custom

Éditer `validators/custom-rules.js` et ajouter une règle :

```javascript
rules.push({
  name: "Vérifier XXX",
  test: (step) => step.question.includes("interdit"),
  error: "Mot interdit détecté"
});
```
