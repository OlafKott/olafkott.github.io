#!/usr/bin/env python3
# Arbeitsblatt + Lösung (verschlüsselt) "Zeilenstufenform (ref / rref)" für den CAS-Führerschein
import re, io, base64, json, os, sys, qrcode, hashlib
from fractions import Fraction as F
sys.path.insert(0, '/home/claude/olafkott.github.io/CAS/_bauset/stufenform')
from lin import ref, rref, robust
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

REPO = '/home/claude/olafkott.github.io/CAS/'
BASE = 'https://olafkott.github.io/CAS/Stufenform/'
OUT = REPO + 'Stufenform/'
tpl = open(REPO + 'LGS/Arbeitsblatt_CAS_LGS.html', encoding='utf-8').read()

W = [[4, -4, 4, 16], [-3, -2, -3, -17], [2, -2, 0, 2]]      # (2|1|3)
RW, RRW = ref(W), rref(W)
assert robust(W)
assert RW == [[1, -1, 1, 4], [0, 1, 0, 1], [0, 0, 1, 3]], RW
SOL = [r[-1] for r in RRW]; assert SOL == [2, 1, 3]
CODE = f'{RW[0][3]}{SOL[0]}{SOL[1]}{SOL[2]}'; assert CODE == '4213'

def qr(url):
    q = qrcode.QRCode(border=1, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8)
    q.add_data(url); q.make(fit=True)
    b = io.BytesIO(); q.make_image(fill_color='black', back_color='white').save(b, format='PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

def m(v): return str(v).replace('-', '−')
def lgs(M):
    rows = []
    for k, r in enumerate(M):
        t = ''
        for i, c in enumerate(r[:-1]):
            if c == 0: continue
            n = ['<i>x</i>', '<i>y</i>', '<i>z</i>'][i]; a = abs(c); co = ('' if a == 1 else str(a)) + n
            t += (('−' if c < 0 else '') + co) if t == '' else ((' − ' if c < 0 else ' + ') + co)
        rows.append(f'<span><span class="rn">{["I","II","III"][k]}</span>{t} = {m(r[-1])}</span>')
    return '<span class="lgsb">' + ''.join(rows) + '</span>'
def mat(M, fill, head=False):
    h = '<tr class="hd"><td><i>x</i></td><td><i>y</i></td><td><i>z</i></td><td class="rs"></td></tr>' if head else ''
    rows = ''.join('<tr>' + ''.join(f'<td class="{"rs" if j == 3 else ""}"><span class="{"fill" if fill else ""}">{m(v) if fill else ""}</span></td>' for j, v in enumerate(r)) + '</tr>' for r in M)
    return f'<span class="mxb"><table>{h}{rows}</table></span>'
def lue(v, fill, cls='s'): return f'<span class="lue {cls}{" fill" if fill else ""}">{v if fill else ""}</span>'

CSS = '''
.mxb{ display:inline-flex; align-items:stretch; vertical-align:middle; }
.mxb::before, .mxb::after{ content:""; width:2.2mm; border:1.6px solid var(--ink); }
.mxb::before{ border-right:0; } .mxb::after{ border-left:0; }
.mxb table{ border-collapse:separate; border-spacing:1.3mm 1.1mm; }
.mxb td{ padding:0; }
.mxb td > span{ display:block; width:10mm; height:7.6mm; border:1px solid var(--rand); border-radius:1.4mm; background:var(--feld); text-align:center; line-height:7.6mm; font:14.5px Georgia,serif; }
.mxb td > span.fill{ background:#FDECEA; border-color:#E2A0A0; color:#C62828; font-weight:bold; }
.mxb td.rs{ border-left:1.5px solid var(--ink); padding-left:1.6mm; }
.mxb tr.hd td{ font:13px Cambria,Georgia,serif; color:#555; text-align:center; height:4mm; line-height:4mm; }
.zeile{ display:flex; align-items:center; gap:5mm; flex-wrap:nowrap; margin:1.5mm 0; }
.zeile .bz{ font-weight:bold; font-size:14.6px; width:6mm; }
.zeile .lab2{ font-size:14px; font-family:Georgia,serif; color:var(--ink); white-space:nowrap; line-height:1.35; }
.pf{ font-size:22px; color:#666; }
.zwei{ display:flex; gap:4mm; justify-content:flex-start; }
.p1 .sec{ margin-top:12px; } .p1 .ergbox{ padding:1.5mm 5mm; } .p1 .rz{ line-height:2.45; } .p1 .code{ margin-top:12px; }
.p1 .lgsb{ font-size:17px; line-height:1.9; margin:0; }
'''

def page(fill):
    s = tpl
    head = s[:s.index('<div class="tip">')]
    head = head.replace('<title>CAS-Führerschein – Lineare Gleichungssysteme</title>', '<title>CAS-Führerschein – Zeilenstufenform</title>')
    head = head.replace('</style>', CSS + '</style>')
    head = head.replace('<h1>CAS-Führerschein: Lineare Gleichungssysteme</h1>',
                        '<h1>CAS-Führerschein: Zeilenstufenform' + ('<span class="badge">Lösung</span>' if fill else '') + '</h1>')
    head = head.replace('<div class="sub">Lösen mit linSolve &middot; TI-Nspire CX CAS</div>', '<div class="sub">Gauß auf Knopfdruck: ref und rref &middot; TI-Nspire CX CAS</div>')
    gurl = BASE + 'CAS_Stufenform_Schritt_fuer_Schritt.html'
    head = head.replace('https://olafkott.github.io/CAS/LGS/CAS_LGS_Schritt_fuer_Schritt.html', gurl)
    g = qr(gurl)
    head = re.sub(r'(<image x="5" y="5" width="20" height="20" href=")[^"]*(" xlink:href=")[^"]*(")', lambda mm: mm.group(1) + g + mm.group(2) + g + mm.group(3), head)
    assert gurl in head and head.count(g) == 2
    o = [head]
    o.append('<div class="tip"><b class="t">Achtung:</b> Fehlt eine Variable, steht in der Matrix eine <b>0</b>. Negative Zahlen mit <span class="taste">(−)</span>. '
             'Alte Werte löschen: <span class="taste">menu</span>&nbsp;<span class="taste">1</span>&nbsp;<span class="taste">4</span>.</div>\n')
    o.append('<div class="sec"><span class="nr">1</span>LGS mit ref und rref lösen<span class="teil">✍ nach der Tour</span></div>\n<div class="ergbox">\n')
    o.append(f'<div class="zeile"><span class="bz">a)</span><span class="lab2">Matrix aufstellen<br>und als <i>a</i> speichern:</span>{lgs(W)}<span class="pf">→</span><span class="lab2"><i>a</i> =</span>{mat(W, fill, True)}</div>\n')
    o.append(f'<div class="zwei"><div class="zeile"><span class="bz">b)</span><span class="lab2">ref(<i>a</i>) =</span>{mat(RW, fill)}</div>'
             f'<div class="zeile"><span class="bz">c)</span><span class="lab2">rref(<i>a</i>) =</span>{mat(RRW, fill)}</div></div>\n')
    o.append(f'<p class="rz"><span class="bz">d)</span>Lösung: <span class="fx"><i>x</i></span> = {lue(m(SOL[0]), fill)}<span class="trenn"></span>'
             f'<span class="fx"><i>y</i></span> = {lue(m(SOL[1]), fill)}<span class="trenn"></span><span class="fx"><i>z</i></span> = {lue(m(SOL[2]), fill)}</p>\n')
    o.append(f'<p class="rz" style="margin-left:6mm">Lösungsmenge: <span class="fx">𝕃</span> = {lue("{(2 | 1 | 3)}", fill, "l")}</p>\n</div>\n')
    o.append('<div class="sec"><span class="nr">2</span>Das Wichtigste kurz notiert</div>\n<div class="ergbox">\n')
    o.append(f'<p class="rz"><span class="bz">a)</span>Matrix erstellen: <span class="taste">menu</span> {lue("7", fill, "xs")} {lue("1", fill, "xs")} {lue("1", fill, "xs")}'
             f'<span class="trenn"></span>Speichern mit →: <span class="taste c">ctrl</span> + {lue("var", fill, "xs")}</p>\n')
    o.append(f'<p class="rz"><span class="bz">b)</span>ref: <span class="taste">menu</span> <span class="taste">7</span> {lue("4", fill, "xs")}'
             f'<span class="trenn"></span>rref: <span class="taste">menu</span> <span class="taste">7</span> {lue("5", fill, "xs")}</p>\n')
    o.append(f'<p class="rz"><span class="bz">c)</span>Welche Form ist bei jedem Rechner gleich?<span class="box{" on" if False else ""}"></span>ref'
             f'<span class="box{" on" if fill else ""}"></span>rref</p>\n</div>\n')
    lurl, uurl = BASE + 'Loesung_CAS_Stufenform.html', BASE + 'CAS_Uebung_Stufenform.html'
    labs = ['ref(<i>a</i>): Zeile 1,<br>Spalte 4', '<i>x</i> aus 1d', '<i>y</i> aus 1d', '<i>z</i> aus 1d']
    o.append('<div class="code"><div class="ct"><b class="t">Lösung überprüfen</b><br>Tragen Sie die vier Ziffern ein – das ist der Code für die Lösung.</div>\n<div class="ziff">'
             + ''.join(f'<div class="z"><span class="bx{" fill" if fill else ""}">{c if fill else ""}</span><span class="lab">{l}</span></div>' for c, l in zip(CODE, labs))
             + f'</div>\n<div class="lqr"><a class="qrlink" href="{lurl}"><img src="{qr(lurl)}" alt="QR-Code Lösung"><span>Lösung</span></a></div>'
             f'<div class="lqr"><a class="qrlink" href="{uurl}"><img src="{qr(uurl)}" alt="QR-Code Übung"><span>Übung</span></a></div></div>\n')
    o.append('</div><div class="page-footer"><span>RWB Essen &middot; Mathematik &middot; CAS-Führerschein</span><span>Zeilenstufenform (ref / rref) &middot; Seite 1</span></div></div>\n\n</body></html>')
    h = ''.join(o)
    if fill: h = h.replace('<body>', '<body class="lsg">', 1)
    return h

ab = page(False); ls = page(True)
open(OUT + 'Arbeitsblatt_CAS_Stufenform.html', 'w', encoding='utf-8').write(ab)
open('/home/claude/work/stufe/Loesung_CAS_Stufenform_plain.html', 'w', encoding='utf-8').write(ls)

# verschlüsselte Lösungsseite (gleicher Aufbau wie LGS)
lt = open(REPO + 'LGS/Loesung_CAS_LGS.html', encoding='utf-8').read()
plain = '<style>' + re.search(r'<style>(.*?)</style>', ls, re.S).group(1) + '</style>\n' + re.search(r'<body[^>]*>(.*)</body>', ls, re.S).group(1)
plain = plain.replace('<div class="page p1">', '<div class="page p1 lsg">', 1)
salt, iv = os.urandom(16), os.urandom(12)
key = hashlib.pbkdf2_hmac('sha256', CODE.encode(), salt, 150000, 32)
ct = AESGCM(key).encrypt(iv, plain.encode('utf-8'), None)
D = {"s": base64.b64encode(salt).decode(), "iv": base64.b64encode(iv).decode(), "ct": base64.b64encode(ct).decode(), "it": 150000}
lt = re.sub(r'const D=\{.*?\};', lambda mm: 'const D=' + json.dumps(D) + ';', lt, count=1, flags=re.S)
lt = lt.replace('<title>Lösung CAS-Führerschein LGS</title>', '<title>Lösung CAS-Führerschein Zeilenstufenform</title>')
assert 'Zeilenstufenform' in lt
open(OUT + 'Loesung_CAS_Stufenform.html', 'w', encoding='utf-8').write(lt)
print('ok code', CODE)
