#!/usr/bin/env python3
"""Bündelt alle Arbeitsblatt-PDFs in Gliederungsreihenfolge zu CAS/CAS_Fuehrerschein_Arbeitsblaetter.pdf (mit Lesezeichen)."""
import re, ast, html, os, sys
from pypdf import PdfWriter, PdfReader
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'
src = open(R + '_build/build.py').read()
T = ast.literal_eval(re.search(r'TOPICS = (\[.*?\n\])', src, re.S).group(1))
B = ast.literal_eval(re.search(r'BLOCKS = (\[.*?\n\])', src, re.S).group(1))
BO = ast.literal_eval(re.search(r'BLOCK_OF = (\{.*?\n\})', src, re.S).group(1))
cl = lambda s: re.sub('<[^>]+>', '', html.unescape(s)).replace('­', '').replace('‑', '-')
seq = [(None, [t for t in T if BO[t[0]] is None])] + [(f'{i+1} {cl(n)}', [t for t in T if BO[t[0]] == b]) for i, (b, n) in enumerate(B)]
w = PdfWriter()
for bi, (blk, ts) in enumerate(seq):
    par = w.add_outline_item(blk, len(w.pages)) if blk else None
    for j, t in enumerate(ts):
        nr = '0' if blk is None else f'{bi}.{j+1}'
        st = len(w.pages); [w.add_page(p) for p in PdfReader(R + t[1] + '/' + t[6]).pages]
        w.add_outline_item(f'{nr} {cl(t[4])}', st, parent=par)
w.add_metadata({'/Title': 'CAS-Führerschein – alle Arbeitsblätter'}); w.page_mode = '/UseOutlines'
w.write(R + 'CAS_Fuehrerschein_Arbeitsblaetter.pdf'); print(len(w.pages), 'Seiten')
