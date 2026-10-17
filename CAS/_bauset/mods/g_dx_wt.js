GUIDES["dx_wt"]={
 title:"Wertetabellen erstellen",
 css:String.raw`[data-g="dx_wt"] .calc{ width:330px; flex:0 0 330px; border-radius:30px; box-shadow:0 6px 22px rgba(0,0,0,.25); background:radial-gradient(#2a2a2e 1px, transparent 1.2px) 0 0/5px 5px, #1e1e21; border:6px solid #e6e6ea; padding:14px 13px 16px; }
[data-g="dx_wt"] .calc > *{ position:relative; }
[data-g="dx_wt"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; }
[data-g="dx_wt"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="dx_wt"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="dx_wt"] .defl{ font-size:15px; margin-right:2px; }
[data-g="dx_wt"] .dlg{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; font-size:15px; }
[data-g="dx_wt"] .dlg .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; margin-bottom:3px; }
[data-g="dx_wt"] .dlg .r{ display:flex; justify-content:space-between; height:24px; align-items:center; padding:0 4px; }
[data-g="dx_wt"] .dlg .r.sel{ background:#141a14; color:#d3ded4; }
[data-g="dx_wt"] .dlg .r.sel .caret{ background:#d3ded4; }
[data-g="dx_wt"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="dx_wt"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:14px; }
[data-g="dx_wt"] .tb th{ font-size:11.5px; font-weight:bold; border-bottom:1.3px solid #141a14; height:16px; text-align:center; }
[data-g="dx_wt"] .tb th.n,[data-g="dx_wt"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="dx_wt"] .tb td{ height:21px; text-align:right; padding:0 6px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="dx_wt"] .tb td:last-child{ border-right:0; }
[data-g="dx_wt"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="dx_wt"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:2px; font-size:16px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:20px; }
[data-g="dx_wt"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="dx_wt"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="dx_wt"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="dx_wt"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="dx_wt"] .chip.b{ background:#2463c9; }`,
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
//  Rechnerzustand: Modus 9 Wertetabelle (Einstellung: nur f(x))
// =====================================================================
const RNAME=["Start","Ende","Inkre"];
function fresh(){ return {mode:'calc', sel:0, shift:false, ed:[], rng:[['1'],['5'],['1']], rEd:null, rRow:0, tab:null, row:0, col:0}; }
function genTab(S){
  const st=evalT(S.rng[0],null), en=evalT(S.rng[1],null), sw=evalT(S.rng[2],null);
  const xs=[]; let x=st;
  for(let i=0;i<45 && (x.p/x.q)<=(en.p/en.q)+1e-9;i++){ xs.push(x); x=addR(x,sw); }
  S.tab=xs; S.row=0; S.col=0; S.mode='table';
}
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; return; }
  if(k==='menu'){ S.mode='menu'; S.sel=0; return; }
  switch(S.mode){
   case 'menu':
     if(k==='right') S.sel=Math.min(11,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(11,S.sel+4); else if(k==='up') S.sel=Math.max(0,S.sel-4);
     else if(k==='9'||(k==='exe'&&S.sel===8)){ S.mode='tedit'; S.ed=[]; S.tab=null; }
     return;
   case 'tedit':
     if(k==='exe'){ if(S.ed.length){ S.mode='range'; S.rRow=0; S.rEd=null; } return; }
     if(k==='ac'){ S.ed=[]; return; }
     if(k==='del'){ S.ed.pop(); return; }
     if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg'].includes(k)) S.ed.push(k);
     return;
   case 'range':
     if(/^[0-9,]$/.test(k)||k==='neg'){ if(!S.rEd) S.rEd=[]; S.rEd.push(k); return; }
     if(k==='del'&&S.rEd){ S.rEd.pop(); return; }
     if(k==='exe'){ if(S.rEd&&S.rEd.length) S.rng[S.rRow]=S.rEd; S.rEd=null; if(S.rRow<2) S.rRow++; else genTab(S); return; }
     if(k==='down'){ S.rEd=null; S.rRow=Math.min(2,S.rRow+1); return; }
     if(k==='up'){ S.rEd=null; S.rRow=Math.max(0,S.rRow-1); return; }
     if(k==='ac'){ S.mode='tedit'; }
     return;
   case 'table':
     if(k==='down') S.row=Math.min(S.tab.length-1,S.row+1); else if(k==='up') S.row=Math.max(0,S.row-1);
     else if(k==='right') S.col=1; else if(k==='left') S.col=0;
     else if(k==='ac') S.mode='tedit';
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function cell(S,c,x){ return c===0?dez(x):dez(evalT(S.ed,x)); }
function draw(S,ziel){
  if(S.mode==='calc') return sbar(S)+'<div class="app"><div class="ein"><span class="caret"></span></div><div></div></div>';
  if(S.mode==='menu') return drawMenu(S,ziel);
  if(S.mode==='tedit') return sbar(S)+`<div class="app"><div class="ein"><span class="defl"><span class="vx">f</span>(<span class="vx">x</span>)=</span>${renderT(S.ed,true)}</div><div></div></div>`;
  if(S.mode==='range'){
    let h=sbar(S)+`<div class="dlg"><div class="ti">Tabellenbereich</div>`;
    RNAME.forEach((nm,i)=>{ const ed=i===S.rRow&&S.rEd; h+=`<div class="r${i===S.rRow?' sel':''}${zl(nm,ziel)}"><span>${nm}:</span><span>${ed?renderT(S.rEd,true):renderT(S.rng[i],false)}</span></div>`; });
    return h+'</div>';
  }
  const top=Math.max(0,Math.min(S.row-2,S.tab.length-3));
  let h=sbar(S)+`<div class="tb"><table><tr><th class="n"></th><th>x</th><th>f(x)</th></tr>`;
  for(let i=top;i<top+3;i++){ const x=S.tab[i];
    h+=`<tr><td class="n">${x?i+1:''}</td>`+[0,1].map(c=>`<td class="${x&&i===S.row&&c===S.col?'cur'+zl('cell',ziel):''}">${x?cell(S,c,x):''}</td>`).join('')+'</tr>'; }
  return h+`</table><div class="unten">${cell(S,S.col,S.tab[S.row])}</div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const termF=`<i>f</i>(<i>x</i>) = −0,5<i>x</i><sup>2</sup> + 2<i>x</i> + 1`;
const termF2=`<i>f</i>(<i>x</i>) = 2<i>x</i><sup>2</sup> − 3<i>x</i> − 1`;
const B1=termF+'<div class="bereich">Wertetabelle: Start −1 · Ende 5 · Schrittweite 1</div>';
const B2=termF2+'<div class="bereich">Wertetabelle: Start 0 · Ende 2 · Schrittweite 0,5</div>';
const T1=[
  {t:"Modus Wertetabelle öffnen", a:B1, k:["menu","9"],
   d:"<p>Drücken Sie <b>MENU</b> und dann <b>9</b>. Im Display steht <b>f(x)=</b>.</p>",
   n:"Erscheint zusätzlich <b>g(x)=</b>, ist im Setup „f(x),g(x)“ eingestellt. Dann <b>g(x)</b> einfach leer lassen und mit <b>=</b> weiter."},
  {t:"Term eingeben", a:B1, k:["neg","0",",","5","x","sq","+","2","x","+","1"],
   d:"<p>Das Minus <b>am Anfang</b> ist ein Vorzeichen: Taste <b>(−)</b>.</p><p>Die Variable <b>x</b> hat eine eigene Taste oben rechts.</p>",
   n:"<b>f(x) =</b> steht schon da – Sie tippen nur den Term."},
  {t:"Mit = bestätigen", a:B1, k:["exe"], z:["Start"],
   d:"<p>Mit <b>=</b> geht es weiter. Der Rechner fragt nach dem <b>Tabellenbereich</b>: Start, Ende und Inkre.</p>"},
  {t:"Start: −1", a:B1, k:["neg","1","exe"], z:["Start"],
   d:"<p><b>Start</b> ist der erste x-Wert. Tippen Sie −1 (mit <b>(−)</b>) und drücken Sie <b>=</b>.</p>"},
  {t:"Ende: 5", a:B1, k:["5","exe"], z:["Ende"],
   d:"<p><b>Ende</b> ist der letzte x-Wert.</p>"},
  {t:"Inkre: 1", a:B1, k:["1","exe"], z:["Inkre"],
   d:"<p><b>Inkre</b> (Inkrement) ist die <b>Schrittweite</b>: der Abstand zwischen zwei x-Werten. Hier: −1, 0, 1, 2, …</p><p>Nach dem letzten <b>=</b> erscheint die Tabelle.</p>"},
  {t:"Tabelle ablesen", a:B1, k:["right","down","down","down"], z:["cell"],
   d:"<p>Mit <b>▶</b> in die Spalte <b>f(x)</b>, mit <b>▼</b> nach unten blättern.</p><p>Bei <b>x = 2</b> steht <b>f(2) = 3</b>. Das ist der größte Wert in dieser Tabelle.</p>",
   n:"Unten im Display steht der Wert der markierten Zelle noch einmal groß."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1",["<b>AC</b> ▸ zurück zu f(x)= ▸ noch einmal <b>AC</b> ▸ neuen Term eingeben ▸ <b>=</b>","Start, Ende, Inkre jeweils mit <b>=</b> bestätigen","Werte in die Tabelle übertragen – danach die zweite Tabelle mit Schrittweite 0,2"])}
];
const T2=[
  {t:"Zurück zur Funktion", a:B2, k:["ac"],
   d:"<p><b>AC</b> verlässt die Tabelle. Sie sehen wieder <b>f(x)=</b> mit dem alten Term.</p>"},
  {t:"Alten Term löschen", a:B2, k:["ac"],
   d:"<p>Noch einmal <b>AC</b>: Der alte Term ist weg.</p>"},
  {t:"Neuen Term eingeben", a:B2, k:["2","x","sq","-","3","x","-","1","exe"], z:["Start"],
   d:"<p>Hier ist das Minus <b>zwischen</b> zwei Summanden – dafür die normale Taste <b>−</b>. Dann <b>=</b>.</p>",
   n:"Merke: <b>(−)</b> = Vorzeichen am Anfang, <b>−</b> = Rechenzeichen in der Mitte."},
  {t:"Start 0, Ende 2", a:B2, k:["0","exe","2","exe"], z:["Start","Ende"],
   d:"<p>Die alten Werte stehen noch da. Sie überschreiben sie einfach: <b>0</b> ▸ <b>=</b>, <b>2</b> ▸ <b>=</b>.</p>"},
  {t:"Feinere Schrittweite: 0,5", a:B2, k:["0",",","5","exe"], z:["Inkre"],
   d:"<p>Inkre <b>0,5</b> ▸ <b>=</b>. Jetzt stehen in der Tabelle 0; 0,5; 1; 1,5; 2.</p>",
   n:"Eine kleine Schrittweite macht die Tabelle genauer – aber auch länger. Höchstens 45 Zeilen passen hinein."},
  {t:"Vorzeichenwechsel finden", a:B2, k:["right","down","down","down","down"], z:["cell"],
   d:"<p>In die Spalte <b>f(x)</b> und nach unten blättern.</p><p>f(1,5) = <b>−1</b>, f(2) = <b>1</b>: Das Vorzeichen wechselt. Also liegt zwischen <b>x = 1,5</b> und <b>x = 2</b> eine <b>Nullstelle</b>.</p>"},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 2",["Funktion <b>g</b> als f(x) eingeben","Tabelle mit Inkre 2 erstellen und den Vorzeichenwechsel suchen","Feinere Tabelle (Inkre 0,5) erstellen und die Nullstelle ablesen","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  c:{name:"1 · Wertetabelle erstellen", start:()=>fresh(), steps:T1},
  n:{name:"2 · Neue Funktion und feinere Schritte", start:()=>run(fresh(),allK(T1)), steps:T2}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["c","n"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",menu:"MENU",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",
 exe:"=",ac:"AC",del:"DEL",neg:"(−)","-":"−","+":"+",x:'<i class="v">x</i>', sq:'<i class="v">x</i><sup>2</sup>'};
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
