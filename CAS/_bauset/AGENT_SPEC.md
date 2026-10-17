# Aufgabe: Eine CW-Anleitung + Übung als JS-Modul extrahieren

Wir bauen EINE Moodle-Seite, die alle "Schritt für Schritt"-Anleitungen und Übungen für den CASIO fx-991DE CW enthält.
Der Rechner (HTML-Markup + Basis-CSS + Steuerung) existiert dort nur EINMAL und ist identisch mit
`fx991/fx991_Grundlagen_Schritt_fuer_Schritt.html`. Jede Anleitung liefert nur ihre "Engine" (Zustandsmaschine, draw, TRACKS).

Lies die Projektdateien mit dem Tool `Projects` (method `project_read`). Schreibe Dateien mit `Write`.
Kopiere Code **wörtlich** (verbatim) – nichts umformulieren, nichts kürzen, keine Inhalte erfinden.

## Datei 1: `/home/claude/work/mods/g_<ID>.js`

```js
GUIDES["<ID>"]={
 title:"<Thema aus der h1, ohne 'Schritt für Schritt:' / 'Taschenrechner Schritt für Schritt:'>",
 css:String.raw`<zusätzliche CSS-Regeln, s. u.>`,
 make:function(){
  // (A) WÖRTLICH: der komplette Inhalt des <script>-Blocks der Anleitung vom Anfang bis VOR den Abschnitt
  //     "//  Steuerung" (also alle Engine-Teile: Entry/EX/AP/fresh/step/run/draw/ICON/TRACKS ... ).
  // (B) WÖRTLICH aus dem Steuerungs-Abschnitt kopiert: die Zeilen  const ORDER=[...];  und  const BX=...;  und  const LBL={...};
  return {fresh:(typeof fresh!=='undefined'?fresh:null), run, draw, TRACKS, ORDER, LBL, zielAlways:<BOOL>};
 }
};
```
- `zielAlways`: In `render()` der Anleitung steht entweder `draw(stateAt(tr,st,pos), S.z)` → `true`, oder `draw(stateAt(tr,st,pos), pos<S.k.length?S.z:null)` → `false`.
- `css`: Vergleiche den `<style>`-Block der Anleitung mit dem von `fx991/fx991_Grundlagen_Schritt_fuer_Schritt.html`.
  Übernimm NUR Regeln, die in Grundlagen fehlen oder dort anders lauten. Stelle jedem Selektor `[data-g="<ID>"] ` voran
  (bei Selektorlisten mit Komma: jedem Teil-Selektor; bei @keyframes nichts voranstellen; bei @media die inneren Selektoren).
  Wenn es keine solchen Regeln gibt: `css:String.raw```.
- In String.raw-Literalen darf kein Backtick und keine Folge `${` vorkommen. Falls doch: melde es.

## Datei 2: `/home/claude/work/mods/u_<ID>.js`  (die Übung)

```js
UEB["<ID>"]={
 title:"<Thema der Übung>",
 css:String.raw`<kompletter <style>-Inhalt der Übung, angepasst, s. u.>`,
 html:String.raw`<das Element <div class="wrap">…</div> der Übung, vollständig, WÖRTLICH>`,
 init:function(root){
   // WÖRTLICH der komplette <script>-Inhalt der Übung, mit genau diesen Anpassungen:
   //  - const $=id=>document.getElementById(id)   →   const $=id=>root.getElementById(id)
   //  - jedes übrige document.getElementById(  →  root.getElementById(
   //  - jedes document.querySelector / querySelectorAll  →  root.querySelector / root.querySelectorAll
   //  - Zeilen, die location.hash auswerten, entfernen (die Zeile mit `const hh=(location.hash...` o. ä.)
   //  - sonst nichts ändern.
 }
};
```
`root` ist ein ShadowRoot. CSS-Anpassungen für `css`:
- `:root{` → `:host{`
- `body{ ... }` → `:host{ display:block; ... }` (Eigenschaften übernehmen; `margin:0` und `background` weglassen)
- Regeln für die Kopfzeile `.top`, `.top .in`, `.top h1`, `.top h1 small`, `.top img` und den Link `.home` (Übersicht-Button) weglassen – die Kopfzeile entfällt.
- `.wrap{ max-width:...; margin:...; padding:... }` → `.wrap{ max-width:none; margin:0; padding:0; }`
- alles andere wörtlich.

## Prüfen
Führe danach aus (muss ohne Fehler laufen und die Track-Namen ausgeben):
```
cd /home/claude/work && node -e 'global.GUIDES={};global.UEB={};require("./mods/g_<ID>.js");require("./mods/u_<ID>.js");const g=GUIDES["<ID>"].make();console.log(g.ORDER, Object.keys(g.TRACKS).map(k=>g.TRACKS[k].name), g.zielAlways, typeof UEB["<ID>"].init, UEB["<ID>"].html.length)'
```

## Bericht (deine Schlussnachricht, kurz)
1. Ausgabe des Prüfbefehls.
2. Unterschiede im **Rechner-Markup** (`<div class="calc">…`) gegenüber Grundlagen (z. B. andere data-k-Werte, andere Tasten) – oder „keine“.
3. Unterschiede in der **Steuerung** (alles ab „//  Steuerung“ bis Skriptende) gegenüber Grundlagen außer ORDER/LBL/zielAlways – genau benennen (z. B. andere hint()-Logik, andere KMAP, zusätzliche Funktionen) – oder „keine“.
4. Ob die Engine Bezeichner aus dem Steuerungsteil benutzt (z. B. `pos`, `$`, `tr`) – oder „keine“.
5. Welche App des HOME-Menüs die Anleitung hauptsächlich nutzt (Name genau wie in APPS, z. B. "Statistik").
6. Den Text des Übersicht-Links/Kopfzeile der Übung (h1 + small) und der Anleitung (h1 + small), wörtlich.
