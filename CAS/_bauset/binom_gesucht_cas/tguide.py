import asyncio,sys
from playwright.async_api import async_playwright
F='file:///home/claude/olafkott.github.io/CAS/Binomial_Gesucht/CAS_Binomial_Gesucht_Schritt_fuer_Schritt.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1000,'height':900})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
    await pg.goto(F); await pg.wait_for_timeout(300)
    shots=[]
    for t in ['n','k','p']:
      await pg.evaluate(f"tr='{t}';st=0;pos=0;render()")
      n=await pg.evaluate("TRACKS[tr].steps.length")
      for s in range(n):
        await pg.evaluate(f"st={s};pos=0;render()")
        keys=await pg.evaluate("TRACKS[tr].steps[st].k")
        for k in keys:
          if k=='play': await pg.evaluate("pos=TRACKS[tr].steps[st].k.length;render()"); break
          await pg.evaluate(f"lock=false;press({k!r})")
          await pg.wait_for_timeout(5)
        await pg.evaluate("lock=false")
        await pg.evaluate(f"st={s};pos=TRACKS[tr].steps[st].k.length;render()")
        fn=f'g_{t}{s}.png'; await pg.locator('main').screenshot(path=fn); shots.append(fn)
    print('errors',errs[:5]); print(shots)
    await b.close()
asyncio.run(main())
