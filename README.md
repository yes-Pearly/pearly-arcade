# Pearly Arcade

**Jouer : https://yes-pearly.github.io/pearly-arcade/**

31 jeux existants hébergés dans ce dépôt, sans publicité, et 4 courts-métrages libres diffusés depuis Internet Archive.

## Catalogue et iPad

- 24 jeux MIT de [mashukui/web-games](https://github.com/mashukui/web-games) : mini-golf, basket, Cross Road, Helix Drop, Fruit Slice, Star Defender, Bubble Shooter, Snake, Block Drop, Breakout, Paddle Duel, Ant Flap, Ant Jump, Water Sort, Gem Match, Air Hockey, bowling, tirs au but, Puissance 4, bataille navale, Sokoban, Sudoku, Mahjong Link et Nonogram.
- Les 7 jeux déjà présents : Mario World 1-1 (amateur), Geometry Dash (fan), Captain Callisto, Hextris, Tower Building, 2048 et Dino.
- Vraies captures de chaque jeu, optimisées en JPEG ; grille adaptée au portrait et au paysage, recherche, catégories et favoris locaux.
- Lecteur adapté aux écrans tactiles. Agrandir dispose d’un repli CSS pour iOS. Le moteur de Tower conserve son viewport lors d’une rotation.
- Sources de jeux reprises telles quelles ; seules les intégrations documentées dans CHANGES-THIRD-PARTY.md sont modifiées.
- Manifest pour l’ajout à l’écran d’accueil. Connexion nécessaire au chargement.

L’ancienne adaptation étudiante de Subway Runner a été retirée. Les versions officielles de Subway Surfers et Hill Climb Racing ne sont pas incluses : aucune version permettant leur republication autonome sans publicité n’a été obtenue. Même limite pour Drive Mad, Slope IO, Stickman Climb et Moto X3M. Les adaptations Mario et Geometry Dash sont clairement signalées et ne sont pas les versions officielles.

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
