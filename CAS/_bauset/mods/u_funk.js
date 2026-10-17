UEB["funk"]={
 title:"Funktionswerte berechnen",
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
.f.ok{ background:var(--okbg); } .f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); } .f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); } .f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; font-family:system-ui,Arial,sans-serif; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); } .f.fmt .msg{ color:var(--warn); } .f.show .msg{ color:var(--mute); }
.f .swatch{ display:inline-block; width:12px; height:12px; border-radius:50%; margin-right:6px; vertical-align:middle; }
.btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.btns button{ font:inherit; font-size:15.5px; padding:9px 18px; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:#fff; }
.btns button.go{ background:var(--lf); border-color:var(--lf); color:#fff; }
.score{ font-size:16px; font-weight:bold; margin-top:12px; min-height:24px; }
.stats{ font-size:13.5px; color:var(--mute); margin-top:4px; }
.hinweis{ font-size:13.5px; color:var(--mute); }
svg.gr{ width:100%; max-width:620px; height:auto; display:block; margin:6px 0 4px; }
@media (max-width:520px){ .f{ grid-template-columns:1fr 26px; } .f .lab{ grid-column:1 / -1; } }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div class="term" id="term"></div>
    <div id="bild"></div>
    <div class="weg" id="weg"></div>
  </div>
  <div class="card">
    <div class="round"><b>Wichtig:</b> Funktionswerte auf <b>2 Stellen nach dem Komma</b> runden, z.&nbsp;B. <b>3,27</b> oder <b>−4,00</b>.</div>
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
const de=(v,d=2)=>{ const s=r2(v).toFixed(d).replace('.',','); return s.replace('-','−'); };
// Zahlen als {v, html}
const N=(v,html)=>({v,html:html||String(v).replace('.',',').replace('-','−')});
const FR=(p,q)=>N(p/q,(p<0?'−':'')+`<span class="fr"><span>${Math.abs(p)}</span><span>${q}</span></span>`);
const TERM_A=[N(-0.5),N(0.5),N(-0.25),N(0.25),N(0.4),N(-0.4),N(0.75),N(-0.75),N(1.5),N(-1.2),N(0.2),N(-0.6)];
const TERM_B=[FR(2,3),FR(-2,3),FR(3,4),FR(-3,4),FR(3,5),FR(-1,3),N(1.2),N(-1.5),N(2),N(-3),N(2.4),N(-0.8)];
const TERM_C=[N(1),N(2),N(3),N(-1),N(-2),N(4),N(2.5),N(-1.5),N(0.5),N(5)];
const XS={ganz:[2,3,4,1,5],neg:[-1,-2,-3,-4,-5],dez:[0.5,0.8,1.5,2.5,-0.5,-1.5,1.2,-2.5,3.5],frac:[[1,3],[2,3],[-1,3],[1,4],[-1,2],[3,4],[-2,3],[1,5]]};
function termHTML(a,b,c,fn){
  const sg=v=>v<0?' − ':' + ';
  const abs=n=>({v:Math.abs(n.v),html:n.html.replace(/^−/,'')});
  return `<i>${fn}</i>(<i>x</i>) = ${a.html}<i>x</i><sup>2</sup>${sg(b.v)}${abs(b).html}<i>x</i>${sg(c.v)}${abs(c).html}`;
}
const WEG={
 dex:{
  tab:'<span class="taste">MENU</span> <span class="taste w">1</span> ▸ Term mit <span class="taste"><i>x</i></span> eingeben ▸ <span class="taste">CALC</span> ▸ x-Wert <span class="taste w">=</span> ▸ <span class="taste">S⇔D</span> · Nächster Wert: wieder <span class="taste">CALC</span>',
  neu:'Neue Funktion: <span class="taste">AC</span> und neuen Term eingeben. Vorzeichen am Anfang mit <span class="taste">(−)</span>.'},
 cw:{
  tab:'<span class="taste">FUNCTION</span> ▸ f(x) definieren ▸ Term <span class="taste">EXE</span> ▸ <span class="taste">FUNCTION</span> ▸ f(x) ▸ x-Wert <span class="taste">)</span> ▸ <span class="taste sh">SHIFT</span> <span class="taste">EXE</span>',
  neu:'Neue Funktion: einfach wieder <b>f(x) definieren</b> – die alte wird überschrieben. Vorzeichen am Anfang mit <span class="taste sh">SHIFT</span> <span class="taste">−</span>.'}
}[MODEL];

// ---------- Modus 1: Wertetabelle ----------
function genTab(){
  const a=pick(TERM_A), b=pick(TERM_B), c=pick(TERM_C);
  const f=x=>a.v*x*x+b.v*x+c.v;
  const fq=pick(XS.frac);
  const xs=[N(pick(XS.ganz)),N(pick(XS.neg)),N(pick(XS.dez.filter(v=>Math.abs(v)!==1.5||true))),FR(fq[0],fq[1])];
  return {typ:'tab', h:"Funktionswerte berechnen", auftrag:"Gegeben ist die Funktion <i>f</i> mit",
    term:termHTML(a,b,c,'f'), bild:'', weg:WEG.tab+'<br>'+WEG.neu,
    zeilen:xs.map((x,i)=>({id:'z'+i, x, soll:f(x.v), flip:f(-x.v)}))};
}

// ---------- Modus 2: Am Graphen ----------
const COL=['#7B3FA0','#1F4E99','#C8590A'];
function genGr(){
  let a,p,q,xs,ys;
  do{
    a=pick([0.5,-0.5,0.25,-0.25,1,-1,0.75]); p=pick([2,2.5,3,3.5,4,4.5]); q=a>0?pick([-3,-2.5,-2,-1.5,-1]):pick([2,2.5,3,3.5,4]);
    const cand=[]; for(let k=-0.5;k<=7.5;k+=0.5) if(Math.abs(k-p)>0.4) cand.push(k);
    xs=[]; while(xs.length<3){ const k=pick(cand); if(!xs.includes(k)&&xs.every(v=>Math.abs(v-k)>=1)) xs.push(k); }
    ys=xs.map(x=>a*(x-p)**2+q);
    var bb=-2*a*p, cc=a*p*p+q;
  }while(Math.abs(bb*100-Math.round(bb*100))>1e-9 || Math.abs(cc*100-Math.round(cc*100))>1e-9 || ys.some(y=>y<-3.6||y>5.6) || new Set(ys.map(y=>Math.round(y*8))).size<3 || ys.some((y,i)=>ys.some((z,j)=>i!==j&&Math.abs(y-z)<0.9)));
  const b=-2*a*p, c=a*p*p+q;
  const g=x=>a*x*x+b*x+c;
  const nA=a===1?N(1,''):a===-1?N(-1,'−'):N(a), nB=N(r2(b)), nC=N(r2(c));
  return {typ:'gr', h:"Funktionswerte am Graphen", auftrag:"Gegeben ist die Funktion <i>g</i> mit",
    term:termHTML(nA,nB,nC,'g'), bild:graph(g,xs), weg:WEG.tab.replace(/f\(x\)/g,'g(x)')+'<br>Lesen Sie die markierten x-Werte am Graphen ab und berechnen Sie die Funktionswerte.',
    zeilen:xs.map((x,i)=>({id:'g'+i, x:N(x), soll:g(x), col:COL[i], ablesen:true}))};
}
function graph(g,xs){
  const W=620,H=330, X0=40, UX=(W-60)/9.6, Y0=14, UY=(H-34)/9.6;
  const X=x=>X0+(x+1)*UX, Y=y=>Y0+(5.8-y)*UY;
  let s=`<svg class="gr" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Arial,sans-serif">`;
  s+=`<defs><clipPath id="cp"><rect x="${X(-1)}" y="${Y(5.8)}" width="${X(8.6)-X(-1)}" height="${Y(-3.8)-Y(5.8)}"/></clipPath><marker id="ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d1d1f"/></marker></defs>`;
  for(let k=-1;k<=8.6;k+=0.5) s+=`<line x1="${X(k)}" y1="${Y(5.8)}" x2="${X(k)}" y2="${Y(-3.8)}" stroke="#e3e6ea" stroke-width="${k%1?0.6:1}"/>`;
  for(let k=-3.5;k<=5.6;k+=0.5) s+=`<line x1="${X(-1)}" y1="${Y(k)}" x2="${X(8.6)}" y2="${Y(k)}" stroke="#e3e6ea" stroke-width="${k%1?0.6:1}"/>`;
  s+=`<line x1="${X(-1)}" y1="${Y(0)}" x2="${X(8.6)+8}" y2="${Y(0)}" stroke="#1d1d1f" stroke-width="1.4" marker-end="url(#ak)"/>`;
  s+=`<line x1="${X(0)}" y1="${Y(-3.8)}" x2="${X(0)}" y2="${Y(5.8)-8}" stroke="#1d1d1f" stroke-width="1.4" marker-end="url(#ak)"/>`;
  s+=`<text x="${X(8.6)+6}" y="${Y(0)+16}" font-size="14" font-style="italic" font-family="Cambria,Georgia,serif">x</text><text x="${X(0)+6}" y="${Y(5.8)-1}" font-size="14" font-style="italic" font-family="Cambria,Georgia,serif">y</text>`;
  for(let i=-1;i<=8;i++) if(i) s+=`<text x="${X(i)}" y="${Y(0)+14}" font-size="11" text-anchor="middle" fill="#333">${String(i).replace('-','−')}</text>`;
  for(let i=-3;i<=5;i++) if(i) s+=`<text x="${X(0)-5}" y="${Y(i)+4}" font-size="11" text-anchor="end" fill="#333">${String(i).replace('-','−')}</text>`;
  let pts=[]; for(let i=0;i<=300;i++){ const x=-1+9.6*i/300; pts.push(`${X(x).toFixed(1)},${Y(g(x)).toFixed(1)}`); }
  s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="#1d1d1f" stroke-width="2.2" clip-path="url(#cp)"/>`;
  xs.forEach((x,i)=>{ const y=g(x), c=COL[i];
    s+=`<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(y)}" stroke="${c}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
    s+=`<circle cx="${X(x)}" cy="${Y(0)}" r="4.5" fill="${c}"/><circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="${c}"/>`; });
  return s+'</svg>';
}

