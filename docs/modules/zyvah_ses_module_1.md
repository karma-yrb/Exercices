# Draft - Zyvah SES Module 1

## Meta
- Theme: Manager - economie + sociologie
- Objectif: offre/demande, couts/profit, socialisation, image, synthese
- Seances: 5
- ScreensPerSeance: 15
- Duree cible: ~10 min par Seance

## Seance 1 - Le Marche du Son

### Objectifs pedagogiques et competences
- Comprendre offre/demande et leurs variations.
- Identifier le prix d'equilibre et ses effets.

### Index technique (ordre des steps)
1. msg - Briefing Manager
2. quiz - Identification Offre
3. write - Terminologie Offre
4. msg - Loi de l'Offre
5. msg - Loi de la Demande
6. quiz - Mecanisme Prix
7. msg - Prix d'Equilibre
8. write - Mot Cle Equilibre
9. quiz - Choc de Demande
10. write - Action Manager
11. quiz - Validation Marche
12. msg - Courbes en Mouvement
13. quiz - Choc d'Offre
14. write - Effet Prix Bas
15. challenge - Synthese Marche

### Ecran 1 - msg - Briefing Manager
- Texte: "Bienvenue dans le Game, Zyvah. Un marche, c'est partout ou des vendeurs (Offre) et des acheteurs (Demande) se rencontrent."
- Encadre: "Dans l'industrie musicale : Offre = Artistes, labels, salles. Demande = Fans, auditeurs."

### Ecran 2 - quiz - Identification Offre
- Question: "Qui represente l'OFFRE sur le marche du streaming ?"
- Options: "Les fans" / "Spotify" / "Le prix"
- Reponse: "Spotify"
- Feedback: "Exact ! Le vendeur propose le produit."

### Ecran 3 - write - Terminologie Offre
- Question: "Quel mot designe l'ensemble des vendeurs sur un marche ?"
- Reponse attendue: "offre"
- Requirements:
  - keywords: ["offre"]
  - minWords: 1
- Hint: "C'est l'un des deux mots du titre de la Seance (ca commence par O)."
- Feedback: "Correct. C'est le signal des producteurs."

### Ecran 4 - msg - Loi de l'Offre
- Texte: "Plus le prix est eleve, plus les producteurs veulent vendre."
- Encadre: "Prix monte = Offre monte"

### Ecran 5 - msg - Loi de la Demande
- Texte: "Inversement pour les fans : si c'est trop cher, ils achetent moins."
- Encadre: "Prix monte = Demande baisse"

### Ecran 6 - quiz - Mecanisme Prix
- Question: "Si le prix d'un disque passe de 20 a 50, que fait la demande ?"
- Options: "Elle augmente" / "Elle diminue" / "Rien"
- Reponse: "Elle diminue"
- Feedback: "Loi de base : trop cher = moins de clients."

### Ecran 7 - msg - Prix d'Equilibre
- Texte: "Le marche cherche toujours un point de rencontre : le moment ou tout ce qui est produit est achete."
- Encadre: "Equilibre : Offre = Demande"
- Texte: "A ce prix-la, il n'y a plus aucun stock invendu et plus aucun client frustre."

### Ecran 8 - write - Mot Cle Equilibre
- Question: "Comment appelle-t-on le prix ou l'offre est egale a la demande ?"
- Reponse attendue: "equilibre"
- Requirements:
  - keywords: ["equilibre"]
  - minWords: 1
- Hint: "C'est quand les deux cotes de la balance sont au meme niveau (9 lettres)."
- Feedback: "Le prix d'equilibre ! La ou le marche se vide."

### Ecran 9 - quiz - Choc de Demande
- Question: "Une trend TikTok rend ton son viral. La demande EXPLOSE. Le prix..."
- Options: "Va descendre" / "Va monter" / "Va disparaitre"
- Reponse: "Va monter"
- Feedback: "Forte demande + stock limite = hausse des prix."

### Ecran 10 - write - Action Manager
- Question: "Si tu as trop de stock invendu, dois-tu monter ou baisser ton prix ?"
- Reponse attendue: "baisser"
- Requirements:
  - keywords: ["baisser", "baisse", "baisses", "reduire", "reduit", "reduction"]
  - minWords: 1
- Hint: "Pour attirer plus de clients (Demande), que fais-tu du prix ?"
- Feedback: "Baisser le prix attire la demande pour vider le stock."

