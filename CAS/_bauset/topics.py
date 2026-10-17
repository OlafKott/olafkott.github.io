# Zentrale Themenliste für beide Übersichten. Reihenfolge = Reihenfolge in der Gliederung.
# id: Modul-ID (CW); X-Module heißen 'dx_'+id
# pdf: Namensteil der Arbeitsblatt-PDF (Arbeitsblatt_fx991_<pdf>.pdf bzw. Arbeitsblatt_fx991DEX_<pdf>.pdf)
# app_cw / app_dx: Index der App, die im Startbildschirm markiert wird
#   CW: 0 Berechnung, 1 Statistik, 2 Verteilung, 3 Tabellenk., 4 Wertetab., 5 Gleichung
#   X : 0 Berechnungen, 5 Statistik, 6 Verteilungen, 7 Tabellenkalk., 8 Wertetabelle, 9 Gleichungen
TOPICS = [
  dict(id='grund', pdf='Grundlagen',     app_cw=0, app_dx=0),
  dict(id='stat',  pdf='Lage_Streuung',  app_cw=1, app_dx=5),
  dict(id='funk',  pdf='Funktionswerte', app_cw=0, app_dx=0),
  dict(id='gl',    pdf='Gleichungen',    app_cw=5, app_dx=9),
  dict(id='wt',    pdf='Wertetabelle',   app_cw=4, app_dx=8),
  dict(id='abl',   pdf='Ableitung',      app_cw=0, app_dx=0),
  dict(id='int',   pdf='Integrale',      app_cw=0, app_dx=0),
  dict(id='lgs',   pdf='LGS',            app_cw=5, app_dx=9),
]
# Arbeitsblätter, die es (noch) nicht gibt: {'cw':[ids], 'dx':[ids]}
NOPDF = {'cw': [], 'dx': ['lgs']}
