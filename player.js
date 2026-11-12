const key=new URLSearchParams(location.search).get('game');
const shell=document.getElementById('shell');
const layout=document.getElementById('play-layout');
const full=document.getElementById('fullscreen');
const launch=document.getElementById('launch');
const reload=document.getElementById('reload');
const panel=document.getElementById('launch-panel');
const loading=document.getElementById('loading');
let frame=null,game=null,focus=false,stageObserver=null;
function showError(text){const e=document.getElementById('error');e.textContent=text;e.hidden=false;loading.hidden=true;}
function updateFocus(value){focus=value;document.body.classList.toggle('focus-mode',value);full.setAttribute('aria-pressed',String(value));full.setAttribute('aria-label',value?'Réduire le jeu':'Agrandir le jeu');full.querySelector('span').textContent=value?'Réduire':'Agrandir';}
full.addEventListener('click',async()=>{
  if(focus){if(document.fullscreenElement){try{await document.exitFullscreen();}catch(_){}}updateFocus(false);return;}
  updateFocus(true);
  if(layout.requestFullscreen){try{await layout.requestFullscreen();}catch(_){}}
});
document.addEventListener('fullscreenchange',()=>updateFocus(Boolean(document.fullscreenElement)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.fullscreenElement)updateFocus(false);});
function start(){
  if(!game)return;
  if(game.id==='callisto'){
    const test=document.createElement('canvas');
    if(!test.getContext('webgl2')){showError('Ce navigateur ne prend pas en charge WebGL 2, nécessaire pour Captain Callisto. Les autres jeux restent disponibles.');return;}
  }
  document.getElementById('error').hidden=true;
  panel.hidden=true;loading.hidden=false;
  if(stageObserver){stageObserver.disconnect();stageObserver=null;}
  if(frame)frame.remove();
  frame=document.createElement('iframe');frame.title=game.title+' — jeu';frame.src=game.path+'?v=3&lang=fr';
  frame.setAttribute('allow','fullscreen; autoplay; gamepad');frame.setAttribute('allowfullscreen','');
  frame.addEventListener('load',()=>{loading.hidden=true;reload.disabled=false;try{frame.contentWindow.focus();}catch(_){}});
  frame.addEventListener('error',()=>showError('Le jeu n’a pas pu être chargé. Touche Recharger pour réessayer.'));
  shell.appendChild(frame);
  if(game.id==='tower'){
    frame.style.cssText='position:absolute;left:50%;top:50%;width:360px;height:640px;max-width:none;transform-origin:center;';
    const fit=()=>{const scale=Math.min(shell.clientWidth/360,shell.clientHeight/640);frame.style.transform='translate(-50%,-50%) scale('+scale+')';};
    stageObserver=new ResizeObserver(fit);stageObserver.observe(shell);fit();
  }
  window.scrollTo(0,0);
  try{localStorage.setItem('pearly-last',game.id);}catch(_){}
  if(matchMedia('(pointer:coarse),(max-width:700px),(max-height:500px)').matches)document.getElementById('help').open=false;
}
launch.addEventListener('click',start);
reload.addEventListener('click',start);
fetch('games.json?v=3').then(r=>{if(!r.ok)throw Error();return r.json();}).then(games=>{
  game=games.find(g=>g.id===key);
  if(!game){document.getElementById('title').textContent='Jeu introuvable';document.getElementById('launch-title').textContent='Ce jeu n’est pas disponible.';document.getElementById('launch-desc').textContent='Reviens au catalogue pour choisir un jeu.';return;}
  document.title=game.title+' — Pearly Arcade';
  document.getElementById('title').textContent=game.title;
  document.getElementById('game-type').textContent=game.adaptation?'Adaptation amateur · sans publicité':game.tag+' · sans publicité';
  document.getElementById('launch-title').textContent=game.title;
  document.getElementById('launch-desc').textContent=game.desc;
  document.getElementById('launch-photo').src=game.thumb;document.getElementById('launch-photo').alt='Capture de '+game.title;
  document.getElementById('launch-caption').textContent=game.orientation==='landscape'?'Paysage conseillé · commandes tactiles':'Écran tactile · aucune installation';
  document.getElementById('hint').textContent=game.hint;
  document.getElementById('author').textContent=game.author+' · '+game.license;
  document.getElementById('source').href=game.source;
  document.getElementById('license').href=game.path+game.licensePath;
  const direct=document.getElementById('direct');direct.href=game.path;direct.hidden=false;
  document.getElementById('orientation').hidden=game.orientation!=='landscape';
  shell.dataset.orientation=game.orientation;
  shell.dataset.game=game.id;
  launch.hidden=false;
}).catch(()=>{document.getElementById('launch-title').textContent='Chargement impossible';showError('Vérifie ta connexion puis recharge cette page.');});
