#!/usr/bin/env python3
"""Baut je Thema EIN gemeinsames Arbeitsblatt für fx-991DE CW und fx-991DE X.

Quelle: Arbeitsblatt_fx991_<T>.html (CW) und Arbeitsblatt_fx991DEX_<T>.html (X) in CAS/fx991/.
Ergebnis (in CAS/fx991/):
  Arbeitsblatt_fx991_CW_X_<T>.html   – oben zwei QR-Codes (CW-Rahmen mit goldener Taste, X-Rahmen ohne)
  Loesung_fx991_CW_X_<T>.html        – dasselbe mit eingetragenen Lösungen (bei Grundlagen/Lage_Streuung verschlüsselt)
  fx991_CW_X_Uebung_<T>.html         – Übung ohne Modellangabe (Aufgaben sind bei CW und X identisch)
Die modellabhängigen Tastenfolgen entfallen auf dem Blatt; sie stehen in der jeweiligen Anleitung.
Aufruf: python3 mk_cw_x.py   (aus beliebigem Ordner)
"""
import re, os, io, json, base64, html
import qrcode
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'fx991') + '/'
URL = 'https://olafkott.github.io/CAS/fx991/'
MODELL = 'CASIO fx-991DE CW / fx-991DE X'

# Reihenfolge wie in der Moodle-Übersicht. sub = Untertitel ohne Modell, tipp = modellneutraler Hinweis
TOPICS = [
 ('Grundlagen', 'Rechnen, Brüche, Potenzen',
  '<b class="t">Gut zu wissen:</b> Ergebnisse erscheinen oft <b>exakt</b> (¾ oder 2√2). Wie Sie auf die Dezimalzahl umschalten, zeigt die Tour.'),
 ('Lage_Streuung', 'Taschenrechner-Führerschein · Beschreibende Statistik',
  '<b class="t">Tipp:</b> Für die Häufigkeitstabelle die Spalte <b>Freq</b> (Häufigkeit) einschalten. Vor einer neuen Aufgabe die alten Werte löschen.'),
 ('Funktionswerte', 'Funktionswerte berechnen',
  '<b class="t">Tipp:</b> Erst den Funktionsterm eingeben, dann nacheinander die <i>x</i>-Werte. Bruch oder Wurzel im Ergebnis? Auf Dezimalzahl umschalten.'),
 ('Gleichungen', 'Lineare und quadratische Gleichungen',
  '<b class="t">Wichtig:</b> Im Gleichungsmodus muss rechts <b>0</b> stehen · Wurzel im Ergebnis → auf Dezimalzahl umschalten · <i>i</i> im Ergebnis → keine Lösung'),
 ('Wertetabelle', 'Wertetabellen erstellen',
  '<b class="t">Tipp:</b> Term mit <i>x</i> eingeben, dann Start, Ende und Schrittweite festlegen. Mit ▼ ▲ in der Tabelle blättern.'),
 ('Ableitung', 'Ableitung an einer Stelle mit d/dx',
  '<b class="t">Tipp:</b> Erst den Term, dann die Stelle eingeben. Für eine neue Stelle nur die Zahl ändern. Bruch im Ergebnis? Auf Dezimalzahl umschalten.'),
 ('Integrale', 'Bestimmte Integrale',
  '<b class="t">Tipp:</b> Funktion, untere und obere Grenze eintragen. Ergebnisse auf 2 Stellen nach dem Komma runden.'),
 ('LGS', 'Systeme mit zwei und drei Unbekannten',
  '<b class="t">Wichtig:</b> Erst ordnen: <i>ax</i> + <i>by</i> = <i>c</i> · Unbekannte fehlt: 0 eintragen · Bruch im Ergebnis → auf Dezimalzahl umschalten'),
 ('Stufenform', 'Zeilenstufenform mit Ref und Rref · LGS lösen',
  '<b class="t">Wichtig:</b> Spalten = Unbekannte + 1 · fehlende Variable → 0 eintragen'),
 ('Matrizen', 'Rechnen · Potenzen · Transponieren · Determinante und Inverse',
  '<b class="t">Wichtig:</b> Matrizen zuerst speichern (MatA, MatB …), dann mit ihnen rechnen.'),
 ('Kombinatorik', 'n!, nPr und nCr',
  '<b class="t">Tipp:</b> Immer zuerst <i>n</i> (die große Zahl), dann der Befehl, dann <i>r</i>. Riesige Ergebnisse zeigt der Rechner mit ×10 … an.'),
 ('Binomialverteilung', 'Genau, höchstens, mindestens, zwischen',
  '<b class="t">Tipp:</b> Zwischen: <i>P</i>(<i>a</i> ≤ <i>X</i> ≤ <i>b</i>) = <i>P</i>(<i>X</i> ≤ <i>b</i>) − <i>P</i>(<i>X</i> ≤ <i>a</i> − 1). Mindestens: <i>P</i>(<i>X</i> ≥ <i>k</i>) = 1 − <i>P</i>(<i>X</i> ≤ <i>k</i> − 1). Ergebnisse auf 4 Stellen runden.'),
]
# Codes der verschlüsselten Lösungen (= Code auf dem Arbeitsblatt)
CODES = {'Grundlagen': '8692', 'Lage_Streuung': '6241'}

