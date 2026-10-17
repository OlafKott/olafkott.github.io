# Erzeugt mods/g_<id>.js und mods/u_<id>.js aus fertigen Einzel-HTMLs (Spec: AGENT_SPEC_CW_FULL.md)
import re, sys, pathlib
W = pathlib.Path('/home/claude/work')

def blocks(css):
    """CSS in Top-Level-Blöcke zerlegen: Liste (prelude, body) bzw. ('@raw', text) für Kommentare entfernt."""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out = []; i = 0; n = len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0: break
        pre = css[i:j].strip()
        depth = 0; k = j
        while k < n:
            if css[k] == '{': depth += 1
            elif css[k] == '}':
                depth -= 1
                if depth == 0: break
            k += 1
        out.append((pre, css[j+1:k]))
        i = k + 1
    return out

norm = lambda s: re.sub(r'\s+', ' ', s).strip()

def rules_flat(css):
    """Menge normalisierter Regeln 'sel{body}' (@media-innere Regeln mit Präfix '@media..|')."""
    S = set()
    for pre, body in blocks(css):
        if pre.startswith('@media'):
            for p2, b2 in blocks(body): S.add(norm(pre) + '|' + norm(p2) + '{' + norm(b2) + '}')
        else:
            S.add(norm(pre) + '{' + norm(body) + '}')
    return S

def prefix_sel(sel, gid):
    return ', '.join(f'[data-g="{gid}"] ' + s.strip() for s in sel.split(','))

def guide_css(css, base, gid):
    B = rules_flat(base); out = []
    for pre, body in blocks(css):
        if pre.startswith('@keyframes'):
            if norm(pre) + '{' + norm(body) + '}' not in B: out.append(f'{pre}{{{body}}}')
        elif pre.startswith('@media'):
            inner = [(p2, b2) for p2, b2 in blocks(body) if norm(pre) + '|' + norm(p2) + '{' + norm(b2) + '}' not in B]
            if inner: out.append(pre + '{ ' + ' '.join(f'{prefix_sel(p2, gid)}{{{b2}}}' for p2, b2 in inner) + ' }')
        else:
            if pre.startswith(':root') or pre in ('*', 'body', 'main') or pre.startswith('.top') or pre.startswith('.tabs'): continue
            if norm(pre) + '{' + norm(body) + '}' in B: continue
            out.append(f'{prefix_sel(pre, gid)}{{{body}}}')
    s = '\n'.join(out)
    assert '`' not in s and '${' not in s
    return s

def guide(html, gid, base):
    css = html[html.index('<style>') + 7: html.index('</style>')]
    h1 = re.search(r'<h1>(.*?)<small>', html).group(1)
    title = re.sub(r'^(Taschenrechner )?Schritt für Schritt: ', '', h1).strip()
    sc = html[html.index('<script>') + 8: html.rindex('</script>')]
    m = re.search(r'// =+\n//  Steuerung', sc)
    eng, ctl = sc[:m.start()], sc[m.start():]
    L = ctl.split('\n'); out = []; skip = False
    for ln in L:
        t = ln.strip()
        if skip:
            if t.startswith('});'): skip = False
            continue
        if t.startswith("document.addEventListener('keydown'"): skip = True; continue
        if t.startswith("document.querySelectorAll('.calc .k')") or re.match(r"\$\('(next|back|tabs|prog)'\)\.onclick", t): continue
        if 'location.hash' in t: continue
        out.append(ln)
    while out and out[-1].strip() in ('', 'render();'):
        if out[-1].strip() == 'render();': out.pop(); break
        out.pop()
    ctl = '\n'.join(out)
    assert 'KMAP' in ctl, gid
    ret = """
return {
  ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
  render, press, next, back, KMAP,
  selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
  selectStep:function(i){ st=+i; pos=0; render(); }
};"""
    return (f'GUIDES["{gid}"]={{\n title:"{title}",\n css:String.raw`{guide_css(css, base, gid)}`,\n make:function(){{\n'
            + eng + ctl + ret + '\n }\n};\n')

def uebung(html, gid):
    css = html[html.index('<style>') + 7: html.index('</style>')]
    h1 = re.search(r'<h1>(.*?)<small>', html).group(1)
    title = re.sub(r'^Übung: ', '', h1).strip()
    out = []
    for pre, body in blocks(css):
        p = pre.strip()
        if p.startswith('.top') or p == '.home': continue
        if p == ':root': out.append(f':host{{{body}}}'); continue
        if p == 'body':
            props = [x.strip() for x in body.split(';') if x.strip() and not x.strip().startswith('margin') and not x.strip().startswith('background')]
            out.append(':host{ display:block; ' + '; '.join(props) + '; }'); continue
        if p == '.wrap': out.append('.wrap{ max-width:none; margin:0; padding:0; }'); continue
        out.append(f'{pre}{{{body}}}')
    css2 = '\n'.join(out); assert '`' not in css2 and '${' not in css2
    a = html.index('<div class="wrap">'); b = html.index('<script>')
    wrap = html[a:b].rstrip()
    sc = html[b + 8: html.rindex('</script>')]
    sc = sc.replace('document.getElementById(', 'root.getElementById(').replace('document.querySelector', 'root.querySelector')
    sc = '\n'.join(l for l in sc.split('\n') if 'location.hash' not in l)
    assert '`' not in wrap
    return f'UEB["{gid}"]={{\n title:"{title}",\n css:String.raw`{css2}`,\n html:String.raw`{wrap}`,\n init:function(root){{\n{sc}\n }}\n}};\n'

if __name__ == '__main__':
    D = pathlib.Path('/home/claude/olafkott.github.io/CAS/fx991')
    for gid, model, g, u in [
        ('abl', 'cw', 'fx991_Ableitung_Schritt_fuer_Schritt.html', 'fx991_Uebung_Ableitung.html'),
        ('int', 'cw', 'fx991_Integrale_Schritt_fuer_Schritt.html', 'fx991_Uebung_Integrale.html'),
        ('lgs', 'cw', 'fx991_LGS_Schritt_fuer_Schritt.html', 'fx991_Uebung_LGS.html'),
        ('dx_abl', 'dx', 'fx991DEX_Ableitung_Schritt_fuer_Schritt.html', 'fx991DEX_Uebung_Ableitung.html'),
        ('dx_int', 'dx', 'fx991DEX_Integrale_Schritt_fuer_Schritt.html', 'fx991DEX_Uebung_Integrale.html'),
        ('dx_lgs', 'dx', 'fx991DEX_LGS_Schritt_fuer_Schritt.html', None)]:
        base = (W / ('base.css' if model == 'cw' else 'dx_base.css')).read_text()
        (W / 'mods' / f'g_{gid}.js').write_text(guide((D / g).read_text(), gid, base))
        if u: (W / 'mods' / f'u_{gid}.js').write_text(uebung((D / u).read_text(), gid))
        print('ok', gid)
