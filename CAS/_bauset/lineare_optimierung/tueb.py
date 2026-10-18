from playwright.sync_api import sync_playwright
import json
F='file:///home/claude/olafkott.github.io/CAS/Lineare_Optimierung/CAS_Uebung_Lineare_Optimierung.html'
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':900,'height':1300})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(F)
    # Generator-Fuzztest: eindeutiges Maximum, ganzzahlige Ecken, Ecken = tatsächliche Ecken des zulässigen Bereichs
    res=pg.evaluate('''()=>{ let bad=[], n=0, nulls=0, optpos=[0,0,0,0,0];
      for(let i=0;i<2000;i++){ const A=genLP(); if(!A){nulls++;continue;} n++;
        // Brute force: Maximum über alle ganzzahligen und Schnittpunkte des Bereichs (LP-Ecken via alle Geradenpaare inkl. Achsen)
        const lines=A.L.map(l=>[l.a,l.b,l.c]).concat([[1,0,0],[0,1,0]]); // x=0 bzw y=0 als Gleichung
        const feas=(x,y)=>x>=-1e-9&&y>=-1e-9&&A.L.every(l=>l.a*x+l.b*y<=l.c+1e-9);
        const V=[];
        for(let a=0;a<lines.length;a++) for(let c=a+1;c<lines.length;c++){ const [a1,b1,c1]=lines[a],[a2,b2,c2]=lines[c]; const d=a1*b2-a2*b1; if(Math.abs(d)<1e-12) continue;
          const x=(c1*b2-c2*b1)/d, y=(a1*c2-a2*c1)/d; if(feas(x,y)) V.push([x,y]); }
        const uniq=[]; V.forEach(v=>{ if(!uniq.some(u=>Math.abs(u[0]-v[0])<1e-9&&Math.abs(u[1]-v[1])<1e-9)) uniq.push(v); });
        if(uniq.length!==5) bad.push(['ecken',uniq.length]);
        if(!uniq.every(u=>A.ECK.some(e=>Math.abs(e[0]-u[0])<1e-9&&Math.abs(e[1]-u[1])<1e-9))) bad.push('eckmismatch');
        const Z=uniq.map(u=>A.p*u[0]+A.q*u[1]).sort((a,b)=>b-a); if(!(Z[0]-Z[1]>1e-9)) bad.push('nicht eindeutig');
        if(Math.abs(Z[0]-A.Z[A.opt])>1e-9) bad.push('opt falsch');
        optpos[A.opt]++;
      } return {n,nulls,bad:bad.slice(0,5),nbad:bad.length,optpos}; }''')
    print(res)
    for mode in ['ohne','mit']:
        pg.evaluate(f"document.querySelector('#tabs [data-m={mode}]').click()")
        A=pg.evaluate("({x:A.ECK[A.opt][0],y:A.ECK[A.opt][1],z:A.Z[A.opt]})")
        pg.fill('#i_x',str(A['x']+1)); pg.fill('#i_y',str(A['y'])); pg.fill('#i_z',str(A['z'])); pg.click('#pruefen')
        print(mode, pg.inner_text('#score'))
        pg.fill('#i_x',str(A['x'])); pg.click('#pruefen'); print(mode, pg.inner_text('#score'))
        pg.screenshot(path=f'ueb_{mode}.png',full_page=True)
    print('errors',errs)
    b.close()
