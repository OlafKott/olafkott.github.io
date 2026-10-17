# Moodle-Übersichten – Aufbau und Vorgehen bei „Aktualisiere alles“

Zwei Übersichten, jede eine einzige, eigenständige HTML-Datei (als iframe in Moodle):

| Datei | Für | Modelle |
|---|---|---|
| `AHR/fx991CW_Taschenrechner.html` | AHR (HAE) | nur fx-991DE CW |
| `HFH/Taschenrechner_CW_und_X.html` | FHR (HFH) | Modellwahl CW / X am Anfang |

(Die alte Übersicht `claude/index.html` mit Links auf die Einzelseiten gibt es weiterhin.)

## Aufbau beider Dateien
- Oben eine Kopfzeile: Zurück-Button, Titel, Umschalter Anleitung / Übung / Arbeitsblatt, allgemeines rwb-Logo (ohne ahr/fhr).
- Links der Rechner, nur einmal pro Modell im Markup (`<div class="calc">…`), immer an derselben Stelle.
- Rechts die Gliederung: je Thema Nummer + Titel und drei Buttons (Anleitung blau, Arbeitsblatt rot = PDF in neuem Tab, Übung grün). Keine Unterthemen, kein Zusatztext.
- Anleitung und Übung öffnen im selben Frame, mit Gleit-Übergang. Zurück zur Gliederung über den Button oben links oder die Browser-Zurück-Taste.
- HFH: Bei der Modellwahl sind beide Rechner gleich hoch. Der X gleitet ruhig, mit Verschieben und Skalieren, an seinen Platz. Der CW bewegt sich nicht.

## Wie die Inhalte eingebettet sind
Im `<script>` stehen Module, eines pro Anleitung und eines pro Übung:
- `GUIDES["<id>"]={title, css, make:function(__D){ … }}`. `make` enthält **wörtlich** die Engine der Schritt-für-Schritt-Anleitung (alles vor „//  Steuerung“) und die Steuerung (ab „//  Steuerung“). Nicht enthalten sind die Event-Handler-Zeilen, die `location.hash`-Zeile und der letzte Aufruf `render();`. `document.` ist durch `__D.` ersetzt, `window.scrollTo` durch `__D.scrollTo`. Rückgabe: `{ORDER,TRACKS,draw,fresh,run,render,press,next,back,KMAP,selectTrack,selectStep}`.
- `css` enthält nur Regeln, die gegenüber der Grundlagen-Anleitung desselben Modells neu oder anders sind. Jeder Selektor beginnt mit `[data-g="<id>"]`.
- `UEB["<id>"]={title, css, html, init:function(root){…}}`. Die Übung läuft im Shadow-DOM. `html` ist das `<div class="wrap">` der Übung. In `init` steht das Skript wörtlich, mit `document.` → `root.` und ohne `location.hash`. Im `css` wird `:root` zu `:host`, und die Regeln für `.top` und `.home` entfallen.
- IDs: CW = `grund, stat, funk, gl, wt`. X (nur HFH-Datei) = `dx_grund, dx_stat, …`.
- Themenliste: AHR `TOPICS=[{id,pdf,app}]`, HFH `THEMEN=[…]` + `PDFNAME{}` + `MODEL.cw/dx.app{}`. `app` ist die Nummer der App, die im Display markiert wird, wenn man über das Thema fährt.
  - CW: 0 Berechnung, 1 Statistik, 4 Wertetab., 5 Gleichung
  - X: 0 Berechnungen, 5 Statistik, 8 Wertetabelle, 9 Gleichungen
- PDF-Links: `https://olafkott.github.io/CAS/fx991/Arbeitsblatt_fx991_<Thema>.pdf` (CW) bzw. `Arbeitsblatt_fx991DEX_<Thema>.pdf` (X).

## „Aktualisiere alles“ – Ablauf
1. `project_info`: Neue Themen sind neue Ordner bzw. Dateien unter `fx991/<Thema>/` (CW) und `fx991DEX/<Thema>/` (X), jeweils `…_Schritt_fuer_Schritt.html`, `…_Uebung_….html`, `Arbeitsblatt_….html`.
2. Je neues Thema und Modell ein GUIDES- und ein UEB-Modul nach den Regeln oben bauen, Code wörtlich übernehmen. Gegen den Rechner prüfen: Weicht das Rechner-Markup der neuen Anleitung ab, etwa durch andere `data-k`-Tasten, muss das gemeinsame Rechner-Markup ergänzt werden.
3. Module in **beide** Dateien einfügen: in die AHR-Datei nur CW, in die HFH-Datei CW und X. Thema in die Themenliste aufnehmen. Modul-CSS zusätzlich in den Hauptstyle übernehmen.
4. Im Browser (Playwright) prüfen: keine JS-Fehler, jede Anleitung lässt sich durchklicken, die Rechnerposition bleibt in allen Ansichten gleich, die Übung zeigt Lösungen an. Danach beide Dateien im Projekt ersetzen.
5. Auch `claude/index.html` ergänzen (bisherige Übersicht).
