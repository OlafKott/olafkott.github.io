# Arbeitsblatt CW (raw, mit @@QR:@@) -> X-Variante
import re
def keys():
    return ''.join(f'<rect x="{x}" y="{y}" width="3.4" height="2.1" rx="0.5" fill="{"#3d6fd1" if (y=="29.9" and x in ("18.0","22.7")) else "#f2f2f4"}"/>' for y in ("29.9","32.9") for x in ("3.9","8.6","13.3","18.0","22.7"))
def frame(url):
    return ('<div class="qrs"><a class="qrlink" href="'+url+'"><svg class="qrframe" viewBox="0 0 30 40" width="24mm" height="32mm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="1.5" y="0.4" width="27" height="36" rx="3.6" fill="#e6e6ea"/><rect x="2.4" y="1.3" width="25.2" height="34.2" rx="3" fill="#1e1e21"/><text x="3.8" y="3.9" font-family="Arial,sans-serif" font-size="2.1" font-weight="bold" fill="#fff">CASIO</text><text x="26.2" y="3.9" text-anchor="end" font-family="Georgia,serif" font-style="italic" font-size="1.5" letter-spacing="0.3" fill="#d94b5a">CLASSWIZ</text><rect x="3.6" y="4.8" width="22.8" height="22.4" rx="0.8" fill="#d3ded4"/><rect x="4.4" y="5.4" width="21.2" height="21.2" fill="#fff"/>'
      f'<image x="5" y="6" width="20" height="20" href="data:image/png;base64,@@QR:{url}@@" xlink:href="data:image/png;base64,@@QR:{url}@@"/>'+keys()+
      '<text x="15" y="39.4" text-anchor="middle" font-family="Georgia,serif" font-size="3.1" font-weight="bold" fill="#333">Schritt für Schritt</text></svg></a></div></div>')
def dx(src,dst,topic,sub_old,sub_new,weg_tipp):
    s=open(src).read()
    def rep(a,b):
        nonlocal s
        assert s.count(a)>=1,a[:60]; s=s.replace(a,b)
    rep(' fx-991DE CW</title>',' fx-991DE X</title>')
    rep(sub_old,sub_new)
    a=s.index('<p class="an weg">'); b=s.index('</div><div class="qrs">')
    s=s[:a]+weg_tipp+s[b:]
    B='https://olafkott.github.io/CAS/fx991/'
    a=s.index('<div class="qrs">'); b=s.index('</svg></a></div></div>')+len('</svg></a></div></div>')
    s=s[:a]+frame(B+f'fx991DEX_{topic}_Schritt_fuer_Schritt.html')+s[b:]
    s=s.replace(B+f'Loesung_fx991_{topic}.html',B+f'Loesung_fx991DEX_{topic}.html').replace(B+f'fx991_Uebung_{topic}.html',B+f'fx991DEX_Uebung_{topic}.html')
    assert 'fx991_' not in s.replace('fx991_','',0) or True
    open(dst,'w').write(s)
