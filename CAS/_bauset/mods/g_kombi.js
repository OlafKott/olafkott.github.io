GUIDES["kombi"]={
 title:"Kombinatorik",
 css:String.raw`[data-g="kombi"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="kombi"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="kombi"] .calc{ transform:scale(.92); transform-origin:top center; } }
[data-g="kombi"] .kop{ font-weight:bold; margin:0 1px; }
[data-g="kombi"] .x10{ font-size:16px; margin-left:2px; }
[data-g="kombi"] .x10 sup{ font-size:11px; }
[data-g="kombi"] .aus{ white-space:nowrap; }
[data-g="kombi"] .list div.it{ display:flex; justify-content:space-between; }
[data-g="kombi"] .list div.it.dim{ color:#6b776b; }`,
 make:function(){

// =====================================================================
//  Kombinatorik: exakte Rechnung mit ganzen Zahlen (n!, nPr, nCr)
// =====================================================================
const KSHOW={'*':'×','/':'÷','-':'−','+':'+','!':'!','P':'<b class="kop">P</b>','C':'<b class="kop">C</b>'};
const rT=t=>t.map(k=>KSHOW[k]||k).join('');
function kfact(n){ let r=1n; for(let i=2n;i<=n;i++) r*=i; return r; }
function kperm(n,k){ if(k>n) return null; let r=1n; for(let i=0n;i<k;i++) r*=(n-i); return r; }
function kcomb(n,k){ const p=kperm(n,k); return p===null?null:p/kfact(k); }
function evalK(t){
  const a=[]; let num='';
  for(const k of t){ if(/^[0-9]$/.test(k)){ num+=k; continue; } if(num){ a.push(BigInt(num)); num=''; } a.push(k); }
  if(num) a.push(BigInt(num));
  const b=[]; for(const x of a){ if(x==='!'){ const v=b.pop(); if(typeof v!=='bigint') return null; b.push(kfact(v)); } else b.push(x); }
  const red=(arr,ops,f)=>{ if(arr===null||typeof arr[0]!=='bigint') return null; const o=[arr[0]];
    for(let i=1;i<arr.length;i+=2){ const op=arr[i], v=arr[i+1]; if(typeof v!=='bigint') return null;
      if(ops.includes(op)){ const r=f(op,o.pop(),v); if(r===null) return null; o.push(r); } else o.push(op,v); }
    return o; };
  let c=red(b,['P','C'],(op,x,y)=>op==='P'?kperm(x,y):kcomb(x,y));
  c=red(c,['*','/'],(op,x,y)=>op==='*'?x*y:(y!==0n&&x%y===0n?x/y:null));
  c=red(c,['+','-'],(op,x,y)=>op==='+'?x+y:x-y);
  return c&&c.length===1?c[0]:null;
}
// Anzeige wie am Rechner: bis 10 Stellen ganz, sonst a,bcd…×10^n (10 gültige Ziffern)
function kfmt(v){
  if(v===null) return 'Math ERROR';
  let s=v.toString(); if(s.length<=10) return s;
  const e=s.length-1; let m=BigInt(s.slice(0,11)); m=(m+5n)/10n; let ms=m.toString(), ee=e;
  if(ms.length>10){ ms=ms.slice(0,10); ee++; }
  let mant=ms[0]+','+ms.slice(1); mant=mant.replace(/0+$/,'').replace(/,$/,'');
  return `${mant}<span class="x10">×10<sup>${ee}</sup></span>`;
}
// =====================================================================
//  Display-Grundbausteine
// =====================================================================
const T_=(t,sz,extra)=>`<text x="17" y="12" text-anchor="middle" font-size="${sz||11}" font-weight="bold" fill="currentColor" ${extra||''}>${t}</text>`;
const ICON={
 Berechnung:'<svg viewBox="0 0 34 14"><text x="17" y="6.8" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">×÷</text><text x="17" y="14" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">+−</text></svg>',
 Statistik:'<svg viewBox="0 0 34 14"><path d="M9 1v12h17" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="11" y="7" width="2.6" height="5" fill="currentColor"/><rect x="14.5" y="3" width="2.6" height="9" fill="currentColor"/><rect x="18" y="5" width="2.6" height="7" fill="currentColor"/><rect x="21.5" y="8" width="2.6" height="4" fill="currentColor"/></svg>',
 Verteilung:'<svg viewBox="0 0 34 14"><path d="M5 13C11 13 12 2 17 2s6 11 12 11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M14 13V4.5h6V13" fill="currentColor" opacity=".55"/><path d="M4 13h26" stroke="currentColor" stroke-width="1"/></svg>',
 'Tabellenk.':'<svg viewBox="0 0 34 14"><rect x="9" y="1.5" width="16" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1.5" width="16" height="3" fill="currentColor"/><path d="M9 8.5h16M14.3 4.5v8.5M19.6 4.5v8.5" stroke="currentColor" stroke-width="1"/></svg>',
 'Wertetab.':'<svg viewBox="0 0 34 14"><rect x="10" y="1.5" width="14" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="1.5" width="14" height="3" fill="currentColor"/><path d="M17 4.5v8.5M10 8.5h14" stroke="currentColor" stroke-width="1"/></svg>',
 Gleichung:'<svg viewBox="0 0 34 14">'+T_('xy=0',9.5)+'<path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>',
 Ungleichung:'<svg viewBox="0 0 34 14">'+T_('xy&gt;0',9.5)+'<path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>',
 Komplex:'<svg viewBox="0 0 34 14"><rect x="9" y="1.5" width="16" height="11" fill="none" stroke="currentColor" stroke-width="1.3"/><text x="13.5" y="11" text-anchor="middle" font-size="9" font-weight="bold" font-style="italic" fill="currentColor">i</text><path d="M17.5 11.5l6-8M17.5 11.5h6" stroke="currentColor" stroke-width="1.1" fill="none"/></svg>',
 'Basis-N':'<svg viewBox="0 0 34 14"><text x="17" y="12" text-anchor="middle" font-size="6.5" font-weight="bold" fill="currentColor">2 8 10 16</text></svg>',
 Matrix:'<svg viewBox="0 0 34 14"><path d="M10 1.5h-2v11h2M24 1.5h2v11h-2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="11" y="2" width="5.4" height="4.4" fill="currentColor"/><rect x="17.6" y="2" width="5.4" height="4.4" fill="currentColor"/><rect x="11" y="7.6" width="5.4" height="4.4" fill="currentColor"/><rect x="17.6" y="7.6" width="5.4" height="4.4" fill="currentColor"/></svg>',
 Vektor:'<svg viewBox="0 0 34 14"><path d="M12 12L21 3M12 12h11M12 12V3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 3h3v3M20 9.5l3 2.5-3 2" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
 'Verhältnis':'<svg viewBox="0 0 34 14"><rect x="8" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="19" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="17" cy="5" r=".9" fill="currentColor"/><circle cx="17" cy="9" r=".9" fill="currentColor"/><path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>',
 Mathebox:'<svg viewBox="0 0 34 14"><rect x="7" y="2" width="9" height="10" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="13" cy="5" r="1.2" fill="currentColor"/><path d="M23 1.5l5.5 5.5-5.5 5.5-5.5-5.5z" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="23" cy="7" r="1.4" fill="currentColor"/></svg>'
};
const BADGE=["1","2","3","4","5","6","7","8","9","0","+","−","×"];
function sbar(S,extra){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span>${extra||''}</div>`; }
function zl(lbl,ziel){ return (ziel||[]).includes(lbl)?' ziel':''; }
// =====================================================================
//  fx-991DE CW: Zustandsmaschine (HOME, Berechnung, CATALOG)
// =====================================================================
const APPS=["Berechnung","Statistik","Verteilung","Tabellenk.","Wertetab.","Gleichung","Ungleichung","Komplex","Basis-N","Matrix","Vektor","Verhältnis","Mathebox"];
const CATS=["Funktionsanalyse","Wahrscheinlichkeit","Numerische Ber.","…"];
const WK=["%","x!","nPr","nCr","Ran#","RanInt#"];
const WKTOK={"x!":"!","nPr":"P","nCr":"C"};
function fresh(mode){ return {mode:mode||'start', sel:0, shift:false, t:[], res:undefined}; }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'start': return;
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='calc'; S.t=[]; S.res=undefined; }
     return;
   case 'cat':
     if(k==='down') S.sel=Math.min(CATS.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='cat'){ S.mode='calc'; }
     else if((k==='ok'||k==='exe')&&S.sel===1){ S.mode='wk'; S.sel=0; }
     return;
   case 'wk':
     if(k==='down') S.sel=Math.min(WK.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'){ S.mode='cat'; S.sel=1; }
     else if((k==='ok'||k==='exe')&&WKTOK[WK[S.sel]]){ if(S.res!==undefined){ S.t=[]; S.res=undefined; } S.t.push(WKTOK[WK[S.sel]]); S.mode='calc'; }
     return;
   case 'calc':
     if(k==='cat'){ S.mode='cat'; S.sel=0; return; }
     if(k==='ac'){ S.t=[]; S.res=undefined; return; }
     if(k==='exe'){ if(S.res===undefined&&S.t.length) S.res=evalK(S.t); return; }
     if(k==='del'){ if(S.res===undefined) S.t.pop(); return; }
     if(/^[0-9]$/.test(k)||['*','/','+','-'].includes(k)){ if(S.res!==undefined){ S.t=[]; S.res=undefined; } S.t.push(k); }
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='start') return sbar(S)+'<div class="app"><div class="ein"></div><div class="aus"></div></div>';
  if(S.mode==='home'){
    const r0=Math.min(Math.floor(S.sel/3), Math.ceil(APPS.length/3)-2);
    const vis=APPS.map((a,i)=>[a,i]).filter(([a,i])=>Math.floor(i/3)>=r0&&Math.floor(i/3)<r0+2);
    const rows=Math.ceil(APPS.length/3), top=r0/rows*100, h=2/rows*100;
    return `<div class="home"><div class="grid">`+
      vis.map(([a,i])=>`<div class="ic${i===S.sel?' sel':''}${zl(a,ziel)}"><span class="bd">${BADGE[i]}</span>${ICON[a]}<span class="an">${a}</span></div>`).join('')+
      `</div><div class="sbar"><i style="top:${top}%;height:${h}%"></i></div></div>`;
  }
  if(S.mode==='cat'||S.mode==='wk'){
    const L=S.mode==='cat'?CATS:WK, T=S.mode==='cat'?'CATALOG':'Wahrscheinlichkeit';
    const o=Math.max(0,Math.min(S.sel-3,L.length-4));
    return sbar(S)+`<div class="list"><div class="ti">${T}</div>`+L.slice(o,o+4).map((t,j)=>{ const i=j+o; return `<div class="it${i===S.sel?' sel':''}${t==='…'?' dim':''}${zl(t,ziel)}"><span>${t}</span></div>`; }).join('')+'</div>';
  }
  const fertig=S.res!==undefined;
  return sbar(S)+`<div class="app"><div class="ein">${rT(S.t)}${fertig?'':'<span class="caret"></span>'}</div><div class="aus">${fertig?kfmt(S.res):''}</div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: Aufgabe ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse eintragen, dann <b>Weiter</b>.</p></div>`;
const OPEN=[{t:"App Berechnung öffnen", a:"Rechner vorbereiten", k:["home","ok"], z:["Berechnung"],
   d:"<p>Drücken Sie <b>HOME</b>. Die App <b>Berechnung</b> ist schon markiert. Öffnen Sie sie mit <b>OK</b>.</p>"}];
const KAT="<p>Der CW hat für die Kombinatorik <b>keine eigene Taste</b>. Alle drei Befehle stehen im <b>CATALOG</b> unter <b>Wahrscheinlichkeit</b>.</p>";
const KNOTE="Öffnet der CATALOG an einer anderen Stelle, gehen Sie mit <b>▲ ▼</b> zur richtigen Zeile.";
const calcStart=()=>run(fresh(),["home","ok"]);
const TRACKS={
 f:{ name:"1 · Fakultät n!", start:()=>fresh(), steps:[
  OPEN[0],
  {t:"Zuerst die Zahl", a:"5!", k:["5"], d:"<p>Beim CW tippen Sie <b>zuerst die Zahl</b>, dann das Ausrufezeichen. Tippen Sie <b>5</b>.</p>"},
  {t:"CATALOG ▸ Wahrscheinlichkeit", a:"5!", k:["cat","down","ok"], z:["Wahrscheinlichkeit"],
   d:KAT+"<p>Drücken Sie <b>CATALOG</b>, mit <b>▼</b> zu <b>Wahrscheinlichkeit</b>, dann <b>OK</b>.</p>", n:KNOTE},
  {t:"x! wählen", a:"5!", k:["down","ok"], z:["x!"],
   d:"<p>Mit <b>▼</b> zu <b>x!</b> und <b>OK</b>. Im Display steht jetzt <b>5!</b>.</p>"},
  {t:"Berechnen", a:"5!", k:["exe"],
   d:"<p>Mit <b>EXE</b> rechnen. Ergebnis: <b>120</b>, denn 5 · 4 · 3 · 2 · 1 = 120.</p>"},
  {t:"Große Zahl: 15!", a:"15!", k:["1","5","cat","down","ok","down","ok","exe"], z:["Wahrscheinlichkeit","x!"],
   d:"<p>Ergebnis: <b>1,307674368 × 10<sup>12</sup></b>. Das sind rund <b>1,3 Billionen</b>.</p>",
   n:"Fakultäten werden schnell riesig. Ab 11 Stellen zeigt der Rechner <b>×10<sup>…</sup></b> an."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(1,["Zahl tippen ▸ <b>CATALOG</b> ▸ Wahrscheinlichkeit ▸ <b>x!</b> ▸ <b>EXE</b>"])}
 ]},
 p:{ name:"2 · Variation nPr", start:calcStart, steps:[
  {t:"Reihenfolge ist wichtig", a:"10 P 3", k:[],
   d:"<p>10 Läuferinnen laufen um Platz 1, 2 und 3. Wie viele Siegerlisten gibt es?</p><p>Es werden <b>3 aus 10</b> ausgewählt, die <b>Reihenfolge zählt</b>. Rechnerbefehl: <b>nPr</b>.</p>"},
  {t:"n tippen: 10", a:"10 P 3", k:["1","0"], d:"<p>Zuerst die <b>große Zahl n = 10</b>.</p>"},
  {t:"CATALOG ▸ Wahrscheinlichkeit", a:"10 P 3", k:["cat","down","ok"], z:["Wahrscheinlichkeit"],
   d:"<p><b>CATALOG</b>, mit <b>▼</b> zu <b>Wahrscheinlichkeit</b>, <b>OK</b>.</p>", n:KNOTE},
  {t:"nPr wählen", a:"10 P 3", k:["down","down","ok"], z:["nPr"],
   d:"<p>Zweimal <b>▼</b> zu <b>nPr</b>, dann <b>OK</b>. Im Display steht <b>10P</b>.</p>"},
  {t:"r tippen und rechnen", a:"10 P 3", k:["3","exe"],
   d:"<p>Tippen Sie <b>3</b> und <b>EXE</b>. Ergebnis: <b>720</b>, denn 10 · 9 · 8 = 720.</p>"},
  {t:"Selbst rechnen", k:[], ab:2, d:AB(2,["n tippen ▸ <b>CATALOG</b> ▸ Wahrscheinlichkeit ▸ <b>nPr</b> ▸ r tippen ▸ <b>EXE</b>"])}
 ]},
 c:{ name:"3 · Binomialkoeffizient nCr", start:calcStart, steps:[
  {t:"Reihenfolge ist egal", a:"49 C 6", k:[],
   d:"<p>Lotto: Aus 49 Zahlen werden 6 gezogen. Wie viele Tipps gibt es?</p><p>Es werden <b>6 aus 49</b> ausgewählt, die <b>Reihenfolge ist egal</b>.</p><p>Die Anzahl heißt <b>Binomialkoeffizient</b> „49 über 6“. Rechnerbefehl: <b>nCr</b>.</p>"},
  {t:"n tippen: 49", a:"49 C 6", k:["4","9"], d:"<p>Zuerst die <b>große Zahl n = 49</b>.</p>"},
  {t:"CATALOG ▸ Wahrscheinlichkeit", a:"49 C 6", k:["cat","down","ok"], z:["Wahrscheinlichkeit"],
   d:"<p><b>CATALOG</b>, mit <b>▼</b> zu <b>Wahrscheinlichkeit</b>, <b>OK</b>.</p>", n:KNOTE},
  {t:"nCr wählen", a:"49 C 6", k:["down","down","down","ok"], z:["nCr"],
   d:"<p>Dreimal <b>▼</b> zu <b>nCr</b>, dann <b>OK</b>. Im Display steht <b>49C</b>.</p>"},
  {t:"r tippen und rechnen", a:"49 C 6", k:["6","exe"],
   d:"<p>Tippen Sie <b>6</b> und <b>EXE</b>. Ergebnis: <b>13983816</b> – fast 14 Millionen Tipps.</p>"},
  {t:"Vergleich: nPr", a:"49 P 6", k:["4","9","cat","down","ok","down","down","ok","6","exe"], z:["Wahrscheinlichkeit","nPr"],
   d:"<p>Mit Reihenfolge wären es <b>1,006834752 × 10<sup>10</sup></b> – also 720-mal so viele.</p>",
   n:"<b>nPr</b>: Reihenfolge zählt (Plätze, Ämter, Codes). <b>nCr</b>: Reihenfolge egal (Gruppe, Auswahl, Lotto)."},
  {t:"Selbst rechnen", k:[], ab:3, d:AB(3,["n tippen ▸ <b>CATALOG</b> ▸ Wahrscheinlichkeit ▸ <b>nCr</b> ▸ r tippen ▸ <b>EXE</b>","Danach: Lösungscode eintragen"])}
 ]}
};
const KLBL={cat:"CATALOG",ok:"OK",home:"HOME ⌂",back:"↶",exe:"EXE"};
// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["f","p","c"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const BX='<span class="bx"></span>';
const LBL={on:"ON",home:"HOME ⌂",settings:"SETTINGS",var:"VARIABLE",back:"↶",ok:"OK",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",
 exe:"EXE",ac:"AC",del:"⌫",ans:"Ans",format:"FORMAT","*":"×","/":"÷","-":"−",
 frac:'<span class="mf"><i></i><b></b><i></i></span>', sqrt:'√'+BX, sq:BX+'<sup>2</sup>', pow:BX+'<sup>▫</sup>'};
const lbl=k=>KLBL[k]||LBL[k]||k;
function chip(k,i){ const s=i<pos?'done':(i===pos?'now':''); return `<span class="chip ${k==='shift'?'shift':''} ${s}">${lbl(k)}</span>`; }
function stateAt(t,s,i){
  const T=TRACKS[t], S=T.start();
  for(let j=0;j<s;j++) run(S,T.steps[j].k);
  return run(S,T.steps[s].k.slice(0,i));
}
function render(){
  const T=TRACKS[tr], S=T.steps[st];
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===tr?'on':''} ${done[k]?'fertig':''}" data-t="${k}">${TRACKS[k].name}</button>`).join('');
  $('prog').innerHTML=T.steps.map((x,i)=>`<i class="${x.ab?'abp ':''}${i<st?'done':i===st?'now':''}" data-i="${i}"></i>`).join('');
  $('nr').textContent=`${T.name} · Schritt ${st+1} von ${T.steps.length}`;
  $('tt').textContent=S.t;
  $('task').style.display=S.a?'block':'none';
  $('task').innerHTML=S.a?`<div class="auf">Aufgabe</div><div class="term">${S.a}</div>`:'';
  $('chips').innerHTML=S.k.length?S.k.map(chip).join(''):(S.ab?'':'<span class="chip plus">Nur ablesen – keine Taste drücken</span>');
  $('dd').innerHTML=(S.d||'')+(S.n?`<div class="note"><b>Hinweis:</b> ${S.n}</div>`:'');
  $('scr').innerHTML=draw(stateAt(tr,st,pos), pos<S.k.length?S.z:null);
  $('back').disabled=st===0&&pos===0;
  const last=st===T.steps.length-1, nextT=ORDER[ORDER.indexOf(tr)+1];
  const fin=pos>=S.k.length;
  if(last&&fin) done[tr]=true;
  $('next').className=fin?'go':'';
  $('next').textContent=fin ? (last ? (nextT?`Weiter mit ${TRACKS[nextT].name} ▶`:'Fertig ✓') : 'Weiter ▶') : 'Überspringen';
  $('next').disabled=fin&&last&&!nextT;
  $('stat').style.display=S.ab?'none':'flex';
  $('stat').innerHTML=S.k.length? (fin?'<span class="ok">✓ Richtig!</span>':`Drücken Sie jetzt: ${chip(S.k[pos],pos).replace('now','now big')}`) : '';
  hint();
}
function hint(){
  document.querySelectorAll('.k.hit,.k.held').forEach(e=>e.classList.remove('hit','held'));
  const S=TRACKS[tr].steps[st];
  if(pos>0&&S.k[pos-1]==='shift'&&pos<S.k.length){ const c=document.querySelector('.k[data-k="shift"]'); if(c) c.classList.add('held'); }
  if(pos>=S.k.length) return;
  const el=document.querySelector(`.k[data-k="${CSS.escape(S.k[pos])}"]`); if(el) el.classList.add('hit');
}
function press(k){
  if(lock) return;
  const S=TRACKS[tr].steps[st];
  if(pos>=S.k.length) return;
  const el=document.querySelector(`.k[data-k="${CSS.escape(k)}"]`);
  if(k===S.k[pos]){
    pos++; if(el){ el.classList.add('good'); setTimeout(()=>el.classList.remove('good'),220); }
    render();
    if(pos>=S.k.length){ lock=true; setTimeout(()=>{ lock=false; advance(); },900); }
  } else {
    if(el){ el.classList.add('bad'); setTimeout(()=>el.classList.remove('bad'),450); }
    $('stat').innerHTML=`<span class="err">Das war nicht die richtige Taste.</span> Gesucht: ${chip(S.k[pos],pos).replace('now','now big')}`;
  }
}
function advance(){ const T=TRACKS[tr]; if(st<T.steps.length-1){ st++; pos=0; } render(); }
function next(){
  const T=TRACKS[tr], S=T.steps[st];
  if(pos<S.k.length){ pos=S.k.length; render(); return; }
  if(st<T.steps.length-1){ st++; pos=0; render(); return; }
  const n=ORDER[ORDER.indexOf(tr)+1]; if(n){ tr=n; st=0; pos=0; render(); window.scrollTo({top:0,behavior:'smooth'}); }
}
function back(){ if(pos>0){ pos=0; } else if(st>0){ st--; pos=0; } render(); }

const KMAP={Enter:'exe',Escape:'ac',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Backspace:'del',Delete:'del',Home:'home','.':',',',':',','*':'*','/':'/','+':'+','-':'-','(':'(',')':')','^':'pow'};
return {
  ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
  render, press, next, back, KMAP,
  selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
  selectStep:function(i){ st=+i; pos=0; render(); }
};
 }
};
