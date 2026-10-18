
// ---------- Eingabezeile (Buchstaben, Ziffern, Komma, Klammern) ----------
const SHOW={'*':'·','-':'−','neg':'−','/':'/'};
function Entry(){ this.root=[]; this.path=[{a:this.root}]; }
Entry.prototype.top=function(){ return this.path[this.path.length-1]; };
Entry.prototype.key=function(k){
  if(k==='del'){ this.root.pop(); return; }
  if(k==='right'||k==='left'||k==='up'||k==='down'||k==='ctrl') return;
  this.root.push(SHOW[k]||k);
};
Entry.prototype.html=function(caret){ return this.root.join('')+(caret!==false?'<span class="caret">|</span>':''); };
// Nach enter schreibt das CAS den Befehl mit großem C: binomCdf
const pretty=arr=>arr.join('').replace(/binomcdf/g,'binomCdf');

// ---------- Binomialverteilung ----------
function bcdf(n,p,a,b){
  if(!(Number.isInteger(n)&&n>=0)||!(p>=0&&p<=1)||!Number.isInteger(a)||!Number.isInteger(b)) return NaN;
  a=Math.max(a,0); b=Math.min(b,n); if(a>b) return 0;
  let s=0, q=1-p, pm;
  if(p===0) return a===0?1:0;
  if(p===1) return b===n?1:0;
  pm=Math.pow(q,n);
  for(let i=0;i<=b;i++){ if(i>=a) s+=pm; pm=pm*(n-i)/(i+1)*p/q; }
  return Math.min(1,s);
}
function fnOf(root){
  const t=root.join('').replace(/−/g,'-').replace(/binomcdf/g,'B');
  try{ const g=new Function('x','B','return '+t); return x=>{ try{ const v=g(x,bcdf); return typeof v==='number'?v:NaN; }catch(e){ return NaN; } }; }
  catch(e){ return ()=>NaN; }
}

// ---------- Graphs-App: Menüs ----------
const F1=['1.1'], O={doc:''};
const GM=["1: Aktionen","2: Ansicht","3: Graph-Eingabe/Bearbeitung","4: Fenster/Zoom","5: Spur","6: Graph analysieren","7: Tabelle","8: Geometrie","9: Einstellungen"];
const FZ=["1: Fenstereinstellungen","2: Zoom – Box","3: Zoom – Vergrößern","4: Zoom – Verkleinern","5: Zoom – Standard","6: Zoom – Quadrant 1","7: Zoom – Benutzer","8: Zoom – Trig","9: Zoom – Daten"];
const SP=["1: Grafikspur","2: Allgemeine Spur","3: Spurschritt"];
const GA=["1: Nullstelle","2: Minimum","3: Maximum","4: Schnittpunkt","5: Wendepunkt","6: dy/dx","7: Integral","8: Kegelschnitte analysieren","9: Grenzen"];
const TBM=["1: Tabelle mit geteiltem Bildschirm","2: Tabelle entfernen","3: Funktionseinstellungen bearbeiten"];
const SUB={"4":FZ,"5":SP,"6":GA,"7":TBM};
const TM=["1: Aktionen","2: Wertetabelle"];
const TW=["1: Spalte löschen","2: Wählen","3: Ausdruck bearbeiten","4: Tabelle entfernen","5: Funktionseinstellungen bearbeiten"];
const TOOLN={"1":"Nullstelle","2":"Minimum","3":"Maximum","4":"Schnittpunkt","5":"Wendepunkt"};
const COL={f1:'#1f4fb5', f2:'#c8102e', f3:'#2e7d32'};
const fmt3=v=>{ if(Math.abs(v)<5e-7) return '0'; return String(Number(v.toPrecision(3))).replace('-','−'); };
const num=v=>{ if(!isFinite(v)) return 'undef'; let s=(v!==0&&Math.abs(v)<1e-3)?v.toExponential(5).replace(/\.?0+e/,'e').replace('e','E').replace('+',''):String(Number(v.toPrecision(6))); return s.replace(/-/g,'−'); };
const DLGL=["XMin","XMax","XSkalierung","YMin","YMax","YSkalierung"];

// ---------- Graphs-App: Zustand ----------
function G0(){ return {win:{x0:-10,x1:10,y0:-6.67,y1:6.67}, fs:[], ent:{n:'f1',e:new Entry()}, menu:null, dlg:null, tool:null, pts:[], ctrl:false,
  split:false, foc:'g', start:0, step:1, top:0, cur:0, hl:null}; }
