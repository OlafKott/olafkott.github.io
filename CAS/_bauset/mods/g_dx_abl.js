GUIDES["dx_abl"]={
 title:"Ableitung an einer Stelle",
 css:String.raw`[data-g="dx_abl"] .calc{ width:330px; flex:0 0 330px; border-radius:30px; box-shadow:0 6px 22px rgba(0,0,0,.25); background:radial-gradient(#2a2a2e 1px, transparent 1.2px) 0 0/5px 5px, #1e1e21; border:6px solid #e6e6ea; padding:14px 13px 16px; }
[data-g="dx_abl"] .calc > *{ position:relative; }
[data-g="dx_abl"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; }
[data-g="dx_abl"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="dx_abl"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="dx_abl"] .defl{ font-size:15px; margin-right:2px; }
[data-g="dx_abl"] .dlg{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; font-size:15px; }
[data-g="dx_abl"] .dlg .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; margin-bottom:3px; }
[data-g="dx_abl"] .dlg .r{ display:flex; justify-content:space-between; height:24px; align-items:center; padding:0 4px; }
[data-g="dx_abl"] .dlg .r.sel{ background:#141a14; color:#d3ded4; }
[data-g="dx_abl"] .dlg .r.sel .caret{ background:#d3ded4; }
[data-g="dx_abl"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="dx_abl"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:14px; }
[data-g="dx_abl"] .tb th{ font-size:11.5px; font-weight:bold; border-bottom:1.3px solid #141a14; height:16px; text-align:center; }
[data-g="dx_abl"] .tb th.n, [data-g="dx_abl"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="dx_abl"] .tb td{ height:21px; text-align:right; padding:0 6px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="dx_abl"] .tb td:last-child{ border-right:0; }
[data-g="dx_abl"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="dx_abl"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:2px; font-size:16px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:20px; }
[data-g="dx_abl"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="dx_abl"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="dx_abl"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="dx_abl"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="dx_abl"] .chip.b{ background:#2463c9; }
[data-g="dx_abl"] .ein.dd{ font-size:15px; overflow:hidden; }
[data-g="dx_abl"] .ein.dd .vx{ font-size:16px; }
[data-g="dx_abl"] .fr.ddx{ font-size:11px; margin:0 1px 0 0; }
[data-g="dx_abl"] .fr.ddx > span{ padding:0 1px; }
[data-g="dx_abl"] .kl{ font-size:21px; line-height:1; transform:scaleY(1.15); display:inline-block; }
[data-g="dx_abl"] .evb{ display:inline-block; width:1.3px; height:24px; background:#141a14; margin:0 1px 0 2px; vertical-align:middle; }
[data-g="dx_abl"] .evx{ font-size:11px; align-self:flex-end; margin-bottom:2px; white-space:nowrap; display:inline-flex; align-items:center; }
[data-g="dx_abl"] .evx .vx{ font-size:13px; }
[data-g="dx_abl"] .evx .caret{ height:12px; }
[data-g="dx_abl"] .ein.dd sup{ font-size:10px; }
[data-g="dx_abl"] .ein.dd sup .caret{ height:9px; }
[data-g="dx_abl"] .bx.feld{ width:9px; height:11px; border:1.2px dotted #141a14; margin:0 1px; }
[data-g="dx_abl"] .bx.sm{ width:5px; height:6px; border:1px dotted #141a14; }
[data-g="dx_abl"] .erg{ text-align:right; font-size:22px; font-weight:bold; min-height:28px; }`,
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
//  Exakte Rechnung: Polynom-Term -> Ableitung an einer Stelle
// =====================================================================
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const R=(p,q=1)=>{ if(q<0){ p=-p; q=-q; } const g=gcd(p,q); return {p:p/g,q:q/g}; };
const addR=(a,b)=>R(a.p*b.q+b.p*a.q,a.q*b.q), mulR=(a,b)=>R(a.p*b.p,a.q*b.q), negR=a=>R(-a.p,a.q);
const powR=(a,n)=>{ let r=R(1); for(let i=0;i<n;i++) r=mulR(r,a); return r; };
function numR(s){ const [i,f='']=s.split(','); return R(parseInt((i||'0')+f,10), 10**f.length); }
// Token-Liste -> Polynom {Grad: Koeffizient}
function poly(t){
  const P={}; let sign=1, c=null, deg=0, num='', inE=false, eStr='', any=false;
  const flush=()=>{ if(num){ c=c?mulR(c,numR(num)):numR(num); num=''; any=true; } };
  const endTerm=()=>{ flush(); if(any){ let k=c||R(1); if(sign<0) k=negR(k); P[deg]=P[deg]?addR(P[deg],k):k; } c=null; deg=0; any=false; };
  for(const k of t){
    if(inE){ if(/^[0-9]$/.test(k)){ eStr+=k; continue; } inE=false; deg+=Math.max(0,(parseInt(eStr||'1',10))-1); if(k==='right') continue; }
    if(/^[0-9,]$/.test(k)){ num+=k; continue; }
    if(k==='x'){ flush(); deg+=1; any=true; continue; }
    if(k==='sq'){ flush(); deg+=1; continue; }
    if(k==='pow'){ flush(); inE=true; eStr=''; continue; }
    if(k==='+'||k==='-'||k==='neg'){ const s=k==='+'?1:-1; flush(); if(any){ endTerm(); sign=s; } else sign*=s; }
  }
  if(inE){ deg+=Math.max(0,(parseInt(eStr||'1',10))-1); }
  endTerm(); return P;
}
function ableitung(t,a){ const P=poly(t); let s=R(0); for(const d in P){ const n=+d; if(n>0) s=addR(s, mulR(mulR(P[d],R(n)), powR(a,n-1))); } return s; }
const dez=r=>{ const v=r.p/r.q; return Number(v.toPrecision(10)).toString().replace('.',',').replace('-','−'); };
const TK={neg:'−','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>'};
// Term rendern, Exponent nach pow bis ▶ hochgestellt; caret = Cursor am Ende
function renderT(t,caret){
  let h='', inE=false;
  for(const k of t){
    if(inE && !/^[0-9]$/.test(k)){ h+='</sup>'; inE=false; if(k==='right') continue; }
    if(k==='pow'){ h+='<sup>'; inE=true; continue; }
    h+=TK[k]||k;
  }
  if(inE) h+=(t[t.length-1]==='pow'?'<span class="bx sm"></span>':'')+(caret?'<span class="caret"></span>':'')+'</sup>';
  else if(caret) h+='<span class="caret"></span>';
  return h;
}
const inExp=t=>{ let e=false; for(const k of t){ if(k==='pow') e=true; else if(e && !/^[0-9]$/.test(k)) e=false; } return e; };
const leer='<span class="bx feld"></span>';
function drawDD(S){
  const f=S.f.length||S.fld===0 ? renderT(S.f,S.fld===0&&!S.res) : leer;
  const a=S.a.length||S.fld===1 ? renderT(S.a,S.fld===1&&!S.res) : leer;
  return sbar(S)+`<div class="app"><div class="ein dd"><span class="fr ddx"><span>d</span><span>d<span class="vx">x</span></span></span><span class="kl">(</span>${f}<span class="kl">)</span><span class="evb"></span><span class="evx"><span class="vx">x</span>=${a}</span></div><div class="erg">${S.res?dez(S.res):''}</div></div>`;
}
// Gemeinsame Tasten im Ableitungs-Template
function ddKey(S,k){
  if(k==='exe'){ if(S.f.length&&S.a.length){ S.res=ableitung(S.f, poly(S.a)[0]||R(0)); } return true; }
  if(S.res){ // nach dem Ergebnis: ◀ = am Ende weiter bearbeiten
    if(k==='left'){ S.res=null; S.fld=1; return true; }
    if(k==='ac'){ S.mode='calc'; S.res=null; return true; }
    return true;
  }
  const T=S.fld===0?S.f:S.a;
  if(k==='right'){ if(S.fld===0&&inExp(S.f)) S.f.push('right'); else S.fld=1; return true; }
  if(k==='left'){ S.fld=0; return true; }
  if(k==='del'){ T.pop(); return true; }
  if(k==='ac'){ S.mode='calc'; return true; }
  if(/^[0-9,]$/.test(k)||['x','sq','pow','+','-','neg'].includes(k)){ if(S.fld===1&&['x','sq','pow'].includes(k)) return true; T.push(k); return true; }
  return true;
}
function newDD(S){ S.mode='dd'; S.f=[]; S.a=[]; S.fld=0; S.res=null; }
// =====================================================================
//  Rechnerzustand: Modus 1 Berechnungen, SHIFT ∫ = d/dx
// =====================================================================
function fresh(){ return {mode:'calc', sel:0, shift:false, f:[], a:[], fld:0, res:null}; }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; if(k==='integ'&&S.mode==='calc') newDD(S); return; }
  if(k==='menu'){ S.mode='menu'; S.sel=0; return; }
  switch(S.mode){
   case 'menu':
     if(k==='right') S.sel=Math.min(11,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(11,S.sel+4); else if(k==='up') S.sel=Math.max(0,S.sel-4);
     else if(k==='1'||(k==='exe'&&S.sel===0)){ S.mode='calc'; }
     return;
   case 'calc':
     return;
   case 'dd':
     ddKey(S,k); return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='calc') return sbar(S)+'<div class="app"><div class="ein"><span class="caret"></span></div><div></div></div>';
  if(S.mode==='menu') return drawMenu(S,ziel);
  if(S.mode==='dd') return drawDD(S);
  return '';
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const termF=`<i>f</i>(<i>x</i>) = 0,5<i>x</i><sup>3</sup> − 2<i>x</i><sup>2</sup> + 3`;
const termG=`<i>g</i>(<i>x</i>) = −0,5<i>x</i><sup>2</sup> + 2<i>x</i> + 1`;
const B1=termF+'<div class="bereich">Gesucht: Steigung an der Stelle <i>x</i> = 2, also <i>f</i> ′(2)</div>';
const B2=termG+'<div class="bereich">Gesucht: Steigungen <i>g</i> ′(0), <i>g</i> ′(4) und <i>g</i> ′(2)</div>';
const T1=[
  {t:"Modus Berechnungen öffnen", a:B1, k:["menu","1"], z:["Berechnungen"],
   d:"<p>Drücken Sie <b>MENU</b> und dann <b>1</b> für <b>Berechnungen</b>.</p>"},
  {t:"Ableitung aufrufen", a:B1, k:["shift","integ"],
   d:"<p>Über der Integral-Taste steht in Gold <b>d/dx</b>. Also: <b>SHIFT</b>, dann <b>∫▭</b>.</p><p>Im Display erscheint die Vorlage <b>d/dx( ▭ )|x=▭</b> mit zwei leeren Feldern.</p>"},
  {t:"Funktionsterm eingeben", a:B1, k:["0",",","5","x","pow","3","right","-","2","x","sq","+","3"],
   d:"<p>Tippen Sie den Term in das <b>erste Feld</b>.</p><p><b>x³</b>: <b>x</b>, dann <b>x<sup>■</sup></b>, dann <b>3</b>. Mit <b>▶</b> verlassen Sie den Exponenten wieder.</p>",
   n:"Ohne ▶ würde „− 2x² + 3“ mit in den Exponenten rutschen!"},
  {t:"Ins Feld x= wechseln", a:B1, k:["right"],
   d:"<p>Mit <b>▶</b> springt der Cursor aus der Klammer in das Feld <b>x=</b>.</p>"},
  {t:"Stelle eingeben und rechnen", a:B1, k:["2","exe"],
   d:"<p>Tippen Sie <b>2</b> und drücken Sie <b>=</b>.</p><p>Ergebnis: <b><i>f</i> ′(2) = −2</b>. Die Steigung ist negativ – der Graph <b>fällt</b> an der Stelle 2.</p>",
   n:"Positiv = Graph steigt · negativ = Graph fällt · 0 = waagerechte Tangente."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1",["<b>SHIFT</b> <b>∫▭</b> (d/dx)","Term eingeben ▸ <b>▶</b> ▸ Stelle eingeben ▸ <b>=</b>","Negative Stelle mit <b>(−)</b>, z. B. für <i>f</i> ′(−1)","Steigt, fällt oder waagerecht? In die Tabelle eintragen"])}
];
const T2=[
  {t:"Neu anfangen", a:B2, k:["ac","shift","integ"],
   d:"<p><b>AC</b> löscht die alte Rechnung. Dann wieder <b>SHIFT</b> <b>∫▭</b> für d/dx.</p>"},
  {t:"Parabel eingeben", a:B2, k:["neg","0",",","5","x","sq","+","2","x","+","1"],
   d:"<p>Das Minus <b>am Anfang</b> ist ein Vorzeichen: <b>(−)</b>.</p><p><b>x²</b> hat eine eigene Taste – hier brauchen Sie kein ▶.</p>"},
  {t:"Steigung an der Stelle 0", a:B2, k:["right","0","exe"],
   d:"<p><b>▶</b>, dann <b>0</b> und <b>=</b>.</p><p><b><i>g</i> ′(0) = 2</b>: positiv – die Parabel <b>steigt</b> bei <i>x</i> = 0.</p>"},
  {t:"Andere Stelle: Eingabe ändern", a:B2, k:["left","del","4","exe"],
   d:"<p>Sie müssen nicht alles neu tippen: <b>◀</b> holt die Eingabe zurück, der Cursor steht hinter der 0.</p><p><b>DEL</b>, dann <b>4</b> und <b>=</b>: <b><i>g</i> ′(4) = −2</b> – die Parabel <b>fällt</b>.</p>"},
  {t:"Waagerechte Tangente", a:B2, k:["left","del","2","exe"],
   d:"<p>Noch einmal: <b>◀</b>, <b>DEL</b>, <b>2</b>, <b>=</b>.</p><p><b><i>g</i> ′(2) = 0</b>: Die Tangente ist <b>waagerecht</b>. Hier liegt der Scheitelpunkt der Parabel.</p>",
   n:"Erscheint ein Bruch statt einer Dezimalzahl, schalten Sie mit <b>S⇔D</b> um."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 2",["Parabel <b>g</b> einmal eingeben","Für jede Tangente nur die Stelle ändern: <b>◀</b> ▸ <b>DEL</b> ▸ neue Zahl ▸ <b>=</b>","Steigung <i>m</i><sub>t</sub> in die Lücke an der Tangente eintragen","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  c:{name:"1 · Ableitung an einer Stelle", start:()=>fresh(), steps:T1},
  n:{name:"2 · Parabel: Stelle ändern", start:()=>run(fresh(),allK(T1)), steps:T2}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["c","n"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",menu:"MENU",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",
 exe:"=",ac:"AC",del:"DEL",neg:"(−)","-":"−","+":"+",x:'<i class="v">x</i>', sq:'<i class="v">x</i><sup>2</sup>', pow:'<i class="v">x</i><sup>■</sup>', integ:'∫▭'};
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
    if(k==='-'&&S.k[pos]==='neg') extra=' Für das Vorzeichen am Anfang nehmen Sie <b>(−)</b>.';
    if(k==='neg'&&S.k[pos]==='-') extra=' Zwischen zwei Summanden nehmen Sie das Rechenzeichen <b>−</b>.';
    if(k==='exe'&&S.k[pos]==='right') extra=' Erst mit <b>▶</b> ins nächste Feld wechseln.';
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