### Ecran 11 - quiz - Validation Marche
- Question: "Vrai ou Faux : Sur un marche, le prix est fixe uniquement par le vendeur ?"
- Options: "VRAI" / "FAUX"
- Reponse: "FAUX"
- Feedback: "Faux ! L'acheteur (la demande) a aussi son mot a dire."

### Ecran 12 - msg - Courbes en Mouvement
- Texte: "Quand la demande ou l'offre change, le prix d'equilibre bouge."
- Encadre: "Plus de demande = prix monte | Plus d'offre = prix baisse"

### Ecran 13 - quiz - Choc d'Offre
- Question: "Le cout des matieres premieres augmente. L'offre baisse. Le prix..."
- Options: "Monte" / "Baisse" / "Ne change pas"
- Reponse: "Monte"
- Feedback: "Moins d'offre = tension = hausse des prix."

### Ecran 14 - write - Effet Prix Bas
- Question: "Si le prix baisse, que fait en general la demande ?"
- Reponse attendue: "augmente"
- Requirements:
  - keywords: ["augmente", "augmentation", "monte", "hausse"]
  - minWords: 1
- Hint: "Prix plus bas = plus de clients."
- Feedback: "Oui ! La demande augmente quand le prix baisse."

### Ecran 15 - challenge - Synthese Marche
- Question: "Explique en 2 phrases comment se fixe le prix d'un concert."
- Requirements:
  - keywordGroups:
    - ["offre", "offres"]
    - ["demande", "demandes"]
    - ["equilibre", "equilibrer", "equilibres"]
  - minWords: 8
  - minSentences: 2
- Hint: "Parle du nombre de places (offre) et du nombre de fans (demande)."
- Feedback: "Analyse valide. Tu relies offre, demande et prix d'equilibre."

## Seance 2 - Couts & Profit

### Objectifs pedagogiques et competences
- Distinguer travail, capital, couts fixes/variables.
- Calculer chiffre d'affaires et profit.

### Index technique (ordre des steps)
1. msg - Facteurs de Production
2. quiz - Inventaire
3. write - Facteur Humain
4. msg - Cout Fixe vs Variable
5. quiz - Type de Cout
6. write - Calcul CA
7. msg - Profitabilite
8. write - Verdict Profit
9. quiz - Exemple Cout Fixe
10. write - Exemple Cout Variable
11. msg - Seuil de Rentabilite
12. quiz - CA vs Profit
13. write - Mini Calcul Profit
14. quiz - Capital ou Travail
15. challenge - Synthese Profit

### Ecran 1 - msg - Facteurs de Production
- Texte: "Pour produire, il faut deux grands facteurs : le travail (L) et le capital (K)."
- Encadre: "Travail = humains | Capital = machines, outils"

### Ecran 2 - quiz - Inventaire
- Question: "L'ordinateur du studio, c'est quel facteur ?"
- Options: "Travail" / "Capital"
- Reponse: "Capital"
- Feedback: "C'est un outil, donc du capital."

### Ecran 3 - write - Facteur Humain
- Question: "Comment appelle-t-on le facteur represente par l'ingenieur du son ?"
- Reponse attendue: "travail"
- Requirements:
  - keywords: ["travail"]
  - minWords: 1
- Hint: "C'est l'activite de l'humain pour produire."
- Feedback: "Exact. L'effort humain, c'est le travail."

### Ecran 4 - msg - Cout Fixe vs Variable
- Texte: "Un cout fixe ne change pas avec la production. Un cout variable depend du volume."
- Encadre: "Fixe = loyer | Variable = matiere premiere"

### Ecran 5 - quiz - Type de Cout
- Question: "L'electricite du studio qui tourne 24h/24 est un..."
- Options: "Cout fixe" / "Cout variable"
- Reponse: "Cout variable"
- Feedback: "Plus tu produis, plus tu consommes : c'est variable."

### Ecran 6 - write - Calcul CA
- Question: "CA = Prix x Quantite. Si tu vends 100 places a 20, quel est ton CA ?"
- Reponse attendue: "2000"
- Requirements:
  - keywords: ["2000"]
  - minWords: 1
- Hint: "Fais l'operation 100 multiplie par 20."
- Feedback: "2000 de chiffre d'affaires."

### Ecran 7 - msg - Profitabilite
- Texte: "Profit = CA - Couts totaux. Ne confonds jamais l'argent qui rentre (CA) et ce qu'il te reste (profit)."

