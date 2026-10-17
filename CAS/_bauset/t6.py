import asyncio,sys
from playwright.async_api import async_playwright
TOP=['grund','stat','funk','gl','wt','abl','int','lgs','mat','kombi','binom']
async def run(pg,root,t,errs,shots,tag):
    await pg.evaluate('window.scrollTo(0,0)')
    sel=f'.topic[data-t="{t}"] .act.tour'
    if not await pg.locator(sel).count(): print('  no topic',t); return None
    await pg.click(sel); await pg.wait_for_timeout(700)
    bx=await pg.locator(f'{root} .calc').bounding_box()
    n=0
    for i in range(500):
        h=pg.locator(f'{root} .k.hit')
        if await h.count() and await h.first.is_visible():
            await h.first.click(); n+=1; await pg.wait_for_timeout(15); continue
        nx=pg.locator('#next:visible')
        if not await nx.count(): break
        if await nx.first.is_disabled(): break
        await nx.first.click(); await pg.wait_for_timeout(15)
    await pg.wait_for_timeout(1700)
    if shots: await pg.screenshot(path=f'out/v_{tag}_{t}_g.png')
    u=pg.locator('#seg button[data-v="u"]')
    hasu = await u.count() and await u.is_visible()
    if hasu:
        await u.click(); await pg.wait_for_timeout(700)
        if shots: await pg.screenshot(path=f'out/v_{tag}_{t}_u.png')
    await pg.click('#toToc'); await pg.wait_for_timeout(700)
    return (t,n,round(bx['x']),round(bx['y']),bool(hasu))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for F,models in [('out/fx991CW_Taschenrechner.html',[None]),('out/Taschenrechner_CW_und_X.html',['cw','dx'])]:
            errs=[]
            pg=await b.new_page(viewport={'width':1100,'height':900})
            pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
            await pg.goto('file:///home/claude/work/'+F); await pg.wait_for_timeout(600)
            for m in models:
                root='' if m is None else f'#w_{m}'
                if m: await pg.click(f'#w_{m}'); await pg.wait_for_timeout(1000)
                await pg.screenshot(path=f'out/v_{m}_toc.png')
                res=[await run(pg,root,t,errs,t in('lgs','mat','kombi','binom'),m) for t in TOP]
                print(F.split('/')[-1],m,res)
                if m: await pg.click('#toToc'); await pg.wait_for_timeout(900)
            print('ERR',errs[:5]); await pg.close()
        await b.close()
asyncio.run(main())
