// ---------- Matrix: Menüs, Dialoge, Vorlage ----------
const MV=["1: Erstellen ▸","2: Transponieren","3: Determinante","4: Zeilenstufenform","5: Reduzierte Zeilenstufenform","6: Simultan","7: Normen ▸","8: Dimensionen ▸","9: Zeilenoperationen ▸"];
const ER=["1: Matrix…","2: Nullmatrix","3: Einheitsmatrix","4: Diagonalmatrix","5: Zufallsmatrix","6: Füllen","7: Untermatrix","8: Erweitern","9: Konstruieren"];
const CHR={'-':'−','neg':'−','*':'·'};
const MT=v=>String(v).replace('-','−');
// Ergebnisse für die Tour-Matrix (ref mit Pivotsuche wie im CAS, Brüche gibt es hier nicht)
const REFM=[[1,1,1,9],[0,1,1,6],[0,0,1,1]], RREFM=[[1,0,0,3],[0,1,0,5],[0,0,1,1]];
function mx(rows,cur){
  let n=0;
  return '<span class="mx"><table>'+rows.map(r=>'<tr>'+r.map(v=>{ const c=(n++===cur)?'<span class="caret">|</span>':''; return `<td>${v}${c}</td>`; }).join('')+'</tr>').join('')+'</table></span>';
}
function cellsRows(E){ const out=[]; for(let i=0;i<E.R;i++) out.push(E.cells.slice(i*E.C,(i+1)*E.C)); return out; }
function entryHtml(E,caret){
  if(E.kind==='mx'){ const out=E.cur>=E.R*E.C; return mx(cellsRows(E),caret&&!out?E.cur:-1)+E.post+(caret&&out?'<span class="caret">|</span>':''); }
  return E.s+(caret?'<span class="caret">|</span>':'')+'<span style="color:#999">)</span>';
}
function mxDlg(D){
  const f=(lab,val,k)=>`<div class="lb">${lab}</div><div class="ct ${D.focus===k?'fo':''} ${D.focus===k&&D.sel?'mark':''}"><span>${val}${D.focus===k&&!D.sel?'<span class="caret">|</span>':''}</span></div>`;
  return `<div class="dlg" style="top:40px"><div class="tt">Matrix erstellen</div><div class="ff" style="grid-template-columns:128px 1fr">`+
    f('Anzahl der Zeilen:',D.rows,0)+f('Anzahl der Spalten:',D.cols,1)+'</div><div class="bt"><span>OK</span><span>Abbrechen</span></div></div>';
}
const azDlg=()=>'<div class="dlg" style="top:46px"><div class="tt">a–z löschen</div><div style="padding:6px 8px 2px">Alle Variablen aus einem Buchstaben löschen?</div><div class="bt"><span style="outline:2px solid #3b78c2">OK</span><span>Abbrechen</span></div></div>';

