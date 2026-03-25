```markdown
-<name> - <type><more> - <zusätze><erklärung>
```
- name:
  - der name des Elements in json
- type:
  - der Datentyp des Elements
  - Datentypen: *1
- more:
  - länge
    - :^länge^
- Zusätze:
  - *2
- erklärung:
  - wofür es ist

*1
- standard:
  - str : string
  - int : int
  - flo : float / double
  - bol : boolean
  - lst : list
  - jso : json
  - set : set
- bonus:
  - hex : hex-color
  - rgb : rgb-color

*2
- standartwert:
  - hinter dem Datentypen () für gibt es nicht immer
  - (->^standartwert^)
- variirende Länge:
  - bei more statt einer zahl >
  - (>^kurz^-^lang^)
- bonus-datentyp:
  - hinter dem datentyp +
  - (+: ^bonus-datentyp(*1)^)
