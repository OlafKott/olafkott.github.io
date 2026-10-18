#!/usr/bin/env python3
"""Erzeugt die Arbeitsblatt-PDFs (A4, Chromium-Druck) neben den HTML-Dateien."""
import sys, os, glob
from playwright.sync_api import sync_playwright
root = os.path.abspath(sys.argv[1]); only = sys.argv[2:]
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page()
    for f in sorted(glob.glob(root + '/*/Arbeitsblatt_CAS_*.html')):
        if only and f.split('/')[-2] not in only: continue
        pg.goto('file://' + f); pg.wait_for_load_state('networkidle')
        pg.pdf(path=f[:-5] + '.pdf', prefer_css_page_size=True, print_background=True)
        print('pdf', f[:-5] + '.pdf')
    b.close()
