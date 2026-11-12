const id=new URLSearchParams(location.search).get('film');
const video=document.getElementById('film-video');
const play=document.getElementById('play-film');
const panel=document.getElementById('movie-launch');
const error=document.getElementById('video-error');
let film=null;
const stage=document.querySelector('.cinema-stage');
const loading=document.createElement('p');loading.className='movie-loading';loading.setAttribute('role','status');loading.textContent='Chargement du film…';loading.hidden=true;stage.appendChild(loading);
document.querySelector('[data-nav="films"]').setAttribute('aria-current','page');
fetch('films.json?v=3').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
 film=data.find(f=>f.id===id);if(!film)throw Error('missing');
 document.title=film.title+' — Pearly Arcade';
 document.getElementById('film-title').textContent=film.title;
 document.getElementById('film-meta').textContent=film.duration+' · '+film.tag;
 document.getElementById('film-desc').textContent=film.desc;
 document.getElementById('film-language').textContent=film.note;
 document.getElementById('film-credit').textContent=film.credit;
 document.getElementById('film-source').href=film.source;
 document.getElementById('film-license').href=film.licenseUrl;document.getElementById('film-license').textContent='Licence '+film.license+' ↗';
 document.getElementById('external-film').href=film.archive;
 video.poster=film.poster;play.disabled=false;
}).catch(()=>{document.getElementById('film-title').textContent='Film indisponible';panel.innerHTML='<p>Ce film n’a pas pu être trouvé. <a href="films.html">Retour au cinéma</a>.</p>';});
play.addEventListener('click',async()=>{
 if(!film)return;error.hidden=true;video.src=film.url;panel.hidden=true;loading.hidden=false;stage.dataset.status='loading';
 try{await video.play();}catch(e){if(e.name!=='AbortError'){loading.hidden=true;stage.dataset.status='error';panel.hidden=false;play.textContent='Réessayer la lecture';error.hidden=false;}}
});
video.addEventListener('playing',()=>{loading.hidden=true;stage.dataset.status='playing';});
video.addEventListener('waiting',()=>{if(!video.paused)loading.hidden=false;});
video.addEventListener('pause',()=>{loading.hidden=true;stage.dataset.status='paused';});
video.addEventListener('ended',()=>{loading.hidden=true;stage.dataset.status='ended';});
video.addEventListener('error',()=>{loading.hidden=true;stage.dataset.status='error';error.hidden=false;panel.hidden=false;play.textContent='Réessayer la lecture';});
