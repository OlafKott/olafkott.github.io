#!/usr/bin/env python3
# Baut die Schritt-für-Schritt-Anleitungen "Zeilenstufenform" (CW + X) aus den Matrizen-Anleitungen.
import re, sys
SRC = '/home/claude/olafkott.github.io/CAS/fx991/'
OUT = sys.argv[1] if len(sys.argv) > 1 else SRC

def rep(s, a, b, n=1):
    c = s.count(a)
    assert c == n, (a[:90], c)
    return s.replace(a, b)

TITLE = 'Gauß auf Knopfdruck – Zeilenstufenform mit Ref und Rref'

ENGINE_ADD = r'''
// Zeilenstufenform wie der Rechner: Spaltenpivot (betragsgrößte Zahl), führende Einsen
function mRef(a){
  const A=a.map(r=>r.slice()), m=A.length, n=A[0].length; let r=0;
  for(let c=0;c<n&&r<m;c++){
    let p=-1, best=0; for(let i=r;i<m;i++){ const v=Math.abs(valR(A[i][c])); if(v>best+1e-12){ best=v; p=i; } }
    if(p<0) continue;
    [A[r],A[p]]=[A[p],A[r]]; const pv=A[r][c];
    for(let j=0;j<n;j++) A[r][j]=divR(A[r][j],pv);
    for(let i=r+1;i<m;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=subR(A[i][j],mulR(f,A[r][j])); }
    r++;
  }
  return A;
}
function mRref(a){
  const A=mRef(a), m=A.length, n=A[0].length;
  for(let r=m-1;r>=0;r--){
    const c=A[r].findIndex(v=>v.p!==0); if(c<0) continue;
    for(let i=0;i<r;i++) if(A[i][c].p!==0){ const f=A[i][c]; for(let j=0;j<n;j++) A[i][j]=subR(A[i][j],mulR(f,A[r][j])); }
  }
  return A;
}
'''

