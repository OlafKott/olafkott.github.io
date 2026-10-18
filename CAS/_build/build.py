#!/usr/bin/env python3
# Baut CAS_Fuehrerschein.html aus den einzelnen CAS-Anleitungen und -Übungen.
import re, sys, os, base64, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, 'CAS_Fuehrerschein.html')

# NEUES THEMA: eine Zeile in TOPICS ergänzen (Ordner mit CAS_<Kern>_Schritt_fuer_Schritt.html,
# optional CAS_Uebung_<Kern>.html und PDF). Vorschau-Bild: PREV in shell.html (sonst automatisch).
# Aufruf: python3 CAS/_build/build.py  -> schreibt CAS/CAS_Fuehrerschein.html
# id (nur Kleinbuchstaben), Ordner, Dateikern Anleitung, Übung (oder None), Titel, Zusatz, PDF, Vorschau [Spur, Schritt]
TOPICS = [
    ('grund', 'Grundlagen', 'Grundlagen', None, 'Grundlagen', '', 'Arbeitsblatt_CAS_Grundlagen.pdf'),
    ('stat', 'Lage_und_Streuung', 'Lage_Streuung', 'Lage_Streuung', 'Lage- und Streuungs&shy;maße', '', 'Arbeitsblatt_CAS_Lage_Streuung.pdf'),
    ('reg', 'Regression', 'Regression', 'Regression', 'Lineare Regression und Korrelation', '', 'Arbeitsblatt_CAS_Regression.pdf'),
    ('wreg', 'Weitere_Regressionen', 'Weitere_Regressionen', 'Weitere_Regressionen', 'Weitere Regressionen', 'quadratisch, kubisch, exponentiell', 'Arbeitsblatt_CAS_Weitere_Regressionen.pdf'),
    ('funk', 'Funktionswerte', 'Funktionswerte', 'Funktionswerte', 'Funktionswerte (y&#8209;Werte) berechnen', '', 'Arbeitsblatt_CAS_Funktionswerte.pdf'),
    ('wt', 'Wertetabelle', 'Wertetabelle', 'Wertetabelle', 'Wertetabelle und Graph', 'Funktion zeichnen, Fenster, Wertetabelle', 'Arbeitsblatt_CAS_Wertetabelle.pdf'),
    ('gl', 'Gleichungen', 'Gleichungen', 'Gleichungen', 'Gleichungen lösen (solve)', '', 'Arbeitsblatt_CAS_Gleichungen.pdf'),
    ('lgs', 'LGS', 'LGS', 'LGS', 'Lineare Gleichungs&shy;systeme lösen', '', 'Arbeitsblatt_CAS_LGS.pdf'),
    ('graph', 'Graphen', 'Graphen', 'Graphen', 'Funktionen analysieren', 'Nullstellen, Extrem-, Wende- und Schnittpunkte', 'Arbeitsblatt_CAS_Graphen.pdf'),
    ('abl', 'Ableitungen', 'Ableitungen', 'Ableitungen', 'Ableitungen', '', 'Arbeitsblatt_CAS_Ableitungen.pdf'),
    ('int', 'Integrale', 'Integrale', 'Integrale', 'Bestimmtes und unbestimmtes Integral', '', 'Arbeitsblatt_CAS_Integrale.pdf'),
    ('flae', 'Flaechen', 'Flaechen', 'Flaechen', 'Fläche im Graphen bestimmen', 'Fläche mit der x-Achse und zwischen zwei Graphen', 'Arbeitsblatt_CAS_Flaechen.pdf'),
]

def read(p):
    return open(p, encoding='utf-8').read()

