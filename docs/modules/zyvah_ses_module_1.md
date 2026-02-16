# Draft - Zyvah SES Module 1

## Meta
- Thème : Manager - économie + sociologie
- Objectif : offre/demande, coûts/profit, socialisation, image, synthèse
- Séances : 5
- ScreensPerSeance : 15
- Durée cible : ~10 min par Séance

---

## Séance 1 - Le Marché du Son

### Objectifs pédagogiques et compétences
- Comprendre l'offre/demande et leurs variations.
- Identifier le prix d'équilibre et ses effets.

### Index technique (ordre des étapes)
1. msg - Briefing Manager
2. quiz - Identification Offre
3. write - Terminologie Offre
4. msg - Loi de l'Offre
5. msg - Loi de la Demande
6. quiz - Mécanisme Prix
7. msg - Prix d'Équilibre
8. write - Mot Clé Équilibre
9. quiz - Choc de Demande
10. write - Action Manager
11. quiz - Validation Marché
12. msg - Courbes en Mouvement
13. quiz - Choc d'Offre
14. write - Effet Prix Bas
15. challenge - Synthèse Marché

### Écran 1 - msg - Briefing Manager
- Texte : "Bienvenue dans le Game, Zyvah. Un marché, c'est partout où des vendeurs (Offre) et des acheteurs (Demande) se rencontrent."
- Encadré : "Dans l'industrie musicale : Offre = Artistes, labels, salles. Demande = Fans, auditeurs."

### Écran 2 - quiz - Identification Offre
- Question : "Qui représente l'OFFRE sur le marché du streaming ?"
- Options : "Les fans" / "Spotify" / "Le prix"
- Réponse : "Spotify"
- Feedback : "Exact ! Le vendeur propose le produit."

### Écran 3 - write - Terminologie Offre
- Question : "Quel mot désigne l'ensemble des vendeurs sur un marché ?"
- Réponse attendue : "offre"
- Requirements :
  - keywords : ["offre"]
  - minWords : 1
- Hint : "C'est l'un des deux mots du titre de la Séance (ça commence par O)."
- Hint2 : "Donne exactement le mot-clé qui désigne les vendeurs."
- Hint3 : "Solution à recopier : « offre »."
- Feedback : "Correct. C'est le signal des producteurs."

### Écran 4 - msg - Loi de l'Offre
- Texte : "Plus le prix est élevé, plus les producteurs veulent vendre."
- Encadré : "Prix monte = Offre monte"

### Écran 5 - msg - Loi de la Demande
- Texte : "Inversement pour les fans : si c'est trop cher, ils achètent moins."
- Encadré : "Prix monte = Demande baisse"

### Écran 6 - quiz - Mécanisme Prix
- Question : "Si le prix d'un disque passe de 20 à 50, que fait la demande ?"
- Options : "Elle augmente" / "Elle diminue" / "Rien"
- Réponse : "Elle diminue"
- Feedback : "Loi de base : trop cher = moins de clients."

### Écran 7 - msg - Prix d'Équilibre
- Texte : "Le marché cherche toujours un point de rencontre : le moment où tout ce qui est produit est acheté."
- Encadré : "Équilibre : Offre = Demande"
- Texte : "À ce prix-là, il n'y a plus aucun stock invendu et plus aucun client frustré."

### Écran 8 - write - Mot Clé Équilibre
- Question : "Comment appelle-t-on le prix où l'offre est égale à la demande ?"
- Réponse attendue : "équilibre"
- Requirements :
  - keywords : ["équilibre"]
  - minWords : 1
- Hint : "C'est quand les deux côtés de la balance sont au même niveau (9 lettres)."
- Hint2 : "Écris le mot-clé du point de rencontre entre offre et demande."
- Hint3 : "Solution à recopier : « équilibre »."
- Feedback : "Le prix d'équilibre ! Là où le marché se vide."

### Écran 9 - quiz - Choc de Demande
- Question : "Une trend TikTok rend ton son viral. La demande EXPLOSE. Le prix..."
- Options : "Va descendre" / "Va monter" / "Va disparaître"
- Réponse : "Va monter"
- Feedback : "Forte demande + stock limité = hausse des prix."

### Écran 10 - write - Action Manager
- Question : "Si tu as trop de stock invendu, dois-tu monter ou baisser ton prix ?"
- Réponse attendue : "baisser"
- Requirements :
  - keywords : ["baisser", "baisse", "baisses", "réduire", "réduit", "réduction"]
  - minWords : 1
