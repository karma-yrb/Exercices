# Draft - Lovyc Français Module 3

## Meta
- Thème: Tactical Comms - phrase complexe
- Objectif: coordination, subordination, connecteurs de cause/conséquence, synthèse phrase complexe
- Durée cible: ~10-12 min par mission
- AgentPedago: PROF_FRANCAIS_4E + ARCHITECTE_PEDAGO_WEB
- SourcesPedago: CURRICULUM + PROGRESS + AGENTS_BASELINE
- CartesLocalLibrary: local_library/cards/francais/*.json
- Missions: 5
- ScreensPerMission: 15

## Mission 1 - Relais de Coordination

### Objectifs pédagogiques et compétences
- Identifier les conjonctions de coordination.
- Relier deux propositions avec un connecteur adapté.
- Rédiger un ordre tactique clair.

### Index technique (ordre des steps)
1. lesson - Code des Relais
2. lesson - Les Sept Connecteurs
3. interactive - Identifier le Relais
4. interactive - Choisir Mais
5. write - Liaison avec Et
6. write - Choix avec Ou
7. interactive - Signal Donc
8. interactive - Cause avec Car
9. write - Opposition Tactique
10. write - Double Liaison
11. interactive - Ni ou Et
12. write - Rapport Coordonné
13. write - Réécriture de Transmission
14. interactive - Check de Relais
15. challenge - Boss de Fin - Mission 1

### Écran 1 - lesson - Code des Relais
- Texte: "Une conjonction de coordination relie deux mots ou deux propositions sans créer de dépendance."
- Liste: "et : ajoute" / "mais : oppose" / "ou : choisit" / "donc : conclut"

### Écran 2 - lesson - Les Sept Connecteurs
- Texte: "Retient la chaîne : mais, ou, et, donc, or, ni, car."
- Texte: "Dans un rapport, le connecteur indique précisément le lien entre les informations."

### Écran 3 - interactive - Identifier le Relais
- Question: "Quel mot coordonne les deux actions ?" (Lovyc scanne la zone et la squad avance.)
- Options: "Lovyc" / "et" / "zone"
- Réponse: "et"
- Feedback: "Exact. « et » ajoute une action."

### Écran 4 - interactive - Choisir Mais
- Question: "Quelle phrase marque une opposition ?"
- Options: "Le drone arrive et il filme." / "Le drone arrive mais il ne filme pas." / "Le drone arrive donc il filme."
- Réponse: "Le drone arrive mais il ne filme pas."
- Feedback: "« mais » signale une opposition."

### Écran 5 - write - Liaison avec Et
- Question: "Écris une phrase qui relie deux actions de la squad avec « et »."
- Requirements:
  - mode: "sentence"
  - keywords: "et", "squad"
  - enforceKeywords: true
- Hint: "Ajoute une seconde action avec « et »."
- Hint2: "Commence par « La squad » et relie deux verbes avec « et »."
- Hint3: "Exemple à recopier : « La squad avance et sécurise le pont. »"
- Feedback: "Relais ajouté."

### Écran 6 - write - Choix avec Ou
- Question: "Écris une phrase proposant deux itinéraires avec « ou »."
- Requirements:
  - mode: "sentence"
  - keywords: "ou", "map"
  - enforceKeywords: true
- Hint: "« ou » présente un choix."
- Hint2: "Propose deux zones de la map séparées par « ou »."
- Hint3: "Exemple à recopier : « Nous passons par le nord ou par le sud de la map. »"
- Feedback: "Choix transmis."

### Écran 7 - interactive - Signal Donc
- Question: "Quel connecteur exprime une conséquence ?"
- Options: "car" / "donc" / "mais"
- Réponse: "donc"
- Feedback: "« donc » annonce la conséquence."

### Écran 8 - interactive - Cause avec Car
- Question: "Quelle phrase explique une cause ?"
- Options: "Le signal est faible, car le drone est loin." / "Le signal est faible, donc le drone est loin." / "Le signal est faible, mais le drone est loin."
- Réponse: "Le signal est faible, car le drone est loin."
- Feedback: "« car » donne une explication."

### Écran 9 - write - Opposition Tactique
- Question: "Écris une phrase avec « mais » pour opposer deux informations."
- Requirements:
  - mode: "sentence"
  - keywords: "mais", "drone"
  - enforceKeywords: true
- Hint: "Annonce une information, puis son contraire ou sa limite."
- Hint2: "Utilise « mais » entre deux propositions sur le drone."
- Hint3: "Exemple à recopier : « Le drone repère la cible, mais il manque de batterie. »"
- Feedback: "Opposition claire."

### Écran 10 - write - Double Liaison
- Question: "Écris une phrase avec « et » puis « donc »."
- Requirements:
  - mode: "sentence"
  - keywords: "et", "donc"
  - enforceKeywords: true
- Hint: "« et » ajoute, « donc » conclut."
- Hint2: "Relie deux actions avec « et », puis indique leur résultat avec « donc »."
- Hint3: "Exemple à recopier : « Lovyc observe et la squad écoute, donc le plan est prêt. »"
- Feedback: "Chaîne logique valide."

### Écran 11 - interactive - Ni ou Et
- Question: "Quel connecteur complète la négation ?" (La squad ne recule ____ n'abandonne.)
- Options: "ni" / "donc" / "car"
- Réponse: "ni"
- Feedback: "Après « ne », « ni » relie deux négations."

### Écran 12 - write - Rapport Coordonné
- Question: "Rédige une phrase de rapport avec « car »."
- Requirements:
  - mode: "sentence"
  - keywords: "car", "rapport"
  - enforceKeywords: true
- Hint: "« car » explique une information."
- Hint2: "Écris « Rapport : » puis donne une cause avec « car »."
- Hint3: "Exemple à recopier : « Rapport : nous attendons, car le passage est surveillé. »"
- Feedback: "Cause correctement signalée."

### Écran 13 - write - Réécriture de Transmission
- Question: "Réécris en reliant les propositions avec « donc » :" (La map est sûre. La squad entre.)
- Requirements:
  - mode: "sentence"
  - keywords: "donc", "squad"
  - enforceKeywords: true
- Hint: "La seconde proposition est la conséquence."
- Hint2: "Conserve les deux idées et place « donc » entre elles."
- Hint3: "Exemple à recopier : « La map est sûre, donc la squad entre. »"
- Feedback: "Transmission fluide."

### Écran 14 - interactive - Check de Relais
- Question: "Quelle phrase est correctement coordonnée ?"
- Options: "Lovyc vérifie et la map." / "Lovyc vérifie la map et la squad attend." / "Lovyc vérifie donc la map et."
- Réponse: "Lovyc vérifie la map et la squad attend."
- Feedback: "Les deux propositions sont bien reliées."

### Écran 15 - challenge - Boss de Fin - Mission 1
- Question: "Rédige un ordre tactique avec « mais » et « donc »."
- Requirements:
  - mode: "sentence"
  - keywords: "mais", "donc"
  - enforceKeywords: true
  - minWords: 10
- Hint: "Oppose une difficulté, puis donne une conséquence."
- Hint2: "Utilise une première proposition avec « mais », puis une décision avec « donc »."
- Hint3: "Exemple à recopier : « Le passage est étroit, mais la squad est prête, donc nous avançons ensemble. »"
- Feedback: "Boss coordonné."

## Mission 2 - Réseau de Subordination

### Objectifs pédagogiques et compétences
- Identifier une proposition subordonnée.
- Utiliser quand, si, parce que, bien que et pour que.
- Exprimer temps, condition, cause, concession et but.

### Index technique (ordre des steps)
1. lesson - Lien de Dépendance
2. lesson - Cinq Accès
3. interactive - Repérer Quand
4. interactive - Condition Si
5. write - Temps de Mission
6. write - Condition de Squad
7. interactive - Cause Parce Que
8. interactive - But Pour Que
9. write - Concession Bien Que
10. write - Cause Complète
11. interactive - Connecteur Adapté
12. write - Ordre Conditionnel
13. write - Réécriture Subordonnée
14. interactive - Dernier Scan
15. challenge - Boss de Fin - Mission 2

### Écran 1 - lesson - Lien de Dépendance
- Texte: "Une proposition subordonnée dépend d'une proposition principale. Elle apporte une précision utile au message."
- Texte: "Elle peut commencer par quand, si, parce que, bien que ou pour que."

### Écran 2 - lesson - Cinq Accès
- Liste: "quand : temps" / "si : condition" / "parce que : cause" / "bien que : opposition" / "pour que : but"

### Écran 3 - interactive - Repérer Quand
- Question: "Quel mot introduit un moment ?" (Quand le drone arrive, Lovyc lance le scan.)
- Options: "Quand" / "Lovyc" / "scan"
- Réponse: "Quand"
- Feedback: "« quand » situe l'action dans le temps."

### Écran 4 - interactive - Condition Si
- Question: "Quelle phrase exprime une condition ?"
- Options: "Si le signal revient, la squad avance." / "Parce que le signal revient, la squad avance." / "Quand le signal revient, la squad avance."
- Réponse: "Si le signal revient, la squad avance."
- Feedback: "« si » pose une condition."

### Écran 5 - write - Temps de Mission
- Question: "Écris une phrase avec « quand » et « squad »."
- Requirements:
  - mode: "sentence"
  - keywords: "quand", "squad"
  - enforceKeywords: true
- Hint: "« quand » introduit le moment de l'action."
- Hint2: "Commence par « Quand » puis indique l'action de la squad."
- Hint3: "Exemple à recopier : « Quand le signal sonne, la squad rejoint la base. »"
- Feedback: "Temps identifié."

### Écran 6 - write - Condition de Squad
- Question: "Écris une phrase avec « si » qui donne une condition."
- Requirements:
  - mode: "sentence"
  - keywords: "si", "drone"
  - enforceKeywords: true
- Hint: "La condition commence avec « si »."
- Hint2: "Imagine une action qui dépend de l'état du drone."
- Hint3: "Exemple à recopier : « Si le drone détecte un danger, nous reculons. »"
- Feedback: "Condition validée."

### Écran 7 - interactive - Cause Parce Que
- Question: "Quel connecteur introduit une cause ?"
- Options: "parce que" / "pour que" / "bien que"
- Réponse: "parce que"
- Feedback: "« parce que » explique la cause."

### Écran 8 - interactive - But Pour Que
- Question: "Quelle phrase exprime un but ?"
- Options: "Lovyc parle pour que la squad comprenne." / "Lovyc parle parce que la squad comprend." / "Lovyc parle bien que la squad comprend."
- Réponse: "Lovyc parle pour que la squad comprenne."
- Feedback: "Le but est introduit par « pour que »."

### Écran 9 - write - Concession Bien Que
- Question: "Écris une phrase avec « bien que » et « map »."
- Requirements:
  - mode: "sentence"
  - keywords: "bien que", "map"
  - enforceKeywords: true
- Hint: "« bien que » montre une difficulté qui n'empêche pas l'action."
- Hint2: "Présente un obstacle lié à la map, puis l'action continue."
- Hint3: "Exemple à recopier : « Bien que la map soit sombre, la squad avance. »"
- Feedback: "Concession réussie."

### Écran 10 - write - Cause Complète
- Question: "Écris une phrase expliquant une décision avec « parce que »."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "Lovyc"
  - enforceKeywords: true
- Hint: "Donne d'abord la décision, puis sa raison."
- Hint2: "Utilise Lovyc dans la principale et « parce que » avant l'explication."
- Hint3: "Exemple à recopier : « Lovyc attend parce que la zone reste dangereuse. »"
- Feedback: "Cause bien reliée."

### Écran 11 - interactive - Connecteur Adapté
- Question: "Quel connecteur convient ?" (Nous chuchotons ____ le gardien ne nous entende pas.)
- Options: "pour que" / "parce que" / "quand"
- Réponse: "pour que"
- Feedback: "Le but de l'action est exprimé."

### Écran 12 - write - Ordre Conditionnel
- Question: "Rédige un ordre commençant par « si »."
- Requirements:
  - mode: "sentence"
  - keywords: "si", "squad"
  - enforceKeywords: true
- Hint: "Formule une condition, puis un ordre ou une action."
- Hint2: "Commence par « Si la squad... », puis ajoute une conséquence."
- Hint3: "Exemple à recopier : « Si la squad entend l'alerte, elle se met à couvert. »"
- Feedback: "Ordre conditionnel prêt."

### Écran 13 - write - Réécriture Subordonnée
- Question: "Réécris avec « quand » :" (Le drone atterrit. Nous ouvrons la porte.)
- Requirements:
  - mode: "sentence"
  - keywords: "quand", "drone"
  - enforceKeywords: true
- Hint: "Transforme la première action en repère temporel."
- Hint2: "Place « Quand le drone atterrit » avant l'action principale."
- Hint3: "Exemple à recopier : « Quand le drone atterrit, nous ouvrons la porte. »"
- Feedback: "Subordonnée connectée."

### Écran 14 - interactive - Dernier Scan
- Question: "Quel connecteur introduit une concession ?"
- Options: "bien que" / "si" / "car"
- Réponse: "bien que"
- Feedback: "Même avec un obstacle, l'action continue."

### Écran 15 - challenge - Boss de Fin - Mission 2
- Question: "Rédige une phrase de mission avec « si » et « pour que »."
- Requirements:
  - mode: "sentence"
  - keywords: "si", "pour que"
  - enforceKeywords: true
  - minWords: 10
- Hint: "Pose une condition et indique le but."
- Hint2: "Utilise « si » au début et « pour que » pour expliquer l'objectif."
- Hint3: "Exemple à recopier : « Si la squad se tait, nous pouvons avancer pour que le gardien ne nous repère pas. »"
- Feedback: "Réseau de subordination maîtrisé."

## Mission 3 - Chaîne Cause Conséquence

### Objectifs pédagogiques et compétences
- Distinguer cause et conséquence.
- Employer parce que, car, donc, alors et de sorte que.
- Organiser un rapport explicatif.

### Index technique (ordre des steps)
1. lesson - Déclencheur et Effet
2. lesson - Connecteurs de Chaîne
3. interactive - Repérer la Cause
4. interactive - Repérer la Conséquence
5. write - Cause avec Car
6. write - Conséquence avec Donc
7. interactive - Alors en Action
8. interactive - De Sorte Que
9. write - Rapport de Cause
10. write - Effet Tactique
11. interactive - Choix de Connecteur
12. write - Double Explication
13. write - Réécriture de Chaîne
14. interactive - Check de Logique
15. challenge - Boss de Fin - Mission 3

### Écran 1 - lesson - Déclencheur et Effet
- Texte: "La cause explique pourquoi un fait arrive. La conséquence indique ce qui arrive ensuite."
- Exemple: "Le brouillard est dense, donc le drone vole bas."

### Écran 2 - lesson - Connecteurs de Chaîne
- Liste: "parce que / car : cause" / "donc / alors / de sorte que : conséquence"

### Écran 3 - interactive - Repérer la Cause
- Question: "Quelle partie donne la cause ?" (La squad attend parce que la porte est verrouillée.)
- Options: "La squad attend" / "parce que la porte est verrouillée" / "la squad"
- Réponse: "parce que la porte est verrouillée"
- Feedback: "Cette proposition explique l'attente."

### Écran 4 - interactive - Repérer la Conséquence
- Question: "Quelle partie donne la conséquence ?" (Le radar est actif, donc nous changeons de route.)
- Options: "Le radar est actif" / "donc nous changeons de route" / "le radar"
- Réponse: "donc nous changeons de route"
- Feedback: "La conséquence suit « donc »."

### Écran 5 - write - Cause avec Car
- Question: "Écris une phrase avec « car » et « squad »."
- Requirements:
  - mode: "sentence"
  - keywords: "car", "squad"
  - enforceKeywords: true
- Hint: "« car » introduit la raison."
- Hint2: "Donne une action de la squad, puis explique-la avec « car »."
- Hint3: "Exemple à recopier : « La squad se cache, car le drone ennemi approche. »"
- Feedback: "Cause transmise."

### Écran 6 - write - Conséquence avec Donc
- Question: "Écris une phrase avec « donc » et « signal »."
- Requirements:
  - mode: "sentence"
  - keywords: "donc", "signal"
  - enforceKeywords: true
- Hint: "« donc » annonce le résultat."
- Hint2: "Présente l'état du signal, puis la conséquence."
- Hint3: "Exemple à recopier : « Le signal est stable, donc Lovyc lance la mission. »"
- Feedback: "Conséquence nette."

### Écran 7 - interactive - Alors en Action
- Question: "Quel mot peut annoncer une conséquence ?"
- Options: "alors" / "bien que" / "ni"
- Réponse: "alors"
- Feedback: "« alors » peut marquer la suite logique."

### Écran 8 - interactive - De Sorte Que
- Question: "Quelle phrase contient une conséquence ?"
- Options: "La squad avance de sorte que le pont est sécurisé." / "La squad avance parce que le pont est sécurisé." / "La squad avance bien que le pont est sécurisé."
- Réponse: "La squad avance de sorte que le pont est sécurisé."
- Feedback: "Le pont sécurisé est l'effet."

### Écran 9 - write - Rapport de Cause
- Question: "Rédige un rapport avec « parce que »."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "rapport"
  - enforceKeywords: true
- Hint: "Explique clairement la raison d'une décision."
- Hint2: "Commence par « Rapport : » et ajoute une cause avec « parce que »."
- Hint3: "Exemple à recopier : « Rapport : nous reculons parce que le passage est miné. »"
- Feedback: "Rapport explicatif valide."

### Écran 10 - write - Effet Tactique
- Question: "Écris une phrase avec « de sorte que »."
- Requirements:
  - mode: "sentence"
  - keywords: "de sorte que", "drone"
  - enforceKeywords: true
- Hint: "Après ce connecteur, indique le résultat."
- Hint2: "Décris l'action du drone puis son effet observable."
- Hint3: "Exemple à recopier : « Le drone éclaire la route de sorte que la squad voit les pièges. »"
- Feedback: "Effet expliqué."

### Écran 11 - interactive - Choix de Connecteur
- Question: "Quel connecteur complète la phrase ?" (La batterie est vide, ____ le drone revient.)
- Options: "donc" / "car" / "bien que"
- Réponse: "donc"
- Feedback: "Le retour est une conséquence."

### Écran 12 - write - Double Explication
- Question: "Écris une phrase avec « car » et « donc »."
- Requirements:
  - mode: "sentence"
  - keywords: "car", "donc"
  - enforceKeywords: true
- Hint: "Explique une cause puis une conséquence."
- Hint2: "Utilise « car » pour la raison et « donc » pour la décision."
- Hint3: "Exemple à recopier : « Le radar sature, car l'orage approche, donc nous attendons. »"
- Feedback: "Chaîne complète."

### Écran 13 - write - Réécriture de Chaîne
- Question: "Réécris avec « alors » :" (La porte s'ouvre. La squad entre.)
- Requirements:
  - mode: "sentence"
  - keywords: "alors", "squad"
  - enforceKeywords: true
- Hint: "La deuxième action découle de la première."
- Hint2: "Relie les deux propositions par « alors »."
- Hint3: "Exemple à recopier : « La porte s'ouvre, alors la squad entre. »"
- Feedback: "Suite logique validée."

### Écran 14 - interactive - Check de Logique
- Question: "Quel connecteur exprime une cause ?"
- Options: "car" / "donc" / "alors"
- Réponse: "car"
- Feedback: "« car » répond à la question « pourquoi ? »."

### Écran 15 - challenge - Boss de Fin - Mission 3
- Question: "Rédige un rapport avec « parce que » et « donc »."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "donc"
  - enforceKeywords: true
  - minWords: 12
- Hint: "Donne une cause puis la décision qui en résulte."
- Hint2: "Construis trois moments : fait, cause avec « parce que », conséquence avec « donc »."
- Hint3: "Exemple à recopier : « Nous changeons de route parce que le pont est détruit, donc la squad passe par le tunnel. »"
- Feedback: "Chaîne de cause maîtrisée."

## Mission 4 - Balises Logiques

### Objectifs pédagogiques et compétences
- Comprendre le rôle des connecteurs logiques.
- Nuancer, opposer, justifier et conclure une idée.
- Structurer un message tactique cohérent.

### Index technique (ordre des steps)
1. lesson - Balises de Rapport
2. lesson - Nuancer le Signal
3. interactive - Cependant
4. interactive - En Effet
5. write - Opposition avec Pourtant
6. write - Nuance avec Néanmoins
7. interactive - Ainsi
8. interactive - Toutefois
9. write - Justification Logique
10. write - Conclusion avec Ainsi
11. interactive - Connecteur Correct
12. write - Rapport Nuancé
13. write - Réécriture Logique
14. interactive - Dernière Balise
15. challenge - Boss de Fin - Mission 4

### Écran 1 - lesson - Balises de Rapport
- Texte: "Les connecteurs logiques organisent les idées d'un rapport et indiquent leur relation."
- Liste: "cependant, néanmoins, pourtant, toutefois : opposition" / "ainsi : conséquence" / "en effet : explication"

### Écran 2 - lesson - Nuancer le Signal
- Texte: "Ces mots évitent les messages trop simples : ils précisent une limite, une justification ou une conclusion."
- Exemple: "La route est longue ; cependant, la squad reste concentrée."

### Écran 3 - interactive - Cependant
- Question: "Quel connecteur marque une opposition ?"
- Options: "cependant" / "ainsi" / "en effet"
- Réponse: "cependant"
- Feedback: "« cependant » oppose deux informations."

### Écran 4 - interactive - En Effet
- Question: "Quel connecteur introduit une justification ?"
- Options: "en effet" / "pourtant" / "toutefois"
- Réponse: "en effet"
- Feedback: "« en effet » apporte une explication."

### Écran 5 - write - Opposition avec Pourtant
- Question: "Écris une phrase avec « pourtant » et « squad »."
- Requirements:
  - mode: "sentence"
  - keywords: "pourtant", "squad"
  - enforceKeywords: true
- Hint: "« pourtant » introduit un fait surprenant ou opposé."
- Hint2: "Annonce une difficulté, puis montre que la squad agit malgré elle."
- Hint3: "Exemple à recopier : « Le vent est fort, pourtant la squad avance. »"
- Feedback: "Opposition nuancée."

### Écran 6 - write - Nuance avec Néanmoins
- Question: "Écris une phrase avec « néanmoins » et « drone »."
- Requirements:
  - mode: "sentence"
  - keywords: "néanmoins", "drone"
  - enforceKeywords: true
- Hint: "« néanmoins » signifie « malgré cela »."
- Hint2: "Présente un problème, puis une action possible avec « néanmoins »."
- Hint3: "Exemple à recopier : « Le drone est lent ; néanmoins, il repère la sortie. »"
- Feedback: "Nuance bien placée."

### Écran 7 - interactive - Ainsi
- Question: "Quel connecteur peut introduire une conclusion ?"
- Options: "ainsi" / "pourtant" / "en effet"
- Réponse: "ainsi"
- Feedback: "« ainsi » annonce un résultat."

### Écran 8 - interactive - Toutefois
- Question: "Quelle phrase exprime une réserve ?"
- Options: "La zone semble calme ; toutefois, Lovyc reste prudent." / "La zone semble calme ; ainsi, Lovyc reste prudent." / "La zone semble calme ; en effet, Lovyc reste prudent."
- Réponse: "La zone semble calme ; toutefois, Lovyc reste prudent."
- Feedback: "« toutefois » introduit une limite."

### Écran 9 - write - Justification Logique
- Question: "Écris une phrase avec « en effet » pour justifier un ordre."
- Requirements:
  - mode: "sentence"
  - keywords: "en effet", "ordre"
  - enforceKeywords: true
- Hint: "Justifie l'ordre par une information précise."
- Hint2: "Énonce un ordre, puis ajoute « en effet » et son explication."
- Hint3: "Exemple à recopier : « L'ordre est de patienter ; en effet, le pont est surveillé. »"
- Feedback: "Justification claire."

### Écran 10 - write - Conclusion avec Ainsi
- Question: "Écris une phrase avec « ainsi » et « map »."
- Requirements:
  - mode: "sentence"
  - keywords: "ainsi", "map"
  - enforceKeywords: true
- Hint: "« ainsi » relie une idée à son résultat."
- Hint2: "Présente une donnée de la map, puis conclus avec « ainsi »."
- Hint3: "Exemple à recopier : « La map indique une sortie ; ainsi, nous évitons le tunnel. »"
- Feedback: "Conclusion signalée."

### Écran 11 - interactive - Connecteur Correct
- Question: "Quel connecteur complète la phrase ?" (Le radar est précis ; ____ Lovyc confirme la cible.)
- Options: "ainsi" / "pourtant" / "toutefois"
- Réponse: "ainsi"
- Feedback: "La confirmation est la conséquence."

### Écran 12 - write - Rapport Nuancé
- Question: "Rédige une phrase avec « cependant » et « rapport »."
- Requirements:
  - mode: "sentence"
  - keywords: "cependant", "rapport"
  - enforceKeywords: true
- Hint: "Oppose deux éléments du rapport."
- Hint2: "Commence par « Rapport : » et introduis une réserve avec « cependant »."
- Hint3: "Exemple à recopier : « Rapport : la route est libre ; cependant, le signal reste faible. »"
- Feedback: "Rapport nuancé."

### Écran 13 - write - Réécriture Logique
- Question: "Réécris avec « toutefois » :" (La nuit tombe. Nous poursuivons la mission.)
- Requirements:
  - mode: "sentence"
  - keywords: "toutefois", "mission"
  - enforceKeywords: true
- Hint: "La deuxième idée se maintient malgré la première."
- Hint2: "Relie les deux propositions par « toutefois »."
- Hint3: "Exemple à recopier : « La nuit tombe ; toutefois, nous poursuivons la mission. »"
- Feedback: "Lien logique exact."

### Écran 14 - interactive - Dernière Balise
- Question: "Quel connecteur apporte une explication ?"
- Options: "en effet" / "néanmoins" / "pourtant"
- Réponse: "en effet"
- Feedback: "La justification est repérée."

### Écran 15 - challenge - Boss de Fin - Mission 4
- Question: "Rédige un rapport avec « cependant » et « ainsi »."
- Requirements:
  - mode: "sentence"
  - keywords: "cependant", "ainsi"
  - enforceKeywords: true
  - minWords: 12
- Hint: "Ajoute une réserve, puis une conclusion."
- Hint2: "Présente une situation, utilise « cependant », puis termine avec une conséquence introduite par « ainsi »."
- Hint3: "Exemple à recopier : « Le tunnel est sombre ; cependant, le drone éclaire la route, ainsi la squad avance sans danger. »"
- Feedback: "Balises logiques activées."

## Mission 5 - Rapport de Mission Complexe

### Objectifs pédagogiques et compétences
- Mobiliser coordination, subordination et connecteurs logiques.
- Produire une phrase complexe cohérente.
- Lier un récit de mission à l'imparfait et au passé simple.

### Index technique (ordre des steps)
1. lesson - Synthèse du Commandement
2. lesson - Récit de Mission
3. interactive - Coordination ou Subordination
4. interactive - Imparfait ou Passé Simple
5. write - Décor à l'Imparfait
6. write - Action au Passé Simple
7. interactive - Connecteur de Récit
8. interactive - Phrase Complexe Correcte
9. write - Cause dans le Récit
10. write - Opposition de Mission
11. interactive - Synthèse de Connecteurs
12. write - Rapport en Deux Temps
13. write - Réécriture Finale
14. interactive - Contrôle Général
15. challenge - Boss de Fin - Module 3

### Écran 1 - lesson - Synthèse du Commandement
- Texte: "Une phrase complexe contient plusieurs propositions reliées par coordination ou subordination."
- Liste: "Coordination : et, mais, donc" / "Subordination : quand, si, parce que" / "Logique : cependant, ainsi, en effet"

### Écran 2 - lesson - Récit de Mission
- Texte: "Dans un récit, l'imparfait décrit le décor ou une action longue. Le passé simple raconte une action brève et terminée."
- Exemple: "La nuit était calme quand Lovyc ouvrit la porte."

### Écran 3 - interactive - Coordination ou Subordination
- Question: "Quel mot introduit une subordonnée ?"
- Options: "quand" / "mais" / "donc"
- Réponse: "quand"
- Feedback: "« quand » introduit une subordonnée de temps."

### Écran 4 - interactive - Imparfait ou Passé Simple
- Question: "Quel verbe est au passé simple ?"
- Options: "avançait" / "ouvrit" / "était"
- Réponse: "ouvrit"
- Feedback: "« ouvrit » raconte une action ponctuelle."

### Écran 5 - write - Décor à l'Imparfait
- Question: "Écris une phrase de décor avec « était » et « map »."
- Requirements:
  - mode: "sentence"
  - keywords: "était", "map"
  - enforceKeywords: true
- Hint: "L'imparfait décrit une situation qui dure."
- Hint2: "Décris l'ambiance de la map avec le verbe « était »."
- Hint3: "Exemple à recopier : « La map était silencieuse avant le départ de la squad. »"
- Feedback: "Décor installé."

### Écran 6 - write - Action au Passé Simple
- Question: "Écris une phrase avec « entra » et « squad »."
- Requirements:
  - mode: "sentence"
  - keywords: "entra", "squad"
  - enforceKeywords: true
- Hint: "Le passé simple raconte une action brève."
- Hint2: "Utilise « entra » pour raconter l'arrivée de la squad."
- Hint3: "Exemple à recopier : « La squad entra dans la base au signal de Lovyc. »"
- Feedback: "Action racontée."

### Écran 7 - interactive - Connecteur de Récit
- Question: "Quel connecteur peut relier le décor et l'action ?" (La map était sombre ____ Lovyc ouvrit la porte.)
- Options: "quand" / "car" / "ni"
- Réponse: "quand"
- Feedback: "« quand » relie le moment et l'action."

### Écran 8 - interactive - Phrase Complexe Correcte
- Question: "Quelle phrase complexe est correcte ?"
- Options: "Quand le drone arriva, la squad se cacha." / "Quand le drone arriva la squad, se cacha." / "Quand, le drone arriva la squad se cacha."
- Réponse: "Quand le drone arriva, la squad se cacha."
- Feedback: "La subordonnée est correctement ponctuée."

### Écran 9 - write - Cause dans le Récit
- Question: "Écris une phrase de récit avec « parce que » et « drone »."
- Requirements:
  - mode: "sentence"
  - keywords: "parce que", "drone"
  - enforceKeywords: true
- Hint: "Explique la raison d'une action passée."
- Hint2: "Raconte une décision de la squad, puis sa cause liée au drone."
- Hint3: "Exemple à recopier : « La squad recula parce que le drone repéra un piège. »"
- Feedback: "Cause intégrée au récit."

### Écran 10 - write - Opposition de Mission
- Question: "Écris une phrase avec « mais » et « Lovyc » au passé."
- Requirements:
  - mode: "sentence"
  - keywords: "mais", "Lovyc"
  - enforceKeywords: true
- Hint: "Oppose deux actions ou deux faits du récit."
- Hint2: "Raconte une action de Lovyc, puis ajoute une limite avec « mais »."
- Hint3: "Exemple à recopier : « Lovyc avança, mais la porte resta fermée. »"
- Feedback: "Opposition narrative validée."

### Écran 11 - interactive - Synthèse de Connecteurs
- Question: "Quel connecteur exprime une conséquence dans le récit ?"
- Options: "donc" / "bien que" / "quand"
- Réponse: "donc"
- Feedback: "« donc » indique le résultat."

### Écran 12 - write - Rapport en Deux Temps
- Question: "Rédige une phrase avec « était » et « puis »."
- Requirements:
  - mode: "sentence"
  - keywords: "était", "puis"
  - enforceKeywords: true
- Hint: "Décris d'abord le décor, puis raconte une action."
- Hint2: "Utilise « était » pour la situation et « puis » pour faire avancer le récit."
- Hint3: "Exemple à recopier : « Le couloir était vide, puis le drone apparut au plafond. »"
- Feedback: "Deux temps bien reliés."

### Écran 13 - write - Réécriture Finale
- Question: "Réécris en une phrase complexe avec « quand » :" (Le signal fut vert. La squad entra.)
- Requirements:
  - mode: "sentence"
  - keywords: "quand", "squad"
  - enforceKeywords: true
- Hint: "Transforme le premier fait en repère temporel."
- Hint2: "Commence par « Quand le signal fut vert », puis ajoute l'action de la squad."
- Hint3: "Exemple à recopier : « Quand le signal fut vert, la squad entra dans la base. »"
- Feedback: "Phrase complexe complète."

### Écran 14 - interactive - Contrôle Général
- Question: "Quelle phrase relie correctement deux idées ?"
- Options: "La porte était ouverte, donc la squad entra." / "La porte était ouverte donc, la squad entra." / "La porte était, ouverte donc la squad entra."
- Réponse: "La porte était ouverte, donc la squad entra."
- Feedback: "Le connecteur est correctement placé."

### Écran 15 - challenge - Boss de Fin - Module 3
- Question: "Rédige un rapport final de mission avec « quand », « mais » et « donc », en utilisant un imparfait ou un passé simple."
- Requirements:
  - mode: "sentence"
  - keywords: "quand", "mais", "donc"
  - enforceKeywords: true
  - minWords: 18
- Hint: "Décris le contexte, ajoute un obstacle, puis donne la conséquence."
- Hint2: "Utilise « quand » pour le temps, « mais » pour l'obstacle et « donc » pour conclure l'action."
- Hint3: "Exemple à recopier : « Quand la map était calme, Lovyc avança, mais le drone signala un piège, donc la squad changea de route. »"
- Feedback: "Félicitations Agent Lovyc. Tu sais construire et transmettre une phrase complexe complète."
