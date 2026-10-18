import re
src=open('/home/claude/olafkott.github.io/CAS/Flaechen/CAS_Uebung_Flaechen.html',encoding='utf-8').read()
css=src[src.index('<style>')+7:src.index('</style>')]
logo=re.search(r'<img src="(data:image/png;base64,[^"]+)" alt="RWB Essen AHR">',src).group(1)
css=css.replace('/* linksbündig (Moodle-Frame) */','''.restr{ display:flex; flex-wrap:wrap; justify-content:center; gap:6px 26px; font-family:Cambria,Georgia,serif; font-size:18px; margin:4px 0 8px; }
.restr b{ font-family:system-ui,Arial,sans-serif; font-size:14px; color:var(--mute); font-weight:600; }
.var{ display:flex; flex-wrap:wrap; gap:4px 24px; margin:0 0 6px; padding:6px 12px; background:#f3f5f9; border-radius:8px; font-size:15px; }
.term{ font-weight:bold; color:var(--lf); }
table.d td.best{ background:#FDECEA; color:#C62828; font-weight:bold; }
#eck{ margin-top:8px; overflow-x:auto; }
.plot .ml{ font:bold 12px system-ui,Arial,sans-serif; }
#felder{ grid-template-columns:1fr 1fr 1fr; }
@media (max-width:760px){ #felder{ grid-template-columns:1fr; } }
.f.co input.ci{ width:96px; }
/* linksbündig (Moodle-Frame) */''')
body=open('ueb_body.html',encoding='utf-8').read().replace('@@LOGO@@',logo).replace('root.','document.')
a="  stat.a++; if(r===A.felder.length) stat.r++;"
if a in body: body=body.replace(a,"  if(!A.gezaehlt){ stat.a++; A.gezaehlt=true; } if(r===A.felder.length&&!A.geloest&&!shown){ stat.r++; A.geloest=true; }")
b="  zeigeLoesung();\n  document.getElementById('score').textContent='Lösung angezeigt.';"
if b in body: body=body.replace(b,"  zeigeLoesung(); shown=true;\n  document.getElementById('score').textContent='Lösung angezeigt.';")
assert 'shown=true' in body and 'A.gezaehlt' in body
out=f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>CAS-Übung: Lineare Optimierung</title>
<style>{css}</style></head><body>
{body}
</body></html>'''
assert 'window.' not in out and 'location' not in out
open('/home/claude/olafkott.github.io/CAS/Lineare_Optimierung/CAS_Uebung_Lineare_Optimierung.html','w',encoding='utf-8').write(out)
print('ok')