# ------------------------------------------------------------------ CSS
def blocks(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        pre = css[i:j].strip()
        d, k = 1, j + 1
        while d:
            if css[k] == '{': d += 1
            elif css[k] == '}': d -= 1
            k += 1
        out.append((pre, css[j + 1:k - 1]))
        i = k
    return out

def scope_css(css, g, host=False):
    S = ':host' if host else f'[data-g="{g}"]'
    names = []
    def run(css):
        res = []
        for pre, body in blocks(css):
            if pre.startswith('@media'):
                inner = run(body)
                if inner.strip(): res.append(pre + '{' + inner + '}')
            elif pre.startswith('@keyframes'):
                nm = pre.split()[1]
                if host:
                    res.append(pre + '{' + body + '}')
                else:
                    names.append(nm); res.append(f'@keyframes {nm}_{g}{{{body}}}')
            else:
                sels = []
                for s in [x.strip() for x in pre.split(',')]:
                    if re.match(r'^(body|html|main)\b', s) or s.startswith('.top'):
                        continue
                    if s == ':root':
                        sels.append(S)
                    elif s == '*':
                        sels.append(S if host else f'{S} *, {S}')
                    elif host:
                        sels.append(s)
                    else:
                        sels.append(f'{S} {s}')
                if sels:
                    res.append(', '.join(sels) + '{' + body.strip() + '}')
        return '\n'.join(res)
    out = run(css)
    for nm in names:
        out = re.sub(r'(animation(?:-name)?\s*:[^;}]*?)\b' + re.escape(nm) + r'\b', r'\1' + nm + '_' + g, out)
    return out

# ------------------------------------------------------------------ Anleitungen
LET9 = '''(function(){
  const rows=[["EE","a","b","c","d","e","f","g","?!"],["π","h","i","j","k","l","m","n","⚑"],[",","o","p","q","r","s","t","u","↵"],["","v","w","x","y","z","␣"]];'''

def let9_html():
    rows = [["EE","a","b","c","d","e","f","g","?!"],["π","h","i","j","k","l","m","n","⚑"],[",","o","p","q","r","s","t","u","↵"],["","v","w","x","y","z","␣"]]
    h = ''
    for r in rows:
        for c in r:
            if c == '': h += '<span></span>'
            elif c == '␣': h += '<button class="k span3" data-k="space">␣</button>'
            else: h += f'<button class="k" data-k="{c}">{c.upper() if re.fullmatch("[a-z]", c) else c}</button>'
    return h

def guide(gid, folder, core):
    t = read(f'{REPO}/{folder}/CAS_{core}_Schritt_fuer_Schritt.html')
    css = re.search(r'<style>(.*?)</style>', t, re.S).group(1)
    body = re.search(r'<body>(.*)</body>', t, re.S).group(1)
    js = re.search(r'<script>(.*?)</script>', body, re.S).group(1)
    calc = re.search(r'(<div class="calc">.*?)\n\s*<div class="panel">', body, re.S).group(1)
    panel = re.search(r'<div class="panel">(.*?)</div>\s*</main>', body, re.S).group(1)
    small = re.search(r'<h1>[^<]*<small>(.*?)</small>', body, re.S).group(1)
    small = small.replace('TI-Nspire CX CAS · ', '')
    # --- Skript umbauen
    js2 = re.sub(r'// -+ Buchstabentasten -+\n\(function\(\)\{\n  const rows=.*?\n\}\)\(\);\n', '', js, flags=re.S)
    assert js2 != js, gid + ': let9'
    js2 = js2.replace('window.scrollTo', '__D.scrollTo').replace('document.', '__D.')
    drop = [r"^__D\.querySelectorAll\('\.calc \.k'\)\.forEach.*$",
            r"^\$\('next'\)\.onclick=next; \$\('back'\)\.onclick=back;$",
            r"^\$\('tabs'\)\.onclick=.*$",
            r"^\$\('prog'\)\.onclick=.*$",
            r"^const h=\(location\.hash.*$",
            r"^render\(\);\s*$"]
    for d in drop:
        js2, n = re.subn(d, '', js2, flags=re.M)
        assert n == 1, (gid, d, n)
    js2, n = re.subn(r"^__D\.addEventListener\('keydown',e=>\{\n.*?\n\}\);\n", '', js2, flags=re.M | re.S)
    assert n == 1, (gid, 'keydown')
    assert 'location' not in js2 and 'window.' not in js2, gid
    # Weiter-Button: immer „Weiter ▶“ (ein Klick = nächster Schritt), statt „Überspringen“
    js2, n1 = re.subn(r"\$\('next'\)\.textContent=\w+ \? (\(last \? .*?: 'Weiter ▶'\)) : 'Überspringen';", r"$('next').textContent=\1;", js2)
    js2, n2 = re.subn(r"\$\('next'\)\.className=\w+\?'go':'';", "$('next').className='go';", js2)
    assert n1 == 1 and n2 == 1, (gid, 'weiter', n1, n2)
    # Überspringen-Button mitführen (am Ende der letzten Spur gesperrt)
    js2, n3 = re.subn(r"(\$\('next'\)\.disabled=[^;]*;)", r"\1 { const sk=$('skip'); if(sk) sk.disabled=last&&!nextT&&st===TRACKS[tr].steps.length-1; }", js2)
    assert n3 == 1, (gid, 'skip', n3)
    api = '''
  return {
    ORDER, TRACKS, KMAP, render, press, next, back,
    screen:function(t,s,i){ if(i===undefined) i=TRACKS[t].steps[s].k.length; return screenOf(t,s,i); },
    home:(typeof home==='function'?home:null),
    selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
    selectStep:function(i){ st=+i; pos=0; render(); },
    fwd:function(){ if(lock) return; const T=TRACKS[tr], S=T.steps[st];
      if(st<T.steps.length-1){ st++; pos=0; render(); return; }
      const n=ORDER[ORDER.indexOf(tr)+1]; if(n){ tr=n; st=0; pos=0; render(); __D.scrollTo(); return; }
      if(pos<S.k.length){ pos=S.k.length; render(); } },
    goto:function(t,s,i){ tr=t; st=s; pos=i; render(); },
    snap:function(){ const D=(typeof done==='object'&&done)?Object.assign({},done):null; return {tr,st,pos,D}; },
    restore:function(o){ tr=o.tr; st=o.st; pos=o.pos; if(o.D&&typeof done==='object'&&done){ Object.keys(done).forEach(k=>delete done[k]); Object.assign(done,o.D); } render(); },
    weiter:function(){ if(lock) return; const S=TRACKS[tr].steps[st]; if(pos<S.k.length) press(S.k[pos]); else this.fwd(); },
    bwd:function(){ if(lock) return; if(st>0){ st--; pos=0; } else pos=0; render(); }
  };'''
    mod = f'/* ===== Anleitung: {gid} ===== */\nGUIDES["{gid}"]={{\n note:{json.dumps(small, ensure_ascii=False)},\n make:function(__D){{\n{js2.strip()}\n{api}\n }}\n}};\n'
    return dict(css=scope_css(css, gid), js=mod, calc=calc, panel=panel)

# ------------------------------------------------------------------ Übungen
def uebung(gid, folder, core):
    t = read(f'{REPO}/{folder}/CAS_Uebung_{core}.html')
    css = re.search(r'<style>(.*?)</style>', t, re.S).group(1)
    body = re.search(r'<body>(.*)</body>', t, re.S).group(1)
    js = re.search(r'<script>(.*?)</script>', body, re.S).group(1)
    html = re.search(r'(<div class="wrap">.*?)\s*<script>', body, re.S).group(1)
    title = re.search(r'<h1>(.*?)<small>', body, re.S).group(1).replace('CAS-Übung: ', '')
    js2 = js.replace('document.', 'root.').replace('location.hash', "''")
    assert 'window.' not in js2 and 'location' not in js2, gid
    ucss = scope_css(css, gid, host=True)
    ucss += '\n.wrap{max-width:none;margin:0;padding:0;}\n:host{display:block;container-type:inline-size;}\n@container (max-width:660px){ .grid{ grid-template-columns:1fr !important; } }'
    mod = (f'/* ===== Übung: {gid} ===== */\nUEB["{gid}"]={{\n title:{json.dumps(title, ensure_ascii=False)},\n'
           f' css:String.raw`{ucss}`,\n html:String.raw`{html}`,\n init:function(root){{\n{js2.strip()}\n }}\n}};\n')
    assert '`' not in ucss and '`' not in html, gid
    return mod

# ------------------------------------------------------------------ zusammensetzen
G = {}; U = {}
for gid, folder, core, ueb, *_ in TOPICS:
    G[gid] = guide(gid, folder, core)
    if ueb: U[gid] = uebung(gid, folder, ueb)

# gemeinsamer Rechner: Grundlagen-Version (mit Zweitbelegungen), Buchstaben statisch
calc = G['grund']['calc'].replace('<div class="let9" id="let9"></div>', '<div class="let9" id="let9">' + let9_html() + '</div>')
calc = calc.replace('<div class="calc">', '<div class="calc" id="calc" aria-label="TI-Nspire CX CAS">', 1)
calc = calc.replace('<div class="scr" id="scr"></div>', '<div class="scr" id="scr"></div>', 1)
assert 'id="scr"' in calc

panels_same = len({g['panel'] for g in G.values()}) == 1
PANEL_HTML = '<div class="tabs" id="tabs"></div><div class="pnote" id="pnote"></div>' + G['grund']['panel'].strip()
PANEL_HTML = re.sub(r'\s*\n\s*', '', PANEL_HTML)
_b = '<button id="back">◀ Zurück</button><button id="next">Überspringen</button>'
assert _b in PANEL_HTML, 'btns'
PANEL_HTML = PANEL_HTML.replace(_b, '<button id="back">◀ Zurück</button><button id="skip" title="Direkt zum nächsten Schritt">Überspringen ⏭</button><button id="next">Weiter ▶</button>')


# Themenblöcke der Gliederung (Reihenfolge = Anzeige). Grundlagen (None) steht einzeln ganz oben.
BLOCKS = [
    ('stat','Statistik'),
    ('fa',  'Funktionen &amp; Analysis'),
    ('alg', 'Gleichungen &amp; Algebra'),
    ('sto', 'Stochastik'),
]
# NEUES THEMA: hier seinem Block zuordnen (Reihenfolge im Block = Reihenfolge in TOPICS)
BLOCK_OF = {
    'grund': None,
    'funk': 'fa', 'wt': 'fa', 'abl': 'fa', 'graph': 'fa', 'int': 'fa', 'flae': 'fa',
    'gl': 'alg', 'lgs': 'alg',
    'stat': 'stat', 'reg': 'stat', 'wreg': 'stat',
}
# Zwischenüberschriften im Block: steht vor dem ersten Thema eines Abschnitts (Reihenfolge = TOPICS)
# NEUES THEMA der Differential-/Integralrechnung hier eintragen (z. B. 'int' für Integrale)
SECTION = {
    'abl': 'Differentialrechnung',
    'int': 'Integralrechnung', 'flae': 'Integralrechnung',
}
_bids = {b for b, _ in BLOCKS}
for t in TOPICS:
    assert t[0] in BLOCK_OF, f'Thema {t[0]!r} ist keinem Block zugeordnet (BLOCK_OF in build.py ergänzen)'
    assert BLOCK_OF[t[0]] is None or BLOCK_OF[t[0]] in _bids, t[0]
topics_js = json.dumps([dict(id=g, dir=f, pdf=p, ueb=bool(u), title=ti, sub=su, block=BLOCK_OF[g], sec=SECTION.get(g)) for g, f, c, u, ti, su, p in TOPICS], ensure_ascii=False)
blocks_js = json.dumps([dict(id=b, title=ti) for b, ti in BLOCKS], ensure_ascii=False)

tpl = read(os.path.join(os.path.dirname(__file__), 'shell.html'))
out = (tpl.replace('/*%GUIDECSS%*/', '\n'.join(f'/* --- {g} --- */\n' + G[g]['css'] for g in G))
          .replace('%CALC%', calc)
          .replace('/*%MODULES%*/', '\n'.join(G[g]['js'] + (U.get(g) or '') for g in G))
          .replace('%PANEL_HTML%', PANEL_HTML.replace("'", "\\'"))
          .replace('/*%TOPICS%*/', topics_js)
          .replace('/*%BLOCKS%*/', blocks_js))
open(OUT, 'w', encoding='utf-8').write(out)
print('ok', OUT, len(out), 'panels identical:', panels_same)
