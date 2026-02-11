# Draft - Lovyc Francais Module 1

## Meta
- Theme: Tactical Comms - structure de phrase et accords
- Objectif: S+V+C, accord pluriel, ponctuation, homophones, synthese
- Duree cible: ~10-12 min par mission

## Mission 1 - Le Noyau : S + V + C

### Objectifs pedagogiques et competences
- Identifier sujet, verbe, complement dans une phrase simple.
- Produire une phrase correcte au present (S+V+C).
- Verbaliser le role de chaque element.

### Index technique (ordre des steps)
1. lesson - Briefing : La Squad de Base
2. lesson - Carte Tactique SVC
3. interactive - Scan de Zone : Sujet
4. interactive - Scan de Zone : Verbe
5. interactive - Scan de Zone : Complement
6. write - Saisie Tactique : Verbe
7. write - Saisie Tactique : Complement
8. interactive - Ordre de Mission
9. write - Phrase SVC Controlee
10. interactive - Sujet Cache
11. write - Reordonnancement Express
12. interactive - Verbe ou Nom ?
13. write - Ajoute le Complement
14. write - Mini Rapport
15. challenge - Boss de Fin - Mission 1

### Ecran 1 - lesson - Briefing : La Squad de Base
- Texte: "Agent Lovyc, une phrase, c'est comme ta squad : chaque membre a un role vital. Sans Action (verbe), la mission ne bouge pas."
- Texte: "Tu as besoin de trois elements :"
- Encadre: "[1] L'Agent (Sujet) : Qui lance l'action ?" / "[2] L'Action (Verbe) : Que fait-on ?" / "[3] L'Objectif (Complement) : Quel est le but ?"

### Ecran 2 - lesson - Carte Tactique SVC
- Texte: "Pour retrouver le Sujet, pose la question: Qui est-ce qui ... ?"
- Texte: "Pour le Verbe: Qu'est-ce qu'il fait ?"
- Texte: "Pour le Complement: Quoi ? Ou ? A qui ?"

### Ecran 3 - interactive - Scan de Zone : Sujet
- Question: "Dans cette phrase, quel mot est L'Agent ?" (Le pro-gamer lance une attaque parfaite.)
- Options: "l'attaque" / "Le pro-gamer" / "parfaite"
- Reponse: "Le pro-gamer"
- Feedback: "Correct ! C'est le pro-gamer qui agit."

### Ecran 4 - interactive - Scan de Zone : Verbe
- Question: "Trouve le Verbe :" (Le pro-gamer lance une attaque parfaite.)
- Options: "lance" / "une attaque" / "pro-gamer"
- Reponse: "lance"
- Feedback: "Exact ! 'Lance' est l'action."

### Ecran 5 - interactive - Scan de Zone : Complement
- Question: "Quel est le Complement ?" (Le pro-gamer lance une attaque parfaite.)
- Options: "pro-gamer" / "lance" / "une attaque parfaite"
- Reponse: "une attaque parfaite"
- Feedback: "Bien vu. C'est l'objectif de l'action."

### Ecran 6 - write - Saisie Tactique : Verbe
- Question: "Ecris le mot qui manque (le Verbe) :" (Lovyc ____ son ecran de jeu.)
- Requirements:
  - mode: "verb"
  - keywords: "regarde", "allume", "fixe", "nettoie", "prepare"
- Hint: "Cherche une action concrete (regarde, allume, fixe...)"
- Feedback: "Bien !"