function bis(g,a,b){ let fa=g(a); for(let i=0;i<80;i++){ const m=(a+b)/2, fm=g(m); if((fa<=0)===(fm<=0)){ a=m; fa=fm; } else b=m; } return (a+b)/2; }
const tStep=w=>(w.x1-w.x0)/24;
function solveTool(S,lo,hi){
  const f=fnOf(S.fs[0].root), g=S.fs[1]?fnOf(S.fs[1].root):(()=>0);
  const x=bis(z=>f(z)-g(z),Math.min(lo,hi),Math.max(lo,hi));
  return {x, y:f(x)};
}
function simG(keys){
  const S=G0();
  for(const k of keys){
    if(S.menu){
      if(k==='esc'){ S.menu=null; continue; }
      const ctx=S.menu[0].ctx;
      if(S.menu.length===1){ S.menu[0].sel=+k-1; S.menu.push({items:ctx==='t'?(k==='2'?TW:[]):(SUB[k]||[]),sel:0,d:k}); continue; }
      const a=S.menu[1].d; S.menu=null;
      if(ctx==='t'){ if(a==='2'&&k==='5') S.dlg={typ:'tab',v:[num(S.start),num(S.step)],fo:0,fresh:true}; continue; }
      if(a==='4'&&k==='1'){ const w=S.win; S.dlg={typ:'win',v:[fmt3(w.x0),fmt3(w.x1),'Auto',fmt3(w.y0),fmt3(w.y1),'Auto'], fo:0, fresh:true}; }
      if(a==='6'){ const w=S.win, st=tStep(w); S.tool={t:k, ph:'lo', cx:w.x0+12*st, lo:null}; }
      if(a==='7'&&k==='1'){ S.split=true; S.foc='t'; S.top=0; S.cur=0; S.ent=null; }
      continue;
    }
    if(S.dlg){
      const D=S.dlg, n=D.typ==='win'?6:2;
      if(k==='tab'){ D.fo=(D.fo+1)%n; D.fresh=true; continue; }
      if(k==='enter'){ const p=s=>parseFloat(String(s).replace('−','-'));
        if(D.typ==='win') S.win={x0:p(D.v[0]),x1:p(D.v[1]),y0:p(D.v[3]),y1:p(D.v[4])};
        else { S.start=p(D.v[0]); S.step=p(D.v[1]); S.top=0; S.cur=0; }
        S.dlg=null; continue; }
      const ch=k==='neg'?'−':k; if(D.fresh){ D.v[D.fo]=''; D.fresh=false; } D.v[D.fo]+=ch; continue;
    }
    if(S.ctrl){ S.ctrl=false;
      if(k==='t'){ S.split=!S.split; S.top=0; S.cur=0; S.foc=S.split?'t':'g'; S.ent=null; }
      if(k==='tab'&&S.split){ S.foc=S.foc==='t'?'g':'t'; S.ent=null; }
      if(k==='g'){ S.ent=S.ent?null:{n:'f'+(S.fs.length+1), e:new Entry()}; }
      continue; }
    if(k==='ctrl'){ S.ctrl=true; continue; }
    if(S.ent){
      if(k==='enter'){ S.fs.push({n:S.ent.n, root:S.ent.e.root}); S.ent=null; continue; }
      S.ent.e.key(k); continue;
    }
    if(S.tool){
      const T=S.tool, st=tStep(S.win);
      if(k==='left'){ T.cx-=st; continue; } if(k==='right'){ T.cx+=st; continue; }
      if(k==='esc'){ S.tool=null; continue; }
      if(k==='click'||k==='enter'){ if(T.ph==='lo'){ T.lo=T.cx; T.ph='hi'; } else { S.pts.push(solveTool(S,T.lo,T.cx)); S.tool=null; } }
      continue;
    }
    if(k==='menu'){ const t=S.split&&S.foc==='t'; S.menu=[{items:t?TM:GM,sel:0,ctx:t?'t':'g'}]; continue; }
    if(S.split&&S.foc==='t'){
      if(k==='up'){ if(S.cur>0) S.cur--; else S.top--; continue; }
      if(k==='down'){ if(S.cur<9) S.cur++; else S.top++; continue; }
      continue;
    }
    if(k==='tab'){ S.ent={n:'f'+(S.fs.length+1), e:new Entry()}; continue; }
  }
  return S;
}

