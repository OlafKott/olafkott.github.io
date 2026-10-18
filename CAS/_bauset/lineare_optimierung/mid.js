// ---------- Graphs-App: Menüs ----------
const F1=['1.1'], F2=['1.1','1.2'], O={doc:'graph'};
const GM=["1: Aktionen","2: Ansicht","3: Graph-Eingabe/Bearbeitung","4: Fenster/Zoom","5: Spur","6: Graph analysieren","7: Tabelle","8: Geometrie","9: Einstellungen"];
const FZ=["1: Fenstereinstellungen","2: Zoom – Box","3: Zoom – Vergrößern","4: Zoom – Verkleinern","5: Zoom – Standard","6: Zoom – Quadrant 1","7: Zoom – Benutzer","8: Zoom – Trig","9: Zoom – Daten"];
const SUB={"4":FZ};
// Randgeraden der Tour (Koeffizienten, höchste Potenz zuerst)
const FUN={ f1:{P:[-1,8], col:'#1f4fb5'}, f2:{P:[-0.5,6], col:'#c8102e'}, f3:{P:[-2,14], col:'#2E7D32'} };
const ev=(P,x)=>P.reduce((s,c)=>s*x+c,0);
const fmt3=v=>{ if(Math.abs(v)<5e-7) return '0'; return String(Number(v.toPrecision(3))).replace('-','−'); };
// Eckpunkte des Planungsvielecks
const ECK=[[0,0],[0,6],[4,4],[6,2],[7,0]];

// ---------- Graphs-App: Zustand ----------
const DLGL=["XMin","XMax","XSkalierung","YMin","YMax","YSkalierung"];
function G0(){ return {win:{x0:-10,x1:10,y0:-6.67,y1:6.67}, fs:[], ent:{n:'f1',e:new Entry()}, menu:null, dlg:null, ctrl:false, poly:false, pts:[]}; }
function simG(keys){
  const S=G0();
  for(const k of keys){
    if(S.menu){
      if(k==='esc'){ S.menu=null; continue; }
      if(S.menu.length===1){ S.menu[0].sel=+k-1; S.menu.push({items:SUB[k]||[],sel:0,d:k}); continue; }
      const a=S.menu[1].d; S.menu=null;
      if(a==='4'&&k==='1'){ const w=S.win; S.dlg={v:[fmt3(w.x0),fmt3(w.x1),'Auto',fmt3(w.y0),fmt3(w.y1),'Auto'], fo:0, fresh:true}; }
      continue;
    }
    if(S.dlg){
      const D=S.dlg;
      if(k==='tab'){ D.fo=(D.fo+1)%6; D.fresh=true; continue; }
      if(k==='enter'){ const p=s=>parseFloat(s.replace('−','-')); S.win={x0:p(D.v[0]),x1:p(D.v[1]),y0:p(D.v[3]),y1:p(D.v[4])}; S.dlg=null; continue; }
      const ch=k==='neg'?'−':k; if(D.fresh){ D.v[D.fo]=''; D.fresh=false; } D.v[D.fo]+=ch; continue;
    }
    if(S.ent){
      if(k==='enter'){ S.fs.push({n:S.ent.n, root:S.ent.e.root}); S.ent=null; continue; }
      S.ent.e.key(k); continue;
    }
    if(S.ctrl){ S.ctrl=false; continue; }
    if(k==='ctrl'){ S.ctrl=true; continue; }
    if(k==='tab'){ S.ent={n:'f'+(S.fs.length+1), e:new Entry()}; continue; }
    if(k==='menu'){ S.menu=[{items:GM,sel:0}]; continue; }
  }
  return S;
}

