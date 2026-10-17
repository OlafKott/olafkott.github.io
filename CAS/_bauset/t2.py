import asyncio
from playwright.async_api import async_playwright
F='file:///home/claude/work/out/fx991CW_AHR_Gesundheit_Soziales.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1100,'height':900}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(F+'#stat-uebung'); await pg.wait_for_timeout(500)
    for t in ['grund','stat','funk','gl','wt']:
      await pg.goto(F+'#'+t+'-uebung'); await pg.wait_for_timeout(500)
      host=pg.locator(f'.uhost:not([hidden])')
      await host.locator('button:has-text("Lösung anzeigen")').first.click()
      await host.locator('button:has-text("Prüfen")').first.click(); await pg.wait_for_timeout(200)
      txt=await host.locator('#score').inner_text()
      print(t, repr(txt[:70]))
    # Grundlagen Anleitung komplett per Tastatur-Hinweis durchklicken (Track 1)
    await pg.goto(F+'#grund'); await pg.wait_for_timeout(600)
    for i in range(40):
      h=pg.locator('#calc .k.hit')
      if await h.count(): await h.first.click(); await pg.wait_for_timeout(120)
      else: await pg.wait_for_timeout(1000)
    print('nr:', await pg.locator('.gpanel:not([hidden]) #nr').inner_text())
    await pg.go_back(); await pg.wait_for_timeout(800)
    print('after back mode:', await pg.get_attribute('#app','data-mode'))
    print('ERR',errs); await b.close()
asyncio.run(main())
