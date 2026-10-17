GUIDES["dx_binom"]={
 title:"Binomialverteilung",
 css:String.raw`[data-g="dx_binom"] .calc{ width:330px; flex:0 0 330px; border-radius:30px; box-shadow:0 6px 22px rgba(0,0,0,.25); background:radial-gradient(#2a2a2e 1px, transparent 1.2px) 0 0/5px 5px, #1e1e21; border:6px solid #e6e6ea; padding:14px 13px 16px; }
[data-g="dx_binom"] .calc > *{ position:relative; }
[data-g="dx_binom"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; }
[data-g="dx_binom"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="dx_binom"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="dx_binom"] .defl{ font-size:15px; margin-right:2px; }
[data-g="dx_binom"] .dlg{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; font-size:15px; }
[data-g="dx_binom"] .dlg .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; margin-bottom:3px; }
[data-g="dx_binom"] .dlg .r{ display:flex; justify-content:space-between; height:24px; align-items:center; padding:0 4px; }
[data-g="dx_binom"] .dlg .r.sel{ background:#141a14; color:#d3ded4; }
[data-g="dx_binom"] .dlg .r.sel .caret{ background:#d3ded4; }
[data-g="dx_binom"] .tb{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 4px 0; }
[data-g="dx_binom"] .tb table{ border-collapse:collapse; width:100%; table-layout:fixed; font-size:14px; }
[data-g="dx_binom"] .tb th{ font-size:11.5px; font-weight:bold; border-bottom:1.3px solid #141a14; height:16px; text-align:center; }
[data-g="dx_binom"] .tb th.n, [data-g="dx_binom"] .tb td.n{ width:16px; font-size:9px; text-align:left; color:#3e4a3e; }
[data-g="dx_binom"] .tb td{ height:21px; text-align:right; padding:0 6px; border-right:1px solid #8fa08f; white-space:nowrap; overflow:hidden; }
[data-g="dx_binom"] .tb td:last-child{ border-right:0; }
[data-g="dx_binom"] .tb td.cur{ background:#141a14; color:#d3ded4; }
[data-g="dx_binom"] .tb .unten{ position:absolute; left:6px; right:6px; bottom:2px; font-size:16px; text-align:right; font-weight:bold; border-top:1px solid #8fa08f; height:20px; }
[data-g="dx_binom"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="dx_binom"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="dx_binom"] .task .bereich{ font-size:14.5px; color:var(--ink); }
[data-g="dx_binom"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="dx_binom"] .chip.b{ background:#2463c9; }
[data-g="dx_binom"] .bres{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 8px; }
[data-g="dx_binom"] .bres .ti{ font-size:10px; font-weight:bold; border-bottom:1px solid #141a14; padding-bottom:1px; }
[data-g="dx_binom"] .bres .pv{ font-size:12px; margin-top:6px; }
[data-g="dx_binom"] .bres .erg{ text-align:right; font-size:22px; font-weight:bold; margin-top:16px; letter-spacing:.2px; }
[data-g="dx_binom"] .bres .erg small{ font-size:13px; font-weight:normal; margin-right:6px; }
[data-g="dx_binom"] .list div.it .val{ min-width:60px; text-align:right; }
[data-g="dx_binom"] .list div.it{ display:flex; justify-content:space-between; }
[data-g="dx_binom"] .ue{ border-collapse:collapse; margin:0 0 10px; font-size:14.5px; width:100%; }
[data-g="dx_binom"] .ue td{ border:1px solid var(--line); padding:3px 8px; }
[data-g="dx_binom"] .ue td:last-child{ font-family:Cambria,Georgia,serif; font-size:15.5px; white-space:nowrap; }
[data-g="dx_binom"] .task .term .bereich{ font-family:system-ui,Arial,sans-serif; font-size:14.5px; color:var(--mute); }
[data-g="dx_binom"] .xl{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:3px 8px; font:bold 15px 'Courier New',monospace; }
[data-g="dx_binom"] .xl .r{ height:23px; line-height:23px; padding:0 4px; white-space:nowrap; display:flex; justify-content:space-between; }
[data-g="dx_binom"] .xl .r.sel{ background:#141a14; color:#d3ded4; }
[data-g="dx_binom"] .xl .r.sel .caret{ background:#d3ded4; }
[data-g="dx_binom"] .xl.xp{ font-family:Arial,sans-serif; font-weight:normal; font-size:15px; }
[data-g="dx_binom"] .xl .ti{ font:bold 10px Arial,sans-serif; border-bottom:1px solid #141a14; margin-bottom:2px; }
[data-g="dx_binom"] .xl .val{ text-align:right; }`,
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
//  Rechnerzustand: Modus 7 Verteilungen (Binomialverteilung, Variable)
// =====================================================================
const XT=[["1:Normal-Dichte","2:Kumul. Normal-V","3:Inv. Normal-V.","4:Binomial-Dichte"],["1:Kumul. Binom.-V","2:Poisson-Dichte","3:Kumul. Poisson-V"]];
const TNAME=["Binomial-Dichte","Kumul. Binom.-V"];
const FN=["k","n","p"];
function fresh(){ return {mode:'start', sel:0, shift:false, page:0, typ:0, par:['','',''], cur:0, buf:null, res:null}; }
const num=s=>parseFloat(String(s).replace(',','.'));
function binP(n,p,k){ let c=1; for(let i=1;i<=k;i++) c=c*(n-k+i)/i; return c*Math.pow(p,k)*Math.pow(1-p,n-k); }
function binC(n,p,k){ let s=0; for(let i=0;i<=k;i++) s+=binP(n,p,i); return s; }
function rechne(S){ const k=num(S.par[0]), n=num(S.par[1]), p=num(S.par[2]); return S.typ===0?binP(n,p,k):binC(n,p,k); }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(k==='menu'){ S.mode='home'; S.sel=S.app||0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(11,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='7'||(k==='exe'&&S.sel===6)){ S.app=6; S.mode='typ'; S.page=0; }
     return;
   case 'typ':
     if(k==='down') S.page=1; else if(k==='up') S.page=0;
     else if(S.page===0&&k==='4'){ S.typ=0; S.mode='eing'; }
     else if(S.page===1&&k==='1'){ S.typ=1; S.mode='eing'; }
     return;
   case 'eing':
     if(k==='2'){ S.mode='par'; S.cur=0; S.buf=null; }
     return;
   case 'par':
     if(/^[0-9,]$/.test(k)&&S.cur<3){ S.buf=(S.buf||'')+k; return; }
     if(k==='del'&&S.buf){ S.buf=S.buf.slice(0,-1); return; }
     if(k==='exe'){
       if(S.cur<3){ if(S.buf) S.par[S.cur]=S.buf; S.buf=null; S.cur++; return; }
       S.res=rechne(S); S.mode='res'; return;
     }
     if(k==='down'){ S.buf=null; S.cur=Math.min(2,S.cur+1); return; }
     if(k==='up'){ S.buf=null; S.cur=Math.max(0,S.cur-1); return; }
     return;
   case 'res':
     if(k==='ac'||k==='exe'){ S.mode='par'; S.cur=0; S.buf=null; }
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
const fz=v=>Number(v.toPrecision(10)).toString().replace('.',',');
function draw(S,ziel){
  if(S.mode==='start') return sbar(S)+'<div class="app"><div class="ein"></div><div></div></div>';
  if(S.mode==='home') return drawMenu(S,ziel);
  if(S.mode==='typ'){
    const L=XT[S.page];
    return sbar(S,S.page===0?'▼':'▲')+'<div class="xl">'+L.map(t=>`<div class="r${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
  }
  if(S.mode==='eing') return sbar(S)+'<div class="xl">'+["1:Liste","2:Variable"].map(t=>`<div class="r${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
  if(S.mode==='par'){
    let h=sbar(S)+`<div class="xl xp"><div class="ti">${TNAME[S.typ]}</div>`;
    FN.forEach((f,i)=>{
      const akt=i===S.cur, v=(akt&&S.buf!==null)?S.buf+'<span class="caret"></span>':(S.par[i]===''?'0':S.par[i]);
      h+=`<div class="r${akt?' sel':''}"><span><i>${f}</i>=</span><span class="val">${v}</span></div>`;
    });
    return h+'</div>';
  }
  if(S.mode==='res'){
    return sbar(S)+`<div class="bres"><div class="ti">${TNAME[S.typ]}</div><div class="pv"><i>k</i>=${S.par[0]} &nbsp; <i>n</i>=${S.par[1]} &nbsp; <i>p</i>=${S.par[2]}</div><div class="erg"><small>p=</small>${fz(S.res)}</div></div>`;
  }
  return sbar(S);
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner arbeiten, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const NP='<span class="bereich">&nbsp; mit <i>n</i> = 10 und <i>p</i> = 0,4</span>';
const AG='<i>P</i>(<i>X</i> = 3)'+NP, AH='<i>P</i>(<i>X</i> ≤ 3)'+NP, AZ='<i>P</i>(3 ≤ <i>X</i> ≤ 6)'+NP;
const OEFFNEN={t:"Modus Verteilungen öffnen", k:["menu","7"], z:["Verteilungen"],
   d:"<p>Drücken Sie <b>MENU</b> und dann <b>7</b>. Sie sind im Modus <b>Verteilungen</b>.</p><p>Es erscheint die Liste der Verteilungen.</p>"};
const T1=[
  Object.assign({a:AG},OEFFNEN),
  {t:"4: Binomial-Dichte", a:AG, k:["4"], z:["4:Binomial-Dichte"],
   d:"<p>Drücken Sie <b>4</b> für <b>Binomial-Dichte</b>.</p><p>Diese Funktion rechnet <b>genau</b> <i>k</i> Treffer: <i>P</i>(<i>X</i> = <i>k</i>).</p>"},
  {t:"2: Variable", a:AG, k:["2"], z:["2:Variable"],
   d:"<p>Sie rechnen mit <b>einem</b> Wert für <i>k</i>. Drücken Sie <b>2</b> für <b>Variable</b>.</p>"},
  {t:"k = 3 eingeben", a:AG, k:["3","exe"],
   d:"<p><b><i>k</i></b> ist die Anzahl der Treffer. Tippen Sie <b>3</b> und bestätigen Sie mit <b>=</b>.</p><p>Der Cursor springt weiter zu <i>n</i>.</p>"},
  {t:"n = 10 eingeben", a:AG, k:["1","0","exe"],
   d:"<p><b><i>n</i></b> ist die Anzahl der Versuche. Tippen Sie <b>10</b>, dann <b>=</b>.</p>"},
  {t:"p = 0,4 eingeben", a:AG, k:["0",",","4","exe"],
   d:"<p><b><i>p</i></b> ist die Trefferwahrscheinlichkeit. Tippen Sie <b>0,4</b>, dann <b>=</b>.</p>",
   n:"Das Komma ist die Taste <b>,</b> unten in der Zahlenreihe."},
  {t:"Berechnen", a:AG, k:["exe"],
   d:"<p>Drücken Sie noch einmal <b>=</b>.</p><p>Im Display: <b>0,214990848</b>. Auf 4 Stellen nach dem Komma gerundet:<br><b><i>P</i>(<i>X</i> = 3) ≈ 0,2150</b></p>",
   n:"Für die nächste Aufgabe wählen Sie wieder <b>MENU</b> <b>7</b> <b>4</b> <b>2</b>. Die alten Werte stehen noch da – Sie tippen einfach die neuen darüber."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1, Spalte <i>P</i>(<i>X</i> = <i>k</i>)",["<b>MENU</b> <b>7</b> ▸ <b>4</b> Binomial-Dichte ▸ <b>2</b> Variable","<i>k</i> <b>=</b> ▸ <i>n</i> <b>=</b> ▸ <i>p</i> <b>=</b> ▸ <b>=</b>","Auf <b>4 Stellen</b> nach dem Komma runden","Nächste Aufgabe: wieder <b>MENU</b> <b>7</b> <b>4</b> <b>2</b>, neue Werte darübertippen"])}
];
const T2=[
  Object.assign({a:AH},OEFFNEN),
  {t:"▼ 1: Kumul. Binom.-V", a:AH, k:["down","1"], z:["1:Kumul. Binom.-V"],
   d:"<p><b>Kumul. Binom.-V</b> steht auf der <b>zweiten Seite</b>. Blättern Sie mit <b>▼</b> weiter und drücken Sie <b>1</b>.</p><p><b>Kumul.</b> heißt <b>aufsummiert</b>: Der Rechner addiert <i>P</i>(<i>X</i> = 0) + <i>P</i>(<i>X</i> = 1) + … + <i>P</i>(<i>X</i> = <i>k</i>). Das ist <b>höchstens</b> <i>k</i> Treffer: <i>P</i>(<i>X</i> ≤ <i>k</i>).</p>"},
  {t:"2: Variable", a:AH, k:["2"], z:["2:Variable"],
   d:"<p>Drücken Sie <b>2</b> für <b>Variable</b>.</p>"},
  {t:"Werte eingeben", a:AH, k:["3","exe","1","0","exe","0",",","4","exe"],
   d:"<p>Wie bei „genau“: <b><i>k</i> = 3</b> <b>=</b>, <b><i>n</i> = 10</b> <b>=</b>, <b><i>p</i> = 0,4</b> <b>=</b>.</p>"},
  {t:"Berechnen", a:AH, k:["exe"],
   d:"<p>Drücken Sie noch einmal <b>=</b>.</p><p>Im Display: <b>0,3822806016</b>. Gerundet:<br><b><i>P</i>(<i>X</i> ≤ 3) ≈ 0,3823</b></p>",
   n:"„Höchstens 3“ heißt: 0, 1, 2 <b>oder</b> 3 Treffer. Die 3 zählt mit."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 1, Spalte <i>P</i>(<i>X</i> ≤ <i>k</i>)",["<b>MENU</b> <b>7</b> ▸ <b>▼</b> <b>1</b> Kumul. Binom.-V ▸ <b>2</b> Variable","<i>k</i> <b>=</b> ▸ <i>n</i> <b>=</b> ▸ <i>p</i> <b>=</b> ▸ <b>=</b>","Auf <b>4 Stellen</b> nach dem Komma runden"])}
];
const T3=[
  {t:"Die Idee: zwei Werte abziehen", a:AZ, k:[],
   d:"<p>Für „zwischen“ gibt es keine eigene Funktion. Sie rechnen mit <b>zwei</b> kumulierten Werten:</p><p style=\"font-family:Cambria,Georgia,serif;font-size:18px\"><i>P</i>(3 ≤ <i>X</i> ≤ 6) = <i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ <b>2</b>)</p>",
   n:"Von der <b>unteren</b> Grenze ziehen Sie <b>1</b> ab (3 − 1 = 2). Sonst würde <i>X</i> = 3 fehlen."},
  {t:"Kumul. Binom.-V öffnen", a:AZ, k:["menu","7","down","1","2"], z:["Verteilungen","1:Kumul. Binom.-V","2:Variable"],
   d:"<p><b>MENU</b> <b>7</b>, dann <b>▼</b> <b>1</b> für Kumul. Binom.-V und <b>2</b> für Variable.</p>"},
  {t:"Obere Grenze: P(X ≤ 6)", a:AZ, k:["6","exe","1","0","exe","0",",","4","exe","exe"],
   d:"<p><b><i>k</i> = 6</b> <b>=</b>, <b><i>n</i> = 10</b> <b>=</b>, <b><i>p</i> = 0,4</b> <b>=</b>, dann noch einmal <b>=</b>.</p><p>Im Display: <b>0,9452381184</b>. Notieren Sie <b>0,9452</b>.</p>"},
  {t:"Noch einmal öffnen", a:AZ, k:["menu","7","down","1","2"], z:["Verteilungen","1:Kumul. Binom.-V","2:Variable"],
   d:"<p>Wählen Sie die Funktion noch einmal: <b>MENU</b> <b>7</b> <b>▼</b> <b>1</b> <b>2</b>.</p><p>Die alten Werte stehen noch da. Sie tippen die neuen einfach darüber.</p>"},
  {t:"Untere Grenze − 1: P(X ≤ 2)", a:AZ, k:["2","exe","1","0","exe","0",",","4","exe","exe"],
   d:"<p>Nur <i>k</i> ändert sich: <b><i>k</i> = 2</b> <b>=</b>. Dann <i>n</i> und <i>p</i> wie vorher und noch einmal <b>=</b>.</p><p>Im Display: <b>0,1672897536</b>. Notieren Sie <b>0,1673</b>.</p>"},
  {t:"Abziehen", a:AZ, k:[],
   d:"<p style=\"font-family:Cambria,Georgia,serif;font-size:18px\"><i>P</i>(3 ≤ <i>X</i> ≤ 6) = 0,9452 − 0,1673 = <b>0,7779</b></p><p>Die Subtraktion können Sie im Kopf, auf dem Blatt oder im Modus <b>Berechnungen</b> rechnen.</p>"},
  {t:"Mehr als, weniger als, mindestens …", a:AZ, k:[],
   d:"<p>Übersetzen Sie zuerst: <b>Welche Trefferzahlen gehören dazu?</b> Dann rechnen Sie mit <i>P</i>(<i>X</i> ≤ …).</p><table class=\"ue\"><tr><td>höchstens 5 · nicht mehr als 5</td><td><i>P</i>(<i>X</i> ≤ 5)</td></tr><tr><td>weniger als 5</td><td><i>P</i>(<i>X</i> ≤ 4)</td></tr><tr><td>mindestens 5</td><td>1 − <i>P</i>(<i>X</i> ≤ 4)</td></tr><tr><td>mehr als 5</td><td>1 − <i>P</i>(<i>X</i> ≤ 5)</td></tr><tr><td>mehr als 2, aber höchstens 6</td><td><i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ 2)</td></tr><tr><td>mindestens 3, aber weniger als 7</td><td><i>P</i>(<i>X</i> ≤ 6) − <i>P</i>(<i>X</i> ≤ 2)</td></tr></table>",
   n:"<b>mindestens / höchstens</b>: Die Zahl zählt mit. <b>mehr als / weniger als</b>: Die Zahl zählt <b>nicht</b> mit."},
  {t:"Selbst arbeiten", k:[], ab:1, d:AB("Aufgabe 2",["Erst übersetzen: Welche Trefferzahlen gehören dazu?","<i>P</i>(<i>a</i> ≤ <i>X</i> ≤ <i>b</i>) = <i>P</i>(<i>X</i> ≤ <i>b</i>) − <i>P</i>(<i>X</i> ≤ <i>a</i> − 1)","Beide Werte mit <b>Kumul. Binom.-V</b> berechnen und auf 4 Stellen runden","Mindestens <i>k</i>: 1 − <i>P</i>(<i>X</i> ≤ <i>k</i> − 1)","Danach: Lösungscode eintragen"])}
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
    if(k==='1'&&S.k[pos]==='down') extra=' Kumul. Binom.-V steht auf der zweiten Seite: erst <b>▼</b>.';
    if(k==='exe'&&/^[0-9]$/.test(S.k[pos])) extra=' Hier wählen Sie mit einer <b>Zifferntaste</b>.';
    if(k==='4'&&S.k[pos]==='down') extra=' Für „höchstens“ brauchen Sie <b>Kumul. Binom.-V</b>: erst <b>▼</b>, dann <b>1</b>.';
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
