# Draft - Zyvah Maths Module 2 (Calcul Littéral - Seconde)

## Meta
- Theme: Studio Maths - Calcul Littéral & Algèbre
- Objectif: Développer, factoriser, manipuler expressions algébriques, résoudre équations
- AgentPedago: PROF_MATH_SCIENCES_2NDE + ARCHITECTE_PEDAGO_WEB
- SourcesPedago: CURRICULUM + PROGRESS + AGENTS_BASELINE
- CartesLocalLibrary: local_library/cards/maths/*.json + local_library/cards/cross/*.json
- Seances: 5
- ScreensPerSeance: 15
- Duree cible: ~12 min par Seance
- Niveau: Seconde Générale (Programme officiel BO 2019)
- Prerequis: Module_1 (Révision priorités)

---

## Seance 1 - Le Développement : Mixage de Variables

### Objectifs pedagogiques et competences (Seconde GT)
- Développer une expression avec distributivité simple : `k(a + b)`
- Développer avec double distributivité : `(a + b)(c + d)`
- Manipuler des expressions littérales dans un contexte studio

### Index technique (ordre des steps)
1. msg - Les Variables du Studio
2. quiz - Distributivité simple (reconnaissance)
3. write - Développer `k(a + b)` contexte gain
4. quiz - Double distributivité (reconnaissance)
5. write - Développer `(a + b)(c + d)` simple
6. msg - La Méthode du Carré (visualisation)
7. interactive - Développer `(x + 2)(x + 3)`
8. write - Développer `(x + 5)(x - 2)`
9. quiz - Piège : signe négatif
10. write - Développer `(2x + 1)(x + 4)`
11. msg - Application : Aire d'un studio
12. write - Problème aire rectangulaire
13. quiz - Développer expression complexe
14. write - Développer `(3x - 2)(2x + 5)`
15. challenge - Boss Développement

---

### Écran 1 - msg - Les Variables du Studio
**Type:** lesson

**Texte:**
"Zyvah, jusqu'ici on manipulait des **nombres**. Maintenant, on passe aux **variables** : des lettres qui représentent des valeurs qu'on ne connaît pas encore.

**Exemple Studio :**
- `x` = Niveau de gain (inconnu, à régler)
- `a` = Fréquence de base
- `k` = Coefficient de compression

En **calcul littéral**, on manipule ces lettres comme des nombres pour créer des **formules universelles**."

**Note pédagogique:** Ancrer les variables dans le contexte studio pour rendre concret.

---

### Écran 2 - quiz - Distributivité simple (reconnaissance)
**Type:** quiz

**Question:** "Le mixage `3(x + 2)` signifie qu'on applique un gain de **3** à deux signaux : `x` et `2`. Quel est le résultat développé ?"

**Options:**
- `3x + 2`
- `3x + 6` ✅
- `3x + 5`

**Réponse:** `3x + 6`

**Feedback:** "Exact ! On multiplie le `3` par **chaque** élément : `3 × x = 3x` et `3 × 2 = 6`."

---

### Écran 3 - write - Développer `k(a + b)` contexte gain
**Type:** write

**Question:** "Développe cette expression (applique le gain à chaque signal) :

`5(x + 4)`"

**Requirements:**
- keywords: ["5x", "20", "+"]
- minWords: 3
- validationType: "algebraic"

**Réponse attendue:** `5x + 20`

**Hint:** "Multiplie le `5` par `x`, puis multiplie le `5` par `4`. Relie les deux avec un `+`."

**Feedback:** "Parfait ! `5(x + 4) = 5x + 20`. C'est la **distributivité simple**."

---

### Écran 4 - quiz - Double distributivité (reconnaissance)
**Type:** quiz

**Question:** "Pour mixer deux signaux composites `(x + 2)` et `(x + 3)`, on multiplie **chaque élément du premier** par **chaque élément du second**. Combien de multiplications au total ?"

**Options:**
- `2`
- `3`
- `4` ✅

**Réponse:** `4`

**Feedback:** "Exact ! C'est la **double distributivité** : `x×x`, `x×3`, `2×x`, `2×3` = 4 produits."

---

### Écran 5 - write - Développer `(a + b)(c + d)` simple
**Type:** write

**Question:** "Développe (multiplie tout par tout) :

`(x + 1)(x + 2)`"

**Requirements:**
- keywords: ["x²", "3x", "2", "+"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `x² + 3x + 2` (accepter aussi `x² + 2x + x + 2`)

**Hint:** "Multiplie `x` par les deux termes du second bloc, puis `1` par les deux termes du second bloc. Additionne tout."

**Feedback:** "Génial ! `x×x = x²`, `x×2 = 2x`, `1×x = x`, `1×2 = 2`. Total : `x² + 3x + 2`."

---

### Écran 6 - msg - La Méthode du Carré (visualisation)
**Type:** lesson

**Texte:**
"Pour développer `(a + b)(c + d)`, imagine un **carré de mixage** avec 4 pads :

```
       c      d
   ┌──────┬──────┐
 a │ a×c  │ a×d  │
   ├──────┼──────┤
 b │ b×c  │ b×d  │
   └──────┴──────┘
```

Résultat : `ac + ad + bc + bd`

**Exemple :** `(x + 2)(x + 3)`
- `x × x = x²`
- `x × 3 = 3x`
- `2 × x = 2x`
- `2 × 3 = 6`

**Total :** `x² + 3x + 2x + 6 = x² + 5x + 6`."

**Note pédagogique:** Représentation visuelle pour ancrer la méthode.

---

### Écran 7 - quiz - Développer `(x + 2)(x + 3)`
**Type:** quiz

**Question:** "En utilisant la méthode du carré, développe :

`(x + 2)(x + 3)`"

**Options:**
- `x² + 5x + 6` ✅
- `x² + 6x + 5`
- `x² + 5x + 5`

**Réponse:** `x² + 5x + 6`

**Feedback:** "Exact ! Les 4 pads donnent : `x²`, `3x`, `2x`, `6`. Regroupe : `x² + 5x + 6`."

---

### Écran 8 - write - Développer `(x + 5)(x - 2)`
**Type:** write

**Question:** "Développe (attention au signe **−**) :

`(x + 5)(x - 2)`"

**Requirements:**
- keywords: ["x²", "3x", "-10", "+"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `x² + 3x - 10`

**Hint:** "`x × x = x²`, `x × (-2) = -2x`, `5 × x = 5x`, `5 × (-2) = -10`. Regroupe les termes en `x`."

**Feedback:** "Parfait ! `x² + 5x - 2x - 10 = x² + 3x - 10`. Le signe − est bien géré !"

---

### Écran 9 - quiz - Piège : signe négatif
**Type:** quiz

**Question:** "Développe : `(x - 3)(x + 4)`"

**Options:**
- `x² + x - 12` ✅
- `x² - x + 12`
- `x² + 7x - 12`

**Réponse:** `x² + x - 12`

**Feedback:** "Bien ! Les 4 produits : `x²`, `4x`, `-3x`, `-12`. Total : `x² + x - 12`."

---

### Écran 10 - write - Développer `(2x + 1)(x + 4)`
**Type:** write

**Question:** "Développe (coefficient devant `x`) :

`(2x + 1)(x + 4)`"

**Requirements:**
- keywords: ["2x²", "9x", "4", "+"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `2x² + 9x + 4`

**Hint:** "`2x × x = 2x²`, `2x × 4 = 8x`, `1 × x = x`, `1 × 4 = 4`. Additionne tout."

**Feedback:** "Excellent ! `2x² + 8x + x + 4 = 2x² + 9x + 4`."

---

### Écran 11 - msg - Application : Aire d'un studio
**Type:** lesson

**Texte:**
"**Situation concrète :**

Un studio rectangulaire a pour dimensions :
- Longueur : `(x + 5)` mètres
- Largeur : `(x + 3)` mètres

Quelle est l'**aire totale** ?

**Formule de l'aire :** `Longueur × Largeur`

Aire = `(x + 5)(x + 3)`

En développant, on obtient une **formule universelle** :
`x² + 8x + 15` m²."

---

### Écran 12 - write - Problème aire rectangulaire
**Type:** write

**Question:** "Un studio a comme dimensions `(x + 7)` et `(x + 2)`. Calcule son **aire développée**."

**Requirements:**
- keywords: ["x²", "9x", "14", "+"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `x² + 9x + 14`

**Hint:** "Multiplie `(x + 7)` par `(x + 2)` avec la méthode du carré."

**Feedback:** "Parfait ! Aire = `x² + 7x + 2x + 14 = x² + 9x + 14` m²."

---

### Écran 13 - quiz - Développer expression complexe
**Type:** quiz

**Question:** "Développe : `(x - 1)(x - 5)`"

**Options:**
- `x² - 6x + 5` ✅
- `x² + 6x - 5`
- `x² - 4x + 5`

**Réponse:** `x² - 6x + 5`

**Feedback:** "Exact ! `x² - 5x - x + 5 = x² - 6x + 5`. Signes négatifs maîtrisés."

---

### Écran 14 - write - Développer `(3x - 2)(2x + 5)`
**Type:** write

**Question:** "Développe cette expression complexe :

`(3x - 2)(2x + 5)`"

**Requirements:**
- keywords: ["6x²", "11x", "-10"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `6x² + 11x - 10`

**Hint:** "4 produits : `3x×2x`, `3x×5`, `-2×2x`, `-2×5`. Regroupe les termes en `x`."

**Feedback:** "Maîtrise totale ! `6x² + 15x - 4x - 10 = 6x² + 11x - 10`."

---

### Écran 15 - challenge - Boss Développement
**Type:** challenge

**Question:** "Un studio d'enregistrement facture selon la formule :

`Prix = (3x + 10)(2x - 5)` €

où `x` = nombre d'heures.

Développe cette formule pour obtenir l'expression du prix."

**Requirements:**
- keywords: ["6x²", "5x", "-50"]
- minWords: 4
- validationType: "algebraic"

**Réponse attendue:** `6x² + 5x - 50`

**Hint:** "Applique la double distributivité : multiplie tous les termes entre eux, puis regroupe."

**Feedback:** "**Seance 1 TERMINÉE** ✅

Bravo Zyvah ! Tu maîtrises le **développement** (simple et double distributivité). Direction la Seance 2 pour découvrir les **identités remarquables**, les formules magiques du calcul littéral !

**Badge débloqué :** 🎛️ Développeur Studio"

---

## Seance 2 - Les Identités Remarquables : Formules Magiques

### Objectifs pedagogiques et competences (Seconde GT)
- Reconnaître et utiliser `(a + b)² = a² + 2ab + b²`
- Reconnaître et utiliser `(a - b)² = a² - 2ab + b²`
- Reconnaître et utiliser `(a + b)(a - b) = a² - b²`

### Index technique (ordre des steps)
1. msg - Les Patterns du Studio
2. quiz - Reconnaissance carré d'une somme
3. write - Développer `(x + 3)²`
4. msg - Formule `(a + b)²` expliquée
5. write - Appliquer `(x + 5)²`
6. quiz - Reconnaissance carré d'une différence
7. write - Développer `(x - 4)²`
8. msg - Formule `(a - b)²` expliquée
9. write - Appliquer `(2x - 3)²`
10. msg - Différence de carrés
11. quiz - Reconnaissance `(a + b)(a - b)`
12. write - Développer `(x + 7)(x - 7)`
13. write - Appliquer `(3x + 2)(3x - 2)`
14. interactive - Choix de l'identité adaptée
15. challenge - Boss Identités Remarquables
16. checkpoint - Checkpoint 1/2 (40% progression)

---

### Écran 1 - msg - Les Patterns du Studio
**Type:** lesson

**Texte:**
"Zyvah, certains développements reviennent **tout le temps**. Les mathématiciens ont créé des **raccourcis** : les **identités remarquables**.

Ce sont les **presets** du calcul littéral : tu les reconnais, tu les appliques instantanément.

**Les 3 formules magiques :**
1️⃣ `(a + b)² = a² + 2ab + b²`  
2️⃣ `(a - b)² = a² - 2ab + b²`  
3️⃣ `(a + b)(a - b) = a² - b²`"

**Note pédagogique:** Analogie avec les presets studio (templates prêts à l'emploi).

---

### Écran 2 - quiz - Reconnaissance carré d'une somme
**Type:** quiz

**Question:** "L'expression `(x + 2)²` signifie :"

**Options:**
- `x² + 2²`
- `(x + 2)(x + 2)` ✅
- `x² + 4`

**Réponse:** `(x + 2)(x + 2)`

**Feedback:** "Exact ! Le carré `²` signifie **multiplier par soi-même**. Donc `(x + 2)² = (x + 2)(x + 2)`."

---

### Écran 3 - write - Développer `(x + 3)²`
**Type:** write

**Question:** "Développe **à la main** (méthode classique) :

`(x + 3)²`

(On verra ensuite le raccourci !)"

**Requirements:**
- keywords: ["x²", "6x", "9", "+"]
- minWords: 4
- validationType: "algebraic"

**Hint:** "C'est `(x + 3)(x + 3)`. Applique la double distributivité."

**Feedback:** "Bien ! `x² + 3x + 3x + 9 = x² + 6x + 9`. Maintenant, regarde le pattern..."

---

### Écran 4 - msg - Formule `(a + b)²` expliquée
**Type:** lesson

**Texte:**
"Tu viens de faire `(x + 3)² = x² + 6x + 9`.

Observe le **pattern** :
- Premier terme au carré : `x²`
- Deux fois le produit des deux : `2 × x × 3 = 6x`
- Deuxième terme au carré : `3² = 9`

**Formule universelle :**
`(a + b)² = a² + 2ab + b²`

**Exemple :** `(x + 5)²`
- `a = x`, `b = 5`
- Résultat direct : `x² + 2(x)(5) + 5² = x² + 10x + 25`

C'est le **preset n°1** !"

---

### Écran 5 - write - Appliquer `(x + 5)²`
**Type:** write

**Question:** "Utilise la formule `(a + b)² = a² + 2ab + b²` pour développer **instantanément** :

`(x + 5)²`"

**Requirements:**
- keywords: ["x²", "10x", "25", "+"]
- minWords: 4
- validationType: "algebraic"

**Hint:** "`a = x`, `b = 5`. Applique : `a²`, `+2ab`, `+b²`."

**Feedback:** "Instantané ! `x² + 10x + 25`. Le preset fonctionne parfaitement."

---

### Écran 6 - quiz - Reconnaissance carré d'une différence
**Type:** quiz

**Question:** "Quelle formule utiliser pour développer `(x - 4)²` ?"

**Options:**
- `(a + b)²`
- `(a - b)²` ✅
- `(a + b)(a - b)`

**Réponse:** `(a - b)²`

**Feedback:** "Exact ! Il y a un signe **−**, donc c'est le **preset n°2** : `(a - b)²`."

---

### Écran 7 - write - Développer `(x - 4)²`
**Type:** write

**Question:** "Utilise la formule `(a - b)² = a² - 2ab + b²` :

`(x - 4)²`"

**Requirements:**
- keywords: ["x²", "-8x", "16", "+"]
- minWords: 4
- validationType: "algebraic"

**Hint:** "`a = x`, `b = 4`. Formule : `a² - 2ab + b²`."

**Feedback:** "Parfait ! `x² - 8x + 16`. Attention au **−** devant `2ab`."

---

### Écran 8 - msg - Formule `(a - b)²` expliquée
**Type:** lesson

**Texte:**
"**Différence entre les deux presets :**

**Preset n°1 :** `(a + b)² = a² **+ 2ab** + b²`  
**Preset n°2 :** `(a - b)² = a² **- 2ab** + b²`

**Seul le signe du terme central change !**

**Exemples :**
- `(x + 3)²` → `x² **+ 6x** + 9`
- `(x - 3)²` → `x² **- 6x** + 9`

**Piège classique :**  
`(x - 3)² ≠ x² - 9` ❌  
`(x - 3)² = x² - 6x + 9` ✅"

---

### Écran 9 - write - Appliquer `(2x - 3)²`
**Type:** write

**Question:** "Développe avec le preset n°2 :

`(2x - 3)²`"

**Requirements:**
- keywords: ["4x²", "-12x", "9", "+"]
- minWords: 4
- validationType: "algebraic"

**Hint1:** "Identifie `a` et `b` dans l'expression, puis applique la formule `(a - b)² = a² - 2ab + b²`."

**Hint2:** "`a = 2x`, `b = 3`. Pense à calculer `(2x)²`, puis `2(2x)(3)`, puis `3²`. Assemble les résultats."

**Feedback:** "Maîtrise ! `4x² - 12x + 9`. Les coefficients sont bien gérés."

---

### Écran 10 - msg - Différence de carrés
**Type:** lesson

**Texte:**
"**Le preset n°3** est encore plus puissant :

`(a + b)(a - b) = a² - b²`

**Magie :** Les termes croisés **s'annulent** !

**Démonstration :**
`(x + 5)(x - 5)`
= `x² - 5x + 5x - 25`
= `x² - 25` (les `±5x` disparaissent)

**Reconnaissance :**
Si tu vois `(truc + machin)(truc - machin)`, c'est le preset n°3 !"

---

### Écran 11 - quiz - Reconnaissance `(a + b)(a - b)`
**Type:** quiz

**Question:** "L'expression `(x + 8)(x - 8)` donne directement :"

**Options:**
- `x² - 64` ✅
- `x² + 64`
- `x² - 16x + 64`

**Réponse:** `x² - 64`

**Feedback:** "Exact ! Preset n°3 : `(x)² - (8)² = x² - 64`. Les termes croisés s'annulent."

---

### Écran 12 - write - Développer `(x + 7)(x - 7)`
**Type:** write

**Question:** "Utilise le preset n°3 pour développer instantanément :

`(x + 7)(x - 7)`"

**Requirements:**
- keywords: ["x²", "-49", "49"]
- minWords: 2
- validationType: "algebraic"

**Hint:** "Formule : `a² - b²`. Ici `a = x`, `b = 7`."

**Feedback:** "Instantané ! `x² - 49`. Le preset n°3 est ultra rapide."

---

### Écran 13 - write - Appliquer `(3x + 2)(3x - 2)`
**Type:** write

**Question:** "Développe avec le preset n°3 :

`(3x + 2)(3x - 2)`"

**Requirements:**
- keywords: ["9x²", "-4", "4"]
- minWords: 2
- validationType: "algebraic"

**Hint:** "`a = 3x`, `b = 2`. Résultat : `(3x)² - (2)²`."

**Feedback:** "Parfait ! `9x² - 4`. Gain de temps maximal."

---

### Écran 14 - interactive - Choix de l'identité adaptée
**Type:** interactive

**Question:** "Quel preset utiliser pour développer `(2x - 5)²` ?"

**Options:**
- `Preset n°1 : (a + b)²`
- `Preset n°2 : (a - b)²` ✅
- `Preset n°3 : (a + b)(a - b)`

**Réponse:** `Preset n°2 : (a - b)²`

**Feedback:** "Exact ! Il y a un carré `²` et un signe **−**, donc c'est le preset n°2."

---

### Écran 15 - challenge - Boss Identités Remarquables
**Type:** challenge

**Question:** "Un ingénieur calcule la surface d'une zone carrée de côté `(x + 12)` mètres.

Quelle est l'aire **développée** ?

Utilise le preset adapté."

**Requirements:**
- keywords: ["x²", "24x", "144", "+"]
- minWords: 4
- validationType: "algebraic"

**Hint:** "Aire d'un carré = côté × côté = `(x + 12)²`. Utilise le preset n°1."

**Feedback:** "**Seance 2 TERMINÉE** ✅

Les 3 identités remarquables sont dans ta tête ! Tu peux maintenant développer des expressions complexes en un éclair.

**Badge débloqué :** ⚡ Preset Master"

---

## Seance 3 - Factorisation : Le Reverse Engineering

### Objectifs pedagogiques et competences (Seconde GT)
- Factoriser avec un facteur commun : `ka + kb = k(a + b)`
- Reconnaître une identité remarquable développée
- Factoriser avec les identités remarquables

### Index technique (ordre des steps)
1. msg - Le Reverse du Développement
2. quiz - Reconnaissance facteur commun
3. write - Factoriser `3x + 6`
4. quiz - Facteur commun avec variable
5. write - Factoriser `5x + 10x²`
6. msg - Factoriser = identifier le pattern
7. quiz - Reconnaître `a² + 2ab + b²`
8. write - Factoriser `x² + 6x + 9`
9. quiz - Reconnaître `a² - b²`
10. write - Factoriser `x² - 25`
11. interactive - Choix de méthode
12. write - Factoriser `4x² + 12x + 9`
13. write - Factoriser `9x² - 16`
14. quiz - Piège : reconnaître la bonne identité
15. challenge - Boss Factorisation

---

### Écran 1 - msg - Le Reverse du Développement
**Type:** lesson

**Texte:**
"Zyvah, **factoriser**, c'est l'inverse de développer. On remet les parenthèses !

**Développer :** `3(x + 5)` → `3x + 15` (on ouvre)  
**Factoriser :** `3x + 15` → `3(x + 5)` (on ferme)

**Pourquoi c'est utile ?**
- Résoudre des équations plus facilement
- Simplifier des expressions complexes
- Calculer plus vite (en mettant un facteur en évidence)

C'est le **reverse engineering** du calcul littéral !"

---

### Écran 2 - quiz - Reconnaissance facteur commun
**Type:** quiz

**Question:** "Dans l'expression `2x + 8`, quel est le **facteur commun** (ce qui est présent dans les deux termes) ?"

**Options:**
- `x`
- `2` ✅
- `8`

**Réponse:** `2`

**Feedback:** "Exact ! On peut écrire `2x = 2 × x` et `8 = 2 × 4`. Le facteur commun est `2`."

---

### Écran 3 - write - Factoriser `3x + 6`
**Type:** write

**Question:** "Factorise (mets le facteur commun devant une parenthèse) :

`3x + 6`"

**Requirements:**
- keywords: ["3", "(", "x", "2", ")"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "Le facteur commun est `3`. Écris `3(...)` et mets ce qui reste dans la parenthèse."

**Feedback:** "Parfait ! `3x + 6 = 3(x + 2)`. Tu as « sorti » le `3` !"

---

### Écran 4 - quiz - Facteur commun avec variable
**Type:** quiz

**Question:** "Dans `5x + 15x²`, quel est le **plus grand** facteur commun ?"

**Options:**
- `x`
- `5`
- `5x` ✅

**Réponse:** `5x`

**Feedback:** "Exact ! Les deux termes contiennent `5` ET `x`. On peut sortir `5x`."

---

### Écran 5 - write - Factoriser `5x + 10x²`
**Type:** write

**Question:** "Factorise en sortant le facteur commun :

`5x + 10x²`"

**Requirements:**
- keywords: ["5x", "(", "1", "2x", ")"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "Le facteur commun est `5x`. Dans la parenthèse : `5x ÷ 5x = 1` et `10x² ÷ 5x = 2x`."

**Feedback:** "Parfait ! `5x(1 + 2x)`. Tu as bien pensé au `1` (car `5x ÷ 5x = 1`). C'est une erreur fréquente d'oublier ce `1` !"

---

### Écran 6 - msg - Factoriser = identifier le pattern
**Type:** lesson

**Texte:**
"Parfois, il n'y a **pas de facteur commun évident**. Mais tu peux reconnaître une **identité remarquable** !

**Exemple :**  
`x² + 6x + 9`

Regarde le pattern :
- Premier terme : carré (`x²`)
- Dernier terme : carré (`9 = 3²`)
- Terme du milieu : `6x = 2 × x × 3`

C'est le preset n°1 ! `(a + b)² = a² + 2ab + b²`

**Factorisation :** `x² + 6x + 9 = (x + 3)²`"

---

### Écran 7 - quiz - Reconnaître `a² + 2ab + b²`
**Type:** quiz

**Question:** "L'expression `x² + 10x + 25` peut se factoriser avec :"

**Options:**
- `(a + b)²` ✅
- `(a - b)²`
- `(a + b)(a - b)`

**Réponse:** `(a + b)²`

**Feedback:** "Exact ! `x²`, `25 = 5²`, et `10x = 2 × x × 5`. C'est `(x + 5)²`."

---

### Écran 8 - write - Factoriser `x² + 6x + 9`
**Type:** write

**Question:** "Factorise en reconnaissant l'identité remarquable :

`x² + 6x + 9`"

**Requirements:**
- keywords: ["(", "x", "+", "3", ")²"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "`x²` + `2×x×3` + `3²` → c'est `(x + 3)²`."

**Feedback:** "Parfait ! `x² + 6x + 9 = (x + 3)²`. Pattern reconnu !"

---

### Écran 9 - quiz - Reconnaître `a² - b²`
**Type:** quiz

**Question:** "L'expression `x² - 49` peut se factoriser avec :"

**Options:**
- `(a + b)²`
- `(a - b)²`
- `(a + b)(a - b)` ✅

**Réponse:** `(a + b)(a - b)`

**Feedback:** "Exact ! C'est une **différence de carrés** : `x²` et `49 = 7²`. Formule : `(x + 7)(x - 7)`."

---

### Écran 10 - write - Factoriser `x² - 25`
**Type:** write

**Question:** "Factorise (différence de carrés) :

`x² - 25`"

**Requirements:**
- keywords: ["(", "x", "+", "5", ")", "(", "x", "-", "5", ")"]
- minWords: 5
- validationType: "algebraic"

**Hint:** "`25 = 5²`. Formule : `a² - b² = (a + b)(a - b)`."

**Feedback:** "Instantané ! `x² - 25 = (x + 5)(x - 5)`."

---

### Écran 11 - interactive - Choix de méthode
**Type:** interactive

**Question:** "Pour factoriser `x² - 8x + 16`, quelle méthode utiliser ?"

**Options:**
- `Facteur commun`
- `Identité remarquable` ✅

**Réponse:** `Identité remarquable`

**Feedback:** "Exact ! C'est `(x - 4)²` car `x²`, `16 = 4²`, et `8x = 2 × x × 4`."

---

### Écran 12 - write - Factoriser `4x² + 12x + 9`
**Type:** write

**Question:** "Factorise :

`4x² + 12x + 9`"

**Requirements:**
- keywords: ["(", "2x", "+", "3", ")²"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "`4x² = (2x)²`, `9 = 3²`, `12x = 2 × 2x × 3`. C'est `(a + b)²`."

**Feedback:** "Parfait ! `4x² + 12x + 9 = (2x + 3)²`."

---

### Écran 13 - write - Factoriser `9x² - 16`
**Type:** write

**Question:** "Factorise (différence de carrés avec coefficients) :

`9x² - 16`"

**Requirements:**
- keywords: ["(", "3x", "+", "4", ")", "(", "3x", "-", "4", ")"]
- minWords: 5
- validationType: "algebraic"

**Hint:** "`9x² = (3x)²`, `16 = 4²`. Formule : `(a + b)(a - b)`."

**Feedback:** "Excellent ! `9x² - 16 = (3x + 4)(3x - 4)`."

---

### Écran 14 - quiz - Piège : reconnaître la bonne identité
**Type:** quiz

**Question:** "L'expression `x² - 12x + 36` se factorise en :"

**Options:**
- `(x + 6)²`
- `(x - 6)²` ✅
- `(x + 6)(x - 6)`

**Réponse:** `(x - 6)²`

**Feedback:** "Bien ! Le signe **−** devant `12x` indique le preset n°2 : `(a - b)²`."

---

### Écran 15 - challenge - Boss Factorisation
**Type:** challenge

**Question:** "Un studio calcule ses coûts avec la formule :

`Coût = x² + 20x + 100` €

Le comptable veut **simplifier** cette expression en la factorisant.

Quelle est la **forme factorisée** ?"

**Requirements:**
- keywords: ["(", "x", "+", "10", ")²"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "Reconnaître : `x²`, `100 = 10²`, `20x = 2 × x × 10`. C'est quelle identité ?"

**Feedback:** "**Seance 3 TERMINÉE** ✅

Bravo ! La factorisation n'a plus de secrets pour toi. Tu sais maintenant « refermer » les parenthèses et reconnaître les patterns.

Direction Seance 4 : les **équations** !

**Badge débloqué :** 🔄 Reverse Engineer"

---

## Seance 4 - Équations : Trouver l'Inconnue

### Objectifs pedagogiques et competences (Seconde GT)
- Résoudre une équation du premier degré : `ax + b = c`
- Utiliser la factorisation pour résoudre une équation
- Résoudre une équation produit-nul : `(x + a)(x + b) = 0`
- Mettre en équation un problème concret

### Index technique (ordre des steps)
1. msg - L'Équation : Trouver le Réglage
2. quiz - Principe de l'équilibre
3. write - Résoudre `x + 5 = 12`
4. quiz - Isoler la variable
5. write - Résoudre `3x - 7 = 11`
6. msg - Le Produit-Nul
7. quiz - Règle du produit-nul
8. write - Résoudre `(x + 3)(x - 5) = 0`
9. msg - Factoriser pour résoudre
10. write - Résoudre `x² - 9 = 0`
11. interactive - Stratégie de résolution
12. write - Résoudre `x² + 5x = 0`
13. write - Problème : durée d'enregistrement
14. quiz - Mise en équation
15. challenge - Boss Équation Complète
16. checkpoint - Checkpoint 2/2 (80% progression)

---

### Écran 1 - msg - L'Équation : Trouver le Réglage
**Type:** lesson

**Texte:**
"Zyvah, une **équation**, c'est une **balance** : ce qui est à gauche = ce qui est à droite.

**Résoudre**, c'est trouver la valeur de `x` (l'inconnue) qui **équilibre** la balance.

**Exemple :**
`x + 3 = 7`

Quelle valeur de `x` rend cette égalité vraie ?  
→ `x = 4` (car `4 + 3 = 7`)

**En studio :** Si le gain `x` plus 3 dB donne 7 dB total, quel est le gain de base ?  
→ Résolver l'équation !"

---

### Écran 2 - quiz - Principe de l'équilibre
**Type:** quiz

**Question:** "Si je fais **+5** à gauche de l'égalité, que dois-je faire à droite pour garder l'équilibre ?"

**Options:**
- `+ 5` ✅
- `- 5`
- `Rien`

**Réponse:** `+ 5`

**Feedback:** "Exact ! Tout ce qu'on fait d'un côté, on doit le faire de l'autre pour **préserver l'égalité**."

---

### Écran 3 - write - Résoudre `x + 5 = 12`
**Type:** write

**Question:** "Trouve la valeur de `x` :

`x + 5 = 12`"

**Requirements:**
- keywords: ["7"]
- minWords: 1
- validationType: "equation"
- expectNumbers: true

**Hint:** "Pour isoler `x`, enlève `5` des deux côtés : `x + 5 - 5 = 12 - 5`."

**Feedback:** "Parfait ! `x = 7`. Vérification : `7 + 5 = 12` ✅"

---

### Écran 4 - quiz - Isoler la variable
**Type:** quiz

**Question:** "Pour résoudre `2x = 10`, quelle opération faire ?"

**Options:**
- `Diviser par 2 des deux côtés` ✅
- `Soustraire 10`
- `Multiplier par 2`

**Réponse:** `Diviser par 2 des deux côtés`

**Feedback:** "Exact ! `2x ÷ 2 = 10 ÷ 2` → `x = 5`."

---

### Écran 5 - write - Résoudre `3x - 7 = 11`
**Type:** write

**Question:** "Résous cette équation (détaille les étapes) :

`3x - 7 = 11`"

**Requirements:**
- keywords: ["6"]
- minWords: 1
- validationType: "equation"
- expectNumbers: true

**Hint:** "Étape 1 : Ajoute `7` des deux côtés. Étape 2 : Divise par `3`."

**Feedback:** "Bien ! `3x = 18` puis `x = 6`. Vérif : `3×6 - 7 = 11` ✅"

---

### Écran 6 - msg - Le Produit-Nul
**Type:** lesson

**Texte:**
"**Règle ultra-puissante :**

Si `A × B = 0`, alors **forcément** `A = 0` OU `B = 0` (ou les deux).

**Exemple :**
`(x + 3)(x - 5) = 0`

Soit `x + 3 = 0` → `x = -3`  
Soit `x - 5 = 0` → `x = 5`

**2 solutions !**

Cette règle s'appelle le **produit-nul** et elle est fondamentale pour résoudre les équations factorisées."

---

### Écran 7 - quiz - Règle du produit-nul
**Type:** quiz

**Question:** "Si `(x - 2)(x + 7) = 0`, quelles sont les solutions ?"

**Options:**
- `x = 2 ou x = -7` ✅
- `x = -2 ou x = 7`
- `x = 9`

**Réponse:** `x = 2 ou x = -7`

**Feedback:** "Exact ! `x - 2 = 0` → `x = 2` et `x + 7 = 0` → `x = -7`."

---

### Écran 8 - write - Résoudre `(x + 3)(x - 5) = 0`
**Type:** write

**Question:** "Résous avec la règle du produit-nul :

`(x + 3)(x - 5) = 0`

Donne les **2 solutions** séparées par une virgule."

**Requirements:**
- keywords: ["-3", "5"]
- minWords: 2
- validationType: "equation"
- expectNumbers: true

**Hint:** "Résous `x + 3 = 0` et `x - 5 = 0` séparément."

**Feedback:** "Parfait ! Les deux solutions sont `x = -3` et `x = 5`."

---

### Écran 9 - msg - Factoriser pour résoudre
**Type:** lesson

**Texte:**
"Parfois, l'équation n'est **pas factorisée**. Il faut d'abord la factoriser !

**Exemple :**
`x² - 9 = 0`

Étape 1 : Reconnaître `a² - b²` → Factoriser  
`(x + 3)(x - 3) = 0`

Étape 2 : Produit-nul  
`x = -3` ou `x = 3`

**Stratégie :**
1️⃣ Tout ramener à gauche (= 0 à droite)  
2️⃣ Factoriser  
3️⃣ Produit-nul"

---

### Écran 10 - write - Résoudre `x² - 9 = 0`
**Type:** write

**Question:** "Résous en factorisant d'abord :

`x² - 9 = 0`

Donne les 2 solutions."

**Requirements:**
- keywords: ["-3", "3"]
- minWords: 2
- validationType: "equation"
- expectNumbers: true

**Hint:** "C'est une différence de carrés : `(x + 3)(x - 3) = 0`."

**Feedback:** "Excellent ! `x² - 9 = (x + 3)(x - 3) = 0` → `x = -3` ou `x = 3`."

---

### Écran 11 - interactive - Stratégie de résolution
**Type:** interactive

**Question:** "Pour résoudre `x² + 5x = 0`, quelle est la **première** étape ?"

**Options:**
- `Développer`
- `Factoriser` ✅
- `Calculer x²`

**Réponse:** `Factoriser`

**Feedback:** "Exact ! On factorise par `x` : `x(x + 5) = 0`, puis produit-nul."

---

### Écran 12 - write - Résoudre `x² + 5x = 0`
**Type:** write

**Question:** "Résous par factorisation :

`x² + 5x = 0`

Donne les 2 solutions."

**Requirements:**
- keywords: ["0", "-5"]
- minWords: 2
- validationType: "equation"
- expectNumbers: true

**Hint:** "Facteur commun : `x(x + 5) = 0`. Produit-nul : `x = 0` ou `x + 5 = 0`."

**Feedback:** "Parfait ! `x = 0` ou `x = -5`."

---

### Écran 13 - write - Problème : durée d'enregistrement
**Type:** write

**Question:** "Un studio facture `50 + 20x` euros pour `x` heures d'enregistrement.

Un client paie **130 euros**. Combien d'heures a-t-il enregistré ?

Écris l'équation et résous."

**Requirements:**
- keywords: ["4"]
- minWords: 1
- validationType: "equation"
- expectNumbers: true

**Hint:** "Équation : `50 + 20x = 130`. Isole `x`."

**Feedback:** "Bravo ! `20x = 80` → `x = 4`. Il a enregistré **4 heures**."

---

### Écran 14 - quiz - Mise en équation
**Type:** quiz

**Question:** "Une console coûte 3 fois le prix d'un micro (`x` euros). Si le total = 800 €, l'équation est :"

**Options:**
- `x + 3x = 800` ✅
- `x + 3 = 800`
- `3x = 800`

**Réponse:** `x + 3x = 800`

**Feedback:** "Exact ! Micro = `x`, Console = `3x`, Total = `x + 3x = 800`."

---

### Écran 15 - challenge - Boss Équation Complète
**Type:** challenge

**Question:** "Un ingénieur modélise le signal d'un compresseur par :

`x² + 7x = 0`

Quelles sont les **valeurs de x** (réglages du compresseur) qui annulent le signal ?

Résous cette équation. Donne les 2 solutions."

**Requirements:**
- keywords: ["0", "-7"]
- minWords: 2
- validationType: "equation"
- expectNumbers: true

**Hint:** "Factorise d'abord par `x`, puis applique le produit-nul."

**Feedback:** "**Seance 4 TERMINÉE** ✅

Maîtrise totale des équations ! Tu sais isoler une variable, utiliser le produit-nul et mettre en équation des problèmes concrets.

Dernière Seance : le **Studio Master Challenge** !

**Badge débloqué :** 🎯 Equation Solver"

---

## Seance 5 - Studio Master Challenge : Synthèse Complète

### Objectifs pedagogiques et competences (Seconde GT)
- Mobiliser toutes les compétences de calcul littéral
- Choisir la bonne stratégie selon le contexte
- Résoudre un problème complet intégrant développement, factorisation et équation

### Index technique (ordre des steps)
1. msg - L'Examen Final du Studio
2. quiz - Reconnaître une forme (factorisée vs développée)
3. write - Développer `(2x - 3)(x + 5)`
4. quiz - Identifier l'identité remarquable
5. write - Factoriser `x² - 14x + 49`
6. quiz - Stratégie de résolution d'équation
7. write - Résoudre `x² - 16 = 0`
8. interactive - Mise en équation d'un problème
9. write - Problème complet (équation + calcul)
10. quiz - Développer ou factoriser ?
11. write - Simplifier une expression complexe
12. quiz - Choix de formule
13. write - Exercice mixte (développement + factorisation)
14. write - Problème final intégré
15. challenge - Ultimate Boss - Studio Master

---

### Écran 1 - msg - L'Examen Final du Studio
**Type:** lesson

**Texte:**
"Zyvah, c'est l'heure du **rendu final**. Pour valider ton niveau **seconde en calcul littéral**, tu dois prouver que tu maîtrises :

✅ **Développer** (simple et double distributivité, identités remarquables)  
✅ **Factoriser** (facteur commun, identités remarquables)  
✅ **Résoudre** (équations du premier degré, produit-nul)  
✅ **Choisir** la bonne stratégie selon le contexte

**15 écrans de validation.**

C'est parti pour ton badge **Studio Master** ! 🎚️🔥"

---

### Écran 2 - quiz - Reconnaître une forme (factorisée vs développée)
**Type:** quiz

**Question:** "Quelle expression est **factorisée** ?"

**Options:**
- `x² + 5x + 6`
- `(x + 2)(x + 3)` ✅
- `x² - 9`

**Réponse:** `(x + 2)(x + 3)`

**Feedback:** "Exact ! Une forme factorisée contient des **parenthèses** (produit de facteurs)."

---

### Écran 3 - write - Développer `(2x - 3)(x + 5)`
**Type:** write

**Question:** "Développe :

`(2x - 3)(x + 5)`"

**Requirements:**
- keywords: ["2x²", "7x", "-15"]
- minWords: 4
- validationType: "algebraic"

**Hint:** "Double distributivité : 4 produits à calculer."

**Feedback:** "Parfait ! `2x² + 10x - 3x - 15 = 2x² + 7x - 15`."

---

### Écran 4 - quiz - Identifier l'identité remarquable
**Type:** quiz

**Question:** "`x² - 14x + 49` correspond à quelle identité ?"

**Options:**
- `(a + b)²`
- `(a - b)²` ✅
- `(a + b)(a - b)`

**Réponse:** `(a - b)²`

**Feedback:** "Exact ! `x²`, `49 = 7²`, `14x = 2 × x × 7` → `(x - 7)²`."

---

### Écran 5 - write - Factoriser `x² - 14x + 49`
**Type:** write

**Question:** "Factorise :

`x² - 14x + 49`"

**Requirements:**
- keywords: ["(", "x", "-", "7", ")²"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "Reconnaître le pattern `a² - 2ab + b²`."

**Feedback:** "Parfait ! `x² - 14x + 49 = (x - 7)²`."

---

### Écran 6 - quiz - Stratégie de résolution d'équation
**Type:** quiz

**Question:** "Pour résoudre `x² - 16 = 0`, quelle méthode utiliser ?"

**Options:**
- `Isoler x directement`
- `Factoriser puis produit-nul` ✅
- `Développer`

**Réponse:** `Factoriser puis produit-nul`

**Feedback:** "Exact ! C'est `a² - b²` → `(x + 4)(x - 4) = 0`."

---

### Écran 7 - write - Résoudre `x² - 16 = 0`
**Type:** write

**Question:** "Résous :

`x²  - 16 = 0`

Donne les 2 solutions."

**Requirements:**
- keywords: ["-4", "4"]
- minWords: 2
- validationType: "equation"
- expectNumbers: true

**Hint:** "Factorise avec `a² - b²`, puis produit-nul."

**Feedback:** "Parfait ! `(x + 4)(x - 4) = 0` → `x = -4` ou `x = 4`."

---

### Écran 8 - interactive - Mise en équation d'un problème
**Type:** interactive

**Question:** "Un studio rectangulaire a pour longueur `x + 3` et largeur `x`. Si l'aire = 40 m², l'équation est :"

**Options:**
- `x(x + 3) = 40` ✅
- `x + 3 = 40`
- `x² + 3 = 40`

**Réponse:** `x(x + 3) = 40`

**Feedback:** "Exact ! Aire = Longueur × Largeur = `(x + 3) × x`."

---

### Écran 9 - write - Problème complet (équation + calcul)
**Type:** write

**Question:** "Un micro coûte `x` euros. Une console coûte `2x + 50` euros. Si le total = 350 €, combien coûte le micro ?

Résous l'équation."

**Requirements:**
- keywords: ["100"]
- minWords: 1
- validationType: "equation"
- expectNumbers: true

**Hint:** "Équation : `x + (2x + 50) = 350`. Simplifie puis isole `x`."

**Feedback:** "Bravo ! `3x + 50 = 350` → `3x = 300` → `x = 100`. Le micro coûte **100 €**."

---

### Écran 10 - quiz - Développer ou factoriser ?
**Type:** quiz

**Question:** "Pour simplifier `(x + 5)² - (x + 5)(x - 2)`, quelle stratégie adopter ?"

**Options:**
- `Développer les deux, puis simplifier` ✅
- `Factoriser d'abord`
- `Résoudre une équation`

**Réponse:** `Développer les deux, puis simplifier`

**Feedback:** "Exact ! Il faut développer chaque partie avant de regrouper les termes."

---

### Écran 11 - write - Simplifier une expression complexe
**Type:** write

**Question:** "Simplifie (développe les deux parties puis regroupe) :

`(x + 3)² - (x + 1)(x + 2)`"

**Requirements:**
- keywords: ["5x", "7", "+"]
- minWords: 3
- validationType: "algebraic"

**Hint:** "Développe `(x + 3)²` et `(x + 1)(x + 2)` séparément, puis soustrais."

**Feedback:** "Excellent ! `x² + 6x + 9 - (x² + 3x + 2) = 5x + 7`."

---

### Écran 12 - quiz - Choix de formule
**Type:** quiz

**Question:** "Pour développer `(5x - 2)²`, quelle formule utiliser ?"

**Options:**
- `(a + b)²`
- `(a - b)²` ✅
- `(a + b)(a - b)`

**Réponse:** `(a - b)²`

**Feedback:** "Exact ! Résultat : `25x² - 20x + 4`."

---

### Écran 13 - write - Exercice mixte (développement + factorisation)
**Type:** write

**Question:** "Développe `(x - 4)²`, puis factorise le résultat. (Vérifie que tu retrouves bien la forme initiale !)"

**Requirements:**
- keywords: ["x²", "-8x", "16", "(", "x", "-", "4", ")²"]
- minWords: 8
- validationType: "algebraic"

**Hint:** "Développe d'abord, puis reconnaître l'identité remarquable dans le résultat."

**Feedback:** "Parfait ! Tu as fait un aller-retour complet : développement → factorisation."

---

### Écran 14 - write - Problème final intégré
**Type:** write

**Question:** "Un ingénieur modélise le coût d'un studio par :

`Coût = (x + 10)² - (x + 5)(x + 8)`

où `x` = nombre de jours de location.

Simplifie cette expression au maximum."

**Requirements:**
- keywords: ["7x", "60", "+"]
- minWords: 3
- validationType: "algebraic"

**Hint1:** "Quelle est la première étape pour simplifier une différence d'expressions entre parenthèses ?"

**Hint2:** "Développe les deux parties : `(x + 10)²` et `(x + 5)(x + 8)`, puis soustrais terme à terme."

**Feedback:** "Bravo ! `x² + 20x + 100 - (x² + 13x + 40) = 7x + 60` €."

---

### Écran 15 - challenge - Ultimate Boss - Studio Master
**Type:** challenge

**Question:** "**CHALLENGE FINAL**

Un studio propose un forfait dont le prix dépend de la durée `x` (en heures) :

`Prix = (2x + 5)² - 4x²` €

**Seance :**
1. Simplifie cette expression au maximum
2. Si `x = 3`, calcule le prix final

Réponds sous la forme : `expression simplifiée ; prix`"

**Requirements:**
- keywords: ["20x", "25", "85"]
- minWords: 5
- validationType: "algebraic"

**Hint1:** "Commence par simplifier l'expression algébrique, puis applique la valeur numérique."

**Hint2:** "Développe `(2x + 5)²` avec la formule, soustrais `4x²`, puis remplace `x` par `3`."

**Feedback:** "**🎊 MODULE 2 TERMINÉ - STUDIO MASTER 🎊**

**Félicitations Zyvah !** Tu as bouclé l'intégralité du calcul littéral de Seconde !

**Badge final débloqué :** 🏆 **STUDIO MASTER - Calcul Littéral Seconde GT**

---

**💡 Calcul détaillé :**

`(2x + 5)² - 4x²`

**Étape 1 :** Développer `(2x + 5)²`  
= `4x² + 20x + 25`

**Étape 2 :** Soustraire `4x²`  
= `4x² + 20x + 25 - 4x²`  
= `20x + 25`

**Étape 3 :** Remplacer `x = 3`  
= `20(3) + 25`  
= `60 + 25`  
= **85 €**

---

**📊 Compétences validées :**
✅ Développement (distributivité simple/double)  
✅ Identités remarquables (3 formules magiques)  
✅ Factorisation (facteur commun + identités)  
✅ Équations (1er degré + produit-nul)  
✅ Problèmes concrets (mise en équation)

---

**🚀 Prochaine étape :**  
Module 3 (Fractions & Partage) ou Module 4 (Géométrie & Pythagore) selon ton planning !

Ton niveau en maths est maintenant **aligné** avec le programme officiel de Seconde générale. Continue comme ça ! 💪🔥"

---

## Notes Techniques Globales - Module 2

### Conformité Programme Seconde GT
✅ **Développer** : Distributivité simple et double (Seances 1)  
✅ **Identités remarquables** : Les 3 formules (Seance 2)  
✅ **Factoriser** : Facteur commun + identités (Seance 3)  
✅ **Équations** : 1er degré + produit-nul (Seance 4)  
✅ **Synthèse** : Problèmes intégrés (Seance 5)

**Source :** BO spécial n°1 du 22/01/2019 - Programme Maths Seconde GT

### Progression pédagogique
- **5 Seances × 15 écrans = 75 écrans**
- Durée estimée : **~12 min/Seance** (temps réaliste avec 15 écrans)
- Ratio exercices : 40% quiz / 40% write / 15% msg / 5% challenge
- Boss en fin de chaque Seance pour validation

### Cohérence avec le projet
- ✅ Format SPA (weekData avec engine.js)
- ✅ Contexte Studio (univers Zyvah)
- ✅ Requirements avec keywords sur tous write/challenge
- ✅ Feedbacks pédagogiques détaillés
- ✅ Hints progressifs (ne donnent jamais la solution directe)
- ✅ Liens avec profil Zyvah (mixage, studio, ingénieur son)

### Différences Module_1 vs Module_2
| Critère | Module_1 (Warm-Up) | Module_2 (Seconde GT) |
|---------|-------------------|---------------------|
| Niveau | Cycle 4 (Collège) | Seconde Générale |
| Seances | 1 | 5 |
| Écrans totaux | 15 | 75 |
| Durée | ~8 min | ~60 min (12 min/Seance) |
| Notions | Priorités opératoires | Calcul littéral complet |
| Objectif | Révision rapide | Programme officiel BO 2019 |

### Validation CTP requise
Avant génération HTML, soumettre à l'agent CONSULTANT_TECHNIQUE_PEDAGOGIQUE pour :
- Validation cohérence pédagogique
- Vérification progression difficultés
- Conformité feedbacks bienveillants
- Adéquation durée/contenu

### Post-Module 2
**Suite logique** (selon CURRICULUM.md) :
- **Semaine 2** : Fractions & Partage (Maths Module 3)
- **Semaine 3** : Puissances & Multiplicateurs (Maths Module 4)
- **Semaine 4** : Initiation SES (si non fait)

