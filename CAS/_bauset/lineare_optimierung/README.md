# Lineare Optimierung (TI-Nspire CX CAS) – Bauset

Arbeitsordner beim Bauen: `/home/claude/lo` (Skripte erwarten diese Pfade). Ausgabe nach `CAS/Lineare_Optimierung/`.

- `mid.js` – Inhalt der Tour (Bildschirme, Tastenfolgen, TRACKS). `mktour.py` setzt ihn in die Flächen-Tour als Vorlage ein.
- `mkab.py` + `ab.css` – Arbeitsblatt (HTML+PDF) und verschlüsselte Lösung. Lösungscode **3756** (x, y des Optimums, Anzahl Ecken, 1. Ziffer von Z_max).
- `ueb_body.html` + `mkueb.py` – Übung (Zufallsaufgaben, 5 ganzzahlige Ecken, eindeutiges Maximum).
- Tests: `ttour.py` (Tour), `tueb.py` (Übung, Generator-Fuzztest), `tall.py` (CAS_Fuehrerschein.html), `measure.py` (passt auf A4).
- Vorgaben: kein Anwendungskontext, kein Antwortsatz, nur Zielfunktion und Restriktionen.