// ---------- Graphs-App: Bildschirm ----------
function gScreen(S){
  const W=280, H=194, w=S.win, X=x=>(x-w.x0)/(w.x1-w.x0)*W, Y=y=>(w.y1-y)/(w.y1-w.y0)*H;
  let s=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:16px;overflow:hidden" font-family="Arial,Helvetica,sans-serif">`;
  // Planungsvieleck (nur zur Verdeutlichung – das CAS färbt es nicht)
  if(S.poly) s+=`<path d="${ECK.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ')} Z" fill="#9aa3b0" fill-opacity=".45" stroke="#555" stroke-width=".8" stroke-dasharray="3 2"/>`;
  const ax='#555';
  if(w.y0<0&&w.y1>0){ const y=Y(0); s+=`<line x1="0" y1="${y}" x2="${W-5}" y2="${y}" stroke="${ax}" stroke-width="1"/><path d="M${W} ${y} l-6 -3 v6z" fill="${ax}"/>`;
    for(let t=Math.ceil(w.x0);t<=Math.floor(w.x1);t++) if(t) s+=`<line x1="${X(t)}" y1="${y-2}" x2="${X(t)}" y2="${y+2}" stroke="${ax}"/>`;
    s+=`<text x="2" y="${y-3}" font-size="8" fill="#777">${fmt3(w.x0)}</text><text x="${W-2}" y="${y+10}" font-size="8" fill="#777" text-anchor="end">${fmt3(w.x1)}</text>`; }
  if(w.x0<0&&w.x1>0){ const x=X(0); s+=`<line x1="${x}" y1="${H}" x2="${x}" y2="5" stroke="${ax}" stroke-width="1"/><path d="M${x} 0 l-3 6 h6z" fill="${ax}"/>`;
    for(let t=Math.ceil(w.y0);t<=Math.floor(w.y1);t++) if(t) s+=`<line x1="${x-2}" y1="${Y(t)}" x2="${x+2}" y2="${Y(t)}" stroke="${ax}"/>`;
    s+=`<text x="${x+4}" y="9" font-size="8" fill="#777">${fmt3(w.y1)}</text><text x="${x+4}" y="${H-3}" font-size="8" fill="#777">${fmt3(w.y0)}</text>`; }
  S.fs.forEach((F,j)=>{
    const P=FUN[F.n].P, col=FUN[F.n].col; let d='', pen=false;
    for(let i=0;i<=280;i++){ const x=w.x0+(w.x1-w.x0)*i/280, py=Y(ev(P,x));
      if(py>-40&&py<H+40){ d+=(pen?'L':'M')+X(x).toFixed(1)+' '+py.toFixed(1)+' '; pen=true; } else pen=false; }
    s+=`<path d="${d}" fill="none" stroke="${col}" stroke-width="1.6"/>`;
    s+=`<text x="${W-4}" y="${(S.ent?33:13)+j*12}" font-size="9.5" fill="${col}" text-anchor="end" stroke="#fff" stroke-width="3" paint-order="stroke">${F.n}(x)=${ser2(F.root)}</text>`;
  });
  S.pts.forEach(p=>{
    const px=X(p[0]), py=Y(p[1]), lx=p[0]===0?px+5:px+4, ly=p[1]===0?py-5:py-5;
    s+=`<circle cx="${px}" cy="${py}" r="2.6" fill="#000"/>`;
    if(!(p[0]===0&&p[1]===0)) s+=`<text x="${lx}" y="${ly}" font-size="9" fill="#000" stroke="#fff" stroke-width="3" paint-order="stroke">(${p[0]}|${p[1]})</text>`;
  });
  s+='</svg>';
  let h=topbar(S.tabs||F1,'1.1',O.doc)+s;
  if(S.ent) h+=`<div style="position:absolute;left:0;right:0;top:16px;height:21px;background:#fff;border-bottom:1px solid #9aa5b3;display:flex;align-items:center;padding:0 5px;font-size:11.5px;z-index:2"><span style="display:inline-flex;width:11px;height:11px;border:1px solid #1f4fb5;background:#1f4fb5;color:#fff;font-size:9px;line-height:11px;justify-content:center;margin-right:4px">✓</span><span style="color:${FUN[S.ent.n].col};margin-right:2px">${S.ent.n}(x)=</span><span style="flex:1;padding:0 3px;min-height:15px">${S.ent.e.html()}</span></div>`;
  if(S.dlg){ const D=S.dlg; h+='<div class="dlg"><div class="tt">Fenstereinstellungen</div><div class="ff">'+DLGL.map((l,i)=>`<span class="lb">${l}:</span><span class="ct ${i===D.fo?'fo':''}">${D.v[i]}${i===D.fo&&!D.fresh?'<span class="caret">|</span>':''}</span>`).join('')+'</div><div class="bt"><span>OK</span><span>Abbrechen</span></div></div>'; }
  if(S.menu) h+=menus(S.menu);
  return h;
}
// Eingabe als Text für das Graph-Etikett
function ser2(arr){ return arr.map(t=>typeof t==='string'?t:ser2(t.v||[])).join('').replace(/(\d)x/g,'$1·x'); }
const GS=(pre,keys)=>i=>gScreen(simG(pre.concat(keys.slice(0,i))));
const gAfter=keys=>()=>gScreen(simG(keys));
function gPoly(keys,pts){ const S=simG(keys); S.poly=true; S.pts=pts||[]; return gScreen(S); }
function playTool(){}