- Hint : "Pour attirer plus de clients (Demande), que fais-tu du prix ?"
- Hint2 : "Si le stock reste invendu, il faut rendre le prix plus bas."
- Hint3 : "Solution à recopier : « baisser »."
- Feedback : "Baisser le prix attire la demande pour vider le stock."

### Écran 11 - quiz - Validation Marché
- Question : "Vrai ou Faux : Sur un marché, le prix est fixé uniquement par le vendeur ?"
- Options : "VRAI" / "FAUX"
- Réponse : "FAUX"
- Feedback : "Faux ! L'acheteur (la demande) a aussi son mot à dire."

### Écran 12 - msg - Courbes en Mouvement
- Texte : "Quand la demande ou l'offre change, le prix d'équilibre bouge."
- Encadré : "Plus de demande = prix monte | Plus d'offre = prix baisse"

### Écran 13 - quiz - Choc d'Offre
- Question : "Le coût des matières premières augmente. L'offre baisse. Le prix..."
- Options : "Monte" / "Baisse" / "Ne change pas"
- Réponse : "Monte"
- Feedback : "Moins d'offre = tension = hausse des prix."

### Écran 14 - write - Effet Prix Bas
- Question : "Si le prix baisse, que fait en général la demande ?"
- Réponse attendue : "augmente"
- Requirements :
  - keywords : ["augmente", "augmentation", "monte", "hausse"]
  - minWords : 1
- Hint : "Prix plus bas = plus de clients."
- Hint2 : "Complète avec le verbe qui indique une hausse de la demande."
- Hint3 : "Solution à recopier : « augmente »."
- Feedback : "Oui ! La demande augmente quand le prix baisse."

### Écran 15 - challenge - Synthèse Marché
- Question : "Explique en 2 phrases comment se fixe le prix d'un concert."
- Requirements :
  - keywordGroups :
    - ["offre", "offres"]
    - ["demande", "demandes"]
    - ["équilibre", "équilibrer", "équilibres"]
  - minWords : 8
  - minSentences : 2
- Hint : "Parle du nombre de places (offre) et du nombre de fans (demande)."
- Hint2 : "Fais 2 phrases en utilisant explicitement : offre, demande, équilibre."
- Hint3 : "Solution à recopier : « L'offre de places limitées rencontre la demande des fans. Le prix d'équilibre se fixe quand offre et demande se rejoignent. »"
- Feedback : "Analyse valide. Tu relies offre, demande et prix d'équilibre."

---

## Séance 2 - Coûts & Profit

### Objectifs pédagogiques et compétences
- Distinguer travail, capital, coûts fixes/variables.
- Calculer chiffre d'affaires et profit.

### Index technique (ordre des étapes)
1. msg - Facteurs de Production
2. quiz - Inventaire
3. write - Facteur Humain
4. msg - Coût Fixe vs Variable
5. quiz - Type de Coût
6. write - Calcul CA
7. msg - Profitabilité
8. write - Verdict Profit
9. quiz - Exemple Coût Fixe
10. write - Exemple Coût Variable
11. msg - Seuil de Rentabilité
12. quiz - CA vs Profit
13. write - Mini Calcul Profit
14. quiz - Capital ou Travail
15. challenge - Synthèse Profit

### Écran 1 - msg - Facteurs de Production
- Texte : "Pour produire, il faut deux grands facteurs : le travail (L) et le capital (K)."
- Encadré : "Travail = humains | Capital = machines, outils"

### Écran 2 - quiz - Inventaire
- Question : "L'ordinateur du studio, c'est quel facteur ?"
- Options : "Travail" / "Capital"
- Réponse : "Capital"
- Feedback : "C'est un outil, donc du capital."

### Écran 3 - write - Facteur Humain
- Question : "Comment appelle-t-on le facteur représenté par l'ingénieur du son ?"
- Réponse attendue : "travail"
- Requirements :
  - keywords : ["travail"]
  - minWords : 1
- Hint : "C'est l'activité de l'humain pour produire."
- Hint2 : "Donne le nom du facteur humain en SES."
- Hint3 : "Solution à recopier : « travail »."
- Feedback : "Exact. L'effort humain, c'est le travail."

### Écran 4 - msg - Coût Fixe vs Variable
- Texte : "Un coût fixe ne change pas avec la production. Un coût variable dépend du volume."
- Encadré : "Fixe = loyer | Variable = matière première"

