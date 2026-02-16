# Draft - Lovyc Français Module 1

## Meta
- Thème: Tactical Comms - structure de phrase et accords
- Objectif: S+V+C, accord pluriel, ponctuation, homophones, synthèse
- Durée cible: ~10-12 min par mission

## Mission 1 - Le Noyau : S + V + C

### Objectifs pédagogiques et compétences
- Identifier sujet, verbe, complément dans une phrase simple.
- Produire une phrase correcte au présent (S+V+C).
- Verbaliser le rôle de chaque élément.

### Index technique (ordre des steps)
1. lesson - Briefing : La Squad de Base
2. lesson - Carte Tactique SVC
3. interactive - Scan de Zone : Sujet
4. interactive - Scan de Zone : Verbe
5. interactive - Scan de Zone : Complément
6. write - Saisie Tactique : Verbe
7. write - Saisie Tactique : Complément
8. interactive - Ordre de Mission
9. write - Phrase SVC Contrôlée
10. interactive - Sujet Cache
11. write - Réordonnancement Express
12. interactive - Verbe ou Nom ?
13. write - Ajoute le Complément
14. write - Mini Rapport
15. challenge - Boss de Fin - Mission 1

### Écran 1 - lesson - Briefing : La Squad de Base
- Texte: "Agent Lovyc, une phrase, c'est comme ta squad : chaque membre a un rôle vital. Sans Action (verbe), la mission ne bouge pas."
- Texte: "Tu as besoin de trois éléments :"
- Encadre: "[1] L'Agent (Sujet) : Qui lance l'action ?" / "[2] L'Action (Verbe) : Que fait-on ?" / "[3] L'Objectif (Complément) : Quel est le but ?"

### Écran 2 - lesson - Carte Tactique SVC
- Texte: "Pour retrouver le Sujet, pose la question: Qui est-ce qui ... ?"
- Texte: "Pour le Verbe: Qu'est-ce qu'il fait ?"
- Texte: "Pour le Complément: Quoi ? Où ? À qui ?"

### Écran 3 - interactive - Scan de Zone : Sujet
- Question: "Dans cette phrase, quel mot est L'Agent ?" (Le pro-gamer lance une attaque parfaite.)
- Options: "l'attaque" / "Le pro-gamer" / "parfaite"
- Réponse: "Le pro-gamer"
- Feedback: "Correct ! C'est le pro-gamer qui agit."

### Écran 4 - interactive - Scan de Zone : Verbe
- Question: "Trouve le Verbe :" (Le pro-gamer lance une attaque parfaite.)
- Options: "lance" / "une attaque" / "pro-gamer"
- Réponse: "lance"
- Feedback: "Exact ! 'Lance' est l'action."

### Écran 5 - interactive - Scan de Zone : Complément
- Question: "Quel est le Complément ?" (Le pro-gamer lance une attaque parfaite.)
- Options: "pro-gamer" / "lance" / "une attaque parfaite"
- Réponse: "une attaque parfaite"
- Feedback: "Bien vu. C'est l'objectif de l'action."

### Écran 6 - write - Saisie Tactique : Verbe
- Question: "Écris le mot qui manque (le Verbe) :" (Lovyc ____ son écran de jeu.)
- Requirements:
  - mode: "verb"
  - keywords: "regarde", "allume", "fixe", "nettoie", "prépare"
- Hint: "Cherche une action concrète (regarde, allume, fixe...)"
- Hint2: "Garde la structure « Lovyc ____ son écran de jeu. » et mets un verbe au présent."
- Hint3: "Exemple à recopier : « Lovyc regarde son écran de jeu. »"
- Feedback: "Bien !"

