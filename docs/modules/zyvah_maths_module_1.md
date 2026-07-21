# Draft - Zyvah Maths Module 1 (Révision Rapide)

## Meta
- Theme: Studio Warm-Up - Révision des priorités opératoires
- Objectif: Consolider les bases (parenthèses, multiplication/division prioritaires, lecture gauche→droite)
- AgentPedago: PROF_MATH_SCIENCES_2NDE + ARCHITECTE_PEDAGO_WEB
- SourcesPedago: CURRICULUM + PROGRESS + AGENTS_BASELINE
- CartesLocalLibrary: local_library/cards/maths/*.json + local_library/cards/cross/*.json
- Seances: 1
- ScreensPerSeance: 15
- Duree cible: ~8 min
- Niveau: Révision Cycle 4 (warm-up avant calcul littéral Seconde)
- Prerequis: Module_0 (Initiation)

## Seance 1 - Studio Check : Les Priorités du Mixage

### Objectifs pedagogiques et competences
- Réviser rapidement les règles de priorités opératoires
- Appliquer parenthèses, multiplication/division, lecture gauche→droite
- Préparer le terrain pour le calcul littéral (Module_2)

### Index technique (ordre des steps)
1. msg - Le Code du Studio (rappel)
2. quiz - Priorité Parenthèses
3. write - Calcul avec parenthèses simples
4. quiz - Parenthèses imbriquées
5. write - Deep Mix (parenthèses dans parenthèses)
6. msg - Multiplication & Division avant Addition
7. quiz - Priorité multiplication
8. write - Priorité division
9. quiz - Opérations mélangées
10. write - Lecture gauche->droite
11. msg - Forcer l'ordre avec parenthèses
12. quiz - Comparaison avec/sans parenthèses
13. write - Master Mix complet
14. quiz - QCM de validation
15. challenge - Boss Warm-Up

### Écran 1 - msg - Le Code du Studio (rappel)
**Type:** lesson

**Texte:**
"Zyvah, avant d'attaquer les formules de mixage avancées, on révise rapidement les **priorités de calcul**. C'est la base pour tout ce qui va suivre.

**Les 3 règles du Studio :**
1️⃣ **Parenthèses ( )** → Traitement prioritaire absolu  
2️⃣ **Multiplication × et Division ÷** → Avant addition/soustraction  
3️⃣ **Lecture gauche → droite** → Si même priorité"

**Note pédagogique:** Clair, structuré, visuel avec emojis tactiques.

---

### Écran 2 - quiz - Priorité Parenthèses
**Type:** quiz

**Question:** "Dans l'expression `5 + (2 × 3)`, quelle opération traites-tu EN PREMIER ?"

**Options:**
- `5 + 2`
- `2 × 3` ✅
- `5 + 3`

**Réponse:** `2 × 3`

**Feedback:** "Exact ! Les parenthèses ( ) sont le **Master** : elles passent toujours avant tout le reste."

---

### Écran 3 - write - Calcul avec parenthèses simples
**Type:** write

**Question:** "Calcule le résultat final de : `10 - (2 + 3)`"

**Requirements:**
- keywords: ["5"]
- minWords: 1

**Réponse attendue:** `5`

**Hint:** "D'abord calcule `(2 + 3)`, puis soustrais le résultat de `10`."

**Feedback:** "Bien ! `(2 + 3) = 5`, puis `10 - 5 = 5`. Les parenthèses gèrent tout."

---

### Écran 4 - quiz - Parenthèses imbriquées
**Type:** quiz

**Question:** "Dans `10 + 2 × (3 + 1)`, quelle parenthèse calcules-tu EN PREMIER ?"

**Options:**
- `10 + 2`
- `(3 + 1)` ✅
- `2 × 4`

**Réponse:** `(3 + 1)`

**Feedback:** "Exact ! On commence toujours par la parenthèse **la plus profonde** (au centre)."

---

### Écran 5 - write - Deep Mix (priorites de calcul)
**Type:** write

**Question:** "Calcule ce mix complet : `10 + 2 × (3 + 1)`"

**Requirements:**
- keywords: ["18"]
- minWords: 1

**Réponse attendue:** `18`

**Hint:** "Étape 1 : `(3 + 1) = 4`. Étape 2 : `2 × 4 = 8`. Étape 3 : `10 + 8 = ?`"

**Feedback:** "Parfait ! `(3+1)=4` → `2×4=8` → `10+8=18`. Mixage propre."

---

### Écran 6 - msg - Multiplication & Division avant Addition
**Type:** lesson

**Texte:**
"Après les parenthèses, les **multiplications** (×) et **divisions** (÷) sont **plus fortes** que les additions (+) et soustractions (−).

**Exemple :**
`2 + 5 × 2 = ?`

⚠️ **Piège :** Ne fais PAS `7 × 2 = 14` !

✅ **Correct :** D'abord `5 × 2 = 10`, puis `2 + 10 = 12`."

**Note pédagogique:** Mettre en évidence l'erreur classique avant de donner la bonne méthode.

---

### Écran 7 - quiz - Priorité multiplication
**Type:** quiz

**Question:** "Calcule : `10 - 2 × 4`"

**Options:**
- `32`
- `2` ✅
- `8`

**Réponse:** `2`

**Feedback:** "Bien ! D'abord `2 × 4 = 8`, puis `10 - 8 = 2`. La multiplication est prioritaire."

---

### Écran 8 - write - Priorité division
**Type:** write

**Question:** "Calcule : `20 - 10 ÷ 2`"

**Requirements:**
- keywords: ["15"]
- minWords: 1

**Réponse attendue:** `15`

**Hint:** "La division (÷) est prioritaire sur la soustraction (−). Calcule `10 ÷ 2` d'abord."

**Feedback:** "Exact ! `10 ÷ 2 = 5`, puis `20 - 5 = 15`."

---

### Écran 9 - quiz - Opérations mélangées
**Type:** quiz

**Question:** "Calcule : `6 + 4 × 3 - 2`"

**Options:**
- `28`
- `16` ✅
- `22`

**Réponse:** `16`

**Feedback:** "Parfait ! D'abord `4 × 3 = 12`, puis `6 + 12 - 2 = 16`."

---

### Écran 10 - write - Lecture gauche->droite
**Type:** write

**Question:** "Calcule : `5 × 4 ÷ 2`"

**Requirements:**
- keywords: ["10"]
- minWords: 1

**Réponse attendue:** `10`

**Hint:** "× et ÷ ont la **même priorité**, donc lis de **gauche à droite** : calcule `5 × 4` d'abord, puis divise par 2."

**Feedback:** "Génial ! `5 × 4 = 20`, puis `20 ÷ 2 = 10`. Flow respecté."

---

### Écran 11 - msg - Forcer l'ordre avec parenthèses
**Type:** lesson

**Texte:**
"Si tu veux qu'une **addition soit faite AVANT** une multiplication, tu dois utiliser les **parenthèses**.

**Comparaison :**
- Sans parenthèses : `5 + 5 × 2 = 5 + 10 = 15`
- Avec parenthèses : `(5 + 5) × 2 = 10 × 2 = 20`

Les parenthèses **forcent** le traitement prioritaire."

---

### Écran 12 - quiz - Comparaison avec/sans parenthèses
**Type:** quiz

**Question:** "Lequel de ces mix donne **20** ?"

**Options:**
- `(5 + 5) × 2` ✅
- `5 + 5 × 2`

**Réponse:** `(5 + 5) × 2`

**Feedback:** "Oui ! Avec parenthèses : `10 × 2 = 20`. Sans : `5 + 10 = 15`."

---

### Écran 13 - write - Master Mix complet
**Type:** write

**Question:** "Calcule ce signal complexe : `10 × (15 - 5) + 5`"

**Requirements:**
- keywords: ["105"]
- minWords: 1

**Réponse attendue:** `105`

**Hint:** "Étape 1 : Parenthèse. Étape 2 : Multiplication. Étape 3 : Addition."

**Feedback:** "Précision chirurgicale ! `(15-5)=10` → `10×10=100` → `100+5=105`."

---

### Écran 14 - quiz - QCM de validation
**Type:** quiz

**Question:** "Dans `100 - (20 + 30)`, quelle partie est traitée EN PREMIER ?"

**Options:**
- `100 - 20`
- `20 + 30` ✅
- `100 - 30`

**Réponse:** `20 + 30`

**Feedback:** "Verrouillé ! Les parenthèses passent toujours en premier."

---

### Écran 15 - challenge - Boss Warm-Up
**Type:** challenge

**Question:** "Calcule cette équation finale pour valider ton **warm-up** :

`50 - (2 × 5 + 5)`"

**Requirements:**
- keywords: ["35"]
- minWords: 1

**Réponse attendue:** `35`

**Hint:** "Calcule d'abord **l'intérieur** de la parenthèse (attention : le × est prioritaire à l'intérieur !), puis soustrais le résultat de 50."

**Feedback:** "**WARM-UP TERMINÉ** ✅

Bien joué Zyvah ! Les bases sont solides. Maintenant, direction le **Module 2** pour attaquer le **vrai calcul littéral de Seconde** : développement, identités remarquables, factorisation et équations.

**Badge débloqué :** 🎚️ Studio Check"

---

## Notes Techniques

### Progression pédagogique
1. **Écrans 1-5** : Parenthèses (simples + imbriquées)
2. **Écrans 6-10** : Multiplication/division prioritaires + lecture gauche→droite
3. **Écrans 11-14** : Forcer l'ordre avec parenthèses
4. **Écran 15** : Validation complète (Boss)

### Durée estimée
- 15 écrans × ~30 sec = **~8 minutes**
- Format "révision rapide" pour ne pas bloquer l'accès au Module_2

### Cohérence avec le projet
- ✅ 15 écrans (conforme au standard)
- ✅ Requirements avec keywords sur tous les write/challenge
- ✅ Boss en fin de Seance
- ✅ Contexte Studio (univers Zyvah)
- ✅ Feedbacks encourageants et techniques

### Liens avec Module_2
Cet échauffement prépare :
- Les expressions avec parenthèses → nécessaires pour développer `(a+b)(c+d)`
- La priorité des opérations → indispensable pour factoriser correctement
- La lecture d'expressions → base pour manipuler des expressions littérales

