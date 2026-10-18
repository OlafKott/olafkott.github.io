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
CODE = '5814'

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
A1 = [(10, 0.4, 4), (20, 0.3, 5), (15, 0.8, 11)]
# Aufgabe 2: Intervalle, n = 12, p = 0,4  (Text, untere Grenze, obere Grenze); erste Zeile = Beispiel
N2, P2 = 12, 0.4
A2 = [('weniger als 4', 0, 3),
      ('mehr als 7', 8, 12),
      ('mindestens 6', 6, 12),
      ('zwischen 3 und 6', 3, 6),
      ('mehr als 2, aber höchstens 5', 3, 5),
      ('mindestens 4, aber weniger als 8', 4, 7),
      ('mehr als 3 und weniger als 9', 4, 8)]
iv_ = lambda a, e: sum(pdf(N2, P2, i) for i in range(a, e+1))
v2 = [iv_(a, e) for _, a, e in A2]

# Lösungscode
r = lambda v: f'{v:.4f}'
code = r(pdf(*A1[0]))[3] + r(cdf(*A1[2]))[5] + r(v2[4])[4] + r(v2[6])[5]
assert code == CODE, code

src = open(f'{REPO}/Integrale/Arbeitsblatt_CAS_Integrale.html').read()
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
css = css[:css.index('.sf{')]  # nur Grundgerüst
logo = re.search(r'class="logo" src="data:image/png;base64,([^"]+)"', src).group(1)
frame = re.search(r'(<svg class="qrframe".*?</svg>)', src, re.S).group(1)
frame = re.sub(r'href="data:image/png;base64,[^"]+"', 'href="data:image/png;base64,' + qr(URL + 'CAS_Binomialverteilung_Schritt_fuer_Schritt.html') + '"', frame)

css += '''
.sec{ margin:11px 0 6px; }
table.bt{ border-collapse:collapse; margin:4px 0 4px 6mm; font-family:Cambria,Georgia,serif; font-size:15px; }
table.bt th, table.bt td{ border:1px solid #a9afb9; text-align:center; height:8.2mm; padding:0 2.5mm; }
table.bt th{ background:#e9ebef; font-weight:normal; height:auto; padding:1mm 2.5mm; font-size:13px; line-height:1.25; }
table.bt td.b{ font-weight:bold; font-family:Georgia,serif; }
table.bt td.v{ min-width:13mm; }
table.bt .lue{ width:32mm; height:7mm; }
table.ft{ border-collapse:collapse; margin:4px 0 0 6mm; width:calc(100% - 6mm); font-size:13.5px; margin-bottom:4mm; }
table.ft th, table.ft td{ border:1px solid #a9afb9; height:9mm; padding:0 1.6mm; text-align:left; }
table.ft th{ background:#e9ebef; font-weight:normal; height:6.5mm; font-size:12px; font-family:Calibri,Arial,sans-serif; text-align:center; }
table.ft td.b{ font-weight:bold; width:8mm; text-align:center; }
table.ft td.tx{ line-height:1.2; font-size:13.5px; white-space:nowrap; }
table.ft td.st{ width:66mm; text-align:center; }
table.ft td.gr{ width:25mm; text-align:center; white-space:nowrap; font-family:Cambria,Georgia,serif; }
table.ft td.gr .lue{ width:8.5mm; height:7mm; }
table.ft td.l{ width:27mm; text-align:center; white-space:nowrap; }
table.ft .l .lue{ width:23mm; height:7.5mm; }
table.ft tr.bsp td{ background:#f6f7f9; color:#555; font-style:italic; }
table.ft tr.bsp .lue{ background:#f6f7f9; border-style:dashed; color:#555; }
.za{ display:inline-flex; gap:0.55mm; vertical-align:middle; }
.za span{ width:4.4mm; height:5.8mm; border:1px solid #9aa3b0; border-radius:1mm; font-family:Calibri,Arial,sans-serif; font-size:10.5px; font-style:normal; display:flex; align-items:center; justify-content:center; background:#fff; color:#333; }
.za span.on{ background:#F9D976; border-color:#b88a00; font-weight:bold; }
.legend{ font-size:12.4px; margin:0 0 3px 6mm; color:#333; }
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

def za(a=None, e=None):
    return '<span class="za">' + ''.join(f'<span class="{"on" if a is not None and a <= i <= e else ""}">{i}</span>' for i in range(N2+1)) + '</span>'

def rows2(fill=False):
    h = ''
    for i, (tx, a, e) in enumerate(A2):
        bsp = i == 0 or fill
        lab = 'Bsp.' if i == 0 else 'abcdef'[i-1] + ')'
        h += (f'<tr class="{"bsp" if i == 0 else ""}"><td class="b">{lab}</td><td class="tx">{tx}</td><td class="st">{za(a, e) if bsp else za()}</td>'
              f'<td class="gr"><span class="lue">{a if bsp else ""}</span> bis <span class="lue">{e if bsp else ""}</span></td>'
              f'<td class="l">≈ <span class="lue">{de(v2[i]) if bsp else ""}</span></td></tr>')
    return h

anl = f'''<div class="anleitung"><div class="links"><div class="kt">So arbeiten Sie</div>
<ol><li>Scannen Sie den QR-Code und starten Sie die <b>Schritt-für-Schritt-Tour</b>.</li>
<li>Machen Sie jeden Schritt am <b>eigenen Handheld</b> mit.</li>
<li>Erscheint in der Tour <b style="color:#2E7D32">✍ Arbeitsblatt</b>, bearbeiten Sie hier die Aufgabe.</li></ol>
<div class="ablauf"><span><b>Genau</b> {PX('=','<i>k</i>')}: menu ▸ 5 ▸ 5 ▸ D Binomial Pdf &nbsp;<i>n</i>, tab, <i>p</i>, tab, <i>k</i>, enter</span><span><b>Höchstens</b> {PX('≤','<i>k</i>')}: menu ▸ 5 ▸ 5 ▸ E Binomial Cdf &nbsp;<i>n</i>, tab, <i>p</i>, tab, 0, tab, <i>k</i>, enter</span><span><b>Intervall</b>: Binomial Cdf mit unterer und oberer Grenze</span><span><b>Runden:</b> 4 Stellen nach dem Komma</span></div>
</div><div class="qrs"><a class="qrlink" href="{URL}CAS_Binomialverteilung_Schritt_fuer_Schritt.html">{frame}</a></div></div>'''

body = f'''<div class="page"><div class="page-content">
<div class="page-header"><div><h1>CAS-Führerschein: Binomialverteilung</h1><div class="sub">Genau, höchstens und Intervalle mit Binomial Pdf und Binomial Cdf &middot; TI-Nspire CX CAS</div></div><img class="logo" src="data:image/png;base64,{logo}" alt="RWB Essen AHR"></div>
<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>
{anl}

