# Workflow Git avec tests + push automatiques

## Regle absolue

Aucun changement ne part en remote sans validation automatique des tests.

## Expression declencheuse du workflow

- Expression utilisateur: `lance pub`
- Commande technique executee: `git commit`
- Expression utilisateur: `lance resume`
- Commande technique executee: `npm run resume`
- Expression utilisateur: `do commit`
- Commande technique executee: `npm run do-commit` (commit detaille **local**, sans push)

## Ce que fait `lance pub` dans ce projet

1. Hook `pre-commit` : lance `node tests/test-runner.js`.
2. Si les tests echouent : commit bloque.
3. Si les tests passent : commit cree.
4. Hook `post-commit` : lance `git push` automatiquement.
5. Hook `pre-push` : relance `node tests/test-runner.js` (gate final).

Donc, dans ce repo, `lance pub` (alias workflow de `git commit`) = tests + commit + push, et le push est lui aussi bloque si les tests ne passent pas.
Le deploiement Pages est ensuite conditionne par la CI GitHub (`Tests` obligatoires).

## Ce que fait `do commit` dans ce projet

1. Execute `npm run do-commit`.
2. Stage les changements, construit un message detaille, lance `git commit`.
3. Force `SKIP_AUTO_PUSH=1` pour **ne pas** declencher le push du hook `post-commit`.
4. Resultat: commit local uniquement. Publication = `lance pub` (ou `git push` manuel).
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

Expression attendue: `lance pub`

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

## Versioning produit et release

### Sources de verite

| Element | Fichier(s) | Role |
|---------|------------|------|
| Version produit | `package.json` + `assets/shared/version.js` | Numero affiche (`APP_VERSION`), semver |
| Notes de version | `CHANGELOG.md` + `assets/shared/releases.js` + `notes-de-version.html` | Historique lisible par module |
| Cles progression | `assets/shared/storage-keys.js` + `APP_CONFIG.STORAGE_KEY` | Revision `_vK` par module |

Ces trois axes sont **independants**. Bumper la version produit ne reset pas la progression ; bumper `_vK` ne change pas le semver.

### Quand bumper quoi

- **patch** (`2.5.1`) : correction bug / contenu / hub, sans nouvelle feature majeure.
- **minor** (`2.6.0`) : nouveau module, feature visible, page notes mise a jour.
- **major** (`3.0.0`) : rupture moteur / tracking / reset massif volontaire.
- **`_vK` module** : uniquement si la structure d'etat ou le perimetre missions casse la compat progression. Mettre a jour le registre `storage-keys.js`, les HTML du module, et verifier les hubs (test `Storage keys`).

### Checklist release

1. Mettre a jour `package.json` et `assets/shared/version.js` (meme numero).
2. Documenter les changements **par module** dans `CHANGELOG.md` et `assets/shared/releases.js`.
3. Si reset progression necessaire : bump `_vK` + registre + HTML modules.
4. `npm test` (inclut coherence storage keys).
5. Commit (`do commit` ou `lance pub`).
6. Tag Git annoté sur le commit de release :

```bash
git tag -a v2.5.0 -m "Release 2.5.0"
# apres push : git push origin v2.5.0
```

Le tag marque la livraison ; il ne remplace pas le CHANGELOG.

## Protection branche (GitHub) pour ce flux direct

Decision projet (solo) : **option A** — documentee dans `docs/governance/RISK_ACCEPTANCE.md` (RA-003).

Pour garder le flux simple `commit -> tests locaux -> push` en direct sur `main`:
- ne pas imposer `Require status checks to pass before merging/pushing` sur `main` ;
- ne pas activer `enforce_admins` uniquement pour forcer ce check ;
- laisser la CI `Tests` active pour verifier apres push et **bloquer le deploiement Pages** si echec.

Sinon GitHub affichera `Bypassed rule violations ... Required status check "Tests" is expected`, car cette regle est incompatible avec un push direct valide localement.

Revoir cette decision si le projet devient multi-contributeurs (alors envisager option B : PR + check `Tests` obligatoire).
