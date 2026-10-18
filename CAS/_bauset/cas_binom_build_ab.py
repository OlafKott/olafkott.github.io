#!/usr/bin/env python3
# Baut Arbeitsblatt (HTML + PDF) und verschlüsselte Lösung: CAS-Führerschein Binomialverteilung
import re, io, os, base64, json, asyncio, sys
from math import comb
import qrcode
from PIL import Image
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

REPO = '/home/claude/olafkott.github.io/CAS'
OUT = f'{REPO}/Binomialverteilung'
URL = 'https://olafkott.github.io/CAS/Binomialverteilung/'
CODE = '5872'

def qr(url):
    q = qrcode.QRCode(border=1, box_size=14, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url); q.make(fit=True)
    im = q.make_image(fill_color='black', back_color='white').get_image().convert('1')
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True)
    return base64.b64encode(b.getvalue()).decode()

pdf = lambda n, p, k: comb(n, k) * p**k * (1-p)**(n-k)
cdf = lambda n, p, k: sum(pdf(n, p, i) for i in range(k+1))
de = lambda v, d=4: f'{v:.{d}f}'.replace('.', ',')
dp = lambda p: str(p).replace('.', ',')

# Aufgabe 1: n, p, k
A1 = [(10, 0.4, 4), (20, 0.3, 5), (50, 0.1, 4), (15, 0.8, 11)]
# Aufgabe 2: Multiple-Choice-Test, 20 Fragen, 4 Antworten, raten
N2, P2 = 20, 0.25
A2 = [('Genau 5 Antworten sind richtig.', '=', 5),
      ('Höchstens 5 Antworten sind richtig.', '≤', 5),
      ('Höchstens 7 Antworten sind richtig.', '≤', 7)]
v2 = [pdf(N2, P2, k) if op == '=' else cdf(N2, P2, k) for _, op, k in A2]

# Lösungscode
r = lambda v: f'{v:.4f}'
code = r(pdf(*A1[0]))[3] + r(cdf(*A1[3]))[5] + r(v2[1])[4] + r(v2[2])[5]
assert code == CODE, code

src = open(f'{REPO}/Integrale/Arbeitsblatt_CAS_Integrale.html').read()
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
css = css[:css.index('.sf{')]  # nur Grundgerüst
logo = re.search(r'class="logo" src="data:image/png;base64,([^"]+)"', src).group(1)
frame = re.search(r'(<svg class="qrframe".*?</svg>)', src, re.S).group(1)
frame = re.sub(r'href="data:image/png;base64,[^"]+"', 'href="data:image/png;base64,' + qr(URL + 'CAS_Binomialverteilung_Schritt_fuer_Schritt.html') + '"', frame)

css += '''
.sec{ margin:14px 0 7px; }
table.bt{ border-collapse:collapse; margin:4px 0 4px 6mm; font-family:Cambria,Georgia,serif; font-size:15px; }
table.bt th, table.bt td{ border:1px solid #a9afb9; text-align:center; height:9.2mm; padding:0 2.5mm; }
table.bt th{ background:#e9ebef; font-weight:normal; height:auto; padding:1.5mm 2.5mm; font-size:13.5px; line-height:1.3; }
table.bt td.b{ font-weight:bold; font-family:Georgia,serif; }
table.bt td.v{ min-width:13mm; }
table.bt .lue{ width:32mm; height:8mm; }
.np{ margin:4px 0 6px 6mm; font-family:Cambria,Georgia,serif; font-size:16px; display:flex; gap:12mm; align-items:center; }
.np .lue{ width:24mm; height:8mm; }
table.ft{ border-collapse:collapse; margin:4px 0 0 6mm; width:calc(100% - 6mm); font-size:14px; margin-bottom:6mm; }
table.ft th, table.ft td{ border:1px solid #a9afb9; height:10.5mm; padding:0 2.5mm; text-align:left; }
table.ft th{ background:#e9ebef; font-weight:normal; height:7mm; font-size:12.5px; font-family:Calibri,Arial,sans-serif; }
table.ft td.b{ font-weight:bold; width:9mm; text-align:center; }
table.ft td.an{ width:40mm; }
table.ft td.l{ width:48mm; text-align:center; white-space:nowrap; }
table.ft .lue{ width:32mm; height:8mm; }
.lsg .lue{ background:#FDECEC; border-color:#E57373; color:#C62828; font-weight:bold; }
.lue{ display:inline-flex; align-items:center; justify-content:center; font-family:Cambria,Georgia,serif; font-size:15px; }
.code .z{ width:24mm; }
.page-content{ display:flex; flex-direction:column; }
.page-content > .code{ margin-top:auto !important; }
'''

