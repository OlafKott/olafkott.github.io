UEB["dx_mat"]={
 title:"Matrizen",
 css:String.raw`:host{ --lf:#1F4E99; --ink:#1d1d1f; --mute:#5b6270; --line:#dde1e7; --bg:#f3f4f6; --ok:#2E7D32; --okbg:#E8F5E9; --no:#C62828; --nobg:#FDECEA; --warn:#8a5a00; --warnbg:#FFF8E8; }
*{ box-sizing:border-box; }
:host{ display:block; color:var(--ink); font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif; line-height:1.5; }
.wrap{ max-width:none; margin:0; padding:0; }
.tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
.tabs button{ font:inherit; font-size:14px; border:1px solid var(--line); background:#fff; border-radius:999px; padding:6px 14px; cursor:pointer; }
.tabs button.on{ background:var(--ink); color:#fff; border-color:var(--ink); }
.card{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; margin-bottom:14px; }
.card h2{ margin:0 0 6px; font-size:18px; }
.auftrag{ font-size:15.5px; margin:0 0 10px; }
.gl{ font-family:Cambria,Georgia,serif; font-size:23px; margin:4px 0 10px; }
.gl i{ font-style:italic; }
.round{ display:inline-block; background:var(--warnbg); border-left:4px solid #F2B705; padding:4px 10px; border-radius:4px; font-size:14.5px; margin:2px 0 12px; }
.round b{ color:var(--warn); }
.spalten{ font-size:14px; color:var(--mute); margin-top:8px; line-height:1.8; }
.taste{ display:inline-block; font:bold 12px Arial,sans-serif; background:#2f2f34; color:#fff; border-radius:7px; padding:1px 7px; }
.taste.w{ background:#f1f1f3; color:#111; border:1px solid #c9cbd1; }
.taste.rd{ background:#bdbdc3; color:#111; }
svg.graph{ display:block; max-width:100%; height:auto; margin:4px 0 2px; }
.grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 22px; }
@media (max-width:620px){ .grid{ grid-template-columns:1fr; } }
.f{ display:grid; grid-template-columns:1fr 120px 26px; align-items:center; gap:8px; padding:6px 8px; border-radius:8px; }
.f label{ font-size:15px; }
.f label .z{ color:var(--mute); font-family:Cambria,Georgia,serif; font-size:14px; }
.f input{ font:inherit; font-size:16px; width:120px; padding:5px 8px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:right; }
.f .m{ font-weight:bold; font-size:18px; text-align:center; }
.f.ok{ background:var(--okbg); }
.f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); }
.f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); }
.f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); }
.f.fmt .msg{ color:var(--warn); }
.f.show .msg{ color:var(--mute); }
.umf{ margin-top:10px; display:none; background:#F1F8F1; border:2px solid var(--ok); border-radius:10px; padding:8px 14px; font-size:14.5px; }
.umf.on{ display:block; }
.umf table{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:18px; margin:4px 0; }
.umf td{ padding:2px 0; }
.umf td.eq{ padding:2px 6px; }
.umf td.r{ padding:2px 14px 2px 0; }
.umf .bar{ display:inline-block; border-left:2px solid #1d1d1f; padding-left:8px; color:var(--lf); font-weight:bold; }
.umf .rot{ color:#C62828; font-weight:bold; }
.btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.btns button{ font:inherit; font-size:15.5px; padding:9px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:#fff; }
.btns button.go{ background:var(--lf); border-color:var(--lf); color:#fff; }
.score{ font-size:16px; font-weight:bold; margin-top:12px; min-height:24px; }
.stats{ font-size:13.5px; color:var(--mute); margin-top:4px; }
.hinweis{ font-size:13.5px; color:var(--mute); }
.mxw{ display:inline-flex; align-items:center; gap:6px; margin:0 22px 6px 0; font-family:Cambria,Georgia,serif; font-size:21px; white-space:nowrap; }
table.mxp{ border-collapse:separate; border-spacing:0; border-left:2px solid #1d1d1f; border-right:2px solid #1d1d1f; border-radius:8px; font-family:Cambria,Georgia,serif; font-size:19px; }
table.mxp td{ padding:2px 11px; text-align:right; }
.frc{ display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; font-size:14px; line-height:1.1; }
.frc > span:first-child{ border-bottom:1.2px solid currentColor; }
.eing{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.eing .lbl{ font-size:15px; }
table.mxi{ border-collapse:separate; border-spacing:4px; border-left:2px solid #1d1d1f; border-right:2px solid #1d1d1f; border-radius:10px; padding:2px 4px; }
.zel{ font:inherit; font-size:16px; width:84px; padding:6px 8px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:right; }
.zel.ok{ background:var(--okbg); border-color:var(--ok); }
.zel.no{ background:var(--nobg); border-color:var(--no); }
.zel.fast{ background:var(--warnbg); border-color:#F2B705; }
.zel:disabled{ opacity:.4; }
.ein1{ font-family:Cambria,Georgia,serif; font-size:19px; display:flex; align-items:center; gap:10px; }
.nm{ font-size:15px; display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:8px; border:1px solid var(--line); cursor:pointer; }
.nm.ok{ background:var(--okbg); border-color:var(--ok); }
.nm.no{ background:var(--nobg); border-color:var(--no); }
.msgs{ font-size:14px; font-weight:normal; color:var(--no); margin-top:4px; }
.taste.b{ background:#2463c9; }
#felder{ display:block; }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div id="daten"></div>
    <div class="spalten" id="spalten"></div>
  </div>
  <div class="card">
    <div class="round"><b>Wichtig:</b> Ganze Zahlen ohne Komma. Brüche als Bruch (z.&nbsp;B. <b>2/7</b>) oder auf <b>2 Nachkommastellen</b> gerundet. Geht die Rechnung nicht, setzen Sie das Häkchen.</div>
    <div id="felder"></div>
    <div class="umf" id="umf"></div>
    <div class="btns">
      <button class="go" id="pruefen">Prüfen</button>
      <button id="zeigen">Lösung anzeigen</button>
      <button id="neu">Neue Aufgabe ▶</button>
    </div>
    <div class="score" id="score"></div>
    <div class="stats" id="stats"></div>
  </div>
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Speichern Sie die Matrizen zuerst im Rechner (MatA, MatB, MatC) und rechnen Sie dann.</p>
</div>`,
 init:function(root){

const MODEL='dx';
// ===================== Übung Matrizen (MODEL wird vorher gesetzt)
const Rn=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
// exakte Brüche
const Q=(p,q=1)=>{ if(q<0){p=-p;q=-q;} const g=gcd(p,q); return {p:p/g,q:q/g}; };
const qa=(a,b)=>Q(a.p*b.q+b.p*a.q,a.q*b.q), qm=(a,b)=>Q(a.p*b.p,a.q*b.q), qd=(a,b)=>Q(a.p*b.q,a.q*b.p), qn=a=>Q(-a.p,a.q);
const qv=a=>a.p/a.q;
const toQ=m=>m.map(r=>r.map(v=>typeof v==='number'?(Number.isInteger(v)?Q(v):Q(Math.round(v*100),100)):v));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,v,k)=>qa(s,qm(v,b[k][j])),Q(0))));
const add=(a,b,s)=>a.map((r,i)=>r.map((v,j)=>qa(v,s<0?qn(b[i][j]):b[i][j])));
const scal=(k,a)=>a.map(r=>r.map(v=>qm(Q(k),v)));
const trn=a=>a[0].map((_,j)=>a.map(r=>r[j]));
function det(a){ const n=a.length; if(n===1) return a[0][0]; let s=Q(0);
  for(let j=0;j<n;j++){ const sub=a.slice(1).map(r=>r.filter((_,k)=>k!==j)); const t=qm(a[0][j],det(sub)); s=j%2?qa(s,qn(t)):qa(s,t); } return s; }