### Ecran 7 - write - Saisie Tactique : Complement
- Question: "Complete la phrase avec un complement simple :" (L'agent surveille ____.)
- Requirements:
  - mode: "sentence"
  - keywords: "zone", "map", "terrain", "couloir", "base"
- Hint: "Un complement indique quoi il surveille."
- Feedback: "Cible verrouillee."

### Ecran 8 - interactive - Ordre de Mission
- Question: "Quelle phrase respecte l'ordre S + V + C ?"
- Options: "Le drone la zone surveille." / "Le drone surveille la zone." / "Surveille le drone la zone."
- Reponse: "Le drone surveille la zone."
- Feedback: "Structure claire et efficace."

### Ecran 9 - write - Phrase SVC Controlee
- Question: "Ecris une phrase S + V + C avec ces mots :" (coach - explique - strategie)
- Requirements:
  - mode: "sentence"
  - keywords: "coach", "explique", "strategie"
  - enforceKeywords: true
- Hint: "Place d'abord le sujet."
- Feedback: "Flux valide."

### Ecran 10 - interactive - Sujet Cache
- Question: "Quel est le Sujet ?" (Dans le lobby, les joueurs discutent.)
- Options: "le lobby" / "les joueurs" / "discutent"
- Reponse: "les joueurs"
- Feedback: "Oui. Ce sont eux qui agissent."

### Ecran 11 - write - Reordonnancement Express
- Question: "Remets dans l'ordre pour former une phrase :" (zone - securise - l'agent - la)
- Requirements:
  - mode: "sentence"
  - keywords: "l'agent", "securise", "zone"
  - enforceKeywords: true
- Hint: "Relis la consigne, garde une phrase claire et verifie l'accord sujet-verbe."
- Feedback: "Ordre confirme."

### Ecran 12 - interactive - Verbe ou Nom ?
- Question: "Quel mot indique l'action dans cette phrase ?" (L'agent attaque la zone.)
- Options: "agent" / "attaque" / "zone"
- Reponse: "attaque"
- Feedback: "Oui. C'est l'action effectuee par l'agent."

### Ecran 13 - write - Ajoute le Complement
- Question: "Ajoute un complement pour completer la phrase :" (Lovyc lance.)
- Requirements:
  - mode: "sentence"
  - keywords: "strategie", "attaque", "drone", "signal"
- Hint: "Ajoute quoi ou vers quoi."
- Feedback: "Phrase complete."

### Ecran 14 - write - Mini Rapport
- Question: "Ecris deux phrases S+V+C sur une preparation de match."
- Requirements:
  - mode: "sentence"
  - keywords: "."
  - minWords: 8
- Hint: "Deux actions differentes, deux phrases."
- Feedback: "Rapport clair."

### Ecran 15 - challenge - Boss de Fin - Mission 1
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
8. write - Transmission Claire
9. write - Correction de Bug
10. interactive - Faux Ami
11. write - Accord Cache
12. interactive - Pluriel Repere
13. write - Phrase Plurielle Libre
14. write - Rapport Squad
15. challenge - Boss de Fin - Mission 2

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

### Ecran 8 - write - Transmission Claire
- Question: "Ecris une phrase correcte avec ces mots :" (ils - l'extraction - avancent - vers)
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "avancent", "l'extraction"
  - enforceKeywords: true
- Hint: "Commence par 'Ils...'."
- Feedback: "Transmission fluide."

### Ecran 9 - write - Correction de Bug
- Question: "Reecris la phrase sans erreur :" (Mes parents regarde mon match.)
- Requirements:
  - mode: "sentence"
  - keywords: "parents", "regardent", "match"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et verifie la ponctuation finale."
- Feedback: "Fix reussi ! Tes parents (ils) = regardent."

### Ecran 10 - interactive - Faux Ami
- Question: "Quel verbe est correct ?" (Les coequipiers ____ la defense.)
- Options: "ameliore" / "ameliorent" / "ameliores"
- Reponse: "ameliorent"
- Feedback: "Pluriel -> ameliorent."

### Ecran 11 - write - Accord Cache
- Question: "Complete la phrase :" (Les joueurs ____ la finale ce soir.)
- Requirements:
  - mode: "sentence"
  - keywords: "joueurs", "gagnent", "finale"
  - enforceKeywords: true
- Hint: "Sujet pluriel = verbe en -ent."
- Feedback: "Parfait."

### Ecran 12 - interactive - Pluriel Repere
- Question: "Quel mot montre que le sujet est pluriel ?" (Mes freres avancent vite.)
- Options: "vite" / "mes" / "avancent"
- Reponse: "mes"
- Feedback: "Oui. 'Mes' indique plusieurs."

### Ecran 13 - write - Phrase Plurielle Libre
- Question: "Ecris une phrase avec un sujet pluriel et un verbe au present."
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "elles", "mes", "les"
- Hint: "Commence par un groupe de plusieurs personnes."
- Feedback: "Accord valide."

### Ecran 14 - write - Rapport Squad
- Question: "Redige deux phrases avec un sujet pluriel dans chacune."
- Requirements:
  - mode: "sentence"
  - minWords: 10
- Hint: "Deux actions, deux accords."
- Feedback: "Rapport synchronise."

### Ecran 15 - challenge - Boss de Fin - Mission 2
- Question: "Reecris toute cette phrase sans aucune erreur :" (terrain - sur - le - saute - joueurs - les)
- Requirements:
  - mode: "sentence"
  - keywords: "joueurs", "sautent", "terrain"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et verifie la ponctuation finale."
- Feedback: "L'accord de la squad est parfait."

## Mission 3 - Le Flux Dynamique

### Objectifs pedagogiques et competences
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

### Ecran 1 - lesson - Le Scan de Ponctuation
- Encadre: "Le Point (.) : Fin d'action / Pause totale." / "La Virgule (,) : Micro-pause / Liste de composants."

### Ecran 2 - lesson - Point ou Virgule
- Texte: "Si tu passes a une nouvelle action, utilise le point. Si tu restes dans la meme action, utilise la virgule."

### Ecran 3 - interactive - Choix de Coupure 1
- Question: "Quelle ponctuation convient ?" (Lovyc vise la cible ____ il tire.)
- Options: "," / "." / "rien"
- Reponse: "."
- Feedback: "Deux actions separentes -> point."

### Ecran 4 - interactive - Choix de Coupure 2
- Question: "Quelle ponctuation convient ?" (Il ouvre la map ____ repere la zone.)
- Options: "," / "." / "rien"
- Reponse: ","
- Feedback: "Deux actions proches -> virgule."

### Ecran 5 - write - Split de Signal 1
- Question: "Separe ces deux actions par un point :" (se - commence - Lovyc - prepare - match - le)
- Requirements:
  - mode: "sentence"
  - keywords: "match", "Lovyc", "prepare"
  - enforceKeywords: true
  - mustInclude: "."
- Hint: "Separe les actions en deux phrases: action 1 + point + action 2."
- Feedback: "Parfait. Deux actions, deux phrases distinctes."

### Ecran 6 - write - Split de Signal 2
- Question: "Ajoute une virgule pour rendre la phrase plus fluide :" (La team avance elle reste groupée.)
- Requirements:
  - mode: "sentence"
  - keywords: "team"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Feedback: "Flux ajusté."

### Ecran 7 - interactive - Correction de Chat
- Question: "Ou placer la virgule ?" (Si tu gagnes je te rejoins.)
- Options: "Si tu gagnes, je te rejoins." / "Si tu, gagnes je te rejoins." / "Si tu gagnes je te, rejoins."
- Reponse: "Si tu gagnes, je te rejoins."
- Feedback: "Correct !"

### Ecran 8 - interactive - Pause Utile
- Question: "Quel signe fait une pause courte ?"
- Options: "Le point" / "La virgule" / "Le point d'exclamation"
- Reponse: "La virgule"
- Feedback: "La micro-pause."

### Ecran 9 - write - Ajout de Virgule
- Question: "Ajoute une virgule :" (En match Lovyc reste calme.)
- Requirements:
  - mode: "sentence"
  - keywords: "Lovyc", "match"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Feedback: "Respiration ok."

### Ecran 10 - write - Ajout de Point
- Question: "Ajoute un point pour separer les actions :" (Il monte le son il commence le stream)
- Requirements:
  - mode: "sentence"
  - keywords: "son", "stream"
  - mustInclude: "."
  - enforceKeywords: true
  - minWords: 6
- Hint: "Separe les actions en deux phrases: action 1 + point + action 2."
- Feedback: "Actions separees."

### Ecran 11 - interactive - Phrase Longue
- Question: "Quel choix est le plus clair ?" (Il charge il tire il avance)
- Options: "Il charge, il tire, il avance." / "Il charge il tire il avance." / "Il charge. il tire. il avance."
- Reponse: "Il charge, il tire, il avance."
- Feedback: "Liste d'actions -> virgules."

### Ecran 12 - write - Message Clair
- Question: "Reecris avec ponctuation :" (je - check - le - radar - je - bouge)
- Requirements:
  - mode: "sentence"
  - keywords: "radar"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 6
- Hint: "Deux actions proches -> virgule."
- Feedback: "Message clair."

### Ecran 13 - write - Micro Rapport
- Question: "Ecris deux phrases courtes sur ton entrainement."
- Requirements:
  - mode: "sentence"
  - minWords: 8
  - mustInclude: "."
- Hint: "Fais des phrases courtes et claires, puis verifie accords et ponctuation."
- Feedback: "Rapport propre."

### Ecran 14 - interactive - Derniere Verification
- Question: "Quelle phrase est correcte ?"
- Options: "Je prends le casque, je pars." / "Je prends le casque. je pars." / "Je prends le casque je pars."
- Reponse: "Je prends le casque, je pars."
- Feedback: "La virgule relie deux actions proches."

### Ecran 15 - challenge - Boss de Fin - Mission 3
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

### Ecran 1 - lesson - Le Scan a vs à
- Encadre: "a (sans accent) : On peut dire 'avait'." / "a (avec accent) : On ne peut pas. C'est une direction."

### Ecran 2 - lesson - Le Scan et / est
- Encadre: "et : on peut dire 'et puis'." / "est : on peut dire 'etait'."

### Ecran 3 - interactive - Test a 1
- Question: "Choisis le bon code :" (Lovyc ____ gagne son match.)
- Options: "a (avait)" / "à"
- Reponse: "a (avait)"
- Feedback: "Bravo !"

### Ecran 4 - interactive - Test a 2
- Question: "Choisis le bon code :" (Il va ____ la base.)
- Options: "a (avait)" / "à"
- Reponse: "à"
- Feedback: "Direction -> a avec accent."

### Ecran 5 - interactive - Test et 1
- Question: "Choisis la bonne forme :" (Le coach ____ calme.)
- Options: "et" / "est"
- Reponse: "est"
- Feedback: "On peut dire etait."

### Ecran 6 - interactive - Test est 1
- Question: "Choisis la bonne forme :" (Il parle ____ il explique.)
- Options: "et" / "est"
- Reponse: "et"
- Feedback: "On peut dire et puis."

### Ecran 7 - write - Combo Tactique
- Question: "Reecris la phrase sans erreur :" (et - est - rapide - le - pro-gamer - precis)
- Requirements:
  - mode: "sentence"
  - keywords: "est", "rapide", "et", "precis"
  - enforceKeywords: true
- Hint: "Relis mot par mot, corrige l'accord et verifie la ponctuation finale."
- Feedback: "Parfait ! Il 'etait' rapide 'et puis' precis."

### Ecran 8 - write - Correction Simple
- Question: "Corrige :" (il a la finale et il a fier)
- Requirements:
  - mode: "sentence"
  - keywords: "a", "et", "est"
- Hint: "Relis mot par mot, corrige l'accord et verifie la ponctuation finale."
- Feedback: "Correctif applique."

### Ecran 9 - interactive - Variante a / à
- Question: "Choisis la bonne forme :" (Elle ____ raison.)
- Options: "a" / "à"
- Reponse: "a"
- Feedback: "Test 'avait'."

### Ecran 10 - interactive - Variante et / est
- Question: "Choisis la bonne forme :" (Le signal ____ clair.)
- Options: "et" / "est"
- Reponse: "est"
- Feedback: "Test 'etait'."

### Ecran 11 - write - Phrase Mixte
- Question: "Ecris une phrase avec a et est correctement."
- Requirements:
  - mode: "sentence"
  - keywords: "a", "est"
- Hint: "Teste chaque mot: a = avait, est = etait, et = et puis."
- Feedback: "Phrase clean."

### Ecran 12 - write - Phrase Mixte 2
- Question: "Ecris une phrase avec et et a correctement."
- Requirements:
  - mode: "sentence"
  - keywords: "et", "a"
- Hint: "Teste chaque mot: a = avait, est = etait, et = et puis."
- Feedback: "Validation ok."

### Ecran 13 - interactive - Relecture Rapide
- Question: "Quelle phrase est correcte ?"
- Options: "Il a rapide et il est tard." / "Il est rapide et il a tard." / "Il est rapide et il a la finale."
- Reponse: "Il est rapide et il a la finale."
- Feedback: "Lecture valide."

### Ecran 14 - write - Rapport Court
- Question: "Ecris deux phrases courtes avec a et est."
- Requirements:
  - mode: "sentence"
  - minWords: 8
- Hint: "Teste chaque mot: a = avait, est = etait, et = et puis."
- Feedback: "Rapport en regle."

### Ecran 15 - challenge - Boss de Fin - Mission 4
- Question: "Corrige cette phrase pleine de parasites :" (va - a - il - raquette - a - salle - la - et - une - il)
- Requirements:
  - keywords: "a", "à", "et"
- Hint: "Utilise les tests : avait, et puis, avait."
- Feedback: "Filtres actives. Ton message est cristallin."

## Mission 5 - L'Ultime Deploiement

### Objectifs pedagogiques et competences
- Mobiliser S+V+C et accord pluriel dans une synthese.
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

### Ecran 1 - msg - Examen de Grade
- Texte: "Agent Lovyc, c'est l'heure du deploiement final. Prouve que tu maitrises tout l'equipement tactique."

### Ecran 2 - interactive - Structure S+V+C
- Question: "Quel flux de donnees respecte l'ordre S+V+C ?"
- Options: "Dujardin la rue descendait." / "Dujardin descendait la rue." / "La rue descendait Dujardin."
- Reponse: "Dujardin descendait la rue."
- Feedback: "Structure litteraire verrouillee."

### Ecran 3 - interactive - Accord Squad
- Question: "Choisis la bonne forme :" (Les joueurs ____ la zone.)
- Options: "securise" / "securisent" / "securises"
- Reponse: "securisent"
- Feedback: "Pluriel -> -ent."

### Ecran 4 - write - S+V+C Libre
- Question: "Ecris une phrase S+V+C au present."
- Requirements:
  - mode: "sentence"
  - minWords: 6
- Hint: "Verifie l'ordre Sujet + Verbe + Complement, puis ajoute un detail concret."
- Feedback: "Bonne structure."

### Ecran 5 - write - Accord Pluriel
- Question: "Corrige cette phrase (Hugo) en respectant le code -ENT :" (Les hommes marche dans l'ombre.)
- Requirements:
  - mode: "sentence"
  - keywords: "hommes", "marchent", "ombre"
  - enforceKeywords: true
- Hint: "Repere d'abord le sujet pluriel, puis accorde le verbe en -ent."
- Feedback: "Liaison squad etablie."

### Ecran 6 - interactive - Ponctuation Simple
- Question: "Quelle phrase est la plus claire ?"
- Options: "Je charge, je tire." / "Je charge. je tire." / "Je charge je tire."
- Reponse: "Je charge, je tire."
- Feedback: "Virgule utile."

### Ecran 7 - write - Point et Virgule
- Question: "Ajoute une virgule et un point :" (je - check - la - map - je - pars - vite)
- Requirements:
  - mode: "sentence"
  - keywords: "map"
  - mustInclude: ",", "."
  - enforceKeywords: true
  - minWords: 7
- Hint: "Mets la virgule entre deux actions proches, puis le point pour cloturer l'idee."
- Feedback: "Ponctuation appliquee."

### Ecran 8 - interactive - Homophones Rapides
- Question: "Choisis la phrase correcte :"
- Options: "Il a rapide et il est fier." / "Il est rapide et il a la finale." / "Il et rapide et il a la finale."
- Reponse: "Il est rapide et il a la finale."
- Feedback: "Homophones ok."

### Ecran 9 - write - Phrase Mixte 1
- Question: "Ecris une phrase avec a, et, est."
- Requirements:
  - mode: "sentence"
  - keywords: "a", "et", "est"
- Hint: "Teste chaque mot: a = avait, est = etait, et = et puis."
- Feedback: "Mix valide."

### Ecran 10 - write - Phrase Mixte 2
- Question: "Ecris une phrase au pluriel avec une virgule."
- Requirements:
  - mode: "sentence"
  - keywords: "ils", "elles", "nous", "vous"
  - mustInclude: ","
  - enforceKeywords: true
  - minWords: 8
- Hint: "Place la virgule a l'endroit de la micro-pause, entre les deux actions."
- Feedback: "Bon rythme."

### Ecran 11 - interactive - Verification Finale 1
- Question: "Quelle phrase est correcte ?" (Les agents avance.)
- Options: "Les agents avance." / "Les agents avancent." / "Les agents avancer."
- Reponse: "Les agents avancent."
- Feedback: "Accord valide."

### Ecran 12 - interactive - Verification Finale 2
- Question: "Quelle phrase respecte S+V+C ?"
- Options: "La zone protege l'agent." / "L'agent protege la zone." / "Protege l'agent la zone."
- Reponse: "L'agent protege la zone."
- Feedback: "Structure valide."

### Ecran 13 - write - Micro Rapport
- Question: "Ecris deux phrases S+V+C avec un sujet pluriel dans l'une."
- Requirements:
  - mode: "sentence"
  - minWords: 12
- Hint: "Verifie l'ordre Sujet + Verbe + Complement, puis ajoute un detail concret."
- Feedback: "Rapport clair."

### Ecran 14 - write - Rapport Global
- Question: "Redige 3 phrases sur un match termine."
- Requirements:
  - mode: "sentence"
  - minWords: 18
- Hint: "Fais des phrases courtes et claires, puis verifie accords et ponctuation."
- Feedback: "Rapport complet."

### Ecran 15 - challenge - Ultime Boss - Module 1
- Question: "Redige ton rapport final de mission. Tu dois utiliser au moins une virgule, le verbe 'REUSSIR' au present, et le mot 'TACTIQUE'."
- Requirements:
  - mode: "sentence"
  - keywords: "reussissent", "reussit", "reussis", "reussissons", "reussissez"
  - mustInclude: ",", "tactique"
- Hint: "Exemple : Tes missions reussissent, c'est une victoire tactique."
- Feedback: "CODE ROUGE TERMINE. Felicitations Agent Lovyc !"

