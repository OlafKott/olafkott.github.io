GUIDES["dx_funk"]={
 title:"Funktionswerte berechnen",
 css:String.raw`[data-g="dx_funk"] .calc{ width:330px; flex:0 0 330px; border-radius:30px; box-shadow:0 6px 22px rgba(0,0,0,.25); background:radial-gradient(#2a2a2e 1px, transparent 1.2px) 0 0/5px 5px, #1e1e21; border:6px solid #e6e6ea; padding:14px 13px 16px; }
[data-g="dx_funk"] .calc > *{ position:relative; }
[data-g="dx_funk"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; }
[data-g="dx_funk"] .aus{ font-size:21px; text-align:right; min-height:34px; display:flex; justify-content:flex-end; align-items:center; font-weight:bold; white-space:nowrap; }
[data-g="dx_funk"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="dx_funk"] .fr > span.leer::after{ content:"\25A1"; opacity:.55; }
[data-g="dx_funk"] .aus .fr{ font-size:16px; }
[data-g="dx_funk"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="dx_funk"] .fr .caret{ height:11px; }
[data-g="dx_funk"] .alt{ opacity:.55; font-weight:normal; }
[data-g="dx_funk"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="dx_funk"] .chip.b{ background:#2463c9; }
[data-g="dx_funk"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="dx_funk"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="dx_funk"] .task .term .fr{ font-size:17px; }`,
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
function menuNav(S,k){
  if(k==='right') S.sel=Math.min(XAPPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
  else if(k==='down') S.sel=Math.min(XAPPS.length-1,S.sel+4); else if(k==='up') S.sel=Math.max(0,S.sel-4);
  else return false;
  return true;
}
function sbar(S,extra){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span>${extra||''}</div>`; }

// =====================================================================
//  Exakte Bruchrechnung (wie der Rechner im Math-Modus)
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
    if(typeof k==='object'){ flush(); fs.push(R(numR(k.n||'0').p*numR(k.d||'1').q, numR(k.n||'0').q*numR(k.d||'1').p)); continue; }
    if(/^[0-9,]$/.test(k)){ num+=k; continue; }
    if(k==='x'){ flush(); fs.push(x||R(0)); continue; }
    if(k==='sq'){ flush(); const l=fs.pop(); if(l) fs.push(mulR(l,l)); continue; }
    if(k==='+'||k==='-'||k==='neg'){ flush(); const s=k==='+'?1:-1; if(fs.length){ endTerm(); sign=s; } else sign*=s; }
  }
  endTerm(); return total;
}
function fmtR(r,dec){
  if(r.q===1) return String(r.p).replace('-','−');
  if(dec) return Number((r.p/r.q).toPrecision(10)).toString().replace('.',',').replace('-','−');
  return (r.p<0?'−':'')+`<span class="fr"><span>${Math.abs(r.p)}</span><span>${r.q}</span></span>`;
}

// =====================================================================
//  Eingabezeile
// =====================================================================
const newEd=()=>({t:[], fr:null});
function typeEd(ed,k){
  if(ed.fr){
    const f=ed.fr;
    if(/^[0-9,]$/.test(k)){ f[f.part]+=k; return true; }
    if(k==='down'){ f.part='d'; return true; }
    if(k==='up'){ f.part='n'; return true; }
    if(k==='right'){ if(f.part==='n') f.part='d'; else closeFr(ed); return true; }
    if(k==='del'){ if(f[f.part]) f[f.part]=f[f.part].slice(0,-1); else if(f.part==='d') f.part='n'; else ed.fr=null; return true; }
    closeFr(ed);
  }
  if(k==='frac'){ ed.fr={n:'',d:'',part:'n'}; return true; }
  if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg'].includes(k)){ ed.t.push(k); return true; }
  if(k==='del'){ ed.t.pop(); return true; }
  return false;
}
function closeFr(ed){ if(ed.fr){ ed.t.push({n:ed.fr.n,d:ed.fr.d}); ed.fr=null; } }
const TK={neg:'−','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>'};
const frH=(n,d,cn,cd)=>`<span class="fr"><span class="${n?'':'leer'}">${n}${cn?'<span class="caret"></span>':''}</span><span class="${d?'':'leer'}">${d}${cd?'<span class="caret"></span>':''}</span></span>`;
function renderEd(ed,caret){
  let h=ed.t.map(k=>typeof k==='object'?frH(k.n,k.d):(TK[k]||k)).join('');
  if(ed.fr) h+=frH(ed.fr.n,ed.fr.d,caret&&ed.fr.part==='n',caret&&ed.fr.part==='d');
  else if(caret) h+='<span class="caret"></span>';
  return h;
}

// =====================================================================
//  Rechnerzustand
// =====================================================================
function fresh(){ return {mode:'edit', sel:0, ed:newEd(), pe:newEd(), xv:R(0), res:null, dec:false, shift:false}; }
function step(S,k){
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; if(k==='ac') S.mode='off'; return; }
  if(k==='on'){ if(S.mode==='off') S.mode='edit'; return; }
  if(S.mode==='off') return;
  if(k==='menu'){ S.mode='menu'; S.sel=0; return; }
  switch(S.mode){
   case 'menu':
     if(menuNav(S,k)) return;
     if(k==='1'||(k==='exe'&&S.sel===0)){ S.mode='edit'; S.ed=newEd(); }
     return;
   case 'edit':
     if(k==='calc'){ closeFr(S.ed); S.mode='prompt'; S.pe=newEd(); return; }
     if(k==='ac'){ S.ed=newEd(); return; }
     typeEd(S.ed,k); return;
   case 'prompt':
     if(k==='exe'){ closeFr(S.pe); if(S.pe.t.length) S.xv=evalT(S.pe.t,null); S.res=evalT(S.ed.t,S.xv); S.dec=false; S.mode='result'; return; }
     if(k==='ac'){ S.mode='edit'; return; }
     typeEd(S.pe,k); return;
   case 'result':
     if(k==='sd'){ S.dec=!S.dec; return; }
     if(k==='calc'){ S.mode='prompt'; S.pe=newEd(); return; }
     if(k==='ac'){ S.mode='edit'; S.ed=newEd(); return; }
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='menu') return drawMenu(S,ziel);
  if(S.mode==='edit') return sbar(S)+`<div class="app"><div class="ein">${renderEd(S.ed,true)}</div><div class="aus"></div></div>`;
  if(S.mode==='prompt'){
    const inp=(S.pe.t.length||S.pe.fr)?renderEd(S.pe,true):`<span class="alt">${fmtR(S.xv,false)}</span><span class="caret"></span>`;
    return sbar(S)+`<div class="app"><div class="ein"><span class="vx">x</span>=</div><div class="aus${zl('x',ziel)}">${inp}</div></div>`;
  }
  return sbar(S)+`<div class="app"><div class="ein">${renderEd(S.ed,false)}</div><div class="aus${zl('res',ziel)}">${fmtR(S.res,S.dec)}</div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const FR=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const termF=`<i>f</i>(<i>x</i>) = −0,25<i>x</i><sup>2</sup> + ${FR(2,3)}<i>x</i> + 3`;
const termG=`<i>g</i>(<i>x</i>) = 0,5<i>x</i><sup>2</sup> − 3<i>x</i> + 2,5`;
const T1=[
  {t:"Modus Berechnungen öffnen", a:termF, k:["menu","1"], z:["Berechnungen"],
   d:"<p>Funktionswerte berechnen Sie im Modus <b>1: Berechnungen</b>. Drücken Sie <b>MENU</b> und dann <b>1</b>. Das Display ist leer.</p>"},
  {t:"Erster Summand: −0,25x²", a:termF, k:["neg","0",",","2","5","x","sq"],
   d:"<p>Das Minus <b>am Anfang</b> ist ein Vorzeichen – dafür nehmen Sie die Taste <b>(−)</b>.</p><p>Die Variable <b>x</b> hat eine eigene Taste: oben rechts.</p>",
   n:"<b>f(x) =</b> tippen Sie nicht ein. Der Rechner braucht nur den Term."},
  {t:"Bruch: + ⅔x", a:termF, k:["+","frac","2","down","3","right","x"],
   d:"<p>Die <b>Bruch-Taste</b> öffnet einen leeren Bruch. Zähler tippen, mit <b>▼</b> in den Nenner, mit <b>▶</b> aus dem Bruch heraus.</p>"},
  {t:"Zum Schluss: + 3", a:termF, k:["+","3"],
   d:"<p>Der ganze Term steht jetzt im Display. Vergleichen Sie mit der Aufgabe oben.</p>",
   n:"Vertippt? Mit <b>◀</b> zur Stelle gehen und mit <b>DEL</b> löschen."}
];
const T2=[
  {t:"CALC drücken", a:termF+"<br>Gesucht: <i>f</i>(2)", k:["calc"], z:["x"],
   d:"<p><b>CALC</b> setzt einen Wert für <b>x</b> ein. Der Rechner fragt: <b>x = ?</b></p>"},
  {t:"x = 2 eingeben", a:termF+"<br>Gesucht: <i>f</i>(2)", k:["2","exe"], z:["res"],
   d:"<p>Wert tippen und mit <b>=</b> bestätigen. Das Ergebnis erscheint <b>exakt als Bruch</b>: <b>10/3</b>.</p>"},
  {t:"In Dezimalzahl umwandeln", a:termF+"<br>Gesucht: <i>f</i>(2)", k:["sd"], z:["res"],
   d:"<p><b>S⇔D</b> wandelt um: 3,333333333.</p><p>Gerundet: <b>f(2) ≈ 3,33</b>. Der Punkt heißt <b>P(2 / 3,33)</b>.</p>"},
  {t:"Negativer x-Wert", a:termF+"<br>Gesucht: <i>f</i>(−4)", k:["calc","neg","4","exe","sd"], z:["res"],
   d:"<p>Wieder <b>CALC</b> – der Term bleibt gespeichert. Für −4 nehmen Sie <b>(−)</b>.</p><p>Ergebnis: −11/3 ≈ <b>−3,67</b></p>",
   n:"Sie brauchen <b>keine Klammer</b> um −4. Der Rechner rechnet (−4)² = 16 richtig."},
  {t:"Bruch als x-Wert", a:termF+"<br>Gesucht: <i>f</i>("+FR(1,2)+")", k:["calc","frac","1","down","2","exe","sd"], z:["res"],
   d:"<p>Auch ein Bruch geht: <b>Bruch-Taste</b>, 1, <b>▼</b>, 2, dann direkt <b>=</b>.</p><p>Ergebnis: 157/48 ≈ <b>3,27</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1",["Neue Funktion: zuerst <b>AC</b>, dann den Term von <b><i>f</i></b> eingeben","Für jeden x-Wert: <b>CALC</b> ▸ Wert ▸ <b>=</b> ▸ <b>S⇔D</b>","Auf zwei Nachkommastellen runden und den Punkt notieren"])}
];
const T3=[
  {t:"Alten Term löschen", a:termG, k:["ac"],
   d:"<p><b>AC</b> macht das Display leer. Jetzt können Sie eine neue Funktion eingeben.</p>"},
  {t:"Neuen Term eingeben", a:termG, k:["0",",","5","x","sq","-","3","x","+","2",",","5"],
   d:"<p>Hier ist das Minus <b>zwischen</b> zwei Summanden. Dafür nehmen Sie die normale Taste <b>−</b> (Rechenzeichen).</p>",
   n:"Merke: <b>(−)</b> = Vorzeichen am Anfang, <b>−</b> = Rechenzeichen in der Mitte."},
  {t:"Funktionswert berechnen", a:termG+"<br>Gesucht: <i>g</i>(1,2)", k:["calc","1",",","2","exe","sd"], z:["res"],
   d:"<p><b>CALC</b>, x-Wert <b>1,2</b> eingeben, mit <b>=</b> bestätigen. Der Rechner zeigt −19/50.</p><p>Mit <b>S⇔D</b>: <b>g(1,2) = −0,38</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",["Die markierten x-Werte am Graphen ablesen","Mit <b>CALC</b> die Funktionswerte berechnen","Ergebnis in das Feld an der Pfeilspitze schreiben","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  c:{name:"1 · Funktion eingeben und CALC", start:()=>fresh(), steps:[...T1,...T2]},
  n:{name:"2 · Neue Funktion", start:()=>run(fresh(),["menu","1",...allK(T1),...allK(T2)]), steps:T3}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["c","n"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",menu:"MENU",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",optn:"OPTN",calc:"CALC",
 exe:"=",ac:"AC",del:"DEL",sd:"S⇔D",neg:"(−)","-":"−","+":"+",x:'<i class="v">x</i>',
 frac:'Bruch <span class="mf"><i></i><b></b><i></i></span>', sq:'<i class="v">x</i><sup>2</sup>'};
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
  $('scr').innerHTML=draw(stateAt(tr,st,pos), pos>=S.k.length?S.z:(S.z||[]).filter(z=>z!=='res'));
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
    if(pos>=S.k.length){ lock=true; setTimeout(()=>{ lock=false; advance(); },1400); }
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
