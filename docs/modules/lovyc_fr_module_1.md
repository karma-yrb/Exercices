# Draft - Lovyc Francais Module 1

## Meta
- Theme: Tactical Comms - structure de phrase et accords
- Objectif: S+V+C, accord pluriel, ponctuation, homophones, synthese
- Duree cible: ~10 min par mission

## Mission 1 - Le Noyau : S + V + C

### Objectifs pedagogiques et competences
- Identifier sujet, verbe, complement dans une phrase simple.
- Produire une phrase correcte au present (S+V+C).
- Verbaliser le role de chaque element.

### Index technique (ordre des steps)
1. lesson - Briefing : La Squad de Base
2. interactive - Scan de Zone 1
3. interactive - Scan de Zone 2
4. write - Saisie Tactique
5. challenge - Boss de Fin - Mission 1

### Ecran 1 - lesson - Briefing : La Squad de Base
- Texte: "Agent Lovyc, une phrase, c'est comme ta Squad dans Valorant : chaque membre a un role vital. Si ton perso n'a pas d'Action (Verbe), tu ne peux pas gagner la game."
- Texte: "Tu as besoin de trois elements :"
- Encadre: "[1] L'Agent (Sujet) : Qui lance l'action ?" / "[2] L'Action (Verbe) : Que fait-on ?" / "[3] L'Objectif (Complement) : Quel est le but ?"

### Ecran 2 - interactive - Scan de Zone 1
- Question: "Dans cette phrase, quel mot est L'Agent ?" (Le pro-gamer lance une attaque parfaite.)
- Options: "l'attaque" / "Le pro-gamer" / "parfaite"
- Reponse: "Le pro-gamer"
- Feedback: "Correct ! C'est le pro-gamer qui est aux commandes."

### Ecran 3 - interactive - Scan de Zone 2
- Question: "Trouve maintenant le Verbe :" (Le pro-gamer lance une attaque parfaite.)
- Options: "lance" / "une attaque" / "pro-gamer"
- Reponse: "lance"
- Feedback: "Exact ! 'Lance' est le mouvement, l'action."

### Ecran 4 - write - Saisie Tactique
- Question: "Ecris le mot qui manque (le Verbe) :" (Lovyc ____ son ecran de jeu.)
- Requirements:
  - mode: "verb"
  - keywords: "regarde", "allume", "fixe", "nettoie", "prepare"
- Hint: "Cherche une action concrete (regarde, allume, fixe...)"
- Feedback: "Bien !"

### Ecran 5 - challenge - Boss de Fin - Mission 1
- Question: "Redige une phrase complete (S+V+C) au present avec le verbe 'ELIMINER' :"
- Requirements:
  - keywords: "elimine", "elimines", "eliminent", "eliminons", "eliminez"
- Hint: "Rappel : Sujet + Verbe + Complement."
- Feedback: "Mission 1 accomplie a 100%."

## Mission 2 - Accord Multi-joueurs

### Objectifs pedagogiques et competences
- Accorder un verbe avec un sujet pluriel.
- Reperer le sujet avant de conjuguer.
- Corriger des phrases avec erreurs d'accord.

### Index technique (ordre des steps)
1. lesson - Le Serveur Squad
2. lesson - Radar du Sujet
3. interactive - Scan de Sujet
4. interactive - Patch Correctif 1
5. interactive - Patch Correctif 2
6. write - Reparation Express
7. interactive - Verbes Irreguliers
8. write - Transmission Clairement
9. write - Correction de Bug
10. challenge - Boss de Fin - Mission 2

### Ecran 1 - lesson - Le Serveur Squad
- Texte: "Le code secret du pluriel pour les verbes du 1er groupe (en -ER), c'est l'extension -ENT."
- Encadre: "Mode Solo : Le joueur tire." / "Mode Squad : Les joueurs tirent."

### Ecran 2 - lesson - Radar du Sujet
- Texte: "Avant de choisir la terminaison du verbe, tu dois trouver qui fait l'action."
- Texte: "Si le sujet est au pluriel (ils/elles, mes amis, les joueurs...), le verbe prend souvent -ent."
- Encadre: "Les agents avancent." / "Mon agent avance."

