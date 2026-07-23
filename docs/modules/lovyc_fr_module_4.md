# Draft - Lovyc Français Module 4

## Meta
- Thème: Tactical Comms - argumentation et compte-rendu
- Objectif: thèse, argument, exemple, jugement nuancé, compte-rendu d'opération structuré et convaincant
- Durée cible: ~10-12 min par mission
- AgentPedago: PROF_FRANCAIS_4E + ARCHITECTE_PEDAGO_WEB
- SourcesPedago: CURRICULUM + PROGRESS + AGENTS_BASELINE
- CartesLocalLibrary: local_library/cards/francais/*.json
- Missions: 5
- ScreensPerMission: 15

## Mission 1 - Thèse et avis clair

### Objectifs pédagogiques et compétences
- Exprimer une thèse claire sur une situation tactique.
- Distinguer un avis affirmé d'une simple information.
- Employer des marqueurs de position.

### Index technique (ordre des steps)
1. lesson - Briefing : Prendre position
2. lesson - La thèse en transmission
3. interactive - Identifier l'avis
4. interactive - Phrase de position
5. write - Avis de l'agent
6. write - Thèse sur la carte
7. interactive - Marqueur de thèse
8. interactive - Information ou avis
9. write - Position justifiée
10. write - Ordre argumenté
11. interactive - Thèse précise
12. write - Message de squad
13. write - Réécriture claire
14. interactive - Check de transmission
15. challenge - Boss de Fin - Mission 1

### Écran 1 - lesson - Briefing : Prendre position
- Texte: "Pour convaincre une squad, commence par une thèse : c'est ton avis clair sur la meilleure décision."
- Liste: "Je pense que... : annonce un avis." / "Selon moi... : précise ta position." / "Il faut... : formule une décision."

### Écran 2 - lesson - La thèse en transmission
- Texte: "Une thèse répond à une question et ne reste pas vague. Elle indique ce que l'agent recommande."
- Texte: "Exemple : « Je pense que la squad doit sécuriser le pont avant d'avancer. »"

### Écran 3 - interactive - Identifier l'avis
- Question: "Quelle phrase exprime une thèse ?" 
- Options: "Le drone survole le secteur nord." / "Je pense que le secteur nord doit être sécurisé." / "Le secteur nord mesure deux kilomètres."
- Réponse: "Je pense que le secteur nord doit être sécurisé."
- Feedback: "Correct. La formule « Je pense que » annonce une position."

### Écran 4 - interactive - Phrase de position
- Question: "Quelle transmission donne un avis clair sur l'itinéraire ?"
- Options: "Le tunnel est sous la colline." / "Selon moi, il faut passer par le tunnel." / "Le tunnel possède deux entrées."
- Réponse: "Selon moi, il faut passer par le tunnel."
- Feedback: "Position nette : la squad sait quoi envisager."

### Écran 5 - write - Avis de l'agent
- Question: "Écris une thèse claire sur la meilleure zone à sécuriser."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense"
  - enforceKeywords: true
- Hint: "Commence par « Je pense que »."
- Hint2: "Ajoute une décision précise concernant une zone."
- Hint3: "Exemple à recopier : « Je pense que nous devons sécuriser le pont. »"
- Feedback: "Thèse reçue. Ta position est compréhensible."

### Écran 6 - write - Thèse sur la carte
- Question: "Donne ton avis sur l'utilisation d'un drone de reconnaissance."
- Requirements:
  - mode: "sentence"
  - keywords: "selon moi"
  - enforceKeywords: true
- Hint: "Utilise le marqueur « Selon moi »."
- Hint2: "Indique clairement ce que la squad devrait faire avec le drone."
- Hint3: "Exemple à recopier : « Selon moi, le drone doit scanner la rivière. »"
- Feedback: "Avis précis. Le commandement peut décider."

### Écran 7 - interactive - Marqueur de thèse
- Question: "Quel groupe de mots annonce le mieux une opinion ?"
- Options: "Je pense que" / "Hier matin" / "Dans le hangar"
- Réponse: "Je pense que"
- Feedback: "Exact. Ce marqueur ouvre une thèse."

### Écran 8 - interactive - Information ou avis
- Question: "Quelle phrase est une information et non une thèse ?"
- Options: "Il faut protéger la balise." / "À mon avis, la balise est prioritaire." / "La balise clignote en rouge."
- Réponse: "La balise clignote en rouge."
- Feedback: "C'est un fait observé, pas une position."

### Écran 9 - write - Position justifiée
- Question: "Écris une phrase où tu affirmes que la squad doit rester groupée."
- Requirements:
  - mode: "sentence"
  - keywords: "il faut", "squad"
  - enforceKeywords: true
- Hint: "Utilise « Il faut » pour exprimer une recommandation."
- Hint2: "Nomme la squad et indique l'action attendue."
- Hint3: "Exemple à recopier : « Il faut que la squad reste groupée. »"
- Feedback: "Recommandation claire, signal validé."

### Écran 10 - write - Ordre argumenté
- Question: "Écris un avis clair sur le moment de lancer l'opération."
- Requirements:
  - mode: "sentence"
  - keywords: "à mon avis"
  - enforceKeywords: true
- Hint: "Commence par « À mon avis »."
- Hint2: "Choisis un moment précis pour le lancement."
- Hint3: "Exemple à recopier : « À mon avis, nous devons lancer l'opération à l'aube. »"
- Feedback: "Ton avis donne une direction à l'équipe."

### Écran 11 - interactive - Thèse précise
- Question: "Quelle thèse est la plus précise ?"
- Options: "Il faut faire attention." / "Je pense que nous devons envoyer un drone sur le toit." / "La mission est importante."
- Réponse: "Je pense que nous devons envoyer un drone sur le toit."
- Feedback: "Elle contient une décision concrète."

### Écran 12 - write - Message de squad
- Question: "Rédige deux phrases : une observation puis ton avis sur la suite."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense"
  - enforceKeywords: true
  - minWords: 12
- Hint: "Commence par un fait observé, puis donne ton avis."
- Hint2: "Ta deuxième phrase peut commencer par « Je pense que »."
- Hint3: "Exemple à recopier : « Le pont est surveillé. Je pense que nous devons contourner la zone. »"
- Feedback: "Message structuré : fait puis position."

### Écran 13 - write - Réécriture claire
- Question: "Réécris cette idée sous la forme d'une thèse : « passer par le tunnel est une bonne idée »."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense"
  - enforceKeywords: true
- Hint: "Transforme l'idée en phrase complète."
- Hint2: "Ajoute « Je pense que » et une majuscule."
- Hint3: "Exemple à recopier : « Je pense que passer par le tunnel est une bonne idée. »"
- Feedback: "Ta thèse est maintenant formulée correctement."

### Écran 14 - interactive - Check de transmission
- Question: "Quelle phrase permet le mieux de convaincre la squad d'agir ?"
- Options: "Le radar est là." / "Selon moi, il faut désactiver le radar maintenant." / "Le radar est métallique."
- Réponse: "Selon moi, il faut désactiver le radar maintenant."
- Feedback: "La décision est explicite."

### Écran 15 - challenge - Boss de Fin - Mission 1
- Question: "Rédige une thèse de mission en expliquant quelle action la squad doit accomplir en premier."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense", "doit"
  - enforceKeywords: true
  - minWords: 20
- Hint: "Annonce clairement ta position avant de décrire l'action."
- Hint2: "Utilise « Je pense que » et précise l'action prioritaire de la squad."
- Hint3: "Exemple à recopier : « Je pense que la squad doit sécuriser le relais avant de traverser le pont, car cette action protège toute l'opération. »"
- Feedback: "Boss validé. Ta thèse donne un cap à l'opération."

## Mission 2 - Argument et exemple

### Objectifs pédagogiques et compétences
- Construire un argument qui soutient une thèse.
- Ajouter un exemple concret comme preuve.
- Utiliser des connecteurs de justification.

### Index technique (ordre des steps)
1. lesson - Briefing : Prouver sa décision
2. lesson - Argument et exemple
3. interactive - Identifier l'argument
4. interactive - Repérer l'exemple
5. write - Argument de sécurité
6. write - Exemple concret
7. interactive - Connecteur de preuve
8. interactive - Argument ou détail
9. write - Thèse avec raison
10. write - Preuve de terrain
11. interactive - Chaîne convaincante
12. write - Rapport avec exemple
13. write - Réécriture de preuve
14. interactive - Dernier contrôle
15. challenge - Boss de Fin - Mission 2

### Écran 1 - lesson - Briefing : Prouver sa décision
- Texte: "Une thèse devient convaincante quand tu ajoutes un argument : une raison qui explique ta décision."
- Texte: "Exemple : « Il faut sécuriser le pont, parce qu'il est le seul passage vers la base. »"

### Écran 2 - lesson - Argument et exemple
- Texte: "L'exemple rend l'argument concret. Il peut raconter un fait observé pendant l'opération."
- Liste: "Thèse : ce que tu défends." / "Argument : pourquoi tu le défends." / "Exemple : une preuve précise."

### Écran 3 - interactive - Identifier l'argument
- Question: "Dans quelle partie se trouve l'argument ?" (Il faut envoyer un drone, car le brouillard cache les mouvements ennemis.)
- Options: "Il faut envoyer un drone" / "car le brouillard cache les mouvements ennemis" / "un drone"
- Réponse: "car le brouillard cache les mouvements ennemis"
- Feedback: "Correct. L'argument explique la recommandation."

### Écran 4 - interactive - Repérer l'exemple
- Question: "Quelle phrase contient un exemple concret ?"
- Options: "Il faut rester prudent." / "Par exemple, hier un drone a repéré une embuscade près du pont." / "La prudence est utile."
- Réponse: "Par exemple, hier un drone a repéré une embuscade près du pont."
- Feedback: "L'exemple apporte un fait vérifiable."

### Écran 5 - write - Argument de sécurité
- Question: "Écris une recommandation avec un argument introduit par « parce que »."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que"
  - enforceKeywords: true
- Hint: "Donne une décision puis sa raison."
- Hint2: "Place « parce que » entre la recommandation et l'explication."
- Hint3: "Exemple à recopier : « Il faut couvrir la sortie parce que le secteur est dangereux. »"
- Feedback: "Argument transmis : ta raison est visible."

### Écran 6 - write - Exemple concret
- Question: "Écris une phrase qui commence par « Par exemple » et présente une preuve de terrain."
- Requirements:
  - mode: "sentence"
  - keywords: "par exemple"
  - enforceKeywords: true
- Hint: "Choisis un fait observé par un agent ou un drone."
- Hint2: "Commence par « Par exemple » et décris une action précise."
- Hint3: "Exemple à recopier : « Par exemple, le drone a repéré deux ennemis près du tunnel. »"
- Feedback: "Preuve concrète enregistrée."

### Écran 7 - interactive - Connecteur de preuve
- Question: "Quel connecteur introduit le mieux une raison ?"
- Options: "parce que" / "puis" / "mais"
- Réponse: "parce que"
- Feedback: "Exact. Il relie une décision à sa cause."

### Écran 8 - interactive - Argument ou détail
- Question: "Quelle phrase donne un argument pour protéger le relais ?"
- Options: "Le relais est gris." / "Il faut protéger le relais, car il transmet les ordres." / "Le relais est derrière le mur."
- Réponse: "Il faut protéger le relais, car il transmet les ordres."
- Feedback: "La raison soutient bien la décision."

### Écran 9 - write - Thèse avec raison
- Question: "Écris une thèse sur le drone et justifie-la avec « car »."
- Requirements:
  - mode: "sentence"
  - keywords: "car"
  - enforceKeywords: true
- Hint: "Prends position sur l'usage du drone."
- Hint2: "Ajoute « car » suivi d'une raison complète."
- Hint3: "Exemple à recopier : « Le drone doit partir en éclaireur, car la route est inconnue. »"
- Feedback: "Thèse et argument sont reliés."

### Écran 10 - write - Preuve de terrain
- Question: "Donne un exemple qui prouve que la squad doit rester groupée."
- Requirements:
  - mode: "sentence"
  - keywords: "par exemple", "squad"
  - enforceKeywords: true
- Hint: "Raconte un fait court qui montre un danger."
- Hint2: "Utilise « Par exemple » puis mentionne la squad."
- Hint3: "Exemple à recopier : « Par exemple, la squad isolée a perdu le contact avec le guide. »"
- Feedback: "Ton exemple soutient efficacement l'argument."

### Écran 11 - interactive - Chaîne convaincante
- Question: "Quelle phrase associe le mieux décision et argument ?"
- Options: "Le tunnel est long." / "Il faut éviter le tunnel parce qu'il est surveillé." / "Le tunnel se trouve au nord."
- Réponse: "Il faut éviter le tunnel parce qu'il est surveillé."
- Feedback: "Décision plus raison : message convaincant."

### Écran 12 - write - Rapport avec exemple
- Question: "Rédige deux phrases : une recommandation et un exemple qui la prouve."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "par exemple"
  - enforceKeywords: true
  - minWords: 16
- Hint: "Formule d'abord ce qu'il faut faire."
- Hint2: "Ajoute une raison avec « parce que », puis un exemple avec « Par exemple »."
- Hint3: "Exemple à recopier : « Il faut surveiller le pont parce que la zone est exposée. Par exemple, un drone y a détecté un mouvement ennemi. »"
- Feedback: "Rapport convaincant : raison et preuve sont présentes."

### Écran 13 - write - Réécriture de preuve
- Question: "Réécris cette idée avec un exemple : « le scan est utile »."
- Requirements:
  - mode: "sentence"
  - keywords: "par exemple"
  - enforceKeywords: true
- Hint: "Transforme l'idée en preuve précise."
- Hint2: "Commence par « Par exemple » et montre ce que le scan révèle."
- Hint3: "Exemple à recopier : « Par exemple, le scan révèle les pièges avant l'avancée. »"
- Feedback: "Preuve reformulée avec précision."

### Écran 14 - interactive - Dernier contrôle
- Question: "Quelle phrase apporte la preuve la plus utile ?"
- Options: "Le radar est actif." / "Par exemple, le radar a signalé trois drones hier soir." / "Le radar est important."
- Réponse: "Par exemple, le radar a signalé trois drones hier soir."
- Feedback: "La preuve est datée et concrète."

### Écran 15 - challenge - Boss de Fin - Mission 2
- Question: "Rédige une recommandation argumentée avec une raison et un exemple concret pour convaincre ta squad."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "par exemple"
  - enforceKeywords: true
  - minWords: 25
- Hint: "Choisis une décision tactique claire."
- Hint2: "Utilise « parce que » pour la raison et « Par exemple » pour la preuve."
- Hint3: "Exemple à recopier : « Il faut sécuriser le relais parce que toutes les équipes dépendent de ses messages. Par exemple, hier sa panne a isolé la squad du secteur nord. »"
- Feedback: "Boss validé. Ton argumentation résiste au briefing."

## Mission 3 - Jugement nuancé

### Objectifs pédagogiques et compétences
- Exprimer une opinion sans certitude absolue.
- Employer des marqueurs de nuance.
- Opposer une réserve à une idée avec « toutefois ».

### Index technique (ordre des steps)
1. lesson - Briefing : Garder le doute
2. lesson - Les marqueurs de nuance
3. interactive - Identifier la nuance
4. interactive - Certitude ou hypothèse
5. write - Hypothèse tactique
6. write - Réserve sur le plan
7. interactive - Connecteur nuancé
8. interactive - Choix prudent
9. write - Avis avec peut-être
10. write - Opposition mesurée
11. interactive - Nuance correcte
12. write - Rapport prudent
13. write - Réécriture nuancée
14. interactive - Check de prudence
15. challenge - Boss de Fin - Mission 3

### Écran 1 - lesson - Briefing : Garder le doute
- Texte: "Un agent sérieux ne prétend pas tout savoir. Il nuance son jugement quand les informations sont incomplètes."
- Liste: "Peut-être : hypothèse." / "Il semble que : observation prudente." / "Toutefois : réserve ou opposition."

### Écran 2 - lesson - Les marqueurs de nuance
- Texte: "La nuance rend un rapport plus juste : elle montre ce qui est probable, possible ou limité."
- Texte: "Exemple : « Il semble que le tunnel soit libre ; toutefois, le scan reste nécessaire. »"

### Écran 3 - interactive - Identifier la nuance
- Question: "Quelle phrase exprime une hypothèse ?"
- Options: "Le drone est détruit." / "Peut-être que le drone est caché derrière la tour." / "Le drone est une machine."
- Réponse: "Peut-être que le drone est caché derrière la tour."
- Feedback: "Correct. « Peut-être » indique une possibilité."

### Écran 4 - interactive - Certitude ou hypothèse
- Question: "Quelle phrase est la plus prudente avant d'entrer dans le tunnel ?"
- Options: "Le tunnel est totalement vide." / "Il semble que le tunnel soit calme." / "Le tunnel sera toujours sûr."
- Réponse: "Il semble que le tunnel soit calme."
- Feedback: "Le rapport reconnaît une information incertaine."

### Écran 5 - write - Hypothèse tactique
- Question: "Écris une hypothèse sur la position des ennemis."
- Requirements:
  - mode: "sentence"
  - keywords: "peut-être"
  - enforceKeywords: true
- Hint: "Ne présente pas ton idée comme certaine."
- Hint2: "Commence par « Peut-être que » et indique une position."
- Hint3: "Exemple à recopier : « Peut-être que les ennemis attendent près du pont. »"
- Feedback: "Hypothèse transmise avec prudence."

### Écran 6 - write - Réserve sur le plan
- Question: "Écris une phrase nuancée qui commence par « Il semble que »."
- Requirements:
  - mode: "sentence"
  - keywords: "il semble"
  - enforceKeywords: true
- Hint: "Décris une observation qui n'est pas certaine."
- Hint2: "Utilise « Il semble que » suivi d'une proposition complète."
- Hint3: "Exemple à recopier : « Il semble que la route soit dégagée. »"
- Feedback: "Observation prudente validée."

### Écran 7 - interactive - Connecteur nuancé
- Question: "Quel mot introduit une réserve ?"
- Options: "toutefois" / "donc" / "ensuite"
- Réponse: "toutefois"
- Feedback: "Exact. Il permet de limiter une affirmation."

### Écran 8 - interactive - Choix prudent
- Question: "Quelle phrase est la plus nuancée ?"
- Options: "La zone est sans danger." / "La zone est peut-être sans danger, mais le scan continue." / "La zone est forcément sans danger."
- Réponse: "La zone est peut-être sans danger, mais le scan continue."
- Feedback: "Elle associe possibilité et prudence."

### Écran 9 - write - Avis avec peut-être
- Question: "Donne un avis prudent sur l'heure du départ."
- Requirements:
  - mode: "sentence"
  - keywords: "peut-être"
  - enforceKeywords: true
- Hint: "Propose une heure sans l'imposer comme une certitude."
- Hint2: "Insère « peut-être » dans une phrase complète."
- Hint3: "Exemple à recopier : « Nous partirons peut-être à l'aube si le brouillard se lève. »"
- Feedback: "Décision prudente, communication fiable."

### Écran 10 - write - Opposition mesurée
- Question: "Écris une phrase avec « toutefois » sur le plan d'attaque."
- Requirements:
  - mode: "sentence"
  - keywords: "toutefois"
  - enforceKeywords: true
- Hint: "Annonce une idée, puis ajoute une limite."
- Hint2: "Place « toutefois » avant la réserve sur le plan."
- Hint3: "Exemple à recopier : « Le plan est solide ; toutefois, le pont reste exposé. »"
- Feedback: "Réserve claire : le rapport reste nuancé."

### Écran 11 - interactive - Nuance correcte
- Question: "Quelle phrase utilise correctement « toutefois » ?"
- Options: "Toutefois le drone vole." / "Le drone est utile ; toutefois, sa batterie est faible." / "Le drone toutefois est utile."
- Réponse: "Le drone est utile ; toutefois, sa batterie est faible."
- Feedback: "La réserve s'oppose à l'idée précédente."

### Écran 12 - write - Rapport prudent
- Question: "Rédige deux phrases : une hypothèse puis une réserve."
- Requirements:
  - mode: "sentence"
  - keywords: "peut-être", "toutefois"
  - enforceKeywords: true
  - minWords: 15
- Hint: "Commence par une possibilité observée."
- Hint2: "Ajoute ensuite une limite avec « toutefois »."
- Hint3: "Exemple à recopier : « Peut-être que le hangar est encore vide. Toutefois, nous devons vérifier chaque entrée avant d'avancer. »"
- Feedback: "Rapport prudent et crédible."

### Écran 13 - write - Réécriture nuancée
- Question: "Réécris cette certitude de manière prudente : « Le relais est détruit. »"
- Requirements:
  - mode: "sentence"
  - keywords: "il semble"
  - enforceKeywords: true
- Hint: "Évite d'affirmer le fait sans preuve."
- Hint2: "Commence par « Il semble que » et conserve l'idée du relais."
- Hint3: "Exemple à recopier : « Il semble que le relais soit détruit. »"
- Feedback: "Réécriture nuancée réussie."

### Écran 14 - interactive - Check de prudence
- Question: "Quel groupe de mots convient à une information incertaine ?"
- Options: "Il est certain que" / "Il semble que" / "Sans aucun doute"
- Réponse: "Il semble que"
- Feedback: "Le niveau de certitude est bien adapté."

### Écran 15 - challenge - Boss de Fin - Mission 3
- Question: "Rédige un jugement nuancé sur le passage par le tunnel : propose une idée et ajoute une réserve."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["il semble", "peut-être"]
    - ["toutefois", "mais"]
  - enforceKeywords: true
  - minWords: 20
- Hint: "Exprime une possibilité, puis une limite."
- Hint2: "Utilise un marqueur d'incertitude et un connecteur de réserve."
- Hint3: "Exemple à recopier : « Il semble que le tunnel soit praticable ; toutefois, nous devons envoyer un drone avant de faire avancer toute la squad. »"
- Feedback: "Boss validé. Ton jugement reste prudent et convaincant."

## Mission 4 - Structure du compte-rendu

### Objectifs pédagogiques et compétences
- Organiser un compte-rendu selon une structure logique.
- Distinguer contexte, actions, résultat et conclusion.
- Employer des connecteurs temporels et conclusifs.

### Index technique (ordre des steps)
1. lesson - Briefing : Le rapport en quatre blocs
2. lesson - Contexte, actions, résultat, conclusion
3. interactive - Identifier le contexte
4. interactive - Identifier le résultat
5. write - Contexte de mission
6. write - Action ordonnée
7. interactive - Ordre du rapport
8. interactive - Connecteur de conclusion
9. write - Résultat observé
10. write - Conclusion tactique
11. interactive - Bloc manquant
12. write - Rapport en quatre phrases
13. write - Réorganisation de transmission
14. interactive - Dernier check
15. challenge - Boss de Fin - Mission 4

### Écran 1 - lesson - Briefing : Le rapport en quatre blocs
- Texte: "Un compte-rendu convaincant suit un itinéraire clair : contexte → actions → résultat → conclusion."
- Liste: "Contexte : où et quand ?" / "Actions : qu'avons-nous fait ?" / "Résultat : qu'est-il arrivé ?" / "Conclusion : que faut-il retenir ?"

### Écran 2 - lesson - Contexte, actions, résultat, conclusion
- Texte: "Exemple : « À l'aube, la squad a atteint le pont. Elle a déployé deux drones. Le passage a été sécurisé. Donc, nous pouvons avancer. »"

### Écran 3 - interactive - Identifier le contexte
- Question: "Quelle phrase donne le contexte d'une opération ?"
- Options: "Nous avons activé le drone." / "À l'aube, la squad se trouvait près du pont." / "Le pont est maintenant sécurisé."
- Réponse: "À l'aube, la squad se trouvait près du pont."
- Feedback: "Correct. Le contexte situe le moment et le lieu."

### Écran 4 - interactive - Identifier le résultat
- Question: "Quelle phrase présente un résultat ?"
- Options: "Nous avons lancé le scan." / "Le scan a révélé une route libre." / "Nous allons vérifier la route."
- Réponse: "Le scan a révélé une route libre."
- Feedback: "C'est la conséquence observable de l'action."

### Écran 5 - write - Contexte de mission
- Question: "Écris une phrase de contexte avec un lieu et un moment."
- Requirements:
  - mode: "sentence"
  - keywords: "aube", "squad"
  - enforceKeywords: true
- Hint: "Situe la squad dans le temps et l'espace."
- Hint2: "Tu peux commencer par « À l'aube » et placer la squad près d'un lieu."
- Hint3: "Exemple à recopier : « À l'aube, la squad se trouvait près du relais. »"
- Feedback: "Contexte enregistré."

### Écran 6 - write - Action ordonnée
- Question: "Écris une phrase qui raconte une action de la squad."
- Requirements:
  - mode: "sentence"
  - keywords: "squad", "déployé"
  - enforceKeywords: true
- Hint: "Utilise un verbe d'action au passé composé."
- Hint2: "Indique ce que la squad a déployé pendant l'opération."
- Hint3: "Exemple à recopier : « La squad a déployé un drone au-dessus du pont. »"
- Feedback: "Action inscrite dans le rapport."

### Écran 7 - interactive - Ordre du rapport
- Question: "Quel ordre convient à un compte-rendu ?"
- Options: "Conclusion → contexte → actions → résultat" / "Contexte → actions → résultat → conclusion" / "Résultat → actions → contexte → conclusion"
- Réponse: "Contexte → actions → résultat → conclusion"
- Feedback: "C'est la structure qui rend le rapport facile à suivre."

### Écran 8 - interactive - Connecteur de conclusion
- Question: "Quel connecteur introduit le mieux une conclusion ?"
- Options: "donc" / "car" / "pendant"
- Réponse: "donc"
- Feedback: "« Donc » annonce ce que l'on déduit du résultat."

### Écran 9 - write - Résultat observé
- Question: "Écris une phrase qui indique le résultat d'un scan."
- Requirements:
  - mode: "sentence"
  - keywords: "a révélé"
  - enforceKeywords: true
- Hint: "Dis ce que le scan a permis de découvrir."
- Hint2: "Utilise la forme « Le scan a révélé... »."
- Hint3: "Exemple à recopier : « Le scan a révélé une entrée sécurisée. »"
- Feedback: "Résultat clair et vérifiable."

### Écran 10 - write - Conclusion tactique
- Question: "Écris une conclusion qui commence par « Donc »."
- Requirements:
  - mode: "sentence"
  - keywords: "donc"
  - enforceKeywords: true
- Hint: "Déduis une décision à partir d'un résultat."
- Hint2: "Commence par « Donc » et annonce la suite de la mission."
- Hint3: "Exemple à recopier : « Donc, la squad peut avancer vers la base. »"
- Feedback: "Conclusion opérationnelle validée."

### Écran 11 - interactive - Bloc manquant
- Question: "Dans ce rapport, quel bloc manque ? « À l'aube, nous étions au pont. Nous avons déployé le drone. Le passage est libre. »"
- Options: "Le contexte" / "Les actions" / "La conclusion"
- Réponse: "La conclusion"
- Feedback: "Il faut terminer par la décision à retenir."

### Écran 12 - write - Rapport en quatre phrases
- Question: "Rédige un compte-rendu en quatre phrases : contexte, action, résultat, conclusion."
- Requirements:
  - mode: "sentence"
  - keywords: "donc"
  - enforceKeywords: true
  - minWords: 24
- Hint: "Écris une phrase par bloc du rapport."
- Hint2: "Termine par une conclusion qui utilise « Donc »."
- Hint3: "Exemple à recopier : « À l'aube, la squad était près du pont. Elle a lancé le scan. Le drone a révélé une route libre. Donc, nous pouvons avancer. »"
- Feedback: "Rapport complet : les quatre blocs sont en place."

### Écran 13 - write - Réorganisation de transmission
- Question: "Écris une phrase qui relie une action à son résultat avec « puis »."
- Requirements:
  - mode: "sentence"
  - keywords: "puis"
  - enforceKeywords: true
- Hint: "Raconte d'abord l'action, puis ce qui s'est produit."
- Hint2: "Utilise deux propositions reliées par « puis »."
- Hint3: "Exemple à recopier : « Nous avons activé le relais, puis les communications ont repris. »"
- Feedback: "Chronologie bien transmise."

### Écran 14 - interactive - Dernier check
- Question: "Quelle phrase convient le mieux comme conclusion de rapport ?"
- Options: "À midi, le drone a décollé." / "Nous avons vérifié le tunnel." / "Donc, la squad peut emprunter le tunnel."
- Réponse: "Donc, la squad peut emprunter le tunnel."
- Feedback: "La conclusion annonce la décision finale."

### Écran 15 - challenge - Boss de Fin - Mission 4
- Question: "Rédige un compte-rendu structuré de l'opération en suivant contexte, actions, résultat et conclusion."
- Requirements:
  - mode: "sentence"
  - keywords: "aube", "déployé", "donc"
  - enforceKeywords: true
  - minWords: 25
- Hint: "Respecte les quatre étapes dans l'ordre."
- Hint2: "Situe la mission, raconte l'action, annonce le résultat et conclus avec « Donc »."
- Hint3: "Exemple à recopier : « À l'aube, la squad était près du relais. Elle a déployé un drone pour scanner la route. Le drone a révélé un passage libre. Donc, nous pouvons rejoindre la base. »"
- Feedback: "Boss validé. Ton rapport guide efficacement le commandement."

## Mission 5 - Synthèse Boss : compte-rendu argumenté complet

### Objectifs pédagogiques et compétences
- Mobiliser thèse, argument, exemple et nuance.
- Produire un compte-rendu structuré et convaincant.
- Adapter sa conclusion aux observations de terrain.

### Index technique (ordre des steps)
1. lesson - Briefing : Rapport final
2. lesson - La chaîne pour convaincre
3. interactive - Repérer la thèse
4. interactive - Repérer la nuance
5. write - Thèse de commandement
6. write - Argument et preuve
7. interactive - Structure complète
8. interactive - Connecteur utile
9. write - Observation nuancée
10. write - Conclusion convaincante
11. interactive - Rapport le plus solide
12. write - Mini compte-rendu argumenté
13. write - Révision tactique
14. interactive - Validation finale
15. challenge - Boss de Fin - Module 4

### Écran 1 - lesson - Briefing : Rapport final
- Texte: "Le rapport final doit convaincre : il présente les faits, une position, une raison, un exemple et une conclusion."
- Liste: "Contexte et actions." / "Thèse et argument." / "Exemple et nuance." / "Conclusion opérationnelle."

### Écran 2 - lesson - La chaîne pour convaincre
- Texte: "Formule utile : « Je pense que..., parce que... Par exemple,... Toutefois,... Donc,... »"
- Texte: "Chaque marqueur a une fonction : prendre position, justifier, prouver, nuancer et conclure."

### Écran 3 - interactive - Repérer la thèse
- Question: "Quelle phrase est la thèse dans ce message ?"
- Options: "Le drone a observé le pont." / "Je pense que nous devons sécuriser le pont." / "Par exemple, deux ennemis se sont cachés près du pont."
- Réponse: "Je pense que nous devons sécuriser le pont."
- Feedback: "C'est la position que le rapport cherche à défendre."

### Écran 4 - interactive - Repérer la nuance
- Question: "Quelle phrase ajoute une réserve utile ?"
- Options: "Le plan est parfait." / "Toutefois, le brouillard peut gêner les drones." / "Donc, nous avançons."
- Réponse: "Toutefois, le brouillard peut gêner les drones."
- Feedback: "La réserve rend la décision plus crédible."

### Écran 5 - write - Thèse de commandement
- Question: "Écris une thèse sur la priorité de l'opération."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense"
  - enforceKeywords: true
- Hint: "Choisis l'action que le commandement doit prioriser."
- Hint2: "Commence par « Je pense que » et formule une action précise."
- Hint3: "Exemple à recopier : « Je pense que nous devons protéger le relais en priorité. »"
- Feedback: "Priorité formulée clairement."

### Écran 6 - write - Argument et preuve
- Question: "Écris une phrase avec une raison et un exemple concret."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "par exemple"
  - enforceKeywords: true
- Hint: "Explique d'abord pourquoi l'action est utile."
- Hint2: "Utilise « parce que » puis ajoute « Par exemple » avec un fait."
- Hint3: "Exemple à recopier : « Il faut surveiller le toit parce que la zone est ouverte ; par exemple, un drone y a repéré un signal. »"
- Feedback: "Raison et preuve bien reliées."

### Écran 7 - interactive - Structure complète
- Question: "Quel enchaînement construit le rapport le plus convaincant ?"
- Options: "Exemple → thèse → contexte → conclusion" / "Contexte → actions → thèse → argument → exemple → conclusion" / "Conclusion → argument → contexte → actions"
- Réponse: "Contexte → actions → thèse → argument → exemple → conclusion"
- Feedback: "La progression rend la décision facile à comprendre."

### Écran 8 - interactive - Connecteur utile
- Question: "Quel connecteur sert à annoncer une conséquence ?"
- Options: "donc" / "par exemple" / "toutefois"
- Réponse: "donc"
- Feedback: "« Donc » prépare la conclusion tactique."

### Écran 9 - write - Observation nuancée
- Question: "Écris une observation sur le tunnel avec une réserve."
- Requirements:
  - mode: "sentence"
  - keywordGroups:
    - ["il semble", "peut-être"]
    - ["toutefois", "mais"]
  - enforceKeywords: true
- Hint: "Ne présente pas l'état du tunnel comme absolument certain."
- Hint2: "Ajoute une possibilité puis une réserve avec un connecteur d'opposition."
- Hint3: "Exemple à recopier : « Il semble que le tunnel soit libre ; toutefois, le scan doit continuer. »"
- Feedback: "Observation nuancée, décision plus sûre."

### Écran 10 - write - Conclusion convaincante
- Question: "Écris une conclusion de rapport qui commence par « Donc » et propose une action."
- Requirements:
  - mode: "sentence"
  - keywords: "donc"
  - enforceKeywords: true
- Hint: "Déduis une action à partir des informations recueillies."
- Hint2: "Commence par « Donc » et indique ce que la squad doit faire."
- Hint3: "Exemple à recopier : « Donc, la squad doit sécuriser le pont avant d'avancer. »"
- Feedback: "Conclusion claire pour le commandement."

### Écran 11 - interactive - Rapport le plus solide
- Question: "Quel message est le plus convaincant ?"
- Options: "Avançons vers le pont." / "Je pense que nous devons sécuriser le pont parce que le relais est proche." / "Le pont existe."
- Réponse: "Je pense que nous devons sécuriser le pont parce que le relais est proche."
- Feedback: "La thèse est soutenue par une raison."

### Écran 12 - write - Mini compte-rendu argumenté
- Question: "Rédige un mini compte-rendu avec une thèse, un argument et un exemple."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense", "parce que", "par exemple"
  - enforceKeywords: true
  - minWords: 25
- Hint: "Présente d'abord ta recommandation."
- Hint2: "Ajoute une raison avec « parce que », puis une preuve avec « Par exemple »."
- Hint3: "Exemple à recopier : « Je pense que nous devons protéger le relais parce que les communications sont fragiles. Par exemple, un message a été perdu lorsque le relais a cessé de fonctionner. »"
- Feedback: "Mini rapport solide : tu convaincs avec des preuves."

### Écran 13 - write - Révision tactique
- Question: "Rédige une phrase de bilan qui contient une action, un résultat et une conclusion."
- Requirements:
  - mode: "sentence"
  - keywords: "donc"
  - enforceKeywords: true
  - minWords: 14
- Hint: "Raconte une action puis son effet."
- Hint2: "Termine par « donc » suivi de la décision de la squad."
- Hint3: "Exemple à recopier : « Nous avons lancé le scan, il a révélé une route sûre, donc la squad peut avancer. »"
- Feedback: "Bilan opérationnel cohérent."

### Écran 14 - interactive - Validation finale
- Question: "Quel élément transforme une opinion en argumentation ?"
- Options: "Une raison précise" / "Un mot très long" / "Une répétition"
- Réponse: "Une raison précise"
- Feedback: "La raison soutient la thèse et aide à convaincre."

### Écran 15 - challenge - Boss de Fin - Module 4
- Question: "Rédige le compte-rendu argumenté complet de ta mission : contexte, action, thèse, argument, exemple, nuance et conclusion."
- Requirements:
  - mode: "sentence"
  - keywords: "je pense", "parce que", "par exemple", "donc"
  - keywordGroups:
    - ["il semble", "peut-être"]
    - ["toutefois", "mais"]
  - enforceKeywords: true
  - minWords: 25
- Hint: "Organise ton rapport : situe la mission, raconte l'action, puis défends une décision."
- Hint2: "Inclue « Je pense que », « parce que », « Par exemple », une nuance et une conclusion avec « Donc »."
- Hint3: "Exemple à recopier : « À l'aube, la squad a scanné le pont. Je pense que nous devons le sécuriser parce que le relais est proche. Par exemple, un drone a détecté une embuscade. Toutefois, il semble que le tunnel reste praticable. Donc, nous avançons avec prudence. »"
- Feedback: "Mission accomplie. Ton compte-rendu est structuré, nuancé et convaincant."
