#!/usr/bin/env python3
"""Vereinheitlicht Kopfzeile, Fußzeile und Lösungskasten aller CAS-Arbeitsblätter.
Aufruf: python3 normalize.py <CAS-Ordner>   (arbeitet auf dem aktuellen Dateistand; die Grundumstellung läuft nur einmal, der Rest bei jedem Aufruf).
NEUES BLATT: Ordner und Gliederungsnummer in NR eintragen, dann normalize.py und mkpdf.py aufrufen."""
import re, sys, os, subprocess
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(sys.argv[1])
# Ordner -> Nummer aus der Gliederung von CAS_Fuehrerschein.html
NR = {'Grundlagen':'0',
      'Lage_und_Streuung':'1.1','Regression':'1.2','Weitere_Regressionen':'1.3',
      'Funktionswerte':'2.1','Wertetabelle':'2.2','Abschnittsweise':'2.3','Graphen':'2.4',
      'Funktionsscharen':'2.5','Ableitungen':'2.6','Integrale':'2.7','Flaechen':'2.8',
      'Gleichungen':'3.1','LGS':'3.2','Matrizen':'3.3','Stufenform':'3.4','Lineare_Optimierung':'3.5',
      'Kombinatorik':'4.1','Binomialverteilung':'4.2','Binomial_Gesucht':'4.3'}

# Abschnitt der Gliederung für die Fußzeile
ABSCHNITT = {'0':'Grundlagen','1':'Statistik','2':'Funktionen &amp; Analysis','3':'Gleichungen &amp; Algebra','4':'Stochastik'}

# Blattspezifischer Ausgleich, damit der Inhalt über dem Lösungskasten Platz hat
_ANL = '.anleitung{ padding:7px 12px !important; margin:0 0 9px !important; border-radius:8px !important; background:#fafafb !important; } .anleitung .links{ font-size:13.4px; } .anleitung ol{ margin:0 0 5px; padding-left:18px; } .anleitung li{ line-height:1.6; margin-bottom:2px; } .kt{ margin-bottom:4px !important; } .ablauf{ display:flex; gap:3px; flex-wrap:wrap; font-family:Calibri,Arial,sans-serif; font-size:11px; } .ablauf > span{ border:1px solid var(--rand); border-radius:3px; padding:1px 5px; background:#fff; } .ablauf .taste{ border-bottom-width:2px; } .mono{ font-family:Consolas,\'Courier New\',monospace; font-size:12.4px; background:#eceef1; border-radius:3px; padding:0 4px; font-weight:bold; }'
EXTRA = {'Funktionsscharen': '.sec{ margin-top:10px !important; }',
         'Lage_und_Streuung': _ANL, 'Regression': _ANL}

