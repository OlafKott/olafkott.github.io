from playwright.sync_api import sync_playwright
import sys
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.emulate_media(media='print')
    for f in sys.argv[1:]:
        pg.goto('file://'+f)
        print(f.split('/')[-1], pg.evaluate("(()=>{const c=document.querySelector('.page-content'),pgz=document.querySelector('.page'),ft=document.querySelector('.page-footer');return {content:c.scrollHeight, page:pgz.clientHeight, footerBottom:ft.getBoundingClientRect().bottom, pageBottom:pgz.getBoundingClientRect().bottom}})()"))
    b.close()
