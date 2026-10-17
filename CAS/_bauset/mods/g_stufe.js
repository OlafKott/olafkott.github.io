GUIDES["stufe"]={
 title:"Zeilenstufenform (Ref/Rref)",
 css:String.raw`[data-g="stufe"] .sb .ind.a{ background:#7a1a2a; }
[data-g="stufe"] .ein{ font-size:16px; min-height:30px; display:flex; align-items:center; flex-wrap:nowrap; white-space:nowrap; overflow:hidden; }
[data-g="stufe"] .aus{ font-size:21px; text-align:right; min-height:30px; display:flex; justify-content:flex-end; align-items:center; font-weight:bold; white-space:nowrap; gap:6px; }
[data-g="stufe"] .aus .lab{ font-size:17px; font-weight:normal; margin-right:auto; }
[data-g="stufe"] .klein{ font-size:13px; display:flex; justify-content:space-between; }
[data-g="stufe"] .vx{ font-family:'Times New Roman',serif; font-style:italic; font-size:18px; padding:0 1px; }
[data-g="stufe"] .ein sup{ font-size:11px; align-self:flex-start; margin-top:4px; }
[data-g="stufe"] .wz{ white-space:nowrap; }
[data-g="stufe"] .wz .ov{ border-top:1.5px solid currentColor; padding:0 1px; margin-left:-1px; }
[data-g="stufe"] .lst{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:4px 9px; font:bold 16px 'Courier New',monospace; line-height:1.55; }
[data-g="stufe"] .lst .s{ background:#141a14; color:#d3ded4; }
[data-g="stufe"] .koef{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:2px 7px 4px; display:flex; flex-direction:column; }
[data-g="stufe"] .koef .kt{ font-size:14px; text-align:center; font-family:'Times New Roman',serif; }
[data-g="stufe"] .koef table{ border-collapse:collapse; margin:3px auto 0; font-size:14px; }
[data-g="stufe"] .koef th{ font:italic bold 14px 'Times New Roman',serif; padding:0 10px; border-bottom:1.5px solid #141a14; }
[data-g="stufe"] .koef td{ text-align:center; padding:1px 8px; min-width:62px; }
[data-g="stufe"] .koef td.cur{ background:#141a14; color:#d3ded4; }
[data-g="stufe"] .koef .inp{ margin-top:auto; text-align:right; font-size:18px; font-weight:bold; min-height:24px; }
[data-g="stufe"] .panel{ flex:1 1 360px; max-width:560px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; }
[data-g="stufe"] .chip.alpha{ background:#b8324a; }
[data-g="stufe"] .chip.w{ background:#f1f1f3; color:#111; border-color:#c9cbd1; }
[data-g="stufe"] .chip.b{ background:#2463c9; }
[data-g="stufe"] .chip i.v{ font-family:'Times New Roman',serif; font-size:15px; }
[data-g="stufe"] .task .term{ font-family:Cambria,Georgia,serif; font-size:21px; line-height:1.6; color:var(--ink); }
[data-g="stufe"] .task .term small{ font-size:15px; color:var(--mute); }
[data-g="stufe"] #next{ margin-left:auto; }
@media (max-width:380px){ [data-g="stufe"] .calc{ transform:scale(.92); transform-origin:top center; } }
[data-g="stufe"] .lst.xs{ font:bold 13.5px 'Courier New',monospace; line-height:1.38; padding:2px 8px; }
[data-g="stufe"] .lst.xs div{ white-space:nowrap; }
[data-g="stufe"] .mat{ position:absolute; left:0; right:0; top:13px; bottom:0; padding:1px 6px 3px; display:flex; flex-direction:column; }
[data-g="stufe"] .mat .mh{ position:absolute; left:6px; top:2px; font:bold 11px Arial,sans-serif; }
[data-g="stufe"] .mat table{ border-collapse:collapse; margin:0 auto; font-size:14px; }
[data-g="stufe"] .mat th{ font:bold 11px Arial,sans-serif; padding:0 6px; border-bottom:1.5px solid #141a14; }
[data-g="stufe"] .mat td{ text-align:center; padding:0 5px; min-width:54px; height:19px; line-height:19px; }
[data-g="stufe"] .mat td.rn{ min-width:12px; font-size:11px; padding:0 3px 0 0; border-right:1px solid #141a14; }
[data-g="stufe"] .mat td.cur{ background:#141a14; color:#d3ded4; }
[data-g="stufe"] .mat.m3 table{ font-size:13px; }
[data-g="stufe"] .mat.m3 td{ height:17px; line-height:17px; min-width:44px; }
[data-g="stufe"] .mat .inp{ margin-top:auto; text-align:right; font-size:17px; font-weight:bold; min-height:22px; }
[data-g="stufe"] .mres{ position:absolute; left:0; right:0; top:13px; bottom:0; display:flex; align-items:center; justify-content:center; padding:2px 6px; }
[data-g="stufe"] .mres .ml{ position:absolute; left:6px; top:2px; font:bold 11px Arial,sans-serif; }
[data-g="stufe"] table.mx{ border-collapse:separate; border-spacing:0; border-left:1.6px solid #141a14; border-right:1.6px solid #141a14; border-radius:5px; font-size:15px; font-weight:bold; }
[data-g="stufe"] table.mx td{ padding:0 7px; text-align:right; height:21px; }
[data-g="stufe"] table.mx .fr{ font-size:11px; }
[data-g="stufe"] .aus.meld{ font-size:19px; text-align:center; justify-content:center; line-height:1.15; white-space:normal; }
[data-g="stufe"] .mxw{ display:inline-flex; align-items:center; gap:6px; margin:0 16px 4px 0; font-family:Cambria,Georgia,serif; font-size:19px; white-space:nowrap; }
[data-g="stufe"] table.mxp{ border-collapse:separate; border-spacing:0; border-left:2px solid #1d1d1f; border-right:2px solid #1d1d1f; border-radius:7px; font-family:Cambria,Georgia,serif; font-size:17px; display:inline-table; vertical-align:middle; }
[data-g="stufe"] table.mxp td{ padding:1px 9px; text-align:right; }
[data-g="stufe"] .frp{ display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; font-size:13px; line-height:1.1; }
[data-g="stufe"] .frp > span:first-child{ border-bottom:1.2px solid currentColor; }
[data-g="stufe"] .task .term small{ display:block; }
[data-g="stufe"] #dd .mxw{ margin:2px 0 10px; }
[data-g="stufe"] table.mxp td.rs{ border-left:1.5px solid #1d1d1f; }
[data-g="stufe"] table.lgs{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:17px; margin:0 0 6px; }
[data-g="stufe"] table.lgs td{ padding:0 3px; text-align:right; }
[data-g="stufe"] table.lgs td:first-child{ font:bold 12px Arial,sans-serif; color:var(--mute); padding-right:10px; text-align:left; }
[data-g="stufe"] .mat.m4 td{ min-width:38px; }
[data-g="stufe"] .mat.m4 table{ font-size:13px; }
[data-g="stufe"] table.mx td{ padding:0 5px; }`,
 make:function(){

// =====================================================================
//  Zahlen: exakte Brüche
// =====================================================================
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const R=(p,q=1)=>{ if(q<0){ p=-p; q=-q; } const g=gcd(p,q); return {p:p/g,q:q/g}; };
const addR=(a,b)=>R(a.p*b.q+b.p*a.q,a.q*b.q), mulR=(a,b)=>R(a.p*b.p,a.q*b.q), negR=a=>R(-a.p,a.q), divR=(a,b)=>R(a.p*b.q,a.q*b.p);
const subR=(a,b)=>addR(a,negR(b));
const valR=r=>r.p/r.q;
function numR(s){ const [i,f='']=s.split(','); return R(parseInt((i||'0')+f,10), 10**f.length); }
function dec(v){ if(Math.abs(v)<1e-12) v=0; return Number(v.toPrecision(10)).toString().replace('.',',').replace('-','−'); }
function fmtR(r){
  if(r.q===1) return String(r.p).replace('-','−');
  return (r.p<0?'−':'')+`<span class="fr"><span>${Math.abs(r.p)}</span><span>${r.q}</span></span>`;
}
function koefR(t){
  let s=1, n='';
  for(const k of t){ if(k==='neg'||k==='-') s=-s; else n+=k; }
  const r=numR(n||'0'); return s<0?negR(r):r;
}

// =====================================================================
//  Matrizenrechnung (exakt)
// =====================================================================
const zeros=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>R(0)));
const toM=a=>a.map(r=>r.map(v=>typeof v==='number'?numR(String(v).replace('.',',')):v));
function mAdd(a,b,s){ if(a.length!==b.length||a[0].length!==b[0].length) throw 'dim'; return a.map((r,i)=>r.map((v,j)=>s<0?subR(v,b[i][j]):addR(v,b[i][j]))); }
function mMul(a,b){ if(a[0].length!==b.length) throw 'dim'; return a.map(r=>b[0].map((_,j)=>r.reduce((s,v,k)=>addR(s,mulR(v,b[k][j])),R(0)))); }
const mScal=(k,a)=>a.map(r=>r.map(v=>mulR(k,v)));
const mTrn=a=>a[0].map((_,j)=>a.map(r=>r[j]));
function mDet(a){
  const n=a.length; if(a[0].length!==n) throw 'dim';
  const A=a.map(r=>r.slice()); let d=R(1);
  for(let c=0;c<n;c++){
    let p=-1; for(let i=c;i<n;i++) if(A[i][c].p!==0){ p=i; break; }
    if(p<0) return R(0);
    if(p!==c){ [A[c],A[p]]=[A[p],A[c]]; d=negR(d); }
    d=mulR(d,A[c][c]);
    for(let i=c+1;i<n;i++){ const f=divR(A[i][c],A[c][c]); for(let j=c;j<n;j++) A[i][j]=subR(A[i][j],mulR(f,A[c][j])); }
  }
  return d;
}
function mInv(a){
  const n=a.length; if(a[0].length!==n) throw 'dim';
  const A=a.map((r,i)=>r.concat(Array.from({length:n},(_,j)=>R(i===j?1:0))));
  for(let c=0;c<n;c++){
    let p=-1; for(let i=c;i<n;i++) if(A[i][c].p!==0){ p=i; break; }
    if(p<0) throw 'math';
    [A[c],A[p]]=[A[p],A[c]]; const pv=A[c][c];
    for(let j=0;j<2*n;j++) A[c][j]=divR(A[c][j],pv);
    for(let i=0;i<n;i++) if(i!==c&&A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<2*n;j++) A[i][j]=subR(A[i][j],mulR(f,A[c][j])); }
  }
  return A.map(r=>r.slice(n));
}

