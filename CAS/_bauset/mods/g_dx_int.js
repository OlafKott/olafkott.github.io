GUIDES["dx_int"]={
 title:"Integrale berechnen",
 css:String.raw`[data-g="dx_int"] .calc{ width:330px; flex:0 0 330px; border-radius:30px; box-shadow:0 6px 22px rgba(0,0,0,.25); background:radial-gradient(#2a2a2e 1px, transparent 1.2px) 0 0/5px 5px, #1e1e21; border:6px solid #e6e6ea; padding:14px 13px 16px; }
[data-g="dx_int"] .calc > *{ position:relative; }
[data-g="dx_int"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; }
[data-g="dx_int"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="dx_int"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="dx_int"] .defl{ font-size:15px; margin-right:2px; }
[data-g="dx_int"] .dlg{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; font-size:15px; }
[data-g="dx_int"] .dlg .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; margin-bottom:3px; }
[data-g="dx_int"] .dlg .r{ display:flex; justify-content:space-between; height:24px; align-items:center; padding:0 4px; }
[data-g="dx_int"] .dlg .r.sel{ background:#141a14; color:#d3ded4; }
[data-g="dx_int"] .dlg .r.sel .caret{ background:#d3ded4; }
[data-g="dx_int"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="dx_int"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:14px; }
[data-g="dx_int"] .tb th{ font-size:11.5px; font-weight:bold; border-bottom:1.3px solid #141a14; height:16px; text-align:center; }
[data-g="dx_int"] .tb th.n, [data-g="dx_int"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="dx_int"] .tb td{ height:21px; text-align:right; padding:0 6px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="dx_int"] .tb td:last-child{ border-right:0; }
[data-g="dx_int"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="dx_int"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:2px; font-size:16px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:20px; }
[data-g="dx_int"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="dx_int"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="dx_int"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="dx_int"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="dx_int"] .chip.b{ background:#2463c9; }
[data-g="dx_int"] .ig{ display:inline-flex; align-items:center; }
[data-g="dx_int"] .ig .is{ font:30px 'Times New Roman',serif; line-height:1; margin-right:1px; }
[data-g="dx_int"] .ig .lim{ display:inline-flex; flex-direction:column; justify-content:space-between; height:38px; font-size:11.5px; margin:0 3px 0 -2px; }
[data-g="dx_int"] .ig .lim > span{ display:flex; align-items:center; min-height:12px; line-height:12px; }
[data-g="dx_int"] .ig .arg{ display:inline-flex; align-items:center; font-size:17px; }
[data-g="dx_int"] .ig .dx{ font-size:15px; margin-left:3px; }
[data-g="dx_int"] .ig .dx i{ font-family:'Times New Roman',serif; font-size:17px; }
[data-g="dx_int"] .slot{ display:inline-block; width:8px; height:10px; border:1.3px solid #141a14; border-radius:1px; vertical-align:middle; }
[data-g="dx_int"] .arg .slot{ width:10px; height:13px; }
[data-g="dx_int"] .lim .caret{ height:11px; }
[data-g="dx_int"] .erg{ text-align:right; font-size:19px; font-weight:bold; letter-spacing:.2px; }
[data-g="dx_int"] .erg small{ font-size:12px; font-weight:normal; margin-right:4px; }
[data-g="dx_int"] .list div.it.dim{ color:#6b776b; }`,
 make:function(){

// =====================================================================
//  Hauptmenü fx-991DE X
// =====================================================================
const ICON={
 Berechnung:'<svg viewBox="0 0 34 14"><text x="17" y="6.8" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">×÷</text><text x="17" y="14" text-anchor="middle" font-size="8.5" font-weight="bold" letter-spacing="1.5" fill="currentColor">+−</text></svg>',
 Komplex:'<svg viewBox="0 0 34 14"><rect x="9" y="1.5" width="16" height="11" fill="none" stroke="currentColor" stroke-width="1.3"/><text x="13.5" y="11" text-anchor="middle" font-size="9" font-weight="bold" font-style="italic" fill="currentColor">i</text><path d="M17.5 11.5l6-8M17.5 11.5h6" stroke="currentColor" stroke-width="1.1" fill="none"/></svg>',
 'Basis-N':'<svg viewBox="0 0 34 14"><text x="17" y="12" text-anchor="middle" font-size="6.5" font-weight="bold" fill="currentColor">2 8 10 16</text></svg>',
 Matrix:'<svg viewBox="0 0 34 14"><path d="M10 1.5h-2v11h2M24 1.5h2v11h-2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="11" y="2" width="5.4" height="4.4" fill="currentColor"/><rect x="17.6" y="2" width="5.4" height="4.4" fill="currentColor"/><rect x="11" y="7.6" width="5.4" height="4.4" fill="currentColor"/><rect x="17.6" y="7.6" width="5.4" height="4.4" fill="currentColor"/></svg>',
 Vektor:'<svg viewBox="0 0 34 14"><path d="M12 12L21 3M12 12h11M12 12V3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
 Statistik:'<svg viewBox="0 0 34 14"><path d="M9 1v12h17" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="11" y="7" width="2.6" height="5" fill="currentColor"/><rect x="14.5" y="3" width="2.6" height="9" fill="currentColor"/><rect x="18" y="5" width="2.6" height="7" fill="currentColor"/><rect x="21.5" y="8" width="2.6" height="4" fill="currentColor"/></svg>',
 Verteilung:'<svg viewBox="0 0 34 14"><path d="M5 13C11 13 12 2 17 2s6 11 12 11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M14 13V4.5h6V13" fill="currentColor" opacity=".55"/><path d="M4 13h26" stroke="currentColor" stroke-width="1"/></svg>',
 'Tabellenk.':'<svg viewBox="0 0 34 14"><rect x="9" y="1.5" width="16" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="1.5" width="16" height="3" fill="currentColor"/><path d="M9 8.5h16M14.3 4.5v8.5M19.6 4.5v8.5" stroke="currentColor" stroke-width="1"/></svg>',
 'Wertetab.':'<svg viewBox="0 0 34 14"><rect x="10" y="1.5" width="14" height="11.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="1.5" width="14" height="3" fill="currentColor"/><path d="M17 4.5v8.5M10 8.5h14" stroke="currentColor" stroke-width="1"/></svg>',
 Gleichung:'<svg viewBox="0 0 34 14"><text x="17" y="11" text-anchor="middle" font-size="9.5" font-weight="bold" fill="currentColor">xy=0</text><path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>',
 Ungleichung:'<svg viewBox="0 0 34 14"><text x="17" y="11" text-anchor="middle" font-size="9.5" font-weight="bold" fill="currentColor">xy&gt;0</text><path d="M5 13.3h24" stroke="currentColor" stroke-width="1.3"/></svg>',
 'Verhältnis':'<svg viewBox="0 0 34 14"><rect x="8" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="19" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="17" cy="5" r=".9" fill="currentColor"/><circle cx="17" cy="9" r=".9" fill="currentColor"/></svg>'
};
const XAPPS=[["Berechnungen","Berechnung"],["Komplexe Zahlen","Komplex"],["Basis-N","Basis-N"],["Matrizen","Matrix"],["Vektoren","Vektor"],["Statistik","Statistik"],["Verteilungen","Verteilung"],["Tabellenkalk.","Tabellenk."],["Wertetabelle","Wertetab."],["Gleichungen","Gleichung"],["Ungleichungen","Ungleichung"],["Verhältnisse","Verhältnis"]];
const XBADGE=["1","2","3","4","5","6","7","8","9","A","B","C"];
function zl(lbl,ziel){ return (ziel||[]).includes(lbl)?' ziel':''; }
function drawMenu(S,ziel){
  const page=S.sel<8?0:1, items=XAPPS.map((a,i)=>[a,i]).slice(page*8,page*8+8);
  return `<div class="xm">${page?'<span class="arr" style="left:50%">▲</span>':'<span class="arr" style="right:62px">▼</span>'}<div class="grid">`+
    items.map(([a,i])=>`<div class="ic${i===S.sel?' sel':''}${zl(a[0],ziel)}">${ICON[a[1]]}<span class="bd">${XBADGE[i]}</span></div>`).join('')+
    `</div><div class="nm">${XBADGE[S.sel]}:${XAPPS[S.sel][0]}</div></div>`;
}
function sbar(S,extra){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span>${extra||''}</div>`; }

// =====================================================================
//  Exakte Rechnung
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
const TK={neg:'−','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>'};
const renderT=(t,caret)=>t.map(k=>TK[k]||k).join('')+(caret?'<span class="caret"></span>':'');


// =====================================================================
//  Rechnerzustand: Integral in der App Berechnungen
// =====================================================================
const CATS=["Funktionsanalyse","Wahrscheinlichkeit","…"];
const FA=["Ableitung(d/dx)","Integration(∫)","Summation(Σ)","Produkt(Π)"];
const NEXT='right', PREV='left';
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
  if(k==='menu'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(11,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='1'||(k==='exe'&&S.sel===0)){ S.mode='calc'; S.ig=null; S.res=null; }
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
  if(S.mode==='home') return drawMenu(S,ziel);
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
  {t:"Modus Berechnungen öffnen", a:B1, k:["menu","1"], z:["Berechnungen"],
   d:"<p>Drücken Sie <b>MENU</b> und dann <b>1</b>. Sie sind im Modus <b>Berechnungen</b>.</p>"},
  {t:"Integral-Taste drücken", a:B1, k:["integ"],
   d:"<p>Der X hat eine eigene Taste <b>∫▢</b> (zweite Reihe, vorletzte Taste).</p><p>Im Display erscheint die Integral-Vorlage. Der Cursor steht im großen Feld für die Funktion.</p>"},
  {t:"Funktion eingeben", a:B1, k:["0",",","5","x","sq","+","1"],
   d:"<p>Tippen Sie den Term in das Funktionsfeld. Die Variable <b><i>x</i></b> hat eine eigene Taste, das Quadrat die Taste <b>▢²</b>.</p>",
   n:"Das Komma ist die Taste <b>,</b> unten in der Zahlenreihe."},
  {t:"Untere Grenze: 1", a:B1, k:["right","1"],
   d:"<p>Mit <b>▶</b> springt der Cursor zur <b>unteren Grenze</b> (unten am ∫). Tippen Sie <b>1</b>.</p>"},
  {t:"Obere Grenze: 3", a:B1, k:["right","3"],
   d:"<p>Mit <b>▶</b> geht es zur <b>oberen Grenze</b> (oben am ∫). Tippen Sie <b>3</b>.</p>",
   n:"Mit <b>◀ ▶</b> können Sie jederzeit zwischen den Feldern wechseln und etwas verbessern."},
  {t:"Ergebnis als Dezimalzahl", a:B1, k:["shift","exe"],
   d:"<p>Drücken Sie <b>SHIFT</b> und <b>=</b> (darüber steht ≈). So kommt das Ergebnis sofort als <b>Dezimalzahl</b>.</p><p>Im Display: <b>6,333333333</b>. Gerundet auf 2 Nachkommastellen: <b>6,33</b>.</p>",
   n:"Mit <b>=</b> allein kann der Rechner das Ergebnis als Bruch zeigen (hier 19/3). Für Sachaufgaben brauchen Sie meist die Dezimalzahl."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1",["Integral-Vorlage öffnen: die Taste <b>∫▢</b>","Funktion eingeben ▸ <b>▶</b> untere Grenze ▸ <b>▶</b> obere Grenze","<b>SHIFT</b> <b>=</b> ▸ auf 2 Nachkommastellen runden","Negative Grenzen mit <b>(−)</b>","Danach: Lösungscode eintragen"])}
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
const LBL={on:"ON",menu:"MENU",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",
 exe:"=",ac:"AC",del:"DEL",neg:"(−)",integ:"∫▢","-":"−","+":"+",x:'<i class="v">x</i>', sq:'<i class="v">x</i><sup>2</sup>'};
const WHITE=/^[0-9,+\-]$|^exe$/;
const lbl=k=>LBL[k]||k;
function chip(k,i){ const s=i<pos?'done':(i===pos?'now':''); const c=k==='shift'?'shift':(k==='ac'||k==='del')?'b':WHITE.test(k)?'w':''; return `<span class="chip ${c} ${s}">${lbl(k)}</span>`; }
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
    if(pos>=S.k.length){ lock=true; setTimeout(()=>{ lock=false; advance(); },1600); }
  } else {
    if(el){ el.classList.add('bad'); setTimeout(()=>el.classList.remove('bad'),450); }
    let extra='';
    if(k==='exe'&&S.k[pos]==='shift') extra=' Für die Dezimalzahl erst <b>SHIFT</b>, dann <b>=</b> (≈).';
    if((k==='down'||k==='up')&&S.k[pos]==='right') extra=' Zur nächsten Grenze geht es mit <b>▶</b>.';
    if(k==='-'&&S.k[pos]==='neg') extra=' Für das Vorzeichen am Anfang nehmen Sie <b>(−)</b>.';
    if(k==='neg'&&S.k[pos]==='-') extra=' Zwischen zwei Summanden nehmen Sie das Rechenzeichen <b>−</b>.';
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
  selectStep:function(i){ st=+i; pos=0; render(); }
};
 }
};
