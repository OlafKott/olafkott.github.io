import asyncio
from playwright.async_api import async_playwright
F='file:///home/claude/work/out/Taschenrechner_CW_und_X.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); errs=[]
    for w,tag in [(1100,'d'),(400,'m')]:
      pg=await b.new_page(viewport={'width':w,'height':900})
      pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
      await pg.goto(F); await pg.wait_for_timeout(600); await pg.screenshot(path=f'out/p_{tag}_pick.png')
      for m in ['cw','dx']:
        await pg.click(f'#w_{m}'); await pg.wait_for_timeout(1000)
        bx0=await pg.locator(f'#w_{m} .calc').bounding_box()
        if tag=='d': await pg.screenshot(path=f'out/p_{tag}_{m}_toc.png')
        res=[('toc',bx0)]
        for t in ['grund','stat','funk','gl','wt']:
          await pg.evaluate('window.scrollTo(0,0)')
          await pg.click(f'.topic[data-t="{t}"] .act.tour'); await pg.wait_for_timeout(800)
          for _ in range(3):
            h=pg.locator(f'#w_{m} .k.hit')
            if await h.count(): await h.first.click(); await pg.wait_for_timeout(200)
          res.append((t+':g',await pg.locator(f'#w_{m} .calc').bounding_box()))
          if tag=='d': await pg.screenshot(path=f'out/p_{tag}_{m}_{t}_g.png')
          await pg.click('#seg button[data-v="u"]'); await pg.wait_for_timeout(800)
          res.append((t+':u',await pg.locator(f'#w_{m} .calc').bounding_box()))
          if tag=='d' and t=='stat': await pg.screenshot(path=f'out/p_{tag}_{m}_{t}_u.png')
          await pg.click('#toToc'); await pg.wait_for_timeout(800)
        print(tag,m,sorted(set((round(r[1]['x']),round(r[1]['y'])) for r in res if tag=='d')) or 'mobile ok')
        await pg.click('#toToc'); await pg.wait_for_timeout(900)
        print(tag,'back to pick:',await pg.get_attribute('#app','data-mode'))
    print('ERR',errs); await b.close()
asyncio.run(main())