### Ecran 8 - write - Verdict Profit
- Question: "CA = 2000. Couts = 1500. Quel est ton profit ?"
- Reponse attendue: "500"
- Requirements:
  - keywords: ["500"]
  - minWords: 1
- Hint: "Fais la soustraction : 2000 - 1500."
- Feedback: "Il te reste 500 de gain reel."

### Ecran 9 - quiz - Exemple Cout Fixe
- Question: "Le loyer du studio est un cout..."
- Options: "Fixe" / "Variable"
- Reponse: "Fixe"
- Feedback: "Tu le paies meme si tu produis peu."

### Ecran 10 - write - Exemple Cout Variable
- Question: "Donne un exemple de cout variable en studio."
- Reponse attendue: "electricite"
- Requirements:
  - keywords: ["electricite", "matiere", "matieres", "transport", "energie"]
  - minWords: 1
- Hint: "C'est ce qui augmente quand les machines tournent plus."
- Feedback: "Oui ! L'electricite varie avec la production."

### Ecran 11 - msg - Seuil de Rentabilite
- Texte: "Le seuil de rentabilite est le moment ou le profit devient positif."
- Encadre: "Avant = perte | Apres = gain"

### Ecran 12 - quiz - CA vs Profit
- Question: "Le CA et le profit, c'est la meme chose ?"
- Options: "Oui" / "Non"
- Reponse: "Non"
- Feedback: "Le profit tient compte des couts."

### Ecran 13 - write - Mini Calcul Profit
- Question: "Tu vends 50 places a 30 (CA) et tes couts sont 1200. Quel est ton profit ?"
- Reponse attendue: "300"
- Requirements:
  - keywords: ["300"]
  - minWords: 1
- Hint: "CA = 50 x 30 = 1500. Puis 1500 - 1200."
- Feedback: "Profit = 300. Bien calcule."

### Ecran 14 - quiz - Capital ou Travail
- Question: "La table de mixage est du..."
- Options: "Travail" / "Capital"
- Reponse: "Capital"
- Feedback: "C'est un outil, donc du capital."

### Ecran 15 - challenge - Synthese Profit
- Question: "Explique en 2 phrases comment augmenter le profit d'un label."
- Requirements:
  - keywordGroups:
    - ["augmenter", "augmente", "augmentant", "hausser", "monter"]
    - ["cout", "couts", "depense", "depenses"]
    - ["prix", "ca", "chiffre", "vente", "ventes"]
  - minWords: 8
  - minSentences: 2
- Hint: "Parle de faire monter le CA ou de faire baisser les couts."
- Feedback: "Synthese valide. Tu relies CA, couts et profit."

## Seance 3 - Identite & Socialisation

### Objectifs pedagogiques et competences
- Distinguer normes et valeurs.
- Identifier agents de socialisation et sanctions.

### Index technique (ordre des steps)
1. msg - Briefing Sociologie
2. quiz - Norme ou Valeur
3. write - Agents de Socialisation
4. quiz - Sanction Sociale
5. msg - Socialisation Primaire
6. msg - Socialisation Secondaire
7. quiz - Agent Secondaire
8. write - Exemple de Norme
9. msg - Influence des Reseaux
10. quiz - Conformisme
11. write - Exemple de Valeur
12. msg - Sanction Positive
13. quiz - Sanction Positive Exemple
14. write - Role des Pairs
15. challenge - Synthese Socialisation

### Ecran 1 - msg - Briefing Sociologie
- Texte: "La socialisation, c'est le processus par lequel tu apprends les regles (normes) et les valeurs de ton groupe."
- Encadre: "Normes = regles | Valeurs = ideaux"

### Ecran 2 - quiz - Norme ou Valeur
- Question: "Dire bonjour a son equipe est une..."
- Options: "Norme" / "Valeur"
- Reponse: "Norme"
- Feedback: "Correct. C'est une regle de politesse apprise."

### Ecran 3 - write - Agents de Socialisation
- Question: "Cite un agent de socialisation a l'ecole."
- Reponse attendue: "professeurs"
- Requirements:
  - keywords: ["professeur", "professeurs", "enseignant", "enseignants", "profs", "ecole"]
  - minWords: 1
- Hint: "Ce sont les personnes qui t'enseignent en classe."
- Feedback: "L'ecole et les profs sont des agents majeurs."

