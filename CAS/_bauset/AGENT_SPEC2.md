# Nachtrag: Steuerung mit ins Modul

Weil sich die Steuerungen unterscheiden, übernimmt jedes Anleitungs-Modul jetzt seine **eigene Steuerung**.
Ändere `/home/claude/work/mods/g_<ID>.js` so:

In `make:function(){ ... }` nach dem Engine-Teil (A) – statt nur ORDER/BX/LBL – den **kompletten Steuerungs-Abschnitt WÖRTLICH**
(ab „//  Steuerung“ bis Skriptende) einfügen, mit genau diesen Ausnahmen:
- WEGLASSEN: alle Zeilen, die Event-Handler binden
  (`document.querySelectorAll('.calc .k').forEach(...)`, `$('next').onclick=...`, `$('back').onclick`, `$('tabs').onclick=...`,
  `$('prog').onclick=...`, `document.addEventListener('keydown', ...)`), die `location.hash`-Zeile(n) und den abschließenden Aufruf `render();`.
- `KMAP` bleibt drin (wird zurückgegeben).
- Alles andere (stateAt, render, hint, press, advance, next, back, chip, lbl, LBL, BX, done, lock, Zusatzhinweise, Wartezeiten …) wörtlich.

Dann am Ende von make():
```js
return {
  ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
  render, press, next, back, KMAP,
  selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },   // = Logik des alten tabs-onclick
  selectStep:function(i){ st=+i; pos=0; render(); }                          // = Logik des alten prog-onclick
};
```
(Falls die alten onclick-Handler im Original anders aussahen, deren Logik übernehmen.)
Das Feld `zielAlways` im Return entfällt. `title` und `css` bleiben.

Prüfen (muss laufen, ohne DOM wird render nicht aufgerufen):
```
cd /home/claude/work && node -e 'global.GUIDES={};require("./mods/g_<ID>.js");const g=GUIDES["<ID>"].make();console.log(g.ORDER, typeof g.render, typeof g.press, typeof g.selectTrack, Object.keys(g.KMAP).length)'
```
Antworte kurz: Prüfausgabe + ob du etwas außer den genannten Ausnahmen weglassen/ändern musstest.
