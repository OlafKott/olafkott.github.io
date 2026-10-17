import asyncio, sys
from playwright.async_api import async_playwright
F = 'file:///home/claude/work/out/fx991CW_Taschenrechner.html'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        errs = []
        for w, h, tag in [(1100, 900, 'd'), (400, 900, 'm')]:
            pg = await b.new_page(viewport={'width': w, 'height': h})
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
            await pg.goto(F); await pg.wait_for_timeout(700)
            box0 = await pg.locator('#calc').bounding_box()
            await pg.screenshot(path=f'out/s_{tag}_toc.png', full_page=(tag=='m'))
            res = [('toc', box0)]
            for t in ['grund', 'stat', 'funk', 'gl', 'wt']:
                await pg.evaluate("window.scrollTo(0,0)")
                await pg.click(f'.topic[data-t="{t}"] .act.tour'); await pg.wait_for_timeout(900)
                bx = await pg.locator('#calc').bounding_box(); res.append((t + ':g', bx))
                if tag == 'd': await pg.screenshot(path=f'out/s_{tag}_{t}_g.png')
                # ein paar richtige Tasten drücken
                for _ in range(3):
                    hit = pg.locator('#calc .k.hit')
                    if await hit.count(): await hit.first.click(); await pg.wait_for_timeout(150)
                await pg.click('#seg button[data-v="u"]'); await pg.wait_for_timeout(900)
                bx = await pg.locator('#calc').bounding_box(); res.append((t + ':u', bx))
                if tag == 'd': await pg.screenshot(path=f'out/s_{tag}_{t}_u.png')
                await pg.click('#toToc'); await pg.wait_for_timeout(900)
            for r in res: print(tag, r[0], round(r[1]['x']), round(r[1]['y']) if tag=='d' else '')
        await pg.goto(F + '#gl'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='out/s_m_gl.png', full_page=True)
        print('ERRORS', errs)
        await b.close()
asyncio.run(main())