### Ecran 4 - quiz - Sanction Sociale
- Question: "Si une manager ne respecte jamais ses rendez-vous, elle subit une sanction..."
- Options: "Pecuniaire" / "Sociale" / "Les deux"
- Reponse: "Les deux"
- Feedback: "Exact ! Amendes et mauvaise image peuvent tomber."

### Ecran 5 - msg - Socialisation Primaire
- Texte: "La socialisation primaire se fait dans l'enfance, surtout avec la famille."
- Encadre: "Famille = premiers codes, premiers comportements"

### Ecran 6 - msg - Socialisation Secondaire
- Texte: "La socialisation secondaire arrive plus tard : ecole, amis, travail, medias."
- Encadre: "On ajuste son comportement selon les nouveaux groupes"

### Ecran 7 - quiz - Agent Secondaire
- Question: "Quel est un agent de socialisation secondaire ?"
- Options: "La famille" / "Les amis" / "Le bebe"
- Reponse: "Les amis"
- Feedback: "Oui. Les amis influencent a l'adolescence."

### Ecran 8 - write - Exemple de Norme
- Question: "Donne une norme simple au studio."
- Reponse attendue: "ponctualite"
- Requirements:
  - keywords: ["ponctualite", "heure", "respect", "respecter", "arriver"]
  - minWords: 1
- Hint: "Par exemple : arriver a l'heure."
- Feedback: "Bien. Une norme, c'est une regle a suivre."

### Ecran 9 - msg - Influence des Reseaux
- Texte: "Les reseaux sociaux diffusent des styles, des codes et des comportements."
- Encadre: "Ils peuvent renforcer ou changer les normes"

### Ecran 10 - quiz - Conformisme
- Question: "Si tout le monde s'habille pareil pour un clip, c'est un effet de..."
- Options: "Conformisme" / "Hasard" / "Productivite"
- Reponse: "Conformisme"
- Feedback: "Oui. On suit la norme du groupe."

### Ecran 11 - write - Exemple de Valeur
- Question: "Donne une valeur importante dans une equipe."
- Reponse attendue: "respect"
- Requirements:
  - keywords: ["respect", "solidarite", "confiance", "entraide"]
  - minWords: 1
- Hint: "C'est un ideal qui guide le groupe."
- Feedback: "Parfait. Une valeur guide les comportements."

### Ecran 12 - msg - Sanction Positive
- Texte: "Une sanction peut aussi etre positive : recompense, confiance, promotion."
- Encadre: "Bon comportement = valorisation"

### Ecran 13 - quiz - Sanction Positive Exemple
- Question: "Quel exemple montre une sanction positive ?"
- Options: "Prime" / "Amende" / "Exclusion"
- Reponse: "Prime"
- Feedback: "Oui. On recompense un bon comportement."

### Ecran 14 - write - Role des Pairs
- Question: "Cite en un mot qui influence beaucoup les choix des ados."
- Reponse attendue: "amis"
- Requirements:
  - keywords: ["amis", "ami", "groupe", "pairs", "pair"]
  - minWords: 1
- Hint: "Pense au cercle proche des ados."
- Feedback: "Exact. Les pairs influencent fortement."

### Ecran 15 - challenge - Synthese Socialisation
- Question: "Explique comment la socialisation construit l'identite d'un artiste."
- Requirements:
  - keywordGroups:
    - ["norme", "normes", "regle", "regles"]
    - ["valeur", "valeurs"]
    - ["groupe", "entourage", "pairs", "famille"]
  - minWords: 8
  - minSentences: 2
- Hint: "Parle des regles, des valeurs et des personnes autour."
- Feedback: "Bonne synthese. Tu relies normes, valeurs et influence du groupe."

## Seance 4 - L'Entreprise & son Image

### Objectifs pedagogiques et competences
- Comprendre culture d'entreprise et image.
- Argumenter sur l'importance des normes.

### Index technique (ordre des steps)
1. msg - Statut de l'Entreprise
2. quiz - Culture Studio
3. write - Image de Marque
4. msg - Reputation
5. quiz - Visibilite Reseaux
6. write - Communication Coherente
7. msg - Confiance Clients
8. quiz - Service Client
9. write - Valeur d'Entreprise
10. msg - Normes et Loi
11. quiz - Bad Buzz
12. write - Transparence
13. msg - Positionnement
14. quiz - Cible de Marque
15. challenge - Synthese Image

### Ecran 1 - msg - Statut de l'Entreprise
- Texte: "Une entreprise n'est pas qu'une machine a cash. C'est une organisation sociale avec une culture."
- Encadre: "Identite = Logo + Valeurs + Comportement"

