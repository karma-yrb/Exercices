# Demande de Revue CTP : Zyvah Maths Modules 1 & 2

## Contexte
**Profil :** Zyvah (Seconde Générale)  
**Matière :** Mathématiques  
**Documents sources :**
- [docs/modules/zyvah_maths_module_1_v2.md](../docs/modules/zyvah_maths_module_1_v2.md) (Révision rapide - 1 mission)
- [docs/modules/zyvah_maths_module_2.md](../docs/modules/zyvah_maths_module_2.md) (Calcul littéral - 5 missions)

**Validation curriculaire :** ✅ Effectuée par agent Prof Maths & Sciences (2nde)
- Conformité avec BO spécial n°1 du 22/01/2019 (Programme Maths Seconde GT)

---

## Module_1 v2 : Studio Warm-Up (Révision Rapide)

### Caractéristiques techniques
- **Missions :** 1
- **Écrans :** 15
- **Durée cible :** ~8 min
- **Niveau :** Révision Cycle 4 (warm-up avant Seconde)
- **Objectif pédagogique :** Consolider les priorités opératoires (parenthèses, multiplication/division, lecture gauche→droite)

### Types d'exercices
- **msg :** 3 écrans (leçons explicatives)
- **quiz :** 7 écrans (QCM)
- **write :** 4 écrans (saisie libre avec keywords)
- **challenge :** 1 écran (Boss final)

### Validation technique - Points à vérifier

#### 1. Requirements (write/challenge)
Tous les exercices write/challenge ont des `Requirements` avec `keywords` ou `minWords`.

**Exemples :**
```markdown
# Écran 3 - write
Requirements:
- keywords: ["5"]
- minWords: 1
```

```markdown
# Écran 15 - challenge
Requirements:
- keywords: ["35"]
- minWords: 1
```

**Question CTP :** Les keywords uniques type `["5"]` ou `["35"]` sont-ils suffisamment robustes ? Faut-il ajouter des variantes type `["5", "cinq"]` ?

---

#### 2. Tolérance de validation (Maths niveau Collège)
Pour un élève de Seconde faisant une révision rapide :
- Tolérance sur format réponse : accepter `5`, `5.0`, `cinq` ?
- Tolérance sur espaces : `x² + 5x + 6` vs `x²+5x+6`

**Question CTP :** Quel niveau d'exigence pour un warm-up de révision ? (rappel : ce n'est PAS le contenu principal)

---

#### 3. Feedbacks
Tous les feedbacks sont encourageants et techniques (style studio).

**Exemple Écran 15 (Boss) :**
> "**WARM-UP TERMINÉ** ✅  
> Bien joué Zyvah ! Les bases sont solides. Maintenant, direction le **Module 2** pour attaquer le **vrai calcul littéral de Seconde** : développement, identités remarquables, factorisation et équations."

**Question CTP :** Le niveau de célébration est-il adapté pour un simple warm-up ? Faut-il modérer ?

---

#### 4. Hints progressifs
Tous les hints donnent une indication sans solution directe.

**Exemple Écran 13 :**
> Question: "Calcule : `10 × (15 - 5) + 5`"  
> Hint: "Étape 1 : Parenthèse. Étape 2 : Multiplication. Étape 3 : Addition."

**Question CTP :** Les hints sont-ils assez guidants pour un élève en difficulté sans être des solutions déguisées ?

---

## Module_2 : Studio Maths - Calcul Littéral (Seconde)

### Caractéristiques techniques
- **Missions :** 5
- **Écrans totaux :** 75 (15 par mission)
- **Durée cible :** ~12 min/mission (~60 min total)
- **Niveau :** Seconde Générale (Programme officiel BO 2019)
- **Objectifs pédagogiques :**
  1. Développer (distributivité simple/double)
  2. Identités remarquables (les 3 formules)
  3. Factoriser (facteur commun + identités)
  4. Équations (1er degré + produit-nul)
  5. Synthèse complète

### Répartition exercices
| Type | Nombre | % |
|------|--------|---|
| msg | 11 | 15% |
| quiz | 30 | 40% |
| write | 28 | 37% |
| interactive | 5 | 7% |
| challenge | 5 | 7% |

### Validation technique - Points critiques

#### 1. Requirements complexes (expressions algébriques)

**Mission 1 - Écran 5 (développement double distributivité) :**
```markdown
Question: "Développe : `(x + 1)(x + 2)`"

Requirements:
- keywords: ["x²", "3x", "2", "+"]
- minWords: 4

Réponse attendue: `x² + 3x + 2` (accepter aussi `x² + 2x + x + 2`)
```

**Problèmes potentiels :**
1. **Ordre des termes :** `x² + 3x + 2` vs `2 + 3x + x²` (mathématiquement équivalent)
2. **Espaces :** `x²+3x+2` vs `x² + 3x + 2`
3. **Simplification :** `x² + 2x + x + 2` (non simplifié) vs `x² + 3x + 2` (simplifié)
4. **Multiplication implicite :** `3x` vs `3*x` vs `3 x`