PX = lambda op, k: f'<i>P</i>(<i>X</i> {op} {k})'

def rows1(fill=False):
    h = ''
    for i, (n, p, k) in enumerate(A1):
        a = de(pdf(n, p, k)) if fill else ''; b = de(cdf(n, p, k)) if fill else ''
        h += f'<tr><td class="b">{"abcd"[i]})</td><td class="v">{n}</td><td class="v">{dp(p)}</td><td class="v">{k}</td><td><span class="lue">{a}</span></td><td><span class="lue">{b}</span></td></tr>'
    return h

def rows2():
    return ''.join(f'<tr><td class="b">{"abc"[i]})</td><td>{t}</td><td class="an"></td><td class="l">≈ <span class="lue"></span></td></tr>' for i, (t, op, k) in enumerate(A2))

anl = f'''<div class="anleitung"><div class="links"><div class="kt">So arbeiten Sie</div>
<ol><li>Scannen Sie den QR-Code und starten Sie die <b>Schritt-für-Schritt-Tour</b>.</li>
<li>Machen Sie jeden Schritt am <b>eigenen Handheld</b> mit.</li>
<li>Erscheint in der Tour <b style="color:#2E7D32">✍ Arbeitsblatt</b>, bearbeiten Sie hier die Aufgabe.</li></ol>
<div class="ablauf"><span><b>Genau</b> {PX('=','<i>k</i>')}: menu ▸ 5 ▸ 5 ▸ D Binomial Pdf &nbsp;<i>n</i>, tab, <i>p</i>, tab, <i>k</i>, enter</span><span><b>Höchstens</b> {PX('≤','<i>k</i>')}: menu ▸ 5 ▸ 5 ▸ E Binomial Cdf &nbsp;<i>n</i>, tab, <i>p</i>, tab, 0, tab, <i>k</i>, enter</span><span><b>Runden:</b> 4 Stellen nach dem Komma</span></div>
</div><div class="qrs"><a class="qrlink" href="{URL}CAS_Binomialverteilung_Schritt_fuer_Schritt.html">{frame}</a></div></div>'''