<div class="sec"><span class="nr">1</span>Genau und höchstens<span class="teil">✍ nach Tour-Teil 1 und 2</span></div>
<p class="auftrag">Die Zufallsgröße <i>X</i> ist binomialverteilt.<br>Berechnen Sie mit dem CAS beide Wahrscheinlichkeiten.<br>Runden Sie auf <b>4 Stellen nach dem Komma</b>.</p>
<table class="bt"><tr><th></th><th><i>n</i></th><th><i>p</i></th><th><i>k</i></th><th>genau<br>{PX('=','<i>k</i>')}</th><th>höchstens<br>{PX('≤','<i>k</i>')}</th></tr>%ROWS1%</table>

<div class="sec"><span class="nr">2</span>Mehr als, weniger als, zwischen …<span class="teil">✍ nach Tour-Teil 3</span></div>
<p class="auftrag"><i>X</i> ist binomialverteilt mit <i>n</i> = 12 und <i>p</i> = 0,4.<br>Malen Sie auf dem Zahlenstrahl alle Werte von <i>X</i> aus, die zählen.<br>Tragen Sie die Grenzen ein und berechnen Sie die Wahrscheinlichkeit mit Binomial Cdf.<br><b>Zwischen</b> heißt hier: Beide Zahlen zählen mit.</p>
<table class="ft"><tr><th></th><th>Anzahl der Treffer</th><th>Welche Werte zählen?</th><th>Grenzen</th><th>Ergebnis</th></tr>%ROWS2%</table>