**Question CTP :**
- Faut-il implémenter une validation "smart" qui reconnaît les termes (parsing algébrique) ?
- Ou se limiter à des keywords stricts avec plusieurs variantes acceptées ?
- Quel fallback si l'élève écrit `x² + 2x + 1x + 2` (erreur de simplification mais méthode correcte) ?

**Proposition Architecte :**
Validation par keywords **+ normalisation** :
```javascript
function normalizeAlgebraic(str) {
  return str.toLowerCase()
    .replace(/\s+/g, '') // Vire espaces
    .replace(/\*/g, '')  // Vire *
    .replace(/\^/g, '²')  // Normalise puissances
}

Expected variants: [
  "x²+3x+2", 
  "x²+2x+x+2",
  "2+3x+x²"
]
```

---

#### 2. Mission 2 - Identités remarquables

**Écran 5 (appliquer formule) :**
```markdown
Question: "Utilise la formule `(a + b)² = a² + 2ab + b²` :  
`(x + 5)²`"

Requirements:
- keywords: ["x²", "10x", "25", "+"]
- minWords: 4
```

**Problèmes potentiels :**
1. Élève écrit `x^2 + 10x + 25` (notation puissance avec `^`)
2. Élève écrit `xx + 10x + 25` (double lettre au lieu de carré)
3. Élève oublie le `+` final mais écrit `x² + 10x + 25` (sans + avant 25)

**Question CTP :**
- Comment gérer les notations de puissances variées (`x²`, `x^2`, `x**2`) ?
- Faut-il un message d'aide spécifique "Utilise ² pour les carrés" ?

---

#### 3. Mission 3 - Factorisation (notation avec parenthèses)

**Écran 3 :**
```markdown
Question: "Factorise : `3x + 6`"

Requirements:
- keywords: ["3", "(", "x", "+", "2", ")"]
- minWords: 3

Réponse attendue: `3(x + 2)`
```

**Problèmes potentiels :**
1. Espaces dans parenthèses : `3(x+2)` vs `3 (x + 2)` vs `3( x + 2 )`
2. Ordre : `(x + 2) × 3` (mathématiquement valide)
3. Multiplication explicite : `3 * (x + 2)`

**Question CTP :**
- Accepter l'ordre inversé `(x + 2) × 3` ?
- Comment gérer les espaces dans les parenthèses (normalisation) ?

---

#### 4. Mission 4 - Équations (solutions multiples)

**Écran 8 :**
```markdown
Question: "Résous : `(x + 3)(x - 5) = 0`  
Donne les **2 solutions** séparées par une virgule."

Requirements:
- keywords: ["-3", "5"]
- minWords: 2

Réponse attendue: `-3, 5` (accepter aussi `5, -3` ou `x = -3 ou x = 5`)
```

**Problèmes potentiels :**
1. Séparateurs : `-3, 5` vs `-3; 5` vs `-3 et 5`
2. Format avec `x=` : `x=-3, x=5` vs `-3, 5`
3. Ordre : `-3, 5` vs `5, -3`
4. Mots : `x = moins trois ou x = cinq`

**Question CTP :**
- Quelle normalisation pour les solutions multiples ?
- Faut-il parser `x=` ou simplement détecter les nombres ?

**Proposition Architecte :**
```javascript
function extractNumbers(str) {
  return str.match(/-?\d+/g); // Extrait tous les nombres (y compris négatifs)
}

// Accepter si les deux nombres attendus sont présents (peu importe l'ordre)
```

---

#### 5. Durée et densité cognitive

**Calcul théorique :**
- 75 écrans × ~30-60 sec/écran = **37 à 75 minutes**
- Durée cible annoncée : **60 min** (~12 min/mission)

**Ratio exercices complexes :**
- Write (expressions algébriques) : **28** écrans (37%)
- Write nécessitant développement/factorisation : **~15** écrans

**Question CTP :**
- La charge cognitive est-elle adaptée pour un élève de Seconde en autonomie ?
- Faut-il prévoir des **checkpoints de pause** (ex: toutes les 3 missions) ?
- Le ratio write/quiz est-il équilibré ou trop exigeant ?

---

#### 6. Feedbacks et encouragement

**Mission 5 - Écran 15 (Boss final) :**
```markdown
Feedback: "🎊 MODULE 2 TERMINÉ - STUDIO MASTER 🎊

Félicitations Zyvah !

Tu maîtrises maintenant **tout le calcul littéral de Seconde** :
✅ Développement (simple et double distributivité)
✅ Identités remarquables (les 3 formules magiques)
✅ Factorisation (facteur commun + identités)
✅ Équations (1er degré + produit-nul)
✅ Problèmes concrets (mise en équation et résolution)

**Badge final débloqué :** 🏆 **STUDIO MASTER - Calcul Littéral Seconde GT**"
```

**Question CTP :**
- La célébration finale est-elle proportionnée à l'effort (60 min de travail) ?
- Le récapitulatif de compétences est-il utile pédagogiquement ?