### Écran 5 - quiz - Type de Coût
- Question : "L'électricité du studio qui tourne 24h/24 est un..."
- Options : "Coût fixe" / "Coût variable"
- Réponse : "Coût variable"
- Feedback : "Plus tu produis, plus tu consommes : c'est variable."

### Écran 6 - write - Calcul CA
- Question : "CA = Prix x Quantité. Si tu vends 100 places à 20, quel est ton CA ?"
- Réponse attendue : "2000"
- Requirements :
  - keywords : ["2000"]
  - minWords : 1
- Hint : "Fais l'opération 100 multiplié par 20."
- Hint2 : "Calcule le CA avec la formule Prix x Quantité."
- Hint3 : "Solution à recopier : « 2000 »."
- Feedback : "2000 de chiffre d'affaires."

### Écran 7 - msg - Profitabilité
- Texte : "Profit = CA - Coûts totaux. Ne confonds jamais l'argent qui rentre (CA) et ce qu'il te reste (profit)."

### Écran 8 - write - Verdict Profit
- Question : "CA = 2000. Coûts = 1500. Quel est ton profit ?"
- Réponse attendue : "500"
- Requirements :
  - keywords : ["500"]
  - minWords : 1
- Hint : "Fais la soustraction : 2000 - 1500."
- Hint2 : "Le profit est ce qui reste après retrait des coûts."
- Hint3 : "Solution à recopier : « 500 »."
- Feedback : "Il te reste 500 de gain réel."

### Écran 9 - quiz - Exemple Coût Fixe
- Question : "Le loyer du studio est un coût..."
- Options : "Fixe" / "Variable"
- Réponse : "Fixe"
- Feedback : "Tu le paies même si tu produis peu."

### Écran 10 - write - Exemple Coût Variable
- Question : "Donne un exemple de coût variable en studio."
- Réponse attendue : "électricité"
- Requirements :
  - keywords : ["électricité", "matière", "matières", "transport", "énergie"]
  - minWords : 1
- Hint : "C'est ce qui augmente quand les machines tournent plus."
- Hint2 : "Donne un exemple de dépense qui varie avec la production."
- Hint3 : "Solution à recopier : « électricité »."
- Feedback : "Oui ! L'électricité varie avec la production."

### Écran 11 - msg - Seuil de Rentabilité
- Texte : "Le seuil de rentabilité est le moment où le profit devient positif."
- Encadré : "Avant = perte | Après = gain"

### Écran 12 - quiz - CA vs Profit
- Question : "Le CA et le profit, c'est la même chose ?"
- Options : "Oui" / "Non"
- Réponse : "Non"
- Feedback : "Le profit tient compte des coûts."

### Écran 13 - write - Mini Calcul Profit
- Question : "Tu vends 50 places à 30 (CA) et tes coûts sont 1200. Quel est ton profit ?"
- Réponse attendue : "300"
- Requirements :
  - keywords : ["300"]
  - minWords : 1
- Hint : "CA = 50 x 30 = 1500. Puis 1500 - 1200."
- Hint2 : "Fais le calcul complet du CA puis retire les coûts."
- Hint3 : "Solution à recopier : « 300 »."
- Feedback : "Profit = 300. Bien calculé."

### Écran 14 - quiz - Capital ou Travail
- Question : "La table de mixage est du..."
- Options : "Travail" / "Capital"
- Réponse : "Capital"
- Feedback : "C'est un outil, donc du capital."

### Écran 15 - challenge - Synthèse Profit
- Question : "Explique en 2 phrases comment augmenter le profit d'un label."
- Requirements :
  - keywordGroups :
    - ["augmenter", "augmente", "augmentant", "hausser", "monter"]
    - ["coût", "coûts", "dépense", "dépenses"]
    - ["prix", "ca", "chiffre", "vente", "ventes"]
  - minWords : 8
  - minSentences : 2
- Hint : "Parle de faire monter le CA ou de faire baisser les coûts."
- Hint2 : "Écris 2 phrases avec les mots : augmenter, coûts, prix/ventes."
- Hint3 : "Solution à recopier : « Pour augmenter le profit, on peut hausser le prix de vente. On peut aussi réduire les coûts de production. »"
- Feedback : "Synthèse valide. Tu relies CA, coûts et profit."

---

