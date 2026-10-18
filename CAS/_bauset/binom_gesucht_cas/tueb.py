import asyncio
from playwright.async_api import async_playwright
F='file:///home/claude/olafkott.github.io/CAS/Binomial_Gesucht/CAS_Uebung_Binomial_Gesucht.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':900,'height':900})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(F)
    res={}
    for m in ['n','k','p']:
      await pg.click(f'#tabs button[data-m="{m}"]')
      cnt=0
      for i in range(150):
        await pg.click('#neu')
        A=await pg.evaluate("({s:A.soll,r:A.rel,t:A.typ})")
        v=str(A['s']) if m!='p' else f"{A['s']:.3f}".replace('.',',')
        await pg.fill('#i0',v)
        if m=='p': await pg.select_option('#rel',A['r'])
        await pg.click('#pruefen')
        ok=await pg.evaluate("document.getElementById('z0').classList.contains('ok')")
        cnt+=ok
      res[m]=cnt
      await pg.click('#zeigen')
      await pg.screenshot(path=f'u_{m}.png',full_page=True)
    print(res,errs)
    await b.close()
asyncio.run(main())