---

#### 7. Hints et guidage progressif

**Mission 1 - Écran 10 :**
```markdown
Question: "Développe : `(2x + 1)(x + 4)`"
Hint: "`2x × x = 2x²`, `2x × 4 = 8x`, `1 × x = x`, `1 × 4 = 4`. Additionne tout."
```

**Question CTP :**
- Le hint donne-t-il **trop** d'information (détaille les 4 produits) ?
- Faut-il un système de hints à **2 niveaux** (indice léger → indice détaillé après 2e échec) ?

---

## Points d'attention généraux (Module 1 + 2)

### 1. Normalisation des réponses mathématiques
**Recommandation Architecte :**
Créer une fonction `normalizeMath(str)` dans `engine.js` :
```javascript
function normalizeMath(text) {
  return text.toLowerCase()
    .replace(/\s+/g, '')      // Vire espaces
    .replace(/\*/g, '')       // Vire *
    .replace(/\^2/g, '²')     // Normalise puissances
    .replace(/\*\*/g, '²')    // Python/JS style
    .replace(/xx/g, 'x²')     // Double lettre
    .trim();
}
```

**Question CTP :** Cette fonction est-elle suffisante ou faut-il un vrai parser algébrique (type algebra.js) ?

---

### 2. Tolérance par niveau
**Proposition :**
- **Module_1 (révision Cycle 4)** : Tolérance **haute** (focus sur la compréhension)
  - Accepter variantes de notation
  - Accepter résultats non simplifiés si correctement calculés
  
- **Module_2 (Seconde GT)** : Tolérance **modérée** (exigence progressive)
  - Exiger notation standard `x²` (pas `x^2`)
  - Exiger simplification des expressions
  - Accepter ordre différent des termes

**Question CTP :** Validez-vous cette graduation ?

---

### 3. Fallback et messages d'erreur
**Proposition :**
Si la validation keyword échoue mais que l'élève a écrit "quelque chose de mathématique" :
```javascript
if (!keywordsMatch && containsMathSymbols(userAnswer)) {
  return {
    correct: false,
    hint: "Ta réponse contient des symboles mathématiques, mais le format attendu est différent. Vérifie la notation (utilise ² pour les carrés, + entre les termes)."
  };
}
```

**Question CTP :** Ce type de feedback intermédiaire est-il utile ou source de confusion ?

---

### 4. Validation par Prof Maths
**Avant génération HTML, soumettre les drafts à l'agent Prof Maths & Sciences (2nde) pour :**
- Vérification cohérence mathématique
- Validation des hints (ni trop ni trop peu)
- Confirmité notations standard Seconde

**Question CTP :** Faut-il une double validation (CTP technique + Prof Maths contenu) ?

---

## Synthèse des questions CTP

### Validation technique
1. ✅ **Requirements :** Tous présents avec keywords
2. ❓ **Normalisation :** Quelle fonction de normalisation pour expressions algébriques ?
3. ❓ **Parsing :** Faut-il un parser algébrique ou keywords stricts suffisent ?
4. ❓ **Ordre des termes :** Accepter `x² + 3x + 2` et `2 + 3x + x²` ?
5. ❓ **Solutions multiples :** Comment gérer `-3, 5` vs `5, -3` vs `x=-3 ou x=5` ?

### Pédagogie & Expérience
6. ❓ **Durée :** 60 min adaptées pour autonomie Seconde ?
7. ❓ **Checkpoints :** Prévoir des pauses entre missions ?
8. ❓ **Hints :** Niveau 1 + Niveau 2 après échecs répétés ?
9. ❓ **Feedbacks :** Célébration proportionnée à l'effort ?
10. ❓ **Tolérance :** Graduation Module_1 (haute) vs Module_2 (modérée) validée ?

### Technique avancée
11. ❓ **Parser algébrique :** Intégrer une lib type `algebra.js` ou rester vanilla JS ?
12. ❓ **Fallback intelligent :** Messages d'aide si format incorrect détecté ?
13. ❓ **Double validation :** CTP (technique) + Prof Maths (contenu) ?

---

## Action attendue du CTP

1. **Valider ou ajuster** les Requirements (keywords suffisants ?)
2. **Proposer** une stratégie de normalisation pour expressions mathématiques
3. **Définir** les seuils de tolérance Module_1 vs Module_2
4. **Confirmer** faisabilité technique avec moteur `engine.js` (vanilla JS)
5. **Suggérer** améliorations UX (hints progressifs, fallbacks, messages d'aide)

---

## Fichiers à réviser

1. [docs/modules/zyvah_maths_module_1_v2.md](../docs/modules/zyvah_maths_module_1_v2.md) (157 lignes)
2. [docs/modules/zyvah_maths_module_2.md](../docs/modules/zyvah_maths_module_2.md) (1287 lignes)

**Total :** 1444 lignes de contenu pédagogique à valider techniquement.

---

## Délai souhaité
Revue complète avant génération HTML (étape suivante).

---

**Architecte Pédago-Web**  
10 février 2026
