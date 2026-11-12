# Pearly Arcade

Portail public de jeux originaux open source, sans publicité.

**Jouer : https://yes-pearly.github.io/pearly-arcade/**

| Jeu | Source originale | Licence |
| --- | --- | --- |
| 2048 | https://github.com/gabrielecirulli/2048 | MIT, conservée dans games/2048/LICENSE.txt |
| Dino / T-Rex Runner | https://github.com/wayou/t-rex-runner | BSD-3-Clause, conservée dans games/dino/LICENSE |

Ces deux jeux sont également disponibles sur Poki : [2048](https://poki.com/fr/g/2048), [Dino](https://poki.com/en/g/dinosaur-game). Leurs moteurs et graphismes ne sont pas recodés. Les fichiers sont servis localement par GitHub Pages : aucune iframe externe, publicité ou télémétrie.

## Modifications aux jeux

- 2048 : remplacement du paragraphe qui affirmait être le site officiel par une attribution de la copie indépendante.
- Dino : suppression du chargement de Google Fonts, titre et aide adaptés au tactile ; moteur inchangé.
- Sources téléchargées le 12 novembre 2026. Archives upstream documentées dans SOURCES.json.

## Publication

Settings → Pages → Deploy from a branch → main → / (root).

## Limites

Moto X3M, Basketball Stars et les autres jeux propriétaires ne sont pas inclus : les droits et les fichiers nécessaires ne sont pas disponibles pour ce projet. Ce portail ne garantit pas l’accès sur les appareils et réseaux gérés par un établissement. Il est indépendant de Poki et ne contient pas son catalogue complet.

## Développement local

`python3 -m http.server 8080`

Ouvrir http://localhost:8080. Aucun paquet ni compilation nécessaires.