// ---------- Graphs-App: Bildschirm ----------
function plot(S,W,H,lab){
  const w=S.win, X=x=>(x-w.x0)/(w.x1-w.x0)*W, Y=y=>(w.y1-y)/(w.y1-w.y0)*H, ax='#555';
  let s=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0;overflow:hidden" font-family="Arial,Helvetica,sans-serif">`;
  if(w.y0<=0&&w.y1>=0){ const y=Math.min(H-1,Math.max(1,Y(0))); s+=`<line x1="0" y1="${y}" x2="${W-5}" y2="${y}" stroke="${ax}" stroke-width="1"/><path d="M${W} ${y} l-6 -3 v6z" fill="${ax}"/>`;
    const dt=(w.x1-w.x0)>4?1:0.1; for(let t=Math.ceil(w.x0/dt);t<=Math.floor(w.x1/dt);t++) if(t) s+=`<line x1="${X(t*dt)}" y1="${y-2}" x2="${X(t*dt)}" y2="${y+2}" stroke="${ax}"/>`;
    s+=`<text x="2" y="${y>12?y-3:y+10}" font-size="8" fill="#777">${fmt3(w.x0)}</text><text x="${W-2}" y="${y>H-12?y-3:y+10}" font-size="8" fill="#777" text-anchor="end">${fmt3(w.x1)}</text>`; }
  if(w.x0<=0&&w.x1>=0){ const x=Math.min(W-1,Math.max(1,X(0))); s+=`<line x1="${x}" y1="${H}" x2="${x}" y2="5" stroke="${ax}" stroke-width="1"/><path d="M${x} 0 l-3 6 h6z" fill="${ax}"/>`;
    const dt=(w.y1-w.y0)>4?1:0.1; for(let t=Math.ceil(w.y0/dt);t<=Math.floor(w.y1/dt);t++) if(t) s+=`<line x1="${x-2}" y1="${Y(t*dt)}" x2="${x+2}" y2="${Y(t*dt)}" stroke="${ax}"/>`;
    s+=`<text x="${x+4}" y="9" font-size="8" fill="#777">${fmt3(w.y1)}</text><text x="${x+4}" y="${H-3}" font-size="8" fill="#777">${fmt3(w.y0)}</text>`; }
  if(S.tool&&S.tool.lo!==null){ const a=Math.min(X(S.tool.lo),X(S.tool.cx)), b=Math.max(X(S.tool.lo),X(S.tool.cx));
    s+=`<rect x="${a}" y="0" width="${b-a}" height="${H}" fill="#cfd4db" opacity=".75"/>`; }
  S.fs.forEach((F,j)=>{
    const f=fnOf(F.root), col=COL[F.n]; let d='', pen=false, vis=false;
    for(let i=0;i<=W;i++){ const x=w.x0+(w.x1-w.x0)*i/W, y=f(x), py=Y(y);
      if(isFinite(py)&&py>-40&&py<H+40){ d+=(pen?'L':'M')+X(x).toFixed(1)+' '+py.toFixed(1)+' '; pen=true; if(py>=0&&py<=H) vis=true; } else pen=false; }
    if(d) s+=`<path d="${d}" fill="none" stroke="${col}" stroke-width="1.6"/>`;
    if(lab&&vis) s+=`<text x="${W-4}" y="${(S.ent?33:13)+j*12}" font-size="9.5" fill="${col}" text-anchor="end" stroke="#fff" stroke-width="3" paint-order="stroke">${F.n}(x)=${pretty(F.root)}</text>`;
  });
  S.pts.forEach(p=>{
    const px=X(p.x), py=Y(p.y);
    s+=`<circle cx="${px}" cy="${py}" r="2.6" fill="#000"/>`;
    const right=px<W-80; s+=`<text x="${right?px+5:px-5}" y="${py<30?py+13:py-6}" font-size="9.5" fill="#000" text-anchor="${right?'start':'end'}" stroke="#fff" stroke-width="3" paint-order="stroke">(${fmt3(p.x)},${fmt3(p.y)})</text>`;
  });
  if(S.tool){
    const T=S.tool, f=fnOf(S.fs[0].root), dot='stroke="#222" stroke-width="1.3" stroke-dasharray="1.5 2.2"';
    if(T.lo!==null) s+=`<line x1="${X(T.lo)}" y1="0" x2="${X(T.lo)}" y2="${H}" ${dot}/>`;
    s+=`<line x1="${X(T.cx)}" y1="0" x2="${X(T.cx)}" y2="${H}" ${dot}/>`;
    let cy=Y(f(T.cx)); if(!isFinite(cy)) cy=H/2; const cyy=Math.max(4,Math.min(H-24,cy)), hx=X(T.cx);
    if(S.pulse) s+=`<circle cx="${hx}" cy="${cyy}" r="${S.pulse}" fill="none" stroke="#F2B705" stroke-width="3"/>`;
    s+=`<g transform="translate(${hx-2.2} ${cyy}) scale(1.05)"><path d="M1 0c1.2 0 2 .8 2 2v5.3l1-.3c.8-.2 1.6.2 1.8 1l.2.8 1-.2c.8-.1 1.5.4 1.6 1.2l.1.6.8-.1c.8-.1 1.5.5 1.5 1.3v3c0 3-2 5-5 5h-2c-2 0-3.2-.8-4.2-2.4l-3-4.6c-.5-.8-.2-1.8.6-2.2.7-.4 1.6-.1 2 .6L-1 12V2c0-1.2.8-2 2-2z" fill="#fff" stroke="#000" stroke-width=".9" stroke-linejoin="round"/></g>`;
    if(S.pulse) s+=`<text x="${hx+14}" y="${cyy+8}" font-size="10" font-weight="bold" fill="#8a5a00" stroke="#fff" stroke-width="3" paint-order="stroke">Klick</text>`;
  }
  return s+'</svg>';
}
function entLine(S,W){
  return `<div style="position:absolute;left:0;width:${W}px;top:0;height:21px;background:#fff;border-bottom:1px solid #9aa5b3;display:flex;align-items:center;padding:0 5px;font-size:11.5px;z-index:2;white-space:nowrap;overflow:hidden"><span style="display:inline-flex;width:11px;height:11px;border:1px solid #1f4fb5;background:#1f4fb5;color:#fff;font-size:9px;line-height:11px;justify-content:center;margin-right:4px">✓</span><span style="color:${COL[S.ent.n]};margin-right:2px">${S.ent.n}(x)=</span><span style="flex:1;padding:0 3px;min-height:15px">${S.ent.e.html()}</span></div>`;
}
function tableHTML(S){
  const F=S.fs.map(E=>fnOf(E.root)), two=S.fs.length>1;
  let h=`<table class="sh wt ${two?'two':''}"><tr class="hd"><td class="rn"></td><td>x</td>`+S.fs.map(E=>`<td>${E.n}(x):=</td>`).join('')+'</tr>';
  h+='<tr class="ex"><td class="rn">▪</td><td></td>'+S.fs.map(E=>`<td>${pretty(E.root)}</td>`).join('')+'</tr>';
  for(let r=0;r<10;r++){
    const xv=Math.round((S.start+(S.top+r)*S.step)*1e9)/1e9;
    h+=`<tr class="${S.hl!==null&&S.hl.indexOf(xv)>=0?'hl':''}"><td class="rn">${r+1}</td><td class="${r===S.cur&&S.foc==='t'?'cur':''}">${num(xv)}</td>`+F.map(f=>`<td>${num(f(xv))}</td>`).join('')+'</tr>';
  }
  return h+'</table>';
}
function gScreen(S){
  let h=topbar(F1,'1.1',O.doc);
  const act='outline:2px solid #3b78c2;outline-offset:-2px;';
  if(!S.split){
    h+='<div style="position:absolute;left:0;right:0;top:16px;bottom:0">'+plot(S,280,194,true)+(S.ent?entLine(S,280):'')+'</div>';
  } else {
    h+=`<div style="position:absolute;left:0;width:139px;top:16px;bottom:0;overflow:hidden;border-right:1px solid #aab3bf;${S.foc==='g'?act:''}">`+plot(S,139,194,false)+(S.ent?entLine(S,139):'')+'</div>';
    h+=`<div style="position:absolute;left:140px;right:0;top:16px;bottom:0;overflow:hidden;${S.foc==='t'?act:''}">`+tableHTML(S)+'</div>';
  }
  if(S.tool) h+=`<div style="position:absolute;left:3px;bottom:3px;background:#fff;border:1px solid #555;padding:0 5px;font-size:10px;z-index:2"><b>${S.tool.ph==='lo'?'Untere':'Obere'} Schranke?</b> <span style="color:#8a5a00">(${S.tool.ph==='lo'?'Start':'Ende'})</span></div><div style="position:absolute;left:3px;top:19px;font-size:9px;color:#555;z-index:2">${TOOLN[S.tool.t]}</div>`;
  if(S.dlg&&S.dlg.typ==='win'){ const D=S.dlg; h+='<div class="dlg"><div class="tt">Fenstereinstellungen</div><div class="ff">'+DLGL.map((l,i)=>`<span class="lb">${l}:</span><span class="ct ${i===D.fo?'fo':''}">${D.v[i]}${i===D.fo&&!D.fresh?'<span class="caret">|</span>':''}</span>`).join('')+'</div><div class="bt"><span>OK</span><span>Abbrechen</span></div></div>'; }
  if(S.dlg&&S.dlg.typ==='tab'){ const D=S.dlg, f=i=>`<span class="ct ${D.fo===i?'fo':''}">${D.v[i]}${D.fo===i&&!D.fresh?'<span class="caret">|</span>':''}</span>`;
    h+=`<div class="dlg"><div class="tt">Funktionseinstellungen</div><div class="ff"><span class="lb">Tabellenanfang:</span>${f(0)}<span class="lb">Tabellenschritt:</span>${f(1)}<span class="lb">Unabhängig:</span><span class="ct">Auto ▾</span><span class="lb">Abhängig:</span><span class="ct">Auto ▾</span></div><div class="bt"><span>OK</span><span>Abbrechen</span></div></div>`; }
  if(S.menu) h+=menus(S.menu);
  return h;
}

