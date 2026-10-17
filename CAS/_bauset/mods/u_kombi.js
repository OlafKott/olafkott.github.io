UEB["kombi"]={
 title:"Kombinatorik – n!, nPr, nCr",
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
.f{ grid-template-columns:110px 1fr 26px; }
.f .lab{ font-size:20px; text-align:right; }
.bin{ display:inline-flex; align-items:center; vertical-align:middle; font-family:Cambria,Georgia,serif; }
.bin .pa{ font-size:36px; line-height:1; transform:scaleX(.7); }
.bin .st{ display:inline-flex; flex-direction:column; align-items:center; font-size:17px; line-height:1.15; margin:0 1px; }
.f.sach{ grid-template-columns:28px 1fr 26px; align-items:start; border:1px solid var(--line); padding:10px 10px; }
.f.sach .lab{ font-family:system-ui,Arial,sans-serif; font-weight:bold; font-size:16px; padding-top:1px; }
.f.sach .ins{ display:block; font-family:system-ui,Arial,sans-serif; font-size:15.5px; }
.stxt{ display:block; margin-bottom:8px; line-height:1.55; }
.wahl{ display:inline-flex; gap:6px; margin:0 14px 6px 0; vertical-align:middle; }
.wahl label{ border:1px solid #b8bdc6; border-radius:999px; padding:3px 12px; cursor:pointer; background:#fff; font-weight:600; white-space:nowrap; }
.wahl label:has(input:checked){ background:var(--lf); color:#fff; border-color:var(--lf); }
.wahl input{ position:absolute; opacity:0; pointer-events:none; }
.erg{ white-space:nowrap; }
.weg{ line-height:2; }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div class="term" id="term"></div>
    <div class="bereich" id="bereich"></div>
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
  <p class="hinweis">Ergebnisse als ganze Zahl eintragen, ohne Tausenderpunkte (z. B. 13983816).</p>
</div>`,
 init:function(root){

const MODEL='cw';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=R(0,i); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const fak=n=>{ let r=1; for(let i=2;i<=n;i++) r*=i; return r; };
const per=(n,k)=>{ let r=1; for(let i=0;i<k;i++) r*=(n-i); return r; };
const kom=(n,k)=>Math.round(per(n,k)/fak(k));
const tsd=v=>String(v).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const BIN=(n,k)=>`<span class="bin"><span class="pa">(</span><span class="st"><span>${n}</span><span>${k}</span></span><span class="pa">)</span></span>`;
const NAME={f:'n!',p:'nPr',c:'nCr'};
const BEF={f:(n)=>`${n}!`, p:(n,r)=>`${n} P ${r}`, c:(n,r)=>`${n} C ${r}`};
const WEG={
 dex:{f:'Zahl ▸ <span class="taste sh">SHIFT</span> <span class="taste"><i>x</i><sup>−1</sup></span> (x!) ▸ <span class="taste w">=</span>',
      p:'n ▸ <span class="taste sh">SHIFT</span> <span class="taste w">×</span> (nPr) ▸ r ▸ <span class="taste w">=</span>',
      c:'n ▸ <span class="taste sh">SHIFT</span> <span class="taste w">÷</span> (nCr) ▸ r ▸ <span class="taste w">=</span>'},
 cw:{f:'Zahl ▸ <span class="taste">CATALOG</span> Wahrscheinlichkeit ▸ x! ▸ <span class="taste">EXE</span>',
     p:'n ▸ <span class="taste">CATALOG</span> Wahrscheinlichkeit ▸ nPr ▸ r ▸ <span class="taste">EXE</span>',
     c:'n ▸ <span class="taste">CATALOG</span> Wahrscheinlichkeit ▸ nCr ▸ r ▸ <span class="taste">EXE</span>'}
}[MODEL];
// ---------- Modus 1–3: Rechnen ----------
function genRechnen(typ){
  const z=[], seen={};
  while(z.length<3){
    let n,r,v,lab;
    if(typ==='f'){ n=R(3,13); r=0; v=fak(n); lab=`${n}!`; }
    if(typ==='p'){ n=R(5,25); r=R(2,Math.min(5,n-1)); v=per(n,r); lab=`${n} <b>P</b> ${r}`; }
    if(typ==='c'){ n=pick([R(5,20),R(5,20),R(20,49)]); r=R(2,Math.min(6,n-2)); v=kom(n,r); lab=BIN(n,r); }
    if(v>=1e10||seen[n+'_'+r]) continue; seen[n+'_'+r]=1;
    z.push({id:'z'+z.length, lab, soll:v, n, r, typ});
  }
  const txt={f:'Berechnen Sie die Fakultäten mit dem Rechner.',p:'Berechnen Sie mit dem Rechner (nPr: Reihenfolge wichtig).',c:'Berechnen Sie die Binomialkoeffizienten mit dem Rechner (Reihenfolge egal). Rechnerbefehl: n C r.'}[typ];
  return {h:{f:'Fakultät n!',p:'Variation nPr',c:'Binomialkoeffizient nCr'}[typ], auftrag:txt, weg:WEG[typ], wahl:false,
    round:'<b>Tipp:</b> Ergebnisse sind ganze Zahlen. Ohne Punkte tippen, z.&nbsp;B. <b>5040</b>.', zeilen:z};
}
// ---------- Modus 4: Sachaufgaben ----------
const SACH=[
 ()=>{ const n=R(4,9); return {typ:'f',n,r:0,t:`${n} Personen stellen sich für ein Gruppenfoto in eine Reihe. Wie viele Reihenfolgen gibt es?`}; },
 ()=>{ const n=R(4,8); return {typ:'f',n,r:0,t:`Ein Pflegedienst plant ${n} Hausbesuche an einem Vormittag. Wie viele Reihenfolgen für die Besuche gibt es?`}; },
 ()=>{ const n=R(5,9); return {typ:'f',n,r:0,t:`${n} Bewerberinnen und Bewerber stellen sich nacheinander vor. Wie viele mögliche Reihenfolgen gibt es?`}; },
 ()=>{ const n=R(8,30); return {typ:'p',n,r:3,t:`Ein Verein hat ${n} Mitglieder. Gewählt werden Vorsitz, Stellvertretung und Kasse (jede Person höchstens ein Amt).`}; },
 ()=>{ const n=R(8,20), r=R(2,4); return {typ:'p',n,r,t:`Bei einem Wettbewerb mit ${n} Teams werden die Plätze 1 bis ${r} vergeben. Wie viele Siegerlisten sind möglich?`}; },
 ()=>{ const n=R(6,26), r=R(3,4); return {typ:'p',n,r,t:`Ein Code besteht aus ${r} verschiedenen Buchstaben aus ${n} vorgegebenen Buchstaben. Wie viele Codes gibt es?`}; },
 ()=>{ const n=R(6,15); return {typ:'p',n,r:3,t:`Für Einkauf, Kasse und Deko wird aus ${n} Freiwilligen je eine andere Person eingeteilt. Wie viele Einteilungen gibt es?`}; },
 ()=>{ const n=R(10,30), r=R(2,5); return {typ:'c',n,r,t:`Aus ${n} Auszubildenden werden ${r} für ein Projektteam ausgewählt. Wie viele Teams sind möglich?`}; },
 ()=>{ const n=R(12,25), r=R(3,6); return {typ:'c',n,r,t:`In einer Kita-Gruppe mit ${n} Kindern dürfen ${r} Kinder mit zum Ausflug. Wie viele Auswahlen gibt es?`}; },
 ()=>{ const n=R(8,20), r=R(2,5); return {typ:'c',n,r,t:`Ein Online-Shop stellt aus ${n} Produkten ein Testpaket mit ${r} Produkten zusammen. Wie viele Pakete sind möglich?`}; },
 ()=>{ const n=R(15,30); return {typ:'c',n,r:2,t:`In einer Klasse mit ${n} Personen gibt jede Person jeder anderen genau einmal die Hand. Wie oft werden Hände geschüttelt?`}; }
];
const wert=(typ,n,r)=>typ==='f'?fak(n):typ==='p'?per(n,r):kom(n,r);
function genSach(){
  const nach={f:[0,1,2],p:[3,4,5,6],c:[7,8,9,10]};
  const typen=shuffle(['f','p','c',pick(['p','c'])]).slice(0,3);
  const z=typen.map((typ,i)=>{ const A=SACH[pick(nach[typ])](); return {id:'z'+i, lab:'', text:A.t, soll:wert(A.typ,A.n,A.r), n:A.n, r:A.r, typ:A.typ}; });
  return {h:'Sachaufgaben', auftrag:'Entscheiden Sie zuerst: <b>n!</b> (alle in eine Reihenfolge), <b>nPr</b> (Auswahl, Reihenfolge wichtig) oder <b>nCr</b> (Auswahl, Reihenfolge egal). Dann rechnen.',
    weg:'n! &nbsp;·&nbsp; '+WEG.f+'<br>nPr · '+WEG.p+'<br>nCr · '+WEG.c, wahl:true,
    round:'<b>Merke:</b> Verschiedene Plätze, Ämter oder Positionen → <b>nPr</b>. Nur eine Gruppe → <b>nCr</b>.', zeilen:z};
}
const MODES={f:{name:'n!',gen:()=>genRechnen('f')},p:{name:'nPr',gen:()=>genRechnen('p')},c:{name:'nCr',gen:()=>genRechnen('c')},s:{name:'Sachaufgaben',gen:genSach}};
const ORDER=['f','p','c'];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function zeile(z){
  if(!A.wahl) return `<div class="f" id="f_${z.id}"><span class="lab">${z.lab}</span><span class="ins">= <input id="i_${z.id}" inputmode="numeric" autocomplete="off" placeholder="0"></span><span class="m"></span><div class="msg"></div></div>`;
  return `<div class="f sach" id="f_${z.id}"><span class="lab">${String.fromCharCode(97+ +z.id.slice(1))})</span><span class="ins"><span class="stxt">${z.text}</span>
    <span class="wahl" id="w_${z.id}">${['f','p','c'].map(t=>`<label><input type="radio" name="r_${z.id}" value="${t}"> ${NAME[t]}</label>`).join('')}</span>
    <span class="erg">Ergebnis: <input id="i_${z.id}" inputmode="numeric" autocomplete="off" placeholder="0"></span></span><span class="m"></span><div class="msg"></div></div>`;
}
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent='Aufgabe: '+A.h; $('auftrag').innerHTML=A.auftrag; $('term').innerHTML=''; $('weg').innerHTML=A.weg; $('bereich').innerHTML='';
  $('round').innerHTML=A.round;
  $('felder').innerHTML=A.zeilen.map(zeile).join('');
  $('score').textContent=''; $('stats').textContent=stat.a?`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`:'';
  root.querySelectorAll('.f input:not([type=radio])').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/[\s.']/g,''); if(!/^\d+$/.test(s)) return null; return parseInt(s,10); }
function pruefen(){
  let ok=0; const tot=A.zeilen.length;
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'+(A.wahl?' sach':''); m.textContent=''; msg.textContent='';
    const raw=$('i_'+z.id).value;
    const sel=A.wahl?(root.querySelector(`input[name="r_${z.id}"]:checked`)||{}).value:z.typ;
    if(!raw.trim()&&!(A.wahl&&sel)) return;
    if(A.wahl&&!sel){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Wählen Sie zuerst n!, nPr oder nCr.'; return; }
    const v=parse(raw);
    if(A.wahl&&sel!==z.typ){
      f.classList.add('no'); m.textContent='✗';
      msg.textContent = z.typ==='f' ? 'Hier werden alle in eine Reihenfolge gebracht – keine Auswahl. Das ist n!.'
        : z.typ==='p' ? 'Die Reihenfolge ist wichtig (verschiedene Plätze, Ämter oder Positionen). Das ist nPr.'
        : 'Die Reihenfolge ist egal – es entsteht nur eine Gruppe. Das ist nCr.';
      return;
    }
    if(v===null){ f.classList.add('fmt'); m.textContent='?'; msg.textContent=raw.trim()?'Bitte nur eine ganze Zahl eintragen, z. B. 5040.':'Tragen Sie noch das Ergebnis ein.'; return; }
    if(v===z.soll){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht. Prüfen Sie n und r und den Befehl.';
    if(z.typ==='c'&&v===per(z.n,z.r)) t='Das ist nPr. Hier ist die Reihenfolge egal → nCr.';
    else if(z.typ==='p'&&v===kom(z.n,z.r)) t='Das ist nCr. Hier zählt die Reihenfolge → nPr.';
    else if(z.typ!=='f'&&(v===wert(z.typ,z.r,z.n))) t='n und r vertauscht? Zuerst die große Zahl n, dann r.';
    msg.textContent=t;
  });
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), msg=f.querySelector('.msg');
    f.className='f show'+(A.wahl?' sach':''); f.querySelector('.m').textContent='';
    $('i_'+z.id).value=z.soll;
    if(A.wahl){ const r=root.querySelector(`input[name="r_${z.id}"][value="${z.typ}"]`); if(r) r.checked=true; }
    msg.textContent='Rechner: '+BEF[z.typ](z.n,z.r)+' = '+tsd(z.soll);
  });
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();

 }
};
