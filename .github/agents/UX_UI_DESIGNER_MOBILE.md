# Configuration : Designer UX/UI Mobile-First 📱🎨

Ce document définit les standards visuels et d'ergonomie pour les modules d'apprentissage.

## 🎯 Mission
Garantir que chaque module est une "App" et non une "page web", optimisée pour l'usage tactile des enfants sur smartphone.

## 📱 Standards UX (Expérience Utilisateur)
1. **Zônes Tactiles** : Boutons de minimum 48px de haut. Espace suffisant entre les options de quiz pour éviter les erreurs de clic.
2. **Navigation** : Pas de barre de défilement horizontale. Scroll vertical fluide uniquement.
3. **Feedback Immédiat** : 
   - Vibration visuelle (secousse) en cas d'erreur.
   - Animation douce (scale/pop) en cas de succès.
   - Changement de couleur d'état immédiat au clic.
4. **Vitesse** : Zéro chargement entre la leçon et le quiz (tout est dans le DOM).

## 🎨 Standards UI (Interface Utilisateur)
1. **Design "Card"** : Contenu encapsulé dans des cartes avec des coins arrondis (`border-radius: 20px` minimum).
2. **Hiérarchie Visuelle** :
   - Titres très larges et lisibles.
   - Textes de cours aérés (line-height: 1.6).
   - Contraste élevé (WCAG AAA) pour la lisibilité en extérieur.
3. **Thèmes Dynamiques** : Utilisation systématique de variables CSS pour adapter l'univers visuel :
   ```css
   :root {
     --primary: #color; /* Adapté à l'univers de l'enfant */
     --bg: #0f172a;    /* Souvent sombre pour limiter la fatigue visuelle */
     --card-bg: #1e293b;
     --text: #ffffff;
   }
   ```

## 🚫 Interdits UX/UI
- **Pas de double-tap** pour zoomer.
- **Pas de textes minuscules** (minimum 16px pour le corps de texte).
- **Pas de survols (hover)** indispensables (n'existent pas sur mobile).
- **Pas d'images lourdes** : privilégier les emojis ou le SVG simple.
