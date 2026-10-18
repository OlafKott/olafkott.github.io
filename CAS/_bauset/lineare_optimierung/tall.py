from playwright.sync_api import sync_playwright
F='file:///home/claude/olafkott.github.io/CAS/CAS_Fuehrerschein.html'
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':900})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and errs.append(m.text))
    pg.goto(F); pg.wait_for_timeout(800)
    pg.screenshot(path='toc.png',full_page=True)
    pg.goto(F+'#lopt'); pg.wait_for_timeout(1200)
    sel='.gpanel[data-g=lopt] #next'
    qs=0; heights=set(); last=None
    for i in range(300):
        st=pg.inner_text(".gpanel[data-g=lopt] #nr")+pg.inner_text(".gpanel[data-g=lopt] #stat")
        if '?' in pg.inner_text('#scr'): qs+=1
        heights.add(round(pg.evaluate("document.querySelector('.gpanel[data-g=lopt] #next').getBoundingClientRect().top")))
        if pg.evaluate(f"document.querySelector('{sel}').disabled"): break
        pg.click(sel); pg.wait_for_timeout(60)
        if st==last: pg.wait_for_timeout(1000)
        last=st
    print('clicks',i,'end state',st,'? screens',qs,'button tops',sorted(heights))
    pg.screenshot(path='comb_end.png')
    pg.goto(F+'#lopt-uebung'); pg.wait_for_timeout(1500)
    pg.screenshot(path='comb_ueb.png')
    print('errors',errs)
    b.close()
