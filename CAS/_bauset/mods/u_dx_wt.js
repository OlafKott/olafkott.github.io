UEB["dx_wt"]={
 title:"Wertetabellen",
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
.f.ok{ background:var(--okbg); } .f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); } .f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); } .f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; font-family:system-ui,Arial,sans-serif; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); } .f.fmt .msg{ color:var(--warn); } .f.show .msg{ color:var(--mute); }
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
@media (max-width:520px){ .f{ grid-template-columns:1fr 26px; } .f .lab{ grid-column:1 / -1; } }`,
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
    <table class="loes" id="loes"></table>
  </div>
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Für das Minus können Sie - oder − tippen.</p>
</div>`,
 init:function(root){
const MODEL='dex';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[R(0,a.length-1)];
const r2=v=>{ const s=v<0?-1:1; return s*Math.round(Math.abs(v)*100+1e-7)/100; };
const de=(v,d=2)=>r2(v).toFixed(d).replace('.',',').replace('-','−');
const fmt=v=>String(Number(v.toPrecision(10))).replace('.',',').replace('-','−');
function termHTML(a,b,c){
  const sg=v=>v<0?' − ':' + ';
  const A=a===1?'':a===-1?'−':fmt(a);
  let s=`<i>f</i>(<i>x</i>) = ${A}<i>x</i><sup>2</sup>`;
  if(b) s+=sg(b)+(Math.abs(b)===1?'':fmt(Math.abs(b)))+'<i>x</i>';
  if(c) s+=sg(c)+fmt(Math.abs(c));
  return s;
}
const WEG={
 dex:'<span class="taste">MENU</span> <span class="taste w">9</span> ▸ Term mit <span class="taste"><i>x</i></span> eingeben ▸ <span class="taste w">=</span> ▸ Start <span class="taste w">=</span> ▸ Ende <span class="taste w">=</span> ▸ Inkre <span class="taste w">=</span> · Neue Funktion: <span class="taste b">AC</span> <span class="taste b">AC</span>, Term eingeben. Vorzeichen am Anfang mit <span class="taste">(−)</span>.',
 cw:'<span class="taste">FUNCTION</span> ▸ f(x) definieren ▸ Term <span class="taste">EXE</span> ▸ <span class="taste">TOOLS</span> ▸ Tabellenbereich ▸ Start, Ende, Schritt ▸ Ausführen <span class="taste">EXE</span> · Vorzeichen am Anfang mit <span class="taste sh">SHIFT</span> <span class="taste">−</span>.'
}[MODEL];
const SW=MODEL==='dex'?'Inkre':'Schritt';

// ---------- Modus 1: Tabelle ausfüllen ----------
function genTab(){
  const a=pick([0.5,-0.5,0.25,-0.25,1,-1,1.5,-1.5,2,0.75]);
  const b=pick([-3,-2,-1.5,-1,1,1.5,2,2.5,3,-2.5,0.5,-0.5]);
  const c=pick([-4,-3,-2,-1.5,-1,1,2,2.5,3,4,0.5]);
  const h=pick([1,1,0.5,2]);
  const s=h===2?pick([-4,-2,0]):h===0.5?pick([-1,-0.5,0,0.5,1]):pick([-3,-2,-1,0,1]);
  const xs=[0,1,2,3,4].map(i=>s+i*h);
  const f=x=>a*x*x+b*x+c;
  return {typ:'tab', h:"Wertetabelle ausfüllen", auftrag:"Erstellen Sie mit dem Rechner eine Wertetabelle für die Funktion <i>f</i> mit",
    term:termHTML(a,b,c), bereich:[["Start",s],["Ende",xs[4]],[SW,h]],
    round:'<b>Wichtig:</b> Funktionswerte auf <b>2 Stellen nach dem Komma</b> runden, z.&nbsp;B. <b>3,25</b> oder <b>−4,00</b>.',
    zeilen:xs.map((x,i)=>({id:'z'+i, x, soll:f(x), flip:f(-x)})), f, xs};
}
// ---------- Modus 2: Vorzeichenwechsel ----------
function genVz(){
  let a,b,c,s,xs,f,ys,vw;
  for(let n=0;n<500;n++){
    a=pick([0.5,-0.5,1,-1,0.25,-0.25]); b=pick([-3,-2,-1.5,-1,-0.5,0.5,1,1.5,2,3]); c=pick([-4,-3.5,-3,-2.5,-2,-1.5,1.5,2,2.5,3]);
    s=pick([-5,-4,-3]); xs=Array.from({length:10},(_,i)=>s+i);
    f=x=>a*x*x+b*x+c; ys=xs.map(f);
    if(ys.some(y=>Math.abs(y)<1e-9)) continue;
    vw=[]; for(let i=1;i<ys.length;i++) if(ys[i-1]*ys[i]<0) vw.push(i);
    if(vw.length===2) break;
  }
  return {typ:'vz', h:"Vorzeichenwechsel finden", auftrag:"Erstellen Sie eine Wertetabelle für die Funktion <i>f</i> mit",
    term:termHTML(a,b,c), bereich:[["Start",xs[0]],["Ende",xs[xs.length-1]],[SW,1]],
    round:'<b>Gesucht:</b> Zwischen welchen x-Werten der Tabelle wechselt <i>f</i>(<i>x</i>) das Vorzeichen? Dort liegen die <b>Nullstellen</b>.',
    zeilen:vw.map((i,j)=>({id:'v'+j, nr:j+1, von:xs[i-1], bis:xs[i]})), f, xs, vw};
}

const MODES={tab:{name:"Tabelle ausfüllen",gen:genTab}, vz:{name:"Vorzeichenwechsel",gen:genVz}};
const ORDER=["tab","vz"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent="Aufgabe: "+A.h; $('auftrag').innerHTML=A.auftrag; $('term').innerHTML=A.term; $('weg').innerHTML=WEG;
  $('bereich').innerHTML=A.bereich.map(([n,v])=>`<span>${n}: <b>${fmt(v)}</b></span>`).join('');
  $('round').innerHTML=A.round;
  $('felder').innerHTML=A.zeilen.map(z=> A.typ==='vz' ?
    `<div class="f" id="f_${z.id}"><span class="lab">${z.nr}. Wechsel</span><span class="ins">zwischen <input class="xs" id="a_${z.id}" inputmode="decimal" autocomplete="off" placeholder="x"> und <input class="xs" id="b_${z.id}" inputmode="decimal" autocomplete="off" placeholder="x"></span><span class="m"></span><div class="msg"></div></div>` :
    `<div class="f" id="f_${z.id}"><span class="lab"><i>x</i> = ${fmt(z.x)}</span><span class="ins"><i>f</i>(${fmt(z.x)}) = <input id="i_${z.id}" inputmode="decimal" autocomplete="off" placeholder="0,00"></span><span class="m"></span><div class="msg"></div></div>`).join('');
  $('score').textContent=''; $('loes').className='loes'; $('loes').innerHTML='';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
const near=(a,b)=>Math.abs(a-b)<0.0051;
function pruefen(){
  let ok=0, tot=A.zeilen.length;
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    if(A.typ==='vz'){
      const ra=$('a_'+z.id).value, rb=$('b_'+z.id).value;
      if(!ra.trim()&&!rb.trim()) return;
      const pa=parse(ra), pb=parse(rb);
      if(!pa||!pb){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte zwei x-Werte aus der Tabelle eintragen.'; return; }
      const lo=Math.min(pa.v,pb.v), hi=Math.max(pa.v,pb.v);
      if(Math.abs(lo-z.von)<1e-9&&Math.abs(hi-z.bis)<1e-9){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
      f.classList.add('no'); m.textContent='✗';
      const other=A.zeilen.find(w=>w!==z&&Math.abs(lo-w.von)<1e-9&&Math.abs(hi-w.bis)<1e-9);
      msg.textContent= other ? `Das ist der ${other.nr}. Vorzeichenwechsel. Hier ist der ${z.nr}. gesucht (von oben gelesen).`
        : (hi-lo>1.0001 ? 'Geben Sie zwei benachbarte x-Werte der Tabelle an.' : 'Hier wechselt das Vorzeichen nicht. Vergleichen Sie die Vorzeichen der f(x)-Werte Zeile für Zeile.');
      return;
    }
    const raw=$('i_'+z.id).value;
    if(!raw.trim()) return;
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 3,25.'; return; }
    const soll=r2(z.soll), richtig=near(p.v,soll);
    if(p.dec!==2){ f.classList.add('fmt'); m.textContent='!'; msg.textContent=`Bitte genau 2 Stellen nach dem Komma eintragen${richtig||Math.abs(p.v-z.soll)<0.01?' – der Wert selbst stimmt.':'.'}`; return; }
    if(richtig){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht. Prüfen Sie den Term und den Tabellenbereich (Start, Ende, '+SW+').';
    if(Math.abs(p.v-z.soll)<0.011) t='Fast: Achten Sie auf das Runden (ab 5 aufrunden).';
    else if(near(p.v,r2(z.flip))) t='Das ist der Wert für −x. Prüfen Sie Start und Vorzeichen – negative Zahlen mit '+(MODEL==='dex'?'(−)':'SHIFT −')+'.';
    else if(A.zeilen.some(w=>w!==z&&near(p.v,r2(w.soll)))) t='Dieser Wert gehört zu einem anderen x-Wert. Ist die Schrittweite richtig eingestellt?';
    else if(near(p.v,-soll)) t='Das Vorzeichen stimmt nicht. Haben Sie das Minus am Anfang des Terms richtig eingegeben?';
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
    if(A.typ==='vz'){ $('a_'+z.id).value=fmt(z.von); $('b_'+z.id).value=fmt(z.bis);
      msg.textContent=`f(${fmt(z.von)}) = ${fmt(A.f(z.von))} und f(${fmt(z.bis)}) = ${fmt(A.f(z.bis))} – das Vorzeichen wechselt.`; return; }
    $('i_'+z.id).value=de(z.soll);
    msg.textContent = Math.abs(z.soll-r2(z.soll))>1e-9 ? 'Rechner: '+fmt(z.soll)+' → gerundet '+de(z.soll) : 'Genau '+de(z.soll);
  });
  const vwx=A.typ==='vz'?A.vw:[];
  $('loes').innerHTML='<tr><th><i>x</i></th><th><i>f</i>(<i>x</i>)</th></tr>'+A.xs.map((x,i)=>`<tr><td>${fmt(x)}</td><td class="${vwx.includes(i)||vwx.includes(i+1)?'vw':''}">${fmt(A.f(x))}</td></tr>`).join('');
  $('loes').className='loes zeig';
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();
 }
};
