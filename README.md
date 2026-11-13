# Pearly Arcade

**Jouer : https://yes-pearly.github.io/pearly-arcade/**

32 jeux disponibles : 31 jeux locaux et Drive Mad intégré depuis le lien fourni, plus 4 courts-métrages libres diffusés depuis Internet Archive. Aucune publicité ajoutée par le portail.

## Catalogue et iPad

- 24 jeux MIT de [mashukui/web-games](https://github.com/mashukui/web-games) : mini-golf, basket, Cross Road, Helix Drop, Fruit Slice, Star Defender, Bubble Shooter, Snake, Block Drop, Breakout, Paddle Duel, Ant Flap, Ant Jump, Water Sort, Gem Match, Air Hockey, bowling, tirs au but, Puissance 4, bataille navale, Sokoban, Sudoku, Mahjong Link et Nonogram.
- Les 7 jeux déjà présents : Mario World 1-1 (amateur), Geometry Dash (fan), Captain Callisto, Hextris, Tower Building, 2048 et Dino.
- 32 nouvelles captures réelles, cadrées sur l’action ou le plateau ; images plus grandes, description sous chaque titre et grille de 3 colonnes sur iPad paysage / 2 en portrait. Recherche, catégories et favoris locaux.
- Détection du tactile, du clavier et de la taille disponible. Touches de déplacement de 92 px sur tablette, boutons d’action de 106 px, joystick avec diagonales et doigts indépendants. Les dispositions téléphone réservent une zone sous le jeu ou utilisent les côtés en paysage.
- Aide → Commandes adaptées : disposition automatique ou manuelle et choix « Très grandes », mémorisés sur l’appareil. Les commandes natives de Drive Mad sont agrandies par la mise à l’échelle du lecteur distant.
- Lecteur adapté aux écrans tactiles. Agrandir dispose d’un repli CSS pour iOS. Le moteur de Tower conserve son viewport lors d’une rotation.
- Jeux existants intégrés avec les adaptations documentées dans CHANGES-THIRD-PARTY.md, sans réécriture de leurs règles.
- Manifest pour l’ajout à l’écran d’accueil. Connexion nécessaire au chargement.

L’ancienne adaptation étudiante de Subway Runner a été retirée. Les versions officielles de Subway Surfers et Hill Climb Racing ne sont pas incluses : aucune version permettant leur republication autonome sans publicité n’a été obtenue. Même limite pour Slope IO, Stickman Climb et Moto X3M. Drive Mad est une intégration distante distincte, décrite ci-dessous. Les adaptations Mario et Geometry Dash sont clairement signalées et ne sont pas les versions officielles.


## Expérience de jeu — 13 novembre 2026

- Nouveau lecteur plein écran utile : pause réelle, son mémorisé, aide, reprise et confirmation avant de recommencer.
- Suspension conjointe de l’animation, des temporisations, de l’horloge de jeu et de l’audio pour les 31 jeux locaux ; aucune reprise automatique au retour d’un onglet caché.
- Interfaces des jeux harmonisées, scores plus lisibles, commandes plus grandes, plateaux et terrains agrandis en portrait et en paysage.
- Geometry Dash : simulation à 60 Hz indépendamment du taux de rafraîchissement, rendu Retina, scène stable pendant une rotation.
- Hextris : détection iPadOS tactile ; Dino : cadrage centré et mise à l’échelle corrigée ; Mario : capture des pointeurs et zone de commandes réservée ; 2048 : interface française et géométrie des tuiles conservée.
- Callisto et Tower : lancement direct après les instructions du portail. Callisto conserve son moteur 3D et Tower son viewport stable.
- Mini Golf, Basket Shot, Helix Drop, Bubble Shooter et Fruit Slice : contraste, matières ou résolution repris. Les autres jeux bénéficient du lecteur, des interfaces et du cadrage communs ; leurs moteurs et leurs règles restent ceux de leurs auteurs.
- Les captures sont prises dans les jeux, sans images générées pour leur faire passer une apparence différente.

### Drive Mad

Intégration de [la version fournie](https://ducky443747.github.io/games/DriveMad/) dans une iframe. Jeu de Martin Magni / Fancade : aucun fichier du runtime ou des données n’est recopié dans ce dépôt, aucune licence MIT n’est attribuée à ce jeu. Le portail interdit à cette iframe d’ouvrir des fenêtres ou de naviguer dans la page principale. Le premier niveau et le passage au suivant ont été testés sans publicité affichée.

Drive Mad conserve son menu de pause et ses réglages audio. Le lecteur ne prétend pas contrôler un moteur situé sur une autre origine. Connexion à son hébergeur nécessaire ; sa disponibilité et son contenu restent sous le contrôle de cet hébergeur.

### Vérifications

Les 31 jeux locaux ont été lancés dans l’aperçu aux dimensions iPad (1024×768 et 768×1024), puis les cadrages problématiques ont été repris. Pause/reprise, commandes tactiles représentatives et le vrai Drive Mad sont vérifiés dans le navigateur. Ces contrôles ne remplacent pas un essai sur un iPad physique.

`node tests/controls.cjs` vérifie les profils tablette/téléphone/clavier, les diagonales et le relâchement indépendant des doigts.

`node tests/runtime.cjs` vérifie la suspension et la reprise des horloges/temporisations, ainsi que le nombre de pas de la boucle réelle de Geometry Dash à 60 et 120 Hz.

## Cinéma

Big Buck Bunny (10 min), Sintel (15 min), Elephants Dream (11 min) et Tears of Steel (12 min). Films intégraux avec génériques, lecture native en ligne, sans publicité ajoutée. Les langues sont indiquées dans le catalogue. Les vidéos restent hébergées par Internet Archive et peuvent être indisponibles si ce service ne répond pas ou est inaccessible sur le réseau utilisé. Un lien vers la copie autorisée est proposé en cas d’échec.

Blender Foundation et les auteurs conservent leurs droits. Elephants Dream est sous CC BY 2.5 ; les trois autres sous CC BY 3.0. Les sources officielles, copies et attributions figurent dans films.json et credits.html. Les images proviennent des projets officiels Blender Studio ; les films ne sont pas modifiés.

## Droits et provenance

Chaque jeu conserve sa licence dans games/. SOURCES.json enregistre les dépôts et commits. Le portail et touch-controls.js sont sous MIT. Hextris et les sources de cette copie restent sous GPL-3.0-or-later. Les captures des jeux sont soumises aux droits de leurs auteurs respectifs.

Le site ne garantit pas l’accès sur les appareils ou réseaux gérés d’un établissement.

## Développement et publication

GitHub Pages : Settings → Pages → Deploy from a branch → main → / (root).

`python3 -m http.server 8080`

Aucun build ni paquet nécessaire. Les jeux et les flux vidéo sont chargés à la demande.