body = f'''<div class="page"><div class="page-content">
<div class="page-header"><div><h1>CAS-Führerschein: Binomialverteilung</h1><div class="sub">Genau und höchstens mit Binomial Pdf und Binomial Cdf &middot; TI-Nspire CX CAS</div></div><img class="logo" src="data:image/png;base64,{logo}" alt="RWB Essen AHR"></div>
<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>
{anl}

<div class="sec"><span class="nr">1</span>Genau und höchstens<span class="teil">✍ nach Tour-Teil 1 und 2</span></div>
<p class="auftrag">Die Zufallsgröße <i>X</i> ist binomialverteilt.<br>Berechnen Sie mit dem CAS beide Wahrscheinlichkeiten.<br>Runden Sie auf <b>4 Stellen nach dem Komma</b>.</p>
<table class="bt"><tr><th></th><th><i>n</i></th><th><i>p</i></th><th><i>k</i></th><th>genau<br>{PX('=','<i>k</i>')}</th><th>höchstens<br>{PX('≤','<i>k</i>')}</th></tr>%ROWS1%</table>

<div class="sec"><span class="nr">2</span>Raten im Test<span class="teil">✍ nach Tour-Teil 2</span></div>
<p class="auftrag">Ein Test hat 20 Fragen. Jede Frage hat 4 Antworten. Genau eine Antwort ist richtig.<br>Sie raten bei jeder Frage. <i>X</i> ist die Anzahl der richtigen Antworten.</p>
<div class="np"><span><i>n</i> = <span class="lue">%N%</span></span><span><i>p</i> = <span class="lue">%P%</span></span></div>
<p class="auftrag">Schreiben Sie den Ansatz auf, z.&nbsp;B. {PX('=','3')} oder {PX('≤','3')}. Berechnen Sie dann die Wahrscheinlichkeit.</p>
<table class="ft"><tr><th></th><th>Ereignis</th><th>Ansatz</th><th>Ergebnis</th></tr>%ROWS2%</table>

<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein.<br>Das ist der Code für die Lösung.</div><div class="ziff"><div class="z"><span class="bx"></span><span class="lab">2. Nachkommastelle<br>bei 1 a) genau</span></div><div class="z"><span class="bx"></span><span class="lab">4. Nachkommastelle<br>bei 1 d) höchstens</span></div><div class="z"><span class="bx"></span><span class="lab">3. Nachkommastelle<br>bei 2 b)</span></div><div class="z"><span class="bx"></span><span class="lab">4. Nachkommastelle<br>bei 2 c)</span></div></div>
<div class="lqr"><a class="qrlink" href="{URL}Loesung_CAS_Binomialverteilung.html"><img src="data:image/png;base64,{qr(URL+'Loesung_CAS_Binomialverteilung.html')}" alt="QR-Code Lösung"><span>Lösung</span></a></div>
<div class="lqr"><a class="qrlink" href="{URL}CAS_Uebung_Binomialverteilung.html"><img src="data:image/png;base64,{qr(URL+'CAS_Uebung_Binomialverteilung.html')}" alt="QR-Code Übung"><span>Übung</span></a></div></div>
</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; CAS-Führerschein</span><span>Binomialverteilung</span></div></div>'''

ab = body.replace('%ROWS1%', rows1()).replace('%ROWS2%', rows2()).replace('%N%', '').replace('%P%', '')
html = f'''<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CAS-Führerschein – Binomialverteilung</title>
<style>{css}</style></head><body>
{ab}
</body></html>
'''
open(f'{OUT}/Arbeitsblatt_CAS_Binomialverteilung.html', 'w').write(html)