// ---------- Calculator-Seite (Seite 1.2) ----------
// Ergebnisse, die das CAS zu den Eingaben der Tour anzeigt
const RES={'Define z(x,y)=30x+40y':'Fertig','f2(0)':'6','solve(f1(x)=f2(x),x)':'x=4','f1(4)':'4','solve(f1(x)=f3(x),x)':'x=6','f1(6)':'2','solve(f3(x)=0,x)':'x=7',
  'z(0,0)':'0','z(0,6)':'240','z(4,4)':'280','z(6,2)':'260','z(7,0)':'210'};
function simC(keys){
  const S={lines:[], e:new Entry(), menu:null};
  for(const k of keys){
    if(S.menu){
      if(k==='esc'){ S.menu=null; continue; }
      if(S.menu.length===1){ S.menu[0].sel=+k-1; S.menu.push({items:k==='1'?AK:[],sel:0}); continue; }
      S.menu=null; if(k==='1') S.e.root.push('Define '); continue;
    }
    if(k==='menu'){ S.menu=[{items:CM,sel:0}]; continue; }
    if(k==='enter'){ const t=ser(S.e.root); S.lines.push([S.e.html(false), RES[t]!==undefined?RES[t]:'?']); S.e=new Entry(); continue; }
    S.e.key(k);
  }
  return S;
}
function cScreen(S){ return calcApp(F2,'1.2',S.lines.slice(-7),S.e.html(),O)+(S.menu?menus(S.menu):''); }
const CS=(pre,keys)=>i=>cScreen(simC(pre.concat(keys.slice(0,i))));
const cAfter=keys=>()=>cScreen(simC(keys));

// ---------- Tastenfolgen ----------
const K=s=>[...s].map(c=>c===' '?'space':c).concat(['enter']);
const kNew=["1","2"];
const kF1=["8","-","x","enter"];
const kF2=["tab","6","-","0",".","5","x","enter"];
const kF3=["tab","1","4","-","2","x","enter"];
const kWin=["menu","4","1","neg","1","tab","1","3","tab","tab","neg","1","tab","1","5","enter"];
const g1=kF1, g2=g1.concat(kF2), g3=g2.concat(kF3), g4=g3.concat(kWin);
const kPage=["ctrl","doc","1"];
const kY=K('f2(0)'), kS12=K('solve(f1(x)=f2(x),x)'), kY12=K('f1(4)'), kS13=K('solve(f1(x)=f3(x),x)').concat(K('f1(6)')), kN3=K('solve(f3(x)=0,x)');
const c1=kY, c2=c1.concat(kS12), c3=c2.concat(kY12), c4=c3.concat(kS13), c5=c4.concat(kN3);
const kDef=["menu","1","1"].concat(K('z(x,y)=30x+40y'));
const kZ=K('z(4,4)');
const c6=c5.concat(kDef), c7=c6.concat(kZ), c8=c6.concat(K('z(0,0)'),K('z(0,6)'),K('z(4,4)'),K('z(6,2)'),K('z(7,0)'));
const pick=arr=>i=>arr[Math.max(0,Math.min(i,arr.length)-1)];
// Seite einfügen: Graph → (ctrl gehalten) → App-Liste → Calculator
const pageScr=i=>i<2?gScreen(simG(g4)):i===2?appList(F1,'1.1',0,O.doc):cScreen(simC([]));