CSS = '''
/* ===== Einheitliches Layout aller CAS-Arbeitsblätter: Kopf, Fuß, Lösungskasten ===== */
.page{ display:flex !important; flex-direction:column !important; }
.page-content{ flex:1 1 auto !important; display:flex !important; flex-direction:column !important; }
.ab-inhalt{ flex:0 0 auto; }
.ab-inhalt.ab-flex{ display:flex; flex-direction:column; }
.page-header{ display:flex !important; justify-content:space-between !important; align-items:center !important; border-bottom:3px solid var(--lf) !important; padding-bottom:6px !important; margin:0 0 8px !important; }
.page-header h1{ font-size:19.5px !important; margin:0 !important; color:var(--lf) !important; line-height:1.25 !important; }
.page-header .sub{ font-size:12.5px !important; color:#444 !important; }
.page-header img.logo{ height:30px !important; width:auto !important; margin:0 !important; display:block !important; }
.ab-nr{ display:inline-block; min-width:22px; height:22px; line-height:22px; padding:0 6px; margin:0 8px 0 0; border-radius:11px; background:var(--lf); color:#fff; font:bold 13px Arial,Helvetica,sans-serif; text-align:center; vertical-align:2px; letter-spacing:.2px; }
.namebar{ display:flex !important; gap:24px !important; font-size:12.5px !important; color:#555 !important; margin:0 0 9px !important; }
.code{ display:flex !important; align-items:center !important; gap:4mm !important; border-top:1.4px solid var(--lf) !important; border-bottom:1.4px solid var(--lf) !important; padding:2mm 1mm !important; margin:auto 0 0 !important; break-inside:avoid; flex:0 0 auto !important; }
.ab-inhalt + .code{ margin-top:auto !important; }
.code .ct{ flex:1 1 auto !important; font-size:12px !important; line-height:1.35 !important; }
.code .ct b.t{ color:var(--lf) !important; font-size:13px !important; }
.code .ziff{ display:flex !important; gap:2mm !important; flex:0 0 auto !important; }
.code .z{ text-align:center !important; width:21mm; }
.code .z .bx, .code .z .box{ display:block; margin:0 auto; width:8.5mm !important; height:8.5mm !important; border:1.3px solid var(--lf) !important; border-radius:1.6mm !important; background:var(--feld) !important; }
.code .z .lab{ display:block !important; font-size:9.4px !important; line-height:1.2 !important; color:#444 !important; margin-top:2px !important; font-family:Calibri,Arial,sans-serif !important; }
.code .lqr{ flex:0 0 15mm !important; text-align:center !important; border:none !important; padding:0 !important; margin:0 !important; }
.code .lqr + .lqr{ margin-left:1mm !important; border-left:1.3px dashed var(--rand) !important; padding-left:3mm !important; flex-basis:calc(15mm + 3mm + 1.3px) !important; box-sizing:content-box; }
.code .lqr img{ width:15mm !important; height:15mm !important; display:block !important; }
.code .lqr span{ display:block !important; font-size:9px !important; color:var(--lf) !important; font-weight:bold !important; margin-top:1px !important; font-family:Calibri,Arial,sans-serif !important; }
.page-footer{ display:flex !important; justify-content:space-between !important; border-top:1px solid var(--line) !important; margin:2mm 0 0 !important; padding:6px 0 0 !important; font-size:11px !important; color:#888 !important; flex:0 0 auto !important; }
@media print{ .page{ height:297mm !important; min-height:297mm !important; padding:13mm 14mm 9mm !important; overflow:hidden !important; } }
'''

def end_of_div(s, start):
    """Index direkt hinter dem </div>, das das bei start beginnende <div …> schließt."""
    d = 0
    for m in re.compile(r'<div\b|</div>').finditer(s, start):
        d += 1 if m.group(0) == '<div' else -1
        if d == 0:
            return m.end()
    raise ValueError('div nicht geschlossen')

def flex_pages(pg, path):
    pg.goto('file://' + path)
    return pg.evaluate("()=>[...document.querySelectorAll('.page-content')].map(e=>getComputedStyle(e).display==='flex')")

