import os
from collections import defaultdict

# Hier den Pfad zum zu scannenden Ordner eintragen
folder_path = "."  # "." bedeutet aktueller Ordner

# Dictionary für die Ergebnisse, gruppiert nach Dateiendung
line_counts = defaultdict(int)
file_counts = defaultdict(int)

# Funktion zum Zählen der Zeilen in einer Datei
def count_lines(file_path):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return sum(1 for _ in f)
    except Exception as e:
        print(f"Fehler beim Lesen der Datei {file_path}: {e}")
        return 0

# Durch den Ordner und alle Unterordner iterieren
for root, dirs, files in os.walk(folder_path):
    for file in files:
        file_path = os.path.join(root, file)
        ext = os.path.splitext(file)[1].lower()  # Dateiendung in Kleinbuchstaben
        lines = count_lines(file_path)
        line_counts[ext] += lines
        file_counts[ext] += 1

# Ergebnisse ausgeben
print(f"{'Dateityp':<10} {'Dateien':<10} {'Zeilen':<10}")
print("-" * 30)
for ext, lines in sorted(line_counts.items(), key=lambda x: x[0]):
    print(f"{ext:<10} {file_counts[ext]:<10} {lines:<10}")
