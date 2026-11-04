# Moodle-Übersichten – Aufbau und Vorgehen bei „Aktualisiere alles“

Zwei Übersichten, jede eine einzige, eigenständige HTML-Datei (als iframe in Moodle). **Sie liegen nur auf GitHub, nicht mehr im Projekt** (Speicherplatz):

| Datei auf GitHub | Für | Modelle |
|---|---|---|
| `CAS/AHR/fx991CW_Taschenrechner.html` | AHR (HAE) | nur fx-991DE CW |
| `CAS/HFH/Taschenrechner_CW_und_X.html` | FHR (HFH) | Modellwahl CW / X am Anfang |

Das Bauset (Shell, Module, Skripte, Tests) liegt in `CAS/_bauset/` im Repo `OlafKott/olafkott.github.io`. Zum Arbeiten nach `/home/claude/work` kopieren.

(Die alte Übersicht `claude/index.html` mit Links auf die Einzelseiten gibt es weiterhin, auf GitHub als `CAS/fx991/index.html`.)

## Aufbau beider Dateien
- Oben eine Kopfzeile: Zurück-Button, Titel, Umschalter Anleitung / Übung / Arbeitsblatt, allgemeines rwb-Logo (ohne ahr/fhr).
- Links der Rechner, nur einmal pro Modell im Markup (`<div class="calc">…`), immer an derselben Stelle.
- Rechts die Gliederung: je Thema Nummer + Titel und drei Buttons (Anleitung blau, Arbeitsblatt rot = PDF in neuem Tab, Übung grün). Keine Unterthemen, kein Zusatztext. Fehlt ein Teil (z. B. Übung), entfällt sein Button.
- **Buttonzeile der Anleitung (wie beim CAS-Führerschein):** `◀ Zurück`, `Überspringen ⏭`, `Weiter ▶` – immer in einer Zeile. **Weiter** drückt die gerade leuchtende Taste (ein Klick = ein Tastendruck; am Schrittende = nächster Schritt), **Überspringen** springt direkt zum nächsten Schritt. Die Zeile bleibt in jedem Schritt auf derselben Höhe: `fixHeight()` misst beim Öffnen einer Anleitung alle Schritte (Flag `measuring`, Panel-Höhe = höchster Schritt, mindestens Rechnerhöhe) und setzt `min-height` am Panel; die Buttons stehen per `margin-top:auto` unten.
- Anleitung und Übung öffnen im selben Frame, mit Gleit-Übergang. Zurück zur Gliederung über den Button oben links oder die Browser-Zurück-Taste.
- HFH: Bei der Modellwahl sind beide Rechner gleich hoch. Der X gleitet ruhig, mit Verschieben und Skalieren, an seinen Platz. Der CW bewegt sich nicht. Die Größenanpassung läuft über `transform: scale` (nicht `zoom`, das bricht in iOS Safari).
- **Kleine Bildschirme (Handy):** kein eigenes Handy-Layout (vom Nutzer ausdrücklich abgelehnt). Stattdessen wird die ganze Ansicht im PC-Layout verkleinert (`fit()` in beiden Shells: `.shell` bekommt Breite ≥ 760 px und `transform: scale`), sodass alles auf den Bildschirm passt; die Schüler zoomen mit zwei Fingern hinein. Greift bei Breite < 760 px oder Höhe < 600 px (dann so, dass ~800 px Layouthöhe passen). Die früheren `@media`-Umbrüche (720/620 px) sind entfernt. Beim FLIP-Flug des X-Rechners werden die Verschiebungen durch `SCALE` geteilt.

