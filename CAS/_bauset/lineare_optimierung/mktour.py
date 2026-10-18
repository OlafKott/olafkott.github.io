src=open('/home/claude/olafkott.github.io/CAS/Flaechen/CAS_Flaechen_Schritt_fuer_Schritt.html',encoding='utf-8').read()
mid=open('/home/claude/lo/mid.js',encoding='utf-8').read()
a=src.index('// ---------- Graphs-App: Menüs ----------'); b=src.index('// ---------- Steuerung ----------')
s=src[:a]+mid+src[b:]
def rep(x,y,n=1):
    global s
    assert s.count(x)==n,(x,s.count(x)); s=s.replace(x,y)
rep('Flächen berechnen','Lineare Optimierung',2)
rep('const ORDER=["g","x","i","z"];','const ORDER=["g","e","z"];')
open('/home/claude/olafkott.github.io/CAS/Lineare_Optimierung/CAS_Lineare_Optimierung_Schritt_fuer_Schritt.html','w',encoding='utf-8').write(s)
print('ok',len(s))