### Ecran 2 - quiz - Culture Studio
- Question: "Laquelle de ces actions renforce la culture d'entreprise d'un label ?"
- Options: "Augmenter les prix" / "Organiser un team-building" / "Acheter des machines"
- Reponse: "Organiser un team-building"
- Feedback: "Le team-building renforce les liens entre les agents."

### Ecran 3 - write - Image de Marque
- Question: "Quel mot designe la perception d'une entreprise par le public ?"
- Reponse attendue: "image"
- Requirements:
  - keywords: ["image", "reputation", "notoriete"]
  - minWords: 1
- Hint: "C'est ce que les gens pensent de toi."
- Feedback: "Oui. L'image de marque est capitale."

### Ecran 4 - msg - Reputation
- Texte: "La reputation se construit lentement et peut se perdre vite."
- Encadre: "Actions + paroles = image publique"

### Ecran 5 - quiz - Visibilite Reseaux
- Question: "Si un bad buzz se propage, l'image du label..."
- Options: "Se renforce" / "Se degrade" / "Ne change pas"
- Reponse: "Se degrade"
- Feedback: "Oui. La confiance baisse."

### Ecran 6 - write - Communication Coherente
- Question: "Donne un mot qui montre une communication claire et stable."
- Reponse attendue: "coherente"
- Requirements:
  - keywords: ["coherente", "claire", "stable"]
  - minWords: 1
- Hint: "L'opposite d'une communication confuse."
- Feedback: "Oui. Une communication coherente protege l'image."

### Ecran 7 - msg - Confiance Clients
- Texte: "Sans confiance, les clients n'achetent pas. La confiance est un capital invisible."

### Ecran 8 - quiz - Service Client
- Question: "Repondre vite aux plaintes, c'est bon pour..."
- Options: "La confiance" / "La perte" / "Le chaos"
- Reponse: "La confiance"
- Feedback: "Exact. Le client se sent respecte."

### Ecran 9 - write - Valeur d'Entreprise
- Question: "Cite une valeur que doit porter un label."
- Reponse attendue: "respect"
- Requirements:
  - keywords: ["respect", "qualite", "solidarite"]
  - minWords: 1
- Hint: "C'est un ideal qui guide les comportements."
- Feedback: "Bien. Une valeur renforce la culture."

### Ecran 10 - msg - Normes et Loi
- Texte: "Une entreprise doit respecter les normes sociales et les lois."
- Encadre: "Respect = image stable + clients rassures"

### Ecran 11 - quiz - Bad Buzz
- Question: "Ignorer une crise d'image entraine..."
- Options: "Confiance" / "Bad buzz" / "Fidelite"
- Reponse: "Bad buzz"
- Feedback: "Oui. Le silence aggrave la crise."

### Ecran 12 - write - Transparence
- Question: "Pourquoi la transparence rassure les clients ?"
- Reponse attendue: "confiance"
- Requirements:
  - keywords: ["confiance", "clients"]
  - minWords: 2
- Hint: "Ecris un mot lie a l'image positive."
- Feedback: "Exact. La transparence renforce la confiance."

### Ecran 13 - msg - Positionnement
- Texte: "Le positionnement, c'est la place que tu veux occuper dans la tete du public."
- Encadre: "Exemple : label premium vs label acces"

### Ecran 14 - quiz - Cible de Marque
- Question: "Choisir un public cible, c'est..."
- Options: "Parler a tout le monde" / "Parler a un groupe precis" / "Ne rien dire"
- Reponse: "Parler a un groupe precis"
- Feedback: "Oui. Une marque claire choisit sa cible."

### Ecran 15 - challenge - Synthese Image
- Question: "Explique comment l'image d'un label influence ses ventes."
- Requirements:
  - keywords: ["image", "ventes", "confiance"]
  - minWords: 6
- Hint: "Relie reputation, confiance et achat."
- Feedback: "Synthese valide. Tu relies image et ventes."

## Seance 5 - Le Grand Audit

### Objectifs pedagogiques et competences
- Mobiliser les notions centrales du module.
- Produire une courte analyse argumentee.

### Index technique (ordre des steps)
1. msg - Examen de Grade
2. quiz - Signal de Marche
3. write - Calcul Profit
4. quiz - Capital K
5. msg - Rappel Equilibre
6. quiz - Cout Fixe ou Variable
7. write - Mot Equilibre
8. quiz - Norme ou Valeur
9. write - Agent de Socialisation
10. quiz - Image de Marque
11. msg - Strategie Manager
12. write - Stock Invendu
13. quiz - Profit vs CA
14. write - Confiance Clients
15. challenge - Audit Final

