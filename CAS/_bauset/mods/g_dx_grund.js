GUIDES["dx_grund"]={
 title:"Grundlagen",
 css:String.raw``,
 make:function(){

// =====================================================================
//  Eingabezeile mit Vorlagen (Bruch, Hochzahl, Wurzel)
// =====================================================================
const SHOW={'*':'×','/':'÷','-':'−','ans':'Ans'};
function Entry(root){ this.root=root||[]; this.path=[this.root]; this.meta=[null]; }
Entry.prototype.top=function(){ return this.path[this.path.length-1]; };
Entry.prototype.isEmpty=function(){ return this.root.length===0; };
Entry.prototype.key=function(k){
  const T=this.top();
  if(k==='frac'){ const f={t:'frac',n:[],d:[]}; T.push(f); this.path.push(f.n); this.meta.push(f); return; }
  if(k==='pow'){ const s={t:'sup',v:[]}; T.push(s); this.path.push(s.v); this.meta.push(s); return; }
  if(k==='sqrt'){ const s={t:'sqrt',v:[]}; T.push(s); this.path.push(s.v); this.meta.push(s); return; }
  if(k==='sq'){ T.push({t:'sup',v:['2']}); return; }
  if(k==='down'){ const m=this.meta[this.meta.length-1]; if(m&&m.t==='frac'&&T===m.n){ this.path.pop(); this.path.push(m.d); } return; }
  if(k==='right'){ if(this.path.length>1){ this.path.pop(); this.meta.pop(); } return; }
  if(k==='left'||k==='up') return;
  if(k==='del'){ T.pop(); return; }
  if(k==='neg'){ T.push('NEG'); return; }
  T.push(SHOW[k]||k);
};
Entry.prototype.clone=function(){ return new Entry(JSON.parse(JSON.stringify(this.root))); };
function tok(t){ return t==='NEG'?'<span class="ng">−</span>':t; }
function rnd(arr,curA,caret){
  let h=arr.map(t=>typeof t==='string'?tok(t):
    t.t==='frac'?`<span class="fr"><span>${rnd(t.n,curA,caret)}</span><span>${rnd(t.d,curA,caret)}</span></span>`:
    t.t==='sup'?`<sup>${rnd(t.v,curA,caret)}</sup>`:
    `<span class="rt">√<span class="rad">${rnd(t.v,curA,caret)}</span></span>`).join('');
  if(caret&&arr===curA) h+='<span class="caret"></span>';
  return h;
}
function ser(arr){ return arr.map(t=>typeof t==='string'?(t==='NEG'?'~':t):t.t==='frac'?`(${ser(t.n)})/(${ser(t.d)})`:t.t==='sup'?`^(${ser(t.v)})`:`√(${ser(t.v)})`).join(''); }
Entry.prototype.html=function(caret){ return rnd(this.root,this.top(),caret!==false); };

// =====================================================================
//  Ergebnisse (exakt = EXE, Dezimal = SHIFT EXE bzw. FORMAT ▸ Dezimal)
// =====================================================================
const F=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const W=(a,r)=>`${a}<span class="rt">√<span class="rad">${r}</span></span>`;
const EX={
 "3,5×4":"14", "12−4×3":"0", "(12−4)×3":"24", "12×8":"96", "12×9":"108", "12×7":"84",
 "~3+5":"2", "Ans−3":"−1", "Ans÷4":"21", "100−Ans":"79",
 "(1)/(3)+(1)/(6)":F(1,2), "3÷4":F(3,4), "1÷3":F(1,3), "0,75":F(3,4),
 "7^(2)":"49", "2^(10)":"1024", "2^(3)+1":"9", "2^(3+1)":"16", "√(144)":"12", "√(8)":W(2,2),
 "~2^(2)":"−4", "(~2)^(2)":"4", "2,5×4,8":"12", "20÷2,5":"8", "A×B":"96", "(A+B)÷4":"5"
};
const AP={ "3÷4":"0,75", "1÷3":"0,3333333333", "√(8)":"2,828427125", "(1)/(3)+(1)/(6)":"0,5" };
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
//  fx-991DE X: Zustandsmaschine Berechnungen
// =====================================================================
const OPS=['+','-','*','/','sq','pow'];
const XVK={neg:'A',deg:'B',inv:'C',sin:'D',cos:'E',tan:'F',')':'x',sd:'y',mplus:'M'};
const XVARS=["A","B","C","D","E","F","M","x","y"];
function fresh(mode){ return {mode:mode||'calc', sel:0, entry:new Entry(), last:null, view:'input', hist:[], hidx:-1, shift:false, dec:false, alpha:false, sto:false, vars:{}}; }
function evalEntry(S,approx){
  const s=ser(S.entry.root);
  S.hist.push({h:S.entry.html(false), s, ex:EX[s]||'?', ap:AP[s]||EX[s]||'?', dec:!!approx});
  S.last=S.entry; S.entry=new Entry(); S.view='result'; S.hidx=S.hist.length-1;
}
function step(S,k){
  if(S.mode==='off'){ if(k==='on'){ S.mode='calc'; S.view=S.hist.length?'result':'input'; } return; }
  if(S.mode==='recall'){ if(['ac','exe','sto','on'].includes(k)){ S.mode='calc'; S.entry=new Entry(); S.view='input'; } return; }
  if(k==='shift'){ S.shift=!S.shift; S.alpha=false; return; }
  if(k==='alpha'){ S.alpha=!S.alpha; S.shift=false; return; }
  if(S.alpha){
    S.alpha=false;
    if(S.mode==='calc'&&XVK[k]){ if(S.view!=='input'){ S.entry=new Entry(); S.view='input'; } S.entry.key(XVK[k]); }
    return;
  }
  if(S.sto){
    S.sto=false;
    if(XVK[k]){ const H=S.hist[S.hist.length-1], v=H?(H.dec?H.ap:H.ex):'0'; S.vars[XVK[k]]=v; S.hist.push({h:'Ans→'+XVK[k], s:'', ex:v, ap:v, dec:false}); S.view='result'; S.hidx=S.hist.length-1; }
    return;
  }
  if(S.shift){
    S.shift=false;
    if(k==='sto'&&S.mode==='calc'){ S.mode='recall'; return; }
    if(k==='ac'){ S.mode='off'; return; }
    if(S.mode==='calc'&&k==='exe'){ evalEntry(S,true); return; }
    return;
  }
  if(k==='menu'){ S.mode='menu'; S.sel=0; return; }
  if(S.mode==='menu'){
    if(menuNav(S,k)) return;
    if(k==='1'||(k==='exe'&&S.sel===0)){ S.mode='calc'; S.entry=new Entry(); S.view='input'; }
    return;
  }
  if(k==='sto'){ if(S.mode==='calc'&&S.hist.length) S.sto=true; return; }
  if(k==='exe'){ if(S.view==='input') evalEntry(S,false); return; }
  if(k==='ac'){ S.entry=new Entry(); S.view='input'; return; }
  if(S.view==='history'){
    if(k==='up'){ S.hidx=Math.max(0,S.hidx-1); return; }
    if(k==='down'){ S.hidx++; if(S.hidx>=S.hist.length-1){ S.hidx=S.hist.length-1; S.view='result'; } return; }
    S.view='result';
  }
  if(S.view==='result'){
    if(k==='sd'){ const H=S.hist[S.hist.length-1]; H.dec=!H.dec; return; }
    if(k==='up'&&S.hist.length>1){ S.view='history'; S.hidx=S.hist.length-2; return; }
    if(k==='left'||k==='right'){ if(S.last){ S.entry=S.last.clone(); S.view='input'; } return; }
    if(['up','down'].includes(k)) return;
    S.entry=new Entry(); S.view='input';
    if(OPS.includes(k)) S.entry.root.push('Ans');
  }
  if(['sd','optn','calc','integ','x','log','ln','deg','inv','sin','cos','tan','sto','eng','mplus','e10','on','alpha'].includes(k)) return;
  S.entry.key(k);
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='menu') return drawMenu(S,ziel);
  if(S.mode==='recall') return sbar(S)+'<div style="position:absolute;left:0;right:0;top:15px;padding:0 10px;display:grid;grid-template-columns:1fr 1fr;column-gap:14px;font-size:15px;line-height:19px">'+XVARS.map(v=>`<span${(ziel||[]).includes(v)?' class="ziel"':''}>${v}=${S.vars[v]||'0'}</span>`).join('')+'</div>';
  if(S.alpha||S.sto){ const tag=(S.alpha?'<span class="ind">A</span>':'')+(S.sto?'<span class="ind">STO</span>':''); const base=drawCalc(S); return base.replace('<span class="sp"></span>','<span class="sp"></span>'+tag); }
  return drawCalc(S);
}
function drawCalc(S){
  if(S.view==='input') return sbar(S)+`<div class="app"><div class="ein">${S.entry.html()}</div><div class="aus"></div></div>`;
  const H=S.hist[S.view==='history'?S.hidx:S.hist.length-1];
  const mark=S.view==='history'||S.hist.length>1?`<span class="histmark">${S.hidx>0?'▲':''}${S.view==='history'?'▼':''}</span>`:'';
  return sbar(S,mark)+`<div class="app"><div class="ein">${H.h}</div><div class="aus">${H.dec?H.ap:H.ex}</div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: Aufgabe ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse eintragen, dann <b>Weiter</b>.</p></div>`;
const SQ=r=>`<span class="rt">√<span class="rad">${r}</span></span>`;
const calcStart=()=>fresh('calc');
const TRACKS={
 s:{ name:"1 · Start & Rechnen", start:()=>fresh('off'), steps:[
  {t:"Einschalten", a:"Rechner einschalten", k:["on"],
   d:"<p>Die Taste <b>ON</b> sitzt oben rechts. Oben im Display steht <b>D</b> (Gradmaß) – das bleibt so.</p>"},
  {t:"MENU: alle Modi", a:"Hauptmenü öffnen", k:["menu"], z:["Berechnungen"],
   d:"<p>Hier sehen Sie alle Modi. Wir brauchen nur <b>1: Berechnungen</b>.</p>"},
  {t:"Berechnungen öffnen", a:"Taste 1 drücken", k:["1"],
   d:"<p>Die kleine Zahl am Symbol ist die Kurzwahl: <b>1</b> öffnet Berechnungen.</p>", n:"Wenn etwas komisch aussieht: <b>MENU</b> und dann <b>1</b>."},
  {t:"Kommazahl", a:"3,5 · 4", k:["3",",","5","*","4","exe"],
   d:"<p>Ergebnis: <b>14</b></p>", n:"Das Komma hat eine eigene Taste: unten neben der <b>0</b>. Gerechnet wird mit <b>=</b>."},
  {t:"Punkt vor Strich", a:"12 − 4 · 3", k:["1","2","-","4","*","3","exe"], d:"<p>Erst 4 · 3, dann minus. Ergebnis: <b>0</b></p>"},
  {t:"Klammern", a:"(12 − 4) · 3", k:["(","1","2","-","4",")","*","3","exe"], d:"<p>Die Klammer wird zuerst gerechnet. Ergebnis: <b>24</b></p>"},
  {t:"Vertippt: DEL", a:"12 · 9", k:["1","2","*","8","del","9","exe"], d:"<p>Erst 8 vertippt, mit <b>DEL</b> gelöscht. Ergebnis: <b>108</b></p>"},
  {t:"Alles löschen: AC", a:"Eingabe 25 + 1 verwerfen", k:["2","5","+","1","ac"],
   d:"<p><b>AC</b> löscht die ganze Eingabe.</p>", n:"<b>DEL</b> = ein Zeichen löschen. <b>AC</b> = alles löschen."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(1,["Kommazahlen","Punkt vor Strich und Klammern"])}
 ]},
 v:{ name:"2 · Vorzeichen & Ans", start:calcStart, steps:[
  {t:"Vorzeichen: Taste (−)", a:"−3 + 5", k:["neg","3","+","5","exe"],
   d:"<p>Für das Vorzeichen gibt es eine eigene Taste <b>(−)</b> (links, über STO). Ergebnis: <b>2</b></p>",
   n:"Das Vorzeichen ist im Display etwas <b>kürzer</b> als das Minus."},
  {t:"Die Minus-Falle", a:"Minus-Taste zuerst, dann 3", k:["-","3","exe"],
   d:"<p>Der Rechner schreibt <b>Ans−3</b> und rechnet mit dem letzten Ergebnis: 2 − 3 = <b>−1</b>.</p>",
   n:"<b>−</b> = Rechenzeichen. <b>(−)</b> = Vorzeichen."},
  {t:"Neue Rechnung", a:"12 · 9", k:["1","2","*","9","exe"], d:"<p>Ergebnis: <b>108</b></p>"},
  {t:"Letzte Rechnung ändern: ◀", a:"12 · 7", k:["left","del","7","exe"],
   d:"<p><b>◀</b> holt die letzte Rechnung zurück. 9 löschen, 7 tippen. Ergebnis: <b>84</b></p>"},
  {t:"Weiterrechnen", a:"letztes Ergebnis : 4", k:["/","4","exe"],
   d:"<p>Gleich <b>÷</b> drücken – der Rechner setzt <b>Ans</b> davor. 84 : 4 = <b>21</b></p>"},
  {t:"Die Taste Ans", a:"100 − letztes Ergebnis", k:["1","0","0","-","ans","exe"],
   d:"<p><b>Ans</b> (unten rechts) = letztes Ergebnis (21). 100 − 21 = <b>79</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(2,["Vorzeichen","Weiterrechnen mit Ans","Rechnung mit ◀ ändern"])}
 ]},
 b:{ name:"3 · Brüche & Dezimalzahlen", start:calcStart, steps:[
  {t:"Bruchtaste", a:F(1,3)+" + "+F(1,6), k:["frac","1","down","3","right","+","frac","1","down","6","right","exe"],
   d:"<p><b>▼</b> = in den Nenner, <b>▶</b> = aus dem Bruch heraus. Ergebnis: <b>½</b></p>", n:"Ohne <b>▶</b> landet das + im Nenner."},
  {t:"Teilen mit ÷", a:"3 : 4", k:["3","/","4","exe"], d:"<p>Das Ergebnis ist ein Bruch: <b>¾</b></p>",
   n:"Der Rechner zeigt Ergebnisse gern <b>exakt</b> als Bruch."},
  {t:"Umschalten: S⇔D", a:"¾ als Dezimalzahl", k:["sd"],
   d:"<p><b>S⇔D</b> schaltet zwischen Bruch und Dezimalzahl um. Ergebnis: <b>0,75</b></p>", n:"Noch einmal <b>S⇔D</b> → wieder ¾."},
  {t:"Direkt dezimal: SHIFT + =", a:"1 : 3 als Dezimalzahl", k:["1","/","3","shift","exe"],
   d:"<p>Über <b>=</b> steht <b>≈</b>. Ergebnis: <b>0,3333333333</b></p>"},
  {t:"Dezimalzahl → Bruch", a:"0,75", k:["0",",","7","5","exe"], d:"<p>Der Rechner macht selbst einen Bruch daraus: <b>¾</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(3,["Tabelle: exakt und als Dezimalzahl","Dezimalzahlen in Brüche"])}
 ]},
 p:{ name:"4 · Potenzen & Wurzeln", start:calcStart, steps:[
  {t:"Quadrat", a:"7²", k:["7","sq","exe"], d:"<p>Taste <b><i>x</i>²</b>. Ergebnis: <b>49</b></p>"},
  {t:"Hochzahl", a:"2<sup>10</sup>", k:["2","pow","1","0","exe"], d:"<p>Taste <b><i>x</i><sup>▫</sup></b>. Ergebnis: <b>1024</b></p>"},
  {t:"Aus der Hochzahl: ▶", a:"2³ + 1", k:["2","pow","3","right","+","1","exe"],
   d:"<p>Ergebnis: <b>9</b></p>", n:"Ohne <b>▶</b> rechnet der Rechner 2<sup>3+1</sup> = 16."},
  {t:"Wurzel", a:SQ(144), k:["sqrt","1","4","4","exe"], d:"<p>Taste <b>√▫</b>. Ergebnis: <b>12</b></p>"},
  {t:"Wurzel exakt", a:SQ(8), k:["sqrt","8","exe"], d:"<p>Ergebnis: <b>2√2</b></p>"},
  {t:"Wurzel als Dezimalzahl", a:SQ(8)+" als Dezimalzahl", k:["sd"], d:"<p><b>S⇔D</b>: <b>2,828427125</b></p>"},
  {t:"Ohne Klammer", a:"−2²", k:["neg","2","sq","exe"], d:"<p>Ergebnis: <b>−4</b>, denn −(2²).</p>"},
  {t:"Mit Klammer", a:"(−2)²", k:["(","neg","2",")","sq","exe"], d:"<p>Ergebnis: <b>4</b></p>", n:"Negative Zahl hoch 2 → <b>Klammern</b> setzen."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(4,["Potenzen und Wurzeln","Wurzel exakt und als Dezimalzahl","−3² und (−3)²"])}
 ]},
 m:{ name:"5 · Werte speichern", start:calcStart, steps:[
  {t:"Ergebnis berechnen", a:"2,5 · 4,8", k:["2",",","5","*","4",",","8","exe"], d:"<p>Ergebnis: <b>12</b>. Diesen Wert wollen wir speichern.</p>"},
  {t:"In A speichern: STO", a:"12 in A speichern", k:["sto","neg"],
   d:"<p><b>STO</b> drücken, dann die Taste <b>(−)</b> – über ihr steht rot <b>A</b>. Im Display steht <b>Ans→A</b>: Jetzt ist <b>A = 12</b>.</p>",
   n:"Rote Buchstaben über den Tasten sind die Speicher: A bis F, M, x und y."},
  {t:"Zweiten Wert berechnen", a:"20 : 2,5", k:["2","0","/","2",",","5","exe"], d:"<p>Ergebnis: <b>8</b></p>"},
  {t:"In B speichern", a:"8 in B speichern", k:["sto","deg"],
   d:"<p><b>STO</b>, dann <b>°′″</b> – über ihr steht rot <b>B</b>. Jetzt ist <b>B = 8</b>.</p>"},
  {t:"Mit A und B rechnen: ALPHA", a:"A · B", k:["alpha","neg","*","alpha","deg","exe"],
   d:"<p><b>ALPHA</b> + <b>(−)</b> schreibt <b>A</b>, <b>ALPHA</b> + <b>°′″</b> schreibt <b>B</b>. 12 · 8 = <b>96</b></p>",
   n:"Der Rechner nimmt den <b>genauen</b> gespeicherten Wert – nichts abtippen, keine Rundungsfehler."},
  {t:"Noch eine Rechnung", a:"(A + B) : 4", k:["(","alpha","neg","+","alpha","deg",")","/","4","exe"],
   d:"<p>(12 + 8) : 4 = <b>5</b></p>"},
  {t:"Speicher ansehen: RECALL", a:"alle Speicher anzeigen", k:["shift","sto"],
   d:"<p>Über <b>STO</b> steht <b>RECALL</b>. Die Liste zeigt <b>A = 12</b> und <b>B = 8</b>. Mit <b>AC</b> geht es zurück.</p>",
   n:"Die Werte bleiben gespeichert, auch nach dem Ausschalten. Ein neuer Wert in A ersetzt den alten."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(5,["Werte in A und B speichern","Mit A und B rechnen","Danach: Lösungscode eintragen"])}
 ]}
};
const ORDER_X=["s","v","b","p","m"];

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["s","v","b","p","m"];
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
  $('scr').innerHTML=draw(stateAt(tr,st,pos), pos<S.k.length?S.z:null);
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
