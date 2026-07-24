# Demande Prof FR — réponses ouvertes (fill-blank)

**Date :** 2026-07-24  
**Destinataire :** Prof Français 4e (`PROF_FRANCAIS_4E`)  
**Statut :** ✅ **Retour Prof reçu** (2026-07-24)

**Contexte :** Les exercices « trou » / « écris seulement le … » sont trop restrictifs. En langue, plusieurs réponses cohérentes doivent passer.

**Technique :** le validateur FR accepte déjà `keywords` en **OU**. Modèle ouvert déjà en prod : « Ajoute le complément » (`minWords: 2`, sans keywords).

---

## Verdict Prof FR — réponses ouvertes fill-blank

**Niveau :** 4e OK | **Thème Lovyc :** OK

### 1. Compléter le complément — `L'agent surveille ____.`

**Option retenue : A** (ouvrir, sans whitelist)

**Raison :** « surveiller » admet une infinité de COD crédibles. Une whitelist bride inutilement ; valider sur la forme (complément non vide) plutôt qu’une liste fermée.

**Exemples élèves (seulement le complément) :**
1. la zone
2. la map
3. le couloir de gauche
4. l'entrée de la base
5. les mouvements ennemis
6. le drone adverse
7. le point de spawn
8. la squad rivale
9. le périmètre
10. les écrans de contrôle

**Validation :** aucun `keywords`, `minWords: 2` recommandé (vrai GN ; refuser vide/ponctuation).  
**hint3 :** Réponds seulement par ce que l'agent surveille : un lieu, une personne ou un objet de la map (ex. « la zone », « le couloir de gauche »).

---

### 2. Compléter le verbe — `Lovyc ____ son écran de jeu.`

**keywords (présent, 3e sing.) :**
1. regarde
2. allume
3. fixe
4. nettoie
5. prépare
6. observe
7. éteint
8. règle
9. scrute
10. configure
11. inspecte

**hint3 :** Un seul verbe au présent, 3e personne du singulier (il/elle), qui finit souvent par -e (ex. « allume », « règle »).

---

### 3. Accord Cache — `Les joueurs ____ la finale ce soir.`

**Option retenue : A** (élargir ; cible = accord pluriel `-ent`)

**Raison :** garder la langue ouverte entraîne mieux l’accord qu’un verbe imposé. Tous les verbes finissent par `-ent`.

**keywords :**
1. gagnent
2. jouent
3. disputent
4. attendent
5. préparent
6. remportent
7. affrontent
8. visent
9. dominent
10. abordent
11. redoutent

**Idéal CTP :** valider par terminaison `-ent` si le moteur le permet ; sinon fallback sur cette liste.  
**hint3 :** Le sujet est pluriel (« Les joueurs ») : le verbe au présent doit finir par -ent (ex. « jouent », « gagnent »).

---

### 4. Codage de Dialogue

**Incises exemples :**
1. cria Lovyc
2. prévint l'agent
3. chuchota la squad leader
4. lança Lovyc à sa squad
5. avertit le drone-pilote
6. hurla l'agent dans le micro
7. souffla Lovyc, tendu
8. ordonna la capitaine
9. répondit l'agent posté au fond
10. signala Lovyc sur la map

**keywords tokens :**
- verbes : cria, prévint, chuchota, lança, avertit, hurla, souffla, ordonna, répondit, signala, dit, murmura, s'exclama
- personnages : lovyc, agent, squad, capitaine, drone, leader, coéquipier, sniper

**hint3 :** Après la réplique, ajoute une incise = verbe de parole + qui parle (ex. « cria Lovyc », « prévint l'agent »).

---

### 5. Incise Courte

**Formes / exemples :**
1. dit l'agent
2. répondit Lovyc
3. murmura la squad leader
4. hurla l'agent
5. lança Lovyc
6. souffla le sniper
7. cria la capitaine
8. chuchota l'agent
9. ajouta Lovyc
10. prévint le coéquipier

**keywords tokens :**
- verbes : dit, répondit, murmura, hurla, cria, lança, souffla, chuchota, ajouta, prévint, s'exclama, répliqua
- personnages : agent, lovyc, squad, leader, capitaine, sniper, coéquipier, drone

**hint3 :** Une incise courte = un verbe de parole suivi de qui parle (ex. « dit l'agent », « murmura Lovyc »).

---

## Recommandations Prof → CTP / Architecte

- Cas 1 : `minWords: 2`, pas de keywords ; aligner sur « Ajoute le complément ».
- Cas 3 : idéalement règle `-ent` ; sinon keywords listés (tous en `-ent`).
- Cas 2 : mode `verb`, keywords OU (formes exactes).
- Cas 4–5 : keywords = verbes ∪ personnages ; idéalement exiger 1 verbe + 1 personnage (`keywordGroups`).
- Mettre à jour les `hint3` (plusieurs exemples, pas « la » solution unique).
- Sync : drafts `docs/modules/lovyc_fr_module_1.md` / `_2.md` puis HTML.

---

## Checklist

- [x] Cas 1 — option A + 10 exemples  
- [x] Cas 2 — 11 verbes  
- [x] Cas 3 — option A + 11 verbes `-ent`  
- [x] Cas 4 — 10 incises + tokens  
- [x] Cas 5 — 10 formes + tokens  
- [x] Niveau 4e + thème Lovyc OK  
- [x] Implémentation keywords / ouverture + sync draft/HTML (2026-07-24)
