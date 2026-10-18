import re, io, base64, qrcode
from math import comb
R = '/home/claude/olafkott.github.io/CAS/'
D = R + 'Binomial_Gesucht/'
URL = 'https://olafkott.github.io/CAS/Binomial_Gesucht/'
wt = open(R + 'Wertetabelle/Arbeitsblatt_CAS_Wertetabelle.html').read()
CSS = re.search(r'<style>(.*?)</style>', wt, re.S).group(1)
LOGO = re.search(r'<img class="logo" src="(data:image/png;base64,[^"]+)"', wt).group(1)
FRAME = re.search(r'(<svg class="qrframe".*?</svg>)', wt, re.S).group(1)

def qr(url):
    q = qrcode.QRCode(box_size=10, border=4, error_correction=qrcode.constants.ERROR_CORRECT_L)
    q.add_data(url); q.make(fit=True)
    b = io.BytesIO(); q.make_image().convert('1').save(b, 'PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

def frame(url):
    img = qr(url)
    return re.sub(r'href="data:image/png;base64,[^"]+"', f'href="{img}"', FRAME)

def cdf(n, p, a, b):
    return sum(comb(n, i) * p**i * (1-p)**(n-i) for i in range(max(a, 0), min(b, n)+1))

def bis(f, a, b):
    for _ in range(100):
        m = (a+b)/2
        if (f(a) > 0) == (f(m) > 0): a = m
        else: b = m
    return (a+b)/2

de = lambda v, d=4: f'{v:.{d}f}'.replace('.', ',')
P3A = bis(lambda p: cdf(30, p, 0, 10) - 0.9, 0.01, 0.99)
P3B = bis(lambda p: cdf(20, p, 1, 20) - 0.99, 0.01, 0.99)
CODE = '5348'
assert de(P3A, 3) == '0,248' and de(P3B, 3) == '0,206'

EXTRA = '''
.ctx{ font-size:14.2px; margin:0 0 2px; }
.hang{ font-size:14.2px; margin:4px 0 2px; }
.eing{ font-family:Cambria,Georgia,serif; font-size:15px; margin:2px 0 0 6mm; display:flex; align-items:center; gap:3mm; flex-wrap:wrap; }
.eing .lue{ height:8.4mm; }
.eing .lue.l{ width:72mm; } .eing{ gap:2mm; } .eing .lue.s{ width:24mm; } .eing .lue.xs{ width:17mm; }
.eing .gap{ width:6mm; }
.cas{ font-family:Consolas,'Courier New',monospace; font-size:13px; }
table.bt{ border-collapse:collapse; font-family:Cambria,Georgia,serif; font-size:14px; margin:2.5mm 0 1mm 6mm; }
table.bt th, table.bt td{ border:1px solid #a9afb9; text-align:center; padding:0 3px; height:8mm; }
table.bt th{ background:#e9ebef; font-weight:normal; width:27mm; }
table.bt tr.xr td{ background:#e9ebef; font-weight:bold; width:21mm; height:7mm; }
table.bt td{ background:var(--feld); }
.lsg-only{ display:none; }
body.lsg .lsg-only{ display:block; }
.ks2{ display:flex; gap:6mm; align-items:flex-start; margin:3mm 0 0 6mm; }
.ks2 .kstip{ flex:1; }
.lue .lsg{ line-height:8.4mm; font-size:14px; }
.lsg.sm{ font-size:13px; }
.p1 .sec{ margin-top:6px !important; margin-bottom:4px !important; }
.p2 .sec{ margin-top:2px !important; margin-bottom:6px !important; }
.syn2{ font-size:12.6px; background:#eef3fb; border-radius:4px; padding:3px 10px; margin:0 0 6px; font-family:Calibri,Arial,sans-serif; }
.syn2 .cas{ font-size:12.4px; }
.antw{ height:19mm; }
.s3{ display:flex; gap:4mm; align-items:flex-start; } .s3l{ flex:1; } .s3r{ flex:0 0 70mm; }
.s3 .eing{ margin-left:0; margin-top:3mm; } .s3 .eing .lue.l{ width:62mm; }
table.bt{ margin:1.5mm 0 0 6mm !important; }
.rd{ font-size:12.4px; font-family:Calibri,Arial,sans-serif; color:#555; }
.s3 .eing .lue.xs{ width:16mm; } .s3 .eing .lue.s{ width:20mm; } .s3 .eing .gap{ width:3mm; }
.hin3{ font-size:12.4px; font-family:Calibri,Arial,sans-serif; color:#555; margin:3mm 0 0; line-height:1.5; }
table.bt th, table.bt td{ height:7mm !important; } table.bt tr.xr td{ height:6mm !important; }
.term{ margin:0 0 1px !important; }

table.ueb{ border-collapse:collapse; width:100%; font-family:Cambria,Georgia,serif; font-size:14.5px; margin-top:2mm; }
table.ueb th, table.ueb td{ border:1px solid #a9afb9; height:9mm; padding:0 8px; }
table.ueb tr:first-child th{ background:#e9ebef; height:7.5mm; font-weight:normal; font-size:13px; font-family:Calibri,Arial,sans-serif; }
table.ueb tr th:first-child{ width:34mm; background:#e9ebef; font-weight:normal; text-align:left; }
table.ueb td{ background:var(--feld); }

/* Luft zwischen den Aufgaben */
.anleitung .links{ font-size:12.6px !important; } .anleitung li{ line-height:1.35 !important; margin-bottom:1px; }
.qrs svg.qrframe{ width:23mm !important; height:30.7mm !important; }
.p1 .sec{ margin-top:5.5mm !important; margin-bottom:2.5mm !important; }
.ctx{ margin:0 0 1mm !important; }
.term{ margin:1mm 0 2mm !important; }
.eing{ margin-top:1.5mm !important; }
table.bt{ margin:2.5mm 0 0 6mm !important; } .eing .lue.l{ width:60mm !important; } .s3 .eing .lue.l{ width:50mm !important; } .s3 .eing .lue.s.f2{ width:16mm; }

.s3 .eing{ margin-top:3mm !important; }
.hin3{ margin-top:3mm !important; }
.code{ margin-top:auto !important; }
'''

def L(cls, sol, small=False):
    """Lückenfeld; in der Lösung mit roter Eintragung"""
    inner = f'<span class="lsg{" sm" if small else ""}">{sol}</span>' if SOL else ''
    return f'<span class="lue {cls}">{inner}</span>'

def btab(head, xs, label, vals):
    r1 = ''.join(f'<td>{x}</td>' for x in xs)
    r2 = ''.join(f'<td>{(f"<span class=\'lsg\'>{v}</span>" if SOL else "")}</td>' for v in vals)
    return f'<table class="bt"><tr class="xr"><th>{head}</th>{r1}</tr><tr><th>{label}</th>{r2}</tr></table>'

def sketch():
    # Koordinatensystem 0 ≤ p ≤ 1, 0 ≤ y ≤ 1
    W, H, ox, oy, ux, uy = 70, 46, 7, 41, 56, 34
    X = lambda x: ox + ux*x; Y = lambda y: oy - uy*y
    s = f'<svg viewBox="0 0 {W} {H}" width="{W}mm" height="{H}mm" xmlns="http://www.w3.org/2000/svg">'
    for i in range(11):
        c = '#c9ced6' if i % 5 == 0 else '#e6e9ee'
        s += f'<line x1="{X(i/10):.2f}" y1="{Y(0):.2f}" x2="{X(i/10):.2f}" y2="{Y(1):.2f}" stroke="{c}" stroke-width="0.22"/>'
        s += f'<line x1="{X(0):.2f}" y1="{Y(i/10):.2f}" x2="{X(1):.2f}" y2="{Y(i/10):.2f}" stroke="{c}" stroke-width="0.22"/>'
    s += f'<line x1="{X(0)-2}" y1="{Y(0)}" x2="{X(1)+3.5}" y2="{Y(0)}" stroke="#222" stroke-width="0.35"/><path d="M{X(1)+5.5} {Y(0)} l-2.6 -1.3 v2.6z" fill="#222"/>'
    s += f'<line x1="{X(0)}" y1="{Y(0)+2}" x2="{X(0)}" y2="{Y(1)-3.5}" stroke="#222" stroke-width="0.35"/><path d="M{X(0)} {Y(1)-5.5} l-1.3 2.6 h2.6z" fill="#222"/>'
    s += f'<text x="{X(1)+4}" y="{Y(0)+4.6}" font-size="3.6" font-style="italic" font-family="Cambria,Georgia,serif">p</text>'
    s += f'<text x="{X(0)+1.6}" y="{Y(1)-3.4}" font-size="3.3" font-style="italic" font-family="Cambria,Georgia,serif">P</text>'
    for v in [0.5, 1]:
        s += f'<text x="{X(v):.2f}" y="{Y(0)+4}" font-size="2.8" text-anchor="middle" font-family="Arial,sans-serif" fill="#333">{de(v,1) if v<1 else "1"}</text>'
        s += f'<text x="{X(0)-1.4}" y="{Y(v)+1:.2f}" font-size="2.8" text-anchor="end" font-family="Arial,sans-serif" fill="#333">{de(v,1) if v<1 else "1"}</text>'
    s += f'<text x="{X(0)-1.4}" y="{Y(0)+4}" font-size="2.8" text-anchor="end" font-family="Arial,sans-serif" fill="#333">0</text>'
    if SOL:
        pts = ' '.join(f'{X(i/200):.2f},{Y(cdf(30, i/200, 0, 10)):.2f}' for i in range(201))
        s += f'<polyline points="{pts}" fill="none" stroke="#C62828" stroke-width="0.6"/>'
        s += f'<line x1="{X(0)}" y1="{Y(0.9)}" x2="{X(1)}" y2="{Y(0.9)}" stroke="#C62828" stroke-width="0.5"/>'
        s += f'<circle cx="{X(P3A):.2f}" cy="{Y(0.9):.2f}" r="0.9" fill="#C62828"/>'
        s += f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(P3A):.2f}" y2="{Y(0)}" stroke="#C62828" stroke-width="1.4" opacity=".55"/>'
        s += f'<text x="{X(P3A)+2:.2f}" y="{Y(0.9)-1.6:.2f}" font-size="3.2" fill="#C62828" font-family="Segoe Print,Comic Sans MS,cursive" font-weight="bold">S</text>'
        s += f'<text x="{X(0.55):.2f}" y="{Y(0.9)-1.6:.2f}" font-size="3" fill="#C62828" font-family="Segoe Print,Comic Sans MS,cursive" font-weight="bold">f2</text>'
        s += f'<text x="{X(0.42):.2f}" y="{Y(0.4):.2f}" font-size="3" fill="#C62828" font-family="Segoe Print,Comic Sans MS,cursive" font-weight="bold">f1</text>'
    return s + '</svg>'