// ---------- Ablauf ----------
const MODES={tab:{name:"Wertetabelle",gen:genTab}, gr:{name:"Am Graphen",gen:genGr}};
const ORDER=["tab","gr"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent="Aufgabe: "+A.h; $('auftrag').innerHTML=A.auftrag; $('term').innerHTML=A.term; $('bild').innerHTML=A.bild; $('weg').innerHTML=A.weg;
  const fn=A.typ==='gr'?'g':'f';
  $('felder').innerHTML=A.zeilen.map(z=> z.ablesen ?
    `<div class="f" id="f_${z.id}"><span class="lab"><span class="swatch" style="background:${z.col}"></span>Punkt ${A.zeilen.indexOf(z)+1}</span><span class="ins"><i>${fn}</i>(<input class="xs" id="x_${z.id}" inputmode="decimal" autocomplete="off" placeholder="x">) = <input id="i_${z.id}" inputmode="decimal" autocomplete="off" placeholder="0,00"></span><span class="m"></span><div class="msg"></div></div>` :
    `<div class="f" id="f_${z.id}"><span class="lab"><i>x</i> = ${z.x.html}</span><span class="ins"><i>${fn}</i>(${z.x.html}) = <input id="i_${z.id}" inputmode="decimal" autocomplete="off" placeholder="0,00"></span><span class="m"></span><div class="msg"></div></div>`).join('');
  $('score').textContent='';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
const near=(a,b)=>Math.abs(a-b)<0.0051;
function pruefen(){
  let ok=0, tot=A.zeilen.length;
  A.zeilen.forEach(z=>{
    const f=$('f_'+z.id), raw=$('i_'+z.id).value, m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    if(z.ablesen){
      const px=parse($('x_'+z.id).value||'');
      if(!px){ if($('x_'+z.id).value.trim()||raw.trim()){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Tragen Sie zuerst den abgelesenen x-Wert ein.'; } return; }
      if(Math.abs(px.v-z.x.v)>1e-9){ f.classList.add('no'); m.textContent='✗'; msg.textContent='Der x-Wert stimmt nicht. Ein Kästchen ist 0,5 breit – lesen Sie genau unter dem Punkt auf der x-Achse ab.'; return; }
    }
    if(!raw.trim()) return;
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 3,27.'; return; }
    const soll=r2(z.soll), richtig=near(p.v,soll);
    if(p.dec!==2){ f.classList.add('fmt'); m.textContent='!'; msg.textContent=`Bitte genau 2 Stellen nach dem Komma eintragen${richtig||Math.abs(p.v-z.soll)<0.01?' – der Wert selbst stimmt.':'.'}`; return; }
    if(richtig){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht. Prüfen Sie den eingegebenen Term im Display.';
    if(Math.abs(p.v-z.soll)<0.011) t='Fast: Achten Sie auf das Runden (ab 5 aufrunden).';
    else if(z.flip!==undefined && near(p.v,r2(z.flip))) t='Das ist der Wert für das andere Vorzeichen von x. Für negative x-Werte '+(MODEL==='dex'?'die Taste (−)':'SHIFT −')+' benutzen.';
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
    if(z.ablesen) $('x_'+z.id).value=z.x.html;
    $('i_'+z.id).value=de(z.soll);
    f.className='f show'; f.querySelector('.m').textContent='';
    const ex=Math.round(z.soll*1e6)/1e6;
    msg.textContent = ex!==r2(z.soll) ? 'Rechner: '+String(Number(z.soll.toPrecision(10))).replace('.',',').replace('-','−')+' → gerundet '+de(z.soll) : 'Genau '+de(z.soll);
  });
  $('score').textContent='';
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();
 }
};