// Zeilenstufenform wie der Rechner: Spaltenpivot (betragsgrößte Zahl), führende Einsen
function mRef(a){
  const A=a.map(r=>r.slice()), m=A.length, n=A[0].length; let r=0;
  for(let c=0;c<n&&r<m;c++){
    let p=-1, best=0; for(let i=r;i<m;i++){ const v=Math.abs(valR(A[i][c])); if(v>best+1e-12){ best=v; p=i; } }
    if(p<0) continue;
    [A[r],A[p]]=[A[p],A[r]]; const pv=A[r][c];
    for(let j=0;j<n;j++) A[r][j]=divR(A[r][j],pv);
    for(let i=r+1;i<m;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=subR(A[i][j],mulR(f,A[r][j])); }
    r++;
  }
  return A;
}
function mRref(a){
  const A=mRef(a), m=A.length, n=A[0].length;
  for(let r=m-1;r>=0;r--){
    const c=A[r].findIndex(v=>v.p!==0); if(c<0) continue;
    for(let i=0;i<r;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=subR(A[i][j],mulR(f,A[r][j])); }
  }
  return A;
}
// Werte: {s:Bruch} oder {m:Matrix}
function vAdd(x,y,s){ if(x.s&&y.s) return {s:s<0?subR(x.s,y.s):addR(x.s,y.s)}; if(x.m&&y.m) return {m:mAdd(x.m,y.m,s)}; throw 'dim'; }
function vMul(x,y){ if(x.s&&y.s) return {s:mulR(x.s,y.s)}; if(x.s) return {m:mScal(x.s,y.m)}; if(y.s) return {m:mScal(y.s,x.m)}; return {m:mMul(x.m,y.m)}; }
function vDiv(x,y){ if(!y.s) throw 'math'; if(y.s.p===0) throw 'math'; const k=divR(R(1),y.s); return x.s?{s:mulR(x.s,k)}:{m:mScal(k,x.m)}; }
function vInv(x){ if(x.s){ if(x.s.p===0) throw 'math'; return {s:divR(R(1),x.s)}; } return {m:mInv(x.m)}; }
// Ausdruck aus Tasten-Token auswerten
function evalTok(T,S){
  let i=0;
  const peek=()=>T[i];
  function prim(){
    const t=T[i];
    if(t===undefined) throw 'syntax';
    if(/^[0-9,]$/.test(t)){ let n=''; while(i<T.length&&/^[0-9,]$/.test(T[i])) n+=T[i++]; return {s:numR(n)}; }
    if('ABCD'.includes(t)&&t.length===1){ i++; if(!S.M[t]) throw 'math'; return {m:S.M[t]}; }
    if(t==='Ans'){ i++; if(!S.Ans) throw 'math'; return {m:S.Ans}; }
    if(t==='('||t==='det'||t==='trn'||t==='ref'||t==='rref'){ i++; const v=expr(); if(peek()===')') i++; else if(i<T.length) throw 'syntax';
      if(t==='det'){ if(!v.m) throw 'math'; return {s:mDet(v.m)}; }
      if(t==='trn'){ if(!v.m) throw 'math'; return {m:mTrn(v.m)}; }
      if(t==='ref'){ if(!v.m) throw 'math'; return {m:mRef(v.m)}; }
      if(t==='rref'){ if(!v.m) throw 'math'; return {m:mRref(v.m)}; }
      return v; }
    throw 'syntax';
  }
  function post(){ let v=prim(); while(['sq','cube','inv'].includes(peek())){ const t=T[i++];
      if(t==='inv') v=vInv(v); else { const w=vMul(v,v); v=t==='sq'?w:vMul(w,v); } } return v; }
  function fac(){ if(peek()==='neg'){ i++; return vMul({s:R(-1)},fac()); } return post(); }
  function term(){ let v=fac(); while(peek()==='*'||peek()==='/'){ const o=T[i++]; const w=fac(); v=o==='*'?vMul(v,w):vDiv(v,w); } return v; }
  function expr(){ let v=term(); while(peek()==='+'||peek()==='-'){ const o=T[i++]; v=vAdd(v,term(),o==='-'?-1:1); } return v; }
  const v=expr(); if(i<T.length) throw 'syntax'; return v;
}

