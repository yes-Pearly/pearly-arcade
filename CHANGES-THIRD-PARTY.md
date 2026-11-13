# Intégration des jeux — 12 novembre 2026

Les jeux sont repris depuis leurs dépôts existants. Sources et commits exacts dans SOURCES.json. Les licences et README upstream sont conservés dans chaque dossier.

- Mario World 1-1 : adaptation amateur sous MIT pour le code original, mention Nintendo dans le README conservée. Mise à l’échelle du canvas et taille des commandes tactiles ajustées. Aucun asset Nintendo extrait n’est ajouté.
- Geometry Dash fan : fichiers upstream conservés ; il ne s’agit pas du jeu officiel RobTop.
- Captain Callisto : sources assemblées dans l’ordre du build upstream ; buffers de shadow/bloom réduits à 1024/256. Ajout d’une couche de commandes tactiles, sans réécriture du gameplay. Tous les fichiers sources upstream src/ sont disponibles.
- Subway Runner fan : adaptation étudiante MIT ; styles du viewport et commandes tactiles ajoutés, rejets de lecture audio automatique gérés.
- Hextris, GPL-3.0-or-later : scripts publicitaires, analytics, chargement distant de a.js et envoi du score supprimés dans index.html, js/initialization.js et js/main.js. Partage social et badges d’apps masqués dans la copie. Modifications datées dans les fichiers concernés. Sources complètes de cette copie publiées dans ce dépôt, sous la licence d’origine.
- Tower Building : viewport stable 360 × 640 mis à l’échelle par le lecteur pour conserver la partie lors d’une rotation ; script Google Analytics retiré, reste du moteur upstream conservé, y compris son bundle et ses sources.
- Tous les jeux : politique CSP locale ajoutée, interdisant le chargement de scripts ou médias externes. Les liens des crédits restent accessibles à la demande.

Les nouveaux fichiers de portail et touch-controls.js sont sous licence MIT. Chaque jeu conserve sa licence propre : aucune relicence du code tiers.


## Mise à jour du catalogue iPad — 12 novembre 2026

- Retrait de tous les fichiers de l’adaptation étudiante Subway Runner et de son entrée catalogue.
- 24 jeux existants du dépôt MIT mashukui/web-games (commit dans SOURCES.json) : index.html et i18n.js conservés, politique CSP locale ajoutée, liens de promotion de pied de page remplacés par le crédit auteur MIT. La barre de langue et de son reste active ; les moteurs ne sont pas réécrits.
- Captures réelles prises dans chaque jeu puis redimensionnées/compressées en JPEG pour le catalogue. Aucune image de jeu générée.
- Tower Building : suppression du lancement automatique de la musique avant toute interaction ; le bouton de départ garde le lancement du son.
- Quatre courts-métrages Blender diffusés intégralement depuis Internet Archive avec le générique ; aucun changement vidéo. Visuels issus des images des projets officiels Blender Studio, redimensionnés en JPEG. Attribution, licence et sources dans films.json et credits.html. Elephants Dream : CC BY 2.5 ; autres films : CC BY 3.0.


## Expérience de jeu — 13 novembre 2026

- Tous les 31 jeux locaux : chargement de game-kit.js et game-kit.css avant le moteur. Adaptateur de temporisations/horloges/animation et gain audio maître pour pause et son communs. Origine et fenêtre des messages vérifiées. Aucun nouveau script distant dans les jeux locaux.
- mashukui/web-games : interfaces, palettes, tailles tactiles et cadrages repris ; résolution Retina ajoutée à Helix Drop et Bubble Shooter et DPR plafonné à 2 pour les autres moteurs. Matières et contraste de Mini Golf, Basket Shot, Helix Drop, Fruit Slice et Bubble Shooter repris sans changer collisions et règles.
- Geometry Dash : scène logique 960×540, buffer Retina et conversion des coordonnées tactiles ; suppression de la reconstruction des niveaux lors d’une rotation ; simulation fixe à 60 Hz. Traductions de menus et lueur réduite.
- Mario : capture des pointeurs, gestion de lostpointercapture, zone tactile réservée et suppression de la pause involontaire en touchant le terrain pendant une partie.
- Hextris (GPL-3.0-or-later) : détection tactile incluant iPadOS et traduction du départ. Les sources de cette copie modifiée restent publiées sous la licence d’origine.
- Dino : transformation et positionnement en pixels CSS, largeur du terrain et reprise sans double boucle d’animation corrigées.
- 2048 : interface française et nouvel habillage. Toute la géométrie 500px est mise à l’échelle ensemble, positions des tuiles incluses, sans changement des règles ni du stockage.
- Captain Callisto : instructions et police reprises, diagramme clavier retiré sur tablette, entrée directe dans le premier niveau après les instructions du portail. Source du hook conservée dans src/pearly-entry.js.
- Tower : écrans HTML de départ et de résultat repris en français, actions WeChat inadaptées retirées, lancement intégré après le chargement.
- Drive Mad : seule intégration distante, à l’URL fournie par l’utilisateur. Aucun code ou fichier WASM/data du jeu n’est ajouté. Ses commandes internes de pause et de son sont conservées. Capture réelle et attribution Martin Magni/Fancade.
