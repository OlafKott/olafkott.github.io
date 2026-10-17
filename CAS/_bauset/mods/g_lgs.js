GUIDES["lgs"]={
 title:"Lineare Gleichungssysteme lösen",
 css:String.raw`[data-g="lgs"] .sb .ind.a{ background:#7a1a2a; }
[data-g="lgs"] .ein{ font-size:16px; min-height:30px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; overflow:hidden; }
[data-g="lgs"] .aus{ font-size:21px; text-align:right; min-height:30px; display:flex; justify-content:flex-end; align-items:center; font-weight:bold; white-space:nowrap; gap:6px; }
[data-g="lgs"] .aus .lab{ font-size:17px; font-weight:normal; margin-right:auto; }
[data-g="lgs"] .klein{ font-size:13px; display:flex; justify-content:space-between; }
[data-g="lgs"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:18px; padding:0 1px; }
[data-g="lgs"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="lgs"] .wz{ white-space:nowrap; }
[data-g="lgs"] .wz .ov{ border-top:1.5px solid currentColor; padding:0 1px; margin-left:-1px; }
[data-g="lgs"] .lst{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:4px 9px; font:bold 16px 'Courier New',monospace; line-height:1.55; }
[data-g="lgs"] .lst .s{ background:#141a14; color:#d3ded4; }
[data-g="lgs"] .koef{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 7px 4px; display:flex; flex-direction:column; }
[data-g="lgs"] .koef .kt{ font-size:14px; text-align:center; font-family:'Times New Roman',serif; }
[data-g="lgs"] .koef table{ border-collapse:collapse; margin:3px auto 0; font-size:14px; }
[data-g="lgs"] .koef th{ font:italic bold 14px 'Times New Roman',serif; padding:0 10px; border-bottom:1.5px solid #141a14; }
[data-g="lgs"] .koef td{ text-align:center; padding:1px 8px; min-width:62px; }
[data-g="lgs"] .koef td.cur{ background:#141a14; color:#d3ded4; }
[data-g="lgs"] .koef .inp{ margin-top:auto; text-align:right; font-size:18px; font-weight:bold; min-height:24px; }
[data-g="lgs"] .mat{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 6px 3px; display:flex; flex-direction:column; }
[data-g="lgs"] .mat table{ border-collapse:collapse; margin:0 auto; font-size:14px; }
[data-g="lgs"] .mat th{ font:italic bold 13px 'Times New Roman',serif; padding:0 6px; border-bottom:1.5px solid #141a14; }
[data-g="lgs"] .mat td{ text-align:center; padding:0 5px; min-width:50px; height:19px; line-height:19px; }
[data-g="lgs"] .mat td.rn{ min-width:12px; font-size:11px; padding:0 3px 0 0; border-right:1px solid #141a14; }
[data-g="lgs"] .mat td.cur{ background:#141a14; color:#d3ded4; }
[data-g="lgs"] .mat.m3 table{ font-size:13px; }
[data-g="lgs"] .mat.m3 td{ height:17px; line-height:17px; min-width:46px; }
[data-g="lgs"] .mat .inp{ margin-top:auto; text-align:right; font-size:17px; font-weight:bold; min-height:22px; }
[data-g="lgs"] .aus.meld{ font-size:19px; text-align:center; justify-content:center; line-height:1.15; white-space:normal; }
[data-g="lgs"] table.sys{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:20px; line-height:1.45; }
[data-g="lgs"] table.sys td{ padding:0 6px 0 0; white-space:nowrap; }
[data-g="lgs"] table.sys td.ro{ font-family:Arial,sans-serif; font-size:13px; color:var(--mute); padding-right:12px; }
[data-g="lgs"] .task .term small{ display:block; }
[data-g="lgs"] table.ktab{ border-collapse:collapse; margin:2px 0 12px; font-size:15px; }
[data-g="lgs"] table.ktab th{ font:italic bold 15px 'Times New Roman',serif; padding:2px 14px; border-bottom:2px solid var(--ink); }
[data-g="lgs"] table.ktab td{ text-align:center; padding:2px 14px; background:#f3f5f8; border:1px solid #fff; }
[data-g="lgs"] table.ktab td.rn{ background:none; color:var(--mute); font-size:12px; padding:2px 8px; }
[data-g="lgs"] table.umf{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:18px; margin:2px 0 10px; }
[data-g="lgs"] table.umf td{ padding:2px 0; white-space:nowrap; }
[data-g="lgs"] table.umf td.eq{ padding:2px 6px; }
[data-g="lgs"] table.umf td.r{ padding:2px 14px 2px 0; }
[data-g="lgs"] table.umf .bar{ display:inline-block; border-left:2px solid #1d1d1f; padding-left:8px; color:#1F4E99; font-weight:bold; }
[data-g="lgs"] table.umf .rot{ color:#C62828; font-weight:bold; }
[data-g="lgs"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="lgs"] .chip.alpha{ background:#b8324a; }
[data-g="lgs"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="lgs"] .chip.b{ background:#2463c9; }
[data-g="lgs"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="lgs"] .task .term{ font-family:Cambria,Georgia,serif; font-size:21px; line-height:1.6; color:var(--ink); }
[data-g="lgs"] .task .term small{ font-size:15px; color:var(--mute); }
[data-g="lgs"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="lgs"] .calc{ transform:scale(.92); transform-origin:top center; } }`,
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
//  Eingabezeile (Berechnungen)
// =====================================================================
const TK={neg:'−','-':'−','+':'+',x:'<span class="vx">x</span>',sq:'<sup>2</sup>',eq:'=','(':'(',')':')'};
const renderT=(t,caret)=>t.map(k=>TK[k]||k).join('')+(caret?'<span class="caret"></span>':'');

// =====================================================================
//  Lineare Gleichungssysteme: Koeffizienten-Editor und Lösung
// =====================================================================
const VARS=['x','y','z'];
const SPALTE=['a','b','c','d'];
const newM=n=>Array.from({length:n},()=>Array.from({length:n+1},()=>R(0)));
function solveLGS(M){
  const n=M.length, A=M.map(r=>r.slice()); let row=0;
  for(let col=0;col<n;col++){
    let p=-1; for(let i=row;i<n;i++) if(A[i][col].p!==0){ p=i; break; }
    if(p<0) continue;
    [A[row],A[p]]=[A[p],A[row]];
    const pv=A[row][col];
    for(let j=col;j<=n;j++) A[row][j]=divR(A[row][j],pv);
    for(let i=0;i<n;i++) if(i!==row && A[i][col].p!==0){ const f=A[i][col]; for(let j=col;j<=n;j++) A[i][j]=addR(A[i][j],negR(mulR(f,A[row][j]))); }
    row++;
  }
  for(let i=row;i<n;i++) if(A[i][n].p!==0) return {typ:'keine'};
  if(row<n) return {typ:'unendl'};
  return {typ:'ok', x:A.map(r=>r[n])};
}
function startMat(S,n){ S.n=n; S.M=newM(n); S.r=0; S.c=0; S.inp=[]; S.mode='mat'; }
// Tasten im Koeffizienten-Editor (EXE bzw. = bestätigt / löst)
function matKey(S,k){
  const n=S.n;
  if(k==='exe'||k==='ok'){
    if(S.inp.length){
      S.M[S.r][S.c]=koefR(S.inp); S.inp=[];
      if(S.c<n) S.c++; else if(S.r<n-1){ S.r++; S.c=0; }
      return;
    }
    S.res=solveLGS(S.M); S.mode='sol'; S.si=0; S.sd=false; return;
  }
  if(k==='ac'){ S.inp=[]; return; }
  if(k==='del'){ S.inp.pop(); return; }
  if(k==='left'){ S.inp=[]; if(S.c>0) S.c--; return; }
  if(k==='right'){ S.inp=[]; if(S.c<n) S.c++; return; }
  if(k==='up'){ S.inp=[]; if(S.r>0) S.r--; return; }
  if(k==='down'){ S.inp=[]; if(S.r<n-1) S.r++; return; }
  if(/^[0-9,]$/.test(k)||k==='neg') S.inp.push(k);
}
function solKey(S,k){
  if(k==='exe'||k==='down'||k==='ok'){ if(S.res.typ==='ok'&&S.si<S.n-1){ S.si++; S.sd=false; } return true; }
  if(k==='up'||k==='left'){ if(S.si>0){ S.si--; S.sd=false; } return true; }
  if(k==='ac'){ S.mode='mat'; S.r=0; S.c=0; S.inp=[]; return true; }
  return false;
}
function drawMat(S,Z){
  const n=S.n;
  let h=`<div class="mat${n>2?' m3':''}"><table><tr><th></th>${SPALTE.slice(0,n+1).map(s=>`<th>${s}</th>`).join('')}</tr>`;
  for(let i=0;i<n;i++){
    h+=`<tr><td class="rn">${i+1}</td>`+S.M[i].map((v,j)=>`<td class="${i===S.r&&j===S.c?'cur':''}">${dec(valR(v))}</td>`).join('')+'</tr>';
  }
  const inp=S.inp.length?renderT(S.inp,true):dec(valR(S.M[S.r][S.c]));
  return sbar(S)+h+`</table><div class="inp${Z('inp')}">${inp}</div></div>`;
}
function drawSol(S,Z){
  const r=S.res;
  if(r.typ!=='ok'){
    const t=r.typ==='keine'?'Keine Lösung':'Unendlich viele<br>Lösungen';
    return sbar(S)+`<div class="app"><div class="ein" style="font-size:13px">Gleichungssystem</div><div class="aus meld${Z('res')}">${t}</div><div class="klein"></div></div>`;
  }
  const i=S.si, v=r.x[i];
  const val=S.sd?dec(valR(v)):fmtR(v);
  return sbar(S)+`<div class="app"><div class="ein" style="font-size:13px">Gleichungssystem · Lösung ${i+1} von ${S.n}</div><div class="aus${Z('res')}"><span class="lab"><span class="vx">${VARS[i]}</span>=</span>${val}</div><div class="klein"><span>${i<S.n-1?'weiter: ▼':''}</span></div></div>`;
}
// Tastenfolge für eine Zahl / eine Zeile
const numKeys=(v,NEG)=>(v<0?NEG:[]).concat(String(Math.abs(v)).replace('.',',').split(''));
const rowKeys=(vals,NEG,EXE)=>vals.flatMap(v=>numKeys(v,NEG).concat([EXE]));
// Gleichungssystem schön schreiben
const XI=v=>`<i>${v}</i>`;
function glTerm(co,vars){
  let s='';
  co.forEach((k,j)=>{ if(k===0) return; const ab=Math.abs(k), t=(ab===1?'':String(ab).replace('.',','))+XI(vars[j]);
    if(!s) s=(k<0?'−':'')+t; else s+=` ${k<0?'−':'+'} ${t}`; });
  return s||'0';
}
function sysHTML(rows,vars){
  vars=vars||VARS;
  return `<table class="sys">`+rows.map((r,i)=>`<tr><td class="ro">${['I','II','III'][i]}</td><td>${glTerm(r.slice(0,-1),vars)}</td><td>=</td><td>${String(r[r.length-1]).replace('.',',').replace('-','−')}</td></tr>`).join('')+'</table>';
}
const KOEF=(rows)=>`<table class="ktab"><tr><th></th>${SPALTE.slice(0,rows.length+1).map(s=>`<th>${s}</th>`).join('')}</tr>`+rows.map((r,i)=>`<tr><td class="rn">${i+1}</td>${r.map(v=>`<td>${String(v).replace('.',',').replace('-','−')}</td>`).join('')}</tr>`).join('')+'</table>';

// =====================================================================
//  Rechnerzustand fx-991DE CW: App Gleichung ▸ Gleichungssystem
// =====================================================================
const EQM=['Gleichungssyst.','Polynom-Gleich.','Allgemeine Lösung'];
const ANZ=['2 Unbekannte','3 Unbekannte','4 Unbekannte'];
const FMT=['Voreinstellung','Dezimal'];
function fresh(){ return {mode:'calc', sel:0, shift:false, n:2, M:newM(2), r:0, c:0, inp:[], res:null, si:0, sd:false}; }
function step(S,k){
  if(S.mode==='off'){ if(k==='on') S.mode='calc'; return; }
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; if(k==='ac'){ S.mode='off'; return; } if(k==='-') k='neg'; else return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if(k==='ok'||k==='exe'){ if(S.sel===5){ S.mode='eqmenu'; S.sel=0; } else if(S.sel===0){ S.mode='calc'; } }
     return;
   case 'eqmenu':
     if(k==='down') S.sel=Math.min(2,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if((k==='ok'||k==='exe')&&S.sel===0){ S.mode='anz'; S.sel=0; }
     return;
   case 'anz':
     if(k==='down') S.sel=Math.min(2,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if((k==='ok'||k==='exe')&&S.sel<2) startMat(S,S.sel+2);
     else if(k==='back'){ S.mode='eqmenu'; S.sel=0; }
     return;
   case 'mat': if(k==='-') k='neg'; matKey(S,k); return;
   case 'sol':
     if(k==='format'&&S.res.typ==='ok'){ S.mode='fmt'; S.sel=0; return; }
     solKey(S,k); return;
   case 'fmt':
     if(k==='down') S.sel=Math.min(1,S.sel+1); else if(k==='up') S.sel=Math.max(0,S.sel-1);
     else if(k==='ok'||k==='exe'){ S.sd=S.sel===1; S.mode='sol'; }
     else if(k==='back'||k==='ac') S.mode='sol';
     return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function draw(S,ziel){
  const Z=n=>(ziel||[]).includes(n)?' ziel':'';
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='eqmenu') return drawList(S,'Gleichung',EQM,ziel);
  if(S.mode==='anz') return drawList(S,'Anzahl Unbekannte',ANZ,ziel);
  if(S.mode==='fmt') return drawList(S,'FORMAT',FMT,ziel);
  if(S.mode==='mat') return drawMat(S,Z);
  if(S.mode==='sol') return drawSol(S,Z);
  return sbar(S)+`<div class="app"><div class="ein"><span class="caret"></span></div><div class="aus"></div></div>`;
}
// ---- Modell-Angaben für die Tour
const MOD={
  NEG:['shift','-'], EXE:'exe',
  OPEN:["home","down","right","right","ok"], OPENZ:["Gleichungssyst."],
  SYS:["ok"], SYSZ:["2 Unbekannte"],
  N2:["ok"], N3:["down","ok"], N3Z:["3 Unbekannte"],
  DEC:["format","down","ok"],
  t:{ exe:'<b>EXE</b>', neg:'<b>SHIFT</b> und dann <b>−</b>', negK:'<b>SHIFT −</b>', dec:'<b>FORMAT ▸ Dezimal</b>',
      open:'<p>Gleichungssysteme löst der Rechner in der App <b>Gleichung</b>. Drücken Sie <b>HOME</b>. Gehen Sie mit den Pfeiltasten zum Symbol <b>Gleichung</b> und bestätigen Sie mit <b>OK</b>.</p>',
      sys:'<p>Wählen Sie <b>Gleichungssyst.</b> (es ist schon markiert) mit <b>OK</b>.</p>',
      n2:'<p>Das System hat zwei Unbekannte: <b>x</b> und <b>y</b>. <b>2 Unbekannte</b> ist markiert – mit <b>OK</b> bestätigen.</p>',
      n3:'<p>Jetzt gibt es drei Unbekannte: <b>x</b>, <b>y</b> und <b>z</b>. Mit <b>▼</b> zu <b>3 Unbekannte</b>, dann <b>OK</b>.</p>',
      neu:'<b>HOME</b> ▸ Gleichung ▸ Gleichungssyst. ▸ Anzahl wählen',
      decK:'<b>FORMAT</b> ▸ <b>▼</b> Dezimal ▸ <b>OK</b>' }
};
// =====================================================================
//  Tour-Inhalte
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const RK=v=>rowKeys(v,MOD.NEG,MOD.EXE), E=MOD.t.exe, EX=MOD.EXE;
const S1=[[2,3,12],[1,-1,1]], S2=[[3,2,5],[1,-4,2]], S3=[[-2,1,-1],[3,1,9]];
const s1=sysHTML(S1), s2=sysHTML(S2);
const s3o=`<table class="sys"><tr><td class="ro">I</td><td>${XI('y')}</td><td>=</td><td>2${XI('x')} − 1</td></tr><tr><td class="ro">II</td><td>3${XI('x')} + ${XI('y')}</td><td>=</td><td>9</td></tr></table>`;
const s3=sysHTML(S3);
const UM=`<table class="umf"><tr><td>${XI('y')}</td><td class="eq">=</td><td class="r">2${XI('x')} − 1</td><td><span class="bar">− 2${XI('x')}</span></td></tr><tr><td><span class="rot">−2${XI('x')}</span> + ${XI('y')}</td><td class="eq">=</td><td class="r">−1</td><td></td></tr></table>`;
const T1=[
  {t:"Gleichungssysteme öffnen", a:s1, k:MOD.OPEN, z:MOD.OPENZ, d:MOD.t.open},
  {t:"Gleichungssystem wählen", a:s1, k:MOD.SYS, z:MOD.SYSZ, d:MOD.t.sys},
  {t:"2 Unbekannte", a:s1, k:MOD.N2, z:["inp"],
   d:MOD.t.n2+`<p>Sie sehen eine <b>Tabelle</b>. Jede <b>Zeile</b> ist eine Gleichung. In Spalte <b>a</b> steht die Zahl vor ${XI('x')}, in Spalte <b>b</b> die Zahl vor ${XI('y')}, in Spalte <b>c</b> die rechte Seite.</p>`+KOEF(S1),
   n:"Die Buchstaben a, b, c über der Tabelle sind nur Spaltennamen. Die Unbekannten heißen <b>x</b> und <b>y</b>."},
  {t:"Zeile 1 eingeben", a:s1+"<small>→ 2 · 3 · 12</small>", k:RK(S1[0]),
   d:`<p>Gleichung I: <b>2</b>${XI('x')} + <b>3</b>${XI('y')} = <b>12</b>. Jede Zahl mit ${E} bestätigen. Der Cursor springt dann ins nächste Feld.</p>`},
  {t:"Zeile 2 eingeben", a:s1+"<small>→ 1 · −1 · 1</small>", k:RK(S1[1]),
   d:`<p>Gleichung II: ${XI('x')} − ${XI('y')} = 1. Vor ${XI('x')} steht nichts: das ist eine <b>1</b>. Vor ${XI('y')} steht nur ein Minus: das ist <b>−1</b>.</p><p>Das Minus ist ein Vorzeichen: ${MOD.t.neg}.</p>`,
   n:"Steht vor einer Unbekannten <b>keine Zahl</b>, tippen Sie <b>1</b> bzw. <b>−1</b> ein."},
  {t:"Lösen: x", a:s1, k:[EX], z:["res"],
   d:`<p>Alle Felder sind gefüllt. Noch einmal ${E} – der Rechner löst das System.</p><p>Ergebnis: <b>x = 3</b></p>`},
  {t:"Lösen: y", a:s1, k:[EX], z:["res"],
   d:`<p>Mit ${E} (oder <b>▼</b>) kommt die zweite Unbekannte: <b>y = 2</b>.</p><p>Probe in I: 2 · 3 + 3 · 2 = 12 ✓</p>`,
   n:"Notieren Sie die Lösung so: <b>x = 3; y = 2</b> oder als Lösungsmenge <b>𝕃 = {(3 | 2)}</b>."},
  {t:"Neues System: AC", a:s2, k:["ac"],
   d:`<p><b>AC</b> bringt Sie zurück zur Tabelle. Der Cursor steht wieder oben links. Die alten Zahlen überschreiben Sie einfach.</p>`},
  {t:"Koeffizienten eingeben", a:s2, k:RK(S2[0]).concat(RK(S2[1])),
   d:`<p>Zeile 1: <b>3</b>, <b>2</b>, <b>5</b>. Zeile 2: <b>1</b>, <b>−4</b>, <b>2</b>. Jede Zahl mit ${E} bestätigen.</p>`},
  {t:"Lösung als Bruch", a:s2, k:[EX], z:["res"],
   d:`<p>Mit ${E} lösen. Diesmal steht ein <b>Bruch</b> im Ergebnis: x = 12/7.</p>`},
  {t:"In Dezimalzahl umwandeln", a:s2, k:MOD.DEC, z:["res"],
   d:`<p>${MOD.t.decK} wandelt um: 1,714285714. Gerundet: <b>x ≈ 1,71</b></p>`},
  {t:"y umwandeln", a:s2, k:[EX].concat(MOD.DEC), z:["res"],
   d:`<p>${E} für y, dann wieder ${MOD.t.decK}: −0,0714… Gerundet: <b>y ≈ −0,07</b></p>`},
  {t:"Erst ordnen!", a:s3o, k:[],
   d:`<p>Der Rechner braucht jede Gleichung in der Form <b>a${XI('x')} + b${XI('y')} = c</b>: links die Unbekannten (erst ${XI('x')}, dann ${XI('y')}), rechts nur eine Zahl.</p><p>Gleichung I ist nicht geordnet. Auf beiden Seiten <b>2${XI('x')} abziehen</b>:</p>`+UM+`<p>Geordnetes System:</p>`+s3,
   n:"Schreiben Sie die Umformung immer mit auf. Erst dann tippen."},
  {t:"Geordnetes System lösen", a:s3, k:["ac"].concat(RK(S3[0]),RK(S3[1]),[EX,EX]), z:["res"],
   d:`<p><b>AC</b>, dann Zeile 1: <b>−2</b>, <b>1</b>, <b>−1</b> und Zeile 2: <b>3</b>, <b>1</b>, <b>9</b>. Dann zweimal ${E}.</p><p>Ergebnis: <b>x = 2; y = 3</b></p>`},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1a und 1b",["1a ist schon geordnet: direkt eingeben und lösen","1b: erst beide Gleichungen ordnen (links <i>x</i> und <i>y</i>, rechts die Zahl), die Umformung hinter dem Strich notieren und das geordnete System eintragen",`Eingeben und lösen: <b>AC</b> ▸ Zeile 1 und 2 (jede Zahl mit ${E}) ▸ ${E} ▸ ${E}`,"<i>x</i> und <i>y</i> eintragen, dann die Lösungsmenge 𝕃 = {(<i>x</i> | <i>y</i>)}"])}
];
const D1=[[1,1,1,6],[2,-1,1,3],[1,2,-1,2]], D2=[[1,1,1,6],[2,0,1,5],[0,1,-1,-1]];
const D3=[[1,1,1,6],[2,2,2,10],[1,-1,1,2]], D4=[[1,1,1,6],[2,2,2,12],[1,-1,1,2]];
const d1=sysHTML(D1), d2=sysHTML(D2), d3=sysHTML(D3), d4=sysHTML(D4);
const T2=[
  {t:"Gleichungssystem öffnen", a:d1, k:MOD.OPEN.concat(MOD.SYS), z:MOD.N3Z, d:MOD.t.open+MOD.t.sys},
  {t:"3 Unbekannte wählen", a:d1, k:MOD.N3, z:["inp"],
   d:MOD.t.n3+`<p>Die Tabelle hat jetzt <b>3 Zeilen</b> und <b>4 Spalten</b>: a, b, c für die Zahlen vor ${XI('x')}, ${XI('y')}, ${XI('z')} und d für die rechte Seite.</p>`+KOEF(D1)},
  {t:"Zeile 1 eingeben", a:d1, k:RK(D1[0]), d:`<p>${XI('x')} + ${XI('y')} + ${XI('z')} = 6: lauter <b>1</b>en und rechts <b>6</b>.</p>`},
  {t:"Zeile 2 eingeben", a:d1, k:RK(D1[1]), d:`<p><b>2</b>, <b>−1</b>, <b>1</b>, <b>3</b>. Vorzeichen mit ${MOD.t.negK}.</p>`},
  {t:"Zeile 3 eingeben", a:d1, k:RK(D1[2]), d:`<p><b>1</b>, <b>2</b>, <b>−1</b>, <b>2</b>.</p>`},
  {t:"Lösen", a:d1, k:[EX,EX,EX], z:["res"],
   d:`<p>${E} löst das System. Mit ${E} blättern Sie weiter: <b>x = 1</b>, <b>y = 2</b>, <b>z = 3</b>.</p>`},
  {t:"Eine Unbekannte fehlt", a:d2, k:[],
   d:`<p>In Gleichung II fehlt ${XI('y')}, in Gleichung III fehlt ${XI('x')}. Fehlt eine Unbekannte, steht dort eine <b>0</b>:</p>`+KOEF(D2),
   n:"Fehlende Unbekannte = <b>0</b> eintragen. Das Feld darf nicht leer bleiben."},
  {t:"System mit Nullen lösen", a:d2, k:["ac"].concat(RK(D2[0]),RK(D2[1]),RK(D2[2]),[EX,EX,EX]), z:["res"],
   d:`<p><b>AC</b>, dann alle 12 Zahlen eingeben – mit den Nullen. Lösen und blättern: <b>x = 1; y = 2; z = 3</b>.</p>`},
  {t:"Sonderfall: keine Lösung", a:d3, k:["ac"].concat(RK(D3[0]),RK(D3[1]),RK(D3[2]),[EX]), z:["res"],
   d:`<p>Neues System eingeben und lösen. Der Rechner meldet: <b>Keine Lösung</b>.</p><p>Grund: Links ist Gleichung II genau das Doppelte von I. Rechts müsste dann 12 stehen – es steht aber 10. Das passt nie zusammen.</p>`,
   n:"Meldung <b>Keine Lösung</b> → Sie schreiben: 𝕃 = { } (leere Menge)."},
  {t:"Sonderfall: unendlich viele", a:d4, k:["ac"].concat(RK(D4[0]),RK(D4[1]),RK(D4[2]),[EX]), z:["res"],
   d:`<p>Jetzt steht in Gleichung II rechts eine <b>12</b>. Dann ist II nur das Doppelte von I und sagt nichts Neues.</p><p>Der Rechner meldet: <b>Unendlich viele Lösungen</b>.</p>`,
   n:"Meldung <b>Unendlich viele Lösungen</b> → Das System hat keine eindeutige Lösung."},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",[`Neues System mit drei Unbekannten: ${MOD.t.neu}`,"In Gleichung III fehlt <i>y</i>: dort eine <b>0</b> eintragen","Lösen und <i>x</i>, <i>y</i>, <i>z</i> eintragen","Lösungsmenge eintragen: 𝕃 = {(<i>x</i> | <i>y</i> | <i>z</i>)}","Danach: Lösungscode eintragen"])}
];
const P1=[[1,1,1,4],[4,2,1,9],[1,-1,1,6]];
const ST=`<i>f</i>(${XI('x')}) = ${XI('a')}${XI('x')}<sup>2</sup> + ${XI('b')}${XI('x')} + ${XI('c')}<br><small>Punkte: P(1 | 4), Q(2 | 9), R(−1 | 6)</small>`;
const EIN=`<table class="umf"><tr><td>P(1 | 4):</td><td class="r">${XI('a')} · 1<sup>2</sup> + ${XI('b')} · 1 + ${XI('c')} = 4</td><td>→ &nbsp;${XI('a')} + ${XI('b')} + ${XI('c')} = 4</td></tr><tr><td>Q(2 | 9):</td><td class="r">${XI('a')} · 2<sup>2</sup> + ${XI('b')} · 2 + ${XI('c')} = 9</td><td>→ &nbsp;4${XI('a')} + 2${XI('b')} + ${XI('c')} = 9</td></tr><tr><td>R(−1 | 6):</td><td class="r">${XI('a')} · (−1)<sup>2</sup> + ${XI('b')} · (−1) + ${XI('c')} = 6</td><td>→ &nbsp;${XI('a')} − ${XI('b')} + ${XI('c')} = 6</td></tr></table>`;
const T3=[
  {t:"Ansatz: Parabel durch drei Punkte", a:ST, k:[],
   d:`<p>Gesucht ist eine Parabel durch drei Punkte. Unbekannt sind die Zahlen <b>a</b>, <b>b</b> und <b>c</b> im Funktionsterm.</p><p>Jeder Punkt liefert eine Gleichung: Setzen Sie ${XI('x')} und ${XI('y')} des Punktes ein.</p>`+EIN},
  {t:"Buchstaben übersetzen", a:sysHTML(P1,['a','b','c']), k:[],
   d:`<p>Das sind drei Gleichungen mit drei Unbekannten. Der Rechner nennt die Unbekannten aber <b>x</b>, <b>y</b> und <b>z</b>:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">${XI('a')} → ${XI('x')} &nbsp; ${XI('b')} → ${XI('y')} &nbsp; ${XI('c')} → ${XI('z')}</p>`+KOEF(P1),
   n:"Achtung, Verwechslungsgefahr: Die Spaltennamen a, b, c, d in der Tabelle sind <b>nicht</b> die gesuchten a, b, c der Parabel."},
  {t:"Gleichungssystem öffnen", a:sysHTML(P1,['a','b','c']), k:MOD.OPEN.concat(MOD.SYS,MOD.N3), z:["inp"],
   d:`<p>${MOD.t.neu}: drei Unbekannte.</p>`},
  {t:"Koeffizienten eingeben", a:sysHTML(P1,['a','b','c']), k:RK(P1[0]).concat(RK(P1[1]),RK(P1[2])),
   d:`<p>Zeile 1: <b>1, 1, 1, 4</b> · Zeile 2: <b>4, 2, 1, 9</b> · Zeile 3: <b>1, −1, 1, 6</b></p>`},
  {t:"Lösen und zurückübersetzen", a:sysHTML(P1,['a','b','c']), k:[EX,EX,EX], z:["res"],
   d:`<p>Lösen und blättern: x = 2, y = −1, z = 3. Zurückübersetzt: <b>a = 2</b>, <b>b = −1</b>, <b>c = 3</b>.</p><p style="font-family:Cambria,Georgia,serif;font-size:20px"><i>f</i>(${XI('x')}) = 2${XI('x')}<sup>2</sup> − ${XI('x')} + 3</p><p>Probe mit Q: 2 · 4 − 2 + 3 = 9 ✓</p>`}
];
const TRACKS={
  z:{name:"1 · Zwei Unbekannte", start:()=>fresh(), steps:T1},
  d:{name:"2 · Drei Unbekannte und Sonderfälle", start:()=>fresh(), steps:T2},
  s:{name:"3 · Anwendung: Parabel durch drei Punkte", start:()=>fresh(), steps:T3}
};

// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["z","d","s"];
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
  $('next').className='go';
  $('next').textContent=fin ? (last ? (nextT?`Weiter mit ${TRACKS[nextT].name} ▶`:'Fertig ✓') : 'Weiter ▶') : 'Weiter ▶';
  $('next').disabled=fin&&last&&!nextT; { const sk=$('skip'); if(sk) sk.disabled=fin&&last&&!nextT; }
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
    if(k==='exe'&&want!=='exe') extra=' Erst die Zahl eintippen, dann mit <b>EXE</b> bestätigen.';
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