// =====================================================================
//  Anzeige
// =====================================================================
const TOKTXT={neg:'−','-':'−','+':'+','*':'×','/':'÷','(':'(',')':')',sq:'<sup>2</sup>',cube:'<sup>3</sup>',inv:'<sup>−1</sup>',
  A:'MatA',B:'MatB',C:'MatC',D:'MatD',Ans:'MatAns',det:'Det(',trn:'Trn(',ref:'Ref(',rref:'Rref('};
const lineTxt=(t,caret)=>t.map(k=>TOKTXT[k]||k).join('')+(caret?'<span class="caret"></span>':'');
function mxHTML(m,fmt,cls){
  return `<table class="mx ${cls||''}">`+m.map(r=>'<tr>'+r.map(v=>`<td>${fmt?fmt(v):fmtR(v)}</td>`).join('')+'</tr>').join('')+'</table>';
}
const sizeTxt=m=>m?`${m.length}×${m[0].length}`:(MODEL==='cw'?'Keine':'—');

// =====================================================================
//  Gemeinsame Zustandslogik
// =====================================================================
const MN='ABCD';
function fresh(pre){
  const S={mode:MODEL==='cw'?'home':'calc', sel:0, shift:false, alpha:false, M:{A:null,B:null,C:null,D:null}, Ans:null,
    line:[], out:null, err:null, v:'A', nr:2, nc:2, r:0, c:0, inp:[], page:0, pur:'def', lvl:0, back:'calc'};
  if(pre){ for(const k in pre) S.M[k]=toM(pre[k]); S.mode='calc'; }
  return S;
}
function openEd(S,v){ S.v=v; S.mode='edit'; S.r=0; S.c=0; S.inp=[]; }
function edKey(S,k){
  const m=S.M[S.v], R_=m.length, C_=m[0].length;
  if(k==='exe'){ if(S.inp.length){ m[S.r][S.c]=koefR(S.inp); S.inp=[]; if(S.c<C_-1) S.c++; else if(S.r<R_-1){ S.r++; S.c=0; } } return; }
  if(k==='del'){ S.inp.pop(); return; }
  if(k==='left'){ S.inp=[]; if(S.c>0) S.c--; return; }
  if(k==='right'){ S.inp=[]; if(S.c<C_-1) S.c++; return; }
  if(k==='up'){ S.inp=[]; if(S.r>0) S.r--; return; }
  if(k==='down'){ S.inp=[]; if(S.r<R_-1) S.r++; return; }
  if(/^[0-9,]$/.test(k)||k==='neg') S.inp.push(k);
}
function pushTok(S,t){ if(S.out!==null){ S.line=[]; S.out=null; } S.line.push(t); S.mode='calc'; }
function calcKey(S,k){
  if(k==='ac'){ S.line=[]; S.out=null; return true; }
  if(k==='del'){ if(S.out===null) S.line.pop(); return true; }
  if(k==='exe'){
    if(!S.line.length) return true;
    try{ const v=evalTok(S.line,S);
      if(v.m){ S.Ans=v.m; S.mode='res'; S.out=null; } else { S.out=fmtR(v.s); }
    }catch(e){ S.err=(e==='dim'?'dim':e==='syntax'?'syn':'math'); S.mode='err'; }
    return true;
  }
  if(/^[0-9,]$/.test(k)||['+','-','*','/','(',')','neg','sq','cube','inv'].includes(k)){ pushTok(S,k); return true; }
  return false;
}
function resKey(S,k){
  if(['+','-','*','/'].includes(k)){ S.mode='calc'; S.line=['Ans',k]; S.out=null; return; }
  if(k==='ac'||k==='back'){ S.mode='calc'; S.line=[]; S.out=null; }
}
function errKey(S,k){ if(k==='ac'||k==='back'||k==='left'||k==='right'){ S.mode='calc'; S.line=[]; S.out=null; S.err=null; } }

