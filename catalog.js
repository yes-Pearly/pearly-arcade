const normal = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const grid=document.getElementById('games-grid');
const search=document.getElementById('search');
const filters=document.getElementById('filters');
const count=document.getElementById('result-count');
let games=[],filter='Tous';
let favorites=[];
try{favorites=JSON.parse(localStorage.getItem('pearly-favorites')||'[]');if(!Array.isArray(favorites))favorites=[];}catch(_){}
function saveFavorites(){try{localStorage.setItem('pearly-favorites',JSON.stringify(favorites));}catch(_){}}
function draw(){
  grid.replaceChildren();
  const query=normal(search.value.trim());
  const visible=games.filter(g=>(filter==='Tous'||g.tag===filter||(filter==='Favoris'&&favorites.includes(g.id)))&&normal(g.title+' '+g.tag+' '+g.desc).includes(query));
  count.textContent=visible.length+' jeu'+(visible.length===1?'':'x');
  for(const g of visible){
    const card=document.createElement('article');card.className='card game-card';
    const link=document.createElement('a');link.className='game-link';link.href='play.html?game='+encodeURIComponent(g.id);
    const art=document.createElement('div');art.className='art '+g.art;art.setAttribute('aria-hidden','true');
    const icon=document.createElement('span');icon.className='game-icon';icon.textContent=g.icon;art.appendChild(icon);
    const type=document.createElement('span');type.className='art-badge';type.textContent=g.adaptation?'Adaptation amateur':'Jeu libre';art.appendChild(type);
    const body=document.createElement('div');body.className='card-body';
    const tag=document.createElement('p');tag.className='eyebrow';tag.textContent=g.tag+' · '+(g.orientation==='landscape'?'Paysage conseillé':'Tactile');
    const title=document.createElement('h3');title.textContent=g.title;
    const desc=document.createElement('p');desc.textContent=g.desc;
    const foot=document.createElement('div');foot.className='card-foot';
    const author=document.createElement('span');author.textContent=g.author;
    const play=document.createElement('strong');play.textContent='Jouer →';foot.append(author,play);
    body.append(tag,title,desc,foot);link.append(art,body);
    const star=document.createElement('button');star.type='button';star.className='favorite';star.textContent=favorites.includes(g.id)?'★':'☆';
    star.setAttribute('aria-label',(favorites.includes(g.id)?'Retirer des favoris : ':'Ajouter aux favoris : ')+g.title);
    star.setAttribute('aria-pressed',String(favorites.includes(g.id)));
    star.onclick=()=>{favorites=favorites.includes(g.id)?favorites.filter(id=>id!==g.id):[...favorites,g.id];saveFavorites();draw();};
    card.append(link,star);grid.appendChild(card);
  }
  document.getElementById('no-results').hidden=visible.length!==0;
}
function setFilter(value){filter=value;for(const b of filters.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.textContent===value));draw();}
search.addEventListener('input',draw);
document.getElementById('reset-search').onclick=()=>{search.value='';setFilter('Tous');search.focus();};
fetch('games.json?v=20261112-2').then(r=>{if(!r.ok)throw Error('catalogue');return r.json();}).then(data=>{
  games=data;
  document.getElementById('total-games').textContent=games.length+' jeux disponibles';
  for(const value of ['Tous','Plateforme','Parcours','Course','Réflexes','Réflexion','Favoris']){
    const b=document.createElement('button');b.className='filter';b.textContent=value;b.setAttribute('aria-pressed',String(value===filter));b.onclick=()=>setFilter(value);filters.appendChild(b);
  }
  try{
    const last=games.find(g=>g.id===localStorage.getItem('pearly-last'));
    if(last){const resume=document.getElementById('resume');resume.href='play.html?game='+last.id;resume.textContent='Reprendre '+last.title+' →';resume.hidden=false;}
  }catch(_){}
  draw();
}).catch(()=>{count.textContent='Catalogue indisponible';grid.innerHTML='<p>Impossible de charger le catalogue. <a href="index.html">Réessayer</a>.</p>';});