function inv2(a){ const d=det(a); return [[qd(a[1][1],d),qd(qn(a[0][1]),d)],[qd(qn(a[1][0]),d),qd(a[0][0],d)]]; }
const mpow=(a,n)=>{ let r=a; for(let i=1;i<n;i++) r=mul(r,a); return r; };
// Anzeige
const zt=v=>{ if(v.q===1) return String(v.p).replace('-','−'); let qq=v.q; while(qq%2===0) qq/=2; while(qq%5===0) qq/=5; const d=qq===1;
  return d? String(+(qv(v).toFixed(6))).replace('.',',').replace('-','−') : (v.p<0?'−':'')+`<span class="frc"><span>${Math.abs(v.p)}</span><span>${v.q}</span></span>`; };
const zl=v=>{ if(v.q===1) return String(v.p).replace('-','−'); const s=String(+(qv(v).toFixed(4))).replace('.',',').replace('-','−'); return `${(v.p<0?'−':'')+Math.abs(v.p)}/${v.q} ≈ ${s}`; };
const MXv=(m,name)=>`<span class="mxw">${name?`<i>${name}</i> = `:''}<table class="mxp">`+m.map(r=>'<tr>'+r.map(v=>`<td>${zt(v)}</td>`).join('')+'</tr>').join('')+'</table></span>';
const T=(s,c='')=>`<span class="taste ${c}">${s}</span>`;
const HK = MODEL==='cw' ? {
  open:`${T('HOME')} ▸ Matrix ▸ ${T('OK')}`, def:`${T('TOOLS')} ▸ MatA ▸ ${T('OK')} ▸ Größe ▸ Bestätigen ▸ Zahlen mit ${T('EXE')} ▸ ${T('AC')}`,
  ins:`${T('CATALOG')} ▸ Matrix ▸ MatA`, det:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Determinante`, trn:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Transponierte`,
  inv:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Inverse Matrix`, sq:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Matrix quadrieren`, pot:`A²: MatA ▸ ${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Matrix quadrieren ▸ ${T('EXE')}; A³ ebenso mit „Matrix hoch drei“; höher: im Ergebnisfenster ${T('×')} MatA ${T('EXE')}`, neg:`${T('SHIFT','sh')} ${T('−')}`, exe:T('EXE')
} : {
  open:`${T('MENU','rd')} ${T('4','w')}`, def:`${T('OPTN')} ${T('1','w')} ▸ Matrix ▸ Zeilen ▸ Spalten ▸ Zahlen mit ${T('=','w')} ▸ ${T('AC','b')}`,
  ins:`${T('OPTN')} ${T('3','w')} (MatA) … ${T('6','w')} (MatD)`, det:`${T('OPTN')} ${T('▼')} ${T('2','w')}`, trn:`${T('OPTN')} ${T('▼')} ${T('3','w')}`,
  inv:T('<i>x</i><sup>−1</sup>'), sq:T('<i>x</i><sup>2</sup>'), pot:`A²: ${T('<i>x</i><sup>2</sup>')}, A³: ${T('SHIFT')} ${T('<i>x</i><sup>2</sup>')}, höher: im Ergebnisfenster ${T('×')} MatA ${T('=','w')}`, neg:T('(−)'), exe:T('=','w')
};
const KEYS=`Matrix speichern: ${HK.def}<br>In die Rechnung holen: ${HK.ins} &nbsp;·&nbsp; Vorzeichen: ${HK.neg}`;
const rm=(r,c,lo,hi)=>Array.from({length:r},()=>Array.from({length:c},()=>Rn(lo,hi)));
// ---------------- Aufgaben
function genR(){
  const art=pick(['add','sub','mul','mul','scal','mulrect','unm']);
  const A=toQ(rm(2,2,-5,6)), B=toQ(rm(2,2,-5,6)); let soll, h, aufg, daten, nm=false;
  if(art==='add'){ soll=add(A,B,1); aufg='Berechnen Sie <b>A + B</b>.'; daten=MXv(A,'A')+MXv(B,'B'); }
  else if(art==='sub'){ soll=add(A,B,-1); aufg='Berechnen Sie <b>A − B</b>.'; daten=MXv(A,'A')+MXv(B,'B'); }
  else if(art==='mul'){ soll=mul(A,B); aufg='Berechnen Sie <b>A · B</b>.'; daten=MXv(A,'A')+MXv(B,'B'); }
  else if(art==='scal'){ const k=pick([-3,-2,2,3,4,5]); soll=scal(k,A); aufg=`Berechnen Sie <b>${String(k).replace('-','−')} · A</b>.`; daten=MXv(A,'A'); h=`Zahl, dann ${T('×')}, dann MatA.`; }
  else if(art==='mulrect'){ const C=toQ(rm(2,3,-4,5)); soll=mul(A,C); aufg='Berechnen Sie <b>A · C</b>.'; daten=MXv(A,'A')+MXv(C,'C'); h='(2×2) · (2×3) ergibt eine 2×3-Matrix.'; }
  else { const C=toQ(rm(2,3,-4,5)); soll=null; nm=true; aufg='Berechnen Sie <b>C · A</b>, falls möglich.'; daten=MXv(A,'A')+MXv(C,'C'); h='(2×3) · (2×2): Spalten von C ≠ Zeilen von A.'; }
  return {aufg, daten, soll, nm:true, nmSoll:nm, h:h||'', erkl:soll?MXv(soll,'Ergebnis'):'Nicht möglich: Der Rechner meldet einen '+(MODEL==='cw'?'Dimensionsfehler':'Dimension ERROR')+'.'};
}
function genP(){
  if(Math.random()<0.65){
    const A=toQ(rm(2,2,-3,3)), n=Rn(2,5); const soll=mpow(A,n);
    return {aufg:`Berechnen Sie <b>A<sup>${n}</sup></b>.`, daten:MXv(A,'A'), soll, h:`${HK.pot}`, erkl:MXv(soll,`A<sup>${n}</sup>`)};
  }
  const a=pick([0.6,0.7,0.8,0.9]), b=pick([0.1,0.2,0.3,0.4]);
  const M=toQ([[a,b],[+(1-a).toFixed(1),+(1-b).toFixed(1)]]), n=Rn(2,4), soll=mpow(M,n);
  return {aufg:`Übergangsmatrix <i>M</i>: Berechnen Sie <b>M<sup>${n}</sup></b>. Runden Sie auf <b>2 Nachkommastellen</b>.`, daten:MXv(M,'M'), soll, h:HK.pot, erkl:MXv(soll,`M<sup>${n}</sup>`)};
}
function genT(){
  const r=Rn(2,3); let c=pick([2,3]); if(r===c&&Math.random()<0.6) c=r===2?3:2; const A=toQ(rm(r,c,-5,9));
  if(Math.random()<0.5) return {aufg:'Geben Sie die transponierte Matrix <b>A<sup>T</sup></b> an.', daten:MXv(A,'A'), soll:trn(A), h:`${HK.trn} ▸ MatA ▸ ${T(')')} ${HK.exe}`, erkl:MXv(trn(A),'A<sup>T</sup>')};
  const s=mul(A,trn(A));
  return {aufg:'Berechnen Sie <b>A · A<sup>T</sup></b>.', daten:MXv(A,'A'), soll:s, h:`MatA ${T('×')} ${HK.trn} ▸ MatA ▸ ${T(')')} ${HK.exe}`, erkl:MXv(s,'A · A<sup>T</sup>')};
}
function genI(){
  const art=pick(['det2','det3','inv','inv','sing']);
  if(art==='det2'||art==='det3'){ const n=art==='det2'?2:3; const A=toQ(rm(n,n,-4,6)); const d=det(A);
    return {aufg:'Berechnen Sie die Determinante <b>det(A)</b>.', daten:MXv(A,'A'), soll:[[d]], skalar:'det(<i>A</i>) =', h:`${HK.det} ▸ MatA ▸ ${T(')')} ${HK.exe}`, erkl:`det(<i>A</i>) = ${zt(d)}`}; }
  let A; do{ A=toQ(rm(2,2,-5,6)); }while(det(A).p===0||Math.abs(det(A).p)>12);
  if(art==='sing'){ const k=pick([2,-2,3,-1]), x=Rn(-3,4)||1, y=Rn(-3,4)||2; A=toQ([[x,y],[k*x,k*y]]); }
  const d=det(A);
  if(d.p===0) return {aufg:'Berechnen Sie die inverse Matrix <b>A<sup>−1</sup></b>, falls sie existiert.', daten:MXv(A,'A'), soll:null, nm:true, nmSoll:true, nmTxt:'existiert nicht', h:'Prüfen Sie zuerst det(A).', erkl:'det(<i>A</i>) = 0 → keine Inverse. Der Rechner meldet '+(MODEL==='cw'?'„Mathematischer Fehler“':'„Math ERROR“')+'.'};
  const s=inv2(A);
  return {aufg:'Berechnen Sie die inverse Matrix <b>A<sup>−1</sup></b>, falls sie existiert. Brüche als Bruch (z. B. 2/7) oder auf 2 Nachkommastellen.', daten:MXv(A,'A'), soll:s, nm:true, nmSoll:false, nmTxt:'existiert nicht', h:`MatA ${HK.inv} ${HK.exe}`, erkl:`det(<i>A</i>) = ${zt(d)}<br>`+MXv(s,'A<sup>−1</sup>')};
}
const MODES={r:{name:"Rechnen",gen:genR}, p:{name:"Potenzen",gen:genP}, t:{name:"Transponieren",gen:genT}, i:{name:"Determinante und Inverse",gen:genI}};
const ORDER=["r","p","t","i"];
let mode=ORDER[0], AU=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function felder(){
  const s=AU.soll, nmBox=AU.nm?`<label class="nm"><input type="checkbox" id="nm"> ${AU.nmTxt||'nicht möglich'}</label>`:'';
  if(AU.skalar) return `<div class="ein1"><span>${AU.skalar}</span><input class="zel" id="z_0_0" inputmode="decimal" autocomplete="off"></div>`;
  const r=s?s.length:2, c=s?s[0].length:2;
  let h=`<div class="eing"><span class="lbl">Ergebnis:</span><table class="mxi">`;
  for(let i=0;i<r;i++){ h+='<tr>'; for(let j=0;j<c;j++) h+=`<td><input class="zel" id="z_${i}_${j}" inputmode="decimal" autocomplete="off"></td>`; h+='</tr>'; }
  h+=`</table>${nmBox}</div>`;
  if(!s) h+='<p class="hinweis" style="margin:6px 0 0">Gehen Sie davon aus: Das Ergebnis hätte diese Größe.</p>';
  return h;
}
function neu(){
  AU=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent='Aufgabe: '+MODES[mode].name;
  $('auftrag').innerHTML=AU.aufg; $('daten').innerHTML=AU.daten;
  $('spalten').innerHTML=KEYS+(AU.h?'<br>'+AU.h:'');
  $('felder').innerHTML=felder();
  $('umf').className='umf'; $('umf').innerHTML=''; $('score').textContent='';
  root.querySelectorAll('.zel').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
  const nm=$('nm'); if(nm) nm.onchange=()=>root.querySelectorAll('.zel').forEach(i=>{ i.disabled=nm.checked; if(nm.checked) i.value=''; });
}
function parse(s){
  s=s.trim().replace(/\s/g,'').replace(/−/g,'-').replace(',','.');
  let m=s.match(/^(-?\d+)\/(-?\d+)$/); if(m){ const q=+m[2]; if(q===0) return null; return {v:+m[1]/q, frac:true, p:+m[1], q}; }
  if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length};
}
function ok1(p,soll){ // true / 'fast' / false
  if(p.frac){ const a=Q(p.p,p.q); return a.p===soll.p&&a.q===soll.q; }
  const v=qv(soll); if(soll.q===1) return Math.abs(p.v-v)<1e-9;
  const r2=Math.round(v*100+(v<0?-1e-9:1e-9))/100;
  if(Math.abs(p.v-v)<1e-9) return true;
  if(Math.abs(p.v-r2)<1e-9&&p.dec<=2) return true;
  if(Math.abs(p.v-v)<0.02) return 'fast';
  return false;
}
function pruefen(){
  const nm=$('nm'), nmAn=nm&&nm.checked;
  let ok=0, tot=0, msgs=[];
  root.querySelectorAll('.zel').forEach(i=>i.classList.remove('ok','no','fast'));
  if(AU.nm){ if(nm) nm.parentElement.classList.remove('ok','no'); }
  if(AU.nmSoll||nmAn){
    tot=1;
    if(AU.nmSoll&&nmAn){ ok=1; nm.parentElement.classList.add('ok'); }
    else { nm.parentElement.classList.add('no'); msgs.push(AU.nmSoll?'Diese Rechnung geht nicht – setzen Sie das Häkchen.':'Diese Rechnung ist möglich. Rechnen Sie sie mit dem Taschenrechner.'); }
  } else {
    const s=AU.soll; let fast=false, leer=false, vz=false;
    s.forEach((r,i)=>r.forEach((v,j)=>{ tot++; const el=$(`z_${i}_${j}`), raw=el.value; if(!raw.trim()){ leer=true; el.classList.add('no'); return; }
      const p=parse(raw); if(!p){ el.classList.add('no'); msgs.push('Bitte nur Zahlen eintragen, z. B. 3, −1,25 oder 2/7.'); return; }
      const r_=ok1(p,v); if(r_===true){ ok++; el.classList.add('ok'); } else if(r_==='fast'){ fast=true; el.classList.add('fast'); }
      else { el.classList.add('no'); if(Math.abs(p.v+qv(v))<1e-6&&qv(v)!==0) vz=true; } }));
    if(leer) msgs.push('Füllen Sie alle Felder aus.');
    if(fast) msgs.push('Gelb: fast – bitte genau auf 2 Nachkommastellen runden.');
    if(vz) msgs.push('Vorzeichen prüfen: Vorzeichen mit '+(MODEL==='cw'?'SHIFT −':'(−)')+'.');
    if(ok<tot&&!leer&&!fast&&!vz) msgs.push('Prüfen Sie die Eingabe der Matrizen Feld für Feld.');
  }
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML= ok===tot ? `<span style="color:var(--ok)">Alles richtig! Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} Feldern richtig.`+(msgs.length?`<div class="msgs">${[...new Set(msgs)].join('<br>')}</div>`:'');
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){ $('umf').innerHTML='<b>Lösung:</b><br>'+AU.erkl; $('umf').className='umf on'; }
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();


 }
};