// =====================================================================
//  fx-991DE CW: HOME, Listen, Matrix-App
// =====================================================================
const MODEL='cw';
const T_=(t,sz)=>`<text x="17" y="12" text-anchor="middle" font-size="${sz||11}" font-weight="bold" fill="currentColor">${t}</text>`;
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
 Vektor:'<svg viewBox="0 0 34 14"><path d="M12 12L21 3M12 12h11M12 12V3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
 'Verhältnis':'<svg viewBox="0 0 34 14"><rect x="8" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="19" y="3" width="7" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="17" cy="5" r=".9" fill="currentColor"/><circle cx="17" cy="9" r=".9" fill="currentColor"/></svg>'
};
const APPS=["Berechnung","Statistik","Verteilung","Tabellenk.","Wertetab.","Gleichung","Ungleichung","Komplex","Basis-N","Matrix","Vektor","Verhältnis"];
const zl=(lbl,ziel)=>(ziel||[]).includes(lbl)?' ziel':'';
function drawHome(S,ziel){
  const pg=Math.floor(S.sel/6);
  return `<div class="home"><div class="grid">`+APPS.slice(pg*6,pg*6+6).map((a,j)=>{ const i=pg*6+j;
    return `<div class="ic${i===S.sel?' sel':''}${zl(a,ziel)}"><span class="bd">${i+1}</span>${ICON[a]}<span class="an">${a}</span></div>`; }).join('')+`</div></div>`;
}
function sbar(S){ return `<div class="sb">${S.shift?'<span class="ind">S</span>':''}<span class="ind">D</span><span class="sp"></span>${S.mode==='home'?'':'<span style="font-weight:bold">Matrix</span>'}</div>`; }
// Liste mit Bildlauf (höchstens 4 Zeilen sichtbar)
function drawList(S,title,L,ziel){
  const top=Math.max(0,Math.min(S.sel-3,L.length-4));
  return sbar(S)+`<div class="list"><div class="ti">${title}</div>`+L.slice(top,top+4).map((t,j)=>{ const i=top+j;
    return `<div class="it${i===S.sel?' sel':''}${zl(t,ziel)}">${t}</div>`; }).join('')+'</div>';
}
const CATS=['Matrix','Num. Berechnung','Wahrscheinlichk.','Winkel/Koord.'];
const CMAT=['MatA','MatB','MatC','MatD','MatAns','Matrizenrechnung'];
const CCALC=['Matrix quadrieren','Matrix hoch drei','Inverse Matrix','Determinante','Transponierte','Einheitsmatrix','Stufenform REF','Stufenform RREF'];
const VSUB=['Neu definieren','Editieren'];
const ZEILEN=['1 Zeile','2 Zeilen','3 Zeilen','4 Zeilen'], SPALTEN=['1 Spalte','2 Spalten','3 Spalten','4 Spalten'];
const vItems=S=>MN.split('').map(v=>`Mat${v}: ${sizeTxt(S.M[v])}`);
const vPlain=S=>MN.split('').map(v=>'Mat'+v);

