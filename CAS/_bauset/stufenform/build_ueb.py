#!/usr/bin/env python3
# Übung "Zeilenstufenform (Ref/Rref)" für CW und X
import re, sys
SRC = '/home/claude/olafkott.github.io/CAS/fx991/'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/'

EXTRA_CSS = '''
table.mxp td.rs{ border-left:1.6px solid #1d1d1f; }
table.mxi td.rs{ border-left:2px solid #1d1d1f; padding-left:6px; }
table.lgs{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:21px; margin:2px 22px 8px 0; display:inline-table; vertical-align:middle; }
table.lgs td{ padding:1px 4px; text-align:right; white-space:nowrap; }
.daten{ display:flex; flex-wrap:wrap; align-items:center; }
.vec{ display:flex; gap:18px; flex-wrap:wrap; align-items:center; }
.vec .ein1 .zel{ width:96px; }
.arten{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
.arten label{ font-size:15.5px; display:inline-flex; align-items:center; gap:7px; padding:7px 12px; border-radius:8px; border:1px solid var(--line); cursor:pointer; background:#fff; }
.arten label.ok{ background:var(--okbg); border-color:var(--ok); } .arten label.no{ background:var(--nobg); border-color:var(--no); }
.zel.k{ width:64px; }
'''

SCRIPT = r'''
// ===================== Übung Zeilenstufenform (Ref / Rref)
const Rn=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const Q=(p,q=1)=>{ if(q<0){p=-p;q=-q;} const g=gcd(p,q); return {p:p/g,q:q/g}; };
const qa=(a,b)=>Q(a.p*b.q+b.p*a.q,a.q*b.q), qm=(a,b)=>Q(a.p*b.p,a.q*b.q), qd=(a,b)=>Q(a.p*b.q,a.q*b.p), qn=a=>Q(-a.p,a.q);
const qs=(a,b)=>qa(a,qn(b)), qv=a=>a.p/a.q;
const toQ=m=>m.map(r=>r.map(v=>Q(v)));
// Stufenform wie der Rechner (betragsgrößtes Pivot, führende 1); strat 'first' nur zur Kontrolle
function ref(a,strat){
  const A=a.map(r=>r.slice()), m=A.length, n=A[0].length; let r=0, tie=false;
  for(let c=0;c<n&&r<m;c++){
    let p=-1, best=0;
    for(let i=r;i<m;i++){ const v=Math.abs(qv(A[i][c])); if(v>1e-12){ if(strat==='first'){ if(p<0){ p=i; } } else if(v>best+1e-12){ best=v; p=i; } else if(Math.abs(v-best)<1e-12) tie=true; } }
    if(p<0) continue;
    [A[r],A[p]]=[A[p],A[r]]; const pv=A[r][c];
    for(let j=0;j<n;j++) A[r][j]=qd(A[r][j],pv);
    for(let i=r+1;i<m;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=qs(A[i][j],qm(f,A[r][j])); }
    r++;
  }
  A.tie=tie; return A;
}
function rref(a){
  const A=ref(a), m=A.length, n=A[0].length;
  for(let r=m-1;r>=0;r--){ const c=A[r].findIndex(v=>v.p!==0); if(c<0) continue;
    for(let i=0;i<r;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=qs(A[i][j],qm(f,A[r][j])); } }
  return A;
}
const same=(A,B)=>A.every((r,i)=>r.every((v,j)=>v.p===B[i][j].p&&v.q===B[i][j].q));
// Anzeige
const zt=v=>{ if(v.q===1) return String(v.p).replace('-','−'); return (v.p<0?'−':'')+`<span class="frc"><span>${Math.abs(v.p)}</span><span>${v.q}</span></span>`; };
const MXv=(m,name)=>`<span class="mxw">${name?`<i>${name}</i> = `:''}<table class="mxp">`+m.map(r=>'<tr>'+r.map((v,j)=>`<td${j===r.length-1?' class="rs"':''}>${zt(v)}</td>`).join('')+'</tr>').join('')+'</table></span>';
const VN=['<i>x</i>','<i>y</i>','<i>z</i>'];
function LGS(M){
  return '<table class="lgs">'+M.map(r=>{ let first=true, cells='';
    r.slice(0,-1).forEach((c,i)=>{ const v=qv(c); if(v===0){ cells+='<td></td><td></td>'; return; }
      const sg=first?(v<0?'−':''):(v<0?'−':'+'); const a=Math.abs(v); cells+=`<td>${sg}</td><td>${a===1?'':String(a)}${VN[i]}</td>`; first=false; });
    return `<tr>${cells}<td>=</td><td>${zt(r[r.length-1])}</td></tr>`; }).join('')+'</table>';
}
const T=(s,c='')=>`<span class="taste ${c}">${s}</span>`;
const HK = MODEL==='cw' ? {
  def:`${T('TOOLS')} ▸ MatA ▸ ${T('OK')} ▸ Größe ▸ Bestätigen ▸ Zahlen mit ${T('EXE')} ▸ ${T('AC')}`,
  ref:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Stufenform REF`, rref:`${T('CATALOG')} ▸ Matrix ▸ Matrizenrechnung ▸ Stufenform RREF`,
  mat:`${T('CATALOG')} ▸ Matrix ▸ MatA`, neg:`${T('SHIFT','sh')} ${T('−')}`, exe:T('EXE')
} : {
  def:`${T('OPTN')} ${T('1','w')} ▸ Matrix ▸ Zeilen ▸ Spalten ▸ Zahlen mit ${T('=','w')} ▸ ${T('AC','b')}`,
  ref:`${T('OPTN')} ${T('▼')} ${T('▼')} ${T('1','w')}`, rref:`${T('OPTN')} ${T('▼')} ${T('▼')} ${T('2','w')}`,
  mat:`${T('OPTN')} ${T('3','w')} (MatA)`, neg:T('(−)'), exe:T('=','w')
};
const KEYS=`Matrix speichern: ${HK.def} &nbsp;·&nbsp; Vorzeichen: ${HK.neg}`;
// ---------------- Zufalls-LGS
function zuf(n){ // n Unbekannte, ganzzahlige Lösung, eindeutig lösbar
  for(;;){
    const sol=Array.from({length:n},()=>{ let v; do{ v=Rn(-4,5); }while(v===0&&Math.random()<0.7); return v; });
    const M=Array.from({length:n},()=>Array.from({length:n},()=>Rn(-4,5)));
    if(M[0][0]===0) continue;
    const A=toQ(M.map(r=>r.concat([r.reduce((s,v,i)=>s+v*sol[i],0)])));
    const R=rref(A); if(!R.every((r,i)=>r[i].p===1&&r[i].q===1)) continue;
    if(A.some(r=>Math.abs(qv(r[n]))>40)) continue;
    return {A,sol:sol.map(v=>Q(v)),R};
  }
}
function genM(){
  const n=Math.random()<0.25?2:3, {A}=zuf(n);
  if(n===3&&Math.random()<0.5){ const i=Rn(0,2), j=Rn(0,2); A[i][j]=Q(0); }
  return {aufg:'Schreiben Sie die <b>erweiterte Koeffizientenmatrix</b> zu diesem LGS auf. (Kein Rechner nötig.)', daten:LGS(A), typ:'mat', soll:A,
    h:'Jede Gleichung = eine Zeile. Spalten: Zahlen vor '+VN.slice(0,n).join(', ')+', dann die rechte Seite. Fehlt eine Variable: 0.', erkl:MXv(A,'')};
}
function genR(){
  for(;;){
    const {A}=zuf(3), R=ref(A);
    if(R.tie||!same(R,ref(A,'first'))) continue;
    const flat=R.flat(); if(flat.some(v=>v.q>6||Math.abs(v.p)>30)) continue;
    if(flat.filter(v=>v.q>1).length>4) continue;
    return {aufg:'Speichern Sie das LGS als MatA und bestimmen Sie die <b>Zeilenstufenform Ref(A)</b>. Brüche als Bruch (z. B. 2/3) oder auf 2 Nachkommastellen.', daten:LGS(A), typ:'mat', soll:R,
      h:`${HK.ref} ▸ ${HK.mat} ▸ ${T(')')} ${HK.exe}`, erkl:MXv(R,'Ref(A)')};
  }
}
function genL(){
  const n=Math.random()<0.3?2:3, {A,sol,R}=zuf(n);
  return {aufg:'Lösen Sie das LGS mit <b>Rref</b>. Geben Sie die Lösung ein.', daten:LGS(A), typ:'vec', soll:[sol], n,
    h:`${HK.rref} ▸ ${HK.mat} ▸ ${T(')')} ${HK.exe} · Lösung = letzte Spalte`+(n===2?' · 2 Unbekannte → 2×3-Matrix':''), erkl:MXv(R,'Rref(A)')+'<br>Lösung: '+sol.map((v,i)=>VN[i]+' = '+zt(v)).join(', ')};
}
function genS(){
  const art=pick(['eine','keine','unendlich']);
  let A, sol=null;
  if(art==='eine'){ const z=zuf(3); A=z.A; sol=z.sol; }
  else for(;;){
    const {A:B}=zuf(3), k=pick([1,-1,2,-2]), j=pick([1,2,-1]);
    A=B.map(r=>r.slice());
    A[2]=B[0].map((v,c)=>qa(qm(Q(j),v),qm(Q(k),B[1][c])));
    if(art==='keine') A[2][3]=qa(A[2][3],Q(pick([1,-1,2,3])));
    if(A[2].slice(0,3).every(v=>v.p===0)) continue;
    if(A[2].some(v=>Math.abs(qv(v))>30)) continue;
    // Zeilen mischen, damit die besondere Zeile nicht immer unten steht
    if(Math.random()<0.5){ const t=A[2]; A[2]=A[1]; A[1]=t; }
    break;
  }
  const R=rref(A), L=R[2], kl=L[2].p!==0?'eine':(L[3].p!==0?'keine':'unendlich');
  if(kl!==art) return genS();
  return {aufg:'Bestimmen Sie <b>Rref</b>. Wie viele Lösungen hat das LGS?'+(art==='eine'?'':''), daten:LGS(A), typ:'art', art, soll:sol?[sol]:null, n:3,
    h:`${HK.rref} ▸ ${HK.mat} ▸ ${T(')')} ${HK.exe} · Schauen Sie auf die letzte Zeile.`,
    erkl:MXv(R,'Rref(A)')+'<br>'+(art==='eine'?'Genau eine Lösung: '+sol.map((v,i)=>VN[i]+' = '+zt(v)).join(', '):art==='keine'?'Letzte Zeile 0 0 0 | c mit c ≠ 0: Widerspruch → <b>keine Lösung</b>.':'Letzte Zeile 0 0 0 | 0: immer wahr → <b>unendlich viele Lösungen</b>.')};
}
const MODES={m:{name:"LGS als Matrix",gen:genM}, r:{name:"Ref: Stufenform",gen:genR}, l:{name:"Rref: Lösung",gen:genL}};
const ORDER=["m","r","l"];
let mode=ORDER[0], AU=null, stat={a:0,r:0};
const $=id=>document.getElementById(id);
const inp=(id,c='')=>`<input class="zel ${c}" id="${id}" inputmode="decimal" autocomplete="off">`;
function vecHTML(n){ return '<div class="vec">'+Array.from({length:n},(_,i)=>`<div class="ein1"><span>${VN[i]} =</span>${inp('z_0_'+i)}</div>`).join('')+'</div>'; }
function felder(){
  if(AU.typ==='mat'){ const s=AU.soll; let h='<div class="eing"><span class="lbl">Ergebnis:</span><table class="mxi">';
    s.forEach((r,i)=>{ h+='<tr>'+r.map((_,j)=>`<td${j===r.length-1?' class="rs"':''}>${inp(`z_${i}_${j}`,'k')}</td>`).join('')+'</tr>'; });
    return h+'</table></div>'; }
  if(AU.typ==='vec') return vecHTML(AU.n);
  return '<div class="arten">'+[['eine','genau eine Lösung'],['keine','keine Lösung'],['unendlich','unendlich viele Lösungen']].map(([k,t])=>`<label><input type="radio" name="art" value="${k}"> ${t}</label>`).join('')+'</div>'
    +`<div id="vecbox" style="display:none"><p class="hinweis" style="margin:0 0 6px">Genau eine Lösung? Dann tragen Sie sie ein:</p>${vecHTML(3)}</div>`;
}
function neu(){
  AU=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent='Aufgabe: '+MODES[mode].name;
  $('auftrag').innerHTML=AU.aufg; $('daten').innerHTML='<div class="daten">'+AU.daten+'</div>';
  $('spalten').innerHTML=KEYS+(AU.h?'<br>'+AU.h:'');
  $('felder').innerHTML=felder();
  $('umf').className='umf'; $('umf').innerHTML=''; $('score').textContent='';
  document.querySelectorAll('.zel').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
  document.querySelectorAll('input[name=art]').forEach(r=>r.onchange=()=>{ $('vecbox').style.display=document.querySelector('input[name=art]:checked').value==='eine'?'block':'none'; });
}
function parse(s){
  s=s.trim().replace(/\s/g,'').replace(/−/g,'-').replace(',','.');
  let m=s.match(/^(-?\d+)\/(-?\d+)$/); if(m){ const q=+m[2]; if(q===0) return null; return {v:+m[1]/q, frac:true, p:+m[1], q}; }
  if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length};
}
function ok1(p,soll){
  if(p.frac){ const a=Q(p.p,p.q); return a.p===soll.p&&a.q===soll.q; }
  const v=qv(soll); if(soll.q===1) return Math.abs(p.v-v)<1e-9;
  const r2=Math.round(v*100+(v<0?-1e-9:1e-9))/100;
  if(Math.abs(p.v-v)<1e-9) return true;
  if(Math.abs(p.v-r2)<1e-9&&p.dec<=2) return true;
  if(Math.abs(p.v-v)<0.02) return 'fast';
  return false;
}
function pruefZellen(s,msgs){
  let ok=0, tot=0, fast=false, leer=false, vz=false;
  s.forEach((r,i)=>r.forEach((v,j)=>{ tot++; const el=$(`z_${i}_${j}`), raw=el.value; el.classList.remove('ok','no','fast');
    if(!raw.trim()){ leer=true; el.classList.add('no'); return; }
    const p=parse(raw); if(!p){ el.classList.add('no'); msgs.push('Bitte nur Zahlen eintragen, z. B. 3, −1,25 oder 2/3.'); return; }
    const r_=ok1(p,v); if(r_===true){ ok++; el.classList.add('ok'); } else if(r_==='fast'){ fast=true; el.classList.add('fast'); }
    else { el.classList.add('no'); if(Math.abs(p.v+qv(v))<1e-6&&qv(v)!==0) vz=true; } }));
  if(leer) msgs.push('Füllen Sie alle Felder aus.');
  if(fast) msgs.push('Gelb: fast – bitte genau auf 2 Nachkommastellen runden oder als Bruch eingeben.');
  if(vz) msgs.push('Vorzeichen prüfen: Vorzeichen mit '+(MODEL==='cw'?'SHIFT −':'(−)')+'.');
  return [ok,tot,leer||fast||vz];
}
function pruefen(){
  let ok=0, tot=0; const msgs=[];
  if(AU.typ==='art'){
    const sel=document.querySelector('input[name=art]:checked');
    document.querySelectorAll('.arten label').forEach(l=>l.classList.remove('ok','no'));
    tot=1;
    if(!sel) msgs.push('Wählen Sie eine Antwort.');
    else if(sel.value===AU.art){ ok=1; sel.parentElement.classList.add('ok'); }
    else { sel.parentElement.classList.add('no'); msgs.push('Schauen Sie auf die letzte Zeile von Rref: 0 0 1 | c, 0 0 0 | 0 oder 0 0 0 | c ≠ 0?'); }
    if(AU.art==='eine'&&sel&&sel.value==='eine'){ const [o,t]=pruefZellen(AU.soll,msgs); ok+=o; tot+=t; }
  } else {
    const [o,t,spez]=pruefZellen(AU.soll,msgs); ok=o; tot=t;
    if(ok<tot&&!spez) msgs.push(AU.typ==='mat'?'Prüfen Sie Zeile für Zeile: Zahlen vor x, y, z und rechte Seite.':'Prüfen Sie die Eingabe der Matrix Feld für Feld.');
  }
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML= ok===tot ? `<span style="color:var(--ok)">Alles richtig! Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`+(msgs.length?`<div class="msgs">${[...new Set(msgs)].join('<br>')}</div>`:'');
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){ $('umf').innerHTML='<b>Lösung:</b><br>'+AU.erkl; $('umf').className='umf on'; }
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
const hh=(location.hash||'').slice(1); if(MODES[hh]) mode=hh;
neu();
'''