## Wie die Inhalte eingebettet sind
Im `<script>` stehen Module, eines pro Anleitung und eines pro Übung:
- `GUIDES["<id>"]={title, css, make:function(__D){ … }}`. `make` enthält **wörtlich** die Engine der Schritt-für-Schritt-Anleitung (alles vor „//  Steuerung“) und die Steuerung (ab „//  Steuerung“). Nicht enthalten sind die Event-Handler-Zeilen, die `location.hash`-Zeile und der letzte Aufruf `render();`. `document.` ist durch `__D.` ersetzt, `window.scrollTo` durch `__D.scrollTo`. Rückgabe: `{ORDER,TRACKS,draw,fresh,run,render,press,next,back,KMAP,selectTrack,selectStep,fwd,weiter,bwd,goto,snap,restore}`. `mkmod.py` passt dabei `render()` an: `next` heißt immer „Weiter ▶“ (Klasse `go`), `skip` wird am Ende der letzten Spur gesperrt.
- `css` enthält nur Regeln, die gegenüber der Grundlagen-Anleitung desselben Modells neu oder anders sind. Jeder Selektor beginnt mit `[data-g="<id>"]`.
- `UEB["<id>"]={title, css, html, init:function(root){…}}`. Die Übung läuft im Shadow-DOM. `html` ist das `<div class="wrap">` der Übung. In `init` steht das Skript wörtlich, mit `document.` → `root.` und ohne `location.hash`. Im `css` wird `:root` zu `:host`, und die Regeln für `.top` und `.home` entfallen.
- Module entstehen per `python3 mkmod.py <id> …` aus den Einzelseiten in `CAS/fx991/` (Themenliste mit Dateinamen steht in `mkmod.py`).
- IDs: CW = `grund, stat, funk, gl, wt, abl, int, lgs, stufe, mat, kombi, binom`. X (nur HFH-Datei) = `dx_` + ID. Titel-Überschreibungen in `TITLE` in `mkmod.py` (kombi „Kombinatorik (nPr/nCr)“, mat „Matrizenrechnung“, stufe).
- Themenliste und Reihenfolge: `topics.py` im Bauset. `app` ist die Nummer der App, die im Display markiert wird, wenn man über das Thema fährt.
  - CW: 0 Berechnung, 1 Statistik, 2 Verteilung, 4 Wertetab., 5 Gleichung
  - X: 0 Berechnungen, 3 Matrizen, 5 Statistik, 6 Verteilungen, 8 Wertetabelle, 9 Gleichungen
- PDF-Links (seit 04.11.2026, beide Übersichten und `CAS/fx991/index.html`): **ein gemeinsames Arbeitsblatt je Thema** `https://olafkott.github.io/CAS/fx991/Arbeitsblatt_fx991_CW_X_<Thema>.pdf` – für CW und X derselbe Link.

## Gemeinsame Arbeitsblätter CW/X (seit 04.11.2026)
- Die Aufgaben sind bei CW und X identisch, deshalb gibt es je Thema nur noch ein Arbeitsblatt: oben **zwei QR-Codes** in den Rechner-Rahmen (CW schwarz mit goldener Taste → `fx991_<T>_Schritt_fuer_Schritt.html`, X ohne goldene Taste → `fx991DEX_<T>_Schritt_fuer_Schritt.html`). Modellabhängige Tastenfolgen stehen nicht mehr auf dem Blatt, sondern nur in der Anleitung; der Hinweiskasten enthält einen modellneutralen Tipp.
- Unten: Lösung → `Loesung_fx991_CW_X_<T>.html`, Übung → `fx991_CW_X_Uebung_<T>.html` (Übung ohne Modellangabe).
- Erzeugt mit `python3 _bauset/mk_cw_x.py` aus den CW- und X-Einzelblättern (Untertitel und Tipps je Thema in `TOPICS` dort). Verschlüsselte Lösungen (Grundlagen 8692, Lage_Streuung 6241) werden entschlüsselt, umgebaut und mit demselben Code neu verschlüsselt. Danach PDFs per Chromium-Druck (A4) und `python3 _bauset/mk_cw_x_gesamt.py` → `CAS/fx991/Taschenrechner_Fuehrerschein_Arbeitsblaetter_CW_X.pdf` (alle Blätter, mit Lesezeichen).
- Neues Thema: CW- und X-Blatt wie bisher bauen, Thema in `TOPICS` von `mk_cw_x.py` ergänzen, Skripte erneut laufen lassen.
- Die alten Einzelblätter `Arbeitsblatt_fx991_<T>` / `Arbeitsblatt_fx991DEX_<T>` bleiben liegen, damit QR-Codes auf bereits gedruckten Blättern weiter funktionieren.

## „Aktualisiere alles“ – Ablauf
1. Repo `OlafKott/olafkott.github.io` einbinden und klonen, `CAS/_bauset/` nach `/home/claude/work` kopieren.
2. Neue Themen suchen, **an zwei Stellen**:
   - im Projekt (`project_info`): neue Dateien unter `fx991/<Thema>/` und `fx991DEX/<Thema>/`. Nach `CAS/fx991/` übernehmen, PDFs (A4, Browser-Druck) erzeugen.
   - auf GitHub: `git log` und `CAS/fx991/` auf neue `…_Schritt_fuer_Schritt.html` prüfen. Andere Chats laden neue Themen inzwischen direkt dorthin hoch, wenn der Projektspeicher knapp ist.
3. Module bauen (`mkmod.py`), Thema in `topics.py` und `mkmod.py` aufnehmen. Weicht das Rechner-Markup ab (andere `data-k`-Tasten), gemeinsames Rechner-Markup ergänzen.
4. `build.py` und `build2.py`, dann `t6.py` (bzw. `t7.py`: nur über den Weiter-Button durchklicken, Buttonzeile gleich hoch, Überspringen/Zurück): keine JS-Fehler, jede Anleitung durchklickbar, Rechnerposition gleich, Übungen laufen. Zusätzlich Handy-Breite (390 px) und Querformat (844×390) prüfen (alles muss verkleinert auf den Bildschirm passen).
5. `CAS/fx991/index.html` ergänzen und als `claude/index.html` ins Projekt schreiben.
6. Alles auf GitHub committen und pushen (Einzelseiten, PDFs, beide Übersichten, Bauset).

## Stand (17.10.2026)
- 12 Themen, bei CW und X jeweils mit Anleitung, Arbeitsblatt und Übung: Grundlagen, Lage- und Streuungsmaße, Funktionswerte, Gleichungen, Wertetabellen, Ableitung, Integrale, LGS, Zeilenstufenform (Ref/Rref, direkt hinter LGS), Matrizenrechnung, Kombinatorik (nPr/nCr), Binomialverteilung.
- Buttonzeile Zurück / Überspringen / Weiter mit fester Höhe in beiden Übersichten (17.10.2026).
