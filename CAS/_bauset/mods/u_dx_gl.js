UEB["dx_gl"]={
 title:"Gleichungen lösen",
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
.f.ok{ background:var(--okbg); } .f.ok .m{ color:var(--ok); }
.f.no{ background:var(--nobg); } .f.no .m{ color:var(--no); }
.f.fmt{ background:var(--warnbg); } .f.fmt .m{ color:var(--warn); }
.f .msg{ grid-column:1 / -1; font-size:13.5px; display:none; }
.f.no .msg, .f.fmt .msg, .f.show .msg{ display:block; }
.f.no .msg{ color:var(--no); } .f.fmt .msg{ color:var(--warn); } .f.show .msg{ color:var(--mute); }
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
.hinweis{ font-size:13.5px; color:var(--mute); }`,
 html:String.raw`<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h"></h2>
    <p class="auftrag" id="auftrag"></p>
    <div id="daten"></div>
    <div class="spalten" id="spalten"></div>
  </div>
  <div class="card">
    <div class="round"><b>Wichtig:</b> Runden Sie auf <b>2 Stellen nach dem Komma</b>, z.&nbsp;B. <b>1,27</b>. Ganze Zahlen dürfen Sie ohne Komma eintragen. Gibt es weniger Lösungen, lassen Sie das Feld leer.</div>
    <div class="grid" id="felder"></div>
    <div class="umf" id="umf"></div>
    <div class="btns">
      <button class="go" id="pruefen">Prüfen</button>
      <button id="zeigen">Lösung anzeigen</button>
      <button id="neu">Neue Aufgabe ▶</button>
    </div>
    <div class="score" id="score"></div>
    <div class="stats" id="stats"></div>
  </div>
  <p class="hinweis">Komma oder Punkt sind beide erlaubt. Steht beim Rechner ein <i>i</i> im Ergebnis, hat die Gleichung keine Lösung: Anzahl 0 eintragen.</p>
</div>`,
 init:function(root){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const r2=v=>{ const s=v<0?-1:1; return s*Math.round(Math.abs(v)*100+1e-7)/100; };
const num=v=>{ const t=Number(r2(v).toFixed(2)); return String(t).replace('.',',').replace('-','−'); };
const T=(s,c='')=>`<span class="taste ${c}">${s}</span>`;
const X='<i>x</i>';
// Term a x² + b x + c schön schreiben
function term(a,b,c){
  const parts=[];
  const add=(k,v)=>{ if(Math.abs(k)<1e-12) return;
    const s=k<0?'−':'+', ab=Math.abs(k), kk=(ab===1&&v)?'':num(ab);
    parts.push([s,kk+v]); };
  add(a,X+'<sup>2</sup>'); add(b,X); add(c,'');
  if(!parts.length) return '0';
  return parts.map(([s,t],i)=>i===0?(s==='−'?'−':'')+t:` ${s} ${t}`).join('');
}
function lsg(a,b,c){ const D=b*b-4*a*c; if(D<-1e-12) return []; if(Math.abs(D)<1e-12) return [-b/(2*a)]; const s=Math.sqrt(D); return [(-b-s)/(2*a),(-b+s)/(2*a)].sort((p,q)=>p-q); }
const KQ=`${T('MENU','rd')} ▸ ${T('(−)')} (Gleichungen) ▸ ${T('2','w')} (Polynom) ▸ ${T('2','w')} (Grad) ▸ <i>a</i> ${T('=','w')} <i>b</i> ${T('=','w')} <i>c</i> ${T('=','w')} ▸ ${T('=','w')} ▸ ${T('=','w')} &nbsp;·&nbsp; Wurzel? ${T('S⇔D')}`;

// ---------------- Lineare Gleichungen
function genLin(){
  let a,b,c,d,x,txt;
  do{
    a=R(-6,9); c=R(-5,6); if(a===c||a===0) continue;
    if(Math.random()<0.4){ const k=R(2,5), m=R(-6,6); b=k*m; a=k; c=R(-4,4); if(a===c) continue;
      d=R(-12,12); txt=`${k}(${X} ${m<0?'−':'+'} ${Math.abs(m)}) = ${term(0,c,d)}`; }
    else { b=R(-12,12); d=R(-12,12); txt=`${term(0,a,b)} = ${term(0,c,d)}`; }
    x=(d-b)/(a-c);
  }while(a===c||a===0||!isFinite(x)||Math.abs(x)>20);
  return {typ:'lin', h:"Lineare Gleichung", auftrag:"Lösen Sie die Gleichung mit SOLVE.",
    daten:`<div class="gl">${txt}</div>`,
    spalten:`${T('MENU','rd')} ▸ ${T('1','w')} ▸ Gleichung eingeben – das „=“ mit ${T('ALPHA','rd')} ${T('CALC')} ▸ ${T('SHIFT','rd')} ${T('CALC')} ▸ ${T('=','w')}<br>Neue Gleichung: zuerst ${T('AC','')}`,
    felder:[["x","Lösung",X+" ="]], wert:{x}, anz:null};
}
// ---------------- Quadratische Gleichungen
function genQuad(){
  let a,b,c,k,L;
  do{ a=pick([1,1,2,-1,0.5,-0.5,3,-2]); b=R(-8,8); c=R(-10,10); L=lsg(a,b,c); }while(L.length===1||(L.length===2&&Math.max(...L.map(Math.abs))>25));
  k=Math.random()<0.4?R(-6,8):0; if(k===0&&Math.random()<0.5) k=0;
  const links=term(a,b,c+k), rechts=k?num(k):'0';
  const umf=k?umfTab(a,b,c+k,k):'';
  return {typ:'q', h:"Quadratische Gleichung", auftrag:k?"Bringen Sie die Gleichung zuerst auf die Form <i>a</i>"+X+"² + <i>b</i>"+X+" + <i>c</i> = 0. Lösen Sie sie dann im Gleichungsmodus.":"Lösen Sie die Gleichung im Gleichungsmodus.",
    daten:`<div class="gl">${links} = ${rechts}</div>`, spalten:KQ,
    felder:[["n","Anzahl der Lösungen","",true],["x1","kleinere Lösung",X+"<sub>1</sub> ="],["x2","größere Lösung",X+"<sub>2</sub> ="]],
    wert:{n:L.length,x1:L[0],x2:L[1]}, umf, falsch:k?lsg(a,b,c+k):null};
}
function umfTab(a,b,c0,y){
  const row=(l,r,bar)=>`<tr><td>${l}</td><td class="eq">=</td><td class="r">${r}</td><td>${bar?`<span class="bar">${bar}</span>`:''}</td></tr>`;
  const op=y<0?`+ ${num(-y)}`:`− ${num(y)}`;
  return `<b>Umformung:</b><table>${row(term(a,b,c0),num(y),op)}${row(term(a,b,c0)+` <span class="rot">${op}</span>`,`${num(y)} <span class="rot">${op}</span>`,'')}${row(term(a,b,c0-y),'0','')}</table>Neues <i>c</i> = ${num(c0)} ${op} = <b>${num(c0-y)}</b>`;
}
// ---------------- Gleichungen am Graphen
function graph(a,b,c,y,L){
  const xv=-b/(2*a), yv=c-b*b/(4*a);
  const xs=[xv-4.5,xv+4.5].concat(L); const x0=Math.floor(Math.min(...xs,-0.5)-0.5), x1=Math.ceil(Math.max(...xs,0.5)+0.5);
  const f=x=>a*x*x+b*x+c;
  let ylo=Math.min(0,y,yv)-1.5, yhi=Math.max(0,y,yv)+1.5;
  const W=600,H=300, px=x=>40+(x-x0)/(x1-x0)*(W-60), py=v=>20+(yhi-v)/(yhi-ylo)*(H-50);
  let s=`<svg class="graph" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,sans-serif"><defs><clipPath id="cp"><rect x="${px(x0)}" y="${py(yhi)}" width="${px(x1)-px(x0)}" height="${py(ylo)-py(yhi)}"/></clipPath><marker id="ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#1d1d1f"/></marker></defs>`;
  const st=(x1-x0)>14?2:1;
  for(let x=x0;x<=x1;x++) s+=`<line x1="${px(x)}" y1="${py(yhi)}" x2="${px(x)}" y2="${py(ylo)}" stroke="#e3e6ea"/>`;
  for(let v=Math.ceil(ylo);v<=yhi;v++) s+=`<line x1="${px(x0)}" y1="${py(v)}" x2="${px(x1)}" y2="${py(v)}" stroke="#e3e6ea"/>`;
  s+=`<line x1="${px(x0)}" y1="${py(0)}" x2="${px(x1)+12}" y2="${py(0)}" stroke="#1d1d1f" stroke-width="1.4" marker-end="url(#ak)"/>`;
  if(x0<0&&x1>0) s+=`<line x1="${px(0)}" y1="${py(ylo)}" x2="${px(0)}" y2="${py(yhi)-12}" stroke="#1d1d1f" stroke-width="1.4" marker-end="url(#ak)"/><text x="${px(0)+6}" y="${py(yhi)-4}" font-size="14" font-style="italic">y</text>`;
  s+=`<text x="${px(x1)+6}" y="${py(0)+18}" font-size="14" font-style="italic">x</text>`;
  for(let x=x0;x<=x1;x+=st) if(x!==0) s+=`<text x="${px(x)}" y="${py(0)+16}" font-size="12" text-anchor="middle" fill="#333">${String(x).replace('-','−')}</text>`;
  const pts=[]; for(let i=0;i<=200;i++){ const x=x0+(x1-x0)*i/200; pts.push(px(x).toFixed(1)+','+py(f(x)).toFixed(1)); }
  s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="#1d1d1f" stroke-width="2.4" clip-path="url(#cp)"/>`;
  s+=`<line x1="${px(x0)}" y1="${py(y)}" x2="${px(x1)}" y2="${py(y)}" stroke="#2E7D32" stroke-width="2" stroke-dasharray="7 5"/><text x="${px(x0)+4}" y="${py(y)-6}" font-size="14" fill="#2E7D32" font-weight="bold">y = ${num(y)}</text>`;
  return s+'</svg>';
}
function genGraph(){
  let a,xv,yv,y,b,c,L;
  do{ a=pick([1,-1,0.5,-0.5,0.25,-0.25]); xv=R(-2,5); yv=R(-4,5); b=-2*a*xv; c=a*xv*xv+yv;
      const up=a>0; const kein=Math.random()<0.25;
      y = kein ? (up?yv-R(1,3):yv+R(1,3)) : (up?yv+R(1,6):yv-R(1,6));
      L=lsg(a,b,c-y);
  }while(Math.abs(c)>12||Math.abs(y)>12);
  const g=`<i>g</i>(${X}) = ${term(a,b,c)}`;
  return {typ:'g', h:"Gleichung am Graphen", auftrag:`Gegeben ist die Funktion <i>g</i> mit`,
    daten:`<div class="gl">${g}</div><p class="auftrag">An welchen Stellen hat der Graph die Höhe <b>${num(y)}</b>? Lösen Sie die Gleichung</p><div class="gl">${term(a,b,c)} = ${num(y)}</div>`+graph(a,b,c,y,L),
    spalten:'Erst umformen (rechts muss 0 stehen), dann: '+KQ,
    felder:[["c","neues c (nach der Umformung)","<i>c</i> ="],["n","Anzahl der Lösungen","",true],["x1","kleinere Lösung",X+"<sub>1</sub> ="],["x2","größere Lösung",X+"<sub>2</sub> ="]],
    wert:{c:c-y,n:L.length,x1:L[0],x2:L[1]}, umf:umfTab(a,b,c,y), falsch:lsg(a,b,c), cAlt:c};
}
const MODES={lin:{name:"Lineare Gleichungen",gen:genLin}, q:{name:"Quadratische Gleichungen",gen:genQuad}, g:{name:"Gleichungen am Graphen",gen:genGraph}};
const ORDER=["lin","q","g"];
let mode=ORDER[0], A=null, stat={a:0,r:0};
const $=id=>root.getElementById(id);
function neu(){
  A=MODES[mode].gen();
  $('tabs').innerHTML=ORDER.map(k=>`<button class="${k===mode?'on':''}" data-m="${k}">${MODES[k].name}</button>`).join('');
  $('h').textContent="Aufgabe: "+A.h;
  $('auftrag').innerHTML=A.auftrag;
  $('daten').innerHTML=A.daten;
  $('spalten').innerHTML=A.spalten;
  $('felder').innerHTML=A.felder.map(([k,l,z,int])=>
    `<div class="f" id="f_${k}"><label for="i_${k}">${l} <span class="z">${z}</span></label><input id="i_${k}" inputmode="decimal" autocomplete="off" placeholder="${int?'0, 1 oder 2':'0,00'}"><span class="m"></span><div class="msg"></div></div>`).join('');
  $('umf').className='umf'; $('umf').innerHTML='';
  $('score').textContent='';
  root.querySelectorAll('.f input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace(',','.').replace('−','-'); if(!/^-?\d+(\.\d+)?$/.test(s)) return null; return {v:parseFloat(s), dec:(s.split('.')[1]||'').length}; }
function pruefen(){
  let ok=0; const tot=A.felder.length;
  A.felder.forEach(([k,l,z,int])=>{
    const f=$('f_'+k), raw=$('i_'+k).value, m=f.querySelector('.m'), msg=f.querySelector('.msg');
    f.className='f'; m.textContent=''; msg.textContent='';
    const soll=A.wert[k];
    if(!raw.trim()){
      if(soll===undefined){ f.classList.add('ok'); m.textContent='✓'; msg.textContent=''; ok++; }
      return;
    }
    const p=parse(raw);
    if(!p){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine Zahl eintragen, z. B. 1,27.'; return; }
    if(soll===undefined){ f.classList.add('no'); m.textContent='✗'; msg.textContent=A.wert.n===0?'Die Gleichung hat keine Lösung – Feld leer lassen.':'Es gibt nur eine Lösung – Feld leer lassen.'; return; }
    if(int){
      if(p.v===soll){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
      f.classList.add('no'); m.textContent='✗'; msg.textContent= soll===0?'Steht beim Rechner ein i im Ergebnis? Dann gibt es keine Lösung: 0.':'Zählen Sie die Lösungen x₁, x₂ auf dem Rechner.'; return;
    }
    const sollR=r2(soll);
    if(Math.abs(p.v-sollR)<0.0051 && p.dec<=2){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    if(Math.abs(p.v-soll)<0.06){ f.classList.add('fmt'); m.textContent='!'; msg.textContent='Fast – bitte genau auf 2 Nachkommastellen runden.'; return; }
    f.classList.add('no'); m.textContent='✗';
    let t='Das stimmt noch nicht.';
    const other=k==='x1'?A.wert.x2:k==='x2'?A.wert.x1:undefined;
    if(other!==undefined&&Math.abs(p.v-r2(other))<0.0051) t='Reihenfolge vertauscht: x₁ ist die kleinere, x₂ die größere Lösung.';
    else if(A.falsch&&(k==='x1'||k==='x2')&&A.falsch.some(v=>Math.abs(p.v-r2(v))<0.0051)) t='Haben Sie umgeformt? Rechts muss 0 stehen – das c ändert sich.';
    else if(k==='c'&&A.cAlt!==undefined&&Math.abs(p.v-A.cAlt)<0.0051) t='Das ist das alte c. Ziehen Sie den y-Wert auf beiden Seiten ab.';
    else if(k==='c') t='Neues c = altes c − y-Wert.';
    else if(A.typ==='lin'&&Math.abs(p.v+soll)<0.0051) t='Vorzeichen prüfen: Haben Sie (−) und − richtig benutzt?';
    msg.textContent=t;
  });
  stat.a++; if(ok===tot) stat.r++;
  $('score').innerHTML = ok===tot ? `<span style="color:var(--ok)">Alles richtig! ${ok} von ${tot}. Klicken Sie auf „Neue Aufgabe“.</span>` : `${ok} von ${tot} richtig.`;
  $('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  A.felder.forEach(([k,l,z,int])=>{
    const f=$('f_'+k), msg=f.querySelector('.msg');
    if(!f.classList.contains('ok')){ f.classList.add('show'); const v=A.wert[k]; msg.textContent='Lösung: '+(v===undefined?'– (Feld leer lassen)':int?v:num(v)); }
  });
  if(A.umf){ $('umf').innerHTML=A.umf; $('umf').className='umf on'; }
}
$('pruefen').onclick=pruefen; $('zeigen').onclick=zeigen; $('neu').onclick=neu;
$('tabs').onclick=e=>{ const m=e.target.dataset.m; if(m){ mode=m; neu(); } };
neu();
 }
};
