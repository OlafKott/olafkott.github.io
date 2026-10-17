GUIDES["gl"]={
 title:"Gleichungen lösen",
 css:String.raw`[data-g="gl"] .sb .ind.a{ background:#7a1a2a; }
[data-g="gl"] .ein{ font-size:16px; min-height:30px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; overflow:hidden; }
[data-g="gl"] .aus{ font-size:21px; text-align:right; min-height:30px; display:flex; justify-content:flex-end; align-items:center; font-weight:bold; white-space:nowrap; gap:6px; }
[data-g="gl"] .aus .lab{ font-size:17px; font-weight:normal; margin-right:auto; }
[data-g="gl"] .klein{ font-size:13px; display:flex; justify-content:space-between; }
[data-g="gl"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:18px; padding:0 1px; }
[data-g="gl"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="gl"] .wz{ white-space:nowrap; } [data-g="gl"] .wz .ov{ border-top:1.5px solid currentColor; padding:0 1px; margin-left:-1px; }
[data-g="gl"] .lst{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:4px 9px; font:bold 16px 'Courier New',monospace; line-height:1.55; }
[data-g="gl"] .lst .s{ background:#141a14; color:#d3ded4; }
[data-g="gl"] .koef{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 7px 4px; display:flex; flex-direction:column; }
[data-g="gl"] .koef .kt{ font-size:14px; text-align:center; font-family:'Times New Roman',serif; }
[data-g="gl"] .koef table{ border-collapse:collapse; margin:3px auto 0; font-size:14px; }
[data-g="gl"] .koef th{ font:italic bold 14px 'Times New Roman',serif; padding:0 10px; border-bottom:1.5px solid #141a14; }
[data-g="gl"] .koef td{ text-align:center; padding:1px 8px; min-width:62px; }
[data-g="gl"] .koef td.cur{ background:#141a14; color:#d3ded4; }
[data-g="gl"] .koef .inp{ margin-top:auto; text-align:right; font-size:18px; font-weight:bold; min-height:24px; }
[data-g="gl"] .chip.alpha{ background:#b8324a; }
[data-g="gl"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="gl"] .chip.b{ background:#2463c9; }
[data-g="gl"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="gl"] .task .term{ font-family:Cambria,Georgia,serif; font-size:21px; line-height:1.6; color:var(--ink); }
[data-g="gl"] .task .term small{ font-size:15px; color:var(--mute); }`,
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
const zl=(lbl,ziel)=>(ziel||[]).includes(lbl)?' ziel':'';
function drawHome(S,ziel){
  return `<div class="home"><div class="grid">`+APPS.map((a,i)=>`<div class="ic${i===S.sel?' sel':''}${zl(a,ziel)}"><span class="bd">${i+1}</span>${ICON[a]}<span class="an">${a}</span></div>`).join('')+`</div></div>`;
}
function drawList(S,title,L,ziel){
  return sbar(S)+`<div class="list"><div class="ti">${title}</div>`+L.map((t,i)=>`<div class="it${i===S.sel?' sel':''}${zl(t,ziel)}">${t}</div>`).join('')+'</div>';
}
function sbar(S){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span></div>`; }

// =====================================================================
//  Zahlen: exakte Brüche
// =====================================================================
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const R=(p,q=1)=>{ if(q<0){ p=-p; q=-q; } const g=gcd(p,q); return {p:p/g,q:q/g}; };
const addR=(a,b)=>R(a.p*b.q+b.p*a.q,a.q*b.q), mulR=(a,b)=>R(a.p*b.p,a.q*b.q), negR=a=>R(-a.p,a.q), divR=(a,b)=>R(a.p*b.q,a.q*b.p);
const valR=r=>r.p/r.q;
function numR(s){ const [i,f='']=s.split(','); return R(parseInt((i||'0')+f,10), 10**f.length); }
function dec(v){ if(Math.abs(v)<1e-12) v=0; return Number(v.toPrecision(10)).toString().replace('.',',').replace('-','−'); }
function fmtR(r){
  if(r.q===1) return String(r.p).replace('-','−');
  return (r.p<0?'−':'')+`<span class="fr"><span>${Math.abs(r.p)}</span><span>${r.q}</span></span>`;
}
// Koeffizient aus Tastenfolge (z. B. neg 0 , 5)
function koefR(t){
  let s=1, n='';
  for(const k of t){ if(k==='neg'||k==='-') s=-s; else if(k==='+'){} else n+=k; }
  const r=numR(n||'0'); return s<0?negR(r):r;
}

// =====================================================================
//  Rechenausdruck (Modus Berechnungen) für SOLVE
// =====================================================================
function parse(tokens){
  // Zahlen zusammenfassen
  const t=[]; let num='';
  const fl=()=>{ if(num){ t.push({n:parseFloat(num.replace(',','.')||'0')}); num=''; } };
  for(const k of tokens){ if(/^[0-9,]$/.test(k)) num+=k; else { fl(); t.push(k); } }
  fl();
  let i=0;
  const peek=()=>t[i];
  const startsFactor=k=>k!==undefined&&(typeof k==='object'||k==='x'||k==='('||k==='neg');
  function expr(){ let v=term(); while(peek()==='+'||peek()==='-'){ const op=t[i++]; const w=term(); const a=v,b=w; v=op==='+'?(x=>a(x)+b(x)):(x=>a(x)-b(x)); } return v; }
  function term(){ let v=factor(); while(startsFactor(peek())&&peek()!=='neg'){ const a=v,b=factor(); v=x=>a(x)*b(x); } return v; }
  function factor(){
    if(peek()==='neg'){ i++; const f=factor(); return x=>-f(x); }
    let p=primary();
    while(peek()==='sq'){ i++; const q=p; p=x=>q(x)*q(x); }
    return p;
  }
  function primary(){
    const k=t[i++];
    if(k&&typeof k==='object'){ const n=k.n; return ()=>n; }
    if(k==='x') return x=>x;
    if(k==='('){ const e=expr(); if(peek()===')') i++; return e; }
    return ()=>0;
  }
  return expr();
}
function solveEq(tokens,x0){
  const j=tokens.indexOf('eq');
  const L=parse(j<0?tokens:tokens.slice(0,j)), Rr=j<0?(()=>0):parse(tokens.slice(j+1));
  const f=x=>L(x)-Rr(x);
  let x=x0;
  for(let n=0;n<80;n++){ const h=1e-6*(Math.abs(x)+1), d=(f(x+h)-f(x-h))/(2*h); if(Math.abs(d)<1e-14) break; const nx=x-f(x)/d; if(Math.abs(nx-x)<1e-13){ x=nx; break; } x=nx; }
  return {x, lr:f(x)};
}

// =====================================================================
//  Quadratische Gleichung exakt (mit Wurzeln)
// =====================================================================
function sqf(n){ let k=1, m=n; for(let d=2; d*d<=m; d++){ while(m%(d*d)===0){ m/=d*d; k*=d; } } return [k,m]; }
function quad(a,b,c){
  // D = b² − 4ac (exakt)
  const D=addR(mulR(b,b), negR(mulR(R(4),mulR(a,c))));
  const m0=divR(negR(b), mulR(R(2),a));                 // Mitte −b/(2a)
  const yS=addR(c, negR(divR(mulR(b,b), mulR(R(4),a))));   // y-Wert Scheitel
  const out={mid:m0, yS, max:valR(a)<0};
  if(D.p===0){ out.sol=[{re:m0, k:R(0), m:1, cplx:false}]; return out; }
  const neg=D.p<0, P=Math.abs(D.p)*D.q, [k,m]=sqf(P);        // √|D| = k·√m / D.q
  const kk=divR(R(k,D.q), mulR(R(2),R(Math.abs(a.p),a.q))); // geteilt durch 2|a|
  const sa=a.p<0?-1:1;                                     // x1 = (−b+√D)/(2a)
  if(!neg) out.sol=[{re:m0,k:kk,m,sg:sa},{re:m0,k:kk,m,sg:-sa}];
  else out.sol=[{re:m0,k:kk,m,sg:1,cplx:true},{re:m0,k:kk,m,sg:-1,cplx:true}];
  return out;
}
function solVal(s){ return valR(s.re)+(s.sg||0)*valR(s.k)*Math.sqrt(s.m); }
function radH(k,m,i){ // k·√m (k Bruch) [·i]
  const w=m===1?'':`<span class="wz">√<span class="ov">${m}</span></span>`;
  const ii=i?'<i>i</i>':'';
  if(k.q===1) return `${(k.p===1&&(w||ii))?'':k.p}${w}${ii}`;
  return `<span class="fr"><span>${k.p===1&&(w||ii)?'':k.p}${w}${ii}</span><span>${k.q}</span></span>`;
}
function solH(s,decimal){
  if(!s.sg){ return decimal?dec(valR(s.re)):fmtR(s.re); }
  if(!s.cplx && s.m===1){ const v=addR(s.re, s.sg>0?s.k:negR(s.k)); return decimal?dec(valR(v)):fmtR(v); }
  if(!s.cplx && decimal) return dec(solVal(s));
  const reH=s.re.p===0?'':fmtR(s.re);
  const sign=s.sg>0?(reH?'+':''):'−';
  return reH+sign+radH(s.k,s.m,s.cplx);
}

// =====================================================================
//  Eingabezeile (Berechnungen)
// =====================================================================
const TK={neg:'−','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>',eq:'=','(':'(',')':')'};
const renderT=(t,caret)=>t.map(k=>TK[k]||k).join('')+(caret?'<span class="caret"></span>':'');

// =====================================================================
//  Rechnerzustand fx-991DE CW: App Gleichung
// =====================================================================
const EQM=['Gleichungssyst.','Polynom-Gleich.','Allgemeine Lösung'];
const GRADE=['ax²+bx+c','ax³+bx²+cx+d','ax⁴+bx³+cx²+dx+e'];
const FMT=['Voreinstellung','Dezimal'];
function fresh(){ return {mode:'calc', sel:0, t:[], shift:false, sx:0, sres:null, scur:0,
  koef:[R(0),R(0),R(0)], cur:0, inp:[], qr:null, si:0, sd:false}; }
function step(S,k){
  if(S.mode==='off'){ if(k==='on') S.mode='calc'; return; }
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){
    S.shift=false;
    if(k==='ac'){ S.mode='off'; return; }
    if(k==='-') k='neg';
    else if(k==='('){ if(S.mode==='solvein') S.t.push('eq'); return; }
    else return;
  }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if(k==='ok'||k==='exe'){ if(S.sel===5){ S.mode='eqmenu'; S.sel=0; } else if(S.sel===0){ S.mode='calc'; S.t=[]; } }
     return;
   case 'eqmenu':
     if(k==='down') S.sel=Math.min(2,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok'||k==='exe'){ if(S.sel===1){ S.mode='grad'; S.sel=0; } else if(S.sel===2){ S.mode='solvein'; S.t=[]; } }
     return;
   case 'grad':
     if(k==='down') S.sel=Math.min(2,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='koef'; S.koef=[R(0),R(0),R(0)]; S.cur=0; S.inp=[]; }
     else if(k==='back'){ S.mode='eqmenu'; S.sel=1; }
     return;
   case 'koef':
     if(k==='exe'||k==='ok'){
       if(S.inp.length){ S.koef[S.cur]=koefR(S.inp); S.inp=[]; S.cur=S.cur<2?S.cur+1:3; return; }
       if(S.cur<3){ S.cur++; return; }
       S.qr=quad(...S.koef); S.mode='sol'; S.si=0; S.sd=false; return;
     }
     if(k==='ac'){ if(S.inp.length) S.inp=[]; else { S.koef=[R(0),R(0),R(0)]; S.cur=0; } return; }
     if(k==='del'){ S.inp.pop(); return; }
     if(k==='up'){ S.cur=Math.max(0,Math.min(S.cur,3)-1); return; }
     if(k==='down'){ S.cur=Math.min(2,S.cur+1); return; }
     if(/^[0-9,]$/.test(k)||k==='neg'||k==='-'){ if(S.cur===3) S.cur=2; S.inp.push(k); }
     return;
   case 'sol': {
     const n=S.qr.sol.length+2;
     if(k==='exe'||k==='down'||k==='ok'){ if(S.si<n-1){ S.si++; S.sd=false; } else { S.mode='koef'; S.cur=0; } return; }
     if(k==='up'||k==='left'){ if(S.si>0){ S.si--; S.sd=false; } return; }
     if(k==='format'){ S.mode='fmt'; S.sel=0; return; }
     if(k==='ac'){ S.mode='koef'; S.cur=0; S.inp=[]; return; }
     return; }
   case 'fmt':
     if(k==='down') S.sel=Math.min(1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok'||k==='exe'){ S.sd=S.sel===1; S.mode='sol'; }
     else if(k==='back'||k==='ac') S.mode='sol';
     return;
   case 'solvein':
     if(k==='exe'){ if(S.t.length){ S.mode='svar'; } return; }
     if(k==='ac'){ S.t=[]; return; }
     if(k==='del'){ S.t.pop(); return; }
     if(/^[0-9,]$/.test(k)||['x','sq','+','-','neg','(',')'].includes(k)) S.t.push(k);
     return;
   case 'svar':
     if(k==='exe'||k==='ok'){ S.mode='sstart'; S.scur=0; } else if(k==='back') S.mode='solvein';
     return;
   case 'sstart':
     if(k==='exe'||k==='ok'){ if(S.scur===0){ S.scur=1; return; } S.sres=solveEq(S.t,S.sx); S.mode='sres'; return; }
     if(k==='back') S.mode='svar';
     return;
   case 'sres':
     if(k==='exe'||k==='ac'||k==='back'){ S.mode='solvein'; }
     return;
   case 'calc':
     if(k==='ac'){ S.t=[]; return; }
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
const KOPF='<span class="vx" style="font-size:15px">a</span><span class="vx" style="font-size:15px">x</span><sup>2</sup>+<span class="vx" style="font-size:15px">bx</span>+<span class="vx" style="font-size:15px">c</span>=0';
function draw(S,ziel){
  const Z=n=>(ziel||[]).includes(n)?' ziel':'';
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='eqmenu') return drawList(S,'Gleichung',EQM,ziel);
  if(S.mode==='grad') return drawList(S,'Anzahl an Graden',GRADE,ziel);
  if(S.mode==='fmt') return drawList(S,'FORMAT',FMT,ziel);
  if(S.mode==='koef'){
    const cells=S.koef.map((v,i)=>`<td class="${i===S.cur?'cur':''}">${dec(valR(v))}</td>`).join('');
    const inp=S.inp.length?renderT(S.inp,true):(S.cur<3?dec(valR(S.koef[S.cur])):'');
    return sbar(S)+`<div class="koef"><div class="kt">${KOPF}</div><table><tr><th>a</th><th>b</th><th>c</th></tr><tr>${cells}</tr></table><div class="inp${Z('inp')}">${inp}</div></div>`;
  }
  if(S.mode==='sol'){
    const n=S.qr.sol.length, i=S.si; let lab, val;
    if(i<n){ lab=n===1?'<span class="vx">x</span>=':`<span class="vx">x</span><sub>${i+1}</sub>=`; val=solH(S.qr.sol[i],S.sd); }
    else if(i===n){ lab=`<span style="font-size:12px">x-Wert ${S.qr.max?'Max':'Min'}=</span>`; val=S.sd?dec(valR(S.qr.mid)):fmtR(S.qr.mid); }
    else { lab=`<span style="font-size:12px">y-Wert ${S.qr.max?'Max':'Min'}=</span>`; val=S.sd?dec(valR(S.qr.yS)):fmtR(S.qr.yS); }
    return sbar(S)+`<div class="app"><div class="ein" style="font-size:14px">${KOPF}</div><div class="aus${Z('res')}"><span class="lab">${lab}</span>${val}</div></div>`;
  }
  if(S.mode==='solvein') return sbar(S)+`<div class="app"><div class="ein">${renderT(S.t,true)}</div><div class="klein"><span>Gleichung eingeben</span></div><div class="aus"></div></div>`;
  if(S.mode==='svar') return sbar(S)+`<div class="list"><div class="ti">Unabh. Variable</div><div class="it sel${Z('var')}">x</div></div>`;
  if(S.mode==='sstart') return sbar(S)+`<div class="list"><div class="ti">Startwert</div><div class="it${S.scur===0?' sel':''}"><span class="vx">x</span>= ${dec(S.sx)}</div><div class="it${S.scur===1?' sel':''}${Z('ausf')}">Ausführen</div></div>`;
  if(S.mode==='sres') return sbar(S)+`<div class="app"><div class="ein">${renderT(S.t,false)}</div><div class="aus${Z('res')}"><span class="lab"><span class="vx">x</span>=</span>${dec(S.sres.x)}</div><div class="klein"><span>L−R=</span><span>${dec(S.sres.lr)}</span></div></div>`;
  return sbar(S)+`<div class="app"><div class="ein"><span class="caret"></span></div><div class="aus"></div></div>`;
}

// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const X='<i>x</i>', Q='<sup>2</sup>';
const lin1=`2${X} + 5 = 17`, lin2=`4(${X} + 1) = ${X} − 5`;
const OPEN=["home","down","right","right","ok"];
const T1=[
  {t:"App Gleichung öffnen", a:lin1, k:OPEN, z:["Gleichung"],
   d:"<p>Gleichungen löst der Rechner in der App <b>Gleichung</b>. Drücken Sie <b>HOME</b>. Gehen Sie mit den Pfeiltasten zum Symbol <b>Gleichung</b> und bestätigen Sie mit <b>OK</b>.</p>"},
  {t:"Allgemeine Lösung wählen", a:lin1, k:["down","down","ok"], z:["Allgemeine Lösung"],
   d:"<p>Für lineare Gleichungen nehmen Sie <b>Allgemeine Lösung</b>: zweimal <b>▼</b>, dann <b>OK</b>.</p>"},
  {t:"Linke Seite eingeben", a:lin1, k:["2","x","+","5"],
   d:"<p>Tippen Sie die linke Seite ein. Die Variable <b>x</b> hat eine eigene Taste: links oben im Tastenfeld.</p>"},
  {t:"Das Gleichheitszeichen", a:lin1, k:["shift","("],
   d:"<p>Das <b>=</b> steht gold über der Klammer-Taste <b>(</b>. Drücken Sie <b>SHIFT</b> und dann <b>(</b>.</p>",
   n:"Die Taste <b>EXE</b> ist <b>kein</b> Gleichheitszeichen. Sie bestätigt nur."},
  {t:"Rechte Seite eingeben", a:lin1, k:["1","7"],
   d:"<p>Jetzt steht die ganze Gleichung im Display. Vergleichen Sie mit der Aufgabe oben.</p>"},
  {t:"Gleichung bestätigen", a:lin1, k:["exe"], z:["var"],
   d:"<p>Mit <b>EXE</b> bestätigen. Der Rechner fragt, nach welcher Variablen er lösen soll: <b>x</b> ist schon ausgewählt.</p>"},
  {t:"Variable x bestätigen", a:lin1, k:["exe"], z:["ausf"],
   d:"<p>Noch einmal <b>EXE</b>. Jetzt sehen Sie den <b>Startwert</b> für x und darunter <b>Ausführen</b>.</p>"},
  {t:"Ausführen", a:lin1, k:["exe","exe"], z:["res"],
   d:"<p>Den Startwert lassen Sie stehen: <b>EXE</b>. Dann steht der Cursor auf <b>Ausführen</b>: noch einmal <b>EXE</b>.</p><p>Ergebnis: <b>x = 6</b>. Die Zeile <b>L−R = 0</b> heißt: linke Seite minus rechte Seite ist 0. Die Lösung stimmt.</p>",
   n:"Kurz gemerkt: Nach der Eingabe <b>4 × EXE</b> drücken."},
  {t:"Gleichung mit Klammer", a:lin2, k:["exe","ac","4","(","x","+","1",")","shift","(","x","-","5","exe","exe","exe","exe"], z:["res"],
   d:"<p><b>EXE</b> bringt Sie zurück zur Eingabe. Mit <b>AC</b> löschen Sie die alte Gleichung.</p><p>Klammern tippen Sie mit <b>(</b> und <b>)</b>. Ein Malzeichen vor der Klammer brauchen Sie nicht. Dann wieder <b>4 × EXE</b>. Ergebnis: <b>x = −3</b>.</p>",
   n:"Krumme Ergebnisse wie −2,333333333 runden Sie auf zwei Nachkommastellen: <b>−2,33</b>."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1a",["Für jede Gleichung: <b>EXE</b> ▸ <b>AC</b> ▸ Gleichung eingeben (= mit <b>SHIFT (</b>)","Dann <b>4 × EXE</b>","Ergebnis eintragen, bei Bedarf auf zwei Nachkommastellen runden"])}
];
const q1=`${X}${Q} − 2${X} − 8 = 0`, q2=`0,5${X}${Q} + ${X} − 2 = 0`, q3=`${X}${Q} + 2${X} + 5 = 0`;
const T2=[
  {t:"App Gleichung öffnen", a:q1, k:OPEN, z:["Gleichung"],
   d:"<p><b>HOME</b>, mit den Pfeiltasten zum Symbol <b>Gleichung</b>, dann <b>OK</b>.</p>"},
  {t:"Polynom-Gleichung wählen", a:q1, k:["down","ok"], z:["ax²+bx+c"],
   d:"<p>Eine quadratische Gleichung ist eine <b>Polynom-Gleichung</b>: <b>▼</b> und <b>OK</b>.</p>"},
  {t:"Grad 2 wählen", a:q1, k:["ok"],
   d:"<p>Der höchste Exponent ist 2 (x²). Also: <b>ax²+bx+c</b> mit <b>OK</b> bestätigen.</p><p>Jetzt sehen Sie die Tabelle für a, b und c.</p>",
   n:"Rechts vom Gleichheitszeichen muss <b>0</b> stehen. Sonst müssen Sie die Gleichung erst umstellen."},
  {t:"a eingeben", a:q1+" <small>→ a = 1</small>", k:["1","exe"],
   d:"<p>Vor x² steht nichts. Das heißt: <b>a = 1</b>. Wert tippen, mit <b>EXE</b> bestätigen.</p>"},
  {t:"b eingeben", a:q1+" <small>→ b = −2</small>", k:["shift","-","2","exe"],
   d:"<p><b>b = −2</b>. Das Minus ist hier ein Vorzeichen: <b>SHIFT</b> und dann <b>−</b> ergibt <b>(−)</b>.</p>"},
  {t:"c eingeben", a:q1+" <small>→ c = −8</small>", k:["shift","-","8","exe"],
   d:"<p><b>c = −8</b>. Wieder mit <b>SHIFT −</b>.</p>"},
  {t:"Erste Lösung", a:q1, k:["exe"], z:["res"],
   d:"<p>Alle Koeffizienten stehen in der Tabelle. Noch einmal <b>EXE</b> – der Rechner löst die Gleichung.</p><p>Erste Lösung: <b>x₁ = 4</b></p>"},
  {t:"Zweite Lösung", a:q1, k:["exe"], z:["res"],
   d:"<p>Mit <b>EXE</b> (oder <b>▼</b>) kommt die zweite Lösung: <b>x₂ = −2</b>.</p>",
   n:"Drücken Sie danach weiter <b>EXE</b>, zeigt der Rechner noch den <b>Scheitelpunkt</b> der Parabel. Den brauchen Sie hier nicht."},
  {t:"Neue Gleichung: AC", a:q2, k:["ac"],
   d:"<p><b>AC</b> bringt Sie zurück zur Tabelle. Die alten Werte überschreiben Sie einfach.</p>"},
  {t:"Koeffizienten eingeben", a:q2, k:["0",",","5","exe","1","exe","shift","-","2","exe"],
   d:"<p><b>a = 0,5</b> &nbsp; <b>b = 1</b> &nbsp; <b>c = −2</b> – jeweils mit <b>EXE</b> bestätigen.</p>"},
  {t:"Lösung mit Wurzel", a:q2, k:["exe"], z:["res"],
   d:"<p>Mit <b>EXE</b> lösen. Diesmal steht eine <b>Wurzel</b> im Ergebnis: x₁ = −1 + √5.</p>"},
  {t:"In Dezimalzahl umwandeln", a:q2, k:["format","down","ok"], z:["res"],
   d:"<p><b>FORMAT</b> öffnet ein Menü. Mit <b>▼</b> zu <b>Dezimal</b>, dann <b>OK</b>: 1,236067977.</p><p>Gerundet: <b>x₁ ≈ 1,24</b></p>"},
  {t:"Zweite Lösung umwandeln", a:q2, k:["exe","format","down","ok"], z:["res"],
   d:"<p><b>EXE</b> für x₂, dann wieder <b>FORMAT ▸ Dezimal</b>: <b>x₂ ≈ −3,24</b></p>"},
  {t:"Gleichung ohne Lösung", a:q3, k:["ac","1","exe","2","exe","5","exe","exe"], z:["res"],
   d:"<p>Neue Gleichung: <b>AC</b>, dann a = 1, b = 2, c = 5 und lösen.</p><p>Im Ergebnis steht ein <b><i>i</i></b>. Das ist eine <b>komplexe Zahl</b>. Für uns heißt das: <b>Die Gleichung hat keine Lösung.</b></p>",
   n:"Merke: <b><i>i</i> im Ergebnis = keine Lösung</b>."},
  {t:"Was bedeutet das i?", a:q3, k:[],
   d:"<p>Das <b><i>i</i></b> steht für eine <b>komplexe Zahl</b>. Die Gleichung hat dann <b>keine Lösung bei den reellen Zahlen</b> – also keine Lösung, mit der wir rechnen.</p>"+
     "<p>Am Graphen sieht man den Grund: Die Parabel zu "+X+"² + 2"+X+" + 5 liegt komplett <b>über der x-Achse</b>. Sie wird nie 0.</p>"+
     "<svg viewBox=\"0 0 220 120\" width=\"220\" height=\"120\" style=\"display:block;margin:0 0 10px\" font-family=\"Arial,sans-serif\"><defs><marker id=\"mk\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0 0L10 5L0 10z\" fill=\"#1d1d1f\"/></marker></defs>"+
     "<line x1=\"10\" y1=\"105\" x2=\"212\" y2=\"105\" stroke=\"#1d1d1f\" stroke-width=\"1.2\" marker-end=\"url(#mk)\"/><line x1=\"150\" y1=\"115\" x2=\"150\" y2=\"6\" stroke=\"#1d1d1f\" stroke-width=\"1.2\" marker-end=\"url(#mk)\"/>"+
     "<path d=\"M45 10 Q120 130 195 10\" fill=\"none\" stroke=\"#1F4E99\" stroke-width=\"2.2\"/><circle cx=\"120\" cy=\"70\" r=\"3\" fill=\"#1F4E99\"/>"+
     "<text x=\"205\" y=\"118\" font-size=\"11\" font-style=\"italic\">x</text><text x=\"155\" y=\"14\" font-size=\"11\" font-style=\"italic\">y</text>"+
     "<text x=\"20\" y=\"98\" font-size=\"11\" fill=\"#C62828\">kein Schnitt mit der x-Achse</text></svg>",
   n:"Kurz: <b><i>i</i> im Ergebnis → Die Gleichung hat keine Lösung.</b> Schreiben Sie dann „keine Lösung“."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1b",["Für jede Gleichung: <b>AC</b> ▸ a <b>EXE</b> b <b>EXE</b> c <b>EXE</b> ▸ <b>EXE</b> ▸ <b>EXE</b>","Bei (6) zuerst umstellen: rechts muss 0 stehen","Wurzel im Ergebnis? <b>FORMAT ▸ Dezimal</b> und runden","<i>i</i> im Ergebnis? Dann gibt es keine Lösung."])}
];
const gT=`<i>g</i>(${X}) = −0,5${X}${Q} + 3${X} + 1`;
const UMF=(rows)=>`<table style="border-collapse:collapse;font-family:Cambria,Georgia,serif;font-size:19px;margin:2px 0 10px">${rows.map(r=>`<tr><td style="padding:3px 0;text-align:left">${r[0]}</td><td style="padding:3px 6px">=</td><td style="padding:3px 14px 3px 0">${r[1]}</td><td style="padding:3px 0;color:#1F4E99;font-weight:bold;white-space:nowrap">${r[2]?`<span style="display:inline-block;border-left:2px solid #1d1d1f;padding-left:8px;line-height:1.2">${r[2]}</span>`:''}</td></tr>`).join('')}</table>`;
const RT=t=>`<span style="color:#C62828;font-weight:bold">${t}</span>`;
const UM5=UMF([["−0,5"+X+"² + 3"+X+" + 1","5","− 5"],
               ["−0,5"+X+"² + 3"+X+" + 1 "+RT("− 5"),"5 "+RT("− 5"),""],
               ["−0,5"+X+"² + 3"+X+" − 4","0",""]]);
const T3=[
  {t:"Gleichung aufstellen", a:gT+"<br>Gesucht: <i>g</i>("+X+") = 5", k:[],
   d:"<p>Gesucht sind die x-Werte, an denen der Graph die <b>Höhe 5</b> hat. Dafür setzen Sie den Funktionsterm gleich 5:</p><p style=\"font-family:Cambria,Georgia,serif;font-size:19px\">−0,5"+X+"² + 3"+X+" + 1 = 5</p><p>Rechts steht 5, nicht 0. Der Rechner braucht aber rechts eine <b>0</b>.</p>"},
  {t:"Äquivalenzumformung: | − 5", a:gT+"<br>Gesucht: <i>g</i>("+X+") = 5", k:[],
   d:"<p>Auf beiden Seiten <b>5 abziehen</b>. Die Umformung notieren Sie hinter einem <b>senkrechten Strich</b>.</p><p>Zeile 2: Die <b style=\"color:#C62828\">− 5</b> wird auf beiden Seiten ergänzt. Zeile 3: Links wird <b>+ 1 − 5 = − 4</b> verrechnet, rechts <b>5 − 5 = 0</b>.</p>"+UM5+"<p>a und b bleiben gleich. Nur <b>c</b> ändert sich: <b>c = 1 − 5 = −4</b>.</p>",
   n:"Schreiben Sie die Umformung immer mit auf. So sieht man, woher das neue <b>c</b> kommt."},
  {t:"Koeffizienten eingeben", a:UM5+"<small>→ a = −0,5 &nbsp;b = 3 &nbsp;c = −4</small>", k:["ac","shift","-","0",",","5","exe","3","exe","shift","-","4","exe"],
   d:"<p><b>AC</b>, dann <b>a = −0,5</b>, <b>b = 3</b>, <b>c = −4</b>.</p>"},
  {t:"Lösungen ablesen", a:UM5, k:["exe","exe"], z:["res"],
   d:"<p><b>EXE</b> und noch einmal <b>EXE</b>: Die Lösungen sind <b>x₁ = 2</b> und <b>x₂ = 4</b>.</p><p>Am Graphen: Bei x = 2 und x = 4 hat die Parabel die Höhe 5.</p>"},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",["Für jede Höhe: Gleichung aufstellen und mit <b>| −&nbsp;y-Wert</b> umformen (im Heft notieren)","Das neue <b>c</b> im farbigen Kasten eintragen","Im Gleichungsmodus lösen, Ergebnisse runden","Werte in die Kästen an den Pfeilen schreiben","Danach: Lösungscode eintragen"])}
];
const allK=a=>a.flatMap(s=>s.k);
const TRACKS={
  l:{name:"1 · Lineare Gleichungen (Allgemeine Lösung)", start:()=>fresh(), steps:T1},
  q:{name:"2 · Quadratische Gleichungen", start:()=>fresh(), steps:T2},
  g:{name:"3 · Gleichungen am Graphen", start:()=>run(fresh(),allK(T2)), steps:T3}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["l","q","g"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const LBL={on:"ON",home:"HOME",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",ok:"OK",back:"↶",format:"FORMAT",
 exe:"EXE",ac:"AC",del:"⌫","-":"−","+":"+",x:'<i class="v">x</i>',"(":"(",")":")",sq:'<span class="bx"></span><sup>2</sup>'};
const WHITE=/^$/;
const lbl=k=>LBL[k]||k;
function chip(k,i){ const s=i<pos?'done':(i===pos?'now':''); const c=k==='shift'?'shift':k==='alpha'?'alpha':WHITE.test(k)?'w':''; return `<span class="chip ${c} ${s}">${lbl(k)}</span>`; }
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
  $('scr').innerHTML=draw(stateAt(tr,st,pos), fin?S.z:(S.z||[]).filter(z=>z!=='res'));
  $('back').disabled=st===0&&pos===0;
  const last=st===T.steps.length-1, nextT=ORDER[ORDER.indexOf(tr)+1];
  if(last&&fin) done[tr]=true;
  $('next').className=fin?'go':'';
  $('next').textContent=fin ? (last ? (nextT?`Weiter mit ${TRACKS[nextT].name} ▶`:'Fertig ✓') : 'Weiter ▶') : 'Überspringen';
  $('next').disabled=fin&&last&&!nextT;
  $('stat').style.display=S.ab?'none':'flex';
  $('stat').innerHTML=S.k.length? (fin?'<span class="ok">✓ Richtig!</span>':`Drücken Sie jetzt: ${chip(S.k[pos],pos).replace('now','now big')}`) : '<span style="color:var(--mute)">Lesen – dann <b>Weiter</b>.</span>';
  hint();
}
function hint(){
  document.querySelectorAll('.k.hit').forEach(e=>e.classList.remove('hit'));
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
    const want=S.k[pos]; let extra='';
    if(k==='-'&&want==='shift') extra=' Für ein Vorzeichen zuerst <b>SHIFT</b>, dann <b>−</b>.';
    if(k==='exe'&&want==='shift') extra=' Das Gleichheitszeichen der Gleichung ist <b>SHIFT</b> + <b>(</b>.';
    $('stat').innerHTML=`<span class="err">Das war nicht die richtige Taste.</span> Gesucht: ${chip(want,pos).replace('now','now big')}${extra}`;
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

const KMAP={Enter:'exe',Escape:'ac',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Backspace:'del',Delete:'del','.':',',',':',','+':'+','-':'-',x:'x',X:'x','(':'(',')':')'};
return {
  ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
  render, press, next, back, KMAP,
  selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
  selectStep:function(i){ st=+i; pos=0; render(); }
};
 }
};
