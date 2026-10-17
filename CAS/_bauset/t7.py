import asyncio,functools
print=functools.partial(print,flush=True)
from playwright.async_api import async_playwright
TOP=['grund','stat','funk','gl','wt','abl','int','lgs','mat','stufe','kombi','binom']
async def run(pg,t,shots):
    await pg.evaluate('window.scrollTo(0,0)')
    sel=f'.topic[data-t="{t}"] .act.tour'
    if not await pg.locator(sel).count(): return ('no',t)
    await pg.click(sel); await pg.wait_for_timeout(700)
    ys=set(); texts=set(); n=0; skips=0
    # einmal Überspringen + Zurück testen
    nr0=await pg.locator('#nr:visible').inner_text()
    await pg.click('#skip:visible'); await pg.wait_for_timeout(50); nr1=await pg.locator('#nr:visible').inner_text()
    await pg.click('#back:visible'); await pg.wait_for_timeout(50); nr2=await pg.locator('#nr:visible').inner_text()
    ok_sb = (nr0!=nr1 and nr0==nr2)
    for i in range(3000):
        b=await pg.locator('.gpanel:not([hidden]) .btns').bounding_box(); ys.add(round(b['y'])) if b else None
        nx=pg.locator('#next:visible')
        if not await nx.count() or await nx.first.is_disabled(): break
        texts.add(await nx.first.inner_text())
        await pg.evaluate("document.querySelector('.gpanel:not([hidden]) #next').click()"); n+=1; await pg.wait_for_timeout(25)
    await pg.wait_for_timeout(1200)
    if shots: await pg.screenshot(path=f'out/b_{t}.png')
    await pg.click('#toToc'); await pg.wait_for_timeout(600)
    return (t,n,sorted(ys),ok_sb,sorted(texts)[:4])
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for F,models in [('out/fx991CW_Taschenrechner.html',[None]),('out/Taschenrechner_CW_und_X.html',['cw','dx'])]:
            errs=[]
            pg=await b.new_page(viewport={'width':1100,'height':900})
            pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
            await pg.goto('file:///home/claude/work/'+F); await pg.wait_for_timeout(600)
            for m in models:
                if m: await pg.click(f'#w_{m}'); await pg.wait_for_timeout(1000)
                for t in TOP: print(F[4:12],m,await run(pg,t,m in (None,'cw') and t in ('grund','stufe')))
                if m: await pg.click('#toToc'); await pg.wait_for_timeout(900)
            print('ERR',errs[:5]); await pg.close()
        await b.close()
asyncio.run(main())
