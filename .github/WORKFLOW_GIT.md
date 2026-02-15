# Workflow Git avec tests + push automatiques

## Regle absolue

Aucun changement ne part en remote sans validation automatique des tests.

## Expression declencheuse du workflow

- Expression utilisateur: `je valide`
- Commande technique executee: `git commit`
- Expression utilisateur: `lance resume`
- Commande technique executee: `npm run resume`

## Ce que fait `je valide` dans ce projet

1. Hook `pre-commit` : lance `node tests/test-runner.js`.
2. Si les tests echouent : commit bloque.
3. Si les tests passent : commit cree.
4. Hook `post-commit` : lance `git push` automatiquement.
5. Hook `pre-push` : relance `node tests/test-runner.js` (gate final).

Donc, dans ce repo, `je valide` (alias workflow de `git commit`) = tests + commit + push, et le push est lui aussi bloque si les tests ne passent pas.
Le deploiement Pages est ensuite conditionne par la CI GitHub (`Tests` obligatoires).

## Ce que fait `lance resume` dans ce projet

1. Execute `node tools/workflow/lance-resume.js`.
2. Genere automatiquement un handoff dans `.github/context/handoffs/`.
3. Produit aussi une copie stable: `.github/context/handoffs/LAST_HANDOFF.md`.
4. Le handoff contient:
   - contexte de travail (branche, HEAD, resume),
   - etat du depot (dirty/clean, fichiers modifies, commits a pousser),
   - derniers commits,
   - actions tests/release a faire.
5. Variante avec tests executes: `npm run resume:tests`.

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

### 3) Validation

Expression attendue: `je valide`

Commande executee:

```bash
git add .
git commit -m "feat: ..."
```

Le commit declenche automatiquement les hooks:
- pre-commit (tests)
- post-commit (push)
- pre-push (tests)

### 4) Changement de conversation (handoff)

Expression attendue: `lance resume`

Commande executee:

```bash
npm run resume
```

Option avec execution des tests:

```bash
npm run resume:tests
```

Ensuite ouvrir un nouveau chat en joignant `./.github/context/handoffs/LAST_HANDOFF.md`.

## Cas particuliers

### Bypass commit local (deconseille)

```bash
git commit --no-verify -m "fix: hotfix critique"
```

Attention: `--no-verify` saute seulement le pre-commit.
Le `pre-push` reste actif et bloquera quand meme le push si les tests echouent.
Ne pas utiliser `--no-verify` pour une release.

### Desactiver temporairement le push auto

```bash
SKIP_AUTO_PUSH=1 git commit -m "chore: commit local sans push"
```

Ensuite push manuel:

```bash
git push
```

### Desactiver exceptionnellement les tests au push (deconseille)

```bash
SKIP_PUSH_TESTS=1 git push
```

## Installation hooks

```bash
# Linux/Mac
cp .git-hooks/pre-commit .git/hooks/pre-commit
cp .git-hooks/post-commit .git/hooks/post-commit
cp .git-hooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/post-commit
chmod +x .git/hooks/pre-push

# Windows (Git Bash)
cp .git-hooks/pre-commit .git/hooks/pre-commit
cp .git-hooks/post-commit .git/hooks/post-commit
cp .git-hooks/pre-push .git/hooks/pre-push
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

## Protection branche (GitHub) pour ce flux direct

Pour garder le flux simple `commit -> tests -> push` en direct sur `main`:
- ne pas imposer `Require status checks to pass before merging/pushing` sur `main`.
- laisser la CI `Tests` active pour verifier/apres push et pour le deploiement Pages.

Sinon GitHub affichera `Bypassed rule violations ... Required status check "Tests" is expected`, car cette regle est incompatible avec un push direct valide localement.