// Zustandsmaschine: eine Tastenfolge -> Bildschirm
function newState(){ return {ph:'off',hist:[],menu:[],dlg:null,e:null,ctrl:false,a:null}; }
function step(S,k){
  if(S.ph==='off'){ if(k==='on') S.ph='home'; return; }
  if(S.ph==='home'){ if(k==='a') S.ph='idle'; return; }
  if(S.ph==='idle'){ if(k==='menu'){ S.ph='menu'; S.menu=[{items:CM,sel:0}]; } return; }
  if(S.ph==='menu'){
    const top=S.menu[S.menu.length-1].items;
    if(top===CM&&k==='1'){ S.menu.push({items:AK,sel:3}); return; }
    if(top===CM&&k==='7'){ S.menu[0].sel=6; S.menu.push({items:MV,sel:0}); return; }
    if(top===AK&&k==='4'){ S.ph='az'; S.menu=[]; return; }
    if(top===MV&&k==='1'){ S.menu.push({items:ER,sel:0}); return; }
    if(top===ER&&k==='1'){ S.ph='dlg'; S.menu=[]; S.dlg={rows:'2',cols:'2',focus:0,sel:true}; return; }
    if(top===MV&&(k==='4'||k==='5')){ S.ph='edit'; S.menu=[]; S.e={kind:'txt',s:k==='4'?'ref(':'rref('}; return; }
    return;
  }
  if(S.ph==='az'){ if(k==='enter') S.ph='idle'; return; }
  if(S.ph==='dlg'){
    const D=S.dlg, key=D.focus===0?'rows':'cols';
    if(k==='tab'){ D.focus=1-D.focus; D.sel=true; return; }
    if(k==='enter'){ const R=+D.rows, C=+D.cols; S.e={kind:'mx',R,C,cells:Array(R*C).fill(''),cur:0,post:''}; S.ph='edit'; S.dlg=null; return; }
    if(D.sel){ D[key]=k; D.sel=false; } else D[key]+=k; return;
  }
  if(S.ph==='edit'){
    const E=S.e;
    if(k==='ctrl'){ S.ctrl=true; return; }
    if(S.ctrl){ S.ctrl=false; if(k==='var'){ if(E.kind==='mx'){ E.cur=E.R*E.C; E.post+='→'; } } return; }
    if(E.kind==='mx'){
      if(k==='tab'){ if(E.cur<E.R*E.C) E.cur++; return; }
      if(k==='enter'){
        const rows=cellsRows(E);
        const nm=E.post.replace('→','');
        S.hist.push([mx(rows,-1)+E.post, mx(rows,-1)]);
        if(nm) S.a=rows;
        S.e=null; S.ph='idle'; return;
      }
      const c=CHR[k]||k;
      if(E.cur<E.R*E.C) E.cells[E.cur]+=c; else E.post+=c;
      return;
    }
    if(k==='enter'){
      const cmd=E.s+')';
      const M=(cmd==='ref(a)'&&S.a)?REFM:((cmd==='rref(a)'&&S.a)?RREFM:null);
      S.hist.push([cmd, M?mx(M.map(r=>r.map(MT)),-1):'Fehler']);
      S.e=null; S.ph='idle'; return;
    }
    E.s+=CHR[k]||k; return;
  }
}
function run(keys){ const S=newState(); keys.forEach(k=>step(S,k)); return S; }
function draw(S){
  if(S.ph==='off') return off();
  if(S.ph==='home') return home('');
  const entry=S.ph==='edit'?entryHtml(S.e,true):(S.ph==='idle'?'<span class="caret">|</span>':'');
  let h=calcApp(NP,'',S.hist,entry);
  if(S.ph==='menu'){ const P=[[6,22],[40,40],[92,58]]; h+=S.menu.map((m,i)=>`<div class="menu" style="left:${P[i][0]}px;top:${P[i][1]}px">`+m.items.map((t,j)=>`<div class="${j===m.sel?'sel':''}">${t}</div>`).join('')+'</div>').join(''); }
  if(S.ph==='az') h+=azDlg();
  if(S.ph==='dlg') h+=mxDlg(S.dlg);
  return h;
}
const NP='np';
// Spur aus Schritten bauen: Tasten werden über alle Schritte (auch Spuren) fortgeschrieben
let ALLK=[];
function track(name,ab,steps){
  const base=ALLK.slice();
  let acc=base.slice();
  const out=steps.map(s=>{
    const pre=acc.slice(); const k=s.k||[];
    acc=acc.concat(k);
    return Object.assign({},s,{k, p:i=>draw(run(pre.concat(k.slice(0,i))))});
  });
  ALLK=acc;
  return {name, ab, start:()=>draw(run(base)), steps:out};
}
const LGS=(eqs)=>'<span class="lgs">'+eqs.map((e,j)=>`<span><b class="rn">${["I","II","III","IV"][j]}</b>${e}</span>`).join('')+'</span>';
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: Aufgabe ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Handheld lösen, Ergebnisse eintragen, dann <b>Weiter</b>.</p></div>`;
const V=s=>`<i>${s}</i>`;
const E=[`2${V('x')} + 2${V('y')} + 2${V('z')} = 18`,`${V('x')} − 3${V('y')} − 3${V('z')} = −15`,`2${V('y')} + 4${V('z')} = 14`];
const AM=[[2,2,2,18],[1,-3,-3,-15],[0,2,4,14]];
// große Matrix im Aufgabenfeld; hl = markierte Zeile, sp = Spaltenköpfe
function BM(M,o){
  o=o||{};
  const head=o.sp?'<tr class="sp"><td>'+V('x')+'</td><td>'+V('y')+'</td><td>'+V('z')+'</td><td class="rs"></td></tr>':'';
  return '<span class="bmx"><table>'+head+M.map((r,i)=>`<tr class="${o.hl===i?'hl':''}">`+r.map((v,j)=>`<td class="${j===r.length-1?'rs':''} ${o.z&&v===0?'nu':''}">${MT(v)}</td>`).join('')+'</tr>').join('')+'</table></span>';
}
const AUF=(x)=>`<span class="auf2">${LGS(E)}<span class="pf">→</span>${x}</span>`;
const K=s=>s.split(' ');

const TRACKS={
 m:track("1 · Matrix speichern",0,[
  {t:"Einschalten", a:"Rechner einschalten", k:["on"], d:"<p>Wir rechnen im <b>Notizblock</b>.</p>"},
  {t:"Notizblock öffnen", a:"Notizblock: Berechnen", k:["a"], d:"<p><b>A</b> = Berechnen.</p>"},
  {t:"Variablen löschen", a:"Alte Werte für a … z löschen", k:K("menu 1 4 enter"),
   d:"<p>menu ▸ Aktionen ▸ a–z löschen, mit <b>enter</b> bestätigen.</p>", n:"Sonst rechnet das CAS mit einer alten Matrix <i>a</i>."},
  {t:"Erweiterte Matrix", a:AUF(BM(AM,{sp:1})), k:[],
   d:"<p>Jede Gleichung wird eine <b>Zeile</b>.</p><p>Die Spalten sind <i>x</i>, <i>y</i>, <i>z</i> und die <b>rechte Seite</b>.</p><p>3 Unbekannte → <b>4 Spalten</b>.</p>",
   n:"In III fehlt <i>x</i>. Dann steht dort eine <b>0</b>."},
  {t:"Matrix-Vorlage öffnen", a:AUF(BM(AM)), k:K("menu 7 1 1"),
   d:"<p>menu ▸ Matrix &amp; Vektor ▸ Erstellen ▸ <b>Matrix…</b></p>"},
  {t:"3 Zeilen, 4 Spalten", a:AUF(BM(AM)), k:K("3 tab 4 enter"),
   d:"<p>Zeilen <b>3</b> eintippen, mit <b>tab</b> zu den Spalten, <b>4</b> eintippen, <b>enter</b> (OK).</p>"},
  {t:"Zeile I eintippen", a:AUF(BM(AM,{hl:0})), k:K("2 tab 2 tab 2 tab 1 8"),
   d:"<p><b>tab</b> springt in das nächste Feld.</p>"},
  {t:"Zeile II eintippen", a:AUF(BM(AM,{hl:1})), k:K("tab 1 tab neg 3 tab neg 3 tab neg 1 5"),
   d:"<p>Negative Zahlen mit <b>(−)</b>.</p>", n:"Nicht die Minus-Taste nehmen. Das gibt einen Fehler."},
  {t:"Zeile III eintippen", a:AUF(BM(AM,{hl:2,z:1})), k:K("tab 0 tab 2 tab 4 tab 1 4"),
   d:"<p>Zuerst die <b>0</b> für das fehlende <i>x</i>.</p>"},
  {t:"Als a speichern", a:"Matrix unter dem Namen <i>a</i> speichern", k:K("tab ctrl var a enter"),
   d:"<p><b>tab</b> verlässt die Matrix. <b>ctrl + var</b> schreibt den Pfeil <b>→</b>. Dann <b>a</b> und <b>enter</b>.</p>",
   n:"Den Pfeil kennen Sie aus „Werte speichern“. Jetzt heißt die Matrix <i>a</i>."}
 ]),
 r:track("2 · ref und rref",1,[
  {t:"ref: Zeilenstufenform", a:"Berechnen Sie ref(<i>a</i>)", k:K("menu 7 4 a enter"),
   d:"<p>menu ▸ Matrix &amp; Vektor ▸ <b>Zeilenstufenform</b>. Dann <b>a</b> und <b>enter</b>.</p>",
   n:"Die Klammer zu setzt das CAS selbst."},
  {t:"ref ablesen", a:"ref(<i>a</i>) = "+BM(REFM,{z:1}), k:[],
   d:"<p>Unten links stehen <b>Nullen</b>: eine Treppe.</p><p>Die letzte Zeile heißt: 1·<i>z</i> = 1, also <b><i>z</i> = 1</b>.</p>",
   n:"Andere Rechner zeigen hier manchmal andere Zahlen. Die Zeilenstufenform ist nicht eindeutig. rref ist immer gleich."},
  {t:"rref: reduzierte Form", a:"Berechnen Sie rref(<i>a</i>)", k:K("menu 7 5 a enter"),
   d:"<p>menu ▸ Matrix &amp; Vektor ▸ <b>Reduzierte Zeilenstufenform</b>. Dann <b>a</b> und <b>enter</b>.</p>"},
  {t:"Lösung ablesen", a:"rref(<i>a</i>) = "+BM(RREFM,{z:1}), k:[],
   d:"<p>Links steht nur noch eine Diagonale aus Einsen.</p><p>Die Lösung steht in der <b>letzten Spalte</b>:</p><p style='font-size:19px'><i>x</i> = 3, &nbsp;<i>y</i> = 5, &nbsp;<i>z</i> = 1 &nbsp;&nbsp;→&nbsp; 𝕃 = {(3 | 5 | 1)}</p>"},
  {t:"Selbst lösen", k:[], ab:1, d:AB("1 und 2",["Erweiterte Matrix aufstellen und als <i>a</i> speichern","ref(<i>a</i>) und rref(<i>a</i>) eintragen, Lösung ablesen","Wichtige Tasten notieren","Danach: Lösungscode eintragen"])}
 ])
};