CONTENT = r'''//  Tour-Inhalte (beide Modelle): Zeilenstufenform mit Ref und Rref
// =====================================================================
const AB=(nr,items)=>`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: ${nr}</div><ul>${items.map(x=>'<li>'+x+'</li>').join('')}</ul><p>Am eigenen Rechner rechnen, Ergebnisse auf dem Blatt eintragen, dann <b>Weiter</b>.</p></div>`;
const RK=v=>v.flatMap(x=>(x<0?MOD.NEG:[]).concat(String(Math.abs(x)).replace('.',',').split(''),[MOD.EXE]));
const E=MOD.t.exe, EX=MOD.EXE;
const zf=v=>String(v).replace('.',',').replace('-','−');
function MXP(m,name,cls){
  const t=`<table class="mxp ${cls||''}">`+m.map(r=>'<tr>'+r.map((v,j)=>`<td${j===r.length-1&&cls&&cls.includes('erw')?' class="rs"':''}>${typeof v==='string'?v:zf(v)}</td>`).join('')+'</tr>').join('')+'</table>';
  return name?`<span class="mxw"><i>${name}</i> = ${t}</span>`:t;
}
const FR=(p,q)=>(p<0?'−':'')+`<span class="frp"><span>${Math.abs(p)}</span><span>${q}</span></span>`;
const GL=rows=>'<table class="lgs">'+rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+'</table>';
// LGS 1: eindeutig lösbar (x = 1, y = 2, z = 3)
const MA=[[2,1,-1,1],[1,3,2,13],[1,-1,1,2]];
const GLA=GL([['I','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['II','<i>x</i>','+','3<i>y</i>','+','2<i>z</i>','=','13'],['III','<i>x</i>','−','<i>y</i>','+','<i>z</i>','=','2']]);
// LGS 2: unendlich viele Lösungen, nach Änderung 7 → 8 keine Lösung
const MB=[[1,1,1,6],[2,1,-1,1],[3,2,0,7]];
const GLB=GL([['I','<i>x</i>','+','<i>y</i>','+','<i>z</i>','=','6'],['II','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['III','3<i>x</i>','+','2<i>y</i>','','','=','7']]);
const GLB8=GL([['I','<i>x</i>','+','<i>y</i>','+','<i>z</i>','=','6'],['II','2<i>x</i>','+','<i>y</i>','−','<i>z</i>','=','1'],['III','3<i>x</i>','+','2<i>y</i>','','','=','<b style="color:#C62828">8</b>']]);
const PRE={A:MA}, PRE2={A:MA,B:MB};
const kA=MOD.MAT('A'), kB=MOD.MAT('B');
const mA=MOD.t.mat('A'), mB=MOD.t.mat('B');
const AUFA=GLA+MXP(MA,'A','erw');
const REFA=[[1,FR(1,2),FR(-1,2),FR(1,2)],[0,1,1,5],[0,0,1,3]];
const RREFA=[[1,0,0,1],[0,1,0,2],[0,0,1,3]];
const VOR='Die Matrix <b>A</b> aus Teil 1 ist gespeichert. Falls nicht, definieren Sie sie zuerst (3 Zeilen, 4 Spalten).';

// ---------------- Teil 1: LGS als erweiterte Matrix speichern
const T1open = MODEL==='cw' ? [
  {t:"Matrix-App öffnen", k:MOD.OPEN.slice(0,4), z:MOD.OPENZ, d:MOD.t.open},
  {t:"Matrix-App starten", k:['ok'], d:'<p>Mit <b>OK</b> starten Sie die App. Oben im Display steht jetzt <b>Matrix</b>.</p>'},
  {t:"MatA: 3 Zeilen, 4 Spalten", k:MOD.DEF('A',3,4), z:['inp'],
   d:'<p><b>TOOLS</b> ▸ <b>MatA</b> ist markiert ▸ <b>OK</b>. Jetzt die Größe ändern:</p><p><b>Zeilen</b> ist markiert ▸ <b>OK</b> ▸ <b>▼</b> zu <b>3 Zeilen</b> ▸ <b>OK</b>.<br><b>▼</b> zu <b>Spalten</b> ▸ <b>OK</b> ▸ <b>▼ ▼</b> zu <b>4 Spalten</b> ▸ <b>OK</b>.<br><b>▼</b> zu <b>Bestätigen</b> ▸ <b>OK</b>.</p>',
   n:'3 Gleichungen = <b>3 Zeilen</b>. 3 Unbekannte + rechte Seite = <b>4 Spalten</b>.'}
] : [
  {t:"Matrix-Modus öffnen", k:MOD.OPEN, z:MOD.OPENZ,
   d:'<p>Die Stufenform berechnet der Rechner im Modus <b>4: Matrizen</b>. Drücken Sie <b>MENU</b> und dann <b>4</b>.</p><p>Der Rechner zeigt sofort die Liste <b>Matrix definieren</b>.</p>'},
  {t:"MatA wählen", k:['1'], d:'<p>Wir speichern das LGS in <b>MatA</b>: Taste <b>1</b>.</p><p>Der Rechner fragt: <b>Anzahl Zeilen?</b></p>'},
  {t:"Größe festlegen: 3 × 4", k:['3','4'], z:['inp'],
   d:'<p>Drücken Sie <b>3</b> (Zeilen) und dann <b>4</b> (Spalten).</p><p>Sie sehen den <b>Matrix-Editor</b> mit 3 Zeilen und 4 Spalten.</p>',
   n:'3 Gleichungen = <b>3 Zeilen</b>. 3 Unbekannte + rechte Seite = <b>4 Spalten</b>.'}
];
const T1=[
  {t:"Vom LGS zur Matrix", a:GLA, k:[],
   d:`<p>Der Rechner rechnet nicht mit <i>x</i>, <i>y</i> und <i>z</i>, sondern nur mit den <b>Zahlen davor</b>. Jede Gleichung wird eine <b>Zeile</b>:</p>`+MXP(MA,'A','erw')+`<p>Spalte 1: Zahlen vor <i>x</i> · Spalte 2: vor <i>y</i> · Spalte 3: vor <i>z</i> · Spalte 4: <b>rechte Seite</b>.</p><p>Diese Matrix heißt <b>erweiterte Koeffizientenmatrix</b>.</p>`,
   n:'Steht keine Zahl vor der Variablen, ist es eine <b>1</b>. Bei Minus eine <b>−1</b>. Fehlt eine Variable ganz, tragen Sie <b>0</b> ein.'}
].concat(T1open.map(s=>Object.assign({a:AUFA},s))).concat([
  {t:"Zahlen eingeben", a:AUFA, k:RK([2,1,-1,1,1,3,2,13,1,-1,1,2]),
   d:`<p>Tippen Sie <b>zeilenweise</b>: erst Gleichung I (2, 1, −1, 1), dann II, dann III. Jede Zahl mit ${E} bestätigen.</p><p>Vorzeichen mit ${MOD.t.neg}.</p>`},
  {t:"Zurück zur Rechenzeile", a:AUFA, k:['ac'],
   d:`<p>Mit <b>AC</b> verlassen Sie den Editor. Das LGS ist jetzt als <b>MatA</b> gespeichert.</p>`,
   n:`Tippfehler? ${MOD.t.edit}, mit den Pfeilen zum Feld, neue Zahl, ${E}.`},
  {t:"Arbeitsblatt vorbereiten", k:[], ab:1, d:`<div class="ab"><div class="abt"><span>✍</span> Arbeitsblatt: LGS speichern</div><ul><li>Das LGS vom Arbeitsblatt als <b>MatA</b> speichern: ${MOD.t.def}</li><li>3 Gleichungen, 3 Unbekannte → <b>3 Zeilen, 4 Spalten</b></li></ul><p>Dann <b>Weiter</b> mit Teil 2.</p></div>`}
]);

// ---------------- Teil 2: Ref
const T2=[
  {t:"Stufenform: Ref(A)", a:AUFA, k:['ac'].concat(MOD.REF,kA,[')',EX]), z:['res'],
   d:`<p><b>AC</b>, dann ${MOD.t.ref}. Der Rechner schreibt <b>Ref(</b>. Dann ${mA}, Klammer zu <b>)</b> und ${E}.</p>`+MXP(REFA,'Ref(A)','erw')+`<p>Unten links stehen nur noch <b>Nullen</b> – wie eine Treppe. Das ist die <b>Zeilenstufenform</b>. Der Rechner hat das <b>Gauß-Verfahren</b> für Sie gemacht.</p>`,
   n:VOR},
  {t:"Letzte Zeile lesen", a:MXP(REFA,'Ref(A)','erw'), k:[],
   d:`<p>Die letzte Zeile <b>0 0 1 | 3</b> bedeutet:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">0<i>x</i> + 0<i>y</i> + 1<i>z</i> = 3 &nbsp;→&nbsp; <b><i>z</i> = 3</b></p>`},
  {t:"Rückwärts einsetzen", a:MXP(REFA,'Ref(A)','erw'), k:[],
   d:`<p>Zeile 2 bedeutet: <i>y</i> + <i>z</i> = 5. Mit <i>z</i> = 3 folgt <b><i>y</i> = 2</b>.</p><p>Zeile 1 bedeutet: <i>x</i> + ${FR(1,2)}<i>y</i> − ${FR(1,2)}<i>z</i> = ${FR(1,2)}. Einsetzen: <i>x</i> + 1 − 1,5 = 0,5, also <b><i>x</i> = 1</b>.</p>`,
   n:'Die Stufenform ist <b>nicht eindeutig</b>. Der Rechner teilt jede Zeile so, dass vorne eine <b>1</b> steht. Ihre Rechnung von Hand darf andere Zahlen haben – die Lösung ist trotzdem gleich.'},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 1",[`Stufenform: ${MOD.t.ref}, Matrix, <b>)</b>, ${E}`,`Brüche genau abschreiben – oder mit ${MODEL==='cw'?'<b>FORMAT</b>':'<b>S⇔D</b>'} umschalten`,`Ref(A) in die Kästchen eintragen`])}
];

// ---------------- Teil 3: Rref
const T3=[
  {t:"Reduzierte Stufenform: Rref(A)", a:AUFA, k:['ac'].concat(MOD.RREF,kA,[')',EX]), z:['res'],
   d:`<p><b>AC</b>, dann ${MOD.t.rref}. Der Rechner schreibt <b>Rref(</b>. Dann ${mA}, <b>)</b> und ${E}.</p>`+MXP(RREFA,'Rref(A)','erw')+`<p>Jetzt stehen auch <b>oberhalb</b> der Einsen Nullen. Links steht die <b>Einheitsmatrix</b>.</p>`,
   n:VOR},
  {t:"Lösung ablesen", a:MXP(RREFA,'Rref(A)','erw'), k:[],
   d:`<p>Jede Zeile ist jetzt fertig gelöst:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">1<i>x</i> = 1 &nbsp;·&nbsp; 1<i>y</i> = 2 &nbsp;·&nbsp; 1<i>z</i> = 3</p><p>Die Lösung steht in der <b>letzten Spalte</b>: <b><i>x</i> = 1, <i>y</i> = 2, <i>z</i> = 3</b>.</p>`,
   n:'<b>Ref</b> = Stufenform (dann rückwärts einsetzen). <b>Rref</b> = reduzierte Stufenform (Lösung direkt ablesen). Die reduzierte Stufenform ist <b>eindeutig</b>.'},
  {t:"Probe", a:GLA, k:[],
   d:`<p>Setzen Sie zur Kontrolle in eine Gleichung ein, z. B. II:</p><p style="font-family:Cambria,Georgia,serif;font-size:19px">1 + 3 · 2 + 2 · 3 = 13 ✓</p>`},
  {t:"Selbst rechnen", k:[], ab:1, d:AB("Aufgabe 2",[`Reduzierte Stufenform: ${MOD.t.rref}, Matrix, <b>)</b>, ${E}`,`Rref(A) eintragen`,`Lösungsmenge <i>L</i> aus der letzten Spalte ablesen`,"Danach: Lösungscode eintragen"])}
];

// ---------------- Teil 4: Sonderfälle
const RREFB=[[1,0,-2,-5],[0,1,3,11],[0,0,0,0]];
const RREFB8=[[1,0,-2,0],[0,1,3,0],[0,0,0,1]];
const MB8=[[1,1,1,6],[2,1,-1,1],[3,2,0,'<b style="color:#C62828">8</b>']];
const T4=[
  {t:"Zweites LGS als MatB", a:GLB+MXP(MB,'B','erw'), k:MOD.DEF('B',3,4).concat(RK([1,1,1,6,2,1,-1,1,3,2,0,7]),['ac']), z:[],
   d:`<p>Speichern Sie das LGS als <b>MatB</b> (3 Zeilen, 4 Spalten): ${MOD.t.def}.</p><p>Bei Gleichung III fehlt <i>z</i>: dort eine <b>0</b> eintragen. Am Ende <b>AC</b>.</p>`},
  {t:"Rref(B): eine Nullzeile", a:GLB, k:MOD.RREF.concat(kB,[')',EX]), z:['res'],
   d:`<p>${MOD.t.rref}, dann ${mB}, <b>)</b> und ${E}.</p>`+MXP(RREFB,'Rref(B)','erw')+`<p>Die letzte Zeile ist <b>0 0 0 | 0</b>, also 0 = 0. Das ist immer wahr – diese Gleichung sagt nichts mehr aus.</p>`},
  {t:"Unendlich viele Lösungen", a:MXP(RREFB,'Rref(B)','erw'), k:[],
   d:`<p>Es bleiben zwei Gleichungen für drei Unbekannte: <i>z</i> ist <b>frei wählbar</b>.</p><p style="font-family:Cambria,Georgia,serif;font-size:18px"><i>x</i> − 2<i>z</i> = −5 &nbsp;→&nbsp; <i>x</i> = −5 + 2<i>z</i><br><i>y</i> + 3<i>z</i> = 11 &nbsp;→&nbsp; <i>y</i> = 11 − 3<i>z</i></p><p>Das LGS hat <b>unendlich viele Lösungen</b>, z. B. <i>z</i> = 0: (−5 | 11 | 0).</p>`,
   n:'Der Rechner meldet keinen Fehler! Sie müssen die Matrix selbst <b>lesen</b>.'},
  {t:"Rechte Seite ändern: 7 → 8", a:GLB8+MXP(MB8,'B','erw'), k:['ac'].concat(MOD.EDIT('B'),['down','down','right','right','right','8',EX,'ac']),
   d:`<p>Jetzt ändern wir in Gleichung III die rechte Seite von 7 auf <b>8</b>.</p><p>${MOD.t.edit} (MatB). Mit <b>▼ ▼</b> in Zeile 3, mit <b>▶ ▶ ▶</b> in Spalte 4. <b>8</b> und ${E}, dann <b>AC</b>.</p>`},
  {t:"Rref(B): keine Lösung", a:GLB8, k:MOD.RREF.concat(kB,[')',EX]), z:['res'],
   d:`<p>${MOD.t.rref}, ${mB}, <b>)</b>, ${E}.</p>`+MXP(RREFB8,'Rref(B)','erw')+`<p>Die letzte Zeile ist <b>0 0 0 | 1</b>, also <b>0 = 1</b>. Das ist ein <b>Widerspruch</b>.</p><p>Das LGS hat <b>keine Lösung</b>.</p>`},
  {t:"Merkregel", k:[],
   d:`<p>Schauen Sie immer auf die <b>letzte Zeile</b> von Rref:</p><ul style="font-size:15.5px;margin:0 0 10px;padding-left:20px"><li><b>0 0 1 | c</b> → genau eine Lösung</li><li><b>0 0 0 | 0</b> → unendlich viele Lösungen</li><li><b>0 0 0 | 1</b> → keine Lösung</li></ul>`,
   n:'Ein LGS mit 2 Unbekannten speichern Sie als <b>2×3</b>-Matrix. Mehr als 3 Unbekannte gehen nicht: Die Matrix darf höchstens 4 Spalten haben.'},
];
const TRACKS={
  m:{name:"1 · LGS als Matrix speichern", start:()=>fresh(), steps:T1},
  r:{name:"2 · Ref: Stufenform", start:()=>fresh(PRE), steps:T2},
  rr:{name:"3 · Rref: Lösung ablesen", start:()=>fresh(PRE), steps:T3},
  s:{name:"4 · Keine oder unendlich viele Lösungen", start:()=>fresh(PRE), steps:T4}
};
'''

