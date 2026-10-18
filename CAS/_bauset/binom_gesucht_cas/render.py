import asyncio,sys
from playwright.async_api import async_playwright
async def main(src,pdf):
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page()
    await pg.goto('file://'+src); await pg.wait_for_timeout(300)
    info=await pg.evaluate("""()=>[...document.querySelectorAll('.page')].map(pg=>{const c=pg.querySelector('.page-content'),f=pg.querySelector('.page-footer');return {h:pg.scrollHeight, content:c.scrollHeight, foot:f.getBoundingClientRect().bottom-pg.getBoundingClientRect().top}})""")
    await pg.emulate_media(media='print')
    info2=await pg.evaluate("""()=>[...document.querySelectorAll('.page')].map(pg=>{const c=pg.querySelector('.page-content');const last=c.lastElementChild;return {pageH:pg.clientHeight, sh:pg.scrollHeight, contentBottom:(last.getBoundingClientRect().bottom-pg.getBoundingClientRect().top)}})""")
    print(info2)
    await pg.pdf(path=pdf,format='A4',print_background=True,prefer_css_page_size=True)
    await b.close()
asyncio.run(main(sys.argv[1],sys.argv[2]))
