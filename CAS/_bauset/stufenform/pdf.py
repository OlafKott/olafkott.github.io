import sys, asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        for f in sys.argv[1:]:
            await pg.goto('file://'+f); await pg.wait_for_timeout(200)
            await pg.pdf(path=f[:-5]+'.pdf', format='A4', print_background=True, prefer_css_page_size=True)
            await pg.set_viewport_size({'width':900,'height':1300})
            await pg.screenshot(path=f[:-5]+'.png', full_page=True)
        await b.close()
asyncio.run(main())