## Séance 3 - Identité & Socialisation

### Objectifs pédagogiques et compétences
- Distinguer normes et valeurs.
- Identifier agents de socialisation et sanctions.

### Index technique (ordre des étapes)
1. msg - Briefing Sociologie
2. quiz - Norme ou Valeur
3. write - Agents de Socialisation
4. quiz - Sanction Sociale
5. msg - Socialisation Primaire
6. msg - Socialisation Secondaire
7. quiz - Agent Secondaire
8. write - Exemple de Norme
9. msg - Influence des Réseaux
10. quiz - Conformisme
11. write - Exemple de Valeur
12. msg - Sanction Positive
13. quiz - Sanction Positive Exemple
14. write - Rôle des Pairs
15. challenge - Synthèse Socialisation

### Écran 1 - msg - Briefing Sociologie
- Texte : "La socialisation, c'est le processus par lequel tu apprends les règles (normes) et les valeurs de ton groupe."
- Encadré : "Normes = règles | Valeurs = idéaux"

### Écran 2 - quiz - Norme ou Valeur
- Question : "Dire bonjour à son équipe est une..."
- Options : "Norme" / "Valeur"
- Réponse : "Norme"
- Feedback : "Correct. C'est une règle de politesse apprise."

### Écran 3 - write - Agents de Socialisation
- Question : "Cite un agent de socialisation à l'école."
- Réponse attendue : "professeurs"
- Requirements :
  - keywords : ["professeur", "professeurs", "enseignant", "enseignants", "profs", "école"]
  - minWords : 1
- Hint : "Ce sont les personnes qui t'enseignent en classe."
- Hint2 : "Donne un agent de socialisation présent à l'école."
- Hint3 : "Solution à recopier : « professeurs »."
- Feedback : "L'école et les profs sont des agents majeurs."

### Écran 4 - quiz - Sanction Sociale
- Question : "Si une manager ne respecte jamais ses rendez-vous, elle subit une sanction..."
- Options : "Pécuniaire" / "Sociale" / "Les deux"
- Réponse : "Les deux"
- Feedback : "Exact ! Amendes et mauvaise image peuvent tomber."

### Écran 5 - msg - Socialisation Primaire
- Texte : "La socialisation primaire se fait dans l'enfance, surtout avec la famille."
- Encadré : "Famille = premiers codes, premiers comportements"

### Écran 6 - msg - Socialisation Secondaire
- Texte : "La socialisation secondaire arrive plus tard : école, amis, travail, médias."
- Encadré : "On ajuste son comportement selon les nouveaux groupes"

### Écran 7 - quiz - Agent Secondaire
- Question : "Quel est un agent de socialisation secondaire ?"
- Options : "La famille" / "Les amis" / "Le bébé"
- Réponse : "Les amis"
- Feedback : "Oui. Les amis influencent à l'adolescence."

### Écran 8 - write - Exemple de Norme
- Question : "Donne une norme simple au studio."
- Réponse attendue : "ponctualité"
- Requirements :
  - keywords : ["ponctualité", "heure", "respect", "respecter", "arriver"]
  - minWords : 1
- Hint : "Par exemple : arriver à l'heure."
- Hint2 : "Écris une règle concrète attendue dans un studio."
- Hint3 : "Solution à recopier : « ponctualité »."
- Feedback : "Bien. Une norme, c'est une règle à suivre."

### Écran 9 - msg - Influence des Réseaux
- Texte : "Les réseaux sociaux diffusent des styles, des codes et des comportements."
- Encadré : "Ils peuvent renforcer ou changer les normes"

### Écran 10 - quiz - Conformisme
- Question : "Si tout le monde s'habille pareil pour un clip, c'est un effet de..."
- Options : "Conformisme" / "Hasard" / "Productivité"
- Réponse : "Conformisme"
- Feedback : "Oui. On suit la norme du groupe."

### Écran 11 - write - Exemple de Valeur
- Question : "Donne une valeur importante dans une équipe."
- Réponse attendue : "respect"
- Requirements :
  - keywords : ["respect", "solidarité", "confiance", "entraide"]
  - minWords : 1
- Hint : "C'est un idéal qui guide le groupe."
- Hint2 : "Donne une valeur morale utile à une équipe."
- Hint3 : "Solution à recopier : « respect »."
- Feedback : "Parfait. Une valeur guide les comportements."

