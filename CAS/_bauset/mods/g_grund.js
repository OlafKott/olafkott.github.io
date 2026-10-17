GUIDES["grund"]={
 title:"Grundlagen",
 css:String.raw`[data-g="grund"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="grund"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="grund"] .calc{ transform:scale(.92); transform-origin:top center; } }`,
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

// =====================================================================
//  Zustandsmaschine des Rechners
// =====================================================================
const OPS=['+','-','*','/','sq','pow'];
const SETM=["Recheneinstell.","Systemeinstell.","Zurücksetzen"];
const RESM=["Einstell.&Daten","Variablenspeich.","Alle initialis."];
const FMT=["Voreinstellung","Dezimal","Primfaktor","Periodendarstell."];
const APPS=["Berechnung","Statistik","Verteilung","Tabellenk.","Wertetab.","Gleichung","Ungleichung","Komplex","Basis-N","Matrix","Vektor","Verhältnis","Mathebox"];
const VARS=["A","B","C","D","E","F","x","y","z"], VSUB=["Speichern","Abrufen"];
function fresh(mode){ return {mode:mode||'calc', sel:0, entry:new Entry(), last:null, view:'input', hist:[], hidx:-1, shift:false, vars:{}, vsub:-1}; }
function evalEntry(S,approx){
  const s=ser(S.entry.root);
  const res=approx?(AP[s]||'?'):(EX[s]||'?');
  S.hist.push({h:S.entry.html(false), res, s});
  S.last=S.entry; S.entry=new Entry(); S.view='result'; S.hidx=S.hist.length-1;
}
function step(S,k){
  if(S.mode==='off'){ if(k==='on'){ S.mode='calc'; S.view=S.hist.length?'result':'input'; } return; }
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){
    S.shift=false;
    if(S.mode==='calc'){
      if(k==='ac'){ S.mode='off'; return; }
      if(k==='exe'){ evalEntry(S,true); return; }
      if(k==='-'){ if(S.view!=='input'){ S.entry=new Entry(); S.view='input'; } S.entry.key('neg'); return; }
      const VK={'4':'A','5':'B','6':'C','1':'D','2':'E','3':'F'};
      if(VK[k]){ if(S.view!=='input'){ S.entry=new Entry(); S.view='input'; } S.entry.key(VK[k]); return; }
    }
    return;
  }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if(k==='1'){ S.mode='calc'; S.entry=new Entry(); S.view='input'; }
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='calc'; S.entry=new Entry(); S.view='input'; }
     return;
   case 'settings': case 'reset': case 'format': {
     const L=S.mode==='settings'?SETM:S.mode==='reset'?RESM:FMT;
     if(k==='down') S.sel=Math.min(L.length-1,S.sel+1);
     else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac'){ S.mode=S.mode==='reset'?'settings':'calc'; S.sel=S.mode==='settings'?2:0; }
     else if(k==='ok'||k==='exe'){
       if(S.mode==='settings'&&S.sel===2){ S.mode='reset'; S.sel=0; }
       else if(S.mode==='reset'){ S.mode='confirm'; S.sel=0; }
       else if(S.mode==='format'){ const H=S.hist[S.hist.length-1]; if(S.sel===1&&H) H.res=AP[H.s]||H.res; else if(S.sel===0&&H) H.res=EX[H.s]||H.res; S.mode='calc'; S.view='result'; }
     }
     return; }
   case 'confirm':
     if(k==='ok'||k==='exe'){ S.mode='done'; S.hist=[]; S.last=null; S.entry=new Entry(); }
     else if(k==='back'){ S.mode='reset'; }
     return;
   case 'done':
     if(k==='ac'||k==='ok'||k==='back'){ S.mode='calc'; S.view='input'; }
     return;
   case 'vars':
     if(S.vsub>=0){
       if(k==='down') S.vsub=Math.min(VSUB.length-1,S.vsub+1); else if(k==='up') S.vsub=Math.max(0,S.vsub-1);
       else if(k==='back'||k==='ac') S.vsub=-1;
       else if((k==='ok'||k==='exe')&&S.vsub===0){ const H=S.hist[S.hist.length-1]; S.vars[VARS[S.sel]]=H?H.res:'0'; S.vsub=-1; }
       return;
     }
     if(k==='down') S.sel=Math.min(VARS.length-1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok') S.vsub=0;
     else if(k==='ac'||k==='back'||k==='var'){ S.mode='calc'; S.entry=new Entry(); S.view='input'; }
     return;
  }
  // ---- App Berechnung ----
  if(k==='settings'){ S.mode='settings'; S.sel=0; return; }
  if(k==='var'){ S.mode='vars'; S.sel=0; S.vsub=-1; return; }
  if(k==='exe'){ if(S.view==='input') evalEntry(S,false); return; }
  if(k==='ac'){ S.entry=new Entry(); S.view='input'; return; }
  if(S.view==='history'){
    if(k==='up'){ S.hidx=Math.max(0,S.hidx-1); return; }
    if(k==='down'){ S.hidx++; if(S.hidx>=S.hist.length-1){ S.hidx=S.hist.length-1; S.view='result'; } return; }
    S.view='result';
  }
  if(S.view==='result'){
    if(k==='up'&&S.hist.length>1){ S.view='history'; S.hidx=S.hist.length-2; return; }
    if(k==='left'||k==='right'){ if(S.last){ S.entry=S.last.clone(); S.view='input'; } return; }
    if(k==='format'){ S.mode='format'; S.sel=0; return; }
    if(['up','down','ok','back','format'].includes(k)) return;
    S.entry=new Entry(); S.view='input';
    if(OPS.includes(k)) S.entry.root.push('Ans');
  }
  if(['ok','back','format','pgup','pgdn','var','func','cat','tools','x','log','sin','cos','tan','e10','on'].includes(k)) return;
  S.entry.key(k);
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }

