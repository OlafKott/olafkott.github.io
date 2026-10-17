UEB["int"]={
 title:"Integrale",
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
.int{ display:inline-flex; align-items:center; font-family:Cambria,Georgia,serif; font-size:22px; vertical-align:middle; }
.int .s{ font:38px 'Times New Roman',serif; line-height:1; }
.int .lm{ display:inline-flex; flex-direction:column; justify-content:space-between; height:48px; font-size:14px; margin:0 5px 0 -2px; line-height:1; }
.int.k{ font-size:17px; }
.int.k .s{ font-size:28px; }
.int.k .lm{ height:34px; font-size:11.5px; }
.f .lab{ font-size:16px; }
.f .ins sub{ font-size:12px; vertical-align:sub; }`,
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
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Für das Minus können Sie - oder − tippen.</p>
</div>`,
 init:function(root){

const MODEL='cw';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const r2=v=>{ const s=v<0?-1:1; return s*Math.round(Math.abs(v)*100+1e-7)/100; };
const de=(v,d=2)=>{ const x=r2(v); return (Math.abs(x)<1e-9?0:x).toFixed(d).replace('.',',').replace('-','−'); };
const fmt=v=>String(Number(v.toPrecision(10))).replace('.',',').replace('-','−');
// Polynom c=[c3,c2,c1,c0]
function termHTML(c,name){
  const pw=['<i>x</i><sup>3</sup>','<i>x</i><sup>2</sup>','<i>x</i>',''];
  let s='', first=true;
  c.forEach((v,i)=>{ if(!v) return; const a=Math.abs(v);
    const coef=(a===1&&i<3)?'':fmt(a);
    s+= first ? (v<0?'−':'')+coef+pw[i] : (v<0?' − ':' + ')+coef+pw[i]; first=false; });
  return (name?`<i>${name}</i>(<i>x</i>) = `:'')+(s||'0');
}
const val=(c,x)=>((c[0]*x+c[1])*x+c[2])*x+c[3];
const F=(c,x)=>c[0]*x**4/4+c[1]*x**3/3+c[2]*x*x/2+c[3]*x;
const integ=(c,a,b)=>F(c,b)-F(c,a);
const LIM=v=>typeof v==='number'?fmt(v):v;
const INT=(a,b,f,k)=>`<span class="int${k?' k':''}"><span class="s">∫</span><span class="lm"><span>${LIM(b)}</span><span>${LIM(a)}</span></span><span>${f}&nbsp;d<i>x</i></span></span>`;
const WEG={
 dex:'<span class="taste">MENU</span> <span class="taste w">1</span> ▸ <span class="taste">∫▢</span> ▸ Funktion ▸ <span class="taste">▶</span> untere Grenze ▸ <span class="taste">▶</span> obere Grenze ▸ <span class="taste sh">SHIFT</span> <span class="taste w">=</span> (≈) · Vorzeichen mit <span class="taste">(−)</span>, <i>x</i>³ mit <span class="taste sh">SHIFT</span> <span class="taste"><i>x</i>²</span>.',
 cw:'<span class="taste">CATALOG</span> ▸ Funktionsanalyse ▸ Integration(∫) ▸ Funktion ▸ <span class="taste">▼</span> untere Grenze ▸ <span class="taste">▲</span> obere Grenze ▸ <span class="taste sh">SHIFT</span> <span class="taste">EXE</span> (≈) · Vorzeichen mit <span class="taste sh">SHIFT</span> <span class="taste">−</span>.'
}[MODEL];
const NEG=MODEL==='dex'?'(−)':'SHIFT −';

// ---------- Modus 1: Integral berechnen ----------
function genInt(){
  let c,a,b,v;
  for(let n=0;n<300;n++){
    const kub=Math.random()<0.35;
    c=[kub?pick([0.5,-0.5,1,-1,0.25]):0, pick([0.5,-0.5,1,-1,1.5,-1.5,2,-2,0.3,-0.3,3]), pick([0,1,-1,2,-2,3,-3,4,-4,0.5]), pick([0,1,2,3,4,5,-1,-2,-3,6])];
    a=pick([-2,-1,0,0,1,1,2]); b=a+pick([1,2,2,3,3,4]);
    v=integ(c,a,b);
    if(Math.abs(v)>0.05 && Math.abs(v)<150) break;
  }
  return {typ:'int', h:"Integral berechnen", auftrag:"Berechnen Sie mit dem Rechner:",
    show:INT(a,b,'('+termHTML(c)+')'),
    round:'<b>Wichtig:</b> Ergebnis auf <b>2 Stellen nach dem Komma</b> runden, z.&nbsp;B. <b>6,33</b> oder <b>−4,00</b>.',
    zeilen:[{id:'i0', lab:'Ergebnis', vor:INT(a,b,'('+termHTML(c)+')',1)+' =', soll:v, swap:-v}], c, a, b};
}
const MODES={int:{name:"Integral berechnen",gen:genInt}};
const ORDER=["int"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').style.display=ORDER.length>1?'flex':'none';
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent="Aufgabe: "+A.h; $('auftrag').innerHTML=A.auftrag; $('term').innerHTML=A.show; $('weg').innerHTML=WEG;
  $('bereich').innerHTML=A.bereich?`<span>${A.bereich}</span>`:'';
  $('round').innerHTML=A.round;
  $('felder').innerHTML=A.zeilen.map(z=>`<div class="f" id="f_${z.id}"><span class="lab">${z.lab}</span><span class="ins">${z.vor} <input id="i_${z.id}" inputmode="decimal" autocomplete="off" placeholder="0,00"> ${z.nach||''}</span><span class="m"></span><div class="msg"></div></div>`).join('');
  $('score').textContent=''; $('stats').textContent=stat.a?`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`:'';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
const near=(a,b)=>Math.abs(a-b)<0.0051;
function pruefen(){
  let ok=0, tot=A.zeilen.length;
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    const raw=$('i_'+z.id).value; if(!raw.trim()) return;
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 6,33.'; return; }
    const soll=r2(z.soll), richtig=near(p.v,soll);
    if(p.dec!==2){ f.classList.add('fmt'); m.textContent='!'; msg.textContent=`Bitte genau 2 Stellen nach dem Komma eintragen${richtig||Math.abs(p.v-z.soll)<0.01?' – der Wert selbst stimmt.':'.'}`; return; }
    if(richtig){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht. Prüfen Sie die Funktion und beide Grenzen.';
    if(Math.abs(p.v-z.soll)<0.011) t='Fast: Achten Sie auf das Runden (ab 5 aufrunden).';
    else if(near(p.v,-soll)) t='Das Vorzeichen stimmt nicht. Sind untere und obere Grenze vertauscht? Oder fehlt ein Minus ('+NEG+')?';
    msg.textContent=t;
  });
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), msg=f.querySelector('.msg');
    f.className='f show'; f.querySelector('.m').textContent='';
    $('i_'+z.id).value=de(z.soll);
    msg.textContent='Rechner: '+fmt(z.soll)+(Math.abs(z.soll-r2(z.soll))>1e-9?' → gerundet '+de(z.soll):'');
  });
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();

 }
};
