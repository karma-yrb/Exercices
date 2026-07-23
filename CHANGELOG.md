# Changelog

Toutes les versions notables de ce portail d'apprentissage.

Le numéro de version produit (`package.json` / `assets/shared/version.js`) est **indépendant** des révisions de stockage module (`STORAGE_KEY` …`_vK`).

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnement sémantique.

## [2.6.0] — 2026-07-23

Lovyc Français : Modules 3 (phrase complexe) et 4 (argumentation / compte-rendu).

### Lovyc — Français
- **Module 3** : coordination, subordination, cause/conséquence, connecteurs logiques, synthèse (5 missions).
- **Module 4** : thèse, argument/exemple, jugement nuancé, structure de compte-rendu, boss synthèse (5 missions).
- Hub Lovyc : cartes M3/M4 + verrouillage en chaîne ; clés `lovyc_fr_w3_v1`, `lovyc_fr_w4_v1`.
- Générateur HTML FR : `tools/workflow/build-fr-module-html.js`.

### Produit / Portail
- Version produit `2.6.0`.

## [2.5.0] — 2026-07-22

Baseline de versioning produit : numéro unique, notes de version par module, affichage permanent sur le site.

### Produit / Portail
- Version produit unique `2.5.0` (`package.json` + `assets/shared/version.js`).
- Page Notes de version avec historique par module.
- Affichage permanent de la version (footer hub ou badge discret sur les pages exercice).
- Registre `assets/shared/storage-keys.js` + validateur de cohérence hubs ↔ modules.
- Règle release / tags documentée dans `.github/WORKFLOW_GIT.md`.

### Lovyc — Français
- Modules 0, 1 et 2 en place (`lovyc_fr_w0_v1`, `w1_v2`, `w2_v2`).
- Hubs branchés sur le registre de clés.

### Zyvah — Maths
- Modules 0 à 3 en place (`zyvah_maths_wN_v1`).
- **Fix** : hubs parents lisaient `zyvah_maths_w1_v2` alors que le module écrit `_v1` — alignés.

### Zyvah — SES
- Modules 0 et 1 en place (`zyvah_ses_w0_v1`, `w1_v2`).
- Hubs branchés sur le registre de clés.