### Ecran 3 - interactive - Scan de Sujet
- Question: "Qui est le sujet dans cette phrase ?" (Les soldats protegent la zone.)
- Options: "la zone" / "protegent" / "Les soldats"
- Reponse: "Les soldats"
- Feedback: "Exact. Le sujet, c'est qui fait l'action : Les soldats."

### Ecran 4 - interactive - Patch Correctif 1
- Question: "Choisis la bonne terminaison :" (Mes coequipiers ____ la zone.)
- Options: "securise" / "securisent" / "securises"
- Reponse: "securisent"
- Feedback: "Bien joue ! Plusieurs coequipiers = terminaison -ent."

### Ecran 5 - interactive - Patch Correctif 2
- Question: "Choisis la bonne forme :" (Les drones ____ le terrain.)
- Options: "survole" / "survolent" / "survoles"
- Reponse: "survolent"
- Feedback: "Les drones = pluriel -> survolent."

### Ecran 6 - write - Reparation Express
- Question: "Corrige la terminaison :" (Mes amis traverse la rue.)
- Requirements:
  - mode: "sentence"
  - keywords: "amis", "traversent", "rue"
  - enforceKeywords: true
- Hint: "Sujet pluriel = verbe en -ent."
- Feedback: "Bien vu. Mes amis traversent."

### Ecran 7 - interactive - Verbes Irreguliers
- Question: "Choisis la bonne forme :" (Ils ____ prets.)
- Options: "sont" / "son" / "est"
- Reponse: "sont"
- Feedback: "Avec ils, on dit: ils sont."

