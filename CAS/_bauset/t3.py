import asyncio
from playwright.async_api import async_playwright
F='file:///home/claude/work/out/Taschenrechner_CW_und_X.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); errs=[]
    for w in (1100,400):
      pg=await b.new_page(viewport={'width':w,'height':900}); pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto(F); await pg.wait_for_timeout(500)
      print(w,'pick', [await pg.locator(f'#w_{m} .calc').bounding_box() for m in ('cw','dx')])
      await pg.screenshot(path=f'out/q_{w}_pick.png')
      await pg.click('#w_dx'); await pg.wait_for_timeout(260+330)
      await pg.screenshot(path=f'out/q_{w}_mid.png')
      await pg.wait_for_timeout(900)
      print(w,'toc', await pg.locator('#w_dx .calc').bounding_box())
      await pg.click('.topic[data-t="stat"] .act.tour'); await pg.wait_for_timeout(900)
      print(w,'guide', await pg.locator('#w_dx .calc').bounding_box())
      await pg.click('#toToc'); await pg.wait_for_timeout(900); await pg.click('#toToc'); await pg.wait_for_timeout(1300)
      print(w,'pick again', [await pg.locator(f'#w_{m} .calc').bounding_box() for m in ('cw','dx')])
    print('ERR',errs); await b.close()
asyncio.run(main())
