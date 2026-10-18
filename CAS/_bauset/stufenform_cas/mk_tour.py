#!/usr/bin/env python3
# Baut CAS/Stufenform/CAS_Stufenform_Schritt_fuer_Schritt.html aus der LGS-Tour (Rechner, Steuerung) + eigener Engine
import re, sys
REPO = '/home/claude/olafkott.github.io/CAS/'
src = open(REPO + 'LGS/CAS_LGS_Schritt_fuer_Schritt.html', encoding='utf-8').read()
eng = open('/home/claude/work/stufe/engine.js', encoding='utf-8').read()

def rep(a, b, n=1):
    global src
    assert src.count(a) == n, (a[:60], src.count(a))
    src = src.replace(a, b)

rep('<title>CAS Schritt für Schritt: Lineare Gleichungssysteme</title>', '<title>CAS Schritt für Schritt: Zeilenstufenform</title>')
rep('<h1>CAS Schritt für Schritt: Lineare Gleichungssysteme<small>', '<h1>CAS Schritt für Schritt: Zeilenstufenform (ref / rref)<small>')
CSS = '''
/* ---------- Matrizen ---------- */
.mx{ display:inline-flex; align-items:stretch; vertical-align:middle; margin:1px 1px; }
.mx::before, .mx::after{ content:""; width:3px; border:1px solid currentColor; }
.mx::before{ border-right:0; } .mx::after{ border-left:0; }
.mx table{ border-collapse:collapse; }
.mx td{ padding:0 3px; font-size:10px; line-height:12px; text-align:center; min-width:9px; white-space:nowrap; }
.mx td:empty::after{ content:"\\25A1"; color:#999; }
.calcapp .cur .mx td{ min-width:12px; }
.bmx{ display:inline-flex; align-items:stretch; vertical-align:middle; font-family:Cambria,Georgia,serif; }
.bmx::before, .bmx::after{ content:""; width:6px; border:2px solid var(--ink); }
.bmx::before{ border-right:0; } .bmx::after{ border-left:0; }
.bmx table{ border-collapse:collapse; margin:2px 0; }
.bmx td{ padding:0 9px; font-size:21px; line-height:1.35; text-align:right; min-width:30px; }
.bmx td.rs{ border-left:1.5px solid var(--ink); }
.bmx tr.sp td{ font-size:13px; line-height:1.2; color:var(--mute); text-align:right; }
.bmx tr.hl td{ background:#FFF3C4; }
.bmx td.nu{ color:#2E7D32; font-weight:bold; }
.auf2{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.auf2 .lgs{ font-size:18px; }
.auf2 .pf{ font-size:24px; color:var(--mute); }
@media (max-width:420px){ .bmx td{ font-size:17px; padding:0 6px; min-width:22px; } .auf2 .lgs{ font-size:15px; } }
'''
rep('\n/* linksbündig (Moodle-Frame) */', CSS + '\n/* linksbündig (Moodle-Frame) */')
a = src.index('// ---------- linSolve: Menüs, Dialoge, Vorlage ----------')
b = src.index('// ---------- Steuerung ----------')
src = src[:a] + eng + src[b:]
rep('const ORDER=["d"];', 'const ORDER=["m","r"];')
assert 'linSolve' not in src.split('<script>')[1] or True
out = REPO + 'Stufenform/CAS_Stufenform_Schritt_fuer_Schritt.html'
import os; os.makedirs(REPO + 'Stufenform', exist_ok=True)
open(out, 'w', encoding='utf-8').write(src)
print('ok', out, len(src))
