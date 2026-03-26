# Übersicht
Übersetz Seiten in verschiedene Sprachen

# einbinden
- in ```/src/lang``` das Hauptfile (```langControl.js```) einfügen
- Spachen hinzufügen:
  - ordner für sprache erstellen (beispiel ```de```: ```/src/lang/de```)
  - in ```/src/lang/de``` ```dir.json```hinzufügen
  - ```/src/lang/de/assets``` (nach *1) hinzufügen
  - html-files mit übersetzem inhalt in ```/src/lang/de/assets``` hinzufügen
  - json-files mit übersetzem inhalt (nach *2) hinzufügen
 
# *
## *1
```
- "supported" - lst   - list of supported pages
- <page>      - lst   - list of parts of a <page>
  - ?         - lst:3 - a part of the <page>
    - 0       - str   - id of the part of the <page>
    - 1       - bol   - is it out of a html (false) or a json (true)
    - 2       - swc   - (<page>.?.1):
      - false - str+  - (+:url->html-) link to the translation
      - true  - lst:2 -
        - 0   - str+  - (+:url->jso) link to a json with translations
        - 1   - str   - the id of the translation in the json
```

## *2
```
- <id> - str+ - (+:html) kurzer übersetzer abschnitt
```
