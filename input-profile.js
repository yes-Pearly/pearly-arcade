/* Responsive controls shared by the player and local games. MIT. */
(() => {
 'use strict';
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 function compute({width,height,touch=false,layout='auto',size='large'}){
  const device=layout==='auto'?(touch?(Math.min(width,height)<600?'phone':'tablet'):'keyboard'):layout;
  const input=device==='keyboard'?'keyboard':'touch',xl=size==='xl'?1.18:1;
  const base=device==='tablet'?92:Math.min(width,height)<350?64:72;
  const compact=width>height&&height<420;
  const button=Math.round(clamp(base*xl,56,(width-64)/3.4));
  const stick=Math.round(clamp((compact?134:device==='tablet'?206:164)*xl,120,Math.min((width-40)*.52,compact?height-30:300)));
  const action=Math.round(clamp((compact?72:device==='tablet'?106:82)*xl,64,(width-stick-40)/(width<=480?1:2)));
  const dock=input==='touch'&&!compact?Math.max(stick+30,width<=480?action*2+48:action+36):0;
  return {device,input,size,compact,button,stick,action,dock,gap:device==='tablet'?12:8,width,height};
 }
 function directions(x,y,dead=.25){const r=Math.hypot(x,y);if(r<dead)return[];const out=[];if(Math.abs(x)>.34)out.push(x<0?'left':'right');if(Math.abs(y)>.34)out.push(y<0?'up':'down');return out;}
 function keyState(emit){const pointers=new Map();let active=new Set();function update(){const next=new Set([...pointers.values()].flat());for(const key of active)if(!next.has(key))emit(key,'keyup');for(const key of next)if(!active.has(key))emit(key,'keydown');active=next}return{set(id,keys){pointers.set(id,keys);update()},release(id){pointers.delete(id);update()},clear(){pointers.clear();update()}}}
 let prefs={layout:'auto',size:'large'},profile=null,initialized=false;
 function read(){try{const p=JSON.parse(localStorage.getItem('pearly-controls')||'{}');return{layout:['auto','phone','tablet','keyboard'].includes(p.layout)?p.layout:'auto',size:p.size==='xl'?'xl':'large'}}catch(_){return{layout:'auto',size:'large'}}}
 function detect(){return navigator.maxTouchPoints>0||matchMedia('(any-pointer:coarse)').matches;}
 function apply(){const next=compute({width:innerWidth,height:innerHeight,touch:detect(),...prefs});if(JSON.stringify(next)===JSON.stringify(profile))return profile;profile=next;const root=document.documentElement;root.dataset.input=profile.input;root.dataset.controlsDevice=profile.device;root.dataset.controlsCompact=String(profile.compact);root.style.setProperty('--control-size',profile.button+'px');root.style.setProperty('--control-stick',profile.stick+'px');root.style.setProperty('--control-action',profile.action+'px');root.style.setProperty('--control-gap',profile.gap+'px');root.style.setProperty('--control-dock',profile.dock+'px');root.style.setProperty('--control-target',(profile.device==='tablet'?60:54)+'px');window.dispatchEvent(new CustomEvent('pearly:controls-change',{detail:profile}));return profile;}
 function init(){if(!initialized){prefs=read();initialized=true;window.addEventListener('resize',apply)}return apply()}
 function setOptions(value,persist=false){prefs={layout:['auto','phone','tablet','keyboard'].includes(value.layout)?value.layout:'auto',size:value.size==='xl'?'xl':'large'};if(persist)try{localStorage.setItem('pearly-controls',JSON.stringify(prefs))}catch(_){}return apply()}
 window.PearlyInput={compute,directions,keyState,read,init,setOptions,get profile(){return profile}};
})();