# ------------------------------------------------------------- Lösung (inline-Styles, Moodle-tauglich)
S_H2 = 'font-size:18px;color:#1F4E99;margin:22px 0 8px;border-bottom:1px solid #dde1e7;padding-bottom:4px'
RED = 'color:#C62828;font-weight:bold'
TD = 'border:1px solid #cfd4dc;padding:5px 9px;text-align:center'
TH = TD + ';background:#eef0f3;font-weight:normal'
MONO = 'font-family:Consolas,monospace;background:#eceef1;border-radius:3px;padding:0 4px'
def cas(v): return f'{v:.6g}' if v >= 0.1 else f'{v:.6g}'
t1 = ''.join(f'<tr><td style="{TD};font-weight:bold">{"abcd"[i]})</td><td style="{TD}">{n}</td><td style="{TD}">{dp(p)}</td><td style="{TD}">{k}</td><td style="{TD}"><span style="{RED}">{de(pdf(n,p,k))}</span></td><td style="{TD}"><span style="{RED}">{de(cdf(n,p,k))}</span></td></tr>' for i, (n, p, k) in enumerate(A1))
t2 = ''.join(f'<tr><td style="{TD};font-weight:bold">{"abc"[i]})</td><td style="{TD};text-align:left">{tx}</td><td style="{TD}"><span style="{RED}">{PX(op,k)}</span></td><td style="{TD}"><span style="{MONO}">{"binomPdf(20,0.25,%d)"%k if op=="=" else "binomCdf(20,0.25,0,%d)"%k}</span></td><td style="{TD}"><span style="{RED}">{de(v2[i])}</span></td></tr>' for i, (tx, op, k) in enumerate(A2))
lsg = f'''<div style="max-width:760px;margin:0 auto;padding:20px 16px 40px;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:#1d1d1f;line-height:1.6;font-size:16px">
<h1 style="font-size:22px;color:#1F4E99;margin:0 0 4px">Lösung: CAS-Führerschein Binomialverteilung</h1>
<p style="margin:0 0 10px;color:#5b6270">Code {CODE} ✓ &middot; Vergleichen Sie Ihre Ergebnisse.</p>
<h2 style="{S_H2}">1 &nbsp;Genau und höchstens</h2>
<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:15.5px;font-family:Cambria,Georgia,serif"><tr><th style="{TH}"></th><th style="{TH}"><i>n</i></th><th style="{TH}"><i>p</i></th><th style="{TH}"><i>k</i></th><th style="{TH}">genau<br>{PX('=','<i>k</i>')}</th><th style="{TH}">höchstens<br>{PX('≤','<i>k</i>')}</th></tr>{t1}</table></div>
<p style="margin:8px 0 0;font-size:14.5px;color:#5b6270">Beispiel 1 a) genau: <span style="{MONO}">binomPdf(10,0.4,4)</span> = {cas(pdf(*A1[0]))} ≈ {de(pdf(*A1[0]))}<br>Beispiel 1 a) höchstens: <span style="{MONO}">binomCdf(10,0.4,0,4)</span> = {cas(cdf(*A1[0]))} ≈ {de(cdf(*A1[0]))}</p>
<h2 style="{S_H2}">2 &nbsp;Raten im Test</h2>
<p style="margin:0 0 8px"><i>n</i> = <span style="{RED}">20</span> &nbsp;(20 Fragen) &nbsp;&middot;&nbsp; <i>p</i> = <span style="{RED}">0,25</span> &nbsp;(1 von 4 Antworten ist richtig)</p>
<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:15px"><tr><th style="{TH}"></th><th style="{TH}">Ereignis</th><th style="{TH}">Ansatz</th><th style="{TH}">Eingabe im CAS</th><th style="{TH}">Ergebnis</th></tr>{t2}</table></div>
<p style="margin:8px 0 0;font-size:14.5px;color:#5b6270"><b>genau</b> → Binomial Pdf (menu ▸ 5 ▸ 5 ▸ D) &nbsp;&middot;&nbsp; <b>höchstens</b> → Binomial Cdf (menu ▸ 5 ▸ 5 ▸ E) mit unterer Grenze 0</p>
</div>'''

salt, iv = os.urandom(16), os.urandom(12)
key = PBKDF2HMAC(hashes.SHA256(), 32, salt, 150000).derive(CODE.encode())
ct = AESGCM(key).encrypt(iv, lsg.encode(), None)
D = json.dumps({'s': base64.b64encode(salt).decode(), 'iv': base64.b64encode(iv).decode(), 'ct': base64.b64encode(ct).decode(), 'it': 150000})
tpl = open(f'{REPO}/Integrale/Loesung_CAS_Integrale.html').read()
tpl = re.sub(r'const D=\{.*?\};', lambda m: 'const D=' + D + ';', tpl, flags=re.S)
tpl = tpl.replace('Lösung CAS-Führerschein Integrale', 'Lösung CAS-Führerschein Binomialverteilung')
assert 'Integrale' not in tpl
open(f'{OUT}/Loesung_CAS_Binomialverteilung.html', 'w').write(tpl)
open('/home/claude/bin_build/lsg_plain.html', 'w').write('<meta charset="utf-8">' + lsg)

# ------------------------------------------------------------- PDF
async def mkpdf():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        await pg.goto('file://' + f'{OUT}/Arbeitsblatt_CAS_Binomialverteilung.html'); await pg.wait_for_timeout(300)
        await pg.pdf(path=f'{OUT}/Arbeitsblatt_CAS_Binomialverteilung.pdf', format='A4', print_background=True, prefer_css_page_size=True)
        await b.close()
asyncio.run(mkpdf())
import fitz
d = fitz.open(f'{OUT}/Arbeitsblatt_CAS_Binomialverteilung.pdf'); print('Seiten:', len(d), 'Code:', code)
d[0].get_pixmap(dpi=110).save('/home/claude/bin_build/ab.png')
print([de(pdf(*a)) + '/' + de(cdf(*a)) for a in A1], [de(v) for v in v2])
