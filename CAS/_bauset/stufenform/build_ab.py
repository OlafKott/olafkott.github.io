#!/usr/bin/env python3
# Arbeitsblatt + Lösungsblatt "Zeilenstufenform (Ref/Rref)" für CW und X
import re, io, base64, qrcode, sys
from fractions import Fraction as F
from lin import ref, rref
SRC = '/home/claude/olafkott.github.io/CAS/fx991/'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/'
BASE = 'https://olafkott.github.io/CAS/fx991/'

def qr(url):
    q = qrcode.QRCode(border=1, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8)
    q.add_data(url); q.make(fit=True)
    b = io.BytesIO(); q.make_image(fill_color='black', back_color='white').save(b, format='PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

def zt(v):
    v = F(v)
    if v.denominator == 1: return str(v.numerator).replace('-', '−')
    return ('−' if v < 0 else '') + f'<span class="bru"><span>{abs(v.numerator)}</span><span>{v.denominator}</span></span>'

# ---------------- Aufgaben-Daten
A = [[1,2,-1,1],[2,-1,3,12],[-1,1,2,5]]        # (2|1|3)
B = [[3,-1,0,5],[1,0,2,9],[0,1,-1,1]]           # (3|4|3)
C = [[3,1,2,1],[-2,1,-3,11],[1,-1,3,-12]]       # Ref robust, (1|4|-3)
D1 = [[1,1,1,6],[1,-1,3,2],[2,0,4,8]]           # unendlich viele
D2 = [[1,1,1,6],[1,-1,3,2],[2,0,4,9]]           # keine
D3 = [[2,3,12],[1,-1,1]]                        # (3|2)
RC = ref(C); RA = rref(A); RB = rref(B); R1 = rref(D1); R2 = rref(D2); R3 = rref(D3)
assert [v for r in RA for v in r] == [1,0,0,2,0,1,0,1,0,0,1,3]
assert [r[-1] for r in RB] == [3,4,3]
assert RC == [[1,F(1,3),F(2,3),F(1,3)],[0,1,-1,7],[0,0,1,-3]]
assert R1[2] == [0,0,0,0] and R2[2] == [0,0,0,1] and [r[-1] for r in R3] == [3,2]

def var(c, i):
    n = ['<i>x</i>','<i>y</i>','<i>z</i>'][i]
    if c == 1: return n
    if c == -1: return '−' + n
    return str(abs(c)) + n
def lgs(M, nr=None):
    rows = []
    for k, r in enumerate(M):
        cells, first = [], True
        for i, c in enumerate(r[:-1]):
            if c == 0: cells += ['', '']; continue
            sign = '' if first and c > 0 else ('−' if c < 0 else '+')
            if first and c < 0: sign = '−'
            cells += [sign, var(abs(c), i)]
            first = False
        rows.append('<tr>' + ''.join(f'<td class="s">{x}</td>' if j % 2 == 0 else f'<td>{x}</td>' for j, x in enumerate(cells)) + f'<td class="s">=</td><td>{str(r[-1]).replace("-","−")}</td></tr>')
    return '<table class="lgs">' + ''.join(rows) + '</table>'

def boxes(M, fill, cls=''):
    rows = []
    for r in M:
        tds = []
        for j, v in enumerate(r):
            rs = ' class="rs"' if j == len(r) - 1 else ''
            tds.append(f'<td{rs}><span>{zt(v) if fill else ""}</span></td>')
        rows.append('<tr>' + ''.join(tds) + '</tr>')
    return f'<table class="mxl {cls}">' + ''.join(rows) + '</table>'

def lue(val, fill, cls='t'): return f'<span class="lue {cls}"><span>{val if fill else ""}</span></span>'
def kreuz(on, fill): return f'<span class="kreuz{" x" if on and fill else ""}">{"✗" if on and fill else ""}</span>'
def xyz(vals, fill, names=('x','y','z')):
    return ' &nbsp; '.join(f'<i>{n}</i> = {lue(zt(v), fill)}' for n, v in zip(names, vals))

EXTRA_CSS = '''
table.lgs{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:15px; display:inline-table; vertical-align:middle; }
table.lgs td{ padding:0.2mm 0.5mm; text-align:right; white-space:nowrap; }
table.lgs td.s{ padding:0.2mm 1.2mm; }
table.mxl td.rs{ border-left:1.4px solid #1d1d1f; padding-left:1mm; }
table.mxl.f td > span{ height:8.6mm; width:10.5mm; }
.gegeben.zw{ gap:2mm 7mm; align-items:center; }
.fall{ display:grid; grid-template-columns:auto auto 1fr; gap:1mm 6mm; align-items:center; margin:0.5mm 0 1.5mm 4mm; }
.fall .lab{ font-family:Calibri,Arial,sans-serif; font-size:12px; color:#555; }
.fall .art{ font-size:12.6px; white-space:nowrap; }
.fall .art .kreuz{ margin-left:2mm; }
.pfeil{ font-size:18px; color:#555; }
.txt.k{ font-size:12.4px; color:#444; margin-left:4mm; }
.an.weg b.k{ min-width:19mm !important; }
.aufg.big{ font-size:17px; } .aufg.big table.lgs{ font-size:18px; } .aufg.big table.lgs td{ padding:0.8mm 0.6mm; }
table.mxl.f td > span{ height:10mm; width:14mm; font-size:15px; }
table.mxl td > span{ width:12mm; height:7.5mm; }
.lue.o{ width:46mm; height:9mm; font-size:15px; justify-content:center; }
.lue.o3{ width:92mm; height:6.6mm; font-size:12px; justify-content:flex-start; padding:0 2mm; }
.gegeben.nw{ flex-wrap:nowrap; justify-content:space-between; }
table.mxl.k td > span{ width:8mm; height:5.4mm; }
table.lgs.sm{ font-size:14px; }
.lue.o2{ width:56mm; height:6.6mm; font-size:12px; justify-content:flex-start; padding:0 2mm; }
'''

def page(model, fill):
    tpl = open(SRC + ('Arbeitsblatt_fx991_Matrizen.html' if model == 'cw' else 'Arbeitsblatt_fx991DEX_Matrizen.html'), encoding='utf-8').read()
    pre = 'fx991_' if model == 'cw' else 'fx991DEX_'
    mname = 'CASIO fx-991DE CW' if model == 'cw' else 'CASIO fx-991DE X'
    head = tpl[:tpl.index('</style>')] + EXTRA_CSS + '</style></head>'
    head = re.sub(r'<title>.*?</title>', f'<title>{"Lösung " if fill else ""}Zeilenstufenform {"fx-991DE CW" if model=="cw" else "fx-991DE X"}</title>', head)
    logo = re.search(r'<img class="logo" src="([^"]+)"', tpl).group(1)
    frame = re.search(r'(<svg class="qrframe".*?</svg>)', tpl, re.S).group(1)
    gurl = BASE + pre + 'Stufenform_Schritt_fuer_Schritt.html'
    gq = qr(gurl)
    frame = re.sub(r'href="data:[^"]+"', f'href="{gq}"', frame)
    T = lambda s, c='': f'<span class="taste {c}">{s}</span>'
    if model == 'cw':
        wege = (f'<b class="k">Öffnen</b> {T("HOME")} ▸ Matrix ▸ {T("OK")} &nbsp;·&nbsp; <b>Speichern</b> {T("TOOLS")} ▸ MatA ▸ {T("OK")} ▸ Größe ▸ Bestätigen ▸ Zahlen mit {T("EXE")} ▸ {T("AC")}<br>'
                f'<b class="k">Ref / Rref</b> {T("CATALOG")} ▸ Matrix ▸ Matrizenrechnung ▸ <b>Stufenform REF</b> / <b>RREF</b> ▸ MatA ▸ {T(")")} {T("EXE")}')
        tipp = f'Spalten = Unbekannte + 1 · fehlende Variable → <b>0</b> · Vorzeichen {T("SHIFT","sh")} {T("−")} · Ändern: {T("TOOLS")} ▸ Matrix ▸ Editieren'
    else:
        wege = (f'<b class="k">Öffnen</b> {T("MENU","rd")} {T("4","w")} &nbsp;·&nbsp; <b>Speichern</b> {T("OPTN")} {T("1","w")} ▸ Matrix ▸ Zeilen ▸ Spalten ▸ Zahlen mit {T("=","w")} ▸ {T("AC","b")}<br>'
                f'<b class="k">Ref / Rref</b> {T("OPTN")} {T("▼")} {T("▼")} {T("1","w")} (REF) / {T("2","w")} (RREF) ▸ {T("OPTN")} {T("3","w")} (MatA) ▸ {T(")")} {T("=","w")}')
        tipp = f'Spalten = Unbekannte + 1 · fehlende Variable → <b>0</b> · Vorzeichen {T("(−)")} · Ändern: {T("OPTN")} {T("2","w")}'
    h1 = 'Lösung: Gauß auf Knopfdruck' if fill else 'Taschenrechner-Führerschein: Gauß auf Knopfdruck'
    app = 'App Matrix' if model == 'cw' else 'Modus Matrizen'
    out = [head, f'<body class="{"lsg" if fill else ""}">\n<div class="page"><div class="page-content">\n',
           f'<div class="page-header"><div><h1>{h1}</h1><div class="sub">Zeilenstufenform mit Ref und Rref · LGS lösen · {app} · {mname}</div></div>\n<img class="logo" src="{logo}" alt="RWB Essen fhr"></div>\n']
    if not fill: out.append('<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>\n')
    out.append('<div class="anleitung"><div class="links">\n<p class="an">QR-Code scannen und die <b>Tour</b> am <b>eigenen Rechner</b> mitmachen.</p>\n'
               f'<p class="an weg" style="font-size:12.2px">{wege}</p>\n<p class="an tipp" style="font-size:11.6px"><b class="t">Wichtig:</b> {tipp}</p>\n'
               f'</div><div class="qrs"><a class="qrlink" href="{gurl}">{frame}</a></div></div>\n')
    out.append('<div class="aufgaben">')
    RRC = rref(C)
    sol = [r[-1] for r in RRC]
    Lm = '(' + ' | '.join(zt(v) for v in sol) + ')'
    out.append('<div class="blk"><p class="txt" style="font-size:14.5px">Gegeben ist das lineare Gleichungssystem. Speichern Sie es als erweiterte Matrix <b>MatA</b> im Rechner (3 Zeilen, 4 Spalten).</p>\n'
               f'<div class="gegeben" style="margin:2mm 0 0 8mm"><span class="aufg big">{lgs(C)}</span></div></div>\n')
    out.append('<div class="blk"><div class="sec"><span class="nr">1</span>Ref: Zeilenstufenform<span class="teil">✍ nach Tour-Teil 2</span></div>\n'
               '<p class="txt">Bestimmen Sie mit dem Rechner <b>Ref(<i>A</i>)</b> und tragen Sie das Ergebnis ein.</p>\n'
               f'<div class="gegeben zw"><span class="aufg big">Ref(<i>A</i>) = {boxes(RC, fill, "f")}</span></div></div>\n')
    out.append('<div class="blk"><div class="sec"><span class="nr">2</span>Rref: reduzierte Zeilenstufenform<span class="teil">✍ nach Tour-Teil 3</span></div>\n'
               '<p class="txt">Bestimmen Sie mit dem Rechner <b>Rref(<i>A</i>)</b>. Lesen Sie die Lösungsmenge ab.</p>\n'
               f'<div class="gegeben zw" style="gap:2mm 16mm"><span class="aufg big">Rref(<i>A</i>) = {boxes(RRC, fill, "f")}</span>'
               f'<span class="aufg big"><i>L</i> = {{ {lue(Lm, fill, "o")} }}</span></div></div>\n')

    # Code
    bx = ['7', '3', '1', '4']
    labs = ['Ref(<i>A</i>): Zeile 2,<br>Spalte 4', 'Anzahl der<br>Nullen in Ref(<i>A</i>)', '<i>x</i>-Wert<br>in <i>L</i>', '<i>y</i>-Wert<br>in <i>L</i>']
    lurl, uurl = BASE + 'Loesung_' + pre + 'Stufenform.html', BASE + pre + 'Uebung_Stufenform.html'
    out.append('<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein – das ist der Code für die Lösung.</div>\n<div class="ziff">'
               + ''.join(f'<div class="z"><span class="bx">{b if fill else ""}</span><span class="lab">{l}</span></div>' for b, l in zip(bx, labs))
               + f'</div>\n<div class="lqr"><a class="qrlink" href="{lurl}"><img src="{qr(lurl)}" alt="QR-Code Lösung"><span>Lösung</span></a></div>'
               f'<div class="lqr"><a class="qrlink" href="{uurl}"><img src="{qr(uurl)}" alt="QR-Code Übung"><span>Übung</span></a></div></div>\n')
    out.append('</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; Taschenrechner-Führerschein</span><span>Zeilenstufenform (Ref / Rref)</span></div></div>\n</body></html>')
    fn = ('Loesung_' if fill else 'Arbeitsblatt_') + pre + 'Stufenform.html'
    open(OUT + fn, 'w', encoding='utf-8').write(''.join(out))
    print('ok', fn)

for m in ('cw', 'dx'):
    for f in (False, True):
        page(m, f)
