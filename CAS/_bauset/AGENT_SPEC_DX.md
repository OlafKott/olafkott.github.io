# Aufgabe: Eine fx-991DE X-Anleitung + Übung als JS-Modul extrahieren

Wir bauen EINE Moodle-Seite, die alle "Schritt für Schritt"-Anleitungen und Übungen enthält. Der Rechner
(HTML-Markup + Basis-CSS) existiert dort nur EINMAL. Jede Anleitung liefert ihre Engine UND ihre Steuerung als Modul.
Modell hier: **CASIO fx-991DE X** (weiß). Referenzdatei für Vergleiche: `fx991DEX/fx991DEX_Grundlagen_Schritt_fuer_Schritt.html`.

Lies Projektdateien mit dem Tool `Projects` (method `project_read`). Schreibe Dateien mit `Write`.
Kopiere Code **wörtlich** – nichts umformulieren, kürzen oder erfinden.
Ein fertiges Beispiel (für das andere Modell) liegt unter `/home/claude/work/mods/g_stat.js` und `/home/claude/work/mods/u_stat.js` – schau es dir an, so soll das Ergebnis aufgebaut sein.

## Datei 1: `/home/claude/work/mods/g_<ID>.js`

```js
GUIDES["<ID>"]={
 title:"<Thema aus der h1, ohne 'Schritt für Schritt:' / 'Taschenrechner Schritt für Schritt:'>",
 css:String.raw`<zusätzliche CSS-Regeln, s. u.>`,
 make:function(){
  // (A) WÖRTLICH: der komplette Inhalt des <script>-Blocks vom Anfang bis VOR den Abschnitt "//  Steuerung" (Engine).
  // (B) WÖRTLICH: der komplette Steuerungs-Abschnitt (ab "//  Steuerung" bis Skriptende), mit genau diesen Ausnahmen:
  //     WEGLASSEN: alle Zeilen, die Event-Handler binden (document.querySelectorAll('.calc .k').forEach(...),
  //     $('next').onclick, $('back').onclick, $('tabs').onclick, $('prog').onclick, document.addEventListener('keydown',...)),
  //     die location.hash-Zeile(n) und den abschließenden Aufruf render();   KMAP bleibt drin.
  return {
    ORDER, TRACKS, draw, fresh:(typeof fresh!=='undefined'?fresh:null), run,
    render, press, next, back, KMAP,
    selectTrack:function(t){ if(TRACKS[t]){ tr=t; st=0; pos=0; render(); } },
    selectStep:function(i){ st=+i; pos=0; render(); }
  };
 }
};
```
(Falls die alten tabs/prog-onclick-Handler anders aussahen, deren Logik übernehmen.)
- `css`: Vergleiche den `<style>`-Block mit dem der Referenzdatei. Übernimm NUR Regeln, die dort fehlen oder anders lauten.
  Stelle jedem Selektor `[data-g="<ID>"] ` voran (bei Kommalisten jedem Teil; @keyframes unverändert; bei @media die inneren Selektoren).
  Bei der Referenzdatei selbst: `css:String.raw```.
- In String.raw-Literalen darf kein Backtick und kein `${` vorkommen.

## Datei 2: `/home/claude/work/mods/u_<ID>.js` (die Übung)

```js
UEB["<ID>"]={
 title:"<Thema der Übung>",
 css:String.raw`<kompletter <style>-Inhalt der Übung, angepasst>`,
 html:String.raw`<das Element <div class="wrap">…</div> der Übung, vollständig, WÖRTLICH>`,
 init:function(root){
   // WÖRTLICH der komplette <script>-Inhalt der Übung, mit genau diesen Anpassungen:
   //  - const $=id=>document.getElementById(id)  →  const $=id=>root.getElementById(id)
   //  - jedes übrige document.getElementById( → root.getElementById(
   //  - document.querySelector / querySelectorAll → root.querySelector / root.querySelectorAll
   //  - Zeilen, die location.hash auswerten, entfernen
 }
};
```
`root` ist ein ShadowRoot. CSS-Anpassungen: `:root{`→`:host{`; `body{…}` → `:host{ display:block; …}` (ohne margin/background);
Regeln für `.top`, `.top .in`, `.top h1`, `.top h1 small`, `.top img` und den Übersicht-Link `.home` weglassen;
`.wrap{…}` → `.wrap{ max-width:none; margin:0; padding:0; }`; alles andere wörtlich.

## Prüfen
```
cd /home/claude/work && node -e 'global.GUIDES={};global.UEB={};require("./mods/g_<ID>.js");require("./mods/u_<ID>.js");const g=GUIDES["<ID>"].make();console.log(g.ORDER, Object.keys(g.TRACKS).map(k=>g.TRACKS[k].name), typeof g.render, typeof UEB["<ID>"].init)'
```

## Bericht (kurz)
1. Prüfausgabe.
2. Unterschiede im Rechner-Markup (`<div class="calc">…</div>`) gegenüber der Referenzdatei – oder „keine“.
3. Alle Element-IDs, die die Steuerung per `$('…')` anspricht.
4. Welche App des Menüs die Anleitung hauptsächlich nutzt, und wie der Menü-Zustand in der Engine heißt (z. B. `S.mode==='menu'` mit `S.sel`), plus die Liste der Menüeinträge (Array-Name und Inhalt).
