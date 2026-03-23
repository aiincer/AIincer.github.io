```
- "name"    - jso   - der name des Spiels
  - "bild"  - str   - der link zum Titelbild für das Spiel
  - "tag"   - lst   - liste der Tags
    - ?     - lst:2 - ein Tag
      - 0   - str   - der Text des Tags
      - 1   - lst:> - (>1-3) die Farben des Tags
        - 0 - str   - farbe der Outline
        - 1 - str() - (->transparent) Farbe der Füllung
        - 2 - str() - (->weiß) Farbe des Texts
  - "link"  - str   - link wo man das Spiel spielen kann
```