EXTRA_CSS = '''
table.mxp td.rs{ border-left:1.5px solid #1d1d1f; }
table.lgs{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:17px; margin:0 0 6px; }
table.lgs td{ padding:0 3px; text-align:right; }
table.lgs td:first-child{ font:bold 12px Arial,sans-serif; color:var(--mute); padding-right:10px; text-align:left; }
.mat.m4 td{ min-width:38px; } .mat.m4 table{ font-size:13px; }
table.mx td{ padding:0 5px; }
'''

def build(model):
    src = SRC + ('fx991_Matrizen_Schritt_fuer_Schritt.html' if model == 'cw' else 'fx991DEX_Matrizen_Schritt_fuer_Schritt.html')
    s = open(src, encoding='utf-8').read()
    name = 'CW' if model == 'cw' else 'X'
    s = rep(s, '<title>fx-991DE %s Matrizen</title>' % name, '<title>fx-991DE %s Zeilenstufenform</title>' % name)
    s = rep(s, '<h1>Schritt für Schritt: Matrizen<small>', '<h1>Gauß auf Knopfdruck: Ref und Rref<small>')
    s = rep(s, '</style>', EXTRA_CSS + '</style>')
    # Engine: Ref/Rref
    s = rep(s, '// Werte: {s:Bruch} oder {m:Matrix}', ENGINE_ADD + '// Werte: {s:Bruch} oder {m:Matrix}')
    s = rep(s, "if(t==='('||t==='det'||t==='trn'){", "if(t==='('||t==='det'||t==='trn'||t==='ref'||t==='rref'){")
    s = rep(s, "      if(t==='trn'){ if(!v.m) throw 'math'; return {m:mTrn(v.m)}; }",
               "      if(t==='trn'){ if(!v.m) throw 'math'; return {m:mTrn(v.m)}; }\n      if(t==='ref'){ if(!v.m) throw 'math'; return {m:mRef(v.m)}; }\n      if(t==='rref'){ if(!v.m) throw 'math'; return {m:mRref(v.m)}; }")
    s = rep(s, "det:'Det(',trn:'Trn('};", "det:'Det(',trn:'Trn(',ref:'Ref(',rref:'Rref('};")
    # Editor: 4 Spalten etwas schmaler
    s = rep(s, "let h=`<div class=\"mat${m.length>2||C_>2?' m3':''}\">", "let h=`<div class=\"mat${m.length>2||C_>2?' m3':''}${C_>3?' m4':''}\">")
    if model == 'cw':
        s = rep(s, "const tk=['sq','cube','inv','det','trn'][S.sel];", "const tk=['sq','cube','inv','det','trn',null,'ref','rref'][S.sel];")
        s = rep(s, "  SQ:['cat','ok'].concat(dn(5),['ok','ok']),",
                   "  REF:['cat','ok'].concat(dn(5),['ok'],dn(6),['ok']), RREF:['cat','ok'].concat(dn(5),['ok'],dn(7),['ok']),\n  SQ:['cat','ok'].concat(dn(5),['ok','ok']),")
        s = rep(s, "      def:'<b>TOOLS</b> ▸ Matrix wählen ▸ <b>OK</b> ▸ Größe ▸ Bestätigen',",
                   "      ref:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ <b>Stufenform REF</b>', rref:'<b>CATALOG</b> ▸ Matrix ▸ Matrizenrechnung ▸ <b>Stufenform RREF</b>',\n      def:'<b>TOOLS</b> ▸ Matrix wählen ▸ <b>OK</b> ▸ Größe ▸ Bestätigen',")
        s = rep(s, "<b>Matrix</b> (Nummer 10) und bestätigen Sie mit <b>OK</b>.</p><p>Sie sehen eine leere Rechenzeile.</p>",
                   "<b>Matrix</b> (Nummer 10). Noch nicht bestätigen.</p>")
    else:
        s = rep(s, "const OPT2=['1:MatAns','2:Determinante','3:Transposition','4:Einheitsmatrix','5:Zeilenstufenform','6:Red. Zeilenst.form'];",
                   "const OPT2=['1:MatAns','2:Determinante','3:Transponierte','4:Einheitsmatrix'];\nconst OPT3=['1:Stufenform REF','2:Stufenform RREF'];")
        s = rep(s, "     if(k==='down'&&S.page===0){ S.page=1; return; }\n     if(k==='up'&&S.page===1){ S.page=0; return; }",
                   "     if(k==='down'&&S.page<2){ S.page++; return; }\n     if(k==='up'&&S.page>0){ S.page--; return; }")
        s = rep(s, "     } else {\n       if(k==='1') pushTok(S,'Ans');",
                   "     } else if(S.page===2){\n       if(k==='1') pushTok(S,'ref'); else if(k==='2') pushTok(S,'rref');\n     } else {\n       if(k==='1') pushTok(S,'Ans');")
        s = rep(s, "if(S.mode==='optn') return lst(S,S.page?OPT2:OPT1,ziel);", "if(S.mode==='optn') return lst(S,[OPT1,OPT2,OPT3][S.page],ziel);")
        s = rep(s, "  ANS:['optn','down','1'], DET:['optn','down','2'], TRN:['optn','down','3'],",
                   "  ANS:['optn','down','1'], DET:['optn','down','2'], TRN:['optn','down','3'],\n  REF:['optn','down','down','1'], RREF:['optn','down','down','2'],")
        s = rep(s, "trn:'<b>OPTN</b> <b>▼</b> <b>3</b> (Transposition)',",
                   "trn:'<b>OPTN</b> <b>▼</b> <b>3</b> (Transponierte)',\n      ref:'<b>OPTN</b> <b>▼</b> <b>▼</b> <b>1</b> (Stufenform REF)', rref:'<b>OPTN</b> <b>▼</b> <b>▼</b> <b>2</b> (Stufenform RREF)',")
    # Tour ersetzen
    a = s.index('//  Tour-Inhalte (beide Modelle)')
    b = s.index('const TRACKS={')
    c = s.index('};', b) + 2
    s = s[:a] + CONTENT + s[c:]
    s = rep(s, 'const ORDER=["d","r","p","t","i"];', 'const ORDER=["m","r","rr","s"];')
    fn = ('fx991_' if model == 'cw' else 'fx991DEX_') + 'Stufenform_Schritt_fuer_Schritt.html'
    open(OUT + fn, 'w', encoding='utf-8').write(s)
    print('ok', fn, len(s))

for m in ('cw', 'dx'):
    build(m)