def transform(src, folder, flex):
    s = src
    # Lösungskasten außerhalb von .page-content (Stufenform) an dessen Ende verschieben
    while True:
        spans = [(m.start(), end_of_div(s, m.start())) for m in re.finditer(r'<div class="page-content">', s)]
        outside = [m.start() for m in re.finditer(r'<div class="code">', s) if not any(a < m.start() < b for a, b in spans)]
        if not outside: break
        cs = outside[0]; ce = end_of_div(s, cs); block = s[cs:ce]
        a, b = max(sp for sp in spans if sp[1] <= cs)
        s = s[:b - len('</div>')] + '\n' + block + '</div>' + s[b:cs] + s[ce:]
    # Inhalt jeder Seite in .ab-inhalt einpacken, Lösungskasten bleibt letztes Kind
    out, pos, k = [], 0, 0
    for m in re.finditer(r'<div class="page-content">', s):
        if m.start() < pos: continue
        ps = m.start(); pe = end_of_div(s, ps)
        inner = s[m.end():pe - len('</div>')]
        ci = inner.find('<div class="code">')
        cls = 'ab-inhalt' + (' ab-flex' if flex[k] else '')
        if ci >= 0:
            assert end_of_div(inner, ci) == len(inner.rstrip()) or inner[end_of_div(inner, ci):].strip() == '', folder
            new = f'<div class="{cls}">' + inner[:ci].rstrip() + '</div>\n' + inner[ci:]
        else:
            new = f'<div class="{cls}">' + inner + '</div>'
        out.append(s[pos:m.end()] + new + '</div>'); pos = pe; k += 1
    s = ''.join(out) + s[pos:]
    # Gliederungsnummer im Kopf
    s, n = re.subn(r'<h1>(?!<span class="ab-nr">)', f'<h1><span class="ab-nr">{NR[folder]}</span>', s)
    assert n >= 1, folder
    # einheitlicher Text im Lösungskasten (gleiche Worte, gleicher Umbruch)
    s = s.replace('Tragen Sie die vier Ziffern ein – das ist der Code für die Lösung.',
                  'Tragen Sie die vier Ziffern ein.<br>Das ist der Code für die Lösung.')
    # „Seite 1“ nur bei mehrseitigen Blättern
    if s.count('<div class="page-footer">') == 1:
        s = re.sub(r'(<div class="page-footer">.*?) &middot; Seite 1(</span></div>)', r'\1\2', s, flags=re.S)
    # einheitliches Logo (gleiche Grafik, gleiche Datei)
    s = re.sub(r'<img class="logo" src="[^"]+"', '<img class="logo" src="' + LOGO + '"', s)
    return s

def finish(s, folder):
    """Schritte, die bei jedem Lauf neu angewendet werden (idempotent)."""
    # einheitliches Layout-CSS (alter Block wird ersetzt)
    m = s.find('/* ===== Einheitliches Layout')
    if m >= 0:
        s = s[:m].rstrip() + '\n' + s[s.rfind('</style>'):]
    i = s.rfind('</style>')
    s = s[:i] + CSS.lstrip('\n') + (EXTRA.get(folder, '') + '\n' if folder in EXTRA else '') + s[i:]
    # kein grauer Untertitel unter der Überschrift
    s = re.sub(r'\s*<div class="sub">.*?</div>', '', s, flags=re.S)
    # Beschriftung unter dem QR-Code zur Anleitung
    s = s.replace('fill="#333">Schritt für Schritt</text>', 'fill="#333">Anleitung</text>')
    # rechts in der Fußzeile: Abschnitt der Gliederung (bei mehrseitigen Blättern mit Seitenzahl)
    ab = ABSCHNITT[NR[folder].split('.')[0]]
    pages = s.count('<div class="page-footer">')
    def fr(m):
        k = fr.n = getattr(fr, 'n', 0) + 1
        return m.group(1) + ab + (f' &middot; Seite {k}' if pages > 1 else '') + m.group(2)
    s = re.sub(r'(<div class="page-footer"><span>[^<]*</span><span>).*?(</span></div>)', fr, s, flags=re.S)
    assert getattr(fr, 'n', 0) == pages, folder
    return s

_top = subprocess.check_output(['git','-C',ROOT,'rev-parse','--show-toplevel'],text=True).strip()
_g = subprocess.check_output(['git','-C',ROOT,'show','HEAD:'+os.path.relpath(os.path.join(ROOT,'Grundlagen','Arbeitsblatt_CAS_Grundlagen.html'),_top)],text=True)
LOGO = re.search(r'<img class="logo" src="([^"]+)"', _g).group(1)

with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(); pg.emulate_media(media='print')
    for folder in NR:
        fn = [f for f in os.listdir(os.path.join(ROOT, folder)) if f.startswith('Arbeitsblatt_CAS_') and f.endswith('.html')][0]
        path = os.path.join(ROOT, folder, fn)
        rel = os.path.relpath(path, subprocess.check_output(['git','-C',ROOT,'rev-parse','--show-toplevel'],text=True).strip())
        src = open(path, encoding='utf-8').read()
        if 'class="ab-inhalt' not in src:
            open(path,'w',encoding='utf-8').write(src)
            src = transform(src, folder, flex_pages(pg, path))
        open(path,'w',encoding='utf-8').write(finish(src, folder))
        print('ok', folder, NR[folder])
    b.close()
