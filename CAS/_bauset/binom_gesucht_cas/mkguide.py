R='/home/claude/olafkott.github.io/CAS/'
wt=open(R+'Wertetabelle/CAS_Wertetabelle_Schritt_fuer_Schritt.html').read().split('\n')
gr=open(R+'Graphen/CAS_Graphen_Schritt_fuer_Schritt.html').read().split('\n')
eng=open('engine.js').read()
head='\n'.join(wt[:175])
extra='''.play{ font:600 15px system-ui,Arial,sans-serif; background:#F2B705; color:#111; border:0; border-radius:999px; padding:7px 16px; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,.15); }
.chip.playc{ background:#F2B705; color:#111; cursor:pointer; }
.play:hover{ background:#ffc928; } .playh{ font-size:13px; color:var(--mute); margin-left:6px; }
.vgl td{ text-align:center; } .vgl td.hl{ background:#FFE9A8; font-weight:bold; }
.cms{ font-family:Consolas,'Courier New',monospace; font-size:14px; background:#f1e6c8; border-radius:3px; padding:0 4px; white-space:nowrap; }
.syn{ background:#eef3fb; border-radius:6px; padding:5px 10px; font-size:14.5px !important; }
.task .term .cmd{ font-size:19px; }'''
mid='\n'.join(wt[175:267])
assert wt[175].startswith('@media (max-width:380px)'), wt[175]
assert wt[266].startswith('const AK='), wt[266]
mid=mid.replace('<title>CAS Schritt für Schritt: Wertetabelle und Graph</title>','<title>CAS Schritt für Schritt: Binomialverteilung – n, k oder p gesucht</title>')
mid=mid.replace('<h1>CAS Schritt für Schritt: Wertetabelle und Graph<small>','<h1>CAS Schritt für Schritt: Binomialverteilung – n, k oder p gesucht<small>')
head=head.replace('<title>CAS Schritt für Schritt: Wertetabelle und Graph</title>','<title>CAS Schritt für Schritt: Binomialverteilung – n, k oder p gesucht</title>')
s=gr.index('// ---------- Steuerung ----------'); e=[i for i,l in enumerate(gr) if l.startswith('</script>')][-1]
ctrl='\n'.join(gr[s:]) 
ctrl=ctrl.replace('const ORDER=["g","a","e","s"];','const ORDER=["n","k","p"];')
assert 'const ORDER=["n","k","p"];' in ctrl
out=head+'\n'+extra+'\n'+mid+'\n'+eng+'\n'+ctrl
assert out.count('Binomialverteilung')>=2
open(R+'Binomial_Gesucht/CAS_Binomial_Gesucht_Schritt_fuer_Schritt.html','w').write(out)
print(len(out))
