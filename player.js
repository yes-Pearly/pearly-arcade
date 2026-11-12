const games = {
  "2048": {title:"2048",path:"games/2048/",hint:"Sur tablette : fais glisser les tuiles. Au clavier : utilise les flèches. Deux nombres identiques fusionnent. Créé par Gabriele Cirulli · licence MIT."},
  "dino": {title:"Dino",path:"games/dino/",hint:"Sur tablette : touche la zone du jeu pour commencer et sauter. Au clavier : Espace ou ↑ pour sauter, ↓ pour se baisser. Chromium Authors · port par wayou · licence BSD."}
};
const key = new URLSearchParams(location.search).get("game");
const game = games[key];
const shell = document.getElementById("shell");
if (game) {
  document.title = game.title + " — Pearly Arcade";
  document.getElementById("title").textContent = game.title;
  document.getElementById("hint").textContent = game.hint;
  document.getElementById("empty").remove();
  shell.dataset.game = key;
  const frame = document.createElement("iframe");
  frame.src = game.path;
  frame.title = game.title + " — jeu original";
  frame.setAttribute("allow", "fullscreen");
  frame.setAttribute("allowfullscreen", "");
  shell.appendChild(frame);
  const direct = document.getElementById("direct");
  direct.href = game.path;
  direct.hidden = false;
  const full = document.getElementById("fullscreen");
  full.hidden = false;
  full.addEventListener("click", async () => {
    if (shell.requestFullscreen) {
      try {await shell.requestFullscreen(); return;} catch (_) {}
    }
    shell.classList.add("expanded");
    document.getElementById("exit").focus();
  });
  document.getElementById("exit").addEventListener("click", () => {shell.classList.remove("expanded");full.focus();});
  document.addEventListener("keydown", event => {if(event.key === "Escape") shell.classList.remove("expanded");});
}