def page1():
    h = f'''<div class="page p1"><div class="page-content">
<div class="page-header"><div><h1>{H1}</h1><div class="sub">Graphs &middot; binomCdf &middot; Wertetabelle mit ctrl T &middot; Schnittpunkt &middot; TI-Nspire CX CAS</div></div><img class="logo" src="{LOGO}" alt="RWB Essen AHR"></div>
{'' if SOL else '<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>'}
<div class="anleitung"><div class="links"><div class="kt">So arbeiten Sie</div><ol><li>Scannen Sie den QR-Code und starten Sie die <b>Schritt-für-Schritt-Tour</b>.</li><li>Machen Sie jeden Schritt am <b>eigenen Handheld</b> mit.</li><li>Erscheint in der Tour <b style="color:#2E7D32">✍ Arbeitsblatt</b>, bearbeiten Sie hier die Aufgabe.</li></ol><div class="ablauf"><span>⌂ on ▸ 1 ▸ 2: <b>Graphs</b></span><span><b>binomCdf(n,p,a,b)</b> = P(a ≤ X ≤ b)</span><span>gesucht = <b>x</b></span><span><b>ctrl T</b> = Tabelle</span><span>menu ▸ 2 ▸ 5: Tabellenanfang</span><span>menu ▸ 6 ▸ <b>4: Schnittpunkt</b></span></div></div><div class="qrs"><a class="qrlink" href="{URL}CAS_Binomial_Gesucht_Schritt_fuer_Schritt.html">{frame(URL+"CAS_Binomial_Gesucht_Schritt_fuer_Schritt.html")}</a></div></div>
<div class="sec"><span class="nr">1</span><i>n</i>&nbsp;gesucht – mit der Tabelle<span class="teil">✍ nach Tour-Teil 1</span></div>
<p class="ctx"><i>X</i> ist binomialverteilt mit <i>p</i> = 0,15. Bestimmen Sie das kleinste <i>n</i> mit <span class="rd">(Tabellenwerte auf 4 Nachkommastellen)</span></p><p class="term"><i>P</i>(<i>X</i> ≥ 1) ≥ 0,9</p>
<div class="eing"><span>f1(<i>x</i>) =</span>{L("l", '<span class="cas">binomCdf(x,0.15,1,x)</span>')}<span class="gap"></span><span><i>n</i> =</span>{L("s","15")}</div>
{btab("<i>n</i>", [12,13,14,15,16], "<i>P</i>(<i>X</i> ≥ 1)", ["0,8578","0,8791","0,8972","0,9126","0,9257"])}
<div class="sec s2"><span class="nr">2</span><i>k</i>&nbsp;gesucht – mit der Tabelle<span class="teil">✍ nach Tour-Teil 2</span></div>
<p class="ctx"><i>X</i> ist binomialverteilt mit <i>n</i> = 100 und <i>p</i> = 0,08. Bestimmen Sie die kleinste Zahl <i>k</i> mit</p><p class="term"><i>P</i>(<i>X</i> ≤ <i>k</i>) ≥ 0,95</p>
<div class="eing"><span>f1(<i>x</i>) =</span>{L("l", '<span class="cas">binomCdf(100,0.08,0,x)</span>')}<span class="gap"></span><span><i>k</i> =</span>{L("s","13")}</div>
{btab("<i>k</i>", [10,11,12,13,14], "<i>P</i>(<i>X</i> ≤ <i>k</i>)", ["0,8243","0,8972","0,9441","0,9718","0,9867"])}
<div class="sec"><span class="nr">3</span><i>p</i>&nbsp;gesucht – mit dem Graphen<span class="teil">✍ nach Tour-Teil 3</span></div>
<div class="s3"><div class="s3l">
<p class="ctx"><i>X</i> ist binomialverteilt mit <i>n</i> = 30. Bestimmen Sie alle <i>p</i> mit</p><p class="term"><i>P</i>(<i>X</i> ≤ 10) ≥ 0,9</p>
<div class="eing"><span>f1(<i>x</i>) =</span>{L("l", '<span class="cas">binomCdf(30,x,0,10)</span>')}<span class="gap"></span><span>f2(<i>x</i>) =</span>{L("s",'<span class="cas">0.9</span>')}</div>
<div class="eing"><span>Schnittpunkt:&nbsp; S(</span>{L("xs","0,248")}<span>|</span>{L("xs","0,9")}<span>)</span><span class="gap"></span><span><i>p</i> ≤</span>{L("s","0,248")}</div>
<p class="hin3">Runden Sie <i>p</i> auf 3 Nachkommastellen.<br>Skizzieren Sie die Graphen von f1 und f2 und markieren Sie den Schnittpunkt S.</p>
</div><div class="s3r">{sketch()}</div></div>
<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein.<br>Das ist der Code für die Lösung.</div><div class="ziff">
<div class="z"><span class="bx"></span><span class="lab">Einerstelle<br>von <i>n</i> in 1</span></div>
<div class="z"><span class="bx"></span><span class="lab">Einerstelle<br>von <i>k</i> in 2</span></div>
<div class="z"><span class="bx"></span><span class="lab">2. Nachkommastelle<br>von <i>p</i> in 3</span></div>
<div class="z"><span class="bx"></span><span class="lab">3. Nachkommastelle<br>von <i>p</i> in 3</span></div></div>
<div class="lqr"><a class="qrlink" href="{URL}Loesung_CAS_Binomial_Gesucht.html"><img src="{qr(URL+"Loesung_CAS_Binomial_Gesucht.html")}" alt="QR-Code Lösung"><span>Lösung</span></a></div>
<div class="lqr"><a class="qrlink" href="{URL}CAS_Uebung_Binomial_Gesucht.html"><img src="{qr(URL+"CAS_Uebung_Binomial_Gesucht.html")}" alt="QR-Code Übung"><span>Übung</span></a></div></div>
</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; CAS-Führerschein</span><span>Binomialverteilung – n, k oder p gesucht</span></div></div>'''
    if SOL:
        parts = h.split('<span class="bx"></span>')
        h = parts[0] + ''.join(f'<span class="bx"><span class="lsg">{c}</span></span>' + p for c, p in zip(CODE, parts[1:]))
    return h

H1 = 'CAS-Führerschein: Binomialverteilung – <i>n</i>, <i>k</i> oder <i>p</i> gesucht'
for SOL in (False, True):
    title = ('Lösung ' if SOL else '') + 'CAS-Führerschein – Binomialverteilung: n, k oder p gesucht'
    body = page1()
    html = (f'<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title}</title>\n'
            f'<style>{CSS}{EXTRA}</style></head><body class="{"loesung" if SOL else ""}">\n{body}\n</body></html>')
    open(('/tmp/claude-0/-home-claude/29bb5893-50de-5bf2-95b6-a8c6b64d05d6/scratchpad/bin/Loesung_klar.html' if SOL else D+'Arbeitsblatt_CAS_Binomial_Gesucht.html'), 'w').write(html)
print('ok', P3A, P3B)
