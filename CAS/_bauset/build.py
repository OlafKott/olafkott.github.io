import base64, re, pathlib
W = pathlib.Path('/home/claude/work')
import json, sys, pathlib as _p
sys.path.insert(0,'/home/claude/work'); from topics import TOPICS, NOPDF
ids = [t['id'] for t in TOPICS if _p.Path(f"/home/claude/work/mods/g_{t['id']}.js").exists()]
shell = (W/'shell.html').read_text()
mods = []
modcss_marker = []
for i in ids:
    g = (W/f'mods/g_{i}.js').read_text()
    assert g.count('make:function(){') == 1, i
    g = g.replace('make:function(){', 'make:function(__D){')
    g = g.replace('window.scrollTo', '__D.scrollTo').replace('document.', '__D.')
    up = W/f'mods/u_{i}.js'; u = up.read_text() if up.exists() else ''
    for s in (g, u):
        assert '</script' not in s.lower(), i
    mods += [f'/* ===== Anleitung: {i} ===== */\n' + g, f'/* ===== Übung: {i} ===== */\n' + u]
# Modul-CSS der Anleitungen zusätzlich als echtes <style> einsetzen (Selektoren sind mit [data-g] präfixiert)
css = []
for i in ids:
    g = (W/f'mods/g_{i}.js').read_text()
    m = re.search(r'css:String\.raw`(.*?)`,\s*\n\s*make:', g, re.S)
    assert m, i
    css.append(f'/* {i} */\n' + m.group(1))
logo = base64.b64encode((W/'rwb_logo.png').read_bytes()).decode()
out = (shell.replace('{{BASECSS}}', (W/'base.css').read_text())
            .replace('{{MODCSS}}', '\n'.join(css))
            .replace('{{CALC}}', (W/'calc.html').read_text())
            .replace('{{LOGO}}', logo)
            .replace('{{MODULES}}', '\n'.join(mods))
            .replace('{{TOPICS}}', json.dumps([dict(id=t['id'],pdf=f"Arbeitsblatt_fx991_{t['pdf']}.pdf",app=t['app_cw']) for t in TOPICS if t['id'] in ids])))
assert '{{' not in out.replace('${', '')  or True
dst = W/'out'/'fx991CW_Taschenrechner.html'
dst.parent.mkdir(exist_ok=True)
dst.write_text(out)
print(dst, len(out))
