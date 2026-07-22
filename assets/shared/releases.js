// Release notes data — keep in sync with CHANGELOG.md and APP_VERSION.
window.APP_RELEASES = [
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
