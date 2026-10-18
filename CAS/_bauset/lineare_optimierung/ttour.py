import sys
from playwright.sync_api import sync_playwright
F='file:///home/claude/olafkott.github.io/CAS/Lineare_Optimierung/CAS_Lineare_Optimierung_Schritt_fuer_Schritt.html'
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1050,'height':900})
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and errs.append(m.text))
    pg.goto(F)
    n=0
    for t in ['g','e','z']:
        pg.evaluate(f"document.querySelector('#tabs [data-t={t}]').click()")
        for s in range(20):
            info=pg.evaluate("(()=>{const S=TRACKS[tr].steps[st];return {k:S.k,st,tr,n:TRACKS[tr].steps.length}})()")
            for k in info['k']:
                ok=pg.evaluate("k=>{const el=document.querySelector(`.calc .k[data-k=\"${CSS.escape(k)}\"]`); if(!el) return false; el.click(); return true;}",k)
                if not ok: errs.append(f'no key {k}')
                pg.wait_for_timeout(20)
            pg.wait_for_timeout(1000)
            scr=pg.inner_text('#scr')
            if '?' in scr: errs.append(f'? in screen {t}{s}: {scr}')
            pg.screenshot(path=f'/home/claude/lo/shot_{t}{info["st"]}.png'); n+=1
            if info['st']>=info['n']-1: break
            # advance if not auto
            pg.evaluate("(()=>{const T=TRACKS[tr]; if(st<T.steps.length-1 && pos>=T.steps[st].k.length && !lock){ /* advance happens automatically after keys */ } })()")
            cur=pg.evaluate("st")
            if cur==info['st']: pg.click('#next')
    print('screens',n,'errors',errs)
    b.close()
