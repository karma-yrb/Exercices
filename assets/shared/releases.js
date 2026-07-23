// Release notes data — keep in sync with CHANGELOG.md and APP_VERSION.
window.APP_RELEASES = [
    {
        version: '2.6.0',
        date: '2026-07-23',
        summary: 'Lovyc Français : Modules 3 (phrase complexe) et 4 (argumentation / compte-rendu).',
        modules: [
            {
                id: 'lovyc-fr',
                label: 'Lovyc — Français',
                changes: [
                    'Module 3 : coordination, subordination, cause/conséquence, connecteurs, synthèse (5 missions).',
                    'Module 4 : thèse, argument/exemple, jugement nuancé, compte-rendu, boss synthèse (5 missions).',
                    'Hub Lovyc : cartes M3/M4 + verrouillage en chaîne ; clés lovyc_fr_w3_v1, lovyc_fr_w4_v1.',
                    'Générateur HTML FR : tools/workflow/build-fr-module-html.js.'
                ]
            },
            {
                id: 'produit',
                label: 'Produit / Portail',
                changes: [
                    'Version produit 2.6.0.'
                ]
            }
        ]
    },
    {
        version: '2.5.0',
        date: '2026-07-22',
        summary: 'Baseline de versioning produit : numéro unique, notes de version par module, affichage permanent sur le site.',
        modules: [
            {
                id: 'produit',
                label: 'Produit / Portail',
                changes: [
                    'Version produit unique 2.5.0 (package.json + assets/shared/version.js).',
                    'Page Notes de version avec historique par module.',
                    'Affichage permanent de la version (footer hub ou badge discret sur les pages exercice).',
                    'Registre storage-keys.js + validateur de cohérence hubs ↔ modules.',
                    'Règle release / tags documentée dans WORKFLOW_GIT.md.'
                ]
            },
            {
                id: 'lovyc-fr',
                label: 'Lovyc — Français',
                changes: [
                    'Modules 0, 1 et 2 en place (clés lovyc_fr_w0_v1, w1_v2, w2_v2).',
                    'Hubs branchés sur le registre de clés.'
                ]
            },
            {
                id: 'zyvah-maths',
                label: 'Zyvah — Maths',
                changes: [
                    'Modules 0 à 3 en place (clés zyvah_maths_wN_v1).',
                    'Fix : hubs parents lisaient zyvah_maths_w1_v2 alors que le module écrit _v1 — alignés.'
                ]
            },
            {
                id: 'zyvah-ses',
                label: 'Zyvah — SES',
                changes: [
                    'Modules 0 et 1 en place (clés zyvah_ses_w0_v1, w1_v2).',
                    'Hubs branchés sur le registre de clés.'
                ]
            }
        ]
    }
];