### Écran 7 - write - Saisie Tactique : Complément
- Question: "Complete la phrase avec un complément simple :" (L'agent surveille ____.)
- Requirements:
  - mode: "sentence"
  - keywords: "zone", "map", "terrain", "couloir", "base"
- Hint: "Un complément indique ce qu'il surveille."
- Hint2: "Ajoute un groupe de mots après « surveille » pour dire ce qui est surveillé."
- Hint3: "Exemple à recopier : « L'agent surveille la zone. »"
- Feedback: "Cible verrouillée."

### Écran 8 - interactive - Ordre de Mission
- Question: "Quelle phrase respecte l'ordre S + V + C ?"
- Options: "Le drone la zone surveille." / "Le drone surveille la zone." / "Surveille le drone la zone."
- Réponse: "Le drone surveille la zone."
- Feedback: "Structure claire et efficace."

### Écran 9 - write - Phrase SVC Contrôlée
- Question: "Écris une phrase S + V + C avec ces mots :" (coach - explique - stratégie)
- Requirements:
  - mode: "sentence"
  - keywords: "coach", "explique", "stratégie"
  - enforceKeywords: true
- Hint: "Place d'abord le sujet."
- Hint2: "Ordre attendu : Sujet + Verbe + Complément avec les trois mots imposés."
- Hint3: "Exemple à recopier : « Le coach explique la stratégie. »"
- Feedback: "Flux valide."

### Écran 10 - interactive - Sujet Cache
- Question: "Quel est le Sujet (qui fait l'action) ?" (Dans le lobby, les joueurs discutent.)
- Options: "le lobby" / "les joueurs" / "discutent"
- Réponse: "les joueurs"
- Feedback: "Oui. Ce sont eux qui agissent."

### Écran 11 - write - Réordonnancement Express
- Question: "Remets dans l'ordre pour former une phrase :" (zone - sécurise - l'agent - la)
- Requirements:
  - mode: "sentence"
  - keywords: "l'agent", "sécurise", "zone"
  - enforceKeywords: true
- Hint: "Relis la consigne, garde une phrase claire et vérifie l'accord sujet-verbe."
- Hint2: "Commence par « L'agent », puis « sécurise », puis « la zone »."
- Hint3: "Exemple à recopier : « L'agent sécurise la zone. »"
- Feedback: "Ordre confirme."

### Écran 12 - interactive - Verbe ou Nom ?
- Question: "Quel mot indique l'action dans cette phrase ?" (L'agent attaque la zone.)
- Options: "agent" / "attaque" / "zone"
- Réponse: "attaque"
- Feedback: "Oui. C'est l'action effectuée par l'agent."

### Écran 13 - write - Ajoute le Complément
- Question: "Ajoute un complément pour compléter la phrase :" (Lovyc lance.)
- Requirements:
  - mode: "sentence"
  - minWords: 3
- Hint: "Qu'est-ce qui peut être lancé ?"
- Hint2: "Conserve « Lovyc lance ... » et ajoute un complément clair."
- Hint3: "Exemple à recopier : « Lovyc lance une attaque. »"
- Feedback: "Phrase complète."

### Écran 14 - write - Mini Rapport
- Question: "Écris deux phrases S+V+C sur une préparation de match."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["match", "rencontre", "terrain"]
    - ["équipe", "joueurs", "coach"]
    - ["stratégie", "tactique", "attaque", "défense"]
  - minWords: 12
  - minSentences: 2
- Hint: "Phrase 1: qui prépare le match ? Phrase 2: quelle stratégie l'équipe applique ?"
- Hint2: "Fais 2 phrases complètes: préparation du match, puis stratégie appliquée."
- Hint3: "Exemple à recopier : « L'équipe prépare le match. Les joueurs appliquent une stratégie de défense. »"
- Feedback: "Rapport clair."

### Écran 15 - challenge - Boss de Fin - Mission 1
- Question: "Rédige deux phrases complètes (S+V+C) au présent, dont une avec le verbe 'ELIMINER'."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["élimine", "élimines", "éliminons", "éliminez", "éliminent"]
    - ["adversaire", "ennemi", "opposant"]
    - ["équipe", "joueurs", "agents", "escouade"]
  - minWords: 12
  - minSentences: 2
  - mustInclude: "."
- Hint: "Vérifie S+V+C dans chaque phrase, puis relis les accords."
- Feedback: "Mission 1 accomplie a 100%."

## Mission 2 - Accord Multi-joueurs

### Objectifs pédagogiques et compétences
- Accorder un verbe avec un sujet pluriel.
- Repérer le sujet avant de conjuguer.
- Corriger des phrases avec erreurs d'accord.

### Index technique (ordre des steps)
1. lesson - Le Serveur Squad
2. lesson - Radar du Sujet
3. interactive - Scan de Sujet
4. interactive - Patch Correctif 1
5. interactive - Patch Correctif 2
6. write - Reparation Express
7. interactive - Verbes Irreguliers
8. write - Transmission Claire
9. write - Correction de Bug
10. interactive - Faux Ami
11. write - Accord Cache
12. interactive - Pluriel Repere
13. write - Phrase Plurielle Libre
14. write - Rapport Squad
15. challenge - Boss de Fin - Mission 2

### Écran 1 - lesson - Le Serveur Squad
- Texte: "Le code secret du pluriel pour les verbes du 1er groupe (en -ER), c'est l'extension -ENT."
- Encadre: "Mode Solo : Le joueur tire." / "Mode Squad : Les joueurs tirent."

### Écran 2 - lesson - Radar du Sujet
- Texte: "Avant de choisir la terminaison du verbe, tu dois trouver qui fait l'action."
- Texte: "Si le sujet est au pluriel (ils/elles, mes amis, les joueurs...), le verbe prend souvent -ent."
- Encadre: "Les agents avancent." / "Mon agent avance."

### Écran 3 - interactive - Scan de Sujet
- Question: "Qui est le sujet dans cette phrase ?" (Les soldats protègent la zone.)
- Options: "la zone" / "protègent" / "Les soldats"
- Réponse: "Les soldats"
- Feedback: "Exact. Le sujet, c'est qui fait l'action : Les soldats."

### Écran 4 - interactive - Patch Correctif 1
- Question: "Choisis la bonne terminaison :" (Mes coéquipiers ____ la zone.)
- Options: "sécurise" / "sécurisent" / "sécurisés"
- Réponse: "sécurisent"
- Feedback: "Bien joué ! Plusieurs coéquipiers = terminaison -ent."

### Écran 5 - interactive - Patch Correctif 2
- Question: "Choisis la bonne forme :" (Les drones ____ le terrain.)
- Options: "survole" / "survolent" / "survoles"
- Réponse: "survolent"
- Feedback: "Les drones = pluriel -> survolent."

### Écran 6 - write - Reparation Express
- Question: "Corrige la terminaison :" (Mes amis traverse la rue.)
- Requirements:
  - mode: "sentence"
  - keywords: "amis", "traversent", "rue"
  - enforceKeywords: true
- Hint: "Sujet pluriel = verbe en -ent."
- Hint2: "Le sujet « Mes amis » est pluriel, donc le verbe doit finir par -ent."
- Hint3: "Exemple à recopier : « Mes amis traversent la rue. »"
- Feedback: "Bien vu. Mes amis traversent."

### Écran 7 - interactive - Verbes Irreguliers
- Question: "Choisis la bonne forme :" (Ils ____ prêts.)
- Options: "sont" / "son" / "est"
- Réponse: "sont"
- Feedback: "Avec ils, on dit: ils sont."

### Écran 8 - write - Transmission Claire
- Question: "Écris une phrase correcte avec ces mots :" (ils - l'extraction - avancent - vers)
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "avancent", "l'extraction"
  - enforceKeywords: true
- Hint: "Commence par 'Ils...'."
- Hint2: "Utilise les mots donnés dans l'ordre logique : Ils + avancent + vers + l'extraction."
- Hint3: "Exemple à recopier : « Ils avancent vers l'extraction. »"
- Feedback: "Transmission fluide."

### Écran 9 - write - Correction de Bug
- Question: "Réécris la phrase sans erreur :" (Mes parents regarde mon match.)
- Requirements:
  - mode: "sentence"
  - keywords: "parents", "regardent", "match"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et vérifie la ponctuation finale."
- Hint2: "Avec « Mes parents », le verbe se met au pluriel et la phrase finit par un point."
- Hint3: "Exemple à recopier : « Mes parents regardent mon match. »"
- Feedback: "Fix réussi ! Tes parents (ils) = regardent."

### Écran 10 - interactive - Faux Ami
- Question: "Quel verbe est correct ?" (Les coéquipiers ____ la défense.)
- Options: "améliore" / "améliorent" / "améliores"
- Réponse: "améliorent"
- Feedback: "Pluriel -> améliorent."

### Écran 11 - write - Accord Cache
- Question: "Complète avec le verbe correct :" (Les joueurs ____ la finale ce soir.)
- Requirements:
  - mode: "verb"
  - keywords: "gagnent"
- Hint: "Sujet pluriel 'Les joueurs' -> verbe en -ent. Écris seulement le verbe."
- Hint2: "Un seul mot attendu: verbe au présent, 3e personne du pluriel."
- Hint3: "Réponse à recopier : « gagnent »."
- Feedback: "Parfait. Les joueurs gagnent la finale ce soir."

### Écran 12 - interactive - Pluriel Repere
- Question: "Quel mot montre que le sujet est pluriel ?" (Mes frères avancent vite.)
- Options: "vite" / "mes" / "avancent"
- Réponse: "mes"
- Feedback: "Oui. 'Mes' indique plusieurs."

### Écran 13 - write - Phrase Plurielle Libre
- Question: "Écris une phrase avec un sujet pluriel et un verbe au présent."
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "elles", "nous", "vous", "joueurs", "amis"
  - minWords: 6
- Hint: "Commence par un sujet pluriel (ils/elles/nous/vous) et utilise un verbe conjugué au présent."
- Hint2: "Forme minimale: Sujet pluriel + verbe au présent + complément."
- Hint3: "Exemple à recopier : « Ils avancent vers la base. »"
- Feedback: "Accord valide."

### Écran 14 - write - Rapport Squad
- Question: "Rédige deux phrases avec un sujet pluriel dans chacune."
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "elles", "nous", "vous", "joueurs", "amis"
  - minWords: 12
  - minSentences: 2
  - mustInclude: "."
- Hint: "Écris 2 phrases. Dans chaque phrase: sujet pluriel + verbe au présent accordé."
- Hint2: "Rédige deux phrases complètes, chacune avec un sujet pluriel."
- Hint3: "Exemple à recopier : « Les joueurs avancent vite. Mes amis couvrent la zone. »"
- Feedback: "Rapport synchronisé."

### Écran 15 - challenge - Boss de Fin - Mission 2
- Question: "Réécris toute cette phrase sans aucune erreur :" (terrain - sur - le - court - joueurs - les)
- Requirements:
  - mode: "sentence"
  - keywords: "joueurs", "courent", "terrain"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et vérifie la ponctuation finale."
- Feedback: "L'accord de la squad est parfait."

## Mission 3 - Le Flux Dynamique

### Objectifs pédagogiques et compétences
- Distinguer point et virgule selon le sens.
- Segmenter une phrase en actions distinctes.
- Reordonner un message en ajoutant la ponctuation.

### Index technique (ordre des steps)
1. lesson - Le Scan de Ponctuation
2. lesson - Point ou Virgule
3. interactive - Choix de Coupure 1
4. interactive - Choix de Coupure 2
5. write - Split de Signal 1
6. write - Split de Signal 2
7. interactive - Correction de Chat
8. interactive - Pause Utile
9. write - Ajout de Virgule
10. write - Ajout de Point
11. interactive - Phrase Longue
12. write - Message Clair
13. write - Micro Rapport
14. interactive - Derniere Verification
15. challenge - Boss de Fin - Mission 3

### Écran 1 - lesson - Le Scan de Ponctuation
- Encadre: "Le Point (.) : Fin d'action / Pause totale." / "La Virgule (,) : Micro-pause / Liste de composants."

### Écran 2 - lesson - Point ou Virgule
- Texte: "Si tu passes a une nouvelle action, utilise le point. Si tu restes dans la même action, utilise la virgule."

### Écran 3 - interactive - Choix de Coupure 1
- Question: "Quelle ponctuation convient ?" (Lovyc vise la cible ____ il tire.)
- Options: "," / "." / "rien"
- Réponse: "."
- Feedback: "Deux actions séparées -> point."

### Écran 4 - interactive - Choix de Coupure 2
- Question: "Quelle ponctuation convient ?" (Il ouvre la map ____ repere la zone.)
- Options: "," / "." / "rien"
- Réponse: ","
- Feedback: "Deux actions proches -> virgule."

### Écran 5 - write - Split de Signal 1
- Question: "Separe ces deux actions par un point :" (se - commence - Lovyc - prépare - match - le)
- Requirements:
  - mode: "sentence"
  - keywords: "match", "Lovyc", "prépare"
  - enforceKeywords: true
  - mustInclude: "."
- Hint: "Separe les actions en deux phrases: action 1 + point + action 2."
- Hint2: "Fais deux phrases complètes et ajoute un point entre les deux actions."
- Hint3: "Exemple à recopier : « Lovyc se prépare. Le match commence. »"
- Feedback: "Parfait. Deux actions, deux phrases distinctes."

### Écran 6 - write - Split de Signal 2
- Question: "Ajoute une virgule pour rendre la phrase plus fluide :" (La team avance elle reste groupée.)
- Requirements:
  - mode: "sentence"
  - keywords: "team"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Hint2: "Garde une seule phrase et mets la virgule entre les deux actions."
- Hint3: "Exemple à recopier : « La team avance, elle reste groupée. »"
- Feedback: "Flux ajusté."

### Écran 7 - interactive - Correction de Chat
- Question: "Ou placer la virgule ?" (Si tu gagnes je te rejoins.)
- Options: "Si tu gagnes, je te rejoins." / "Si tu, gagnes je te rejoins." / "Si tu gagnes je te, rejoins."
- Réponse: "Si tu gagnes, je te rejoins."
- Feedback: "Correct !"

### Écran 8 - interactive - Pause Utile
- Question: "Quel signe fait une pause courte ?"
- Options: "Le point" / "La virgule" / "Le point d'exclamation"
- Réponse: "La virgule"
- Feedback: "La micro-pause."

### Écran 9 - write - Ajout de Virgule
- Question: "Ajoute une virgule :" (En match Lovyc reste calme.)
- Requirements:
  - mode: "sentence"
  - keywords: "Lovyc", "match"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Hint2: "Ici, la virgule se place après « En match »."
- Hint3: "Exemple à recopier : « En match, Lovyc reste calme. »"
- Feedback: "Respiration ok."

### Écran 10 - write - Ajout de Point
- Question: "Ajoute un point pour séparer les actions :" (Il monte le son il commence le stream)
- Requirements:
  - mode: "sentence"
  - keywords: "son", "stream"
  - mustInclude: "."
  - enforceKeywords: true
  - minWords: 6
- Hint: "Separe les actions en deux phrases: action 1 + point + action 2."
- Hint2: "Sépare les deux actions en deux phrases avec un point."
- Hint3: "Exemple à recopier : « Il monte le son. Il commence le stream. »"
- Feedback: "Actions séparées."

### Écran 11 - interactive - Phrase Longue
- Question: "Quel choix est le plus clair ?" (Il charge il tire il avance)
- Options: "Il charge, il tire, il avance." / "Il charge il tire il avance." / "Il charge. il tire. il avance."
- Réponse: "Il charge, il tire, il avance."
- Feedback: "Liste d'actions -> virgules."

### Écran 12 - write - Message Clair
- Question: "Réécris avec ponctuation :" (je - vérifie - le - radar - je - bouge)
- Requirements:
  - mode: "sentence"
  - keywords: "vérifie", "radar", "bouge"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Deux actions proches -> virgule."
- Hint2: "Réécris avec majuscule, virgule entre les actions et point final."
- Hint3: "Exemple à recopier : « Je vérifie le radar, je bouge. »"
- Feedback: "Message clair."

### Écran 13 - write - Micro Rapport
- Question: "Écris deux phrases courtes sur ton entraînement."
- Requirements:
  - mode: "sentence"
  - keywords: "entraînement", "match", "équipe", "coach"
  - minWords: 10
  - minSentences: 2
  - mustInclude: "."
- Hint: "Phrase 1: une action d'entraînement. Phrase 2: un résultat ou une observation."
- Hint2: "Rédige deux phrases courtes: une action, puis un résultat."
- Hint3: "Exemple à recopier : « Je termine l'entraînement. Mon équipe gagne le match. »"
- Feedback: "Rapport propre."

### Écran 14 - interactive - Derniere Verification
- Question: "Quelle phrase est correcte ?"
- Options: "Je prends le casque, je pars." / "Je prends le casque. je pars." / "Je prends le casque je pars."
- Réponse: "Je prends le casque, je pars."
- Feedback: "La virgule relie deux actions proches."

### Écran 15 - challenge - Boss de Fin - Mission 3
- Question: "Réécris proprement ce message buggé :" (appel - plus - d' - l' - j' - batterie - arrête - y'a - de)
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["batterie"]
    - ["appel", "d'appel"]
    - ["arrêtée", "arrête"]
  - mustInclude: "."
- Hint: "Remets les mots dans l'ordre et corrige l'écriture des mots avant de ponctuer."
- Feedback: "Le flux est fluide."

## Mission 4 - Filtres de Precision

### Objectifs pédagogiques et compétences
- Distinguer a / a et et / est en contexte.
- Appliquer ces distinctions dans des phrases courtes.

### Index technique (ordre des steps)
1. lesson - Le Scan a vs à
2. lesson - Le Scan et / est
3. interactive - Test a 1
4. interactive - Test a 2
5. interactive - Test et 1
6. interactive - Test est 1
7. write - Combo Tactique
8. write - Correction Simple
9. interactive - Variante a / à
10. interactive - Variante et / est
11. write - Phrase Mixte
12. write - Phrase Mixte 2
13. interactive - Relecture Rapide
14. write - Rapport Court
15. challenge - Boss de Fin - Mission 4

### Écran 1 - lesson - Le Scan a vs à
- Encadre: "a (sans accent) : On peut dire 'avait'." / "a (avec accent) : On ne peut pas. C'est une direction."

### Écran 2 - lesson - Le Scan et / est
- Encadre: "et : on peut dire 'et puis'." / "est : on peut dire 'était'."

### Écran 3 - interactive - Test a 1
- Question: "Choisis le bon code :" (Lovyc ____ gagne son match.)
- Options: "a (avait)" / "à"
- Réponse: "a (avait)"
- Feedback: "Bravo !"

### Écran 4 - interactive - Test a 2
- Question: "Choisis le bon code :" (Il va ____ la base.)
- Options: "a (avait)" / "à"
- Réponse: "à"
- Feedback: "Direction -> a avec accent."

### Écran 5 - interactive - Test et 1
- Question: "Choisis la bonne forme :" (Le coach ____ calme.)
- Options: "et" / "est"
- Réponse: "est"
- Feedback: "On peut dire était."

### Écran 6 - interactive - Test est 1
- Question: "Choisis la bonne forme :" (Il parle ____ il explique.)
- Options: "et" / "est"
- Réponse: "et"
- Feedback: "On peut dire et puis."

### Écran 7 - write - Combo Tactique
- Question: "Réécris la phrase sans erreur :" (et - est - rapide - le - pro-gamer - précis)
- Requirements:
  - mode: "sentence"
  - keywords: "est", "rapide", "et", "précis"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et vérifie la ponctuation finale."
- Hint2: "Remets les mots dans l'ordre : sujet + est + adjectifs reliés par et."
- Hint3: "Exemple à recopier : « Le pro-gamer est rapide et précis. »"
- Feedback: "Parfait ! Il 'était' rapide 'et puis' précis."

### Écran 8 - write - Correction Simple
- Question: "Corrige :" (il a la finale et il et fier)
- Requirements:
  - mode: "sentence"
  - keywords: "a", "et", "est"
- Hint: "Relis mot par mot, corrige l'accord et vérifie la ponctuation finale."
- Hint2: "Le second « et » doit devenir « est » ; ajoute aussi majuscule et point."
- Hint3: "Exemple à recopier : « Il a la finale et il est fier. »"
- Feedback: "Correctif applique."

### Écran 9 - interactive - Variante a / à
- Question: "Choisis la bonne forme :" (Elle ____ raison.)
- Options: "a" / "à"
- Réponse: "a"
- Feedback: "Test 'avait'."

### Écran 10 - interactive - Variante et / est
- Question: "Choisis la bonne forme :" (Le signal ____ clair.)
- Options: "et" / "est"
- Réponse: "est"
- Feedback: "Test 'était'."

### Écran 11 - write - Phrase Mixte
- Question: "Écris une phrase avec a et est correctement."
- Requirements:
  - mode: "sentence"
  - keywords: "a", "est"
- Hint: "Teste chaque mot: a = avait, est = était, et = et puis."
- Hint2: "Écris une phrase complète qui contient au moins « a » et « est »."
- Hint3: "Exemple à recopier : « Il a une raquette et il est prêt. »"
- Feedback: "Phrase clean."

### Écran 12 - write - Phrase Mixte 2
- Question: "Écris une phrase avec et et a correctement."
- Requirements:
  - mode: "sentence"
  - keywords: "et", "a"
  - enforceKeywords: true
  - minWords: 6
- Hint: "Teste chaque mot: a = avait, est = était, et = et puis."
- Hint2: "Inclue « et » et « a » dans une phrase de 6 mots minimum."
- Hint3: "Exemple à recopier : « Le joueur a une stratégie et avance. »"
- Feedback: "Validation ok."

### Écran 13 - interactive - Relecture Rapide
- Question: "Quelle phrase est correcte ?"
- Options: "Il a rapide et il est tard." / "Il est rapide et il a tard." / "Il est rapide et il a la finale."
- Réponse: "Il est rapide et il a la finale."
- Feedback: "Lecture valide."

### Écran 14 - write - Rapport Court
- Question: "Écris deux phrases courtes avec a et est."
- Requirements:
  - mode: "sentence"
  - keywords: "a", "est", "et"
  - enforceKeywords: true
  - minWords: 10
  - minSentences: 2
- Hint: "Teste chaque mot: a = avait, est = était, et = et puis."
- Hint2: "Fais deux phrases courtes contenant a, est et et."
- Hint3: "Exemple à recopier : « Il a la carte et il est calme. La team est prête et elle a un plan. »"
- Feedback: "Rapport en règle."

### Écran 15 - challenge - Boss de Fin - Mission 4
- Question: "Corrige cette phrase pleine de parasites :" (va - a - il - raquette - a - salle - la - et - une - il)
- Requirements:
  - keywords: "a", "à", "et"
- Hint: "Utilise les tests : avait, et puis, avait."
- Feedback: "Filtres actives. Ton message est cristallin."

## Mission 5 - L'Ultime Deploiement

### Objectifs pédagogiques et compétences
- Mobiliser S+V+C et accord pluriel dans une synthèse.
- Produire un court rapport avec contraintes formelles.

### Index technique (ordre des steps)
1. msg - Examen de Grade
2. interactive - Structure S+V+C
3. interactive - Accord Squad
4. write - S+V+C Libre
5. write - Accord Pluriel
6. interactive - Ponctuation Simple
7. write - Point et Virgule
8. interactive - Homophones Rapides
9. write - Phrase Mixte 1
10. write - Phrase Mixte 2
11. interactive - Verification Finale 1
12. interactive - Verification Finale 2
13. write - Micro Rapport
14. write - Rapport Global
15. challenge - Ultime Boss - Module 1

### Écran 1 - msg - Examen de Grade
- Texte: "Agent Lovyc, c'est l'heure du déploiement final. Prouve que tu maîtrises tout l'équipement tactique."

### Écran 2 - interactive - Structure S+V+C
- Question: "Quel flux de données respecte l'ordre S+V+C ?"
- Options: "Dujardin la rue descendait." / "Dujardin descendait la rue." / "La rue descendait Dujardin."
- Réponse: "Dujardin descendait la rue."
- Feedback: "Structure littéraire verrouillée."

### Écran 3 - interactive - Accord Squad
- Question: "Choisis la bonne forme :" (Les joueurs ____ la zone.)
- Options: "sécurise" / "sécurisent" / "sécurisés"
- Réponse: "sécurisent"
- Feedback: "Pluriel -> -ent."

### Écran 4 - write - S+V+C Libre
- Question: "Écris une phrase S+V+C au présent."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["je", "nous", "ils", "elles", "lovyc", "équipe", "joueurs"]
    - ["avance", "avancent", "protège", "protègent", "attaque", "attaquent", "prépare", "préparent", "lance", "lancent"]
    - ["zone", "terrain", "stratégie", "match", "base"]
  - minWords: 6
- Hint: "Vérifie l'ordre Sujet + Verbe + Complément, puis ajoute un détail concret."
- Hint2: "Commence par un sujet, ajoute un verbe au présent, puis un complément précis."
- Hint3: "Exemple à recopier : « Les joueurs préparent la stratégie. »"
- Feedback: "Bonne structure."

### Écran 5 - write - Accord Pluriel
- Question: "Corrige cette phrase (Hugo) en respectant le code -ENT :" (Les hommes marche dans l'ombre.)
- Requirements:
  - mode: "sentence"
  - keywords: "hommes", "marchent", "ombre"
  - enforceKeywords: true
- Hint: "Repere d'abord le sujet pluriel, puis accorde le verbe en -ent."
- Hint2: "Le sujet « Les hommes » est pluriel : le verbe doit finir en -ent."
- Hint3: "Exemple à recopier : « Les hommes marchent dans l'ombre. »"
- Feedback: "Liaison squad etablie."

### Écran 6 - interactive - Ponctuation Simple
- Question: "Quelle phrase est la plus claire ?"
- Options: "Je charge, je tire." / "Je charge. je tire." / "Je charge je tire."
- Réponse: "Je charge, je tire."
- Feedback: "Virgule utile."

### Écran 7 - write - Point et Virgule
- Question: "Ajoute une virgule et un point :" (je - check - la - map - je - pars - vite)
- Requirements:
  - mode: "sentence"
  - keywords: "map"
  - mustInclude: ",", "."
  - enforceKeywords: true
  - minWords: 7
- Hint: "Mets la virgule entre deux actions proches, puis le point pour clôturer l'idée."
- Hint2: "Réécris en deux actions: virgule pour la micro-pause, point pour finir."
- Hint3: "Exemple à recopier : « Je check la map, je pars vite. »"
- Feedback: "Ponctuation appliquee."

### Écran 8 - interactive - Homophones Rapides
- Question: "Choisis la phrase correcte :"
- Options: "Il a rapide et il est fier." / "Il est rapide et il a la finale." / "Il et rapide et il a la finale."
- Réponse: "Il est rapide et il a la finale."
- Feedback: "Homophones ok."

### Écran 9 - write - Phrase Mixte 1
- Question: "Écris une phrase avec a, et, est."
- Requirements:
  - mode: "sentence"
  - keywords: "a", "et", "est"
- Hint: "Teste chaque mot: a = avait, est = était, et = et puis."
- Hint2: "Fais une seule phrase avec les trois mots : a, et, est."
- Hint3: "Exemple à recopier : « Il a une carte et il est prêt. »"
- Feedback: "Mix valide."

### Écran 10 - write - Phrase Mixte 2
- Question: "Écris une phrase au pluriel avec une virgule."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["ils", "elles", "nous", "vous", "joueurs", "amis"]
    - ["avancent", "courent", "jouent", "préparent", "protègent"]
  - mustInclude: ","
  - minWords: 8
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Hint2: "La phrase doit être au pluriel, avec une virgule entre deux actions."
- Hint3: "Exemple à recopier : « Les joueurs avancent, ils couvrent la base. »"
- Feedback: "Bon rythme."

### Écran 11 - interactive - Verification Finale 1
- Question: "Quelle phrase est correcte ?" (Les agents avance.)
- Options: "Les agents avance." / "Les agents avancent." / "Les agents avancer."
- Réponse: "Les agents avancent."
- Feedback: "Accord valide."

### Écran 12 - interactive - Verification Finale 2
- Question: "Quelle phrase respecte S+V+C ?"
- Options: "La zone protège l'agent." / "L'agent protège la zone." / "Protège l'agent la zone."
- Réponse: "L'agent protège la zone."
- Feedback: "Structure valide."

### Écran 13 - write - Micro Rapport
- Question: "Écris deux phrases S+V+C avec un sujet pluriel dans l'une."
- Requirements:
  - mode: "sentence"
  - minWords: 12
- Hint: "Vérifie l'ordre Sujet + Verbe + Complément, puis ajoute un détail concret."
- Hint2: "Écris deux phrases S+V+C, dont une avec un sujet pluriel."
- Hint3: "Exemple à recopier : « Je prépare la tactique. Les joueurs lancent l'attaque. »"
- Feedback: "Rapport clair."

### Écran 14 - write - Rapport Global
- Question: "Rédige 3 phrases sur un match terminé."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["match", "rencontre"]
    - ["équipe", "joueurs", "agents"]
    - ["stratégie", "tactique", "plan"]
  - minWords: 18
  - minSentences: 3
- Hint: "Fais des phrases courtes et claires, puis vérifie accords et ponctuation."
- Hint2: "Rédige 3 phrases: situation du match, action de l'équipe, bilan final."
- Hint3: "Exemple à recopier : « Le match commence. Les joueurs appliquent la tactique. Notre équipe gagne la rencontre. »"
- Feedback: "Rapport complet."

### Écran 15 - challenge - Ultime Boss - Module 1
- Question: "Rédige ton rapport final de mission. Tu dois utiliser au moins une virgule, le verbe 'REUSSIR' au présent, et le mot 'TACTIQUE'."
- Requirements:
  - mode: "sentence"
  - keywords: "réussissent", "réussit", "réussis", "réussissons", "réussissez"
  - mustInclude: ",", "tactique"
- Hint: "Vérifie les 3 contraintes: une virgule, une forme de 'réussir' au présent, et le mot 'tactique'."
- Feedback: "CODE ROUGE TERMINE. Félicitations Agent Lovyc !"