def build(model):
    pre = 'fx991_' if model == 'cw' else 'fx991DEX_'
    t = open(SRC + pre + 'Uebung_Matrizen.html', encoding='utf-8').read()
    head = t[:t.index('</style>')] + EXTRA_CSS + t[t.index('</style>'):t.index('<script>')]
    head = head.replace('<title>Übung Matrizen</title>', '<title>Übung Zeilenstufenform</title>')
    head = re.sub(r'<h1>Übung: Matrizen<small>', '<h1>Übung: Gauß auf Knopfdruck – Ref und Rref<small>', head)
    head = head.replace('<b>Wichtig:</b> Ganze Zahlen ohne Komma. Brüche als Bruch (z.&nbsp;B. <b>2/7</b>) oder auf <b>2 Nachkommastellen</b> gerundet. Geht die Rechnung nicht, setzen Sie das Häkchen.',
                        '<b>Wichtig:</b> Ganze Zahlen ohne Komma. Brüche als Bruch (z.&nbsp;B. <b>2/3</b>) oder auf <b>2 Nachkommastellen</b> gerundet.')
    head = head.replace('Speichern Sie die Matrizen zuerst im Rechner (MatA, MatB, MatC) und rechnen Sie dann.',
                        'Speichern Sie das LGS zuerst als erweiterte Matrix im Rechner (3 Gleichungen → 3 Zeilen, 4 Spalten).')
    assert 'Übung: Gauß' in head and '2/3' in head and 'erweiterte Matrix' in head
    s = head + '<script>\nconst MODEL=\'%s\';' % model + SCRIPT + '</script>\n</body></html>'
    open(OUT + pre + 'Uebung_Stufenform.html', 'w', encoding='utf-8').write(s)
    print('ok', pre + 'Uebung_Stufenform.html')

for m in ('cw', 'dx'): build(m)
