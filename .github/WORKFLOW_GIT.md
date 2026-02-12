# Workflow Git avec tests + push automatiques

## Regle absolue

Aucun changement ne part en remote sans validation automatique des tests.

## Ce que fait `git commit` dans ce projet

1. Hook `pre-commit` : lance `node tests/test-runner.js`.
2. Si les tests echouent : commit bloque.
3. Si les tests passent : commit cree.
4. Hook `post-commit` : lance `git push` automatiquement.

Donc, dans ce repo, `git commit` = tests + commit + push (sauf exception explicite).
Le deploiement Pages est ensuite conditionne par la CI GitHub (`Tests` obligatoires).

## Processus standard

### 1) Modifier

- Modifier d'abord les drafts `docs/modules/*.md` (source de verite).
- Synchroniser ensuite les HTML.
- Si changement important (release, refonte, migration), lancer un audit global via `AUDITEUR_QUALITE_PEDAGO_TECH.md` en suivant `.github/AUDIT_REFERENTIEL.md`.

### 2) Verifier localement (recommande)

```bash
# Commande recommandee (compatible PowerShell)
node tests/test-runner.js

# Option npm (si npm.ps1 n'est pas bloque)
npm test

# En cas de blocage ExecutionPolicy PowerShell
npm.cmd test
# ou
node tests/test-runner.js <module>
```

### 2.b) Verifier qualite (recommande sur release)

- Produire un rapport d'audit global avec severites `Critique/Majeur/Mineur`.
- Gate release: aucun `Critique` ouvert avant commit/push final.
- Gate CI/CD: le workflow `.github/workflows/static.yml` execute `Tests` avant `Deploy Pages`.

### 3) Commit

```bash
git add .
git commit -m "feat: ..."
```

Le commit declenche automatiquement les hooks:
- pre-commit (tests)
- post-commit (push)

## Cas particuliers

### Bypass test urgent

```bash
git commit --no-verify -m "fix: hotfix critique"
```

Attention: `--no-verify` saute le pre-commit local, mais la CI reste bloquante pour le deploiement.
Ne pas utiliser `--no-verify` pour une release.

### Desactiver temporairement le push auto

```bash
SKIP_AUTO_PUSH=1 git commit -m "chore: commit local sans push"
```

Ensuite push manuel:

```bash
git push
```

## Installation hooks

```bash
# Linux/Mac
cp .git-hooks/pre-commit .git/hooks/pre-commit
cp .git-hooks/post-commit .git/hooks/post-commit
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/post-commit

# Windows (Git Bash)
cp .git-hooks/pre-commit .git/hooks/pre-commit
cp .git-hooks/post-commit .git/hooks/post-commit
```

## Tests lances

1. Draft Markdown
2. HTML
3. Sync Draft <-> HTML
4. Reponses write (10+ propositions)
5. Chemins de navigation

## Objectif

Zero regression. Zero bug pedagogique en production.
Zero derive de qualite (pedagogie, validation, accessibilite, securite).

## Protection branche (GitHub)

Configurer la protection de `main` pour imposer le status check `Tests` avant merge/push.