### Ecran 1 - msg - Examen de Grade
- Texte: "Zyvah, c'est l'heure du test final. Tu dois prouver que tu maitrises le marche, les couts et la socialisation."

### Ecran 2 - quiz - Signal de Marche
- Question: "Si la demande baisse mais que l'offre reste forte, que risque de faire le prix ?"
- Options: "Monter (penurie)" / "Baisser (surplus)" / "Ne pas bouger"
- Reponse: "Baisser (surplus)"
- Feedback: "Surplus = baisse des prix pour ecouler les stocks."

### Ecran 3 - write - Calcul Profit
- Question: "Une artiste vend pour 5000 de merch. Ses couts sont de 3200. Quel est son profit ?"
- Reponse attendue: "1800"
- Requirements:
  - keywords: ["1800"]
  - minWords: 1
- Hint: "Fais 5000 - 3200."
- Feedback: "Calcul valide : 1800."

### Ecran 4 - quiz - Capital K
- Question: "En SES, que designe la lettre K ?"
- Options: "Le capital" / "Le karma" / "Le kilo"
- Reponse: "Le capital"
- Feedback: "K = capital (machines, outils)."

### Ecran 5 - msg - Rappel Equilibre
- Texte: "Le prix d'equilibre est le point ou offre et demande se rencontrent."

### Ecran 6 - quiz - Cout Fixe ou Variable
- Question: "Le loyer du studio est un cout..."
- Options: "Fixe" / "Variable"
- Reponse: "Fixe"
- Feedback: "Il ne depend pas du volume."

### Ecran 7 - write - Mot Equilibre
- Question: "Quel mot complete la phrase : Offre = Demande = ... ?"
- Reponse attendue: "equilibre"
- Requirements:
  - keywords: ["equilibre"]
  - minWords: 1
- Hint: "C'est le mot cle du marche."
- Feedback: "Oui : l'equilibre."

### Ecran 8 - quiz - Norme ou Valeur
- Question: "Le respect des horaires en studio est une..."
- Options: "Norme" / "Valeur"
- Reponse: "Norme"
- Feedback: "C'est une regle de comportement."

### Ecran 9 - write - Agent de Socialisation
- Question: "Cite un agent de socialisation secondaire."
- Reponse attendue: "amis"
- Requirements:
  - keywords: ["amis", "reseaux", "ecole"]
  - minWords: 1
- Hint: "Exemple : ton groupe proche."
- Feedback: "Oui. Les amis ou l'ecole influencent."

### Ecran 10 - quiz - Image de Marque
- Question: "L'image de marque, c'est..."
- Options: "Ce que le public pense" / "Le nombre de ventes" / "Le prix"
- Reponse: "Ce que le public pense"
- Feedback: "Exact. C'est la perception."

### Ecran 11 - msg - Strategie Manager
- Texte: "Un bon manager ajuste prix, couts et communication pour garder la confiance."

### Ecran 12 - write - Stock Invendu
- Question: "Si tu as trop de stock invendu, quelle action prends-tu sur le prix ?"
- Reponse attendue: "baisser"
- Requirements:
  - keywords: ["baisser"]
  - minWords: 1
- Hint: "Pour vendre plus, on rend plus accessible."
- Feedback: "Oui. Baisser attire la demande."

### Ecran 13 - quiz - Profit vs CA
- Question: "Le profit correspond a..."
- Options: "CA seulement" / "CA - couts" / "Couts + taxes"
- Reponse: "CA - couts"
- Feedback: "Exact. Le profit tient compte des couts."

### Ecran 14 - write - Confiance Clients
- Question: "Ecris un mot qui relie image et ventes."
- Reponse attendue: "confiance"
- Requirements:
  - keywords: ["confiance", "clients"]
  - minWords: 1
- Hint: "Quand elle est haute, les clients achetent."
- Feedback: "Oui. La confiance fait vendre."

### Ecran 15 - challenge - Audit Final
- Question: "Explique comment un manager peut augmenter le profit sans casser l'image du label."
- Requirements:
  - keywords: ["prix", "couts", "image"]
  - minWords: 6
- Hint: "Parle de prix justes, couts maitrises et confiance."
- Feedback: "Audit valide. Tu relies economie et image."

