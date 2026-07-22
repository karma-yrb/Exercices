# Draft - Zyvah Maths Module 3 (Fractions & Partage)

## Meta
- Theme: Studio Maths - Fractions & Partage
- Objectif: Sens des fractions, simplification, opérations, partage de gains (concert/tournoi), pont Seconde (quotients, valeurs interdites, % simples)
- AgentPedago: PROF_MATH_SCIENCES_2NDE + ARCHITECTE_PEDAGO_WEB
- SourcesPedago: CURRICULUM + PROGRESS + AGENTS_BASELINE
- CartesLocalLibrary: local_library/cards/maths/*.json + local_library/cards/cross/*.json
- Seances: 5
- ScreensPerSeance: 15
- Duree cible: ~12 min par Seance
- Niveau: Remédiation Cycle 4 → pont Seconde (Nombres et calculs / prérequis BO 2019)
- Prerequis: Module_1 (priorités) ; Module_2 utile mais non bloquant

---

## Seance 1 - Anatomie d'une part

### Objectifs pedagogiques et competences
- Lire et écrire une fraction `a/b` (numérateur / dénominateur)
- Relier fraction et partage d'un tout (gains, cachets)
- Calculer une fraction d'une quantité

### Index technique (ordre des steps)
1. msg - La part du gâteau (studio)
2. quiz - Repérer numérateur / dénominateur
3. write - Écrire une fraction simple
4. quiz - Fraction = partage égal
5. write - Quelle part a Zyvah ?
6. msg - Fraction d'une quantité
7. quiz - 1/2 de 80
8. write - 1/4 d'un cachet
9. quiz - Piège : 1/2 de 1/2
10. write - 3/5 des vues
11. msg - Tout, reste, parts
12. quiz - Reste après 2/5
13. write - Part + reste
14. interactive - Choisir la bonne lecture
15. challenge - Boss Anatomie

---

### Écran 1 - msg - La part du gâteau (studio)
**Type:** lesson

**Texte:**
"Zyvah, un split de cachets, c'est comme un **gâteau de gains**.

Une **fraction** `a/b` dit :
- `b` = en combien de **parts égales** on coupe le tout
- `a` = combien de ces parts tu prends

**Exemple Studio :**
- Cachet total = 1 « gâteau »
- `3/4` = on coupe en **4**, tu prends **3** parts."

**Note pédagogique:** Ancrer vocabulaire numérateur/dénominateur via le partage.

---

### Écran 2 - quiz - Repérer numérateur / dénominateur
**Type:** quiz

**Question:** "Dans la fraction `2/5`, quel nombre indique le **nombre de parts prises** ?"

**Options:**
- `5`
- `2` ✅
- `7`

**Réponse:** `2`

**Feedback:** "Exact ! `2` est le **numérateur** (parts prises). `5` est le **dénominateur** (parts totales)."

---

### Écran 3 - write - Écrire une fraction simple
**Type:** write

**Question:** "Écris la fraction : Zyvah prend **3 parts** sur un split coupé en **8**."

**Requirements:**
- keywords: ["3/8"]
- minWords: 1

**Réponse attendue:** `3/8`

**Hint:** "Parts prises / parts totales → numérateur / dénominateur."

**Feedback:** "Parfait ! `3/8` : 3 prises sur 8 parts égales."

---

### Écran 4 - quiz - Fraction = partage égal
**Type:** quiz

**Question:** "Un cachet de `120€` est partagé en **4 parts égales**. Quelle fraction représente **une** part ?"

**Options:**
- `1/4` ✅
- `4/1`
- `1/120`

**Réponse:** `1/4`

**Feedback:** "Oui ! Couper en 4 parts égales → chaque part = `1/4` du total."

---

### Écran 5 - write - Quelle part a Zyvah ?
**Type:** write

**Question:** "Sur 10 features d'un EP, Zyvah en signe **4**. Quelle fraction du projet représente-t-il ?"

**Requirements:**
- keywords: ["4/10", "2/5"]
- minWords: 1

**Réponse attendue:** `4/10` (accepter `2/5`)

**Hint:** "Features signées / total des features."

**Feedback:** "Bien ! `4/10` (ou `2/5` si déjà simplifié). On verra la simplification en Seance 2."

---

### Écran 6 - msg - Fraction d'une quantité
**Type:** lesson

**Texte:**
"Pour calculer **une fraction d'une quantité** :

`part = total × (a/b)`  
ou en pratique : `(total × a) ÷ b`

**Exemple :** `1/4` de `80€`  
`(80 × 1) ÷ 4 = 20€`

C'est le split : tu prends `a` parts sur `b`."

---

### Écran 7 - quiz - 1/2 de 80
**Type:** quiz

**Question:** "Combien font `1/2` de `80` vues boostées ?"

**Options:**
- `20`
- `40` ✅
- `160`

**Réponse:** `40`

**Feedback:** "Exact ! `(80 × 1) ÷ 2 = 40`."

---

### Écran 8 - write - 1/4 d'un cachet
**Type:** write

**Question:** "Calcule `1/4` d'un cachet de `200€`."

**Requirements:**
- keywords: ["50"]
- minWords: 1

**Réponse attendue:** `50`

**Hint:** "`(200 × 1) ÷ 4`."

**Feedback:** "Parfait ! `200 ÷ 4 = 50€`."

---

### Écran 9 - quiz - Piège : 1/2 de 1/2
**Type:** quiz

**Question:** "Zyvah prend déjà `1/2` du master. Puis il en reverse encore `1/2` à un featuring. Quelle fraction du master reste au featuring ?"

**Options:**
- `1/2`
- `1/4` ✅
- `1`

**Réponse:** `1/4`

**Feedback:** "Oui ! `1/2` de `1/2` = `1/4`. On multiplie les fractions (Seance 4)."

---

### Écran 10 - write - 3/5 des vues
**Type:** write

**Question:** "Un clip fait `1500` vues. Calcule `3/5` des vues."

**Requirements:**
- keywords: ["900"]
- minWords: 1

**Réponse attendue:** `900`

**Hint:** "`(1500 × 3) ÷ 5`."

**Feedback:** "Génial ! `1500 × 3 = 4500`, `4500 ÷ 5 = 900`."

---

### Écran 11 - msg - Tout, reste, parts
**Type:** lesson

**Texte:**
"Le **tout** = `1 = b/b`.

Si tu donnes `a/b`, il reste `(b − a)/b`.

**Exemple :** tu verses `2/5` des royalties → reste `3/5`."

---

### Écran 12 - quiz - Reste après 2/5
**Type:** quiz

**Question:** "Zyvah reverse `2/5` des royalties. Quelle fraction **reste** ?"

**Options:**
- `2/5`
- `3/5` ✅
- `5/2`

**Réponse:** `3/5`

**Feedback:** "Exact ! `5/5 − 2/5 = 3/5`."

---

### Écran 13 - write - Part + reste
**Type:** write

**Question:** "Sur un total de `1`, Zyvah garde `3/8`. Quelle fraction reverse-t-il ?"

**Requirements:**
- keywords: ["5/8"]
- minWords: 1

**Réponse attendue:** `5/8`

**Hint:** "`8/8 − 3/8`."

**Feedback:** "Parfait ! Reste `5/8`."

---

### Écran 14 - interactive - Choisir la bonne lecture
**Type:** interactive

**Question:** "« `3/4` d'un cachet de `120€` » signifie :"

**Options:**
- Couper en 3, prendre 4 parts
- Couper en 4, prendre 3 parts, soit `90€` ✅
- Prendre `3€` sur `4€`

**Réponse:** Couper en 4, prendre 3 parts, soit `90€`

**Feedback:** "Oui : `(120 × 3) ÷ 4 = 90€`."

---

### Écran 15 - challenge - Boss Anatomie
**Type:** challenge

**Question:** "Cachet total = `240€`. Zyvah prend `3/8` du cachet. Calcule sa part en euros."

**Requirements:**
- keywords: ["90"]
- minWords: 1

**Réponse attendue:** `90`

**Hint:** "`(240 × 3) ÷ 8`."

**Feedback:** "**BOSS S1 OK** ✅  
`(240 × 3) ÷ 8 = 90€`. Tu lis une fraction et tu calcules une part. Direction Seance 2 : **simplifier le mix**."

---

## Seance 2 - Simplifier le mix

### Objectifs pedagogiques et competences
- Simplifier une fraction (forme irréductible)
- Reconnaître des fractions égales
- Comparer deux fractions

### Index technique (ordre des steps)
1. msg - Même son, track plus légère
2. quiz - Fraction déjà irréductible ?
3. write - Simplifier 4/8
4. quiz - Diviser num et dén
5. write - Simplifier 12/18
6. msg - Fractions égales
7. quiz - 2/4 = ?
8. write - Égalité 3/5 et ?
9. quiz - Piège simplification partielle
10. write - Simplifier 20/30
11. msg - Comparer des parts
12. quiz - Plus grand : 2/3 ou 3/5
13. write - Comparer 3/8 et 1/2
14. interactive - Stratégie de comparaison
15. challenge - Boss Simplification

---

### Écran 1 - msg - Même son, track plus légère
**Type:** lesson

**Texte:**
"Simplifier une fraction = **même valeur**, écriture plus légère.

Tu divises **numérateur et dénominateur** par le **même** nombre (un diviseur commun).

`4/8 = 1/2` (divisé par 4)

Forme **irréductible** : plus aucun diviseur commun > 1."

---

### Écran 2 - quiz - Fraction déjà irréductible ?
**Type:** quiz

**Question:** "Laquelle est déjà **irréductible** ?"

**Options:**
- `4/6`
- `3/5` ✅
- `10/15`

**Réponse:** `3/5`

**Feedback:** "Oui ! 3 et 5 n'ont pas de diviseur commun > 1."

---

### Écran 3 - write - Simplifier 4/8
**Type:** write

**Question:** "Simplifie `4/8` (forme irréductible)."

**Requirements:**
- keywords: ["1/2"]
- minWords: 1

**Réponse attendue:** `1/2`

**Hint:** "Divise haut et bas par 4."

**Feedback:** "Parfait ! `4/8 = 1/2`."

---

### Écran 4 - quiz - Diviser num et dén
**Type:** quiz

**Question:** "Pour simplifier `6/9`, on divise haut et bas par :"

**Options:**
- `6`
- `3` ✅
- `9`

**Réponse:** `3`

**Feedback:** "Exact ! `6÷3=2`, `9÷3=3` → `2/3`."

---

### Écran 5 - write - Simplifier 12/18
**Type:** write

**Question:** "Simplifie `12/18`."

**Requirements:**
- keywords: ["2/3"]
- minWords: 1

**Réponse attendue:** `2/3`

**Hint:** "Diviseur commun : 6."

**Feedback:** "Bien ! `12÷6=2`, `18÷6=3` → `2/3`."

---

### Écran 6 - msg - Fractions égales
**Type:** lesson

**Texte:**
"Deux fractions sont **égales** si elles représentent la même part.

`1/2 = 2/4 = 3/6`

Tu peux **amplifier** (×k) ou **simplifier** (÷k) haut et bas."

---

### Écran 7 - quiz - 2/4 = ?
**Type:** quiz

**Question:** "`2/4` est égal à :"

**Options:**
- `2/2`
- `1/2` ✅
- `4/2`

**Réponse:** `1/2`

**Feedback:** "Oui ! Simplifié par 2."

---

### Écran 8 - write - Égalité 3/5 et ?
**Type:** write

**Question:** "Complète pour garder la même valeur : `3/5 = ?/20`"

**Requirements:**
- keywords: ["12"]
- minWords: 1

**Réponse attendue:** `12`

**Hint:** "Le dénominateur ×4 (5→20). Fais ×4 au numérateur aussi."

**Feedback:** "Exact ! `3×4=12` → `12/20`."

---

### Écran 9 - quiz - Piège simplification partielle
**Type:** quiz

**Question:** "On simplifie `8/12` en divisant seulement le numérateur par 4 → `2/12`. C'est :"

**Options:**
- Correct
- Incorrect : il faut diviser haut **et** bas ✅
- Correct si on arrondit

**Réponse:** Incorrect : il faut diviser haut **et** bas

**Feedback:** "Piège classique ! `8/12 = 2/3` (÷4 des deux côtés), pas `2/12`."

---

### Écran 10 - write - Simplifier 20/30
**Type:** write

**Question:** "Simplifie `20/30`."

**Requirements:**
- keywords: ["2/3"]
- minWords: 1

**Réponse attendue:** `2/3`

**Hint:** "Divise par 10."

**Feedback:** "Parfait ! `20/30 = 2/3`."

---

### Écran 11 - msg - Comparer des parts
**Type:** lesson

**Texte:**
"Pour comparer `a/b` et `c/d` :
1. Même dénominateur, ou
2. Produit en croix : compare `a×d` et `c×b`

**Exemple :** `2/3` vs `3/5`  
`2×5=10` et `3×3=9` → `2/3 > 3/5`."

---

### Écran 12 - quiz - Plus grand : 2/3 ou 3/5
**Type:** quiz

**Question:** "Quelle part est la plus grande : `2/3` ou `3/5` ?"

**Options:**
- `3/5`
- `2/3` ✅
- Elles sont égales

**Réponse:** `2/3`

**Feedback:** "Oui ! `2×5=10 > 3×3=9`."

---

### Écran 13 - write - Comparer 3/8 et 1/2
**Type:** write

**Question:** "La plus grande entre `3/8` et `1/2` ? Réponds par la fraction."

**Requirements:**
- keywords: ["1/2"]
- minWords: 1

**Réponse attendue:** `1/2`

**Hint:** "`1/2 = 4/8`. Compare à `3/8`."

**Feedback:** "Exact ! `4/8 > 3/8` donc `1/2` gagne."

---

### Écran 14 - interactive - Stratégie de comparaison
**Type:** interactive

**Question:** "Pour comparer vite `3/8` et `1/2`, la stratégie la plus propre :"

**Options:**
- Convertir en décimaux approximatifs
- Mettre au même dénominateur (`1/2=4/8`) ✅
- Regarder seulement les numérateurs

**Réponse:** Mettre au même dénominateur (`1/2=4/8`)

**Feedback:** "Oui : comparaison exacte, sans approximation."

---

### Écran 15 - challenge - Boss Simplification
**Type:** challenge

**Question:** "Simplifie `24/36`, puis dis si le résultat est plus grand, plus petit ou égal à `1/2`.  
Écris : la fraction simplifiée **et** le mot `plus`, `moins` ou `egal`."

**Requirements:**
- keywords: ["2/3", "plus"]
- enforceKeywords: true
- minWords: 2

**Réponse attendue:** `2/3 plus`

**Hint:** "Simplifie d'abord (÷12). Puis compare à `1/2`."

**Feedback:** "**BOSS S2 OK** ✅  
`24/36 = 2/3` et `2/3 > 1/2`. Mix allégé. Direction Seance 3 : **additionner & soustraire**."

---

## Seance 3 - Additionner & soustraire

### Objectifs pedagogiques et competences
- Additionner / soustraire à même dénominateur
- Trouver un dénominateur commun
- Éviter l'erreur « additionner les numérateurs et les dénominateurs »

### Index technique (ordre des steps)
1. msg - Mixer deux parts
2. quiz - Même dénominateur
3. write - 1/5 + 2/5
4. quiz - Soustraction simple
5. write - 7/8 − 3/8
6. msg - Dénominateur commun
7. quiz - Den commun de 1/2 et 1/4
8. write - 1/2 + 1/4
9. quiz - Piège 1/2 + 1/3
10. write - 1/3 + 1/6
11. msg - Split multi-artistes
12. quiz - 1/4 + 1/2 + 1/8
13. write - 5/6 − 1/3
14. interactive - Choisir la bonne méthode
15. challenge - Boss Additions

---

### Écran 1 - msg - Mixer deux parts
**Type:** lesson

**Texte:**
"Même dénominateur → on additionne (ou soustrait) **seulement les numérateurs**.

`2/7 + 3/7 = 5/7`

⚠️ **Jamais** `2/7 + 3/7 = 5/14` (erreur classique)."

---

### Écran 2 - quiz - Même dénominateur
**Type:** quiz

**Question:** "`1/8 + 3/8` ="

**Options:**
- `4/16`
- `4/8` ✅
- `3/8`

**Réponse:** `4/8`

**Feedback:** "Oui ! `1+3=4`, dénominateur inchangé. (Simplifiable en `1/2`.)"

---

### Écran 3 - write - 1/5 + 2/5
**Type:** write

**Question:** "Calcule `1/5 + 2/5` (forme simple OK)."

**Requirements:**
- keywords: ["3/5"]
- minWords: 1

**Réponse attendue:** `3/5`

**Hint:** "Numérateurs : `1+2`. Dénominateur : `5`."

**Feedback:** "Parfait ! `3/5`."

---

### Écran 4 - quiz - Soustraction simple
**Type:** quiz

**Question:** "`5/6 − 2/6` ="

**Options:**
- `3/6` ✅
- `3/0`
- `7/6`

**Réponse:** `3/6`

**Feedback:** "Exact ! `5−2=3`. (Simplifiable en `1/2`.)"

---

### Écran 5 - write - 7/8 − 3/8
**Type:** write

**Question:** "Calcule `7/8 − 3/8`."

**Requirements:**
- keywords: ["4/8", "1/2"]
- minWords: 1

**Réponse attendue:** `4/8` ou `1/2`

**Hint:** "`7−3` sur dénominateur 8."

**Feedback:** "Bien ! `4/8 = 1/2`."

---

### Écran 6 - msg - Dénominateur commun
**Type:** lesson

**Texte:**
"Dénominateurs différents → mets au **même dénominateur**, puis additionne.

`1/2 + 1/4` : `1/2 = 2/4` → `2/4 + 1/4 = 3/4`."

---

### Écran 7 - quiz - Den commun de 1/2 et 1/4
**Type:** quiz

**Question:** "Un dénominateur commun simple pour `1/2` et `1/4` :"

**Options:**
- `2`
- `4` ✅
- `8` seulement

**Réponse:** `4`

**Feedback:** "Oui ! 4 est un multiple de 2 et de 4."

---

### Écran 8 - write - 1/2 + 1/4
**Type:** write

**Question:** "Calcule `1/2 + 1/4`."

**Requirements:**
- keywords: ["3/4"]
- minWords: 1

**Réponse attendue:** `3/4`

**Hint:** "`1/2 = 2/4`."

**Feedback:** "Génial ! `2/4 + 1/4 = 3/4`."

---

### Écran 9 - quiz - Piège 1/2 + 1/3
**Type:** quiz

**Question:** "Quelle est l'erreur classique pour `1/2 + 1/3` ?"

**Options:**
- Écrire `2/5` (additionner num et dén) ✅
- Chercher un dénominateur commun
- Amplifier `1/2` en `3/6`

**Réponse:** Écrire `2/5` (additionner num et dén)

**Feedback:** "Oui, piège fréquent. Le vrai résultat est `5/6`."

---

### Écran 10 - write - 1/3 + 1/6
**Type:** write

**Question:** "Calcule `1/3 + 1/6`."

**Requirements:**
- keywords: ["1/2"]
- minWords: 1

**Réponse attendue:** `1/2`

**Hint:** "`1/3 = 2/6`."

**Feedback:** "Parfait ! `2/6 + 1/6 = 3/6 = 1/2`."

---

### Écran 11 - msg - Split multi-artistes
**Type:** lesson

**Texte:**
"Sur un featuring :
- Beatmaker : `1/4`
- Zyvah : `1/2`
- Feat : `1/8`

Pour savoir si le split est cohérent, **additionne** les parts (dénominateur commun 8)."

---

### Écran 12 - quiz - 1/4 + 1/2 + 1/8
**Type:** quiz

**Question:** "`1/4 + 1/2 + 1/8` ="

**Options:**
- `3/8`
- `7/8` ✅
- `4/8`

**Réponse:** `7/8`

**Feedback:** "Oui ! `2/8 + 4/8 + 1/8 = 7/8`."

---

### Écran 13 - write - 5/6 − 1/3
**Type:** write

**Question:** "Calcule `5/6 − 1/3`."

**Requirements:**
- keywords: ["1/2"]
- minWords: 1

**Réponse attendue:** `1/2`

**Hint:** "`1/3 = 2/6`."

**Feedback:** "Exact ! `5/6 − 2/6 = 3/6 = 1/2`."

---

### Écran 14 - interactive - Choisir la bonne méthode
**Type:** interactive

**Question:** "Pour `2/5 + 1/10`, tu fais d'abord :"

**Options:**
- `2+1` et `5+10`
- Amplifier `2/5` en `4/10` ✅
- Multiplier les fractions

**Réponse:** Amplifier `2/5` en `4/10`

**Feedback:** "Oui : même dénominateur 10, puis `4/10 + 1/10 = 5/10 = 1/2`."

---

### Écran 15 - challenge - Boss Additions
**Type:** challenge

**Question:** "Split : Zyvah `3/8`, featuring `1/4`, management `1/8`. Quelle fraction du master reste pour le label ?"

**Requirements:**
- keywords: ["2/8", "1/4"]
- minWords: 1

**Réponse attendue:** `2/8` ou `1/4`

**Hint:** "`1/4 = 2/8`. Additionne les 3 parts, puis `8/8 − …`."

**Feedback:** "**BOSS S3 OK** ✅  
`3/8 + 2/8 + 1/8 = 6/8` → reste `2/8 = 1/4`. Direction Seance 4 : **multiplier & diviser**."

---

## Seance 4 - Multiplier, diviser, chaîner

### Objectifs pedagogiques et competences
- Multiplier des fractions
- Diviser = multiplier par l'inverse
- Pont Seconde : quotient littéral et dénominateur ≠ 0

### Index technique (ordre des steps)
1. msg - Produit de parts
2. quiz - 1/2 × 1/3
3. write - 2/5 × 3/4
4. quiz - Fraction × entier
5. write - 3/8 × 4
6. msg - Diviser = × inverse
7. quiz - Inverse de 3/4
8. write - 1/2 ÷ 1/4
9. quiz - Piège division
10. write - 3/5 ÷ 6/5
11. msg - Pont Seconde : a/b
12. quiz - Dénominateur interdit
13. write - Simplifier avant multiplier
14. interactive - Choisir l'opération
15. challenge - Boss Produits

---

### Écran 1 - msg - Produit de parts
**Type:** lesson

**Texte:**
"Multiplier deux fractions :

`(a/b) × (c/d) = (a×c)/(b×d)`

**Exemple :** `1/2` de `1/3` = `1/6`.

Tu peux simplifier **en croix** avant de multiplier."

---

### Écran 2 - quiz - 1/2 × 1/3
**Type:** quiz

**Question:** "`1/2 × 1/3` ="

**Options:**
- `2/3`
- `1/6` ✅
- `1/5`

**Réponse:** `1/6`

**Feedback:** "Exact ! `(1×1)/(2×3)=1/6`."

---

### Écran 3 - write - 2/5 × 3/4
**Type:** write

**Question:** "Calcule `2/5 × 3/4` (forme irréductible)."

**Requirements:**
- keywords: ["3/10", "6/20"]
- minWords: 1

**Réponse attendue:** `3/10` (accepter `6/20`)

**Hint:** "`(2×3)/(5×4)`, puis simplifie."

**Feedback:** "Bien ! `6/20 = 3/10`."

---

### Écran 4 - quiz - Fraction × entier
**Type:** quiz

**Question:** "`1/4 × 8` ="

**Options:**
- `8/4`
- `2` ✅
- `1/32`

**Réponse:** `2`

**Feedback:** "Oui ! `8/4 = 2` (l'entier = `8/1`)."

---

### Écran 5 - write - 3/8 × 4
**Type:** write

**Question:** "Calcule `3/8 × 4`."

**Requirements:**
- keywords: ["3/2", "12/8", "1.5", "1,5"]
- minWords: 1

**Réponse attendue:** `3/2` (accepter `12/8` ou `1,5`)

**Hint:** "`4 = 4/1`. Simplifie 4 et 8 avant."

**Feedback:** "Parfait ! `12/8 = 3/2`."

---

### Écran 6 - msg - Diviser = × inverse
**Type:** lesson

**Texte:**
"Diviser par une fraction = **multiplier par son inverse**.

Inverse de `a/b` = `b/a` (si `a ≠ 0`).

`1/2 ÷ 1/4 = 1/2 × 4/1 = 2`."

---

### Écran 7 - quiz - Inverse de 3/4
**Type:** quiz

**Question:** "L'inverse de `3/4` est :"

**Options:**
- `4/3` ✅
- `3/4`
- `-3/4`

**Réponse:** `4/3`

**Feedback:** "Exact ! On inverse numérateur et dénominateur."

---

### Écran 8 - write - 1/2 ÷ 1/4
**Type:** write

**Question:** "Calcule `1/2 ÷ 1/4`."

**Requirements:**
- keywords: ["2"]
- minWords: 1

**Réponse attendue:** `2`

**Hint:** "`× 4/1`."

**Feedback:** "Génial ! Combien de quarts dans une moitié ? **2**."

---

### Écran 9 - quiz - Piège division
**Type:** quiz

**Question:** "Pour calculer `2/3 ÷ 1/3`, la méthode fiable est :"

**Options:**
- Additionner les numérateurs
- Multiplier par l'inverse : `2/3 × 3/1` ✅
- Soustraire les dénominateurs

**Réponse:** Multiplier par l'inverse : `2/3 × 3/1`

**Feedback:** "Exact ! Diviser = × l'inverse. Ici : `2/3 × 3/1 = 2`."

---

### Écran 10 - write - 3/5 ÷ 6/5
**Type:** write

**Question:** "Calcule `3/5 ÷ 6/5`."

**Requirements:**
- keywords: ["1/2"]
- minWords: 1

**Réponse attendue:** `1/2`

**Hint:** "`× 5/6`, puis simplifie."

**Feedback:** "Parfait ! `(3/5)×(5/6)=3/6=1/2`."

---

### Écran 11 - msg - Pont Seconde : a/b
**Type:** lesson

**Texte:**
"En Seconde, `a/b` est aussi un **quotient**.

Règle d'or : **le dénominateur ne peut pas être 0**.

`x/0` n'existe pas.  
Si tu as `3/(x−2)`, alors `x ≠ 2`."

---

### Écran 12 - quiz - Dénominateur interdit
**Type:** quiz

**Question:** "Pour `5/(x−1)`, quelle valeur de `x` est **interdite** ?"

**Options:**
- `5`
- `1` ✅
- `0`

**Réponse:** `1`

**Feedback:** "Oui ! Si `x=1`, dénominateur `0` → expression impossible."

---

### Écran 13 - write - Simplifier avant multiplier
**Type:** write

**Question:** "Calcule en simplifiant d'abord : `4/9 × 3/8`."

**Requirements:**
- keywords: ["1/6"]
- minWords: 1

**Réponse attendue:** `1/6`

**Hint:** "Simplifie 4 et 8 (÷4), 3 et 9 (÷3)."

**Feedback:** "Excellent ! Il reste `(1/3)×(1/2)=1/6`."

---

### Écran 14 - interactive - Choisir l'opération
**Type:** interactive

**Question:** "« Combien de parts de `1/8` dans `3/4` ? » se traduit par :"

**Options:**
- `3/4 × 1/8`
- `3/4 ÷ 1/8` ✅
- `3/4 + 1/8`

**Réponse:** `3/4 ÷ 1/8`

**Feedback:** "Oui : division = nombre de parts. Résultat : 6."

---

### Écran 15 - challenge - Boss Produits
**Type:** challenge

**Question:** "Zyvah reverse `2/5` de son cachet à un feat. Le feat en reverse encore `1/2` à un arrangeur. Quelle fraction du cachet **initial** reçoit l'arrangeur ?"

**Requirements:**
- keywords: ["1/5", "2/10"]
- minWords: 1

**Réponse attendue:** `1/5`

**Hint:** "`2/5 × 1/2`."

**Feedback:** "**BOSS S4 OK** ✅  
`(2/5)×(1/2)=2/10=1/5`. Chaînage maîtrisé. Direction Seance 5 : **Split Master**."

---

## Seance 5 - Split Master (synthèse)

### Objectifs pedagogiques et competences
- Résoudre un problème de partage multi-étapes
- Relier fraction et pourcentage simple (`/100`)
- Synthétiser lectures, opérations et restes

### Index technique (ordre des steps)
1. msg - Night du Split Master
2. quiz - Lire le brief gains
3. write - Part en euros
4. quiz - Reste après deux splits
5. write - Addition de parts
6. msg - Pourcentage = /100
7. quiz - 25% en fraction
8. write - 20% de 150
9. quiz - Fraction → %
10. write - Problème concert
11. msg - Checklist anti-pièges
12. quiz - Diagnostic d'erreur
13. write - Chaîne complète
14. interactive - Plan de résolution
15. challenge - Boss Split Master

---

### Écran 1 - msg - Night du Split Master
**Type:** lesson

**Texte:**
"Zyvah, dernière séance : on enchaîne **tout**.

Checklist Split Master :
1. Lire la fraction / le %
2. Calculer la part
3. Simplifier
4. Gérer le reste
5. Vérifier que la somme des parts ≤ 1"

---

### Écran 2 - quiz - Lire le brief gains
**Type:** quiz

**Question:** "Cachet `400€`. Management `1/10`. Combien pour le management ?"

**Options:**
- `10€`
- `40€` ✅
- `400€`

**Réponse:** `40€`

**Feedback:** "Oui ! `400×1/10=40`."

---

### Écran 3 - write - Part en euros
**Type:** write

**Question:** "Cachet `360€`. Zyvah prend `5/12`. Calcule sa part (€)."

**Requirements:**
- keywords: ["150"]
- minWords: 1

**Réponse attendue:** `150`

**Hint:** "`(360 × 5) ÷ 12`."

**Feedback:** "Parfait ! `1800 ÷ 12 = 150€`."

---

### Écran 4 - quiz - Reste après deux splits
**Type:** quiz

**Question:** "Parts déjà versées : `1/4` + `1/3`. Quelle fraction reste ?"

**Options:**
- `5/12` ✅
- `2/7`
- `7/12`

**Réponse:** `5/12`

**Feedback:** "Oui ! `3/12 + 4/12 = 7/12` → reste `5/12`."

---

### Écran 5 - write - Addition de parts
**Type:** write

**Question:** "Calcule `1/6 + 1/3 + 1/2`."

**Requirements:**
- keywords: ["1"]
- minWords: 1

**Réponse attendue:** `1`

**Hint:** "Dénominateur commun 6 : `1/6 + 2/6 + 3/6`."

**Feedback:** "Exact ! Total = `6/6 = 1` (split complet)."

---

### Écran 6 - msg - Pourcentage = /100
**Type:** lesson

**Texte:**
"Un **pourcentage** est une fraction sur 100.

`25% = 25/100 = 1/4`  
`20% = 20/100 = 1/5`

Pour calculer `p%` d'une quantité :  
`quantité × p ÷ 100`."

---

### Écran 7 - quiz - 25% en fraction
**Type:** quiz

**Question:** "`25%` en fraction irréductible :"

**Options:**
- `25/100`
- `1/4` ✅
- `4/1`

**Réponse:** `1/4`

**Feedback:** "Oui ! `25/100 = 1/4`."

---

### Écran 8 - write - 20% de 150
**Type:** write

**Question:** "Calcule `20%` de `150` streams sponsorisés."

**Requirements:**
- keywords: ["30"]
- minWords: 1

**Réponse attendue:** `30`

**Hint:** "`150 × 20 ÷ 100` ou `150 × 1/5`."

**Feedback:** "Bien ! `30` streams."

---

### Écran 9 - quiz - Fraction → %
**Type:** quiz

**Question:** "`3/5` = ?"

**Options:**
- `35%`
- `60%` ✅
- `15%`

**Réponse:** `60%`

**Feedback:** "Exact ! `3/5 = 60/100 = 60%`."

---

### Écran 10 - write - Problème concert
**Type:** write

**Question:** "Recette concert = `1200€`. Frais = `1/4`. Combien reste-t-il après frais ?"

**Requirements:**
- keywords: ["900"]
- minWords: 1

**Réponse attendue:** `900`

**Hint:** "Reste = `3/4` de 1200."

**Feedback:** "Parfait ! Frais `300€`, reste `900€`."

---

### Écran 11 - msg - Checklist anti-pièges
**Type:** lesson

**Texte:**
"Avant de valider un split :
- ❌ Additionner num **et** dén
- ❌ Oublier de mettre au même dénominateur
- ❌ Diviser sans passer par l'inverse
- ❌ Accepter un dénominateur `0`
- ✅ Simplifier le résultat final"

---

### Écran 12 - quiz - Diagnostic d'erreur
**Type:** quiz

**Question:** "Un élève écrit `1/2 + 1/5 = 2/7`. Quelle erreur ?"

**Options:**
- Il a multiplié
- Il a additionné numérateurs **et** dénominateurs ✅
- Il a simplifié trop tôt

**Réponse:** Il a additionné numérateurs **et** dénominateurs

**Feedback:** "Oui. Correct : `5/10 + 2/10 = 7/10`."

---

### Écran 13 - write - Chaîne complète
**Type:** write

**Question:** "Cachet `480€`. Zyvah garde `5/8`. Sur sa part, il reverse `1/5` au manager. Combien (€) reçoit le manager ?"

**Requirements:**
- keywords: ["60"]
- minWords: 1

**Réponse attendue:** `60`

**Hint:** "D'abord part Zyvah, puis `× 1/5`."

**Feedback:** "Excellent ! Part Zyvah `300€`, manager `60€`."

---

### Écran 14 - interactive - Plan de résolution
**Type:** interactive

**Question:** "Pour le problème précédent, le bon plan est :"

**Options:**
- `%` d'abord, sans lire les fractions
- Calculer la part de Zyvah, puis la fraction de cette part ✅
- Additionner `5/8` et `1/5` puis multiplier par 480

**Réponse:** Calculer la part de Zyvah, puis la fraction de cette part

**Feedback:** "Oui : enchaînement `× 5/8` puis `× 1/5`."

---

### Écran 15 - challenge - Boss Split Master
**Type:** challenge

**Question:** "Recette = `2000€`.  
- Frais salle = `15%`  
- Sur le reste, Zyvah prend `3/5`  
Calcule la part de Zyvah (€)."

**Requirements:**
- keywords: ["1020"]
- minWords: 1

**Réponse attendue:** `1020`

**Hint:** "Reste après frais = `85%` de 2000 = 1700. Puis `× 3/5`."

**Feedback:** "**SPLIT MASTER VALIDÉ** ✅  

Frais `300€` → reste `1700€` → Zyvah `1020€`.

**Badge :** 🎚️ Split Engineer

Tu maîtrises fractions, partages et % simples.  
**Prochaine étape :** Module 4 — Puissances & Multiplicateurs."

---

## Notes Techniques Globales - Module 3

### Conformité / positionnement
✅ Sens des fractions et fraction d'une quantité  
✅ Simplification, égalité, comparaison  
✅ +, − avec dénominateur commun  
✅ ×, ÷ (inverse), chaînage  
✅ Pont Seconde : dénominateur ≠ 0  
✅ Amorce % = /100 (sans module « taux d'évolution »)

**Source curriculum :** Semaine 2 — Fractions & Partage (gains concert/tournoi)  
**Notes remédiées :** équations rationnelles (valeurs interdites), amorce taux

### Progression pédagogique
- **5 Seances × 15 écrans = 75 écrans**
- Durée estimée : **~12 min/Seance**
- Ratio cible : ~40% quiz / 40% write / 15% msg / 5% challenge (+ interactive)
- Boss en fin de chaque Seance

### Cohérence projet
- ✅ Format draft compatible SPA (`msg`/`quiz`/`write`/`interactive`/`challenge`)
- ✅ Univers Studio Zyvah (cachets, splits, featuring, streams)
- ✅ Requirements keywords sur write/challenge
- ✅ Hints sans spoiler direct
- ✅ Storage hub prévu : `zyvah_maths_w3_v1`

### Validation CTP requise
Avant génération HTML `Zyvah/Maths/Module_3/` :
- Cohérence pédagogique écran/écran
- Robustesse keywords / variantes (`1/2` vs `0.5`, simplifications)
- Progression de difficulté S1→S5
- Feedbacks bienveillants

### Relance verify
```bash
npm run verify -- zyvah maths:3
```
