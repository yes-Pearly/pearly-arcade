/* Pearly Arcade game integration, MIT, 2026-11-12. Timers and animation clocks
   are suspended together, so pause never just covers a still-running game. */
(() => {
 'use strict';
 const script=document.currentScript,id=script.dataset.game;window.PearlyInput?.init();
 const realNow=performance.now.bind(performance), realDate=Date.now.bind(Date);
 const native={raf:window.requestAnimationFrame.bind(window),caf:window.cancelAnimationFrame.bind(window),timeout:window.setTimeout.bind(window),clear:window.clearTimeout.bind(window)};
 let paused=false,muted=false,pauseAt=0,offset=0,sequence=0;const frames=new Map(),timers=new Map(),contexts=new Set(),gains=new WeakMap(),playingMedia=new Set(),mediaElements=new Set();
 // Keep the game clock monotonic and frozen while paused, including legacy engines.
 performance.now=()=> (paused?pauseAt:realNow())-offset;Date.now=()=>realDate()-offset-(paused?realNow()-pauseAt:0);
 try{muted=localStorage.getItem('pearly-muted')==='true'}catch(_){}
 const send=(type,data={})=>{if(parent!==window)parent.postMessage({type:'pearly:'+type,id,...data},location.origin)};
 function runFrame(job){job.native=native.raf(t=>{if(!frames.has(job.id))return;if(paused){job.waiting=true;return}frames.delete(job.id);job.callback(t-offset)})}
 window.requestAnimationFrame=callback=>{const job={id:++sequence,callback};frames.set(job.id,job);runFrame(job);return job.id};
 window.cancelAnimationFrame=id=>{const job=frames.get(id);if(job){native.caf(job.native);frames.delete(id)}};
 function schedule(job,delay){job.remaining=delay;job.started=realNow();if(paused)return;job.native=native.timeout(()=>{if(!timers.has(job.id))return;if(job.repeat)schedule(job,job.delay);else timers.delete(job.id);job.callback(...job.args)},delay)}
 function timer(callback,delay,args,repeat){if(typeof callback!=='function')return native.timeout(callback,delay);const job={id:++sequence,callback,args,delay:Math.max(0,Number(delay)||0),repeat};timers.set(job.id,job);schedule(job,job.delay);return job.id}
 window.setTimeout=(cb,delay,...args)=>timer(cb,delay,args,false);window.setInterval=(cb,delay,...args)=>timer(cb,Math.max(4,Number(delay)||0),args,true);
 window.clearTimeout=window.clearInterval=id=>{const job=timers.get(id);if(job){native.clear(job.native);timers.delete(id)}};
 function master(ctx){if(gains.has(ctx))return gains.get(ctx);const gain=ctx.createGain();gain.gain.value=muted?0:1;gains.set(ctx,gain);nativeConnect.call(gain,ctx.destination);return gain}
 const nativeConnect=window.AudioNode?.prototype.connect;
 if(nativeConnect){window.AudioNode.prototype.connect=function(destination,...args){if(destination===this.context.destination)destination=master(this.context);return nativeConnect.call(this,destination,...args)}}
 const NativeContext=window.AudioContext||window.webkitAudioContext;
 if(NativeContext){const Wrapped=new Proxy(NativeContext,{construct(Target,args){const ctx=Reflect.construct(Target,args);contexts.add(ctx);master(ctx);return ctx}});window.AudioContext=Wrapped;if(window.webkitAudioContext)window.webkitAudioContext=Wrapped}
 const NativeAudio=window.Audio;
 if(NativeAudio){window.Audio=new Proxy(NativeAudio,{construct(Target,args){const media=Reflect.construct(Target,args);media.muted=muted;mediaElements.add(media);return media}})}
 function setMuted(value){muted=Boolean(value);for(const ctx of contexts){const g=gains.get(ctx);if(g)g.gain.setTargetAtTime(muted?0:1,ctx.currentTime,.015)}for(const media of [...mediaElements,...document.querySelectorAll('audio,video')])media.muted=muted;try{localStorage.setItem('pearly-muted',String(muted))}catch(_){}document.documentElement.dataset.muted=String(muted);send('muted',{muted});updateDock()}
 function setPaused(value){value=Boolean(value);if(value===paused)return;paused=value;document.documentElement.dataset.paused=String(paused);
  if(paused){pauseAt=realNow();window.dispatchEvent(new Event('pearly:release-controls'));for(const job of timers.values()){native.clear(job.native);job.remaining=Math.max(0,job.remaining-(pauseAt-job.started))}for(const ctx of contexts)if(ctx.state==='running')ctx.suspend().catch(()=>{});for(const media of [...mediaElements,...document.querySelectorAll('audio,video')])if(!media.paused){playingMedia.add(media);media.pause()}for(const [code,key,n] of [['ArrowLeft','ArrowLeft',37],['ArrowRight','ArrowRight',39],['ArrowUp','ArrowUp',38],['ArrowDown','ArrowDown',40],['Space',' ',32],['ShiftLeft','Shift',16]]){const e=new KeyboardEvent('keyup',{code,key,bubbles:true});Object.defineProperty(e,'keyCode',{get:()=>n});document.dispatchEvent(e)}}
  else{offset+=realNow()-pauseAt;for(const job of timers.values())schedule(job,job.remaining);for(const job of frames.values())if(job.waiting){job.waiting=false;runFrame(job)}for(const ctx of contexts)if(ctx.state==='suspended')ctx.resume().catch(()=>{});for(const media of playingMedia)media.play().catch(()=>{});playingMedia.clear();if(id==='hextris'&&window.gameState===-1&&typeof window.resumeGame==='function')window.resumeGame();if(id==='dino'&&window.Runner?.instance_&&!window.Runner.instance_.crashed)window.Runner.instance_.play()}
  send('paused',{paused});updateDock();
 }
 let dock;
 function updateDock(){if(!dock)return;dock.querySelector('[data-pause]').textContent=paused?'Reprendre':'Pause';dock.querySelector('[data-sound]').textContent=muted?'Activer le son':'Couper le son';dock.querySelector('.pearly-resume').hidden=!paused}
 function press(code,key,number){const event=type=>{const e=new KeyboardEvent(type,{code,key,bubbles:true,cancelable:true});Object.defineProperty(e,'keyCode',{get:()=>number});Object.defineProperty(e,'which',{get:()=>number});document.dispatchEvent(e)};event('keydown');native.timeout(()=>event('keyup'),100)}
 function start(){if(typeof window.pearlyStartGame==='function'){window.pearlyStartGame();return}if(id==='tower'){let tries=0;const go=()=>{const b=document.getElementById('start');if(b&&getComputedStyle(b).display!=='none'&&b.getClientRects().length&&window.loadFinish){b.click()}else if(++tries<100)native.timeout(go,100)};go();return}if(id==='hextris'){let tries=0;const go=()=>{if(window.canRestart&&typeof window.startBtnHandler==='function')window.startBtnHandler();else if(++tries<60)native.timeout(go,100)};go();return}const button=document.getElementById('btn-start');if(button&&!button.classList.contains('hidden'))button.click();else if(id==='mario')press('Enter','Enter',13);else if(id==='dino')press('Space',' ',32)}
 window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin)return;const m=event.data;if(m?.type==='pearly:controls'){window.PearlyInput?.setOptions(m.value);window.dispatchEvent(new Event('resize'))}if(m?.type==='pearly:pause')setPaused(m.value);if(m?.type==='pearly:mute')setMuted(m.value);if(m?.type==='pearly:start')start()});
 window.addEventListener('pearly:controls-change',()=>native.timeout(()=>window.dispatchEvent(new Event('resize')),0));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)setPaused(true)});
 window.addEventListener('keydown',e=>{if(e.code==='Escape'&&parent!==window){e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();setPaused(!paused)}},true);
 document.addEventListener('DOMContentLoaded',()=>{
  document.documentElement.dataset.game=id;
  if(id==='2048'){const fit=()=>document.documentElement.style.setProperty('--board-scale',Math.min((innerWidth-32)/500,(innerHeight-32)/document.querySelector('.container').offsetHeight,1.5));window.addEventListener('resize',fit);fit();native.timeout(fit,200)}
  if(id==='dino'){const fit=()=>{const runner=window.Runner?.instance_;if(runner)runner.setArcadeModeContainerScale()};native.timeout(fit,100);window.addEventListener('resize',()=>native.timeout(fit,100))}document.documentElement.dataset.paused='false';
  const canvas=document.querySelector('canvas');if(canvas&&canvas.width&&canvas.height&&document.querySelector('#game')){const panel=canvas.closest('.panel'),wrap=canvas.closest('.wrap');document.documentElement.style.setProperty('--game-ratio',canvas.width/canvas.height);if(panel)panel.classList.add('pearly-canvas-panel');else if(wrap)wrap.classList.add('pearly-canvas-root')}
  const puzzle=document.querySelector('.panel')||(id==='connect-four'?document.querySelector('.wrap'):null);if(puzzle&&!canvas){document.body.classList.add('pearly-puzzle');let fitTimer;const fit=()=>{puzzle.style.transform='none';const w=puzzle.offsetWidth,h=puzzle.offsetHeight;if(!w||!h)return;const scale=Math.min((innerWidth-28)/w,(innerHeight-28)/h,1.4);puzzle.style.transform='scale('+scale+')'};const queue=()=>{native.clear(fitTimer);fitTimer=native.timeout(fit,380)};new ResizeObserver(queue).observe(puzzle);window.addEventListener('resize',queue);queue()}
  const embedded=parent!==window;document.documentElement.classList.toggle('pearly-embedded',embedded);
  document.querySelectorAll('button').forEach(button=>{if(!button.getAttribute('aria-label')&&button.title)button.setAttribute('aria-label',button.title)});
  if(!embedded){dock=document.createElement('div');dock.className='pearly-game-dock';dock.innerHTML='<button data-pause>Pause</button><button data-sound>Son</button><div class="pearly-resume" hidden><strong>Partie en pause</strong><button>Reprendre</button></div>';document.body.appendChild(dock);dock.querySelector('[data-pause]').onclick=()=>setPaused(!paused);dock.querySelector('[data-sound]').onclick=()=>setMuted(!muted);dock.querySelector('.pearly-resume button').onclick=()=>setPaused(false);updateDock()}
  setMuted(muted);native.timeout(()=>window.dispatchEvent(new Event('resize')),0);send('ready');
 });
 window.PearlyGame={pause:setPaused,mute:setMuted,start,get paused(){return paused},get muted(){return muted}};
})();
