GUIDES["binom"]={
 title:"Binomialverteilung",
 css:String.raw`[data-g="binom"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; white-space:nowrap; }
[data-g="binom"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="binom"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="binom"] .defl{ font-size:15px; margin-right:2px; }
[data-g="binom"] .list div.it{ padding:1px 9px; height:19px; line-height:18px; white-space:nowrap; display:flex; justify-content:space-between; }
[data-g="binom"] .list div.it .val{ min-width:60px; text-align:right; }
[data-g="binom"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="binom"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:13px; }
[data-g="binom"] .tb th{ font-size:11px; font-weight:bold; border-bottom:1.3px solid #141a14; height:14px; line-height:12px; text-align:center; }
[data-g="binom"] .tb th.n, [data-g="binom"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="binom"] .tb td{ height:15px; line-height:14px; text-align:right; padding:0 5px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="binom"] .tb td:last-child{ border-right:0; }
[data-g="binom"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="binom"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:1px; font-size:14px; line-height:17px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:18px; }
[data-g="binom"] .tb .unten.leer{ font-size:10px; font-weight:normal; text-align:left; }
[data-g="binom"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="binom"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="binom"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="binom"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="binom"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="binom"] .calc{ transform:scale(.92); transform-origin:top center; } }
[data-g="binom"] .bres{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; }
[data-g="binom"] .bres .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; padding-bottom:1px; }
[data-g="binom"] .bres .pv{ font-size:12px; margin-top:6px; }
[data-g="binom"] .bres .erg{ text-align:right; font-size:22px; font-weight:bold; margin-top:16px; letter-spacing:.2px; }
[data-g="binom"] .bres .erg small{ font-size:13px; font-weight:normal; margin-right:6px; }
[data-g="binom"] .list div.it .val{ min-width:60px; text-align:right; }
[data-g="binom"] .list div.it{ display:flex; justify-content:space-between; }
[data-g="binom"] .ue{ border-collapse:collapse; margin:0 0 10px; font-size:14.5px; width:100%; }
[data-g="binom"] .ue td{ border:1px solid var(--line); padding:3px 8px; }
[data-g="binom"] .ue td:last-child{ font-family:Cambria,Georgia,serif; font-size:15.5px; white-space:nowrap; }
[data-g="binom"] .task .term .bereich{ font-family:system-ui,Arial,sans-serif; font-size:14.5px; color:var(--mute); }`,
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
//  Rechnerzustand: App Verteilung (Binomialverteilung, Einzelwert)
// =====================================================================
const TYP=["Binom.Verteilung","Kumul. Binom.-V.","Normal-V. Dichte","Kumul. Normal-V.","Inverse Normal-V.","Poisson-Vert.","Kumul. Poisson-V"];
const EING=["Liste","Einzelwert"];
const FN=["k","n","p"];
function fresh(){ return {mode:'start', sel:0, shift:false, typ:0, par:['','',''], cur:0, buf:null, res:null}; }
const num=s=>parseFloat(String(s).replace(',','.'));
function binP(n,p,k){ let c=1; for(let i=1;i<=k;i++) c=c*(n-k+i)/i; return c*Math.pow(p,k)*Math.pow(1-p,n-k); }
function binC(n,p,k){ let s=0; for(let i=0;i<=k;i++) s+=binP(n,p,i); return s; }
function rechne(S){ const k=num(S.par[0]), n=num(S.par[1]), p=num(S.par[2]); return S.typ===0?binP(n,p,k):binC(n,p,k); }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(5,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok'&&S.sel===2){ S.mode='typ'; S.sel=0; }
     return;
   case 'typ':
     if(k==='down') S.sel=Math.min(TYP.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok'&&S.sel<2){ S.typ=S.sel; S.mode='eing'; S.sel=0; }
     return;
   case 'eing':
     if(k==='down') S.sel=1; else if(k==='up') S.sel=0;
     else if(k==='ok'&&S.sel===1){ S.mode='par'; S.cur=0; S.buf=null; }
     return;
   case 'par':
     if(/^[0-9,]$/.test(k)&&S.cur<3){ S.buf=(S.buf||'')+k; return; }
     if(k==='del'&&S.buf){ S.buf=S.buf.slice(0,-1); return; }
     if(k==='exe'&&S.cur<3){ if(S.buf) S.par[S.cur]=S.buf; S.buf=null; S.cur++; return; }
     if(k==='down'){ S.buf=null; S.cur=Math.min(3,S.cur+1); return; }
     if(k==='up'){ S.buf=null; S.cur=Math.max(0,S.cur-1); return; }
     if(k==='ok'&&S.cur===3){ S.res=rechne(S); S.mode='res'; return; }
     return;
   case 'res':
     if(k==='ok'){ S.mode='par'; S.cur=0; S.buf=null; }
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
const fz=v=>Number(v.toPrecision(10)).toString().replace('.',',');
function liste(titel,L,sel,ziel,off){
  off=off||0;
  return `<div class="list"><div class="ti">${titel}</div>`+L.slice(off,off+4).map((t,i)=>`<div class="it${i+off===sel?' sel':''}${zl(t,ziel)}"><span>${t}</span></div>`).join('')+'</div>';
}
function draw(S,ziel){
  if(S.mode==='start') return sbar(S)+'<div class="app"><div class="ein"></div><div></div></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='typ'){ const off=Math.max(0,Math.min(S.sel-3,TYP.length-4)); return sbar(S)+liste('Verteilung',TYP,S.sel,ziel,off); }
  if(S.mode==='eing') return sbar(S)+liste(TYP[S.typ],EING,S.sel,ziel);
  if(S.mode==='par'){
    let h=sbar(S)+`<div class="list"><div class="ti">${TYP[S.typ]}</div>`;
    FN.forEach((f,i)=>{
      const akt=i===S.cur, v=(akt&&S.buf!==null)?S.buf+'<span class="caret"></span>':(S.par[i]===''?'0':S.par[i]);
      h+=`<div class="it${akt?' sel':''}"><span><i>${f}</i></span><span class="val">${v}</span></div>`;
    });
    h+=`<div class="it${S.cur===3?' sel':''}${zl('Ausführen',ziel)}"><span>Ausführen</span></div>`;
    return h+'</div>';
  }
  if(S.mode==='res'){
    return sbar(S)+`<div class="bres"><div class="ti">${TYP[S.typ]}</div><div class="pv"><i>k</i>=${S.par[0]} &nbsp; <i>n</i>=${S.par[1]} &nbsp; <i>p</i>=${S.par[2]}</div><div class="erg"><small>p=</small>${fz(S.res)}</div></div>`;
  }
  return sbar(S);
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const NP='<span class="bereich">&nbsp; mit <i>n</i> = 10 und <i>p</i> = 0,4</span>';
const AG='<i>P</i>(<i>X</i> = 3)'+NP, AH='<i>P</i>(<i>X</i> ≤ 3)'+NP, AZ='<i>P</i>(3 ≤ <i>X</i> ≤ 6)'+NP;
const OEFFNEN={t:"App Verteilung öffnen", k:["home","right","right","ok"], z:["Verteilung"],
   d:"<p>Drücken Sie <b>HOME</b>. Gehen Sie mit <b>▶ ▶</b> zur App <b>Verteilung</b> und öffnen Sie sie mit <b>OK</b>.</p><p>Es erscheint die Liste der Verteilungen.</p>"};
const T1=[
  Object.assign({a:AG},OEFFNEN),
  {t:"Binom.Verteilung wählen", a:AG, k:["ok"], z:["Binom.Verteilung"],
   d:"<p><b>Binom.Verteilung</b> steht ganz oben und ist schon markiert. Bestätigen Sie mit <b>OK</b>.</p><p>Diese Funktion rechnet <b>genau</b> <i>k</i> Treffer: <i>P</i>(<i>X</i> = <i>k</i>).</p>"},
  {t:"Einzelwert wählen", a:AG, k:["down","ok"], z:["Einzelwert"],
   d:"<p>Sie rechnen mit <b>einem</b> Wert für <i>k</i>. Gehen Sie mit <b>▼</b> zu <b>Einzelwert</b> und drücken Sie <b>OK</b>.</p>"},
  {t:"k = 3 eingeben", a:AG, k:["3","exe"],
   d:"<p><b><i>k</i></b> ist die Anzahl der Treffer. Tippen Sie <b>3</b> und bestätigen Sie mit <b>EXE</b>.</p><p>Der Cursor springt weiter zu <i>n</i>.</p>"},
  {t:"n = 10 eingeben", a:AG, k:["1","0","exe"],
   d:"<p><b><i>n</i></b> ist die Anzahl der Versuche. Tippen Sie <b>10</b>, dann <b>EXE</b>.</p>"},
  {t:"p = 0,4 eingeben", a:AG, k:["0",",","4","exe"],
   d:"<p><b><i>p</i></b> ist die Trefferwahrscheinlichkeit. Tippen Sie <b>0,4</b>, dann <b>EXE</b>.</p><p>Jetzt ist <b>Ausführen</b> markiert.</p>",
   n:"Das Komma ist die Taste <b>,</b> unten in der Zahlenreihe."},
  {t:"Ausführen", a:AG, k:["ok"], z:["Ausführen"],
   d:"<p>Drücken Sie <b>OK</b>.</p><p>Im Display: <b>0,214990848</b>. Auf 4 Stellen nach dem Komma gerundet:<br><b><i>P</i>(<i>X</i> = 3) ≈ 0,2150</b></p>",
   n:"Mit <b>OK</b> kommen Sie zurück zur Eingabe. Die Werte bleiben gespeichert."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1, Spalte <i>P</i>(<i>X</i> = <i>k</i>)",["<b>HOME</b> ▸ Verteilung ▸ <b>Binom.Verteilung</b> ▸ <b>Einzelwert</b>","<i>k</i> <b>EXE</b> ▸ <i>n</i> <b>EXE</b> ▸ <i>p</i> <b>EXE</b> ▸ Ausführen <b>OK</b>","Auf <b>4 Stellen</b> nach dem Komma runden","Nächste Aufgabe: <b>OK</b>, dann neue Werte eingeben"])}
];
const T2=[
  Object.assign({a:AH},OEFFNEN),
  {t:"Kumul. Binom.-V. wählen", a:AH, k:["down","ok"], z:["Kumul. Binom.-V."],
   d:"<p>Gehen Sie mit <b>▼</b> zu <b>Kumul. Binom.-V.</b> und drücken Sie <b>OK</b>.</p><p><b>Kumul.</b> heißt <b>aufsummiert</b>: Der Rechner addiert <i>P</i>(<i>X</i> = 0) + <i>P</i>(<i>X</i> = 1) + … + <i>P</i>(<i>X</i> = <i>k</i>). Das ist <b>höchstens</b> <i>k</i> Treffer: <i>P</i>(<i>X</i> ≤ <i>k</i>).</p>"},
  {t:"Einzelwert wählen", a:AH, k:["down","ok"], z:["Einzelwert"],
   d:"<p>Mit <b>▼</b> zu <b>Einzelwert</b>, dann <b>OK</b>.</p>"},
  {t:"Werte eingeben", a:AH, k:["3","exe","1","0","exe","0",",","4","exe"],
   d:"<p>Wie bei „genau“: <b><i>k</i> = 3</b> <b>EXE</b>, <b><i>n</i> = 10</b> <b>EXE</b>, <b><i>p</i> = 0,4</b> <b>EXE</b>.</p>"},
  {t:"Ausführen", a:AH, k:["ok"], z:["Ausführen"],
   d:"<p>Drücken Sie <b>OK</b>.</p><p>Im Display: <b>0,3822806016</b>. Gerundet:<br><b><i>P</i>(<i>X</i> ≤ 3) ≈ 0,3823</b></p>",
   n:"„Höchstens 3“ heißt: 0, 1, 2 <b>oder</b> 3 Treffer. Die 3 zählt mit."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1, Spalte <i>P</i>(<i>X</i> ≤ <i>k</i>)",["<b>HOME</b> ▸ Verteilung ▸ <b>Kumul. Binom.-V.</b> ▸ <b>Einzelwert</b>","<i>k</i> <b>EXE</b> ▸ <i>n</i> <b>EXE</b> ▸ <i>p</i> <b>EXE</b> ▸ Ausführen <b>OK</b>","Auf <b>4 Stellen</b> nach dem Komma runden"])}
];
const T3=[
  {t:"Die Idee: zwei Werte abziehen", a:AZ, k:[],
   d:"<p>Für „zwischen“ gibt es keine eigene Funktion. Sie rechnen mit <b>zwei</b> kumulierten Werten:</p><p style=\"font-family:Cambria,Georgia,serif;font-size:18px\"><i>P</i>(3 ≤ <i>X</i> ≤ 6) = <i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ <b>2</b>)</p>",
   n:"Von der <b>unteren</b> Grenze ziehen Sie <b>1</b> ab (3 − 1 = 2). Sonst würde <i>X</i> = 3 fehlen."},
  Object.assign({a:AZ},OEFFNEN),
  {t:"Kumul. Binom.-V. ▸ Einzelwert", a:AZ, k:["down","ok","down","ok"], z:["Kumul. Binom.-V.","Einzelwert"],
   d:"<p><b>▼</b> zu <b>Kumul. Binom.-V.</b>, <b>OK</b>. Dann <b>▼</b> zu <b>Einzelwert</b>, <b>OK</b>.</p>"},
  {t:"Obere Grenze: P(X ≤ 6)", a:AZ, k:["6","exe","1","0","exe","0",",","4","exe","ok"],
   d:"<p><b><i>k</i> = 6</b> <b>EXE</b>, <b><i>n</i> = 10</b> <b>EXE</b>, <b><i>p</i> = 0,4</b> <b>EXE</b>, dann <b>OK</b>.</p><p>Im Display: <b>0,9452381184</b>. Notieren Sie <b>0,9452</b>.</p>"},
  {t:"Zurück zur Eingabe", a:AZ, k:["ok"],
   d:"<p>Mit <b>OK</b> kommen Sie zurück zur Eingabe. Der Cursor steht wieder bei <i>k</i>.</p>",
   n:"Steht der Cursor nicht bei <i>k</i>, gehen Sie mit <b>▲</b> nach oben."},
  {t:"Untere Grenze − 1: P(X ≤ 2)", a:AZ, k:["2","exe","1","0","exe","0",",","4","exe","ok"],
   d:"<p>Nur <i>k</i> ändert sich: <b><i>k</i> = 2</b> <b>EXE</b>. Dann <i>n</i> und <i>p</i> wie vorher und <b>OK</b>.</p><p>Im Display: <b>0,1672897536</b>. Notieren Sie <b>0,1673</b>.</p>"},
  {t:"Abziehen", a:AZ, k:[],
   d:"<p style=\"font-family:Cambria,Georgia,serif;font-size:18px\"><i>P</i>(3 ≤ <i>X</i> ≤ 6) = 0,9452 − 0,1673 = <b>0,7779</b></p><p>Die Subtraktion können Sie im Kopf, auf dem Blatt oder in der App <b>Berechnung</b> rechnen.</p>"},
  {t:"Mehr als, weniger als, mindestens …", a:AZ, k:[],
   d:"<p>Übersetzen Sie zuerst: <b>Welche Trefferzahlen gehören dazu?</b> Dann rechnen Sie mit <i>P</i>(<i>X</i> ≤ …).</p><table class=\"ue\"><tr><td>höchstens 5 · nicht mehr als 5</td><td><i>P</i>(<i>X</i> ≤ 5)</td></tr><tr><td>weniger als 5</td><td><i>P</i>(<i>X</i> ≤ 4)</td></tr><tr><td>mindestens 5</td><td>1 − <i>P</i>(<i>X</i> ≤ 4)</td></tr><tr><td>mehr als 5</td><td>1 − <i>P</i>(<i>X</i> ≤ 5)</td></tr><tr><td>mehr als 2, aber höchstens 6</td><td><i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ 2)</td></tr><tr><td>mindestens 3, aber weniger als 7</td><td><i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ 2)</td></tr></table>",
   n:"<b>mindestens / höchstens</b>: Die Zahl zählt mit. <b>mehr als / weniger als</b>: Die Zahl zählt <b>nicht</b> mit."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 2",["Erst übersetzen: Welche Trefferzahlen gehören dazu?","<i>P</i>(<i>a</i> ≤ <i>X</i> ≤ <i>b</i>) = <i>P</i>(<i>X</i> ≤ <i>b</i>) − <i>P</i>(<i>X</i> ≤ <i>a</i> − 1)","Beide Werte mit <b>Kumul. Binom.-V.</b> berechnen und auf 4 Stellen runden","Mindestens <i>k</i>: 1 − <i>P</i>(<i>X</i> ≤ <i>k</i> − 1)","Danach: Lösungscode eintragen"])}
];
const TRACKS={
  g:{name:"Genau  P(X = k)", start:()=>fresh(), steps:T1},
  h:{name:"Höchstens  P(X ≤ k)", start:()=>fresh(), steps:T2},
  z:{name:"Zwischen  P(a ≤ X ≤ b)", start:()=>fresh(), steps:T3}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["g","h","z"];
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
    if(k==='exe'&&S.k[pos]==='ok') extra=' Hier bestätigen Sie mit <b>OK</b>.';
    if(k==='ok'&&S.k[pos]==='exe') extra=' Zahlen bestätigen Sie mit <b>EXE</b>.';
    if(k==='ok'&&S.k[pos]==='down') extra=' Erst mit <b>▼</b> zum richtigen Eintrag gehen.';
    if(k==='ok'&&S.k[pos]==='right') extra=' Erst mit <b>▶</b> zur App Verteilung gehen.';
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
