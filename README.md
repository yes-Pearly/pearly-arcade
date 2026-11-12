# Pearly Arcade

**Jouer : https://yes-pearly.github.io/pearly-arcade/**

8 jeux existants hébergés dans ce dépôt, sans publicité, avec un catalogue tactile et un lecteur adapté au mobile.

| Jeu | Version | Source |
| --- | --- | --- |
| Mario · World 1-1 | Adaptation amateur | https://github.com/INONONO66/fable-5.1-mario |
| Geometry Dash · fan | Adaptation amateur | https://github.com/anaygoenka/GeometryDash |
| Captain Callisto | Jeu libre existant | https://github.com/codyebberson/js13k-callisto |
| Subway Runner · fan | Adaptation amateur | https://github.com/AdityaJainPansari/Subway_Surfer_WebGL |
| Hextris | Jeu libre existant | https://github.com/Hextris/hextris |
| Tower Building | Jeu libre existant | https://github.com/iamkun/tower_game |
| 2048 | Jeu libre existant | https://github.com/gabrielecirulli/2048 |
| Dino | Jeu libre existant | https://github.com/wayou/t-rex-runner |

## Mobile

- Commandes d’au moins 44 px, filtres, recherche et favoris locaux.
- Lecteur qui s’adapte aux modes portrait et paysage ; mode Agrandir compatible iOS via un repli CSS.
- Contrôles tactiles ajoutés à Captain Callisto et au port étudiant Subway Runner, avec gestion des appuis simultanés et des annulations.
- Les moteurs et les règles des jeux restent ceux de leurs auteurs. Les modifications d’intégration sont documentées dans CHANGES-THIRD-PARTY.md.
- Manifest pour l’ajout à l’écran d’accueil. Connexion nécessaire au chargement ; aucun mode hors ligne promis.

## Droits et provenance

Les fichiers de licence et README des auteurs sont conservés dans chaque dossier games/. SOURCES.json enregistre les dépôts et commits des nouveaux jeux. Le portail et touch-controls.js sont sous licence MIT ; les jeux conservent chacun leur propre licence. Les sources de la copie Hextris sont publiées ici sous GPL-3.0-or-later.

Mario World 1-1, Geometry Dash fan et Subway Runner fan sont des adaptations amateurs distinctes des versions officielles Nintendo, RobTop et SYBO. Drive Mad, Slope IO, Stickman Climb et Moto X3M ne sont pas inclus : aucune version originale avec des droits adaptés à une republication autonome sans publicité n’a été identifiée.

Le site ne garantit pas l’accès sur les appareils ou réseaux gérés d’un établissement. Aucune technique de contournement n’est incluse.

## Publication et développement

GitHub Pages : Settings → Pages → Deploy from a branch → main → / (root).

`python3 -m http.server 8080`

Aucun build ni paquet nécessaire. Les jeux sont chargés uniquement à la demande du joueur.
