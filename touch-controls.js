/* Pearly Arcade — mobile input adapter, 2026-11-12. MIT. Gameplay stays upstream. */
(() => {
  const layout = document.currentScript.dataset.layout;
  const bindings = {
    left: ['ArrowLeft', 'ArrowLeft', 37], right: ['ArrowRight', 'ArrowRight', 39],
    up: ['ArrowUp', 'ArrowUp', 38], down: ['ArrowDown', 'ArrowDown', 40],
    jump: [' ', 'Space', 32], jet: ['Shift', 'ShiftLeft', 16], start: ['Enter', 'Enter', 13],
    pause: ['Escape', 'Escape', 27]
  };
  const style = document.createElement('style');
  style.textContent = `
    .pearly-pad{position:fixed;inset:0;z-index:9999;pointer-events:none;display:none;font:12px system-ui;color:white;user-select:none;-webkit-user-select:none}
    @media(pointer:coarse),(max-width:900px){.pearly-pad{display:block}}
    .pearly-pad button{pointer-events:auto;touch-action:none;min-width:52px;min-height:50px;border:1px solid #ffffff88;background:#152236dc;color:white;border-radius:13px;font:600 13px system-ui;box-shadow:0 3px 10px #0004;-webkit-tap-highlight-color:transparent}
    .pearly-pad button.active{background:#f16a3b;color:white;transform:scale(.96)}
    .pearly-dpad{position:absolute;bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));display:grid;grid-template-columns:repeat(3,52px);gap:5px}
    .pearly-actions{position:absolute;right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));display:flex;gap:8px}
    .pearly-actions button{min-width:65px;min-height:60px}.pearly-menu{position:absolute;top:max(8px,env(safe-area-inset-top));right:10px;display:flex;gap:6px}.pearly-menu button{min-height:40px;min-width:60px;font-size:11px}
    @media(max-height:400px){.pearly-dpad button{min-height:42px}.pearly-dpad{grid-template-columns:repeat(3,48px);gap:3px}.pearly-pad .pearly-actions button{min-height:54px}}
  `;
  document.head.appendChild(style);
  const pad = document.createElement('div');
  pad.className = 'pearly-pad'; pad.setAttribute('aria-label','Commandes tactiles');
  pad.innerHTML = layout === 'callisto'
    ? '<div class="pearly-dpad"><span></span><button data-key="up" aria-label="Avancer">↑</button><span></span><button data-key="left" aria-label="Gauche">←</button><button data-key="down" aria-label="Reculer">↓</button><button data-key="right" aria-label="Droite">→</button></div><div class="pearly-actions"><button data-key="jet">Jet</button><button data-key="jump">Saut</button></div><div class="pearly-menu"><button data-key="start">Entrée</button><button data-key="pause">Menu</button></div>'
    : '<div class="pearly-dpad"><button data-key="left" aria-label="Voie gauche">←</button><button data-key="down" aria-label="Glisser">↓</button><button data-key="right" aria-label="Voie droite">→</button></div><div class="pearly-actions"><button data-key="jump">Saut</button></div>';
  document.body.appendChild(pad);
  const held = new Map();
  function emit(name, type) {
    const [key, code, number] = bindings[name];
    const event = new KeyboardEvent(type,{key,code,bubbles:true,cancelable:true});
    Object.defineProperty(event,'keyCode',{get:()=>number});
    Object.defineProperty(event,'which',{get:()=>number});
    document.dispatchEvent(event);
  }
  function release(pointerId, immediate=false) {
    const item = held.get(pointerId);
    if (!item) return;
    const remaining=65-(performance.now()-item.started);
    if(!immediate&&remaining>0){setTimeout(()=>release(pointerId),remaining);return;}
    held.delete(pointerId);
    if (![...held.values()].some(value=>value.name===item.name)) {
      emit(item.name,'keyup'); item.button.classList.remove('active');
    }
  }
  for (const button of pad.querySelectorAll('button')) {
    button.addEventListener('pointerdown',event=>{
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      held.set(event.pointerId,{name:button.dataset.key,button,started:performance.now()});
      button.classList.add('active'); emit(button.dataset.key,'keydown');
    });
    for (const event of ['pointerup','pointercancel','lostpointercapture'])
      button.addEventListener(event,e=>{e.preventDefault();release(e.pointerId);});
    button.addEventListener('contextmenu',e=>e.preventDefault());
  }
  function releaseAll(){for(const id of [...held.keys()])release(id,true);}
  window.addEventListener('blur',releaseAll);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAll();});
  // Replace blocking legacy game alerts with a readable local result panel.
  if(layout==='runner') {
    window.alert = text => {
      const result = document.createElement('div');
      result.style.cssText='position:fixed;inset:25% 8% auto;z-index:10000;background:#152236ee;border:1px solid #fff8;border-radius:16px;padding:24px;text-align:center;color:#fff;font:16px system-ui';
      result.textContent=text;
      const again=document.createElement('button');again.textContent='Rejouer';
      again.style.cssText='display:block;margin:20px auto 0;min-height:48px;padding:0 22px;border:0;border-radius:10px;background:#f16a3b;color:#fff;font:600 16px system-ui';
      again.onclick=()=>location.reload();result.appendChild(again);document.body.appendChild(result);
    };
  }
})();
