# Workflow Git avec Tests Automatiques

## 🔒 Règle Absolue

**AUCUN commit ne doit être poussé sans que les tests passent à 100%.**

## 📋 Processus Standard

### 1. Créer/Modifier un Module

```bash
# Éditer les drafts
vim docs/modules/lovyc_fr_module_3.md

# Synchroniser HTML
# (manuellement ou via script)
```

### 2. Tester Localement

```bash
# Test complet
npm test

# Ou test spécifique
npm run test:lovyc
node tests/test-runner.js lovyc_fr_module_3
```

### 3. Corriger les Erreurs

Si des tests échouent :
- ❌ **Options dupliquées** → Corriger le draft ET le HTML
- ❌ **Draft/HTML désynchronisés** → Régénérer le HTML depuis le draft
- ❌ **Keywords manquants** → Ajouter aux requirements
- ❌ **Moins de 10 tests Write** → Ajouter des keywords variés

### 4. Commit & Push

```bash
# Une fois TOUS les tests ✅
git add .
git commit -m "feat: Ajout Module 3 Français"

# Le hook pre-commit lance automatiquement les tests
# Si échec → commit bloqué

git push
```

## 🚨 En Cas d'Urgence

Si tu DOIS bypasser les tests (cas exceptionnel) :

```bash
git commit --no-verify -m "fix: hotfix critique"
```

⚠️ **À utiliser UNIQUEMENT pour des urgences** (serveur en panne, bug critique en prod).

## 🔧 Installation Hook Git

```bash
# Copier le hook
cp .git-hooks/pre-commit .git/hooks/pre-commit

# Linux/Mac : Rendre exécutable
chmod +x .git/hooks/pre-commit

# Windows : Utiliser Git Bash
```

## 📊 Quels Tests Sont Lancés ?

1. **Draft Markdown** : Structure, options dupliquées, keywords
2. **HTML** : weekData valide, steps count, answer index
3. **Sync** : Questions, options, réponses identiques entre draft/HTML
4. **Write** : 10+ propositions testées par exercice

## ✅ État Actuel

```bash
# Vérifier l'état global
npm test

# Résultat attendu :
# ✅ Réussis: XX
# ❌ Échoués: 0
# ⚠️ Warnings: Y (tolérés)
```

## 📝 Ajouter un Module au Projet

1. Créer le draft `.md` dans `docs/modules/`
2. Générer les 5 missions HTML
3. **Lancer les tests** : `npm test`
4. Corriger jusqu'à 100% ✅
5. Commit + push

## 🎯 Objectif

**Zéro régression. Zéro bug pédagogique en production.**