<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein.<br>Das ist der Code für die Lösung.</div><div class="ziff"><div class="z"><span class="bx"></span><span class="lab">2. Nachkommastelle<br>bei 1 a) genau</span></div><div class="z"><span class="bx"></span><span class="lab">4. Nachkommastelle<br>bei 1 c) höchstens</span></div><div class="z"><span class="bx"></span><span class="lab">3. Nachkommastelle<br>bei 2 d)</span></div><div class="z"><span class="bx"></span><span class="lab">4. Nachkommastelle<br>bei 2 f)</span></div></div>
<div class="lqr"><a class="qrlink" href="{URL}Loesung_CAS_Binomialverteilung.html"><img src="data:image/png;base64,{qr(URL+'Loesung_CAS_Binomialverteilung.html')}" alt="QR-Code Lösung"><span>Lösung</span></a></div>
<div class="lqr"><a class="qrlink" href="{URL}CAS_Uebung_Binomialverteilung.html"><img src="data:image/png;base64,{qr(URL+'CAS_Uebung_Binomialverteilung.html')}" alt="QR-Code Übung"><span>Übung</span></a></div></div>
</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; CAS-Führerschein</span><span>Binomialverteilung</span></div></div>'''

ab = body.replace('%ROWS1%', rows1()).replace('%ROWS2%', rows2())
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
ZA = lambda a, e: '<span style="display:inline-flex;gap:2px">' + ''.join(f'<span style="width:17px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;border:1px solid {"#b88a00" if a <= i <= e else "#cfd4dc"};border-radius:3px;background:{"#F2B705" if a <= i <= e else "#fff"};font-weight:{"bold" if a <= i <= e else "normal"}">{i}</span>' for i in range(N2+1)) + '</span>'
t2 = ''.join(f'<tr><td style="{TD};font-weight:bold">{"Bsp." if i == 0 else "abcdef"[i-1] + ")"}</td><td style="{TD};text-align:left;min-width:170px">{tx}</td><td style="{TD}">{ZA(a, e)}</td><td style="{TD};white-space:nowrap"><span style="{RED}">{a} bis {e}</span></td><td style="{TD}"><span style="{RED}">{de(v2[i])}</span></td></tr>' for i, (tx, a, e) in enumerate(A2))
lsg = f'''<div style="max-width:760px;margin:0 auto;padding:20px 16px 40px;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:#1d1d1f;line-height:1.6;font-size:16px">
<h1 style="font-size:22px;color:#1F4E99;margin:0 0 4px">Lösung: CAS-Führerschein Binomialverteilung</h1>
<p style="margin:0 0 10px;color:#5b6270">Code {CODE} ✓ &middot; Vergleichen Sie Ihre Ergebnisse.</p>
<h2 style="{S_H2}">1 &nbsp;Genau und höchstens</h2>
<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:15.5px;font-family:Cambria,Georgia,serif"><tr><th style="{TH}"></th><th style="{TH}"><i>n</i></th><th style="{TH}"><i>p</i></th><th style="{TH}"><i>k</i></th><th style="{TH}">genau<br>{PX('=','<i>k</i>')}</th><th style="{TH}">höchstens<br>{PX('≤','<i>k</i>')}</th></tr>{t1}</table></div>
<p style="margin:8px 0 0;font-size:14.5px;color:#5b6270">Beispiel 1 a) genau: <span style="{MONO}">binomPdf(10,0.4,4)</span> = {cas(pdf(*A1[0]))} ≈ {de(pdf(*A1[0]))}<br>Beispiel 1 a) höchstens: <span style="{MONO}">binomCdf(10,0.4,0,4)</span> = {cas(cdf(*A1[0]))} ≈ {de(cdf(*A1[0]))}</p>
<h2 style="{S_H2}">2 &nbsp;Intervalle (<i>n</i> = 12, <i>p</i> = 0,4)</h2>
<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:15px"><tr><th style="{TH}"></th><th style="{TH}">Anzahl der Treffer</th><th style="{TH}">Werte, die zählen</th><th style="{TH}">Grenzen</th><th style="{TH}">Ergebnis</th></tr>{t2}</table></div>
<p style="margin:8px 0 0;font-size:14.5px;color:#5b6270">Eingabe z.&nbsp;B. bei d): Binomial Cdf mit <i>n</i> = 12, <i>p</i> = 0.4, untere Grenze 3, obere Grenze 5 → <span style="{MONO}">binomCdf(12,0.4,3,5)</span><br><b>mehr als <i>k</i></b> → untere Grenze <i>k</i> + 1 &nbsp;&middot;&nbsp; <b>weniger als <i>k</i></b> → obere Grenze <i>k</i> − 1 &nbsp;&middot;&nbsp; <b>mindestens / höchstens</b>: die Zahl zählt mit</p>
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