// =====================================================================
//  Display zeichnen
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
function draw(S,ziel){
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='home'){
    const r0=Math.min(Math.floor(S.sel/3), Math.ceil(APPS.length/3)-2);
    const vis=APPS.map((a,i)=>[a,i]).filter(([a,i])=>Math.floor(i/3)>=r0&&Math.floor(i/3)<r0+2);
    const rows=Math.ceil(APPS.length/3), top=r0/rows*100, h=2/rows*100;
    return `<div class="home"><div class="grid">`+
      vis.map(([a,i])=>`<div class="ic${i===S.sel?' sel':''}${zl(a,ziel)}"><span class="bd">${BADGE[i]}</span>${ICON[a]}<span class="an">${a}</span></div>`).join('')+
      `</div><div class="sbar"><i style="top:${top}%;height:${h}%"></i></div></div>`;
  }
  if(['settings','reset','format'].includes(S.mode)){
    const L=S.mode==='settings'?SETM:S.mode==='reset'?RESM:FMT;
    const T=S.mode==='settings'?'SETTINGS':S.mode==='reset'?'Zurücksetzen':'FORMAT';
    return sbar(S)+`<div class="list"><div class="ti">${T}</div>`+L.map((t,i)=>`<div class="it${i===S.sel?' sel':''}${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
  }
  if(S.mode==='vars'){
    if(S.vsub>=0) return sbar(S)+`<div class="list"><div class="ti">${VARS[S.sel]}=</div>`+VSUB.map((t,i)=>`<div class="it${i===S.vsub?' sel':''}${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
    const o=Math.max(0,Math.min(S.sel-1,VARS.length-4));
    return sbar(S)+`<div class="list"><div class="ti">Variable</div>`+VARS.slice(o,o+4).map((v,i)=>`<div class="it${i+o===S.sel?' sel':''}${zl(v,ziel)}">${v}=${S.vars[v]||'0'}</div>`).join('')+'</div>';
  }
  if(S.mode==='confirm') return sbar(S)+`<div class="msg">Einstellungen &amp; Daten<br>zurücksetzen?<div class="bt"><span class="sel${zl('Ja',ziel)}">Ja [OK]</span><span>Abbrechen [↶]</span></div></div>`;
  if(S.mode==='done') return sbar(S)+'<div class="msg" style="top:34px"><b>Zurückgesetzt!</b><div style="font-size:11px;margin-top:4px">Weiter mit AC</div></div>';
  // Berechnung
  if(S.view==='input') return sbar(S)+`<div class="app"><div class="ein">${S.entry.html()}</div><div class="aus"></div></div>`;
  const H=S.hist[S.view==='history'?S.hidx:S.hist.length-1];
  const mark=S.view==='history'||S.hist.length>1?`<span class="histmark">${S.hidx>0?'▲':''}${S.view==='history'?'▼':''}</span>`:'';
  return sbar(S,mark)+`<div class="app"><div class="ein">${H.h}</div><div class="aus">${H.res}</div></div>`;
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
   d:"<p>Die Taste <b>ON</b> sitzt oben links. Oben im Display steht <b>D</b> (Gradmaß) – das bleibt so.</p>"},
  {t:"HOME: alle Apps", a:"Startbildschirm öffnen", k:["home"], z:["Berechnung"],
   d:"<p>Hier sehen Sie alle Apps. Wir brauchen nur <b>Berechnung</b> (schwarz markiert).</p>", n:"Mit <b>▼</b> blättern Sie zu weiteren Apps. Die kleine Zahl oben rechts ist eine Abkürzung: <b>1</b> öffnet Berechnung direkt."},
  {t:"App Berechnung öffnen", a:"Berechnung starten", k:["ok"],
   d:"<p><b>OK</b> öffnet die markierte App.</p>", n:"Wenn etwas komisch aussieht: <b>HOME</b> und dann <b>OK</b>."},
  {t:"Kommazahl", a:"3,5 · 4", k:["3",",","5","*","4","exe"],
   d:"<p>Ergebnis: <b>14</b></p>", n:"Das Komma hat eine eigene Taste: unten neben der <b>0</b>."},
  {t:"Punkt vor Strich", a:"12 − 4 · 3", k:["1","2","-","4","*","3","exe"],
   d:"<p>Erst 4 · 3, dann minus. Ergebnis: <b>0</b></p>"},
  {t:"Klammern", a:"(12 − 4) · 3", k:["(","1","2","-","4",")","*","3","exe"],
   d:"<p>Die Klammer wird zuerst gerechnet. Ergebnis: <b>24</b></p>"},
  {t:"Vertippt: ⌫", a:"12 · 9", k:["1","2","*","8","del","9","exe"],
   d:"<p>Erst 8 vertippt, mit <b>⌫</b> gelöscht. Ergebnis: <b>108</b></p>"},
  {t:"Alles löschen: AC", a:"Eingabe 25 + 1 verwerfen", k:["2","5","+","1","ac"],
   d:"<p><b>AC</b> löscht die ganze Eingabe.</p>", n:"<b>⌫</b> = ein Zeichen löschen. <b>AC</b> = alles löschen."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(1,["Kommazahlen","Punkt vor Strich und Klammern"])}
 ]},
 v:{ name:"2 · Vorzeichen & Ans", start:calcStart, steps:[
  {t:"Vorzeichen: SHIFT + −", a:"−3 + 5", k:["shift","-","3","+","5","exe"],
   d:"<p>Gelbe Schrift über einer Taste = erst <b>SHIFT</b>. Über <b>−</b> steht <b>(−)</b>. Ergebnis: <b>2</b></p>",
   n:"Das Vorzeichen ist im Display etwas <b>kürzer</b> als das Minus."},
  {t:"Die Minus-Falle", a:"Minus-Taste zuerst, dann 3", k:["-","3","exe"],
   d:"<p>Der Rechner schreibt <b>Ans−3</b> und rechnet mit dem letzten Ergebnis: 2 − 3 = <b>−1</b>.</p>",
   n:"<b>−</b> = Rechenzeichen. <b>SHIFT + −</b> = Vorzeichen."},
  {t:"Neue Rechnung", a:"12 · 9", k:["1","2","*","9","exe"], d:"<p>Ergebnis: <b>108</b></p>"},
  {t:"Letzte Rechnung ändern: ◀", a:"12 · 7", k:["left","del","7","exe"],
   d:"<p><b>◀</b> holt die letzte Rechnung zurück. 9 löschen, 7 tippen. Ergebnis: <b>84</b></p>"},
  {t:"Weiterrechnen", a:"letztes Ergebnis : 4", k:["/","4","exe"],
   d:"<p>Gleich <b>÷</b> drücken – der Rechner setzt <b>Ans</b> davor. 84 : 4 = <b>21</b></p>"},
  {t:"Die Taste Ans", a:"100 − letztes Ergebnis", k:["1","0","0","-","ans","exe"],
   d:"<p><b>Ans</b> = letztes Ergebnis (21). 100 − 21 = <b>79</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(2,["Vorzeichen","Weiterrechnen mit Ans","Rechnung mit ◀ ändern"])}
 ]},
 b:{ name:"3 · Brüche & Dezimalzahlen", start:calcStart, steps:[
  {t:"Bruchtaste", a:F(1,3)+" + "+F(1,6), k:["frac","1","down","3","right","+","frac","1","down","6","right","exe"],
   d:"<p><b>▼</b> = in den Nenner, <b>▶</b> = aus dem Bruch heraus. Ergebnis: <b>½</b></p>", n:"Ohne <b>▶</b> landet das + im Nenner."},
  {t:"Teilen mit ÷", a:"3 : 4", k:["3","/","4","exe"], d:"<p>Das Ergebnis ist ein Bruch: <b>¾</b></p>",
   n:"Der Rechner zeigt Ergebnisse gern <b>exakt</b> als Bruch."},
  {t:"Dezimalzahl: SHIFT + EXE", a:"3 : 4 als Dezimalzahl", k:["3","/","4","shift","exe"],
   d:"<p>Über <b>EXE</b> steht <b>≈</b>. Ergebnis: <b>0,75</b></p>"},
  {t:"Ergebnis umwandeln", a:"1 : 3", k:["1","/","3","exe"], d:"<p>Ergebnis: <b>⅓</b></p>"},
  {t:"FORMAT ▸ Dezimal", a:"⅓ als Dezimalzahl", k:["format","down","ok"], z:["Dezimal"],
   d:"<p><b>FORMAT</b> öffnet eine Liste. <b>Dezimal</b> wählen, <b>OK</b>. Ergebnis: <b>0,3333333333</b></p>",
   n:"<b>Voreinstellung</b> macht daraus wieder ⅓."},
  {t:"Dezimalzahl → Bruch", a:"0,75", k:["0",",","7","5","exe"], d:"<p>Der Rechner macht selbst einen Bruch daraus: <b>¾</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(3,["Tabelle: exakt und als Dezimalzahl","Dezimalzahlen in Brüche"])}
 ]},
 p:{ name:"4 · Potenzen & Wurzeln", start:calcStart, steps:[
  {t:"Quadrat", a:"7²", k:["7","sq","exe"], d:"<p>Taste <b>▫²</b>. Ergebnis: <b>49</b></p>"},
  {t:"Hochzahl", a:"2<sup>10</sup>", k:["2","pow","1","0","exe"], d:"<p>Taste <b>▫<sup>▫</sup></b>. Ergebnis: <b>1024</b></p>"},
  {t:"Aus der Hochzahl: ▶", a:"2³ + 1", k:["2","pow","3","right","+","1","exe"],
   d:"<p>Ergebnis: <b>9</b></p>", n:"Ohne <b>▶</b> rechnet der Rechner 2<sup>3+1</sup> = 16."},
  {t:"Wurzel", a:SQ(144), k:["sqrt","1","4","4","exe"], d:"<p>Taste <b>√▫</b>. Ergebnis: <b>12</b></p>"},
  {t:"Wurzel exakt", a:SQ(8), k:["sqrt","8","exe"], d:"<p>Ergebnis: <b>2√2</b></p>"},
  {t:"Wurzel als Dezimalzahl", a:SQ(8)+" als Dezimalzahl", k:["sqrt","8","shift","exe"], d:"<p>Ergebnis: <b>2,828427125</b></p>"},
  {t:"Ohne Klammer", a:"−2²", k:["shift","-","2","sq","exe"], d:"<p>Ergebnis: <b>−4</b>, denn −(2²).</p>"},
  {t:"Mit Klammer", a:"(−2)²", k:["(","shift","-","2",")","sq","exe"], d:"<p>Ergebnis: <b>4</b></p>",
   n:"Negative Zahl hoch 2 → <b>Klammern</b> setzen."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(4,["Potenzen und Wurzeln","Wurzel exakt und als Dezimalzahl","−3² und (−3)²"])}
 ]},
 m:{ name:"5 · Werte speichern", start:calcStart, steps:[
  {t:"Ergebnis berechnen", a:"2,5 · 4,8", k:["2",",","5","*","4",",","8","exe"], d:"<p>Ergebnis: <b>12</b>. Diesen Wert wollen wir speichern.</p>"},
  {t:"In A speichern: VARIABLE", a:"12 in A speichern", k:["var","ok","ok"], z:["A","Speichern"],
   d:"<p><b>VARIABLE</b> öffnet die Liste der Speicher. <b>A=</b> ist markiert: <b>OK</b> ▸ <b>Speichern</b> ▸ <b>OK</b>. Jetzt ist <b>A = 12</b>.</p>",
   n:"Es gibt die Speicher A bis F sowie x, y und z."},
  {t:"Zweiten Wert berechnen", a:"20 : 2,5", k:["ac","2","0","/","2",",","5","exe"],
   d:"<p><b>AC</b> führt zurück zur Rechnung. Ergebnis: <b>8</b></p>"},
  {t:"In B speichern", a:"8 in B speichern", k:["var","down","ok","ok"], z:["B","Speichern"],
   d:"<p><b>VARIABLE</b>, mit <b>▼</b> zu <b>B=</b>, dann <b>OK</b> ▸ <b>Speichern</b> ▸ <b>OK</b>. Jetzt ist <b>B = 8</b>.</p>"},
  {t:"Mit A und B rechnen", a:"A · B", k:["ac","shift","4","*","shift","5","exe"],
   d:"<p>Über der <b>4</b> steht <b>A</b>, über der <b>5</b> steht <b>B</b>. Mit <b>SHIFT</b> davor schreibt der Rechner den Buchstaben. 12 · 8 = <b>96</b></p>",
   n:"Der Rechner nimmt den <b>genauen</b> gespeicherten Wert – nichts abtippen, keine Rundungsfehler."},
  {t:"Noch eine Rechnung", a:"(A + B) : 4", k:["(","shift","4","+","shift","5",")","/","4","exe"],
   d:"<p>(12 + 8) : 4 = <b>5</b></p>"},
  {t:"Speicher ansehen", a:"Liste der Speicher öffnen", k:["var"],
   d:"<p>Die Liste zeigt <b>A = 12</b> und <b>B = 8</b>. Mit <b>AC</b> geht es zurück.</p>",
   n:"Die Werte bleiben gespeichert, auch nach dem Ausschalten. Ein neuer Wert in A ersetzt den alten."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB(5,["Werte in A und B speichern","Mit A und B rechnen","Danach: Lösungscode eintragen"])}
 ]}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["s","v","b","p","m"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const BX='<span class="bx"></span>';
const LBL={on:"ON",home:"HOME ⌂",settings:"SETTINGS",var:"VARIABLE",back:"↶",ok:"OK",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",
 exe:"EXE",ac:"AC",del:"⌫",ans:"Ans",format:"FORMAT","*":"×","/":"÷","-":"−",
 frac:'<span class="mf"><i></i><b></b><i></i></span>', sqrt:'√'+BX, sq:BX+'<sup>2</sup>', pow:BX+'<sup>▫</sup>'};
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
