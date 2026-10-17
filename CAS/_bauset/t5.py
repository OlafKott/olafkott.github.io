import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); errs=[]
    for w in (1100,400):
      pg=await b.new_page(viewport={'width':w,'height':900}); pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file:///home/claude/work/out/fx991CW_Taschenrechner.html'); await pg.wait_for_timeout(700)
      await pg.screenshot(path=f'out/g_{w}.png',full_page=(w==400))
      await pg.goto('file:///home/claude/work/out/Taschenrechner_CW_und_X.html#dx'); await pg.wait_for_timeout(700)
      await pg.screenshot(path=f'out/g2_{w}.png')
    print(errs); await b.close()
asyncio.run(main())