INTRO = ('<p class="an">Scannen Sie den QR-Code <b>Ihres Rechners</b> und machen Sie jeden Schritt der <b>Tour</b> '
         'am <b>eigenen Rechner</b> mit. Die Tour zeigt Ihnen jede Taste.</p>')
CSS = ('\n.qrs.qr2{ display:flex; gap:3mm; flex:0 0 auto; }\n'
       '.qrs.qr2 svg.qrframe{ display:block; width:24mm; height:32mm; }\n'
       '.anleitung .ablauf{ font-size:10px; gap:2px; flex-wrap:nowrap; } .anleitung .ablauf span{ padding:1px 3px; white-space:nowrap; }\n')

def qr_png(url):
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=3)
    q.add_data(url); q.make(fit=True)
    b = io.BytesIO(); q.make_image(fill_color='black', back_color='white').save(b, format='PNG')
    return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()

def anleitung_parts(s):
    i = s.index('<div class="anleitung">')
    j = s.index('<div class="qrs">', i)
    k = s.index('</svg></a></div></div>', j) + len('</svg></a></div></div>')
    links = s[s.index('<div class="links">', i) + len('<div class="links">'):j]
    qrs = s[j + len('<div class="qrs">'):k - len('</div></div>')]   # <a class="qrlink" …><svg …></svg></a>
    return i, k, links, qrs

_VORLAGE = {}
def rahmen(m, url):
    """Einheitlicher Rechner-Rahmen (Vorlage aus dem Gleichungen-Blatt): CW mit goldener Taste, X ohne."""
    if m not in _VORLAGE:
        f = 'Arbeitsblatt_fx991_Gleichungen.html' if m == 'cw' else 'Arbeitsblatt_fx991DEX_Gleichungen.html'
        _VORLAGE[m] = anleitung_parts(open(D + f, encoding='utf-8').read())[3]
    q = re.sub(r'href="https://[^"]+"', 'href="' + url + '"', _VORLAGE[m], count=1)
    png = qr_png(url)
    q, n = re.subn(r'((?:xlink:)?href=)"data:image/png;base64,[^"]+"', lambda mm: mm.group(1) + '"' + png + '"', q)
    assert n == 2
    return q

def label(svg, text):
    out, n = re.subn(r'(<text[^>]*>)Schritt für Schritt(</text>)', r'\g<1>' + text + r'\2', svg)
    assert n == 1, 'Beschriftung im QR-Rahmen nicht gefunden'
    return out

