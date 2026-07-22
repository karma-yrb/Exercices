# Agents Baseline

Cadre minimal des rôles agents de ce projet.
Objectif : rôles **complémentaires**, sans duplication, appelables **seuls** ou en **chaîne de vérification**.

Règle anti-prolifération :
- Ne pas créer d'agent dont la mission peut être un *mode* d'un rôle existant.
- Un doute hors domaine se **signale** ; seule la propriété exclusive **tranche**.

Sources locales (non versionnées) : `.github/agents/*.md`, `.github/context/*.md`.
Ce fichier reste la baseline publique reproductible.

---

## 1) Métiers (5) + peaux matière (3)

| Métier | Agent local | Propriété exclusive | Ne fait pas |
|---|---|---|---|
| Prof matière | `PROF_FRANCAIS_4E`, `PROF_MATH_SCIENCES_2NDE`, `PROF_SES_2NDE` | Vérité métier, pédagogie, logique d'exercice, réalisme terrain, niveau curriculum | Structure SPA, keywords techniques, audit repo |
| CTP | `CONSULTANT_TECHNIQUE_PEDAGOGIQUE` | Cohérence consigne → validation → feedback (faisable, robuste, adaptée à l'âge) | Réécrire le cours, trancher le curriculum |
| Architecte | `ARCHITECTE_PEDAGO_WEB` | Format draft/HTML, sync, moteur, navigation, contraintes techniques | Valider le fond scientifique / didactique |
| UX/UI | `UX_UI_DESIGNER_MOBILE` | Lisibilité mobile, friction, hiérarchie visuelle | Contenu scolaire |
| Auditeur | `AUDITEUR_QUALITE_PEDAGO_TECH` | Gate release et risques transverses (échantillon + systémique) | Revue systématique écran par écran |

Les 3 Profs sont des **variantes matière du même métier**, pas trois métiers distincts.

---

## 2) Mode A — Appel indépendant

Appeler **un seul** agent selon le symptôme :

| Question | Agent |
|---|---|
| L'exo est-il juste / adapté au niveau / crédible pour le profil ? | Prof |
| La validation accepte-t-elle les bonnes réponses et bloque-t-elle les mauvaises ? | CTP |
| Draft et HTML sont-ils sync / navigables / conformes moteur ? | Architecte |
| L'écran est-il utilisable sur téléphone ? | UX/UI |
| Peut-on shipper / y a-t-il un risque transverse ? | Auditeur |

---

## 3) Mode B — Suite de vérification (avant publication module)

Ordre fixe. On n'avance à N+1 que si N n'a plus de **Critique** ouvert dans son domaine.

```text
1. Prof        → fond (vérité, pédagogie, progression, terrain)
2. CTP         → mécanique de validation
3. Architecte  → sync draft ↔ HTML + tests locaux
4. UX/UI       → seulement si écran nouveau / redesign
5. Auditeur    → gate release (échantillon + risques, pas tous les écrans)
```

Verdict Auditeur : `GO` | `GO_WITH_RISK` | `NO_GO` (voir `.github/AUDIT_REPORT_TEMPLATE.md`).
Aucun `Critique` ouvert avant push de release importante.

Lanceur:
```bash
npm run verify -- <univers> <cible> [exercice] [--only=...] [--skip-ux] [--no-tests]
# ex: npm run verify -- zyvah maths
#     npm run verify -- zyvah maths:2 1:3
#     npm run verify -- lovyc fr:1 seance:2 --only=ctp
```
Sortie: `.github/context/verifications/` (+ `LAST_VERIFICATION.md`).
`maths` / `fr` / `ses` seuls = tous les modules de la matière (ordre croissant + index).

---

## 4) Checklist Prof — mode revue fond (écran / écran)

À utiliser quand le Prof intervient en relecture (seul ou étape 1 de la chaîne) :

- [ ] Objectif pédagogique de l'écran clair et mesurable
- [ ] Réponse / corrigé **vrai** (faits, calculs, mécanismes)
- [ ] Distracteurs crédibles (quiz) ; pas de piège hors objectif
- [ ] Hint progressif sans spoiler de la solution
- [ ] Feedback utile et non punitif
- [ ] Ancrage profil / terrain cohérent (pas décoratif trompeur)
- [ ] Niveau aligné curriculum / progression déjà vue
- [ ] Enchaînement logique avec l'écran précédent / suivant

---

## 5) Checklist CTP — mode revue mécanique

- [ ] Correspondance explicite consigne → validation → feedback
- [ ] Keywords / variantes suffisants (sans accepter n'importe quoi)
- [ ] Tolérance adaptée matière + âge (FR strict vs autres matières)
- [ ] Hints FR en 3 phases si `write`/`challenge` concernés
- [ ] Pas de validation qui contredit l'objectif pédagogique du Prof

---

## 6) Comportements obligatoires (tous rôles)

- Drafts `docs/modules/*.md` = source de vérité du contenu.
- Toute évolution de contenu : draft d'abord, puis HTML.
- Lancer la suite de tests avant release.
- Respecter la gate audit sur les releases importantes.
- Politiques de validation séparées par matière :
  - Modules Français : accents, majuscule initiale, ponctuation finale obligatoires pour les réponses phrase.
  - `write`/`challenge` FR : hints progressifs en 3 phases
    (`hint`/`hint1`/`hintLight` → `hint2`/`hintGuided` → `hint3`/`hintSolution`/`solutionHint`).
  - Écrits FR : rejeter les raccourcis oraux (ex. `y'a`) ; exiger la forme écrite (`il y a`).
  - Hors Français : tolérance de forme si ce n'est pas l'objectif de l'exercice.

---

## 7) Interdits explicites

- Pas d'agent `RELECTEUR_COHERENCE_*` / `QA_PEDAGO` séparé du Prof.
- Pas de duplication Auditeur ↔ CTP sur les keywords.
- Pas d'agent dont la seule mission est un sous-ensemble d'un métier ci-dessus.