const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Handheld rechnen, Ergebnisse eintragen, dann <b>Weiter</b>.</p></div>`;
const Z='<i>Z</i>(<i>x</i>,<i>y</i>) = 30<i>x</i> + 40<i>y</i>';
const UM='<table class="vgl"><tr><th>Restriktion</th><th>nach <i>y</i> umgestellt</th><th>im CAS</th></tr>'+
 '<tr><td>(I) <i>x</i> + <i>y</i> ≤ 8</td><td><i>y</i> ≤ 8 − <i>x</i></td><td>f1(x)=8−x</td></tr>'+
 '<tr><td>(II) <i>x</i> + 2<i>y</i> ≤ 12</td><td><i>y</i> ≤ 6 − 0,5<i>x</i></td><td>f2(x)=6−0.5x</td></tr>'+
 '<tr><td>(III) 2<i>x</i> + <i>y</i> ≤ 14</td><td><i>y</i> ≤ 14 − 2<i>x</i></td><td>f3(x)=14−2x</td></tr></table>';
const ECKT='<table class="vgl"><tr><th>Eckpunkt</th><th>so berechnet</th><th><i>Z</i>(<i>x</i>,<i>y</i>) = 30<i>x</i> + 40<i>y</i></th></tr>'+
 '<tr><td>(0 | 0)</td><td>Ursprung</td><td>0</td></tr>'+
 '<tr><td>(0 | 6)</td><td>f2(0)</td><td>240</td></tr>'+
 '<tr><td><b>(4 | 4)</b></td><td>f1 und f2 schneiden</td><td><b>280</b></td></tr>'+
 '<tr><td>(6 | 2)</td><td>f1 und f3 schneiden</td><td>260</td></tr>'+
 '<tr><td>(7 | 0)</td><td>Nullstelle von f3</td><td>210</td></tr></table>';

const TRACKS={
 g:{ name:"Restriktionen zeichnen", start:()=>home(''), steps:[
  {t:"Die Aufgabe", a:"Maximieren Sie "+Z+"<br><span style=\"font-size:17px\">unter den Restriktionen<br>(I) <i>x</i> + <i>y</i> ≤ 8, &nbsp;(II) <i>x</i> + 2<i>y</i> ≤ 12, &nbsp;(III) 2<i>x</i> + <i>y</i> ≤ 14, &nbsp;<i>x</i>, <i>y</i> ≥ 0</span>", k:[], s:()=>home(''),
   d:"<p>Gesucht ist der Punkt (<i>x</i> | <i>y</i>), der <b>alle Restriktionen</b> erfüllt und für den <i>Z</i> <b>am größten</b> ist.</p><p>Vorgehen:</p><table class=\"vgl\"><tr><td>1. Restriktionen zeichnen (Planungsvieleck)<br>2. Eckpunkte berechnen<br>3. <i>Z</i> in jeder Ecke berechnen</td></tr></table>"},
  {t:"Nach y umstellen", a:"Stellen Sie die Restriktionen nach <i>y</i> um", k:[], s:()=>home(''),
   d:"<p>Das CAS zeichnet Funktionen <i>y</i> = …</p><p>Darum stellen Sie jede Restriktion nach <i>y</i> um.</p>"+UM,
   n:"Teilen durch eine positive Zahl ändert das Zeichen ≤ nicht."},
  {t:"Neues Dokument", a:"Neues Dokument mit Graphs-Seite", k:kNew, p:pick([appList(F1,'1.1',0,O.doc),gScreen(simG([]))]),
   d:"<p><b>1</b> = Neues Dokument, dann <b>2</b> = Graphs.</p><p>Oben steht die Eingabezeile <b>f1(x)=</b>.</p>", n:"Ist schon ein Dokument offen, fragt das CAS, ob es speichern soll."},
  {t:"Erste Randgerade", a:"Zeichnen Sie <i>f</i>1(<i>x</i>) = 8 − <i>x</i>", k:kF1, p:GS([],kF1),
   d:"<p><b>f1(x)=</b> steht schon da.</p><p>Nur den Term eintippen, dann <b>enter</b>.</p>"},
  {t:"Zweite Randgerade", a:"Zeichnen Sie <i>f</i>2(<i>x</i>) = 6 − 0,5<i>x</i>", k:kF2, p:GS(g1,kF2),
   d:"<p><b>tab</b> blendet die Eingabezeile wieder ein.</p><p>Dort steht jetzt <b>f2(x)=</b>.</p><p>Das Komma tippen Sie als Punkt: <b>0.5</b>.</p>"},
  {t:"Dritte Randgerade", a:"Zeichnen Sie <i>f</i>3(<i>x</i>) = 14 − 2<i>x</i>", k:kF3, p:GS(g2,kF3),
   d:"<p>Wieder <b>tab</b>, Term eintippen, <b>enter</b>.</p>",
   n:"Im Standardfenster sieht man den wichtigen Bereich schlecht. Darum stellen wir als Nächstes das Fenster ein."},
  {t:"Fenster einstellen", a:"Fenster: −1 ≤ <i>x</i> ≤ 13 und −1 ≤ <i>y</i> ≤ 15", k:kWin, p:GS(g3,kWin),
   d:"<p><b>menu ▸ 4: Fenster/Zoom ▸ 1: Fenstereinstellungen</b></p><p>Zahl eintippen, mit <b>tab</b> ins nächste Feld.</p><p>Die Skalierung (Auto) überspringen Sie mit einem zweiten <b>tab</b>.</p><p>Zum Schluss <b>enter</b>.</p>",
   n:"Negative Zahlen mit <b>(−)</b>, nicht mit der Minustaste."},
  {t:"Das Planungsvieleck", a:"Welche Punkte erfüllen alle Restriktionen?", k:[], s:()=>gPoly(g4),
   d:"<p>Alle Restriktionen heißen „≤“: Erlaubt ist alles <b>unter</b> den drei Geraden.</p><p>Wegen <i>x</i>, <i>y</i> ≥ 0 nur rechts von der <i>y</i>-Achse und über der <i>x</i>-Achse.</p><p>Diese Fläche heißt <b>Planungsvieleck</b> (hier grau).</p>",
   n:"Das CAS färbt die Fläche <b>nicht</b>. Das Grau dient hier nur zur Verdeutlichung. Auf dem Arbeitsblatt schraffieren Sie die Fläche selbst."},
  {t:"Selbst zeichnen", k:[], ab:1, s:()=>gPoly(g4), d:AB("Aufgaben 1 und 2",["Restriktionen nach <i>y</i> umstellen","Randgeraden im CAS zeichnen, Fenster einstellen","Geraden ins Koordinatensystem übertragen, Planungsvieleck schraffieren"])}
 ]},
 e:{ name:"Eckpunkte berechnen", start:gAfter(g4), steps:[
  {t:"Wo liegen die Ecken?", a:"Lesen Sie ab, welche Geraden das Planungsvieleck begrenzen", k:[], s:()=>gPoly(g4,ECK),
   d:"<p>Das Planungsvieleck hat <b>5 Ecken</b>.</p><p>Von links nach rechts begrenzen es <b style=\"color:#c8102e\">f2</b>, dann <b style=\"color:#1f4fb5\">f1</b>, dann <b style=\"color:#2E7D32\">f3</b>.</p><p>Jede Ecke ist ein <b>Schnittpunkt</b>: zweier Geraden oder einer Geraden mit einer Achse.</p><p>Diese Ecken berechnen wir jetzt genau.</p>",
   n:"Die Gerade f2 ist im oberen Teil nicht beteiligt: Dort liegt sie über f1 und f3."},
  {t:"Rechner-Seite einfügen", a:"Fügen Sie eine Calculator-Seite ein", k:kPage, p:pageScr,
   d:"<p><b>ctrl</b> + <b>doc</b> fügt eine neue Seite ein.</p><p><b>1</b> = Calculator.</p><p>Oben steht jetzt <b>1.2</b>. Die Funktionen f1, f2, f3 kennt das CAS auch hier.</p>",
   n:"Zurück zum Graphen kommen Sie mit <b>ctrl</b> + <b>◀</b>."},
  {t:"Ecke auf der y-Achse", a:"Berechnen Sie <i>f</i>2(0)", k:kY, p:CS([],kY),
   d:"<p>Auf der <i>y</i>-Achse ist <i>x</i> = 0.</p><p><b>f2(0)</b> eintippen, <b>enter</b>.</p><p>Ergebnis: 6. Die Ecke ist <b>(0 | 6)</b>.</p>"},
  {t:"Schnittpunkt f1 und f2", a:"Lösen Sie <i>f</i>1(<i>x</i>) = <i>f</i>2(<i>x</i>)", k:kS12, p:CS(c1,kS12),
   d:"<p>Im Schnittpunkt sind beide <i>y</i>-Werte gleich.</p><p>Darum lösen Sie die Gleichung mit <b>solve</b>:</p><p><span class=\"cmd\">solve(f1(x)=f2(x),x)</span></p><p>Ergebnis: <b><i>x</i> = 4</b>.</p>",
   n:"Das Komma vor dem letzten x: Taste <b>,</b> in der Buchstabenreihe."},
  {t:"y-Wert dazu", a:"Berechnen Sie <i>f</i>1(4)", k:kY12, p:CS(c2,kY12),
   d:"<p>Den <i>y</i>-Wert liefert eine der beiden Funktionen.</p><p><b>f1(4)</b> = 4. Die Ecke ist <b>(4 | 4)</b>.</p>"},
  {t:"Schnittpunkt f1 und f3", a:"Berechnen Sie den Schnittpunkt von <i>f</i>1 und <i>f</i>3", k:kS13, p:CS(c3,kS13),
   d:"<p>Genauso: erst <span class=\"cmd\">solve(f1(x)=f3(x),x)</span>, dann den <i>y</i>-Wert.</p><p><i>x</i> = 6 und f1(6) = 2. Die Ecke ist <b>(6 | 2)</b>.</p>"},
  {t:"Ecke auf der x-Achse", a:"Lösen Sie <i>f</i>3(<i>x</i>) = 0", k:kN3, p:CS(c4,kN3),
   d:"<p>Auf der <i>x</i>-Achse ist <i>y</i> = 0.</p><p>Gesucht ist also die <b>Nullstelle</b> von f3.</p><p><i>x</i> = 7. Die Ecke ist <b>(7 | 0)</b>.</p>"},
  {t:"Alle Ecken", a:"Notieren Sie alle Eckpunkte", k:[], s:()=>gPoly(g4,ECK),
   d:"<p>Die fünf Ecken des Planungsvielecks:</p><p><b>(0 | 0)</b>, <b>(0 | 6)</b>, <b>(4 | 4)</b>, <b>(6 | 2)</b>, <b>(7 | 0)</b></p><p>Vergleichen Sie mit dem Graphen: Die Punkte liegen genau auf den Knicken.</p>"},
  {t:"Selbst berechnen", k:[], ab:1, s:cAfter(c5), d:AB("Aufgabe 3",["Ecken auf den Achsen berechnen","Schnittpunkte mit <b>solve</b> und dem <i>y</i>-Wert berechnen","alle Eckpunkte in die Tabelle eintragen"])}
 ]},
 z:{ name:"Optimum finden", start:cAfter(c5), steps:[
  {t:"Zielfunktion definieren", a:"Definieren Sie "+Z, k:kDef, p:CS(c5,kDef),
   d:"<p><b>menu ▸ 1: Aktionen ▸ 1: Definieren</b></p><p>Dann <b>z(x,y)=30x+40y</b> eintippen, <b>enter</b>.</p><p>Das CAS antwortet mit <b>Fertig</b>.</p>",
   n:"Zwischen 30 und x brauchen Sie kein Malzeichen."},
  {t:"Z in einer Ecke", a:"Berechnen Sie <i>Z</i> in der Ecke (4 | 4)", k:kZ, p:CS(c6,kZ),
   d:"<p><b>z(4,4)</b> eintippen, <b>enter</b>.</p><p>Ergebnis: <b><i>Z</i>(4,4) = 280</b>.</p>"},
  {t:"Alle Ecken vergleichen", a:"In welcher Ecke ist <i>Z</i> am größten?", k:[], s:cAfter(c8),
   d:"<p>Berechnen Sie <i>Z</i> in <b>jeder</b> Ecke:</p>"+ECKT+"<p>Der größte Wert ist <b>280</b> – nur in der Ecke <b>(4 | 4)</b>.</p>",
   n:"Das Maximum liegt immer in einer <b>Ecke</b> des Planungsvielecks. Darum reicht es, die Ecken zu prüfen."},
  {t:"Ergebnis", a:"Geben Sie das Optimum an", k:[], s:()=>gPoly(g4,[[4,4]]),
   d:"<p>Das Maximum liegt in der Ecke <b>(4 | 4)</b>.</p><p><b><i>x</i> = 4</b>, <b><i>y</i> = 4</b>, <b><i>Z</i><sub>max</sub> = 280</b></p><table class=\"vgl\"><tr><th>Merke</th></tr><tr><td>1. Restriktionen nach <i>y</i> umstellen und zeichnen.<br>2. Eckpunkte des Planungsvielecks berechnen.<br>3. <i>Z</i> in jeder Ecke berechnen.<br>4. Größter Wert = Maximum.</td></tr></table>"},
  {t:"Selbst lösen", k:[], ab:1, s:cAfter(c8), d:AB("Aufgabe 4",["Zielfunktion definieren","<i>Z</i> in jeder Ecke berechnen und in die Tabelle eintragen","Optimum notieren, danach Lösungscode eintragen"])}
 ]}
};

