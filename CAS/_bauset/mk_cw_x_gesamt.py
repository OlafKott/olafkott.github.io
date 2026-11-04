#!/usr/bin/env python3
"""Bündelt die gemeinsamen Arbeitsblätter (CW/X) zu CAS/fx991/Taschenrechner_Fuehrerschein_Arbeitsblaetter_CW_X.pdf (mit Lesezeichen)."""
import os, re, html
from pypdf import PdfWriter, PdfReader
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'fx991') + '/'
from mk_cw_x import TOPICS
w = PdfWriter()
for i, (t, _, _) in enumerate(TOPICS, 1):
    s = open(D + f'Arbeitsblatt_fx991_CW_X_{t}.html', encoding='utf-8').read()
    titel = html.unescape(re.sub('<[^>]+>', '', re.search(r'<h1>(.*?)</h1>', s, re.S).group(1))).replace('Taschenrechner-Führerschein: ', '')
    st = len(w.pages)
    for p in PdfReader(D + f'Arbeitsblatt_fx991_CW_X_{t}.pdf').pages: w.add_page(p)
    w.add_outline_item(f'{i} {titel}', st)
w.add_metadata({'/Title': 'Taschenrechner-Führerschein – alle Arbeitsblätter (fx-991DE CW / X)'}); w.page_mode = '/UseOutlines'
out = D + 'Taschenrechner_Fuehrerschein_Arbeitsblaetter_CW_X.pdf'
w.write(out); print(out, len(w.pages), 'Seiten')
