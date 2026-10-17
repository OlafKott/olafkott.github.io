# Platzhalter in raw/*.html ersetzen und nach GitHub-Ordner schreiben
import pathlib,sys
W=pathlib.Path('/home/claude/work'); R=W/'raw'; D=pathlib.Path('/home/claude/olafkott.github.io/CAS/fx991')
P={'@@LOGO@@':(R/'_LOGO_FHR.txt').read_text(),'@@CALC_CW@@':(R/'_CALC_CW.txt').read_text(),'@@CALC_DX@@':(R/'_CALC_DX.txt').read_text()}
def parabel():
    pts=[]
    for i in range(201):
        px=i*445.5/200; X=(px-155.1)/33; g=-0.25*X*X+X+3; py=181.5-33*g
        pts.append(f'{px:.1f},{py:.1f}')
    return ' '.join(pts)
P['@@PARABEL@@']=parabel()
v2=P['@@CALC_DX@@']
for a,b in [('<div class="calc ex">','<div class="calc">'),(' <i class="al">A</i></span>','</span>'),(' <i class="al">B</i></span>','</span>'),('<span class="sl">,</span><button class="k" data-k=")">','<span class="sl">;</span><button class="k" data-k=")">')]:
    assert v2.count(a)==1,a; v2=v2.replace(a,b)
P['@@CALC_DX_V2@@']=v2
P['@@ABL_CORE@@']=(R/'_ABL_CORE.txt').read_text()
for n in ['CW_CSS','CW_HOME_JS','CW_RENDER','CW_TAIL','DX_CSS','DX_MENU_JS','DX_RENDER','LGS_CORE','LGS_TOUR','LGS_CTRL','LGS_CTRL_DX','DX_MENU_ICONS']: P['@@'+n+'@@']=(R/('_'+n+'.txt')).read_text()

import re,io,base64,qrcode
def qr(url):
    q=qrcode.QRCode(box_size=10,border=4,error_correction=qrcode.constants.ERROR_CORRECT_L); q.add_data(url); q.make(fit=True)
    b=io.BytesIO(); q.make_image().convert('1').save(b,'PNG'); return base64.b64encode(b.getvalue()).decode()
def igpaths():
    ox,oy,ux,uy=51.9,74.5,32.44,13.3
    f=lambda x:-x*x+2*x+3
    P=lambda x:f'{ox+ux*x:.1f},{oy-uy*f(x):.1f}'
    a1='M51.9,74.5 L'+' L'.join(P(3*i/60) for i in range(61))+' L149.2,74.5 Z'
    a2='M149.2,74.5 L'+' L'.join(P(3+2*i/60) for i in range(61))+' L214.1,74.5 Z'
    cv='M'+' L'.join(P(-1.449+6.599*i/100) for i in range(101))
    return a1,a2,cv
P['@@IG_A1@@'],P['@@IG_A2@@'],P['@@IG_F@@']=igpaths()
def subqr(s): return re.sub(r'@@QR:([^@]+)@@',lambda m:qr(m.group(1)),s)
for f in sorted(R.glob('*.html')):
    s=f.read_text()
    for k,v in P.items(): s=s.replace(k,v)
    s=subqr(s)
    assert '@@' not in s, (f.name, s[s.index('@@')-30:s.index('@@')+30])
    (D/f.name).write_text(s); print(f.name, len(s))
