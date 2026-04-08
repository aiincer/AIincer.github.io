const inhalte = [
  ["up", "up.html"],
  ["down", "down.html"]
];
inhalte.forEach(([id, datei]) => {
  const element = document.getElementById(id);
  if (element) {
    fetch(datei)
      .then(response => {
        if (!response.ok) throw new Error(`Fehler beim Laden von ${datei}`);
        return response.text();
      })
      .then(html => {
        element.innerHTML = html;
      })
      .catch(error => console.error(error));
  } else {
    console.warn(`Kein Element mit der ID '${id}' gefunden.`);
  }
});
