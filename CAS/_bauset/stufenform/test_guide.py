import sys, json, asyncio
from playwright.async_api import async_playwright
files = sys.argv[1:]
JS = r'''() => {
 const out=[];
 for(const t of ORDER){ const T=TRACKS[t];
   for(let s=0;s<T.steps.length;s++){ const S=T.steps[s];
     const st=stateAt(t,s,S.k.length);
     const missing=S.k.filter(k=>!document.querySelector(`.k[data-k="${CSS.escape(k)}"]`));
     let ans=null; if(st.mode==='res') ans=st.Ans.map(r=>r.map(v=>v.q===1?String(v.p):v.p+'/'+v.q).join(' ')).join(' | ');
     out.push({t,s,title:S.t,mode:st.mode,err:st.err,ans,missing});
   } }
 return out; }'''
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':1100,'height':900})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        for f in files:
            await pg.goto('file://'+f)
            res = await pg.evaluate(JS)
            print('==', f.split('/')[-1], 'errors:', errs)
            for r in res:
                flag = '  MISSING '+str(r['missing']) if r['missing'] else ''
                print(f"{r['t']}{r['s']:>2} {r['mode']:6} {r['err'] or ''} {r['ans'] or ''} :: {r['title']}{flag}")
        await b.close()
asyncio.run(main())