def kombiniere(cw, dx, t, sub, tipp):
    """cw/dx: HTML eines Blatts (Arbeitsblatt oder Lösung im Klartext)."""
    i, k, links, _ = anleitung_parts(cw)
    qcw = rahmen('cw', URL + f'fx991_{t}_Schritt_fuer_Schritt.html')
    qdx = rahmen('dx', URL + f'fx991DEX_{t}_Schritt_fuer_Schritt.html')
    extra = ''
    m = re.search(r'<div class="ablauf">.*?</div>', links, re.S)   # Grundlagen: Teil → Aufgabe
    if m: extra = m.group(0) + '\n'
    box = ('<div class="anleitung"><div class="links">\n' + INTRO + '\n' + extra +
           '<p class="an tipp">' + tipp + '</p>\n</div><div class="qrs qr2">' +
           label(qcw, 'fx-991DE CW') + label(qdx, 'fx-991DE X') + '</div></div>')
    s = cw[:i] + box + cw[k:]
    s, n = re.subn(r'<div class="sub">.*?</div>', '<div class="sub">' + sub.replace('·', '&middot;') + ' &middot; ' + MODELL + '</div>', s, count=1)
    assert n == 1
    s = re.sub(r'(<title>[^<]*?)\s*(?:·\s*)?(?:CASIO\s*)?fx-991DE CW', r'\1 fx-991DE CW / X', s)
    s = s.replace('</style>', CSS + '</style>', 1)
    if t == 'Grundlagen':
        rep = [
          ('<th>exakt &nbsp;<span class="taste">EXE</span></th>', '<th>exakt</th>'),
          ('<th>Dezimalzahl &nbsp;<span class="taste sh">SHIFT</span> + <span class="taste">EXE</span></th>', '<th>Dezimalzahl</th>'),
          ('Dezimalzahl in Bruch (eintippen, <span class="taste">EXE</span>):', 'Dezimalzahl in Bruch (eintippen und bestätigen):'),
        ]
        for a, b in rep:
            assert a in s, a; s = s.replace(a, b)
        s, n = re.subn(r'<p class="an weg5">.*?</p>',
                       '<p class="an weg5">Ergebnisse unter <b>A</b> bzw. <b>B</b> speichern und in der Rechnung wieder abrufen – wie es geht, zeigt Tour-Teil 5.</p>', s, flags=re.S)
        assert n == 1
    # untere QR-Codes: Lösung und Übung auf die gemeinsamen Seiten umstellen
    for alt, neu in ((f'Loesung_fx991_{t}.html', f'Loesung_fx991_CW_X_{t}.html'),
                     (f'fx991_Uebung_{t}.html', f'fx991_CW_X_Uebung_{t}.html')):
        pat = r'<a class="qrlink" href="' + re.escape(URL + alt) + r'"><img src="data:image/png;base64,[^"]+"'
        s, n = re.subn(pat, lambda _m: f'<a class="qrlink" href="{URL + neu}"><img src="{qr_png(URL + neu)}"', s)
        assert n == 1, (t, alt, n)
    # Restprüfung: keine modellspezifischen Reste
    rest = re.sub(r'<svg class="qrframe".*?</svg>', '', s, flags=re.S)
    for bad in ('Loesung_fx991_' + t, 'fx991_Uebung_' + t, 'So geht'):
        assert bad not in rest, (t, bad)
    return s

# ---------------------------------------------------------------- Verschlüsselte Lösungen
def entschluessle(page, code):
    Dj = json.loads(re.search(r'const D=(\{.*?\});', page, re.S).group(1))
    u = lambda x: base64.b64decode(x)
    k = PBKDF2HMAC(hashes.SHA256(), 32, u(Dj['s']), Dj['it']).derive(code.encode())
    return AESGCM(k).decrypt(u(Dj['iv']), u(Dj['ct']), None).decode()

def verschluessle(page, pt, code):
    salt, iv = os.urandom(16), os.urandom(12)
    k = PBKDF2HMAC(hashes.SHA256(), 32, salt, 150000).derive(code.encode())
    ct = AESGCM(k).encrypt(iv, pt.encode(), None)
    Dj = {'s': base64.b64encode(salt).decode(), 'iv': base64.b64encode(iv).decode(), 'ct': base64.b64encode(ct).decode(), 'it': 150000}
    return re.sub(r'const D=\{.*?\};', lambda _m: 'const D=' + json.dumps(Dj) + ';', page, count=1, flags=re.S)

if __name__ == '__main__':
    for t, sub, tipp in TOPICS:
        r = lambda n: open(D + n, encoding='utf-8').read()
        ab = kombiniere(r(f'Arbeitsblatt_fx991_{t}.html'), r(f'Arbeitsblatt_fx991DEX_{t}.html'), t, sub, tipp)
        open(D + f'Arbeitsblatt_fx991_CW_X_{t}.html', 'w', encoding='utf-8').write(ab)
        lcw, ldx = r(f'Loesung_fx991_{t}.html'), r(f'Loesung_fx991DEX_{t}.html')
        if 'const D=' in lcw:
            c = CODES[t]
            klar = kombiniere(entschluessle(lcw, c), entschluessle(ldx, c), t, sub, tipp)
            seite = verschluessle(lcw, klar, c)
            seite = re.sub(r'<title>([^<]*)</title>', lambda m: '<title>' + m.group(1).replace(' fx-991DE CW', '') + '</title>', seite)
            open(D + f'Loesung_fx991_CW_X_{t}.html', 'w', encoding='utf-8').write(seite)
        else:
            open(D + f'Loesung_fx991_CW_X_{t}.html', 'w', encoding='utf-8').write(kombiniere(lcw, ldx, t, sub, tipp))
        u = r(f'fx991_Uebung_{t}.html')
        u2 = u.replace('CASIO fx-991DE CW', 'CASIO fx-991DE CW / X')
        u2 = u2.replace('href="index.html#cw"', 'href="index.html"')
        open(D + f'fx991_CW_X_Uebung_{t}.html', 'w', encoding='utf-8').write(u2)
        print('ok', t)