function step(S,k){
  if(S.mode==='off'){ if(k==='on') S.mode='calc'; return; }
  if(k==='shift'){ S.shift=!S.shift; return; }
  if(S.shift){ S.shift=false; if(k==='ac'){ S.mode='off'; return; } if(k==='-') k='neg'; else if(k==='pow') k='inv'; else return; }
  if(k==='home'){ S.mode='home'; S.sel=0; return; }
  const up=()=>{ S.sel=Math.max(0,S.sel-1); }, dn=n=>{ S.sel=Math.min(n-1,S.sel+1); };
  switch(S.mode){
   case 'home':
     if(k==='right') S.sel=Math.min(APPS.length-1,S.sel+1); else if(k==='left') S.sel=Math.max(0,S.sel-1);
     else if(k==='down') S.sel=Math.min(APPS.length-1,S.sel+3); else if(k==='up') S.sel=Math.max(0,S.sel-3);
     else if((k==='ok'||k==='exe')&&S.sel===9){ S.mode='calc'; S.line=[]; S.out=null; }
     return;
   case 'calc':
     if(k==='tools'){ S.mode='vlist'; S.sel=0; return; }
     if(k==='cat'){ S.mode='cat'; S.lvl=0; S.sel=0; return; }
     calcKey(S,k); return;
   case 'vlist':
     if(k==='up') up(); else if(k==='down') dn(4);
     else if(k==='ok'||k==='exe'){ S.v=MN[S.sel]; if(S.M[S.v]){ S.mode='vsub'; S.sel=0; } else { S.mode='size'; S.nr=2; S.nc=2; S.sel=0; } }
     else if(k==='ac'||k==='back') S.mode='calc';
     return;
   case 'vsub':
     if(k==='up') up(); else if(k==='down') dn(2);
     else if(k==='ok'||k==='exe'){ if(S.sel===0){ S.mode='size'; S.nr=2; S.nc=2; S.sel=0; } else openEd(S,S.v); }
     else if(k==='back'){ S.mode='vlist'; S.sel=MN.indexOf(S.v); } else if(k==='ac') S.mode='calc';
     return;
   case 'size':
     if(k==='up') up(); else if(k==='down') dn(3);
     else if(k==='ok'||k==='exe'){ if(S.sel===0){ S.mode='rlist'; S.sel=S.nr-1; } else if(S.sel===1){ S.mode='clist'; S.sel=S.nc-1; } else { S.M[S.v]=zeros(S.nr,S.nc); openEd(S,S.v); } }
     else if(k==='back'||k==='ac') S.mode='calc';
     return;
   case 'rlist': case 'clist':
     if(k==='up') up(); else if(k==='down') dn(4);
     else if(k==='ok'||k==='exe'){ if(S.mode==='rlist'){ S.nr=S.sel+1; S.sel=0; } else { S.nc=S.sel+1; S.sel=1; } S.mode='size'; }
     else if(k==='back'){ S.sel=S.mode==='rlist'?0:1; S.mode='size'; }
     return;
   case 'edit':
     if(k==='ac'||k==='back'){ S.mode='calc'; S.line=[]; S.out=null; return; }
     if(k==='-') k='neg';
     edKey(S,k); return;
   case 'cat': {
     const L=[CATS,CMAT,CCALC][S.lvl];
     if(k==='up') up(); else if(k==='down') dn(L.length);
     else if(k==='back'){ if(S.lvl===0) S.mode='calc'; else { S.lvl--; S.sel=S.lvl===1?5:0; } }
     else if(k==='ac') S.mode='calc';
     else if(k==='ok'||k==='exe'){
       if(S.lvl===0){ if(S.sel===0){ S.lvl=1; S.sel=0; } }
       else if(S.lvl===1){ if(S.sel<4) pushTok(S,MN[S.sel]); else if(S.sel===4) pushTok(S,'Ans'); else { S.lvl=2; S.sel=0; } }
       else { const tk=['sq','cube','inv','det','trn',null,'ref','rref'][S.sel]; if(tk) pushTok(S,tk); }
     }
     return; }
   case 'res': resKey(S,k); return;
   case 'err': errKey(S,k); return;
  }
}
function run(S,keys){ keys.forEach(k=>step(S,k)); return S; }
function drawEd(S,Z){
  const m=S.M[S.v], C_=m[0].length;
  let h=`<div class="mat${m.length>2||C_>2?' m3':''}${C_>3?' m4':''}"><div class="mh">Mat${S.v}</div><table><tr><th></th>${m[0].map((_,j)=>`<th>${j+1}</th>`).join('')}</tr>`;
  m.forEach((row,i)=>{ h+=`<tr><td class="rn">${i+1}</td>`+row.map((v,j)=>`<td class="${i===S.r&&j===S.c?'cur':''}">${dec(valR(v))}</td>`).join('')+'</tr>'; });
  const inp=S.inp.length?lineTxt(S.inp,true):dec(valR(m[S.r][S.c]));
  return sbar(S)+h+`</table><div class="inp${Z('inp')}">${inp}</div></div>`;
}
function draw(S,ziel){
  const Z=n=>(ziel||[]).includes(n)?' ziel':'';
  if(S.mode==='off') return '<div class="offs"></div>';
  if(S.mode==='home') return drawHome(S,ziel);
  if(S.mode==='vlist') return drawList(S,'Matrix-Variable',vItems(S),(ziel||[]).map(z=>vItems(S).find(t=>t.startsWith(z+':'))||z));
  if(S.mode==='vsub') return drawList(S,'Mat'+S.v,VSUB,ziel);
  if(S.mode==='size') return drawList(S,'Mat'+S.v+' Größe',[`Zeilen: ${S.nr}`,`Spalten: ${S.nc}`,'Bestätigen'],ziel);
  if(S.mode==='rlist') return drawList(S,'Zeilen',ZEILEN,ziel);
  if(S.mode==='clist') return drawList(S,'Spalten',SPALTEN,ziel);
  if(S.mode==='cat') return drawList(S,['Katalog','Matrix','Matrizenrechnung'][S.lvl],[CATS,CMAT,CCALC][S.lvl],ziel);
  if(S.mode==='edit') return drawEd(S,Z);
  if(S.mode==='res') return sbar(S)+`<div class="mres${Z('res')}"><span class="ml">MatAns</span>${mxHTML(S.Ans)}</div>`;
  if(S.mode==='err') return sbar(S)+`<div class="app"><div class="aus meld${Z('res')}">${S.err==='dim'?'Dimensionsfehler':S.err==='syn'?'Syntaxfehler':'Mathemat. Fehler'}</div><div class="klein"><span>↶ oder AC: zurück</span></div></div>`;
  return sbar(S)+`<div class="app"><div class="ein">${lineTxt(S.line,S.out===null)}</div><div class="aus${Z('res')}">${S.out!==null?S.out:''}</div></div>`;
}
// ---- Modell-Angaben für die Tour
const dn=n=>Array(n).fill('down');
const MOD={
  NEG:['shift','-'], EXE:'exe', AC:'ac',
  OPEN:['home','down','down','down','ok'], OPENZ:['Matrix'],
  // Matrix definieren (ex = Variable schon belegt)
  DEF(v,r,c,ex){ const i=MN.indexOf(v); let k=['tools'].concat(dn(i),['ok']); if(ex) k.push('ok');
    let sel=0;
    if(r!==2){ k.push('ok'); k=k.concat(r>2?dn(r-2):['up']); k.push('ok'); }
    if(c!==2){ k.push('down','ok'); k=k.concat(c>2?dn(c-2):['up']); k.push('ok'); sel=1; }
    return k.concat(dn(2-sel),['ok']); },
  EDIT(v){ return ['tools'].concat(dn(MN.indexOf(v)),['ok','down','ok']); },
  MAT(v){ return ['cat','ok'].concat(dn(MN.indexOf(v)),['ok']); },
  ANS:['cat','ok','down','down','down','down','ok'],
  DET:['cat','ok'].concat(dn(5),['ok'],dn(3),['ok']),
  TRN:['cat','ok'].concat(dn(5),['ok'],dn(4),['ok']),
  REF:['cat','ok'].concat(dn(5),['ok'],dn(6),['ok']), RREF:['cat','ok'].concat(dn(5),['ok'],dn(7),['ok']),
  SQ:['cat','ok'].concat(dn(5),['ok','ok']), CUBE:['cat','ok'].concat(dn(5),['ok','down','ok']), INV:['cat','ok'].concat(dn(5),['ok'],dn(2),['ok']),
  t:{ exe:'<b>EXE</b>', neg:'<b>SHIFT</b> und dann <b>−</b>', negK:'<b>SHIFT −</b>', back:'<b>AC</b>',
      open:'<p>Matrizen berechnet der Rechner in der App <b>Matrix</b>. Drücken Sie <b>HOME</b>. Gehen Sie mit <b>▼</b> zum Symbol <b>Matrix</b> (Nummer 10). Noch nicht bestätigen.</p>',
      matA:'<b>CATALOG</b> ▸ Matrix ▸ MatA', mat:v=>`<b>CATALOG</b> ▸ Matrix ▸ Mat${v}`,
      det:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ Determinante', trn:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ Transponierte',
      inv:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ Inverse Matrix', sq:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ Matrix quadrieren', cube:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ Matrix hoch drei',
      ref:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ <b>Stufenform REF</b>', rref:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ <b>Stufenform RREF</b>',
      def:'<b>TOOLS</b> ▸ Matrix wählen ▸ <b>OK</b> ▸ Größe ▸ Bestätigen', edit:'<b>TOOLS</b> ▸ Matrix wählen ▸ <b>OK</b> ▸ Editieren' }
};
// Startschritte Teil 1 (Modell-spezifisch)
function T1start(){
  return [
  {t:"Matrix-App öffnen", k:MOD.OPEN.slice(0,4), z:MOD.OPENZ, d:MOD.t.open},
  {t:"Matrix-App starten", k:['ok'], d:'<p>Mit <b>OK</b> starten Sie die App. Oben im Display steht jetzt <b>Matrix</b>.</p>'},
  {t:"Variablenliste öffnen", k:['tools'], z:['MatA'],
   d:'<p>Der Rechner hat vier Speicherplätze für Matrizen: <b>MatA</b>, <b>MatB</b>, <b>MatC</b> und <b>MatD</b>. Drücken Sie <b>TOOLS</b>.</p><p>Bei jedem Platz steht <b>Keine</b> – er ist noch leer.</p>'},
  {t:"MatA wählen", k:['ok'], z:['Bestätigen'],
   d:'<p><b>MatA</b> ist markiert. Mit <b>OK</b> wählen.</p><p>Jetzt fragt der Rechner nach der <b>Größe</b>. Voreingestellt ist 2 Zeilen und 2 Spalten.</p>'},
  {t:"Größe bestätigen", k:['down','down','ok'], z:['inp'],
   d:'<p>Unsere Matrix hat 2 Zeilen und 2 Spalten. Das passt schon. Gehen Sie mit <b>▼</b> zu <b>Bestätigen</b> und drücken Sie <b>OK</b>.</p><p>Sie sehen den <b>Matrix-Editor</b>: eine Tabelle voller Nullen.</p>',
   n:'Erst die <b>Zeilen</b> (waagerecht), dann die <b>Spalten</b> (senkrecht). Man sagt: eine <b>2×2</b>-Matrix („zwei Kreuz zwei“).'}
  ];
}
function T1defB(){ return MOD.DEF('B',2,2); }
function T1defC(){ return MOD.DEF('C',2,3); }
const DEFTXT={
  B:'<p><b>TOOLS</b> ▸ mit <b>▼</b> zu <b>MatB</b> ▸ <b>OK</b>. Jetzt die Größe ändern: <b>Zeilen</b> ist markiert ▸ <b>OK</b> ▸ <b>▼</b> zu <b>3 Zeilen</b> ▸ <b>OK</b>. Spalten bleiben 2. Dann mit <b>▼ ▼</b> zu <b>Bestätigen</b> ▸ <b>OK</b>.</p>',
  C:'<p><b>TOOLS</b> ▸ <b>▼ ▼</b> zu <b>MatC</b> ▸ <b>OK</b>. Jetzt die Größe ändern: <b>▼</b> zu <b>Spalten</b> ▸ <b>OK</b> ▸ <b>▼</b> zu <b>3 Spalten</b> ▸ <b>OK</b>. Danach <b>▼</b> zu <b>Bestätigen</b> ▸ <b>OK</b>.</p>',
  D:'<p><b>TOOLS</b> ▸ <b>▼ ▼ ▼</b> zu <b>MatD</b> ▸ <b>OK</b> ▸ <b>▼ ▼</b> zu <b>Bestätigen</b> ▸ <b>OK</b>. Dann die Zahlen eingeben und mit <b>AC</b> zurück.</p>',
  edit:'<p><b>TOOLS</b> ▸ <b>MatA</b> ist markiert ▸ <b>OK</b>. Weil MatA schon belegt ist, fragt der Rechner: <b>Neu definieren</b> oder <b>Editieren</b>? Mit <b>▼</b> zu <b>Editieren</b> ▸ <b>OK</b>.</p>'
};
const A3K=()=>MOD.MAT('A').concat(MOD.CUBE,['exe']);
const A3TXT='<p>Für <b>A³</b>: MatA, dann <b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ <b>Matrix hoch drei</b>, dann <b>EXE</b>.</p>';
const LBL={on:"ON",home:"HOME",up:"▲",down:"▼",left:"◀",right:"▶",shift:"SHIFT",ok:"OK",back:"↶",format:"FORMAT",var:"VARIABLE",cat:"CATALOG",tools:"TOOLS",
 exe:"EXE",ac:"AC",del:"⌫","-":"−","+":"+","*":"×","/":"÷",x:'<i class="v">x</i>',"(":"(",")":")",sq:'<span class="bx"></span><sup>2</sup>',pow:'x<sup>■</sup>'};
