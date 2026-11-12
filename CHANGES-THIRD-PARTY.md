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