### Ecran 8 - write - Transmission Clairement
- Question: "Ecris une phrase correcte avec ces mots :" (ils - l'extraction - avancent - vers)
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "avancent", "l'extraction"
  - enforceKeywords: true
- Hint: "Commence par 'Ils...'."
- Feedback: "Transmission fluide."

### Ecran 9 - write - Correction de Bug
- Question: "Reecris la phrase sans erreur :" (match - parents - mon - regarde - mes)
- Requirements:
  - mode: "sentence"
  - keywords: "parents", "regardent", "match"
  - enforceKeywords: true
- Feedback: "Fix reussi ! Tes parents (ils) = regardent."

### Ecran 10 - challenge - Boss de Fin - Mission 2
- Question: "Reecris toute cette phrase sans aucune erreur :" (terrain - sur - le - saute - joueurs - les)
- Requirements:
  - mode: "sentence"
  - keywords: "joueurs", "sautent", "terrain"
  - enforceKeywords: true
- Feedback: "L'accord de la squad est parfait."

## Mission 3 - Le Flux Dynamique

### Objectifs pedagogiques et competences
- Distinguer point et virgule selon le sens.
- Segmenter une phrase en actions distinctes.
- Reordonner un message en ajoutant la ponctuation.

### Index technique (ordre des steps)
1. lesson - Le Scan de Ponctuation
2. write - Split de Signal
3. interactive - Correction de Chat
4. challenge - Boss de Fin - Mission 3

### Ecran 1 - lesson - Le Scan de Ponctuation
- Encadre: "Le Point (.) : Fin d'action / Pause totale." / "La Virgule (,) : Micro-pause / Liste de composants."

### Ecran 2 - write - Split de Signal
- Question: "Separe ces deux actions par un point :" (se - commence - Lovyc - prepare - match - le)
- Requirements:
  - mode: "sentence"
  - keywords: "match", "Lovyc", "prepare"
  - enforceKeywords: true
  - mustInclude: "."
- Feedback: "Parfait. Deux actions, deux phrases distinctes."

### Ecran 3 - interactive - Correction de Chat
- Question: "Ou placer la virgule ?" (Si tu gagnes je te rejoins.)
- Options: "Si tu gagnes, je te rejoins." / "Si tu, gagnes je te rejoins." / "Si tu gagnes je te, rejoins."
- Reponse: "Si tu gagnes, je te rejoins."
- Feedback: "Correct !"

### Ecran 4 - challenge - Boss de Fin - Mission 3
- Question: "Reecris proprement ce message bugge :" (appel - plus - d' - l' - j' - batterie - arrete - y'a - de)
- Requirements:
  - keywords: "batterie", "appel"
- Hint: "N'oublie pas de separer les deux idees par une virgule ou un point."
- Feedback: "Le flux est fluide."

## Mission 4 - Filtres de Precision

### Objectifs pedagogiques et competences
- Distinguer a / a et et / est en contexte.
- Appliquer ces distinctions dans des phrases courtes.

### Index technique (ordre des steps)
1. lesson - Le Scan A vs A
2. interactive - Test de Signal 1
3. write - Combo Tactique
4. challenge - Boss de Fin - Mission 4

### Ecran 1 - lesson - Le Scan A vs A
- Encadre: "a (sans accent) : On peut dire 'avait'." / "a (avec accent) : On ne peut pas. C'est une direction."

### Ecran 2 - interactive - Test de Signal 1
- Question: "Choisis le bon code :" (Lovyc ____ gagne son match.)
- Options: "a (avait)" / "a"
- Reponse: "a (avait)"
- Feedback: "Bravo !"

### Ecran 3 - write - Combo Tactique
- Question: "Reecris la phrase sans erreur :" (et - est - rapide - le - pro-gamer - precis)
- Requirements:
  - mode: "sentence"
  - keywords: "est", "rapide", "et", "precis"
  - enforceKeywords: true
- Feedback: "Parfait ! Il 'etait' rapide 'et puis' precis."

### Ecran 4 - challenge - Boss de Fin - Mission 4
- Question: "Corrige cette phrase pleine de parasites :" (va - a - il - raquette - a - salle - la - et - une - il)
- Requirements:
  - keywords: "a", "et", "a"
- Hint: "Utilise les tests : avait, et puis, avait."
- Feedback: "Filtres actives. Ton message est cristallin."

## Mission 5 - L'Ultime Deploiement

### Objectifs pedagogiques et competences
- Mobiliser S+V+C et accord pluriel dans une synthese.
- Produire un court rapport avec contraintes formelles.

### Index technique (ordre des steps)
1. msg - Examen de Grade
2. interactive - Module 1 : Structure S+V+C
3. write - Module 2 : Accord Squad
4. challenge - ULtime Boss - Module 1

### Ecran 1 - msg - Examen de Grade
- Texte: "Agent Lovyc, c'est l'heure du deploiement final. Prouve que tu maitrises tout l'equipement tactique."

### Ecran 2 - interactive - Module 1 : Structure S+V+C
- Question: "Quel flux de donnees respecte l'ordre S+V+C ?"
- Options: "Dujardin la rue descendait." / "Dujardin descendait la rue." / "La rue descendait Dujardin."
- Reponse: "Dujardin descendait la rue."
- Feedback: "Structure litteraire verrouillee."

### Ecran 3 - write - Module 2 : Accord Squad
- Question: "Corrige cette phrase (Hugo) en respectant le code -ENT :" (marcher - les - ombre - dans - l' - hommes)
- Requirements:
  - mode: "sentence"
  - keywords: "hommes", "marchent", "ombre"
  - enforceKeywords: true
- Feedback: "Liaison squad etablie."

### Ecran 4 - challenge - ULtime Boss - Module 1
- Question: "Redige ton rapport final de mission. Tu dois utiliser au moins une virgule, le verbe 'REUSSIR' au present, et le mot 'TACTIQUE'."
- Requirements:
  - mode: "sentence"
  - keywords: "reussissent", "reussit", "reussis", "reussissons", "reussissez"
  - mustInclude: ",", "tactique"
- Hint: "Exemple : Tes missions reussissent, c'est une victoire tactique."
- Feedback: "CODE ROUGE TERMINE. Felicitations Agent Lovyc !"
