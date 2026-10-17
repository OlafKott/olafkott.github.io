GUIDES["funk"]={
 title:"Funktionswerte berechnen",
 css:String.raw`[data-g="funk"] .ein{ font-size:17px; min-height:34px; display:flex; align-items:center; white-space:nowrap; }
[data-g="funk"] .aus{ font-size:21px; text-align:right; min-height:34px; display:flex; justify-content:flex-end; align-items:center; font-weight:bold; white-space:nowrap; }
[data-g="funk"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:19px; padding:0 1px; }
[data-g="funk"] .fr > span.leer::after{ content:"\25A1"; opacity:.55; }
[data-g="funk"] .aus .fr{ font-size:16px; }
[data-g="funk"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="funk"] .defl{ font-size:15px; margin-right:2px; }
[data-g="funk"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="funk"] .task .term{ font-family:Cambria,Georgia,serif; font-size:22px; line-height:1.6; color:var(--ink); }
[data-g="funk"] .task .term .fr{ font-size:17px; }`,
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
//  Exakte Bruchrechnung
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
    if(typeof k==='object'){ flush(); const n=numR(k.n||'0'), d=numR(k.d||'1'); fs.push(R(n.p*d.q, n.q*d.p)); continue; }
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
function closeFr(ed){ if(ed.fr){ ed.t.push({n:ed.fr.n,d:ed.fr.d}); ed.fr=null; } }
function typeEd(ed,k){
  if(ed.fr){
    const f=ed.fr;
    if(/^[0-9,]$/.test(k)){ f[f.part]+=k; return; }
    if(k==='down'){ f.part='d'; return; }
    if(k==='up'){ f.part='n'; return; }
    if(k==='right'){ if(f.part==='n') f.part='d'; else closeFr(ed); return; }
    if(k==='del'){ if(f[f.part]) f[f.part]=f[f.part].slice(0,-1); else if(f.part==='d') f.part='n'; else ed.fr=null; return; }
    closeFr(ed);
  }
  if(k==='frac'){ ed.fr={n:'',d:'',part:'n'}; return; }
  if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg','(',')'].includes(k)){ ed.t.push(k); return; }
  if(k==='del'){ ed.t.pop(); return; }
}
const TK={neg:'<span class="ng">−</span>','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>'};
const frH=(n,d,cn,cd)=>`<span class="fr"><span class="${n?'':'leer'}">${n}${cn?'<span class="caret"></span>':''}</span><span class="${d?'':'leer'}">${d}${cd?'<span class="caret"></span>':''}</span></span>`;
function renderEd(ed,caret){
  let h=ed.t.map(k=>typeof k==='object'?(k.fn?`<span class="vx">${k.fn}</span>(`:frH(k.n,k.d)):(TK[k]||k)).join('');
  if(ed.fr) h+=frH(ed.fr.n,ed.fr.d,caret&&ed.fr.part==='n',caret&&ed.fr.part==='d');
  else if(caret) h+='<span class="caret"></span>';
  return h;
}

// =====================================================================
//  Rechnerzustand: App Berechnung mit FUNCTION-Menü
// =====================================================================
const FMENU=["f(x)","g(x)","f(x) definieren","g(x) definieren"];
const FORMAT=["Voreinstellung","Dezimal","Primfaktor"];
function fresh(){ return {mode:'calc', sel:0, ed:newEd(), def:{f:null,g:null}, dEd:newEd(), which:'f', last:null, res:null, dec:false, shift:false}; }
function evalCalc(S){
  const t=S.ed.t, fn=t[0]&&t[0].fn;
  if(fn){ let arg=t.slice(1); if(arg[arg.length-1]===')') arg=arg.slice(0,-1); return evalT(S.def[fn]||[], evalT(arg,null)); }
  return evalT(t,R(0));
}
function step(S,k){
  if(S.mode==='off'){ if(k==='on') S.mode='calc'; return; }
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){
    S.shift=false;
    if(k==='ac'){ S.mode='off'; return; }
    if(k==='-'){ k='neg'; }
    else if(k==='exe'&&S.mode==='calc'){ closeFr(S.ed); S.res=evalCalc(S); S.dec=true; S.mode='result'; return; }
    else return;
  }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if(k==='1'||((k==='ok'||k==='exe')&&S.sel===0)){ S.mode='calc'; S.ed=newEd(); }
     return;
   case 'fmenu':
     if(k==='down') S.sel=Math.min(FMENU.length-1,S.sel+1);
     else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac') S.mode=S.from;
     else if(k==='ok'||k==='exe'){
       if(S.sel<2){ if(S.from==='result') S.ed=newEd(); S.ed.t.push({fn:S.sel?'g':'f'}); S.mode='calc'; }
       else { S.which=S.sel===2?'f':'g'; S.dEd=newEd(); S.mode='def'; }
     }
     return;
   case 'def':
     if(k==='exe'){ closeFr(S.dEd); S.def[S.which]=S.dEd.t; S.mode='calc'; S.ed=newEd(); return; }
     if(k==='ac'){ S.dEd=newEd(); return; }
     if(k==='back'){ S.mode='calc'; return; }
     typeEd(S.dEd,k); return;
   case 'format':
     if(k==='down') S.sel=Math.min(FORMAT.length-1,S.sel+1);
     else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='back'||k==='ac') S.mode='result';
     else if(k==='ok'||k==='exe'){ if(S.sel<2) S.dec=S.sel===1; S.mode='result'; }
     return;
   case 'result':
     if(k==='format'){ S.mode='format'; S.sel=0; return; }
     if(k==='func'){ S.from='result'; S.mode='fmenu'; S.sel=0; return; }
     if(k==='ac'){ S.mode='calc'; S.ed=newEd(); return; }
     if(['ok','back','up','down','left','right'].includes(k)) return;
     S.mode='calc'; S.ed=newEd(); typeEd(S.ed,k); return;
   case 'calc':
     if(k==='func'){ S.from='calc'; S.mode='fmenu'; S.sel=0; return; }
     if(k==='exe'){ closeFr(S.ed); if(!S.ed.t.length) return; S.res=evalCalc(S); S.dec=false; S.mode='result'; return; }
     if(k==='ac'){ S.ed=newEd(); return; }
     typeEd(S.ed,k); return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='fmenu'||S.mode==='format'){
    const L=S.mode==='fmenu'?FMENU:FORMAT, T=S.mode==='fmenu'?'FUNCTION':'FORMAT';
    return sbar(S)+`<div class="list"><div class="ti">${T}</div>`+L.map((t,i)=>`<div class="it${i===S.sel?' sel':''}${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
  }
  if(S.mode==='def') return sbar(S)+`<div class="app"><div class="ein"><span class="defl"><span class="vx">${S.which}</span>(<span class="vx">x</span>)=</span>${renderEd(S.dEd,true)}</div><div class="aus"></div></div>`;
  if(S.mode==='calc') return sbar(S)+`<div class="app"><div class="ein">${renderEd(S.ed,true)}</div><div class="aus"></div></div>`;
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
  {t:"App Berechnung öffnen", a:termF, k:["home","ok"], z:["Berechnung"],
   d:"<p>Drücken Sie <b>HOME</b>. Die App <b>Berechnung</b> ist schon markiert – mit <b>OK</b> öffnen.</p>"},
  {t:"Funktion f definieren", a:termF, k:["func","down","down","ok"], z:["f(x) definieren"],
   d:"<p><b>FUNCTION</b> öffnet ein Menü. Mit <b>▼</b> zu <b>f(x) definieren</b>, dann <b>OK</b>. Im Display steht <b>f(x)=</b>.</p>"},
  {t:"Erster Summand: −0,25x²", a:termF, k:["shift","-","0",",","2","5","x","sq"],
   d:"<p>Das Minus <b>am Anfang</b> ist ein Vorzeichen: <b>SHIFT</b> und dann <b>−</b> ergibt <b>(−)</b>.</p><p>Die Variable <b>x</b> hat eine eigene Taste.</p>"},
  {t:"Bruch: + ⅔x", a:termF, k:["+","frac","2","down","3","right","x"],
   d:"<p><b>Bruch-Taste</b>: Zähler tippen, mit <b>▼</b> in den Nenner, mit <b>▶</b> aus dem Bruch heraus.</p>"},
  {t:"+ 3 und speichern", a:termF, k:["+","3","exe"],
   d:"<p>Mit <b>EXE</b> wird <b>f</b> gespeichert. Das Display ist wieder leer.</p>",
   n:"Die Funktion bleibt gespeichert – auch wenn Sie den Rechner ausschalten."},
  {t:"f(2) berechnen", a:termF+"<br>Gesucht: <i>f</i>(2)", k:["func","ok","2",")","exe"], z:["f(x)","res"],
   d:"<p><b>FUNCTION</b> ▸ <b>f(x)</b> schreibt <b>f(</b> ins Display. Dann 2, Klammer zu, <b>EXE</b>.</p><p>Das Ergebnis ist ein Bruch: <b>10/3</b>.</p>"},
  {t:"In Dezimalzahl umwandeln", a:termF+"<br>Gesucht: <i>f</i>(2)", k:["format","down","ok"], z:["Dezimal","res"],
   d:"<p><b>FORMAT</b> ▸ <b>Dezimal</b> ▸ <b>OK</b>: 3,333333333.</p><p>Gerundet: <b>f(2) ≈ 3,33</b>. Der Punkt heißt <b>P(2 / 3,33)</b>.</p>"},
  {t:"Negativer x-Wert", a:termF+"<br>Gesucht: <i>f</i>(−4)", k:["func","ok","shift","-","4",")","shift","exe"], z:["f(x)","res"],
   d:"<p>−4 mit <b>SHIFT −</b>. Schneller zur Dezimalzahl: <b>SHIFT</b> + <b>EXE</b> (≈).</p><p>Ergebnis: <b>−3,666666667</b> ≈ −3,67</p>"},
  {t:"Bruch als x-Wert", a:termF+"<br>Gesucht: <i>f</i>("+FR(1,2)+")", k:["func","ok","frac","1","down","2","right",")","shift","exe"], z:["f(x)","res"],
   d:"<p>Bruch eingeben, mit <b>▶</b> heraus, Klammer zu, <b>SHIFT EXE</b>.</p><p>Ergebnis: <b>3,270833333</b> ≈ 3,27</p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1",["Neue Funktion <b><i>f</i></b>: <b>FUNCTION</b> ▸ <b>f(x) definieren</b> – die alte wird überschrieben","Für jeden x-Wert: <b>FUNCTION</b> ▸ <b>f(x)</b> ▸ Wert ▸ <b>)</b> ▸ <b>SHIFT EXE</b>","Auf zwei Nachkommastellen runden und den Punkt notieren"])}
];
const T2=[
  {t:"Zweite Funktion: g(x) definieren", a:termG, k:["func","down","down","down","ok"], z:["g(x) definieren"],
   d:"<p>Der Rechner kann zwei Funktionen speichern: <b>f</b> und <b>g</b>. Wählen Sie <b>g(x) definieren</b>.</p>"},
  {t:"Term von g eingeben", a:termG, k:["0",",","5","x","sq","-","3","x","+","2",",","5","exe"],
   d:"<p>Hier ist das Minus <b>zwischen</b> zwei Summanden – dafür nur die Taste <b>−</b>.</p>",
   n:"Merke: <b>SHIFT −</b> = Vorzeichen am Anfang, <b>−</b> = Rechenzeichen in der Mitte."},
  {t:"Funktionswert berechnen", a:termG+"<br>Gesucht: <i>g</i>(1,2)", k:["func","down","ok","1",",","2",")","shift","exe"], z:["g(x)","res"],
   d:"<p><b>FUNCTION</b> ▸ <b>g(x)</b>, dann 1,2 und Klammer zu. Mit <b>SHIFT EXE</b>: <b>g(1,2) = −0,38</b></p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",["Die markierten x-Werte am Graphen ablesen","Mit <b>FUNCTION</b> ▸ <b>g(x)</b> die Funktionswerte berechnen","Ergebnis in das Feld an der Pfeilspitze schreiben","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  c:{name:"1 · Funktion f definieren und berechnen", start:()=>fresh(), steps:T1},
  n:{name:"2 · Zweite Funktion g", start:()=>run(fresh(),allK(T1)), steps:T2}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["c","n"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",home:"HOME ⌂",back:"↶",ok:"OK",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",func:"FUNCTION",
 exe:"EXE",ac:"AC",del:"⌫",format:"FORMAT","-":"−","+":"+",x:'<i class="v">x</i>',
 frac:'Bruch <span class="mf"><i></i><b></b><i></i></span>', sq:'<span class="bx"></span><sup>2</sup>'};
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
  $('scr').innerHTML=draw(stateAt(tr,st,pos), pos>=S.k.length?(S.z||[]).filter(z=>z==='res'):(S.z||[]).filter(z=>z!=='res'));
  $('back').disabled=st===0&&pos===0;
  const last=st===T.steps.length-1, nextT=ORDER[ORDER.indexOf(tr)+1];
  const fin=pos>=S.k.length;
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
    if(pos>=S.k.length){ lock=true; setTimeout(()=>{ lock=false; advance(); },1400); }
  } else {
    if(el){ el.classList.add('bad'); setTimeout(()=>el.classList.remove('bad'),450); }
    let extra='';
    if(k==='-'&&S.k[pos]==='shift'&&S.k[pos+1]==='-') extra=' Für das Vorzeichen erst <b>SHIFT</b>, dann <b>−</b>.';
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

const KMAP={Enter:'exe',Escape:'ac',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Backspace:'del',Delete:'del','.':',',',':',','+':'+','-':'-','(':'(',')':')',x:'x',X:'x'};
  return {
    ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
    render, press, next, back, KMAP,
    selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
    selectStep:function(i){ st=+i; pos=0; render(); }
  };
 }
};
