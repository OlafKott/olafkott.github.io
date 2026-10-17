GUIDES["int"]={
 title:"Integrale berechnen",
 css:String.raw`[data-g="int"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; white-space:nowrap; }
[data-g="int"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="int"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="int"] .defl{ font-size:15px; margin-right:2px; }
[data-g="int"] .list div.it{ padding:1px 9px; height:19px; line-height:18px; white-space:nowrap; display:flex; justify-content:space-between; }
[data-g="int"] .list div.it .val{ min-width:60px; text-align:right; }
[data-g="int"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="int"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:13px; }
[data-g="int"] .tb th{ font-size:11px; font-weight:bold; border-bottom:1.3px solid #141a14; height:14px; line-height:12px; text-align:center; }
[data-g="int"] .tb th.n, [data-g="int"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="int"] .tb td{ height:15px; line-height:14px; text-align:right; padding:0 5px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="int"] .tb td:last-child{ border-right:0; }
[data-g="int"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="int"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:1px; font-size:14px; line-height:17px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:18px; }
[data-g="int"] .tb .unten.leer{ font-size:10px; font-weight:normal; text-align:left; }
[data-g="int"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="int"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="int"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="int"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="int"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="int"] .calc{ transform:scale(.92); transform-origin:top center; } }
[data-g="int"] .ig{ display:inline-flex; align-items:center; }
[data-g="int"] .ig .is{ font:30px 'Times New Roman',serif; line-height:1; margin-right:1px; }
[data-g="int"] .ig .lim{ display:inline-flex; flex-direction:column; justify-content:space-between; height:38px; font-size:11.5px; margin:0 3px 0 -2px; }
[data-g="int"] .ig .lim > span{ display:flex; align-items:center; min-height:12px; line-height:12px; }
[data-g="int"] .ig .arg{ display:inline-flex; align-items:center; font-size:17px; }
[data-g="int"] .ig .dx{ font-size:15px; margin-left:3px; }
[data-g="int"] .ig .dx i{ font-family:'Times New Roman',serif; font-size:17px; }
[data-g="int"] .slot{ display:inline-block; width:8px; height:10px; border:1.3px solid #141a14; border-radius:1px; vertical-align:middle; }
[data-g="int"] .arg .slot{ width:10px; height:13px; }
[data-g="int"] .lim .caret{ height:11px; }
[data-g="int"] .erg{ text-align:right; font-size:19px; font-weight:bold; letter-spacing:.2px; }
[data-g="int"] .erg small{ font-size:12px; font-weight:normal; margin-right:4px; }
[data-g="int"] .list div.it.dim{ color:#6b776b; }`,
 make:function(){

// =====================================================================
//  HOME-Bildschirm fx-991DE CW
// =====================================================================
const T_=(t,sz)=>`<text x="17" y="12" text-anchor="middle" font-size="${sz||11}" font-weight="bold" fill="currentColor">${t}</text>`;
const ICON={
 Berechnung:'<svg viewBox="0 0 34 14"><text x="17" y="6.8" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">×÷</text><text x="17" y="14" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">+−</text></svg>',
 Statistik:'<svg viewBox="0 0 34 14"><path d="M9 1v12h17" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="11" y="7" width="2.6" height="5" fill="currentColor"/><rect x="14.5" y="3" width="2.6" height="9" fill="currentColor"/><rect x="18" y="5" width="2.6" height="7" fill="currentColor"/><rect x="21.5" y="8" width="2.6" height="4" fill="currentColor"/></svg>',
 Verteilung:'<svg viewBox="0 0 34 14"><path d="M5 13C11 13 12 2 17 2s6 11 12 11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M14 13V4.5h6V13" fill="currentColor" opacity=".55"/><path d="M4 13h26" stroke="currentColor" stroke-width="1"/></svg>',
 'Tabellenk.':'<svg viewBox="0 0 34 14"><rect x="9" y="1.5" width="16" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1.5" width="16" height="3" fill="currentColor"/><path d="M9 8.5h16M14.3 4.5v8.5M19.6 4.5v8.5" stroke="currentColor" stroke-width="1"/></svg>',
 'Wertetab.':'<svg viewBox="0 0 34 14"><rect x="10" y="1.5" width="14" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="1.5" width="14" height="3" fill="currentColor"/><path d="M17 4.5v8.5M10 8.5h14" stroke="currentColor" stroke-width="1"/></svg>',
 Gleichung:'<svg viewBox="0 0 34 14">'+T_('xy=0',9.5)+'<path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>'
};
const APPS=["Berechnung","Statistik","Verteilung","Tabellenk.","Wertetab.","Gleichung"];
function zl(lbl,ziel){ return (ziel||[]).includes(lbl)?' ziel':''; }
function drawHome(S,ziel){
  return `<div class="home"><div class="grid">`+APPS.map((a,i)=>`<div class="ic${i===S.sel?' sel':''}${zl(a,ziel)}"><span class="bd">${i+1}</span>${ICON[a]}<span class="an">${a}</span></div>`).join('')+`</div></div>`;
}
function sbar(S,extra){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span>${extra||''}</div>`; }

// =====================================================================
//  Exakte Rechnung mit Brüchen
// =====================================================================
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const R=(p,q=1)=>{ if(q<0){ p=-p; q=-q; } const g=gcd(p,q); return {p:p/g,q:q/g}; };
const addR=(a,b)=>R(a.p*b.q+b.p*a.q,a.q*b.q), mulR=(a,b)=>R(a.p*b.p,a.q*b.q), negR=a=>R(-a.p,a.q);
function numR(s){ const [i,f='']=s.split(','); return R(parseInt((i||'0')+f,10), 10**f.length); }
function evalT(t,x){
  let total=R(0), sign=1, fs=[], num='';
  const flush=()=>{ if(num){ fs.push(numR(num)); num=''; } };
  const endTerm=()=>{ flush(); if(fs.length){ let p=fs.reduce(mulR); total=addR(total, sign<0?negR(p):p); } fs=[]; };
  for(const k of t){
    if(/^[0-9,]$/.test(k)){ num+=k; continue; }
    if(k==='x'){ flush(); fs.push(x||R(0)); continue; }
    if(k==='sq'){ flush(); const l=fs.pop(); if(l) fs.push(mulR(l,l)); continue; }
    if(k==='+'||k==='-'||k==='neg'){ flush(); const s=k==='+'?1:-1; if(fs.length){ endTerm(); sign=s; } else sign*=s; }
  }
  endTerm(); return total;
}
const dez=r=>{ const v=r.p/r.q; return Number(v.toPrecision(10)).toString().replace('.',',').replace('-','−'); };
const TK={neg:'<span class="ng">−</span>','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>'};
const renderT=(t,caret)=>t.map(k=>TK[k]||k).join('')+(caret?'<span class="caret"></span>':'');
// Zahl-Eingabe (Tabellenbereich): Token-Liste -> rationale Zahl
const numTok=t=>evalT(t,null);


// =====================================================================
//  Rechnerzustand: Integral in der App Berechnung
// =====================================================================
const CATS=["Funktionsanalyse","Wahrscheinlichkeit","…"];
const FA=["Ableitung(d/dx)","Integration(∫)","Summation(Σ)","Produkt(Π)"];
const NEXT='down', PREV='up';
function fresh(){ return {mode:'start', sel:0, shift:false, ig:null, cur:'f', res:null}; }
function neuIg(S){ S.ig={f:[],a:[],b:[]}; S.cur='f'; S.res=null; S.mode='calc'; }
function integ(S){
  const g=S.ig, f=x=>evalT(g.f,x), a=evalT(g.a,null), b=evalT(g.b,null);
  const m=mulR(addR(a,b),R(1,2)), h=mulR(addR(b,negR(a)),R(1,6));
  return mulR(h, addR(addR(f(a),mulR(R(4),f(m))),f(b)));   // Simpson: exakt bis Grad 3
}
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  let sh=false;
  if(S.shift){ S.shift=false; sh=true; if(k==='-') k='neg'; else if(k!=='exe') return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel++; else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='calc'; S.ig=null; S.res=null; }
     return;
   case 'cat':
     if(k==='down') S.sel=Math.min(1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back') S.mode='calc';
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='fa'; S.sel=0; }
     return;
   case 'fa':
     if(k==='down') S.sel=Math.min(FA.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'){ S.mode='cat'; S.sel=0; }
     else if((k==='ok'||k==='exe')&&S.sel===1) neuIg(S);
     return;
   case 'calc':
     if(k==='cat'){ S.mode='cat'; S.sel=0; return; }
     if(k==='integ'){ neuIg(S); return; }
     if(!S.ig) return;
     if(k==='ac'){ S.ig=null; S.res=null; return; }
     if(S.res!==null) return;
     if(NEXT==='down'){
       if(k==='down'){ S.cur=S.cur==='f'?'a':S.cur==='b'?'a':'a'; return; }
       if(k==='up'){ S.cur='b'; return; }
       if(k==='left'&&S.cur!=='f'){ S.cur='f'; return; }
     } else {
       if(k==='right'){ S.cur=S.cur==='f'?'a':'b'; return; }
       if(k==='left'){ S.cur=S.cur==='b'?'a':'f'; return; }
     }
     if(k==='del'){ S.ig[S.cur].pop(); return; }
     if(k==='exe'){ S.res=integ(S); return; }
     if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg'].includes(k)) S.ig[S.cur].push(k);
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function slot(S,w){
  const t=S.ig[w], act=S.res===null&&S.cur===w;
  if(!t.length) return act?'<span class="caret"></span>':'<span class="slot"></span>';
  return renderT(t,act);
}
function drawIg(S){
  return `<span class="ig"><span class="is">∫</span><span class="lim"><span>${slot(S,'b')}</span><span>${slot(S,'a')}</span></span><span class="arg">${slot(S,'f')}</span><span class="dx">d<i>x</i></span></span>`;
}
function draw(S,ziel){
  if(S.mode==='start') return sbar(S)+'<div class="app"><div class="ein"></div><div></div></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='cat'||S.mode==='fa'){
    const L=S.mode==='cat'?CATS:FA, T=S.mode==='cat'?'CATALOG':'Funktionsanalyse';
    return sbar(S)+`<div class="list"><div class="ti">${T}</div>`+L.map((t,i)=>`<div class="it${i===S.sel?' sel':''}${t==='…'?' dim':''}${zl(t,ziel)}"><span>${t}</span></div>`).join('')+'</div>';
  }
  const ein=S.ig?drawIg(S):'<span class="caret"></span>';
  const erg=S.res!==null?`<div class="erg">${dez(S.res)}</div>`:'<div></div>';
  return sbar(S)+`<div class="app"><div class="ein">${ein}</div>${erg}</div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const INT=(a,b,f)=>`<span style="white-space:nowrap">∫<sub style="font-size:13px">${a}</sub><sup style="font-size:13px;margin-left:-6px">${b}</sup> (${f}) d<i>x</i></span>`;
const B1=INT('1','3','0,5<i>x</i><sup>2</sup> + 1');
const T1=[
  {t:"App Berechnung öffnen", a:B1, k:["home","ok"], z:["Berechnung"],
   d:"<p>Drücken Sie <b>HOME</b>. Die App <b>Berechnung</b> ist schon markiert. Öffnen Sie sie mit <b>OK</b>.</p>"},
  {t:"CATALOG ▸ Funktionsanalyse", a:B1, k:["cat","ok"], z:["Funktionsanalyse"],
   d:"<p>Der CW hat keine eigene Integral-Taste. Das Integral steht im <b>CATALOG</b>.</p><p>Drücken Sie <b>CATALOG</b>. <b>Funktionsanalyse</b> steht oben und ist markiert. Bestätigen Sie mit <b>OK</b>.</p>"},
  {t:"Integration(∫) wählen", a:B1, k:["down","ok"], z:["Integration(∫)"],
   d:"<p>Mit <b>▼</b> zu <b>Integration(∫)</b>, dann <b>OK</b>.</p><p>Im Display erscheint die Integral-Vorlage. Der Cursor steht im großen Feld für die Funktion.</p>"},
  {t:"Funktion eingeben", a:B1, k:["0",",","5","x","sq","+","1"],
   d:"<p>Tippen Sie den Term in das Funktionsfeld. Die Variable <b><i>x</i></b> hat eine eigene Taste, das Quadrat die Taste <b>▢²</b>.</p>",
   n:"Das Komma ist die Taste <b>,</b> unten in der Zahlenreihe."},
  {t:"Untere Grenze: 1", a:B1, k:["down","1"],
   d:"<p>Mit <b>▼</b> springt der Cursor zur <b>unteren Grenze</b> (unten am ∫). Tippen Sie <b>1</b>.</p>"},
  {t:"Obere Grenze: 3", a:B1, k:["up","3"],
   d:"<p>Mit <b>▲</b> geht es zur <b>oberen Grenze</b> (oben am ∫). Tippen Sie <b>3</b>.</p>",
   n:"Mit <b>▲ ▼</b> können Sie jederzeit zwischen den Feldern wechseln und etwas verbessern."},
  {t:"Ergebnis als Dezimalzahl", a:B1, k:["shift","exe"],
   d:"<p>Drücken Sie <b>SHIFT</b> und <b>EXE</b> (darüber steht ≈). So kommt das Ergebnis sofort als <b>Dezimalzahl</b>.</p><p>Im Display: <b>6,333333333</b>. Gerundet auf 2 Nachkommastellen: <b>6,33</b>.</p>",
   n:"Mit <b>EXE</b> allein kann der Rechner das Ergebnis als Bruch zeigen (hier 19/3). Für Sachaufgaben brauchen Sie meist die Dezimalzahl."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1",["Integral-Vorlage öffnen: <b>CATALOG</b> ▸ <b>Funktionsanalyse</b> ▸ <b>Integration(∫)</b>","Funktion eingeben ▸ <b>▼</b> untere Grenze ▸ <b>▲</b> obere Grenze","<b>SHIFT</b> <b>EXE</b> ▸ auf 2 Nachkommastellen runden","Negative Grenzen mit <b>SHIFT −</b>","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  c:{name:"Integral berechnen", start:()=>fresh(), steps:T1}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["c"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",home:"HOME ⌂",back:"↶",ok:"OK",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",func:"FUNCTION",tools:"TOOLS",cat:"CATALOG",
 exe:"EXE",ac:"AC",del:"⌫","-":"−","+":"+",x:'<i class="v">x</i>', sq:'<span class="bx"></span><sup>2</sup>'};
const lbl=k=>LBL[k]||k;
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
  $('chips').innerHTML=S.k.length?S.k.map(chip).join(''):'';
  $('dd').innerHTML=(S.d||'')+(S.n?`<div class="note"><b>Hinweis:</b> ${S.n}</div>`:'');
  const fin=pos>=S.k.length;
  $('scr').innerHTML=draw(stateAt(tr,st,pos), fin?(S.z||[]).filter(z=>z==='cell'):(S.z||[]).filter(z=>z!=='cell'));
  $('back').disabled=st===0&&pos===0;
  const last=st===T.steps.length-1, nextT=ORDER[ORDER.indexOf(tr)+1];
  if(last&&fin) done[tr]=true;
  $('next').className='go';
  $('next').textContent=fin ? (last ? (nextT?`Weiter mit ${TRACKS[nextT].name} ▶`:'Fertig ✓') : 'Weiter ▶') : 'Weiter ▶';
  $('next').disabled=fin&&last&&!nextT; { const sk=$('skip'); if(sk) sk.disabled=fin&&last&&!nextT; }
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
    if(pos>=S.k.length){ lock=true; setTimeout(()=>{ lock=false; advance(); },1600); }
  } else {
    if(el){ el.classList.add('bad'); setTimeout(()=>el.classList.remove('bad'),450); }
    let extra='';
    if(k==='exe'&&S.k[pos]==='shift') extra=' Für die Dezimalzahl erst <b>SHIFT</b>, dann <b>EXE</b> (≈).';
    if(k==='right'&&S.k[pos]==='down') extra=' Zur unteren Grenze geht es mit <b>▼</b>.';
    if(k==='right'&&S.k[pos]==='up') extra=' Zur oberen Grenze geht es mit <b>▲</b>.';
    if(k==='-'&&S.k[pos]==='shift'&&S.k[pos+1]==='-') extra=' Für das Vorzeichen erst <b>SHIFT</b>, dann <b>−</b>.';
    if(k==='ok'&&S.k[pos]==='exe') extra=' Hier bestätigen Sie mit <b>EXE</b>.';
    $('stat').innerHTML=`<span class="err">Das war nicht die richtige Taste.</span> Gesucht: ${chip(S.k[pos],pos).replace('now','now big')}${extra}`;
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
const KMAP={Enter:'exe',Escape:'ac',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Backspace:'del',Delete:'del','.':',',',':',','+':'+','-':'-',x:'x',X:'x'};
return {
  ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
  render, press, next, back, KMAP,
  selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
  selectStep:function(i){ st=+i; pos=0; render(); },
  fwd:function(){ if(lock) return; const T=TRACKS[tr], S=T.steps[st];
    if(st<T.steps.length-1){ st++; pos=0; render(); return; }
    const n=ORDER[ORDER.indexOf(tr)+1]; if(n){ tr=n; st=0; pos=0; render(); window.scrollTo({top:0,behavior:'smooth'}); return; }
    if(pos<S.k.length){ pos=S.k.length; render(); } },
  weiter:function(){ if(lock) return; const S=TRACKS[tr].steps[st]; if(pos<S.k.length) press(S.k[pos]); else this.fwd(); },
  bwd:function(){ if(lock) return; if(st>0){ st--; pos=0; } else pos=0; render(); },
  goto:function(t,s,i){ tr=t; st=s; pos=i; render(); },
  snap:function(){ return {tr,st,pos,D:Object.assign({},done)}; },
  restore:function(o){ tr=o.tr; st=o.st; pos=o.pos; Object.keys(done).forEach(k=>delete done[k]); Object.assign(done,o.D); render(); }
};
 }
};
