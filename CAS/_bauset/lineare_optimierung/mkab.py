#!/usr/bin/env python3
# Arbeitsblatt + Lösung „Lineare Optimierung“ (TI-Nspire CX CAS)
import re, io, base64, os, json, qrcode
from playwright.sync_api import sync_playwright

REPO = '/home/claude/olafkott.github.io/CAS'
DIR = f'{REPO}/Lineare_Optimierung'
BASE = 'https://olafkott.github.io/CAS/Lineare_Optimierung/'
src = open(f'{REPO}/Flaechen/Arbeitsblatt_CAS_Flaechen.html', encoding='utf-8').read()
LOGO = re.search(r'<img class="logo" src="(data:image/png;base64,[^"]+)"', src).group(1)
FRAME = re.search(r'(<svg class="qrframe".*?</svg>)', src, re.S).group(1)

def qr(url):
    q = qrcode.QRCode(box_size=10, border=4, error_correction=qrcode.constants.ERROR_CORRECT_L)
    q.add_data(url); q.make(fit=True)
    b = io.BytesIO(); q.make_image().convert('1').save(b, 'PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

TOUR = BASE + 'CAS_Lineare_Optimierung_Schritt_fuer_Schritt.html'
LSG = BASE + 'Loesung_CAS_Lineare_Optimierung.html'
UEB = BASE + 'CAS_Uebung_Lineare_Optimierung.html'
frame = re.sub(r'href="data:image/png;base64,[^"]+"', 'href="' + qr(TOUR) + '"', FRAME)
frame = re.sub(r'xlink:href="data:image/png;base64,[^"]+"', 'xlink:href="' + qr(TOUR) + '"', frame)

# ---------------- Aufgabe ----------------
# (I) x + y ≤ 10   (II) x + 3y ≤ 24   (III) 3x + y ≤ 24   Z = 50x + 70y
LINES = [(-1, 10, '#1f4fb5'), (-1/3, 8, '#c8102e'), (-3, 24, '#2E7D32')]
ECK = [(0, 0), (0, 8), (3, 7), (7, 3), (8, 0)]
Zf = lambda x, y: 50 * x + 70 * y
ZV = [Zf(*p) for p in ECK]
assert sorted(ZV)[-1] > sorted(ZV)[-2]
for (m, c, _) in LINES:          # alle Ecken erfüllen alle Restriktionen
    for x, y in ECK: assert y <= m * x + c + 1e-9
CODE = '3756'   # x_opt, y_opt, Anzahl Ecken, 1. Ziffer von Z_max
assert CODE == f'{ECK[2][0]}{ECK[2][1]}{len(ECK)}{str(max(ZV))[0]}'

def grid(sol):
    u, ox, oy, n = 5.1, 7.0, 68.0, 12          # mm je Einheit, Ursprung
    W, H = ox + n * u + 6, oy + 6
    X = lambda x: ox + x * u; Y = lambda y: oy - y * u
    s = f'<svg class="graph" viewBox="0 0 {W:.1f} {H:.1f}" width="{W:.1f}mm" height="{H:.1f}mm" xmlns="http://www.w3.org/2000/svg">'
    for i in range(0, n + 1):
        s += f'<line x1="{X(i):.2f}" y1="{Y(0):.2f}" x2="{X(i):.2f}" y2="{Y(n):.2f}" stroke="#d5d9e0" stroke-width="0.2"/>'
        s += f'<line x1="{X(0):.2f}" y1="{Y(i):.2f}" x2="{X(n):.2f}" y2="{Y(i):.2f}" stroke="#d5d9e0" stroke-width="0.2"/>'
    if sol:
        pts = ' '.join(f'{X(x):.2f},{Y(y):.2f}' for x, y in ECK)
        s += '<defs><pattern id="sch" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="1.6" stroke="#C62828" stroke-width="0.35"/></pattern></defs>'
        s += f'<polygon points="{pts}" fill="url(#sch)" stroke="none"/>'
    # Achsen mit Pfeilen
    s += f'<line x1="{X(0)-2:.2f}" y1="{Y(0):.2f}" x2="{X(n)+4:.2f}" y2="{Y(0):.2f}" stroke="#222" stroke-width="0.35"/><path d="M{X(n)+5.5:.2f} {Y(0):.2f} l-2.4 -1.1 v2.2z" fill="#222"/>'
    s += f'<line x1="{X(0):.2f}" y1="{Y(0)+2:.2f}" x2="{X(0):.2f}" y2="{Y(n)-3:.2f}" stroke="#222" stroke-width="0.35"/><path d="M{X(0):.2f} {Y(n)-4.5:.2f} l-1.1 2.4 h2.2z" fill="#222"/>'
    s += f'<text x="{X(n)+4.5:.2f}" y="{Y(0)+3.6:.2f}" font-size="3.3" font-style="italic" font-family="Cambria,Georgia,serif">x</text>'
    s += f'<text x="{X(0)+1.4:.2f}" y="{Y(n)-2.6:.2f}" font-size="3.3" font-style="italic" font-family="Cambria,Georgia,serif">y</text>'
    for i in range(1, n + 1):
        s += f'<line x1="{X(i):.2f}" y1="{Y(0)-0.7:.2f}" x2="{X(i):.2f}" y2="{Y(0)+0.7:.2f}" stroke="#222" stroke-width="0.25"/>'
        s += f'<line x1="{X(0)-0.7:.2f}" y1="{Y(i):.2f}" x2="{X(0)+0.7:.2f}" y2="{Y(i):.2f}" stroke="#222" stroke-width="0.25"/>'
        if i % 2 == 0:
            s += f'<text x="{X(i):.2f}" y="{Y(0)+3.4:.2f}" font-size="2.6" text-anchor="middle" font-family="Calibri,Arial,sans-serif" fill="#444">{i}</text>'
            s += f'<text x="{X(0)-1.4:.2f}" y="{Y(i)+0.9:.2f}" font-size="2.6" text-anchor="end" font-family="Calibri,Arial,sans-serif" fill="#444">{i}</text>'
    s += f'<text x="{X(0)-1.4:.2f}" y="{Y(0)+3.4:.2f}" font-size="2.6" text-anchor="end" font-family="Calibri,Arial,sans-serif" fill="#444">0</text>'
    if sol:
        s += f'<defs><clipPath id="clp"><rect x="{X(0)-1}" y="{Y(n)}" width="{n*u+1}" height="{n*u+1}"/></clipPath></defs><g clip-path="url(#clp)">'
        for k, (m, c, _) in enumerate(LINES):
            s += f'<line x1="{X(0):.2f}" y1="{Y(c):.2f}" x2="{X(n):.2f}" y2="{Y(m*n+c):.2f}" stroke="#C62828" stroke-width="0.45"/>'
        s += '</g>'
        for (x, y), lab in zip([(10.4, 0.5), (11.2, 4.0), (6.6, 4.8)], ['(I)', '(II)', '(III)']):
            pass
        s += f'<text x="{X(9.6):.2f}" y="{Y(1.6):.2f}" font-size="2.9" fill="#C62828" font-weight="bold" font-family="Segoe Print,Comic Sans MS,cursive">I</text>'
        s += f'<text x="{X(10.3):.2f}" y="{Y(5.0):.2f}" font-size="2.9" fill="#C62828" font-weight="bold" font-family="Segoe Print,Comic Sans MS,cursive">II</text>'
        s += f'<text x="{X(5.4):.2f}" y="{Y(9.6):.2f}" font-size="2.9" fill="#C62828" font-weight="bold" font-family="Segoe Print,Comic Sans MS,cursive">III</text>'
        for x, y in ECK:
            s += f'<circle cx="{X(x):.2f}" cy="{Y(y):.2f}" r="0.8" fill="#C62828"/>'
    return s + '</svg>'

CSS = open('/home/claude/lo/ab.css', encoding='utf-8').read()

def L(v, sol):          # Lückenfeld
    return f'<span class="lsg">{v}</span>' if sol else ''

def page(sol):
    lu = lambda cls, v: f'<span class="lue {cls}">{L(v, sol)}</span>'
    rows = ''
    for i, ((x, y), z) in enumerate(zip(ECK, ZV)):
        pre = i == 0
        cell = lambda v, given: f'<td class="gv">{v}</td>' if given else f'<td class="f">{L(v, sol)}</td>'
        how = ['Ursprung', '<i>f</i><sub>2</sub>(0)', '<i>f</i><sub>1</sub> = <i>f</i><sub>2</sub>', '<i>f</i><sub>1</sub> = <i>f</i><sub>3</sub>', '<i>f</i><sub>3</sub>(<i>x</i>) = 0'][i]
        rows += f'<tr><td class="n"><i>P</i><sub>{i+1}</sub></td>{cell(x, pre)}{cell(y, pre)}<td class="f hw">{L(how, sol) if not pre else "Ursprung"}</td>{cell(z, pre)}</tr>'
    namebar = '' if sol else '<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>'
    h1 = 'Lösung – CAS-Führerschein: Lineare Optimierung' if sol else 'CAS-Führerschein: Lineare Optimierung'
    code = ''.join(f'<div class="z"><span class="bx">{L(d, sol)}</span><span class="lab">{lab}</span></div>' for d, lab in zip(CODE, [
        '<i>x</i>-Wert<br>des Optimums', '<i>y</i>-Wert<br>des Optimums', 'Anzahl der<br>Eckpunkte', '1. Ziffer<br>von <i>Z</i><sub>max</sub>']))
    lqr = '' if sol else (f'<div class="lqr"><a class="qrlink" href="{LSG}"><img src="{qr(LSG)}" alt="QR-Code Lösung"><span>Lösung</span></a></div>'
                          f'<div class="lqr"><a class="qrlink" href="{UEB}"><img src="{qr(UEB)}" alt="QR-Code Übung"><span>Übung</span></a></div>')
    return f'''<div class="page p1"><div class="page-content">
<div class="page-header"><div><h1>{h1}</h1><div class="sub">Graphs- und Calculator-App &middot; Planungsvieleck, Eckpunkte, Optimum &middot; TI-Nspire CX CAS</div></div><img class="logo" src="{LOGO}" alt="RWB Essen AHR"></div>
{namebar}
<div class="anleitung"><div class="links"><div class="kt">So arbeiten Sie</div><ol><li>Scannen Sie den QR-Code und starten Sie die <b>Schritt-für-Schritt-Tour</b>.</li><li>Machen Sie jeden Schritt am <b>eigenen Handheld</b> mit.</li><li>Erscheint in der Tour <b style="color:#2E7D32">✍ Arbeitsblatt</b>, bearbeiten Sie hier die Aufgabe.</li></ol><div class="ablauf"><span><b>tab</b>: nächste Fkt.</span><span>menu ▸ 4 ▸ <b>1: Fenster</b></span><span>ctrl + doc ▸ <b>1: Calculator</b></span><span><b>solve(</b>…<b>)</b></span><span>menu ▸ 1 ▸ <b>1: Definieren</b></span></div></div><div class="qrs"><a class="qrlink" href="{TOUR}">{frame}</a></div></div>
<div class="sit"><div class="zfz"><span class="zf">Zielfunktion: &nbsp;<i>Z</i>(<i>x</i>,<i>y</i>) = 50<i>x</i> + 70<i>y</i> → max</span></div>
<div class="restr"><span class="rl">Restriktionen:</span><span><b>(I)</b> <i>x</i> + <i>y</i> ≤ 10</span><span><b>(II)</b> <i>x</i> + 3<i>y</i> ≤ 24</span><span><b>(III)</b> 3<i>x</i> + <i>y</i> ≤ 24</span><span><i>x</i>, <i>y</i> ≥ 0</span></div></div>
<div class="cols"><div class="li">{grid(sol)}</div><div class="re">
<div class="sec"><span class="nr">1</span>Restriktionen nach&nbsp;<i>y</i>&nbsp;umstellen<span class="teil">✍ Tour-Teil 1</span></div>
<div class="um"><span>(I)</span><span><i>y</i> ≤</span>{lu('m', '10 − <i>x</i>')}<span>(II)</span><span><i>y</i> ≤</span>{lu('m', '8 − <sup>1</sup>/<sub>3</sub><i>x</i>')}<span>(III)</span><span><i>y</i> ≤</span>{lu('m', '24 − 3<i>x</i>')}</div>
<div class="sec"><span class="nr">2</span>Planungsvieleck<span class="teil">✍ Tour-Teil 1</span></div>
<p class="auftrag hang"><span class="bz">a)</span>Zeichnen Sie die Randgeraden im CAS.<br>Fenster: −1 ≤ <i>x</i> ≤ 12 und −1 ≤ <i>y</i> ≤ 12.</p>
<p class="auftrag hang"><span class="bz">b)</span>Übertragen Sie die Geraden in das Koordinatensystem. Schraffieren Sie das Planungsvieleck.</p>
</div></div>
<div class="sec"><span class="nr">3</span>Eckpunkte mit dem CAS berechnen<span class="teil">✍ Tour-Teil 2</span></div>
<table class="ft"><thead><tr><th>Ecke</th><th><i>x</i></th><th><i>y</i></th><th>so berechnet (Befehl)</th><th><i>Z</i> = 50<i>x</i> + 70<i>y</i> &nbsp;(Aufgabe 4)</th></tr></thead><tbody>{rows}</tbody></table>
<div class="sec"><span class="nr">4</span>Optimum bestimmen<span class="teil">✍ Tour-Teil 3</span></div>
<p class="auftrag">Berechnen Sie <i>Z</i> in jeder Ecke (letzte Spalte der Tabelle). Geben Sie das Optimum an.</p>
<div class="opt1"><span><i>x</i> =</span>{lu('s', '3')}<span><i>y</i> =</span>{lu('s', '7')}<span><i>Z</i><sub>max</sub> =</span>{lu('s', '640')}</div>
<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein.<br>Das ist der Code für die Lösung.</div><div class="ziff">{code}</div>{lqr}</div>
</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; CAS-Führerschein</span><span>Lineare Optimierung</span></div></div>'''

def doc(sol, title):
    return f'<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title}</title>\n<style>\n{CSS}\n</style></head><body class="{"lsg-doc" if sol else ""}">\n{page(sol)}\n</body></html>'

ab = doc(False, 'CAS-Führerschein – Lineare Optimierung')
open(f'{DIR}/Arbeitsblatt_CAS_Lineare_Optimierung.html', 'w', encoding='utf-8').write(ab)
lsg_html = doc(True, 'Lösung – Lineare Optimierung')
open('/home/claude/lo/lsg_plain.html', 'w', encoding='utf-8').write(lsg_html)

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    for name, html in [('Arbeitsblatt_CAS_Lineare_Optimierung', ab), ('lsg_plain', lsg_html)]:
        pth = f'{DIR}/{name}.pdf' if name.startswith('Arb') else f'/home/claude/lo/{name}.pdf'
        pg.set_content(html); pg.wait_for_timeout(300)
        pg.pdf(path=pth, format='A4', print_background=True, prefer_css_page_size=True)
    b.close()

# ---------------- Lösung verschlüsseln (AES-GCM, PBKDF2) ----------------
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
salt, iv, it = os.urandom(16), os.urandom(12), 150000
key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=it).derive(CODE.encode())
inner = '<style>' + CSS.replace('body{', '.lsgwrap{') + '</style><div class="lsgwrap">' + page(True) + '</div>'
ct = AESGCM(key).encrypt(iv, inner.encode('utf-8'), None)
D = json.dumps({'s': base64.b64encode(salt).decode(), 'iv': base64.b64encode(iv).decode(), 'ct': base64.b64encode(ct).decode(), 'it': it})
tpl = open(f'{REPO}/Flaechen/Loesung_CAS_Flaechen.html', encoding='utf-8').read()
tpl = re.sub(r'const D=\{.*?\};', lambda m: 'const D=' + D + ';', tpl, flags=re.S)
tpl = tpl.replace('Lösung CAS-Führerschein Flächen berechnen', 'Lösung CAS-Führerschein Lineare Optimierung')
assert 'Lineare Optimierung' in tpl
open(f'{DIR}/Loesung_CAS_Lineare_Optimierung.html', 'w', encoding='utf-8').write(tpl)
print('ok code', CODE, 'Z', ZV)
