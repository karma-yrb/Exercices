# Exercices d'Apprentissage Interactifs

Portail d'exercices personnalisés pour enfants.

## ���️ Guide de Création
Tous les nouveaux exercices doivent respecter les normes définies par l'**Architecte Pédago-Web**.
Les instructions de configuration sont situées dans `.github/agents/ARCHITECTE_PEDAGO_WEB.md`.

## Source de verite des modules
Les fichiers dans `docs/modules/` sont la reference officielle (1 fichier `.md` par module).
Ils decrivent le deroule ecran par ecran (textes, options, reponses, feedbacks).

Regle: Toute modification de contenu doit d'abord mettre a jour le draft `.md`, puis le HTML.

## Navigation standard (tous profils)
- Interdit: tout lien vers `../Exercices/`.
- Retour Hub:
	- Lovyc -> `../Lovyc/index.html`
	- Zyvah -> `../Zyvah/index.html`

## Mini-module Initiation (Module_0)
- Utilise un Module_0 (1 mission) avant le Module_1 si besoin.
- Verrouille Module_1 avec `PREREQUISITE_KEY` sur le storage du Module_0.
- Draft: `Missions:` et `ScreensPerMission:` dans la section Meta.

## Governance baseline
- Public reproducible governance lives in `docs/governance/`.
- Local private governance may remain in ignored `.github/*` files.
- Use this split to keep audits reproducible without exposing family-private context.

---
*Ce projet utilise des Micro-Apps SPA en Vanilla JS.*

[ci-check-trigger] temporary branch to expose required status checks.
