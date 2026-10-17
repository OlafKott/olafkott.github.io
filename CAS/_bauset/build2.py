import base64, re, pathlib, sys
sys.path.insert(0, '/home/claude/work')
from cssprefix import prefix
W = pathlib.Path('/home/claude/work')
import json
from topics import TOPICS, NOPDF
themen = [t['id'] for t in TOPICS]
ids = [i for i in themen + ['dx_' + t for t in themen] if (W/f'mods/g_{i}.js').exists()]
shell = (W/'shell2_head.html').read_text() + (W/'shell2_tail.html').read_text()

mods, css = [], []
for i in ids:
    g = (W/f'mods/g_{i}.js').read_text()
    assert g.count('make:function(){') == 1, i
    m = re.search(r'css:String\.raw`(.*?)`,\s*\n\s*make:', g, re.S); assert m, i
    css.append(f'/* {i} */\n' + m.group(1))
    g = g.replace('make:function(){', 'make:function(__D){').replace('window.scrollTo', '__D.scrollTo').replace('document.', '__D.')
    up = W/f'mods/u_{i}.js'; u = up.read_text() if up.exists() else ''
    for s in (g, u): assert '</script' not in s.lower(), i
    mods += [f'/* ===== Anleitung: {i} ===== */\n' + g, f'/* ===== Übung: {i} ===== */\n' + u]

base_cw = (W/'base.css').read_text()
tabs = '\n'.join(l for l in base_cw.splitlines() if l.startswith('.tabs'))
base_cw = '\n'.join(l for l in base_cw.splitlines() if not l.startswith('.tabs'))
base_dx = (W/'dx_base.css').read_text().replace('wack', 'wackdx').replace('transform-origin:top center', 'transform-origin:top left')
basecss = prefix(base_cw, '.m-cw') + '\n' + prefix(base_dx, '.m-dx')

calc_cw = (W/'calc.html').read_text().replace(' id="calc"', '').replace(' id="scr"', '')
calc_dx = (W/'dx_calc.html').read_text().replace(' id="calc_dx"', '')
assert 'id="scr"' not in calc_dx

logo = base64.b64encode((W/'rwb_logo.png').read_bytes()).decode()
out = (shell.replace('{{BASECSS}}', basecss).replace('{{TABSCSS}}', tabs)
            .replace('{{MODCSS}}', '\n'.join(css))
            .replace('{{CALC_CW}}', calc_cw).replace('{{CALC_DX}}', calc_dx)
            .replace('{{LOGO}}', logo).replace('{{MODULES}}', '\n'.join(mods))
            .replace('{{THEMEN}}', json.dumps(themen))
            .replace('{{PDFNAME}}', json.dumps({t['id']:t['pdf'] for t in TOPICS}))
            .replace('{{NOPDF}}', json.dumps(NOPDF))
            .replace('{{APP_CW}}', json.dumps({t['id']:t['app_cw'] for t in TOPICS}))
            .replace('{{APP_DX}}', json.dumps({t['id']:t['app_dx'] for t in TOPICS})))
for ph in ['{{BASECSS}}', '{{TABSCSS}}', '{{MODCSS}}', '{{CALC_CW}}', '{{CALC_DX}}', '{{LOGO}}', '{{MODULES}}']:
    assert ph not in out, ph
dst = W/'out'/'Taschenrechner_CW_und_X.html'
dst.write_text(out)
print(dst, len(out))
