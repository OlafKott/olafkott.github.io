UEB["grund"]={
 title:"Grundlagen",
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
.fr{ display:inline-flex; flex-direction:column; vertical-align:middle; text-align:center; font-size:.72em; line-height:1.1; margin:0 2px; }
.fr span:first-child{ border-bottom:1px solid currentColor; padding:0 2px; }
.weg{ font-size:14px; color:var(--mute); line-height:1.9; }
.taste{ display:inline-block; font:bold 12px Arial,sans-serif; background:#2f2f34; color:#fff; border-radius:7px; padding:1px 7px; }
.taste.w{ background:#f4f4f6; color:#111; border:1px solid #9a9aa2; }
.taste.sh{ background:#d9bf7c; color:#3a2c0a; }
.round{ display:inline-block; background:var(--warnbg); border-left:4px solid #F2B705; padding:4px 10px; border-radius:4px; font-size:14.5px; margin:2px 0 12px; }
.round b{ color:var(--warn); }
.rows{ display:flex; flex-direction:column; gap:6px; }
.f{ display:grid; grid-template-columns:130px 1fr 26px; align-items:center; gap:10px; padding:6px 8px; border-radius:8px; }
.f .lab{ font-family:Cambria,Georgia,serif; font-size:18px; }
.f .ins{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-family:Cambria,Georgia,serif; font-size:18px; }
.f input{ font:inherit; font-family:system-ui,Arial,sans-serif; font-size:16px; width:110px; padding:5px 8px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:right; }
.f input.xs{ width:70px; }
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
.f .swatch{ display:inline-block; width:12px; height:12px; border-radius:50%; margin-right:6px; vertical-align:middle; }
.btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.btns button{ font:inherit; font-size:15.5px; padding:9px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:#fff; }
.btns button.go{ background:var(--lf); border-color:var(--lf); color:#fff; }
.score{ font-size:16px; font-weight:bold; margin-top:12px; min-height:24px; }
.stats{ font-size:13.5px; color:var(--mute); margin-top:4px; }
.hinweis{ font-size:13.5px; color:var(--mute); }
svg.gr{ width:100%; max-width:620px; height:auto; display:block; margin:6px 0 4px; }
@media (max-width:520px){ .f{ grid-template-columns:1fr 26px; } .f .lab{ grid-column:1 / -1; } }
.f{ grid-template-columns:minmax(150px,max-content) 1fr 26px; }
.f.sub{ padding-top:0; margin-top:-6px; }
.f.sub .lab{ visibility:hidden; }
.zus{ font-family:system-ui,Arial,sans-serif; font-size:14.5px; color:var(--mute); }
.wz span{ border-top:1.5px solid currentColor; padding:0 2px; }
.taste.al{ background:#c2185b; }
.taste .mf{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; gap:1px; }
.taste .mf i{ display:block; width:7px; height:4px; border:1.1px solid currentColor; }
.taste .mf b{ display:block; width:10px; height:1.1px; background:currentColor; }
.weg{ margin-top:4px; }
.f .lab .fr{ font-size:.85em; }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
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
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Für das Minus können Sie - oder − tippen.</p>
</div>`,
 init:function(root){

const MODEL='cw';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;};
const r2=v=>{ const s=v<0?-1:1; return s*Math.round(Math.abs(v)*100+1e-7)/100; };
const de=(v,d)=>{ let s=d===undefined?String(Number(v.toFixed(6))):r2(v).toFixed(d); return s.replace('.',',').replace('-','−'); };
const nz=v=>de(v);                       // Zahl im Text
const FR=(p,q)=>`<span class="fr"><span>${p}</span><span>${q}</span></span>`;
const frS=(p,q)=>{ const g=gcd(p,q); p/=g; q/=g; if(q<0){p=-p;q=-q;} return q===1?String(p):(p<0?'−':'')+Math.abs(p)+'/'+q; };
const T=(t,c)=>`<span class="taste${c?' '+c:''}">${t}</span>`;
const isCW=MODEL==='cw';
const K={exe:isCW?T('EXE'):T('=',''), dez:isCW?T('SHIFT','sh')+' + '+T('EXE'):T('S⇔D'), neg:isCW?T('SHIFT','sh')+' + '+T('−'):T('(−)'),
  frac:T('<span class="mf"><i></i><b></b><i></i></span>')};
const WEG={
 r: `Vorzeichen: ${K.neg} &nbsp;·&nbsp; Rechenzeichen minus: ${T('−')} &nbsp;·&nbsp; Ergebnis: ${K.exe}`,
 b: `${K.frac} Zähler ${T('▼')} Nenner ${T('▶')} &nbsp;·&nbsp; exakt: ${K.exe} &nbsp;·&nbsp; Dezimalzahl: ${K.dez}`,
 p: `Quadrat ${T(isCW?'▫²':'x²')} &nbsp;·&nbsp; Hochzahl ${T(isCW?'▫<sup>▫</sup>':'x<sup>▫</sup>')} &nbsp;·&nbsp; Wurzel ${T('√▫')} &nbsp;·&nbsp; Dezimalzahl: ${K.dez}`,
 m: isCW ? `Speichern: Ergebnis ${K.exe} ▸ ${T('VARIABLE')} ▸ A= (für B mit ${T('▼')}) ▸ ${T('OK')} ▸ Speichern ▸ ${T('OK')}<br>In die Rechnung: A = ${T('SHIFT','sh')} + ${T('4')} &nbsp;·&nbsp; B = ${T('SHIFT','sh')} + ${T('5')} &nbsp;·&nbsp; zurück mit ${T('AC')}`
         : `Speichern: Ergebnis ${K.exe} ▸ ${T('STO')} ▸ ${T('(−)')} für A bzw. ${T('°′″')} für B<br>In die Rechnung: A = ${T('ALPHA','al')} + ${T('(−)')} &nbsp;·&nbsp; B = ${T('ALPHA','al')} + ${T('°′″')}`
};
// ---------- Modus 1: Rechnen ----------
const D1=[0.5,1.5,2.5,3.5,4.5,0.2,0.4,0.8,1.2,1.6,2.4];
function ok2(v){ return Math.abs(v*100-Math.round(v*100))<1e-7 && Math.abs(v)<2000; }
function genR(){
  const gen=[
   ()=>{ const a=pick(D1), b=R(2,9)*2; return {t:`${nz(a)} · ${b}`, v:a*b}; },
   ()=>{ const a=R(12,40), b=R(2,9), c=pick([1.5,2.5,0.5,3.5]); return {t:`${a} − ${b} · ${nz(c)}`, v:a-b*c}; },
   ()=>{ const a=R(10,30), b=R(2,9), c=pick([1.5,2.5,0.5,4]); return {t:`(${a} − ${b}) · ${nz(c)}`, v:(a-b)*c}; },
   ()=>{ const a=pick([2.5,4.5,7.5,6.5,8.5]), b=pick([1.5,3.5,2.5,0.5]); return {t:`−${nz(a)} + ${nz(b)}`, v:-a+b}; },
   ()=>{ const a=R(2,8), b=pick([1.5,2.5,0.5,1.2]); return {t:`(−${a}) · (−${nz(b)})`, v:a*b}; },
   ()=>{ const b=R(2,6), q=R(2,9), c=R(1,9); return {t:`−${b*q} : ${b} + ${c}`, v:-q+c}; },
   ()=>{ const b=pick([0.2,0.4,0.5,0.8,0.9]), q=R(3,12); return {t:`${nz(b*q)} : ${nz(b)}`, v:q}; },
  ];
  const rows=[], used=new Set();
  while(rows.length<4){ const i=R(0,gen.length-1); if(used.has(i)) continue; const g=gen[i](); if(g.v===null||!ok2(g.v)) continue; used.add(i); rows.push(g); }
  return {h:'Rechnen mit Komma, Klammern und Vorzeichen', auftrag:'Berechnen Sie mit dem Rechner.', weg:WEG.r,
    felder:rows.map((g,i)=>({id:'r'+i, lab:g.t+' =', soll:g.v, art:'genau'})), hinweis:'Ergebnisse genau eintragen, z.&nbsp;B. <b>−4,5</b>.'};
}
// ---------- Modus 2: Brüche ----------
function genB(){
  const ops=[['+',(a,b,c,d)=>[a*d+c*b,b*d]],['−',(a,b,c,d)=>[a*d-c*b,b*d]],['·',(a,b,c,d)=>[a*c,b*d]]];
  const rows=[]; const seen=new Set();
  while(rows.length<3){
    const [o,f]=ops[rows.length], b=R(2,9), d=R(2,9); const a=R(1,b-1), c=R(1,d-1);
    if(b===d&&o!=='·') continue;
    let [p,q]=f(a,b,c,d); const g=gcd(p,q); p/=g; q/=g; if(q===1||p===0) continue;
    if(q>40) continue;
    const key=`${a}/${b}${o}${c}/${d}`; if(seen.has(key)) continue; seen.add(key);
    rows.push({t:`${FR(a,b)} ${o} ${FR(c,d)}`, p, q});
  }
  const fel=[];
  rows.forEach((r,i)=>{ fel.push({id:'b'+i+'e', lab:r.t+' =', soll:r.p/r.q, art:'bruch', bruch:frS(r.p,r.q), zus:'exakt'}); fel.push({id:'b'+i+'d', lab:'', soll:r.p/r.q, art:'r2', zus:'als Dezimalzahl ≈'}); });
  return {h:'Brüche und Dezimalzahlen', auftrag:'Berechnen Sie exakt (als Bruch, z.&nbsp;B. 11/12) und als Dezimalzahl.', weg:WEG.b, felder:fel, paar:true,
    hinweis:'Bruch mit Schrägstrich eintippen, z.&nbsp;B. <b>11/12</b>. Dezimalzahl auf <b>2 Stellen</b> runden, z.&nbsp;B. <b>0,92</b>.'};
}
// ---------- Modus 3: Potenzen & Wurzeln ----------
function genP(){
  const a=R(2,5), n=a===2?R(5,10):R(3,5);
  const b=R(2,9), m=R(2,4), c=R(2,9);
  const s=R(11,25);
  let w; do{ w=R(2,60); }while(Number.isInteger(Math.sqrt(w)));
  const z=R(2,9);
  const fel=[
   {id:'p0', lab:`${a}<sup>${n}</sup> =`, soll:a**n, art:'genau'},
   {id:'p1', lab:`${b}<sup>${m}</sup> − ${c} =`, soll:b**m-c, art:'genau'},
   {id:'p2', lab:`√${s*s} =`.replace('√',`<span class="wz">√<span>`).replace(' =','</span></span> ='), soll:s, art:'genau'},
   {id:'p3', lab:`<span class="wz">√<span>${w}</span></span> ≈`, soll:Math.sqrt(w), art:'r2'},
   {id:'p4', lab:`−${z}<sup>2</sup> =`, soll:-(z*z), art:'genau', klammer:z*z},
   {id:'p5', lab:`(−${z})<sup>2</sup> =`, soll:z*z, art:'genau'}
  ];
  return {h:'Potenzen und Wurzeln', auftrag:'Berechnen Sie mit dem Rechner.', weg:WEG.p, felder:fel,
    hinweis:'Ganze Zahlen genau eintragen. Bei ≈ auf <b>2 Stellen</b> runden.'};
}
// ---------- Modus 4: Werte speichern ----------
function genM(){
  let A,B,aT,bT,ok=false,auf;
  const combos=[['A · B',(A,B)=>A*B],['A : B',(A,B)=>A/B],['A<sup>2</sup> − B',(A,B)=>A*A-B],['(A + B) : 2',(A,B)=>(A+B)/2],['A − 2 · B',(A,B)=>A-2*B],['3 · A + B',(A,B)=>3*A+B],['B<sup>2</sup> + A',(A,B)=>B*B+A]];
  for(let t=0;t<200&&!ok;t++){
    let n; do{ n=R(3,40); }while(Number.isInteger(Math.sqrt(n)));
    const d=pick([0.5,1.5,2,2.5,3]);
    A=Math.sqrt(n)+d; aT=`<span class="wz">√<span>${n}</span></span> + ${nz(d)}`;
    let p,q; do{ q=pick([3,6,7,9,11,12]); p=R(q+1,5*q); }while(gcd(p,q)!==1);
    B=p/q; bT=`${p} : ${q}`;
    const sel=[]; while(sel.length<3){ const c=pick(combos); if(!sel.includes(c)) sel.push(c); }
    auf=sel.map(([t,f])=>({t, v:f(A,B), vr:f(r2(A),r2(B))}));
    ok = auf.some(x=>r2(x.v)!==r2(x.vr)) && auf.every(x=>Math.abs(x.v)<1000);
  }
  const fel=[
   {id:'mA', lab:`${aT} ≈`, soll:A, art:'r2', zus:'→ in <b>A</b> speichern'},
   {id:'mB', lab:`${bT} ≈`, soll:B, art:'r2', zus:'→ in <b>B</b> speichern'},
   ...auf.map((x,i)=>({id:'m'+i, lab:`${x.t} ≈`, soll:x.v, art:'r2', gerundet:x.vr}))
  ];
  return {h:'Werte speichern und weiterrechnen', auftrag:'Berechnen Sie A und B, speichern Sie beide Werte im Rechner und rechnen Sie dann <b>mit den gespeicherten Werten</b> weiter.', weg:WEG.m, felder:fel,
    hinweis:'Alle Ergebnisse auf <b>2 Stellen nach dem Komma</b> runden, z.&nbsp;B. <b>3,27</b>. Gerechnet wird aber mit den <b>genauen</b> gespeicherten Werten.'};
}
// ---------- Ablauf ----------
const MODES={r:{name:"Rechnen",gen:genR}, b:{name:"Brüche",gen:genB}, p:{name:"Potenzen & Wurzeln",gen:genP}, m:{name:"Werte speichern",gen:genM}};
const ORDER=["r","b","p","m"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent='Aufgabe: '+A.h; $('auftrag').innerHTML=A.auftrag; $('weg').innerHTML=A.weg; $('round').innerHTML='<b>Wichtig:</b> '+A.hinweis;
  $('felder').innerHTML=A.felder.map(f=>`<div class="f${f.lab?'':' sub'}" id="f_${f.id}"><span class="lab">${f.lab}</span><span class="ins">${f.zus&&!f.zus.startsWith('→')?'<span class="zus">'+f.zus+'</span>':''}<input id="i_${f.id}" inputmode="${f.art==='bruch'?'text':'decimal'}" autocomplete="off" placeholder="${f.art==='bruch'?'z. B. 3/4':f.art==='r2'?'0,00':''}">${f.zus&&f.zus.startsWith('→')?'<span class="zus">'+f.zus+'</span>':''}</span><span class="m"></span><div class="msg"></div></div>`).join('');
  $('score').textContent='';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){
  s=s.trim().replace(/\s/g,'').replace(/,/g,'.').replace(/[−–]/g,'-');
  let m=s.match(/^(-?\d+)\/(-?\d+)$/); if(m){ const q=+m[2]; if(!q) return null; return {v:+m[1]/q, bruch:true, p:+m[1], q}; }
  if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length};
}
const near=(a,b,e)=>Math.abs(a-b)<(e||1e-9);
function pruefen(){
  let ok=0, tot=A.felder.length;
  A.felder.forEach(f=>{
    const el=$('f_'+f.id), raw=$('i_'+f.id).value, m=el.querySelector('.m'), msg=el.querySelector('.msg');
    el.className='f'+(f.lab?'':' sub'); m.textContent=''; msg.textContent='';
    if(!raw.trim()) return;
    const p=parse(raw);
    const bad=(t)=>{ el.classList.add('no'); m.textContent='✗'; msg.textContent=t; };
    const fmt=(t)=>{ el.classList.add('fmt'); m.textContent='!'; msg.textContent=t; };
    if(!p) return fmt(f.art==='bruch'?'Bitte als Bruch eintragen, z. B. 3/4.':'Bitte nur eine Zahl eintragen, z. B. 3,27.');
    if(f.art==='genau'){
      if(near(p.v,f.soll,1e-7)){ el.classList.add('ok'); m.textContent='✓'; ok++; return; }
      if(near(p.v,-f.soll,1e-7)) return bad('Das Vorzeichen stimmt nicht. Vorzeichen mit '+(isCW?'SHIFT + −':'(−)')+', Rechenzeichen mit −.');
      if(f.klammer&&near(p.v,f.klammer)) return bad('Ohne Klammer wird zuerst quadriert: −(z²). Das Ergebnis ist negativ.');
      return bad('Das stimmt noch nicht. Prüfen Sie die Eingabe im Display.');
    }
    if(f.art==='bruch'){
      if(!p.bruch) return near(p.v,f.soll,1e-7)?fmt('Der Wert stimmt – tragen Sie ihn als Bruch ein, z. B. '+f.bruch+'.'):bad('Das stimmt noch nicht. Tragen Sie den exakten Bruch ein (Rechner: '+(isCW?'EXE':'=')+').');
      if(near(p.v,f.soll,1e-9)){ if(gcd(p.p,p.q)!==1) return fmt('Der Wert stimmt – der Rechner zeigt den gekürzten Bruch.'); el.classList.add('ok'); m.textContent='✓'; ok++; return; }
      return bad('Das stimmt noch nicht. Achten Sie auf ▶: erst aus dem Bruch heraus, dann das Rechenzeichen.');
    }
    // r2
    const soll=r2(f.soll);
    if(p.bruch) return fmt('Bitte als Dezimalzahl mit 2 Stellen nach dem Komma eintragen.');
    if(p.dec!==2){ return fmt('Bitte genau 2 Stellen nach dem Komma eintragen'+(Math.abs(p.v-f.soll)<0.01?' – der Wert selbst stimmt.':'.')); }
    if(near(p.v,soll,0.0051)){ el.classList.add('ok'); m.textContent='✓'; ok++; return; }
    if(f.gerundet!==undefined&&near(p.v,r2(f.gerundet),0.0051)) return bad('Sie haben mit gerundeten Werten gerechnet. Nehmen Sie die gespeicherten Werte A und B – dann stimmt es genau.');
    if(Math.abs(p.v-f.soll)<0.011) return bad('Fast: Achten Sie auf das Runden (ab 5 aufrunden).');
    return bad('Das stimmt noch nicht. Prüfen Sie die Eingabe im Display.');
  });
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.felder.forEach(f=>{
    const el=$('f_'+f.id), msg=el.querySelector('.msg');
    const v=f.art==='bruch'?f.bruch.replace('-','−'):f.art==='r2'?de(f.soll,2):de(f.soll);
    $('i_'+f.id).value=v; el.className='f show'+(f.lab?'':' sub'); el.querySelector('.m').textContent='';
    msg.textContent = f.art==='r2' ? 'Rechner: '+de(Number(f.soll.toPrecision(10)))+' → gerundet '+de(f.soll,2) : 'Lösung: '+v;
  });
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();


 }
};