// Bildschirm nach einer Tastenfolge (ab „Neues Dokument mit Graphs“)
const GS=(pre,keys,o)=>i=>{ const S=simG(pre.concat(keys.slice(0,i))); if(o&&i>=keys.length) Object.assign(S,o); return gScreen(S); };
const gAfter=(keys,o)=>()=>{ const S=simG(keys); if(o) Object.assign(S,o); return gScreen(S); };
const pick=arr=>i=>arr[Math.max(0,Math.min(i,arr.length)-1)];
const NEU=pick([appList(F1,'1.1',0,O.doc),gScreen(simG([]))]);

// ---------- Bereich mit dem Cursor markieren: Menü selbst wählen, Cursor-Bewegung abspielen ----------
const KP=K=>K.slice(0,3).concat(['play']);
const GP=(pre,K)=>i=>gScreen(simG(pre.concat(i<4?K.slice(0,i):K)));
let ANI=0;
const PLAYB='<p><button class="play" data-play="1" type="button">▶ Abspielen</button> <span class="playh">zeigt, wie Sie mit dem Cursor den Bereich markieren</span></p>';
function toolMarks(pre,K){ const S=simG(pre.concat(K.slice(0,3))), st=tStep(S.win); let cx=S.tool.cx, lo=null, hi=null; const c0=cx;
  for(const k of K.slice(3)){ if(k==='left') cx-=st; else if(k==='right') cx+=st; else if(k==='click'){ if(lo===null) lo=cx; else hi=cx; } }
  return {c0,lo,hi}; }
