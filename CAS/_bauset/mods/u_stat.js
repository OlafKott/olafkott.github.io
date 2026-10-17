UEB["stat"]={
 title:"Lage- und Streuungsmaße",
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
.round{ display:inline-block; background:var(--warnbg); border-left:4px solid #F2B705; padding:4px 10px; border-radius:4px; font-size:14.5px; margin:2px 0 12px; }
.round b{ color:var(--warn); }
.dt{ overflow-x:auto; }
table.d{ border-collapse:collapse; font-size:16px; margin:2px 0 4px; }
table.d th, table.d td{ border:1px solid #c3c8d0; padding:4px 10px; text-align:center; min-width:40px; }
table.d th{ background:#eef0f3; font-family:Cambria,Georgia,serif; font-style:italic; }
.spalten{ font-size:14px; color:var(--mute); margin-top:8px; line-height:1.7; }
.taste{ display:inline-block; font:bold 12px Arial,sans-serif; background:#2f2f34; color:#fff; border-radius:7px; padding:1px 7px; }
.grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 22px; }
@media (max-width:620px){ .grid{ grid-template-columns:1fr; } }
.f{ display:grid; grid-template-columns:1fr 120px 26px; align-items:center; gap:8px; padding:6px 8px; border-radius:8px; }
.f label{ font-size:15px; }
.f label .z{ color:var(--mute); font-family:Cambria,Georgia,serif; font-size:14px; }
.f input{ font:inherit; font-size:16px; width:120px; padding:5px 8px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:right; }
.f .m{ font-weight:bold; font-size:18px; text-align:center; }
.f.ok{ background:var(--okbg); } .f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); } .f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); } .f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); } .f.fmt .msg{ color:var(--warn); } .f.show .msg{ color:var(--mute); }
.btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.btns button{ font:inherit; font-size:15.5px; padding:9px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:#fff; }
.btns button.go{ background:var(--lf); border-color:var(--lf); color:#fff; }
.score{ font-size:16px; font-weight:bold; margin-top:12px; min-height:24px; }
.stats{ font-size:13.5px; color:var(--mute); margin-top:4px; }
.hinweis{ font-size:13.5px; color:var(--mute); }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div class="dt" id="daten"></div>
    <div class="spalten" id="spalten"></div>
  </div>
  <div class="card">
    <div class="round"><b>Wichtig:</b> Tragen Sie alle Ergebnisse mit <b>2 Stellen nach dem Komma</b> ein, z.&nbsp;B. <b>6,17</b> oder <b>4,00</b>.</div>
    <div class="grid" id="felder"></div>
    <div class="btns">
      <button class="go" id="pruefen">Prüfen</button>
      <button id="zeigen">Lösung anzeigen</button>
      <button id="neu">Neue Aufgabe ▶</button>
    </div>
    <div class="score" id="score"></div>
    <div class="stats" id="stats"></div>
  </div>
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Die Anzahl <i>n</i> tragen Sie als ganze Zahl ein.</p>
</div>`,
 init:function(root){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const r2=v=>{ const s=v<0?-1:1; return s*Math.round(Math.abs(v)*100+1e-7)/100; };
const de=(v,d=2)=>r2(v).toFixed(d).replace('.',',');
const med=a=>{ const s=[...a].sort((x,y)=>x-y), n=s.length; return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2; };
function kenn(v){
  const s=[...v].sort((x,y)=>x-y), n=s.length, h=Math.floor(n/2);
  const mean=s.reduce((a,b)=>a+b,0)/n, ss=s.reduce((a,b)=>a+(b-mean)**2,0);
  const q1=med(s.slice(0,h)), q3=med(s.slice(h+n%2));
  return {n, mean, min:s[0], q1, med:med(s), q3, max:s[n-1], R:s[n-1]-s[0], IQR:q3-q1, sig:Math.sqrt(ss/n), sx:Math.sqrt(ss/(n-1))};
}
// Nur Datensätze, bei denen alle üblichen Quartils-Verfahren dasselbe liefern (damit der Rechner sicher passt)
function eindeutig(v){
  const s=[...v].sort((a,b)=>a-b), n=s.length, h=Math.floor(n/2), hi=Math.ceil(n/2);
  const ex=[med(s.slice(0,h)),med(s.slice(h+n%2))], inc=[med(s.slice(0,hi)),med(s.slice(n-hi))];
  const cum=p=>{ const k=n*p; return Math.abs(k-Math.round(k))<1e-9 ? (s[Math.round(k)-1]+s[Math.round(k)])/2 : s[Math.ceil(k)-1]; };
  return ex[0]===inc[0]&&ex[1]===inc[1]&&ex[0]===cum(.25)&&ex[1]===cum(.75);
}
const LAGE=[["n","Anzahl der Werte","n",true],["mean","Arithmetisches Mittel","x̄"],["min","Minimum","min(x)"],["q1","Unteres Quartil","Q₁"],["med","Median","Med"],["q3","Oberes Quartil","Q₃"],["max","Maximum","max(x)"],["R","Spannweite","max(x) − min(x)"],["IQR","Quartilsabstand","Q₃ − Q₁"],["sig","Standardabweichung","σx"]];
const NEU='Neue Daten: <span class="taste">TOOLS</span> ▸ Editieren ▸ Alles löschen';
function genUr(){
  let v; do{ const n=R(8,13); v=Array.from({length:n},()=>R(1,20)); }while(!eindeutig(v));
  const k=kenn(v);
  return {typ:'ur', h:"Urliste", auftrag:"Bestimmen Sie mit dem Taschenrechner die Lage- und Streuungsmaße dieser Urliste.",
    daten:'<table class="d"><tr>'+v.map(x=>`<td>${x}</td>`).join('')+'</tr></table>',
    spalten:'Statistik ▸ 1-Variable · Werte in Spalte x · Häufigkeit <b>Aus</b><br>'+NEU, felder:LAGE, wert:k, extra:{sx:k.sx}};
}
function genHf(){
  let xi,hi,v;
  do{ const m=R(5,6), st=R(1,8), step=[1,1,2,5][R(0,3)];
      xi=Array.from({length:m},(_,i)=>st+i*step); hi=xi.map(()=>R(1,9));
      v=xi.flatMap((x,i)=>Array(hi[i]).fill(x)); }while(!eindeutig(v)||!eindeutig(xi));
  const k=kenn(v), kf=kenn(xi);
  return {typ:'hf', h:"Häufigkeitstabelle", auftrag:"Bestimmen Sie mit dem Taschenrechner die Lage- und Streuungsmaße dieser Häufigkeitstabelle.",
    daten:'<table class="d"><tr><th>x<sub>i</sub></th>'+xi.map(x=>`<td>${x}</td>`).join('')+'</tr><tr><th>h<sub>i</sub></th>'+hi.map(x=>`<td>${x}</td>`).join('')+'</tr></table>',
    spalten:'Statistik ▸ 1-Variable · Häufigkeit <b>Ein</b> (<span class="taste">TOOLS</span> ▸ Häufigkeit ▸ Ein) · x<sub>i</sub> in Spalte x, h<sub>i</sub> in Spalte Freq<br>'+NEU,
    felder:LAGE, wert:k, extra:{sx:k.sx, ohne:kf}};
}
const MODES={ur:{name:"Urliste",gen:genUr}, hf:{name:"Häufigkeitstabelle",gen:genHf}};
const ORDER=["ur","hf"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
function neu(){
  A=MODES[mode].gen();
  root.getElementById('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  root.getElementById('h').textContent="Aufgabe: "+A.h;
  root.getElementById('auftrag').innerHTML=A.auftrag;
  root.getElementById('daten').innerHTML=A.daten;
  root.getElementById('spalten').innerHTML=A.spalten;
  root.getElementById('felder').innerHTML=A.felder.map(([k,l,z,int])=>
    `<div class="f" id="f_${k}"><label for="i_${k}">${l} <span class="z">${z}</span></label><input id="i_${k}" inputmode="decimal" autocomplete="off" placeholder="${int?'z. B. 12':'0,00'}"><span class="m"></span><div class="msg"></div></div>`).join('');
  root.getElementById('score').textContent='';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
const near=(a,b)=>Math.abs(a-b)<0.0051;
function pruefen(){
  let ok=0, tot=A.felder.length;
  A.felder.forEach(([k,l,z,int])=>{
    const f=root.getElementById('f_'+k), raw=root.getElementById('i_'+k).value, m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    if(!raw.trim()) return;
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 6,17.'; return; }
    const soll=A.wert[k];
    const richtig = int ? (p.v===soll) : near(p.v,r2(soll));
    if(!int && p.dec!==2){ f.classList.add('fmt'); m.textContent='!'; msg.textContent=`Bitte genau 2 Stellen nach dem Komma eintragen${richtig||near(p.v,soll)?' – der Wert selbst stimmt fast.':'.'}`; return; }
    if(richtig){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht.';
    if(k==='sig' && near(p.v,r2(A.extra.sx))) t='Das ist sx. Gesucht ist σx (Sigma x), zwei Zeilen darüber.';
    else if(A.typ==='hf' && A.extra.ohne && near(p.v, k==='n'?A.extra.ohne.n:r2(A.extra.ohne[k]))) t='Dieser Wert passt zu einer Rechnung ohne Häufigkeiten. Ist die Spalte Freq eingeschaltet und ausgefüllt?';
    else if(k==='R') t='Spannweite = max(x) − min(x).';
    else if(k==='IQR') t='Quartilsabstand = Q₃ − Q₁.';
    else if(k==='n' && A.typ==='hf') t='n ist die Summe aller Häufigkeiten.';
    msg.textContent=t;
  });
  stat.a++; if(ok===tot) stat.r++;
  root.getElementById('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  root.getElementById('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.felder.forEach(([k,l,z,int])=>{
    const f=root.getElementById('f_'+k), msg=f.querySelector('.msg');
    if(!f.classList.contains('ok')){ f.classList.add('show'); msg.textContent='Lösung: '+(int?A.wert[k]:de(A.wert[k])); }
  });
}
root.getElementById('pruefen').onclick=pruefen;
root.getElementById('zeigen').onclick=zeigen;
root.getElementById('neu').onclick=neu;
root.getElementById('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();
 }
};
