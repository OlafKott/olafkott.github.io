GUIDES["wt"]={
 title:"Wertetabellen erstellen",
 css:String.raw`[data-g="wt"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; white-space:nowrap; }
[data-g="wt"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="wt"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="wt"] .defl{ font-size:15px; margin-right:2px; }
[data-g="wt"] .list div.it{ padding:1px 9px; height:19px; line-height:18px; white-space:nowrap; display:flex; justify-content:space-between; }
[data-g="wt"] .list div.it .val{ min-width:60px; text-align:right; }
[data-g="wt"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="wt"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:13px; }
[data-g="wt"] .tb th{ font-size:11px; font-weight:bold; border-bottom:1.3px solid #141a14; height:14px; line-height:12px; text-align:center; }
[data-g="wt"] .tb th.n, [data-g="wt"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="wt"] .tb td{ height:15px; line-height:14px; text-align:right; padding:0 5px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="wt"] .tb td:last-child{ border-right:0; }
[data-g="wt"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="wt"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:1px; font-size:14px; line-height:17px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:18px; }
[data-g="wt"] .tb .unten.leer{ font-size:10px; font-weight:normal; text-align:left; }
[data-g="wt"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="wt"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="wt"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="wt"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="wt"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="wt"] .calc{ transform:scale(.92); transform-origin:top center; } }`,
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
//  Rechnerzustand: App Wertetab.
// =====================================================================
const TOOLS=["Tabellentyp","f(x)/g(x) defin.","Tabellenbereich","Neu berechnen","Editieren"];
const TTYP=["f(x)/g(x)","f(x)","g(x)"];
const FMENU=["f(x)","g(x)","f(x) definieren","g(x) definieren"];
const RNAME=["Start","Ende","Schritt"];
function fresh(){ return {mode:'calc', sel:0, shift:false, typ:0, def:{f:null,g:['0',',','5','x','sq','-','3','x','+','2',',','5']},
  dEd:[], which:'f', rng:[['1'],['5'],['1']], rEd:null, rRow:0, tab:null, row:0, col:0}; }
function genTab(S){
  const st=numTok(S.rng[0]), en=numTok(S.rng[1]), sw=numTok(S.rng[2]);
  const xs=[]; let x=st;
  for(let i=0;i<45 && (x.p/x.q)<=(en.p/en.q)+1e-9;i++){ xs.push(x); x=addR(x,sw); }
  S.tab=xs; S.row=0; S.col=0;
}
function cols(S){ const c=['x']; if(S.typ!==2) c.push('f'); if(S.typ!==1) c.push('g'); return c; }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; if(k==='-') k='neg'; else return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if((k==='ok'||k==='exe')&&S.sel===4){ S.mode='app'; }
     return;
   case 'app':
     if(k==='tools'){ S.mode='tools'; S.sel=0; return; }
     if(k==='func'){ S.mode='fmenu'; S.sel=0; return; }
     if(S.tab){ const n=cols(S).length;
       if(k==='down') S.row=Math.min(S.tab.length-1,S.row+1); else if(k==='up') S.row=Math.max(0,S.row-1);
       else if(k==='right') S.col=Math.min(n-1,S.col+1); else if(k==='left') S.col=Math.max(0,S.col-1); }
     return;
   case 'tools':
     if(k==='down') S.sel=Math.min(TOOLS.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac') S.mode='app';
     else if(k==='ok'||k==='exe'){
       if(S.sel===0){ S.mode='ttyp'; S.sel=S.typ; }
       else if(S.sel===2){ S.mode='range'; S.rRow=0; S.rEd=null; }
       else S.mode='app';
     }
     return;
   case 'ttyp':
     if(k==='down') S.sel=Math.min(TTYP.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac') S.mode='tools';
     else if(k==='ok'||k==='exe'){ S.typ=S.sel; S.tab=null; S.mode='app'; }
     return;
   case 'fmenu':
     if(k==='down') S.sel=Math.min(FMENU.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac') S.mode='app';
     else if((k==='ok'||k==='exe')&&S.sel>=2){ S.which=S.sel===2?'f':'g'; S.dEd=[]; S.mode='def'; }
     return;
   case 'def':
     if(k==='exe'){ S.def[S.which]=S.dEd; S.mode='app'; return; }
     if(k==='back'){ S.mode='app'; return; }
     if(k==='ac'){ S.dEd=[]; return; }
     if(k==='del'){ S.dEd.pop(); return; }
     if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg'].includes(k)) S.dEd.push(k);
     return;
   case 'range':
     if(S.rRow<3){
       if(/^[0-9,]$/.test(k)||k==='neg'){ if(!S.rEd) S.rEd=[]; S.rEd.push(k); return; }
       if(k==='del'&&S.rEd){ S.rEd.pop(); return; }
       if(k==='exe'||k==='ok'){ if(S.rEd&&S.rEd.length) S.rng[S.rRow]=S.rEd; S.rEd=null; S.rRow++; return; }
       if(k==='down'){ S.rEd=null; S.rRow=Math.min(3,S.rRow+1); return; }
       if(k==='up'){ S.rEd=null; S.rRow=Math.max(0,S.rRow-1); return; }
     } else {
       if(k==='exe'||k==='ok'){ genTab(S); S.mode='app'; return; }
       if(k==='up'){ S.rRow=2; return; }
     }
     if(k==='back'||k==='ac') S.mode='app';
     return;
   case 'calc':
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function cellVal(S,c,x){ if(c==='x') return dez(x); const d=S.def[c]; return d&&d.length?dez(evalT(d,x)):''; }
function drawTab(S,ziel){
  const C=cols(S), names={x:'x',f:'f(x)',g:'g(x)'};
  let h=sbar(S)+`<div class="tb"><table><tr><th class="n"></th>${C.map(c=>`<th>${names[c]}</th>`).join('')}</tr>`;
  const n=S.tab?S.tab.length:0, top=S.tab?Math.max(0,Math.min(S.row-3,n-4)):0;
  for(let i=top;i<top+4;i++){
    const x=S.tab&&S.tab[i];
    h+=`<tr><td class="n">${x?i+1:''}</td>`+C.map((c,j)=>`<td class="${x&&i===S.row&&j===S.col?'cur'+zl('cell',ziel):''}">${x?cellVal(S,c,x):''}</td>`).join('')+'</tr>';
  }
  h+='</table>';
  if(S.tab) h+=`<div class="unten">${cellVal(S,C[S.col],S.tab[S.row])}</div>`;
  else h+=`<div class="unten leer">Tabellenbereich mit TOOLS festlegen</div>`;
  return h+'</div>';
}
function draw(S,ziel){
  if(S.mode==='calc') return sbar(S)+'<div class="app"><div class="ein"><span class="caret"></span></div><div></div></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='app') return drawTab(S,ziel);
  if(['tools','ttyp','fmenu'].includes(S.mode)){
    const L={tools:TOOLS,ttyp:TTYP,fmenu:FMENU}[S.mode], T={tools:'TOOLS',ttyp:'Tabellentyp',fmenu:'FUNCTION'}[S.mode];
    const off=Math.max(0,S.sel-3);
    return sbar(S)+`<div class="list"><div class="ti">${T}</div>`+L.slice(off,off+4).map((t,i)=>`<div class="it${i+off===S.sel?' sel':''}${zl(t,ziel)}"><span>${t}</span></div>`).join('')+'</div>';
  }
  if(S.mode==='def') return sbar(S)+`<div class="app"><div class="ein"><span class="defl"><span class="vx">${S.which}</span>(<span class="vx">x</span>)=</span>${renderT(S.dEd,true)}</div><div></div></div>`;
  if(S.mode==='range'){
    let h=sbar(S)+`<div class="list"><div class="ti">Tabellenbereich</div>`;
    RNAME.forEach((nm,i)=>{ const ed=i===S.rRow&&S.rEd; const v=ed?renderT(S.rEd,true):renderT(S.rng[i],false);
      h+=`<div class="it${i===S.rRow?' sel':''}${zl(nm,ziel)}"><span>${nm}:</span><span class="val">${v}</span></div>`; });
    h+=`<div class="it${S.rRow===3?' sel':''}${zl('Ausführen',ziel)}"><span>Ausführen</span></div>`;
    return h+'</div>';
  }
  return '';
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const termF=`<i>f</i>(<i>x</i>) = −0,5<i>x</i><sup>2</sup> + 2<i>x</i> + 1`;
const termF2=`<i>f</i>(<i>x</i>) = 2<i>x</i><sup>2</sup> − 3<i>x</i> − 1`;
const B1=termF+'<div class="bereich">Wertetabelle: Start −1 · Ende 5 · Schritt 1</div>';
const B2=termF2+'<div class="bereich">Wertetabelle: Start 0 · Ende 2 · Schritt 0,5</div>';
const T1=[
  {t:"App Wertetab. öffnen", a:B1, k:["home","down","right","ok"], z:["Wertetab."],
   d:"<p>Drücken Sie <b>HOME</b>. Gehen Sie mit <b>▼</b> und <b>▶</b> zur App <b>Wertetab.</b> und öffnen Sie sie mit <b>OK</b>.</p><p>Sie sehen eine leere Tabelle.</p>"},
  {t:"Tabellentyp: nur f(x)", a:B1, k:["tools","ok","down","ok"], z:["Tabellentyp","f(x)"],
   d:"<p><b>TOOLS</b> ▸ <b>Tabellentyp</b> ▸ <b>OK</b>. Wählen Sie mit <b>▼</b> den Typ <b>f(x)</b> und bestätigen Sie mit <b>OK</b>.</p>",
   n:"Ab Werk zeigt die Tabelle <b>f(x) und g(x)</b>. Mit nur einer Funktion passen bis zu <b>45 Zeilen</b> in die Tabelle (sonst 30)."},
  {t:"f(x) definieren", a:B1, k:["func","down","down","ok"], z:["f(x) definieren"],
   d:"<p><b>FUNCTION</b> ▸ mit <b>▼</b> zu <b>f(x) definieren</b> ▸ <b>OK</b>. Im Display steht <b>f(x)=</b>.</p>",
   n:"Das kennen Sie schon vom Thema Funktionswerte. Eine alte Funktion f wird überschrieben."},
  {t:"Term eingeben und speichern", a:B1, k:["shift","-","0",",","5","x","sq","+","2","x","+","1","exe"],
   d:"<p>Minus am Anfang: <b>SHIFT</b> und <b>−</b>. Die Variable <b>x</b> hat eine eigene Taste. Mit <b>EXE</b> speichern.</p>"},
  {t:"Tabellenbereich öffnen", a:B1, k:["tools","down","down","ok"], z:["Tabellenbereich"],
   d:"<p><b>TOOLS</b> ▸ mit <b>▼</b> zu <b>Tabellenbereich</b> ▸ <b>OK</b>.</p><p>Hier legen Sie fest, welche x-Werte in der Tabelle stehen.</p>"},
  {t:"Start: −1", a:B1, k:["shift","-","1","exe"], z:["Start"],
   d:"<p><b>Start</b> ist der erste x-Wert. Tippen Sie −1 (mit <b>SHIFT −</b>) und drücken Sie <b>EXE</b>.</p>"},
  {t:"Ende: 5", a:B1, k:["5","exe"], z:["Ende"],
   d:"<p><b>Ende</b> ist der letzte x-Wert.</p>"},
  {t:"Schritt: 1", a:B1, k:["1","exe"], z:["Schritt"],
   d:"<p><b>Schritt</b> ist der Abstand zwischen zwei x-Werten. Hier: −1, 0, 1, 2, …</p>"},
  {t:"Ausführen", a:B1, k:["exe"], z:["Ausführen"],
   d:"<p>Der Cursor steht auf <b>Ausführen</b>. Mit <b>EXE</b> wird die Tabelle erstellt.</p>"},
  {t:"Tabelle ablesen", a:B1, k:["right","down","down","down"], z:["cell"],
   d:"<p>Mit <b>▶</b> in die Spalte <b>f(x)</b>, mit <b>▼</b> nach unten blättern.</p><p>Bei <b>x = 2</b> steht <b>f(2) = 3</b>. Das ist der größte Wert in dieser Tabelle.</p>",
   n:"Unten im Display steht der Wert der markierten Zelle noch einmal groß."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1",["<b>FUNCTION</b> ▸ <b>f(x) definieren</b> ▸ neuen Term eingeben ▸ <b>EXE</b>","<b>TOOLS</b> ▸ <b>Tabellenbereich</b> ▸ Start, Ende, Schritt ▸ <b>Ausführen</b>","Werte in die Tabelle übertragen – danach die zweite Tabelle mit Schrittweite 0,2"])}
];
const T2=[
  {t:"Neue Funktion definieren", a:B2, k:["func","down","down","ok"], z:["f(x) definieren"],
   d:"<p>Wieder <b>FUNCTION</b> ▸ <b>f(x) definieren</b>. Die alte Funktion wird überschrieben.</p>"},
  {t:"Term eingeben", a:B2, k:["2","x","sq","-","3","x","-","1","exe"],
   d:"<p>Hier ist das Minus <b>zwischen</b> zwei Summanden – dafür nur die Taste <b>−</b>.</p>",
   n:"Merke: <b>SHIFT −</b> = Vorzeichen am Anfang, <b>−</b> = Rechenzeichen in der Mitte."},
  {t:"Tabellenbereich öffnen", a:B2, k:["tools","down","down","ok"], z:["Tabellenbereich"],
   d:"<p><b>TOOLS</b> ▸ <b>Tabellenbereich</b>. Die alten Werte stehen noch da – Sie überschreiben sie.</p>"},
  {t:"Start 0, Ende 2", a:B2, k:["0","exe","2","exe"], z:["Start","Ende"],
   d:"<p>Start <b>0</b> ▸ <b>EXE</b>, Ende <b>2</b> ▸ <b>EXE</b>.</p>"},
  {t:"Feinere Schrittweite: 0,5", a:B2, k:["0",",","5","exe","exe"], z:["Schritt","Ausführen"],
   d:"<p>Schritt <b>0,5</b> ▸ <b>EXE</b>, dann auf <b>Ausführen</b> noch einmal <b>EXE</b>.</p><p>Jetzt stehen in der Tabelle 0; 0,5; 1; 1,5; 2.</p>",
   n:"Eine kleine Schrittweite macht die Tabelle genauer – aber auch länger."},
  {t:"Vorzeichenwechsel finden", a:B2, k:["right","down","down","down","down"], z:["cell"],
   d:"<p>In die Spalte <b>f(x)</b> und nach unten blättern.</p><p>f(1,5) = <b>−1</b>, f(2) = <b>1</b>: Das Vorzeichen wechselt. Also liegt zwischen <b>x = 1,5</b> und <b>x = 2</b> eine <b>Nullstelle</b>.</p>"},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 2",["Funktion <b>g</b> als f(x) definieren","Tabelle mit Schritt 2 erstellen und den Vorzeichenwechsel suchen","Feinere Tabelle (Schritt 0,5) erstellen und die Nullstelle ablesen","Danach: Lösungscode eintragen"])}
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
const LBL={on:"ON",home:"HOME ⌂",back:"↶",ok:"OK",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",func:"FUNCTION",tools:"TOOLS",
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