function playTool(){
  const T0=TRACKS[tr], S0=T0.steps[st]; if(!S0.full||lock) return;
  const stx=document.getElementById('stat');
  if(S0.k[pos]!=='play'){ if(stx&&pos<S0.k.length) stx.innerHTML='<span class="err">Wählen Sie zuerst im Menü das Werkzeug.</span> Drücken Sie jetzt: '+chip(S0.k[pos],pos).replace('now','now big'); return; }
  const id=++ANI, t0=tr, s0=st, pre=S0.pre, K=S0.full, M=toolMarks(pre,K), scr=document.getElementById('scr');
  const base=()=>simG(pre.concat(K.slice(0,3)));
  const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
  const glide=(a,b,lo)=>u=>{ const S=base(); S.tool.cx=a+(b-a)*ease(u); if(lo!==null){ S.tool.lo=lo; S.tool.ph='hi'; } return gScreen(S); };
  const hold=(x,lo,pl)=>u=>{ const S=base(); S.tool.cx=x; if(lo!==null){ S.tool.lo=lo; S.tool.ph='hi'; } if(pl) S.pulse=4+u*12; return gScreen(S); };
  const seg=[
    {d:900, f:hold(M.c0,null,false)},
    {d:2200, f:glide(M.c0,M.lo,null)},
    {d:900, f:hold(M.lo,null,true)},
    {d:600, f:hold(M.lo,M.lo,false)},
    {d:3000, f:glide(M.lo,M.hi,M.lo)},
    {d:900, f:hold(M.hi,M.lo,true)},
    {d:400, f:hold(M.hi,M.lo,false)}
  ];
  lock=true; if(stx) stx.innerHTML='<span>▶ Cursor-Bewegung läuft …</span>';
  let i=0, t1=null;
  function tick(ts){
    if(id!==ANI||tr!==t0||st!==s0){ lock=false; return; }
    if(t1===null) t1=ts;
    let u=(ts-t1)/seg[i].d; if(u>=1){ i++; t1=ts; u=0; }
    if(i>=seg.length){ lock=false; pos=S0.k.length; render(); return; }
    scr.innerHTML=seg[i].f(Math.min(u,1)); requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.getElementById('dd').addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('[data-play]'); if(b) playTool(); });