### Écran 12 - msg - Sanction Positive
- Texte : "Une sanction peut aussi être positive : récompense, confiance, promotion."
- Encadré : "Bon comportement = valorisation"

### Écran 13 - quiz - Sanction Positive Exemple
- Question : "Quel exemple montre une sanction positive ?"
- Options : "Prime" / "Amende" / "Exclusion"
- Réponse : "Prime"
- Feedback : "Oui. On récompense un bon comportement."

### Écran 14 - write - Rôle des Pairs
- Question : "Cite en un mot ce qui influence beaucoup les choix des ados."
- Réponse attendue : "amis"
- Requirements :
  - keywords : ["amis", "ami", "groupe", "pairs", "pair"]
  - minWords : 1
- Hint : "Pense au cercle proche des ados."
- Hint2 : "Nomme en un mot le groupe qui influence le plus les ados."
- Hint3 : "Solution à recopier : « amis »."
- Feedback : "Exact. Les pairs influencent fortement."

### Écran 15 - challenge - Synthèse Socialisation
- Question : "Explique comment la socialisation construit l'identité d'un artiste."
- Requirements :
  - keywordGroups :
    - ["norme", "normes", "règle", "règles"]
    - ["valeur", "valeurs"]
    - ["groupe", "entourage", "pairs", "famille"]
  - minWords : 8
  - minSentences : 2
- Hint : "Parle des règles, des valeurs et des personnes autour."
- Hint2 : "Fais 2 phrases avec : normes, valeurs, groupe/entourage."
- Hint3 : "Solution à recopier : « Les normes du groupe guident les comportements de l'artiste. Les valeurs apprises avec l'entourage construisent son identité. »"
- Feedback : "Bonne synthèse. Tu relies normes, valeurs et influence du groupe."

---

## Séance 4 - L'Entreprise & son Image

### Objectifs pédagogiques et compétences
- Comprendre culture d'entreprise et image.
- Argumenter sur l'importance des normes.

### Index technique (ordre des étapes)
1. msg - Statut de l'Entreprise
2. quiz - Culture Studio
3. write - Image de Marque
4. msg - Réputation
5. quiz - Visibilité Réseaux
6. write - Communication Cohérente
7. msg - Confiance Clients
8. quiz - Service Client
9. write - Valeur d'Entreprise
10. msg - Normes et Loi
11. quiz - Bad Buzz
12. write - Transparence
13. msg - Positionnement
14. quiz - Cible de Marque
15. challenge - Synthèse Image

### Écran 1 - msg - Statut de l'Entreprise
- Texte : "Une entreprise n'est pas qu'une machine à cash. C'est une organisation sociale avec une culture."
- Encadré : "Identité = Logo + Valeurs + Comportement"

### Écran 2 - quiz - Culture Studio
- Question : "Laquelle de ces actions renforce la culture d'entreprise d'un label ?"
- Options : "Augmenter les prix" / "Organiser un team-building" / "Acheter des machines"
- Réponse : "Organiser un team-building"
- Feedback : "Le team-building renforce les liens entre les agents."

### Écran 3 - write - Image de Marque
- Question : "Quel mot désigne la perception d'une entreprise par le public ?"
- Réponse attendue : "image"
- Requirements :
  - keywords : ["image", "réputation", "notoriété"]
  - minWords : 1
- Hint : "C'est ce que les gens pensent de toi."
- Hint2 : "Donne le mot central qui désigne la perception du public."
- Hint3 : "Solution à recopier : « image »."
- Feedback : "Oui. L'image de marque est capitale."

### Écran 4 - msg - Réputation
- Texte : "La réputation se construit lentement et peut se perdre vite."
- Encadré : "Actions + paroles = image publique"

### Écran 5 - quiz - Visibilité Réseaux
- Question : "Si un bad buzz se propage, l'image du label..."
- Options : "Se renforce" / "Se dégrade" / "Ne change pas"
- Réponse : "Se dégrade"
- Feedback : "Oui. La confiance baisse."

### Écran 6 - write - Communication Cohérente
- Question : "Donne un mot qui montre une communication claire et stable."
- Réponse attendue : "cohérente"
- Requirements :
  - keywords : ["cohérente", "claire", "stable"]
  - minWords : 1
- Hint : "L'opposé d'une communication confuse."
- Hint2 : "Utilise le terme qui exprime une communication stable."
- Hint3 : "Solution à recopier : « cohérente »."
- Feedback : "Oui. Une communication cohérente protège l'image."

