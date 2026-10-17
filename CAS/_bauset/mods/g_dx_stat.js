GUIDES["dx_stat"]={
 title:"Lage- und Streuungsmaße",
 css:String.raw`[data-g="dx_stat"] .edw{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 6px 0; }
[data-g="dx_stat"] table.ed{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:13px; }
[data-g="dx_stat"] table.ed td{ border:1px solid #141a14; height:17px; padding:0 5px; text-align:right; }
[data-g="dx_stat"] table.ed td.rn{ width:22px; text-align:center; font-size:10.5px; border-left:0; }
[data-g="dx_stat"] table.ed tr.hd td{ text-align:center; font-weight:bold; font-size:11.5px; background:#c3cfc4; }
[data-g="dx_stat"] table.ed td.cur{ background:#141a14; color:#d3ded4; }
[data-g="dx_stat"] .edb{ position:absolute; left:6px; right:8px; bottom:3px; text-align:right; font-size:15px; height:18px; }
[data-g="dx_stat"] .res{ position:absolute; left:0; right:0; top:14px; bottom:0; padding:0 10px; }
[data-g="dx_stat"] .res .rl{ display:grid; grid-template-columns:52px 14px 1fr; height:20px; line-height:20px; font-size:15px; }
[data-g="dx_stat"] .res .rl b{ text-align:right; font-weight:bold; }
[data-g="dx_stat"] .res .rl.ziel2{ background:#f3e3a6; outline:2px solid var(--hit); outline-offset:-1px; }
[data-g="dx_stat"] .task .term table.dt{ border-collapse:collapse; font:16px Arial,sans-serif; margin:4px 0 2px; }
[data-g="dx_stat"] .task .term table.dt td, [data-g="dx_stat"] .task .term table.dt th{ border:1px solid #c3c8d0; padding:2px 10px; text-align:center; }
[data-g="dx_stat"] .task .term table.dt th{ background:#eef0f3; font-family:Cambria,Georgia,serif; font-style:italic; }`,
 make:function(){

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
//  Hauptmenü fx-991DE X (MENU)
// =====================================================================
const XAPPS=[["Berechnungen","Berechnung"],["Komplexe Zahlen","Komplex"],["Basis-N","Basis-N"],["Matrizen","Matrix"],["Vektoren","Vektor"],["Statistik","Statistik"],["Verteilungen","Verteilung"],["Tabellenkalk.","Tabellenk."],["Wertetabelle","Wertetab."],["Gleichungen","Gleichung"],["Ungleichungen","Ungleichung"],["Verhältnisse","Verhältnis"]];
const XBADGE=["1","2","3","4","5","6","7","8","9","A","B","C"];
function drawMenu(S,ziel){
  const page=S.sel<8?0:1, items=XAPPS.map((a,i)=>[a,i]).slice(page*8,page*8+8);
  return `<div class="xm">${page?'<span class="arr" style="left:50%">▲</span>':'<span class="arr" style="right:62px">▼</span>'}<div class="grid">`+
    items.map(([a,i])=>`<div class="ic${i===S.sel?' sel':''}${zl(a[0],ziel)}">${ICON[a[1]]}<span class="bd">${XBADGE[i]}</span></div>`).join('')+
    `</div><div class="nm">${XBADGE[S.sel]}:${XAPPS[S.sel][0]}</div></div>`;
}
function menuNav(S,k){
  if(k==='right') S.sel=Math.min(XAPPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
  else if(k==='down') S.sel=Math.min(XAPPS.length-1,S.sel+4); else if(k==='up') S.sel=Math.max(0,S.sel-4);
  else return false;
  return true;
}
function nlist(S,L,ziel){ return sbar(S)+'<div class="nlist">'+L.map(t=>`<div class="${zl(t,ziel).trim()}">${t}</div>`).join('')+'</div>'; }

// =====================================================================
//  fx-991DE X: Statistik
// =====================================================================
const TYPM=["1:1-Variable","2:y=a+bx","3:y=a+bx+cx²","4:y=a+b·ln(x)"];
const OPTM=["1:Typ auswählen","2:Editor","3:1-Variab-Berech","4:Statistik-Berech"];
const EDITM=["1:Zeile einfügen","2:Alles löschen"];
const SET1=["1:Eingabe/Ausgabe","2:Winkeleinheit","3:Zahlenformat","4:ENG-Symbol"];
const SET2=["1:Bruchergebnis","2:Komplex","3:Statistik","4:Tabellenkalk."];
const FRQ=["Häufigkeit?","1:Ein","2:Aus"];
function fresh(mode){ return {mode:mode||'calc', sel:0, freq:false, x:[], f:[], r:0, c:0, buf:'', ry:0, shift:false}; }
function clearData(S){ S.x=[]; S.f=[]; S.r=0; S.c=0; S.buf=''; }
function values(S){ const v=[]; S.x.forEach((x,i)=>{ const h=S.freq?(S.f[i]??1):1; for(let k=0;k<h;k++) v.push(x); }); return v; }
const medA=s=>{ const n=s.length; return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2; };
function kenn(v){
  const s=[...v].sort((a,b)=>a-b), n=s.length, h=Math.floor(n/2);
  const sum=s.reduce((a,b)=>a+b,0), sum2=s.reduce((a,b)=>a+b*b,0), m=sum/n, ss=s.reduce((a,b)=>a+(b-m)**2,0);
  return {n, mean:m, sum, sum2, var:ss/n, sig:Math.sqrt(ss/n), var1:ss/(n-1), sx:Math.sqrt(ss/(n-1)),
          min:s[0], q1:medA(s.slice(0,h)), med:medA(s), q3:medA(s.slice(h+n%2)), max:s[n-1]};
}
function fmt(v){
  if(Math.abs(v-Math.round(v))<1e-9) return String(Math.round(v)).replace('-','−');
  return Number(v.toPrecision(10)).toString().replace('.',',').replace('-','−');
}
function resLines(S){
  const k=kenn(values(S));
  return [["x̄",k.mean],["Σx",k.sum],["Σx²",k.sum2],["σ²x",k.var],["σx",k.sig],["s²x",k.var1],["sx",k.sx],["n",k.n],
          ["min(x)",k.min],["Q₁",k.q1],["Med",k.med],["Q₃",k.q3],["max(x)",k.max]];
}
const VIS=5;
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false;
    if(k==='ac'){ S.mode='off'; return; }
    if(k==='menu'){ S.back=S.mode; S.mode='set1'; return; }
    return; }
  if(k==='menu'){ S.mode='menu'; S.sel=0; return; }
  switch(S.mode){
   case 'menu':
     if(menuNav(S,k)) return;
     if(k==='6'||(k==='exe'&&S.sel===5)){ S.mode='stype'; }
     if(k==='1'||(k==='exe'&&S.sel===0)){ S.mode='calc'; }
     return;
   case 'stype': if(k==='1'){ S.mode='edit'; clearData(S); } return;
   case 'optn': if(k==='3'){ S.mode='res'; S.ry=0; } else if(k==='2'){ S.mode='editm'; } else if(k==='ac') S.mode='edit'; return;
   case 'editm': if(k==='2'){ clearData(S); S.mode='edit'; } else if(k==='ac') S.mode='edit'; return;
   case 'set1': if(k==='down') S.mode='set2'; else if(k==='ac') S.mode=S.back||'edit'; return;
   case 'set2': if(k==='up') S.mode='set1'; else if(k==='3') S.mode='frq'; else if(k==='ac') S.mode=S.back||'edit'; return;
   case 'frq': if(k==='1'||k==='2'){ const nf=(k==='1'); if(nf!==S.freq){ S.freq=nf; clearData(S); } S.mode=S.back||'edit'; } return;
   case 'res':
     if(k==='down') S.ry=Math.min(13-VIS,S.ry+1);
     else if(k==='up') S.ry=Math.max(0,S.ry-1);
     else if(k==='ac') S.mode='edit';
     return;
   case 'edit': {
     const col=S.c===0?S.x:S.f;
     if(/^[0-9]$/.test(k)||k===','){ S.buf+=k; return; }
     if(k==='del'){ if(S.buf) S.buf=S.buf.slice(0,-1); return; }
     if(k==='ac'){ S.buf=''; return; }
     if(k==='exe'){
       if(!S.buf){ return; }
       const val=parseFloat(S.buf.replace(',','.'));
       col[S.r]=val; if(S.c===0&&S.freq&&S.f[S.r]===undefined) S.f[S.r]=1;
       S.buf=''; S.r=Math.min(S.r+1, S.c===0?S.x.length:S.x.length-1); return;
     }
     if(k==='up'){ S.buf=''; S.r=Math.max(0,S.r-1); return; }
     if(k==='down'){ S.buf=''; S.r=Math.min(S.c===0?S.x.length:S.x.length-1,S.r+1); return; }
     if(k==='right'&&S.freq){ S.buf=''; S.c=1; S.r=Math.min(S.r,S.x.length-1); return; }
     if(k==='left'){ S.buf=''; S.c=0; return; }
     if(k==='optn'){ S.mode='optn'; return; }
     return; }
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='calc') return sbar(S)+'<div class="app"><div class="ein"><span class="caret"></span></div><div class="aus"></div></div>';
  if(S.mode==='menu') return drawMenu(S,ziel);
  if(S.mode==='stype') return nlist(S,TYPM,ziel);
  if(S.mode==='optn') return nlist(S,OPTM,ziel);
  if(S.mode==='editm') return nlist(S,EDITM,ziel);
  if(S.mode==='set1') return sbar(S,'<span class="histmark">▼</span>')+nlist({shift:false},SET1,ziel).replace(/^<div class="sb">.*?<\/div>/,'');
  if(S.mode==='set2') return sbar(S,'<span class="histmark">▲</span>')+nlist({shift:false},SET2,ziel).replace(/^<div class="sb">.*?<\/div>/,'');
  if(S.mode==='frq') return nlist(S,FRQ,ziel);
  if(S.mode==='res'){
    const L=resLines(S).slice(S.ry,S.ry+VIS);
    return sbar(S,`<span class="histmark">${S.ry>0?'▲':''}${S.ry<13-VIS?'▼':''}</span>`)+'<div class="res">'+
      L.map(([a,v])=>`<div class="rl${zl(a,ziel).replace(' ziel',' ziel2')}"><span>${a}</span><span>=</span><b>${fmt(v)}</b></div>`).join('')+'</div>';
  }
  const n=S.x.length, rowsTotal=Math.max(n+1,1), top=Math.max(0,Math.min(S.r-1, rowsTotal-3));
  let h='<table class="ed"><tr class="hd"><td class="rn"></td><td>x</td>'+(S.freq?'<td>Freq</td>':'')+'</tr>';
  for(let r=top;r<top+3;r++){
    const cell=(v,c)=>`<td class="${S.r===r&&S.c===c?'cur':''}">${v===undefined?'':fmt(v)}</td>`;
    h+=`<tr><td class="rn">${r+1}</td>${cell(S.x[r],0)}${S.freq?cell(S.f[r],1):''}</tr>`;
  }
  h+='</table>';
  const cv=(S.c===0?S.x:S.f)[S.r];
  const bottom=S.buf?`${S.buf}<span class="caret"></span>`:(cv===undefined?'':fmt(cv));
  return sbar(S,'<span class="histmark">STAT</span>')+`<div class="edw">${h}<div class="edb">${bottom}</div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner eingeben, Werte in die Tabelle eintragen, dann <b>Weiter</b>.</p></div>`;
const seq=a=>a.flatMap(v=>String(v).split('').concat(['exe']));
const UR=[4,7,5,9,5,6], HX=[1,2,3,4], HF=[3,5,2,2];
const D4=['down','down','down','down'];
const kUr=['menu','6','1',...seq(UR)];
const tabUr='<table class="dt"><tr>'+UR.map(v=>`<td>${v}</td>`).join('')+'</tr></table>';
const tabHf='<table class="dt"><tr><th>x<sub>i</sub></th>'+HX.map(v=>`<td>${v}</td>`).join('')+'</tr><tr><th>h<sub>i</sub></th>'+HF.map(v=>`<td>${v}</td>`).join('')+'</tr></table>';
const hStart=()=>run(fresh('calc'),[...kUr]);
const TRACKS={
 u:{ name:"1 · Urliste", start:()=>fresh('calc'), steps:[
  {t:"MENU öffnen", a:"Hauptmenü öffnen", k:["menu"], z:["Statistik"],
   d:"<p>Wir brauchen den Modus <b>Statistik</b>. Er hat die Kurzwahl <b>6</b>.</p>"},
  {t:"Statistik wählen", a:"Taste 6 drücken", k:["6"], z:["1:1-Variable"],
   d:"<p>Der Rechner fragt nach dem Typ.</p>"},
  {t:"1-Variable", a:"Eine Liste von Werten auswerten", k:["1"],
   d:"<p><b>1</b> = <b>1-Variable</b>. Die Tabelle (Statistik-Editor) öffnet sich.</p>"},
  {t:"Werte eingeben", a:"Urliste eintippen"+tabUr, k:seq(UR),
   d:"<p>Jeden Wert mit <b>=</b> bestätigen. Der Rechner springt in die nächste Zeile.</p>",
   n:"Vertippt? Mit <b>▲</b> zur Zelle, richtigen Wert tippen, <b>=</b>."},
  {t:"Ergebnisse anzeigen", a:"OPTN ▸ 3: 1-Variab-Berech", k:["optn","3"], z:["3:1-Variab-Berech"],
   d:"<p><b>OPTN</b> öffnet ein Menü, <b>3</b> zeigt alle Ergebnisse. Oben steht der Mittelwert: <b>x̄ = 6</b></p>"},
  {t:"Standardabweichung", a:"Nach unten blättern bis σx", k:D4, z:["σx"],
   d:"<p><b>σx = 1,632993162</b> ist die Standardabweichung. <b>n = 6</b> ist die Anzahl der Werte.</p>",
   n:"<b>sx</b> (zwei Zeilen tiefer) brauchen Sie nicht. Nehmen Sie immer <b>σx</b>."},
  {t:"Minimum, Quartile, Maximum", a:"Weiter nach unten blättern", k:D4, z:["min(x)","Q₁","Med","Q₃","max(x)"],
   d:"<p>min(x) = <b>4</b>, Q₁ = <b>5</b>, Med = <b>5,5</b>, Q₃ = <b>7</b>, max(x) = <b>9</b></p>",
   n:"Spannweite = max − min = 5. Quartilsabstand = Q₃ − Q₁ = 2."},
  {t:"Zurück zur Tabelle", a:"Ergebnisse schließen", k:["ac"], d:"<p>Mit <b>AC</b> sind Sie wieder in der Tabelle. Die Werte bleiben gespeichert.</p>"},
  {t:"Tabelle leeren", a:"OPTN ▸ 2: Editor ▸ 2: Alles löschen", k:["optn","2","2"], z:["2:Editor","2:Alles löschen"],
   d:"<p>So starten Sie jede neue Aufgabe mit einer leeren Tabelle.</p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("a) Urliste",["Werte der Urliste eingeben","Kennwerte in die Spalte <b>a)</b> eintragen","Spannweite, Quartilsabstand und Modalwert selbst bestimmen"])}
 ]},
 h:{ name:"2 · Häufigkeitstabelle", start:hStart, steps:[
  {t:"SETUP öffnen", a:"SHIFT + MENU", k:["shift","menu"],
   d:"<p>Über <b>MENU</b> steht in Gelb <b>SETUP</b> – die Einstellungen.</p>"},
  {t:"Häufigkeit einschalten", a:"▼ ▸ 3: Statistik ▸ 1: Ein", k:["down","3","1"], z:["3:Statistik","1:Ein"],
   d:"<p>Mit <b>▼</b> zur zweiten Seite, <b>3</b> = Statistik, <b>1</b> = Ein. Die Spalte <b>Freq</b> erscheint.</p>",
   n:"Beim Umschalten werden alle Werte in der Tabelle <b>gelöscht</b>."},
  {t:"Werte x eingeben", a:"Spalte x: 1, 2, 3, 4"+tabHf, k:seq(HX), d:"<p>In der Spalte <b>Freq</b> erscheint automatisch eine 1.</p>"},
  {t:"Zur Spalte Freq", a:"Nach oben und nach rechts", k:["up","up","up","up","right"], d:"<p>Mit <b>▲</b> nach oben, mit <b>▶</b> in die Spalte Freq.</p>"},
  {t:"Häufigkeiten eingeben", a:"Spalte Freq: 3, 5, 2, 2"+tabHf, k:seq(HF), d:"<p>Die vorhandenen Einsen werden überschrieben.</p>"},
  {t:"Ergebnisse anzeigen", a:"OPTN ▸ 3: 1-Variab-Berech", k:["optn","3"], z:["3:1-Variab-Berech"], d:"<p>Mittelwert: <b>x̄ = 2,25</b></p>"},
  {t:"Standardabweichung und n", a:"Nach unten blättern bis σx", k:D4, z:["σx","n"],
   d:"<p><b>σx = 1,010362971</b>, <b>n = 12</b></p>", n:"<b>n</b> ist hier die Summe der Häufigkeiten: 3 + 5 + 2 + 2 = 12."},
  {t:"Minimum, Quartile, Maximum", a:"Weiter nach unten blättern", k:D4, z:["min(x)","Q₁","Med","Q₃","max(x)"],
   d:"<p>min(x) = <b>1</b>, Q₁ = <b>1,5</b>, Med = <b>2</b>, Q₃ = <b>3</b>, max(x) = <b>4</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("b) Häufigkeitstabelle",["Tabelle leeren (AC, dann OPTN ▸ 2 ▸ 2)","Werte x und Freq eingeben – die Häufigkeit bleibt eingeschaltet","Kennwerte in die Spalte <b>b)</b> eintragen","Danach: Lösungscode eintragen"])}
 ]}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["u","h"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const BX='<span class="bx"></span>';
const LBL={on:"ON",menu:"MENU",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",optn:"OPTN",
 exe:"=",ac:"AC",del:"DEL",ans:"Ans",sd:"S⇔D",neg:"(−)",sto:"STO",alpha:"ALPHA",deg:"°′″","*":"×","/":"÷","-":"−",
 frac:'<span class="mf"><i></i><b></b><i></i></span>', sqrt:'√'+BX, sq:'<i>x</i><sup>2</sup>', pow:'<i>x</i><sup>▫</sup>'};
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
  $('chips').innerHTML=S.k.length?S.k.map(chip).join(''):(S.ab?'':'<span class="chip plus">Nur ablesen – keine Taste drücken</span>');
  $('dd').innerHTML=(S.d||'')+(S.n?`<div class="note"><b>Hinweis:</b> ${S.n}</div>`:'');
  $('scr').innerHTML=draw(stateAt(tr,st,pos), S.z);
  $('back').disabled=st===0&&pos===0;
  const last=st===T.steps.length-1, nextT=ORDER[ORDER.indexOf(tr)+1];
  const fin=pos>=S.k.length;
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
