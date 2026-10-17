# Zusatzaufgabe: Rohdateien für GitHub ablegen
Schreibe die folgenden Projektdateien (mit `Projects` → `project_read` lesen) **byte-genau unverändert** als Datei nach
`/home/claude/olafkott.github.io/CAS/fx991/<Dateiname ohne Ordner>`:
alle Dateien deines Themenordners (Anleitung `…_Schritt_fuer_Schritt.html`, Übung, Arbeitsblatt, Lösung), soweit vorhanden.
Falls `project_read` einen lokalen Dateipfad statt Inhalt zurückgibt: einfach mit `cp` kopieren.
Sonst den Inhalt mit `Write` vollständig und wörtlich schreiben (auch lange base64-Bilder vollständig!).
Prüfe danach mit `grep -c '</html>'` dass jede Datei vollständig ist, und nenne im Bericht die Dateigrößen (`wc -c`).
Melde außerdem die Ziel-URLs aller QR-Code-Links (`href="https://olafkott.github.io/...`) im Arbeitsblatt.