### Écran 7 - msg - Confiance Clients
- Texte : "Sans confiance, les clients n'achètent pas. La confiance est un capital invisible."

### Écran 8 - quiz - Service Client
- Question : "Répondre vite aux plaintes, c'est bon pour..."
- Options : "La confiance" / "La perte" / "Le chaos"
- Réponse : "La confiance"
- Feedback : "Exact. Le client se sent respecté."

### Écran 9 - write - Valeur d'Entreprise
- Question : "Cite une valeur que doit porter un label."
- Réponse attendue : "respect"
- Requirements :
  - keywords : ["respect", "qualité", "solidarité"]
  - minWords : 1
- Hint : "C'est un idéal qui guide les comportements."
- Hint2 : "Donne une valeur clé pour la culture d'entreprise."
- Hint3 : "Solution à recopier : « respect »."
- Feedback : "Bien. Une valeur renforce la culture."

### Écran 10 - msg - Normes et Loi
- Texte : "Une entreprise doit respecter les normes sociales et les lois."
- Encadré : "Respect = image stable + clients rassurés"

### Écran 11 - quiz - Bad Buzz
- Question : "Ignorer une crise d'image entraîne..."
- Options : "Confiance" / "Bad buzz" / "Fidélité"
- Réponse : "Bad buzz"
- Feedback : "Oui. Le silence aggrave la crise."

### Écran 12 - write - Transparence
- Question : "Pourquoi la transparence rassure les clients ?"
- Réponse attendue : "confiance"
- Requirements :
  - keywords : ["confiance", "clients"]
  - minWords : 2
- Hint : "Écris un mot lié à l'image positive."
- Hint2 : "Ta réponse doit contenir au moins 2 mots, dont confiance ou clients."
- Hint3 : "Solution à recopier : « confiance clients »."
- Feedback : "Exact. La transparence renforce la confiance."

### Écran 13 - msg - Positionnement
- Texte : "Le positionnement, c'est la place que tu veux occuper dans la tête du public."
- Encadré : "Exemple : label premium vs label accès"

### Écran 14 - quiz - Cible de Marque
- Question : "Choisir un public cible, c'est..."
- Options : "Parler à tout le monde" / "Parler à un groupe précis" / "Ne rien dire"
- Réponse : "Parler à un groupe précis"
- Feedback : "Oui. Une marque claire choisit sa cible."

### Écran 15 - challenge - Synthèse Image
- Question : "Explique comment l'image d'un label influence ses ventes."
- Requirements :
  - keywords : ["image", "ventes", "confiance"]
  - minWords : 6
- Hint : "Relie réputation, confiance et achat."
- Hint2 : "Écris une phrase d'au moins 6 mots avec : image, confiance, ventes."
- Hint3 : "Solution à recopier : « Une bonne image crée la confiance et soutient les ventes du label. »"
- Feedback : "Synthèse valide. Tu relies image et ventes."

---

## Séance 5 - Le Grand Audit

### Objectifs pédagogiques et compétences
- Mobiliser les notions centrales du module.
- Produire une courte analyse argumentée.

### Index technique (ordre des étapes)
1. msg - Examen de Grade
2. quiz - Signal de Marché
3. write - Calcul Profit
4. quiz - Capital K
5. msg - Rappel Équilibre
6. quiz - Coût Fixe ou Variable
7. write - Mot Équilibre
8. quiz - Norme ou Valeur
9. write - Agent de Socialisation
10. quiz - Image de Marque
11. msg - Stratégie Manager
12. write - Stock Invendu
13. quiz - Profit vs CA
14. write - Confiance Clients
15. challenge - Audit Final

### Écran 1 - msg - Examen de Grade
- Texte : "Zyvah, c'est l'heure du test final. Tu dois prouver que tu maîtrises le marché, les coûts et la socialisation."

### Écran 2 - quiz - Signal de Marché
- Question : "Si la demande baisse mais que l'offre reste forte, que risque de faire le prix ?"
- Options : "Monter (pénurie)" / "Baisser (surplus)" / "Ne pas bouger"
- Réponse : "Baisser (surplus)"
- Feedback : "Surplus = baisse des prix pour écouler les stocks."

### Écran 3 - write - Calcul Profit
- Question : "Une artiste vend pour 5000 de merch. Ses coûts sont de 3200. Quel est son profit ?"
- Réponse attendue : "1800"
- Requirements :
  - keywords : ["1800"]
  - minWords : 1
