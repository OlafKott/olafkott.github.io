import sys
def mk(src, dst, title_old, title_new, h1_old, h1_new, subs, bx):
    s=open(src).read()
    def rep(a,b,n=1):
        nonlocal s
        assert s.count(a)==n,(a[:80],s.count(a)); s=s.replace(a,b)
    rep(f'<title>{title_old}</title>',f'<title>{title_new}</title>')
    rep('<body class="">','<body class="lsg">')
    rep(f'<h1>{h1_old}</h1>',f'<h1>{h1_new}</h1>')
    rep('\n<div class="namebar"><span>Name:</span><span class="d">Datum:</span></div>\n','\n\n')
    for a,b in subs: rep(a,b)
    parts=s.split('<span class="bx"></span>'); assert len(parts)==len(bx)+1,len(parts)
    s=parts[0]+''.join(f'<span class="bx">{v}</span>'+p for v,p in zip(bx,parts[1:]))
    open(dst,'w').write(s)