document.getElementById('stat').addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('.playc'); if(b) playTool(); });

// ---------- Tastenfolgen ----------
const KB=s=>s.split('').map(c=>c===' '?'space':c);           // Text → Tasten
const kNew=["1","2"];
const kFn=KB("binomcdf(x,0.3,1,x)").concat(["enter"]);
const kTn=["ctrl","t"];
const kFk=KB("binomcdf(50,0.3,0,x)").concat(["enter"]);
const kTk=["ctrl","t"];
const kAk=["menu","2","5","1","2","enter"];
const kFp=KB("binomcdf(20,x,0,5)").concat(["enter"]);
const kG2=["tab","0",".","8","enter"];
const kWin=["menu","4","1","0","tab","1","tab","tab","0","tab","1","enter"];
const kS=["menu","6","4"].concat(Array(9).fill("left"),["click"],Array(4).fill("right"),["click"]);
const n1=kFn, n2=n1.concat(kTn);
const q1=kFk, q2=q1.concat(kTk), q3=q2.concat(kAk);
const r1=kFp, r2=r1.concat(kG2), r3=r2.concat(kWin), r4=r3.concat(kS);

const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Handheld rechnen, Ergebnisse eintragen, dann <b>Weiter</b>.</p></div>`;
const CMD=t=>`<span class="cmd">${t}</span>`, CMS=t=>`<span class="cms">${t}</span>`;
const SYN='<p class="syn"><b>binomCdf(</b><i>n</i>, <i>p</i>, <i>untere Grenze</i>, <i>obere Grenze</i><b>)</b> = <i>P</i>(untere ≤ <i>X</i> ≤ obere)</p>';
const tblN=(rows,c)=>`<table class="vgl"><tr><th>${c}</th>${rows.map(r=>`<td${r[2]?' class="hl"':''}>${r[0]}</td>`).join('')}</tr><tr><th>Wert</th>${rows.map(r=>`<td${r[2]?' class="hl"':''}>${r[1]}</td>`).join('')}</tr></table>`;

const TRACKS={
 n:{ name:"n gesucht (Tabelle)", start:()=>home(''), steps:[
  {t:"Ansatz", a:"<i>p</i> = 0,3. Bestimmen Sie das kleinste <i>n</i> mit<br><i>P</i>(<i>X</i> ≥ 1) ≥ 0,95", k:[],
   d:"<p>Gesucht ist die Anzahl <i>n</i>. Im CAS wird <i>n</i> zur Variablen <b>x</b>.</p>"+SYN+"<p><i>P</i>(<i>X</i> ≥ 1): untere Grenze 1, obere Grenze <i>x</i>.</p><p>"+CMD("binomCdf(x,0.3,1,x)")+"</p>",
   n:"Obere Grenze ist <i>x</i>, weil <i>X</i> höchstens <i>n</i> sein kann."},
  {t:"Neues Dokument", a:"Neues Dokument mit Graphs-Seite", k:kNew, p:NEU,
   d:"<p><b>1</b> = Neues Dokument, dann <b>2</b> = Graphs.</p><p>Oben steht die Eingabezeile <b>f1(x)=</b>.</p>", n:"Ist schon ein Dokument offen, fragt das CAS, ob es speichern soll."},
  {t:"Funktion eingeben", a:"f1(x) = "+CMD("binomCdf(x,0.3,1,x)"), k:kFn, p:GS([],kFn),
   d:"<p>Tippen Sie <b>binomcdf(</b> mit den Buchstabentasten. Dann die Werte, getrennt durch <b>Kommas</b>. <b>enter</b>.</p><p>Das Menü Verteilungen gibt es nur im Calculator. In Graphs tippen Sie den Befehl einfach ein.</p><p>Im Graphen sehen Sie hier kaum etwas. Das ist egal: Wichtig ist die Tabelle.</p>",
   n:"Komma = Taste <b>,</b> links unten bei den Buchstaben. Dezimalzahlen mit <b>Punkt</b>: 0.3"},
  {t:"Tabelle einblenden", a:"Blenden Sie die Wertetabelle ein", k:kTn, p:GS(n1,kTn),
   d:"<p><b>ctrl + T</b> zeigt rechts die Wertetabelle.</p><p>Links stehen die Anzahlen <i>x</i> = <i>n</i>, rechts die Wahrscheinlichkeiten.</p>"},
  {t:"Ablesen", a:"Suchen Sie das kleinste <i>n</i> mit Wert ≥ 0,95", k:[], s:gAfter(n2,{hl:[9]}),
   d:"<p>Gehen Sie die Tabelle von oben nach unten durch. Gesucht ist der <b>erste</b> Wert, der 0,95 erreicht.</p>"+tblN([["7","0,9176"],["8","0,9424"],["9","0,9596",1],["10","0,9718"]],"<i>n</i>")+"<p>Ergebnis: <b><i>n</i> = 9</b></p>",
   n:"Steht die Lösung weiter unten: mit <b>▼</b> blättern oder den Tabellenanfang ändern (siehe Teil „k gesucht“)."},
  {t:"Selbst rechnen", k:[], ab:1, s:gAfter(n2), d:AB("Aufgabe 1",["CAS-Eingabe für <i>f</i>1 notieren","Werte aus der Tabelle eintragen","<i>n</i> bestimmen"])}
 ]},
 k:{ name:"k gesucht (Tabelle)", start:()=>home(''), steps:[
  {t:"Ansatz", a:"<i>n</i> = 50, <i>p</i> = 0,3. Bestimmen Sie das kleinste <i>k</i> mit<br><i>P</i>(<i>X</i> ≤ <i>k</i>) ≥ 0,9", k:[],
   d:"<p>Gesucht ist die Grenze <i>k</i>. Im CAS wird <i>k</i> zur Variablen <b>x</b>.</p>"+SYN+"<p><i>P</i>(<i>X</i> ≤ <i>x</i>): untere Grenze 0, obere Grenze <i>x</i>.</p><p>"+CMD("binomCdf(50,0.3,0,x)")+"</p>"},
  {t:"Neues Dokument", a:"Neues Dokument mit Graphs-Seite", k:kNew, p:NEU,
   d:"<p><b>1</b> = Neues Dokument, dann <b>2</b> = Graphs.</p>", n:"Fragt das CAS, ob es das alte Dokument speichern soll: <b>Nein</b>."},
  {t:"Funktion eingeben", a:"f1(x) = "+CMD("binomCdf(50,0.3,0,x)"), k:kFk, p:GS([],kFk),
   d:"<p><b>binomcdf(</b> tippen, dann <b>50 , 0.3 , 0 , x )</b> und <b>enter</b>.</p>"},
  {t:"Tabelle einblenden", a:"Blenden Sie die Wertetabelle ein", k:kTk, p:GS(q1,kTk),
   d:"<p><b>ctrl + T</b>. Die Tabelle beginnt bei 0.</p><p>Bei 0 bis 9 sind die Werte noch sehr klein. Die Lösung liegt weiter unten.</p>"},
  {t:"Tabellenanfang ändern", a:"Tabellenanfang 12, Tabellenschritt 1", k:kAk, p:GS(q2,kAk),
   d:"<p><b>menu ▸ 2: Wertetabelle ▸ 5: Funktionseinstellungen bearbeiten</b></p><p>Tabellenanfang <b>12</b> eintippen. Der Schritt 1 bleibt. <b>enter</b>.</p>",
   n:"Wo anfangen? Etwas unter dem Erwartungswert <i>n</i> · <i>p</i> = 15. Sie können auch einfach mit <b>▼</b> blättern."},
  {t:"Ablesen", a:"Suchen Sie das kleinste <i>k</i> mit Wert ≥ 0,9", k:[], s:gAfter(q3,{hl:[19]}),
   d:tblN([["17","0,7822"],["18","0,8594"],["19","0,9152",1],["20","0,9522"]],"<i>k</i>")+"<p>Bei 18 ist der Wert noch unter 0,9, bei 19 zum ersten Mal darüber.</p><p>Ergebnis: <b><i>k</i> = 19</b></p>",
   n:"Bei <i>P</i>(<i>X</i> ≥ <i>k</i>) lautet die Eingabe "+CMS("binomCdf(50,0.3,x,50)")+". Diese Werte werden nach unten <b>kleiner</b>. Gesucht ist dann meist das <b>größte</b> <i>k</i>, das die Bedingung noch erfüllt."},
  {t:"Selbst rechnen", k:[], ab:1, s:gAfter(q3), d:AB("Aufgabe 2",["CAS-Eingabe notieren","Werte aus der Tabelle eintragen","<i>k</i> bestimmen"])}
 ]},
 p:{ name:"p gesucht (Graph)", start:()=>home(''), steps:[
  {t:"Ansatz", a:"<i>n</i> = 20. Bestimmen Sie alle <i>p</i> mit<br><i>P</i>(<i>X</i> ≤ 5) ≥ 0,8", k:[],
   d:"<p>Jetzt ist <i>p</i> gesucht. Im CAS wird <i>p</i> zur Variablen <b>x</b>.</p>"+SYN+"<p>"+CMD("binomCdf(20,x,0,5)")+"</p><p>Die Grenze 0,8 wird die zweite Funktion. Gesucht ist der <b>Schnittpunkt</b> der beiden Graphen.</p>",
   n:"Eine Tabelle hilft hier wenig: <i>p</i> ist keine ganze Zahl."},
  {t:"Neues Dokument", a:"Neues Dokument mit Graphs-Seite", k:kNew, p:NEU,
   d:"<p><b>1</b> = Neues Dokument, dann <b>2</b> = Graphs.</p>", n:"Fragt das CAS, ob es das alte Dokument speichern soll: <b>Nein</b>."},
  {t:"Funktion eingeben", a:"f1(x) = "+CMD("binomCdf(20,x,0,5)"), k:kFp, p:GS([],kFp),
   d:"<p><b>binomcdf(</b> tippen, dann <b>20 , x , 0 , 5 )</b> und <b>enter</b>.</p><p>Der Graph ist noch sehr klein: Er liegt nur zwischen <i>x</i> = 0 und <i>x</i> = 1.</p>"},
  {t:"Grenze als 2. Funktion", a:"f2(x) = "+CMD("0.8"), k:kG2, p:GS(r1,kG2),
   d:"<p><b>tab</b> öffnet die Eingabezeile. Dort steht <b>f2(x)=</b>.</p><p><b>0.8</b> eintippen, <b>enter</b>. Das ist eine waagerechte Gerade.</p>"},
  {t:"Fenster einstellen", a:"Fenster: 0 ≤ <i>x</i> ≤ 1 und 0 ≤ <i>y</i> ≤ 1", k:kWin, p:GS(r2,kWin),
   d:"<p><b>menu ▸ 4: Fenster/Zoom ▸ 1: Fenstereinstellungen</b></p><p>XMin 0, XMax 1, YMin 0, YMax 1. Die Skalierung (Auto) mit einem zweiten <b>tab</b> überspringen. <b>enter</b>.</p>",
   n:"Wahrscheinlichkeiten liegen immer zwischen 0 und 1. Dieses Fenster passt also immer."},
  {t:"Schnittpunkt", a:"Bestimmen Sie den Schnittpunkt", k:KP(kS), full:kS, pre:r3, p:GP(r3,kS),
   d:"<p><b>menu ▸ 6: Graph analysieren ▸ 4: Schnittpunkt</b></p><p>Mit dem Cursor einen Bereich um den Schnittpunkt markieren: untere Schranke links, obere Schranke rechts.</p>"+PLAYB+"<p>Ergebnis: <b>S(0,201 | 0,8)</b></p>",
   n:"Am Handheld klicken Sie mit dem Touchpad oder mit <b>enter</b>."},
  {t:"Ergebnis deuten", a:"<i>p</i> höchstens oder mindestens?", k:[], s:gAfter(r4),
   d:"<p>Der blaue Graph <b>fällt</b>. Links vom Schnittpunkt liegt er <b>über</b> der Geraden 0,8.</p><p>Dort gilt also <i>P</i>(<i>X</i> ≤ 5) ≥ 0,8.</p><p>Ergebnis: <b><i>p</i> ≤ 0,201</b></p>",
   n:"Steigt der Graph (z. B. bei <i>P</i>(<i>X</i> ≥ 1)), liegt der passende Bereich rechts vom Schnittpunkt. Dann gilt <b><i>p</i> ≥ …</b>"},
  {t:"Selbst rechnen", k:[], ab:1, s:gAfter(r4), d:AB("Aufgabe 3",["CAS-Eingaben notieren","Schnittpunkt bestimmen und skizzieren","<i>p</i> angeben","Danach: Lösungscode eintragen"])}
 ]}
};