- Hint : "Fais 5000 - 3200."
- Hint2 : "Retire les coûts du chiffre d'affaires pour trouver le profit."
- Hint3 : "Solution à recopier : « 1800 »."
- Feedback : "Calcul valide : 1800."

### Écran 4 - quiz - Capital K
- Question : "En SES, que désigne la lettre K ?"
- Options : "Le capital" / "Le karma" / "Le kilo"
- Réponse : "Le capital"
- Feedback : "K = capital (machines, outils)."

### Écran 5 - msg - Rappel Équilibre
- Texte : "Le prix d'équilibre est le point où offre et demande se rencontrent."

### Écran 6 - quiz - Coût Fixe ou Variable
- Question : "Le loyer du studio est un coût..."
- Options : "Fixe" / "Variable"
- Réponse : "Fixe"
- Feedback : "Il ne dépend pas du volume."

### Écran 7 - write - Mot Équilibre
- Question : "Quel mot complète la phrase : Offre = Demande = ... ?"
- Réponse attendue : "équilibre"
- Requirements :
  - keywords : ["équilibre"]
  - minWords : 1
- Hint : "C'est le mot clé du marché."
- Hint2 : "Complète l'égalité Offre = Demande avec le mot attendu."
- Hint3 : "Solution à recopier : « équilibre »."
- Feedback : "Oui : l'équilibre."

### Écran 8 - quiz - Norme ou Valeur
- Question : "Le respect des horaires en studio est une..."
- Options : "Norme" / "Valeur"
- Réponse : "Norme"
- Feedback : "C'est une règle de comportement."

### Écran 9 - write - Agent de Socialisation
- Question : "Cite un agent de socialisation secondaire."
- Réponse attendue : "amis"
- Requirements :
  - keywords : ["amis", "réseaux", "école"]
  - minWords : 1
- Hint : "Exemple : ton groupe proche."
- Hint2 : "Donne un agent secondaire comme amis, réseaux ou école."
- Hint3 : "Solution à recopier : « amis »."
- Feedback : "Oui. Les amis ou l'école influencent."

### Écran 10 - quiz - Image de Marque
- Question : "L'image de marque, c'est..."
- Options : "Ce que le public pense" / "Le nombre de ventes" / "Le prix"
- Réponse : "Ce que le public pense"
- Feedback : "Exact. C'est la perception."

### Écran 11 - msg - Stratégie Manager
- Texte : "Un bon manager ajuste prix, coûts et communication pour garder la confiance."

### Écran 12 - write - Stock Invendu
- Question : "Si tu as trop de stock invendu, quelle action prends-tu sur le prix ?"
- Réponse attendue : "baisser"
- Requirements :
  - keywords : ["baisser"]
  - minWords : 1
- Hint : "Pour vendre plus, on rend plus accessible."
- Hint2 : "Quand le stock est trop grand, l'action sur le prix est de le diminuer."
- Hint3 : "Solution à recopier : « baisser »."
- Feedback : "Oui. Baisser attire la demande."

### Écran 13 - quiz - Profit vs CA
- Question : "Le profit correspond à..."
- Options : "CA seulement" / "CA - coûts" / "Coûts + taxes"
- Réponse : "CA - coûts"
- Feedback : "Exact. Le profit tient compte des coûts."

### Écran 14 - write - Confiance Clients
- Question : "Écris un mot qui relie image et ventes."
- Réponse attendue : "confiance"
- Requirements :
  - keywords : ["confiance", "clients"]
  - minWords : 1
- Hint : "Quand elle est haute, les clients achètent."
- Hint2 : "Donne le mot qui relie directement image de marque et ventes."
- Hint3 : "Solution à recopier : « confiance »."
- Feedback : "Oui. La confiance fait vendre."

### Écran 15 - challenge - Audit Final
- Question : "Explique comment un manager peut augmenter le profit sans casser l'image du label."
- Requirements :
  - keywords : ["prix", "coûts", "image"]
  - minWords : 6
- Hint : "Parle de prix justes, coûts maîtrisés et confiance."
- Hint2 : "Écris une phrase d'au moins 6 mots avec : prix, coûts, image."
- Hint3 : "Solution à recopier : « Un manager ajuste le prix, maîtrise les coûts et protège l'image. »"
- Feedback : "Audit valide. Tu relies économie et image."