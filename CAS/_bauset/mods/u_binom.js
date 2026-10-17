UEB["binom"]={
 title:"Binomialverteilung",
 css:String.raw`:host{ --lf:#1F4E99; --ink:#1d1d1f; --mute:#5b6270; --line:#dde1e7; --bg:#f3f4f6; --ok:#2E7D32; --okbg:#E8F5E9; --no:#C62828; --nobg:#FDECEA; --warn:#8a5a00; --warnbg:#FFF8E8; }
*{ box-sizing:border-box; }
:host{ display:block; color:var(--ink); font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif; line-height:1.5; }
.wrap{ max-width:none; margin:0; padding:0; }
.tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
.tabs button{ font:inherit; font-size:14px; border:1px solid var(--line); background:#fff; border-radius:999px; padding:6px 14px; cursor:pointer; }
.tabs button.on{ background:var(--ink); color:#fff; border-color:var(--ink); }
.card{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px 20px; margin-bottom:14px; }
.card h2{ margin:0 0 6px; font-size:18px; }
.auftrag{ font-size:15.5px; margin:0 0 8px; }
.term{ font-family:Cambria,Georgia,serif; font-size:24px; margin:4px 0 8px 18px; }
.bereich{ display:flex; gap:10px; flex-wrap:wrap; margin:4px 0 10px 18px; }
.bereich span{ background:var(--bg); border:1px solid var(--line); border-radius:8px; padding:3px 12px; font-size:15px; }
.bereich b{ font-family:Cambria,Georgia,serif; font-size:17px; }
.weg{ font-size:14px; color:var(--mute); line-height:1.9; }
.taste{ display:inline-block; font:bold 12px Arial,sans-serif; background:#2f2f34; color:#fff; border-radius:7px; padding:1px 7px; }
.taste.w{ background:#f4f4f6; color:#111; border:1px solid #9a9aa2; }
.taste.b{ background:#2f6fd6; }
.taste.sh{ background:#d9bf7c; color:#3a2c0a; }
.round{ display:inline-block; background:var(--warnbg); border-left:4px solid #F2B705; padding:4px 10px; border-radius:4px; font-size:14.5px; margin:2px 0 12px; }
.round b{ color:var(--warn); }
.rows{ display:flex; flex-direction:column; gap:6px; }
.f{ display:grid; grid-template-columns:150px 1fr 26px; align-items:center; gap:10px; padding:6px 8px; border-radius:8px; }
.f .lab{ font-family:Cambria,Georgia,serif; font-size:18px; }
.f .ins{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-family:Cambria,Georgia,serif; font-size:18px; }
.f input{ font:inherit; font-family:system-ui,Arial,sans-serif; font-size:16px; width:110px; padding:5px 8px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:right; }
.f input.xs{ width:80px; }
.f .m{ font-weight:bold; font-size:18px; text-align:center; }
.f.ok{ background:var(--okbg); }
.f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); }
.f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); }
.f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; font-family:system-ui,Arial,sans-serif; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); }
.f.fmt .msg{ color:var(--warn); }
.f.show .msg{ color:var(--mute); }
.btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.btns button{ font:inherit; font-size:15.5px; padding:9px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:#fff; }
.btns button.go{ background:var(--lf); border-color:var(--lf); color:#fff; }
.score{ font-size:16px; font-weight:bold; margin-top:12px; min-height:24px; }
.stats{ font-size:13.5px; color:var(--mute); margin-top:4px; }
.hinweis{ font-size:13.5px; color:var(--mute); }
table.loes{ border-collapse:collapse; margin:10px 0 0; font-family:Cambria,Georgia,serif; font-size:15px; display:none; }
table.loes.zeig{ display:table; }
table.loes th, table.loes td{ border:1px solid #c3c8d0; padding:3px 10px; text-align:right; }
table.loes th{ background:#e8edf5; font-weight:normal; }
table.loes td.vw{ background:var(--warnbg); font-weight:bold; }
@media (max-width:520px){ .f{ grid-template-columns:1fr 26px; } .f .lab{ grid-column:1 / -1; } }
.f:has(.lab:empty){ grid-template-columns:1fr 26px; }
.f .lab:empty{ display:none; }
.f .lab{ font-family:system-ui,Arial,sans-serif; font-size:15px; }
.f input{ width:120px; }
.term{ font-size:22px; }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div class="term" id="term"></div>
    <div class="weg" id="weg"></div>
  </div>
  <div class="card">
    <div class="round" id="round"></div>
    <div class="rows" id="felder"></div>
    <div class="btns">
      <button class="go" id="pruefen">Prüfen</button>
      <button id="zeigen">Lösung anzeigen</button>
      <button id="neu">Neue Aufgabe ▶</button>
    </div>
    <div class="score" id="score"></div>
    <div class="stats" id="stats"></div>
  </div>
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Tragen Sie Wahrscheinlichkeiten als Dezimalzahl ein, z.&nbsp;B. 0,2150.</p>
</div>`,
 init:function(root){

const MODEL='cw';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const r4=v=>Math.round(v*10000+1e-9)/10000;
const de4=v=>r4(v).toFixed(4).replace('.',',');
const fmt=v=>String(Number(v.toPrecision(10))).replace('.',',');
const dz=v=>String(v).replace('.',',');
function binP(n,p,k){ if(k<0||k>n) return 0; let c=1; for(let i=1;i<=k;i++) c=c*(n-k+i)/i; return c*Math.pow(p,k)*Math.pow(1-p,n-k); }
function binC(n,p,k){ let s=0; for(let i=0;i<=k;i++) s+=binP(n,p,i); return s; }
const P=s=>`<i>P</i>(${s})`, X='<i>X</i>';
const WEG={
 dex:'<b>genau:</b> <span class="taste">MENU</span> <span class="taste w">7</span> <span class="taste w">4</span> Binomial-Dichte · <b>höchstens:</b> <span class="taste">MENU</span> <span class="taste w">7</span> <span class="taste">▼</span> <span class="taste w">1</span> Kumul. Binom.-V · dann <span class="taste w">2</span> Variable ▸ <i>k</i>, <i>n</i>, <i>p</i> je <span class="taste w">=</span> ▸ <span class="taste w">=</span>',
 cw:'<span class="taste">HOME</span> Verteilung ▸ <b>genau:</b> Binom.Verteilung · <b>höchstens:</b> Kumul. Binom.-V. ▸ Einzelwert ▸ <i>k</i>, <i>n</i>, <i>p</i> je <span class="taste">EXE</span> ▸ Ausführen <span class="taste">OK</span>'
}[MODEL];
const FN_G=MODEL==='dex'?'Binomial-Dichte':'Binom.Verteilung', FN_H=MODEL==='dex'?'Kumul. Binom.-V':'Kumul. Binom.-V.';
const PS=[0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6,0.7,0.75,0.8,0.05,0.08,0.12];
function parameter(){
  for(let t=0;t<200;t++){
    const n=pick([8,10,12,15,20,20,25,30,40,50,60,80,100]), p=pick(PS), mu=n*p;
    if(mu<2||n-mu<2) continue;
    return {n,p,mu,sd:Math.sqrt(n*p*(1-p))};
  }
  return {n:20,p:0.3,mu:6,sd:2};
}
const um=(q,f)=>Math.max(0,Math.round(q.mu+f*q.sd));
const ROUND='<b>Wichtig:</b> Auf <b>4 Stellen nach dem Komma</b> runden, z.&nbsp;B. <b>0,2150</b>.';
const NP=q=>`${X} ist binomialverteilt mit <i>n</i> = ${q.n} und <i>p</i> = ${dz(q.p)}.`;
function genG(){ const q=parameter(); let k=um(q,(Math.random()-0.5)*2);
  return {h:"Genau",auftrag:NP(q)+' Berechnen Sie:',show:P(X+' = '+k),zeilen:[{id:'g',vor:P(X+' = '+k)+' =',soll:binP(q.n,q.p,k),typ:'g',q,k}]}; }
function genH(){ const q=parameter(); let k=um(q,(Math.random()-0.6)*2);
  return {h:"Höchstens",auftrag:NP(q)+' Berechnen Sie:',show:P(X+' ≤ '+k),zeilen:[{id:'h',vor:P(X+' ≤ '+k)+' =',soll:binC(q.n,q.p,k),typ:'h',q,k}]}; }
function zwischen(q){
  for(let t=0;t<100;t++){ const a=um(q,-1-Math.random()), b=um(q,0.4+Math.random()*1.4); if(a>=1&&b>a+1&&b<q.n) return [a,b]; }
  return [1,Math.min(q.n-1,Math.round(q.mu)+2)];
}
function zeilenZ(q,a,b,mitHilfe){
  const A=binC(q.n,q.p,b), B=binC(q.n,q.p,a-1), z=[];
  if(mitHilfe){ z.push({id:'zb',vor:P(X+' ≤ '+b)+' =',soll:A,typ:'h',q,k:b}); z.push({id:'za',vor:P(X+' ≤ '+(a-1))+' =',soll:B,typ:'h',q,k:a-1}); }
  z.push({id:'z',vor:P(a+' ≤ '+X+' ≤ '+b)+' =',soll:A-B,alt:r4(A)-r4(B),typ:'z',q,a,b});
  return z;
}
function genZ(){ const q=parameter(); const [a,b]=zwischen(q);
  return {h:"Zwischen",auftrag:NP(q)+' Berechnen Sie mit zwei kumulierten Werten:',show:P(a+' ≤ '+X+' ≤ '+b)+' = '+P(X+' ≤ '+b)+' − '+P(X+' ≤ '+(a-1)),zeilen:zeilenZ(q,a,b,true)}; }
const FORM=[
 (k,q)=>({t:`weniger als ${k}`,lo:0,hi:k-1}),
 (k,q)=>({t:`nicht mehr als ${k}`,lo:0,hi:k}),
 (k,q)=>({t:`mindestens ${k}`,lo:k,hi:q.n}),
 (k,q)=>({t:`mehr als ${k}`,lo:k+1,hi:q.n}),
 (k,q,a,b)=>({t:`mindestens ${a} und höchstens ${b}`,lo:a,hi:b}),
 (k,q,a,b)=>({t:`mehr als ${a-1}, aber höchstens ${b}`,lo:a,hi:b}),
 (k,q,a,b)=>({t:`mindestens ${a}, aber weniger als ${b+1}`,lo:a,hi:b}),
 (k,q,a,b)=>({t:`mehr als ${a-1} und weniger als ${b+1}`,lo:a,hi:b})
];
const wert=(q,lo,hi)=>(hi>=q.n?1:binC(q.n,q.p,hi))-(lo<=0?0:binC(q.n,q.p,lo-1));
const ansatz=(q,lo,hi)=> lo<=0?`P(X ≤ ${hi})`: hi>=q.n?`P(X ≥ ${lo})`: `P(${lo} ≤ X ≤ ${hi})`;
const rechnung=(q,lo,hi)=> lo<=0?`${de4(binC(q.n,q.p,hi))}`: hi>=q.n?`1 − P(X ≤ ${lo-1}) = 1 − ${de4(binC(q.n,q.p,lo-1))} = ${de4(1-r4(binC(q.n,q.p,lo-1)))}`:
  `P(X ≤ ${hi}) − P(X ≤ ${lo-1}) = ${de4(binC(q.n,q.p,hi))} − ${de4(binC(q.n,q.p,lo-1))} = ${de4(r4(binC(q.n,q.p,hi))-r4(binC(q.n,q.p,lo-1)))}`;
function genF(){
  const q=parameter(); const typen=[]; while(typen.length<3){ const t=R(0,FORM.length-1); if(!typen.includes(t)) typen.push(t); }
  const z=typen.map((t,i)=>{
    const [a,b]=zwischen(q), k=Math.max(1,um(q,(Math.random()-0.5)*1.6));
    const f=FORM[t](k,q,a,b);
    const alt=(f.hi>=q.n?1:r4(binC(q.n,q.p,f.hi)))-(f.lo<=0?0:r4(binC(q.n,q.p,f.lo-1)));
    return {id:'f'+i,lab:`${'abc'[i]}) ${f.t}`,vor:'P = ',soll:wert(q,f.lo,f.hi),alt,typ:'f',q,lo:f.lo,hi:f.hi};
  });
  return {h:"Formulierungen",auftrag:NP(q)+' Übersetzen Sie die Formulierung und berechnen Sie die Wahrscheinlichkeit. <i>X</i> ist die Anzahl der Treffer.',show:'',zeilen:z};
}
const MODES={g:{name:"Genau",gen:genG},h:{name:"Höchstens",gen:genH},z:{name:"Zwischen",gen:genZ},f:{name:"Mehr als, weniger als …",gen:genF}};
const ORDER=["g","h","z","f"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent="Aufgabe: "+A.h; $('auftrag').innerHTML=A.auftrag; $('term').innerHTML=A.show; $('term').style.display=A.show?'block':'none'; $('weg').innerHTML=WEG;
  $('round').innerHTML=ROUND;
  $('felder').innerHTML=A.zeilen.map(z=>`<div class="f" id="f_${z.id}"><span class="lab">${z.lab||''}</span><span class="ins">${z.vor} <input id="i_${z.id}" inputmode="decimal" autocomplete="off" placeholder="0,0000"></span><span class="m"></span><div class="msg"></div></div>`).join('');
  $('score').textContent=''; $('stats').textContent=stat.a?`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`:'';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
const near=(a,b)=>Math.abs(a-b)<0.00005+1e-9;
function pruefen(){
  let ok=0, tot=A.zeilen.length;
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    const raw=$('i_'+z.id).value; if(!raw.trim()) return;
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 0,2150.'; return; }
    const ziele=[r4(z.soll)]; if(z.alt!==undefined) ziele.push(r4(z.alt));
    const richtig=ziele.some(t=>near(p.v,t));
    if(p.dec!==4){ f.classList.add('fmt'); m.textContent='!'; msg.textContent=`Bitte genau 4 Stellen nach dem Komma eintragen${Math.abs(p.v-z.soll)<0.006?' – der Wert selbst passt.':'.'}`; return; }
    if(richtig){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    const q=z.q; let t='Das stimmt noch nicht. Prüfen Sie k, n und p.';
    if(p.v>1) t='Eine Wahrscheinlichkeit liegt immer zwischen 0 und 1.';
    else if(Math.abs(p.v-z.soll)<0.00015) t='Fast: Achten Sie auf das Runden (ab 5 aufrunden).';
    else if(z.typ==='g'&&near(p.v,r4(binC(q.n,q.p,z.k)))) t=`Das ist „höchstens“. Für „genau“ nehmen Sie ${FN_G}.`;
    else if(z.typ==='h'&&near(p.v,r4(binP(q.n,q.p,z.k)))) t=`Das ist „genau“. Für „höchstens“ nehmen Sie ${FN_H}.`;
    else if(z.id==='za'&&near(p.v,r4(binC(q.n,q.p,z.k+1)))) t=`Prüfen Sie k: Von der unteren Grenze ${z.k+1} ziehen Sie 1 ab.`;
    else if(z.typ==='z'&&near(p.v,r4(binC(q.n,q.p,z.b)-binC(q.n,q.p,z.a)))) t=`Fast: Ziehen Sie P(X ≤ ${z.a-1}) ab, nicht P(X ≤ ${z.a}). Sonst fehlt X = ${z.a}.`;
    else if(z.typ==='z'&&near(p.v,r4(binC(q.n,q.p,z.b)))) t='Das ist nur P(X ≤ b). Ziehen Sie noch P(X ≤ a − 1) ab.';
    else if(z.typ!=='z'&&near(p.v,r4(binP(q.n,1-q.p,z.k)))) t='Prüfen Sie p: Haben Sie die Gegenwahrscheinlichkeit genommen?';
    if(z.typ==='f'){
      const sh=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]].some(([dl,dh])=>{ const lo=z.lo+dl, hi=z.hi+dh; return lo>=0&&hi<=q.n&&lo<=hi&&(dl||dh)&&near(p.v,r4(wert(q,lo,hi))); });
      if(sh) t='Fast: Prüfen Sie die Grenzen. Zählt die Zahl mit („mindestens/höchstens“) oder nicht („mehr als/weniger als“)?';
      else if(z.hi>=q.n&&near(p.v,r4(binC(q.n,q.p,z.lo-1)))) t='Das ist die Gegenwahrscheinlichkeit. Rechnen Sie 1 − P(X ≤ …).';
      else t='Übersetzen Sie zuerst: Welche Trefferzahlen gehören dazu? Dann mit dem Rechner berechnen.';
    }
    msg.textContent=t;
  });
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), msg=f.querySelector('.msg'), q=z.q;
    f.className='f show'; f.querySelector('.m').textContent='';
    $('i_'+z.id).value=de4(z.soll);
    if(z.typ==='f') msg.textContent=ansatz(q,z.lo,z.hi)+' = '+rechnung(q,z.lo,z.hi);
    else if(z.typ==='z') msg.innerHTML=`n = ${q.n}, p = ${dz(q.p)}: P(X ≤ ${z.b}) − P(X ≤ ${z.a-1}) = ${de4(binC(q.n,q.p,z.b))} − ${de4(binC(q.n,q.p,z.a-1))} = ${de4(r4(binC(q.n,q.p,z.b))-r4(binC(q.n,q.p,z.a-1)))}`;
    else msg.textContent=`${z.typ==='g'?FN_G:FN_H} mit k = ${z.k}, n = ${q.n}, p = ${dz(q.p)} · Rechner: ${fmt(z.soll)}`;
  });
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();

 }
};