const WHITE=/^$/;
const NEGHINT=(k,want)=>(k==='-'&&want==='shift')?' Für ein Vorzeichen zuerst <b>SHIFT</b>, dann <b>−</b>.':'';

// =====================================================================
//  Tour-Inhalte (beide Modelle): Zeilenstufenform mit Ref und Rref
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const RK=v=>v.flatMap(x=>(x<0?MOD.NEG:[]).concat(String(Math.abs(x)).replace('.',',').split(''),[MOD.EXE]));
const E=MOD.t.exe, EX=MOD.EXE;
const zf=v=>String(v).replace('.',',').replace('-','−');
function MXP(m,name,cls){
  const t=`<table class="mxp ${cls||''}">`+m.map(r=>'<tr>'+r.map((v,j)=>`<td${j===r.length-1&&cls&&cls.includes('erw')?' class="rs"':''}>${typeof v==='string'?v:zf(v)}</td>`).join('')+'</tr>').join('')+'</table>';
  return name?`<span class="mxw"><i>${name}</i> = ${t}</span>`:t;
}
const FR=(p,q)=>(p<0?'−':'')+`<span class="frp"><span>${Math.abs(p)}</span><span>${q}</span></span>`;
const GL=rows=>'<table class="lgs">'+rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+'</table>';
// LGS 1: eindeutig lösbar (x = 1, y = 2, z = 3)
const MA=[[2,1,-1,1],[1,3,2,13],[1,-1,1,2]];
const GLA=GL([['I','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['II','<i>x</i>','+','3<i>y</i>','+','2<i>z</i>','=','13'],['III','<i>x</i>','−','<i>y</i>','+','<i>z</i>','=','2']]);
// LGS 2: unendlich viele Lösungen, nach Änderung 7 → 8 keine Lösung
const MB=[[1,1,1,6],[2,1,-1,1],[3,2,0,7]];
const GLB=GL([['I','<i>x</i>','+','<i>y</i>','+','<i>z</i>','=','6'],['II','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['III','3<i>x</i>','+','2<i>y</i>','','','=','7']]);
const GLB8=GL([['I','<i>x</i>','+','<i>y</i>','+','<i>z</i>','=','6'],['II','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['III','3<i>x</i>','+','2<i>y</i>','','','=','<b style="color:#C62828">8</b>']]);
const PRE={A:MA}, PRE2={A:MA,B:MB};
const kA=MOD.MAT('A'), kB=MOD.MAT('B');
const mA=MOD.t.mat('A'), mB=MOD.t.mat('B');
const AUFA=GLA+MXP(MA,'A','erw');
const REFA=[[1,FR(1,2),FR(-1,2),FR(1,2)],[0,1,1,5],[0,0,1,3]];
const RREFA=[[1,0,0,1],[0,1,0,2],[0,0,1,3]];
const VOR='Die Matrix <b>A</b> aus Teil 1 ist gespeichert. Falls nicht, definieren Sie sie zuerst (3 Zeilen, 4 Spalten).';

// ---------------- Teil 1: LGS als erweiterte Matrix speichern
const T1open = MODEL==='cw' ? [
  {t:"Matrix-App öffnen", k:MOD.OPEN.slice(0,4), z:MOD.OPENZ, d:MOD.t.open},
  {t:"Matrix-App starten", k:['ok'], d:'<p>Mit <b>OK</b> starten Sie die App. Oben im Display steht jetzt <b>Matrix</b>.</p>'},
  {t:"MatA: 3 Zeilen, 4 Spalten", k:MOD.DEF('A',3,4), z:['inp'],
   d:'<p><b>TOOLS</b> ▸ <b>MatA</b> ist markiert ▸ <b>OK</b>. Jetzt die Größe ändern:</p><p><b>Zeilen</b> ist markiert ▸ <b>OK</b> ▸ <b>▼</b> zu <b>3 Zeilen</b> ▸ <b>OK</b>.<br><b>▼</b> zu <b>Spalten</b> ▸ <b>OK</b> ▸ <b>▼ ▼</b> zu <b>4 Spalten</b> ▸ <b>OK</b>.<br><b>▼</b> zu <b>Bestätigen</b> ▸ <b>OK</b>.</p>',
   n:'3 Gleichungen = <b>3 Zeilen</b>. 3 Unbekannte + rechte Seite = <b>4 Spalten</b>.'}
] : [
  {t:"Matrix-Modus öffnen", k:MOD.OPEN, z:MOD.OPENZ,
   d:'<p>Die Stufenform berechnet der Rechner im Modus <b>4: Matrizen</b>. Drücken Sie <b>MENU</b> und dann <b>4</b>.</p><p>Der Rechner zeigt sofort die Liste <b>Matrix definieren</b>.</p>'},
  {t:"MatA wählen", k:['1'], d:'<p>Wir speichern das LGS in <b>MatA</b>: Taste <b>1</b>.</p><p>Der Rechner fragt: <b>Anzahl Zeilen?</b></p>'},
  {t:"Größe festlegen: 3 × 4", k:['3','4'], z:['inp'],
   d:'<p>Drücken Sie <b>3</b> (Zeilen) und dann <b>4</b> (Spalten).</p><p>Sie sehen den <b>Matrix-Editor</b> mit 3 Zeilen und 4 Spalten.</p>',
   n:'3 Gleichungen = <b>3 Zeilen</b>. 3 Unbekannte + rechte Seite = <b>4 Spalten</b>.'}
];
const T1=[
  {t:"Vom LGS zur Matrix", a:GLA, k:[],
   d:`<p>Der Rechner rechnet nicht mit <i>x</i>, <i>y</i> und <i>z</i>, sondern nur mit den <b>Zahlen davor</b>. Jede Gleichung wird eine <b>Zeile</b>:</p>`+MXP(MA,'A','erw')+`<p>Spalte 1: Zahlen vor <i>x</i> · Spalte 2: vor <i>y</i> · Spalte 3: vor <i>z</i> · Spalte 4: <b>rechte Seite</b>.</p><p>Diese Matrix heißt <b>erweiterte Koeffizientenmatrix</b>.</p>`,
   n:'Steht keine Zahl vor der Variablen, ist es eine <b>1</b>. Bei Minus eine <b>−1</b>. Fehlt eine Variable ganz, tragen Sie <b>0</b> ein.'}
].concat(T1open.map(s=>Object.assign({a:AUFA},s))).concat([
  {t:"Zahlen eingeben", a:AUFA, k:RK([2,1,-1,1,1,3,2,13,1,-1,1,2]),
   d:`<p>Tippen Sie <b>zeilenweise</b>: erst Gleichung I (2, 1, −1, 1), dann II, dann III. Jede Zahl mit ${E} bestätigen.</p><p>Vorzeichen mit ${MOD.t.neg}.</p>`},
  {t:"Zurück zur Rechenzeile", a:AUFA, k:['ac'],
   d:`<p>Mit <b>AC</b> verlassen Sie den Editor. Das LGS ist jetzt als <b>MatA</b> gespeichert.</p>`,
   n:`Tippfehler? ${MOD.t.edit}, mit den Pfeilen zum Feld, neue Zahl, ${E}.`},
  {t:"Arbeitsblatt vorbereiten", k:[], ab:1, d:`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: Aufgabe 1</div><ul><li>Erweiterte Matrix zu jedem LGS aufschreiben</li><li>Speichern: ${MOD.t.def}</li><li>3 Gleichungen, 3 Unbekannte → <b>3 Zeilen, 4 Spalten</b></li></ul><p>Dann <b>Weiter</b> mit Teil 2.</p></div>`}
]);

// ---------------- Teil 2: Ref
const T2=[
  {t:"Stufenform: Ref(A)", a:AUFA, k:['ac'].concat(MOD.REF,kA,[')',EX]), z:['res'],
   d:`<p><b>AC</b>, dann ${MOD.t.ref}. Der Rechner schreibt <b>Ref(</b>. Dann ${mA}, Klammer zu <b>)</b> und ${E}.</p>`+MXP(REFA,'Ref(A)','erw')+`<p>Unten links stehen nur noch <b>Nullen</b> – wie eine Treppe. Das ist die <b>Zeilenstufenform</b>. Der Rechner hat das <b>Gauß-Verfahren</b> für Sie gemacht.</p>`,
   n:VOR},
  {t:"Letzte Zeile lesen", a:MXP(REFA,'Ref(A)','erw'), k:[],
   d:`<p>Die letzte Zeile <b>0 0 1 | 3</b> bedeutet:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">0<i>x</i> + 0<i>y</i> + 1<i>z</i> = 3 &nbsp;→&nbsp; <b><i>z</i> = 3</b></p>`},
  {t:"Rückwärts einsetzen", a:MXP(REFA,'Ref(A)','erw'), k:[],
   d:`<p>Zeile 2 bedeutet: <i>y</i> + <i>z</i> = 5. Mit <i>z</i> = 3 folgt <b><i>y</i> = 2</b>.</p><p>Zeile 1 bedeutet: <i>x</i> + ${FR(1,2)}<i>y</i> − ${FR(1,2)}<i>z</i> = ${FR(1,2)}. Einsetzen: <i>x</i> + 1 − 1,5 = 0,5, also <b><i>x</i> = 1</b>.</p>`,
   n:'Die Stufenform ist <b>nicht eindeutig</b>. Der Rechner teilt jede Zeile so, dass vorne eine <b>1</b> steht. Ihre Rechnung von Hand darf andere Zahlen haben – die Lösung ist trotzdem gleich.'},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",[`Stufenform: ${MOD.t.ref}, Matrix, <b>)</b>, ${E}`,`Brüche genau abschreiben – oder mit ${MODEL==='cw'?'<b>FORMAT</b>':'<b>S⇔D</b>'} umschalten`,`Letzte Zeile lesen, dann rückwärts einsetzen`])}
];

// ---------------- Teil 3: Rref
const T3=[
  {t:"Reduzierte Stufenform: Rref(A)", a:AUFA, k:['ac'].concat(MOD.RREF,kA,[')',EX]), z:['res'],
   d:`<p><b>AC</b>, dann ${MOD.t.rref}. Der Rechner schreibt <b>Rref(</b>. Dann ${mA}, <b>)</b> und ${E}.</p>`+MXP(RREFA,'Rref(A)','erw')+`<p>Jetzt stehen auch <b>oberhalb</b> der Einsen Nullen. Links steht die <b>Einheitsmatrix</b>.</p>`,
   n:VOR},
  {t:"Lösung ablesen", a:MXP(RREFA,'Rref(A)','erw'), k:[],
   d:`<p>Jede Zeile ist jetzt fertig gelöst:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">1<i>x</i> = 1 &nbsp;·&nbsp; 1<i>y</i> = 2 &nbsp;·&nbsp; 1<i>z</i> = 3</p><p>Die Lösung steht in der <b>letzten Spalte</b>: <b><i>x</i> = 1, <i>y</i> = 2, <i>z</i> = 3</b>.</p>`,
   n:'<b>Ref</b> = Stufenform (dann rückwärts einsetzen). <b>Rref</b> = reduzierte Stufenform (Lösung direkt ablesen). Die reduzierte Stufenform ist <b>eindeutig</b>.'},
  {t:"Probe", a:GLA, k:[],
   d:`<p>Setzen Sie zur Kontrolle in eine Gleichung ein, z. B. II:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">1 + 3 · 2 + 2 · 3 = 13 ✓</p>`},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 3",[`Reduzierte Stufenform: ${MOD.t.rref}, Matrix, <b>)</b>, ${E}`,`Lösung aus der letzten Spalte ablesen`,`Probe in einer Gleichung`])}
];

// ---------------- Teil 4: Sonderfälle
const RREFB=[[1,0,-2,-5],[0,1,3,11],[0,0,0,0]];
const RREFB8=[[1,0,-2,0],[0,1,3,0],[0,0,0,1]];
const MB8=[[1,1,1,6],[2,1,-1,1],[3,2,0,'<b style="color:#C62828">8</b>']];
const T4=[
  {t:"Zweites LGS als MatB", a:GLB+MXP(MB,'B','erw'), k:MOD.DEF('B',3,4).concat(RK([1,1,1,6,2,1,-1,1,3,2,0,7]),['ac']), z:[],
   d:`<p>Speichern Sie das LGS als <b>MatB</b> (3 Zeilen, 4 Spalten): ${MOD.t.def}.</p><p>Bei Gleichung III fehlt <i>z</i>: dort eine <b>0</b> eintragen. Am Ende <b>AC</b>.</p>`},
  {t:"Rref(B): eine Nullzeile", a:GLB, k:MOD.RREF.concat(kB,[')',EX]), z:['res'],
   d:`<p>${MOD.t.rref}, dann ${mB}, <b>)</b> und ${E}.</p>`+MXP(RREFB,'Rref(B)','erw')+`<p>Die letzte Zeile ist <b>0 0 0 | 0</b>, also 0 = 0. Das ist immer wahr – diese Gleichung sagt nichts mehr aus.</p>`},
  {t:"Unendlich viele Lösungen", a:MXP(RREFB,'Rref(B)','erw'), k:[],
   d:`<p>Es bleiben zwei Gleichungen für drei Unbekannte: <i>z</i> ist <b>frei wählbar</b>.</p><p style="font-family:Cambria,Georgia,serif;font-size:18px"><i>x</i> − 2<i>z</i> = −5 &nbsp;→&nbsp; <i>x</i> = −5 + 2<i>z</i><br><i>y</i> + 3<i>z</i> = 11 &nbsp;→&nbsp; <i>y</i> = 11 − 3<i>z</i></p><p>Das LGS hat <b>unendlich viele Lösungen</b>, z. B. <i>z</i> = 0: (−5 | 11 | 0).</p>`,
   n:'Der Rechner meldet keinen Fehler! Sie müssen die Matrix selbst <b>lesen</b>.'},
  {t:"Rechte Seite ändern: 7 → 8", a:GLB8+MXP(MB8,'B','erw'), k:['ac'].concat(MOD.EDIT('B'),['down','down','right','right','right','8',EX,'ac']),
   d:`<p>Jetzt ändern wir in Gleichung III die rechte Seite von 7 auf <b>8</b>.</p><p>${MOD.t.edit} (MatB). Mit <b>▼ ▼</b> in Zeile 3, mit <b>▶ ▶ ▶</b> in Spalte 4. <b>8</b> und ${E}, dann <b>AC</b>.</p>`},
  {t:"Rref(B): keine Lösung", a:GLB8, k:MOD.RREF.concat(kB,[')',EX]), z:['res'],
   d:`<p>${MOD.t.rref}, ${mB}, <b>)</b>, ${E}.</p>`+MXP(RREFB8,'Rref(B)','erw')+`<p>Die letzte Zeile ist <b>0 0 0 | 1</b>, also <b>0 = 1</b>. Das ist ein <b>Widerspruch</b>.</p><p>Das LGS hat <b>keine Lösung</b>.</p>`},
  {t:"Merkregel", k:[],
   d:`<p>Schauen Sie immer auf die <b>letzte Zeile</b> von Rref:</p><ul style="font-size:15.5px;margin:0 0 10px;padding-left:20px"><li><b>0 0 1 | c</b> → genau eine Lösung</li><li><b>0 0 0 | 0</b> → unendlich viele Lösungen</li><li><b>0 0 0 | 1</b> → keine Lösung</li></ul>`,
   n:'Ein LGS mit 2 Unbekannten speichern Sie als <b>2×3</b>-Matrix. Mehr als 3 Unbekannte gehen nicht: Die Matrix darf höchstens 4 Spalten haben.'},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 4",[`LGS speichern, dann ${MOD.t.rref}`,`Letzte Zeile ansehen: eine, keine oder unendlich viele Lösungen?`,`Ankreuzen, Lösung notieren`,"Danach: Lösungscode eintragen"])}
];
const TRACKS={
  m:{name:"1 · LGS als Matrix speichern", start:()=>fresh(), steps:T1},
  r:{name:"2 · Ref: Stufenform", start:()=>fresh(PRE), steps:T2},
  rr:{name:"3 · Rref: Lösung ablesen", start:()=>fresh(PRE), steps:T3},
  s:{name:"4 · Keine oder unendlich viele Lösungen", start:()=>fresh(PRE), steps:T4}
};



// =====================================================================
//  Steuerung
// =====================================================================
const ORDER=["m","r","rr","s"];
let tr=ORDER[0], st=0, pos=0, lock=false; const done={};
const $=id=>document.getElementById(id);
const lbl=k=>LBL[k]||k;
function chip(k,i){ const s=i<pos?'done':(i===pos?'now':''); const c=k==='shift'?'shift':k==='alpha'?'alpha':(MODEL==='dx'&&(k==='ac'||k==='del'))?'b':WHITE.test(k)?'w':''; return `<span class="chip ${c} ${s}">${lbl(k)}</span>`; }
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
    const want=S.k[pos]; let extra=NEGHINT(k,want);
    if(k==='exe'&&want!=='exe') extra=` Erst die Zahl eintippen, dann mit ${E} bestätigen.`;
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

const KMAP={Enter:'exe',Escape:'ac',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Backspace:'del',Delete:'del','.':',',',':',','+':'+','-':'-','*':'*','/':'/','(':'(',')':')'};
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
