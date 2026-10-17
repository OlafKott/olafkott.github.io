import asyncio
from playwright.async_api import async_playwright
F='file:///home/claude/work/out/Taschenrechner_CW_und_X.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1100,'height':900})
    await pg.goto(F); await pg.wait_for_timeout(500)
    await pg.click('#w_dx')
    for i,t in enumerate([150,250,250,250]):
      await pg.wait_for_timeout(t); await pg.screenshot(path=f'out/r{i}.png')
    await b.close()
asyncio.run(main())
