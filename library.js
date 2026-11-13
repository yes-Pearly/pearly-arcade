const view=document.body.dataset.view;
const isFilm=view==='films';
const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const heart='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.9a5.3 5.3 0 0 0 0-7.5Z"/></svg>';
const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 9 7-9 7Z"/></svg>';
const cards=document.getElementById('cards'),search=document.getElementById('search'),filterRow=document.getElementById('filters');
let items=[],category='Tout',favorites=[];
try{favorites=JSON.parse(localStorage.getItem('pearly-favorites')||'[]');if(!Array.isArray(favorites))favorites=[];}catch(_){}
const linkFor=g=>isFilm?'watch.html?film='+g.id:'play.html?game='+g.id;
const photoFor=g=>isFilm?g.poster:g.thumb;
function photo(g,large=false){const box=document.createElement('div');box.className='photo';box.style.setProperty('--photo','url("'+photoFor(g)+'")');const img=new Image();img.src=photoFor(g);img.alt=(isFilm?'Image du film ':'Capture du jeu ')+g.title;img.loading=large?'eager':'lazy';img.decoding='async';box.appendChild(img);return box;}
function choose(value){category=value;for(const b of filterRow.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.textContent===value));render();}
function render(){
 cards.replaceChildren();const q=normal(search.value.trim());
 const visible=items.filter(g=>(category==='Tout'||(category==='Mes favoris'&&favorites.includes(g.id))||g.tag===category)&&normal(g.title+' '+g.tag+' '+g.desc).includes(q));
 document.getElementById('result-count').textContent=visible.length+' '+(isFilm?'film'+(visible.length===1?'':'s'):'jeu'+(visible.length===1?'':'x'));
 document.getElementById('empty').hidden=visible.length!==0;
 for(const g of visible){
  const card=document.createElement('article');card.className='game-card';
  const a=document.createElement('a');a.href=linkFor(g);a.className='card-link';
  const picture=photo(g);const overlay=document.createElement('span');overlay.className='photo-action';overlay.innerHTML=arrow;picture.appendChild(overlay);
  const badge=document.createElement('span');badge.className='photo-label';badge.textContent=isFilm?g.duration:(g.external?'Hébergé ailleurs':g.adaptation?'Adaptation amateur':'');if(badge.textContent)picture.appendChild(badge);
  const body=document.createElement('div');body.className='card-copy';
  const title=document.createElement('h3');title.textContent=g.title;
  const meta=document.createElement('p');meta.textContent=isFilm?g.tag:g.tag+' · Tactile';
  body.append(title,meta);a.append(picture,body);card.appendChild(a);
  if(!isFilm){const f=document.createElement('button');f.className='favorite';f.innerHTML=heart;f.setAttribute('aria-label',(favorites.includes(g.id)?'Retirer des favoris : ':'Ajouter aux favoris : ')+g.title);f.setAttribute('aria-pressed',String(favorites.includes(g.id)));f.onclick=()=>{favorites=favorites.includes(g.id)?favorites.filter(x=>x!==g.id):[...favorites,g.id];try{localStorage.setItem('pearly-favorites',JSON.stringify(favorites));}catch(_){}render();};card.appendChild(f);}
  cards.appendChild(card);
 }
}
function feature(main,side){
 const a=document.getElementById('featured');a.href=linkFor(main);document.getElementById('featured-image').src=photoFor(main);document.getElementById('featured-image').alt=(isFilm?'Image de ':'Capture de ')+main.title;
 document.getElementById('featured-tag').textContent=isFilm?'À L’AFFICHE · COURT-MÉTRAGE':main.tag.toUpperCase()+' · À DÉCOUVRIR';
 document.getElementById('featured-title').textContent=main.title;
 document.getElementById('featured-desc').textContent=main.desc;
 document.getElementById('featured-cta').innerHTML=(isFilm?'Regarder le film':'Jouer maintenant')+arrow;
 for(const g of side){const s=document.createElement('a');s.className='small-feature';s.href=linkFor(g);s.appendChild(photo(g,true));const text=document.createElement('div');const k=document.createElement('span');k.className='eyebrow';k.textContent=isFilm?g.duration:g.tag;const h=document.createElement('h3');h.textContent=g.title;const c=document.createElement('span');c.className='small-cta';c.textContent=isFilm?'Regarder →':'Jouer →';text.append(k,h,c);s.appendChild(text);document.getElementById('side-features').appendChild(s);}
}
search.addEventListener('input',render);document.getElementById('reset').onclick=()=>{search.value='';choose('Tout');search.focus();};
document.querySelector('[data-nav="'+view+'"]').setAttribute('aria-current','page');
fetch((isFilm?'films.json':'games.json')+'?v=6').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
 items=data;
 document.getElementById('total-count').textContent=items.length;
 if(isFilm){document.getElementById('page-kicker').textContent='LE PLAISIR DE REGARDER';document.getElementById('page-title').innerHTML='Installe-toi.<br>Le film commence.';document.getElementById('page-intro').innerHTML='Des courts-métrages libres à découvrir.<br>Le cinéma, sans abonnement.';document.getElementById('catalogue-kicker').textContent='UN AUTRE REGARD';document.getElementById('catalogue-title').firstChild.textContent='Les courts-métrages ';search.placeholder='Rechercher un film…';document.getElementById('bottom-note').innerHTML='<strong>Du cinéma à partager librement.</strong><span>Films complets sous licence Creative Commons. Lecture en ligne, dans la langue indiquée.</span>';feature(items[0],items.slice(1,3));}
 else{feature(items.find(g=>g.id==='drive-mad')||items[0],[items.find(g=>g.id==='mini-golf'),items.find(g=>g.id==='dash')].filter(Boolean));try{const last=items.find(g=>g.id===localStorage.getItem('pearly-last'));if(last){const a=document.getElementById('resume');a.textContent='Ta dernière partie : '+last.title+' — Reprendre →';a.href=linkFor(last);a.hidden=false;}}catch(_){}}
 const values=isFilm?['Tout']:['Tout','Mes favoris',...new Set(items.map(g=>g.tag))];for(const value of values){const b=document.createElement('button');b.textContent=value;b.className='filter';b.setAttribute('aria-pressed',String(value===category));b.onclick=()=>choose(value);filterRow.appendChild(b);}render();
}).catch(()=>{document.getElementById('result-count').textContent='Le catalogue n’a pas pu être chargé. Recharge la page pour réessayer.';});
