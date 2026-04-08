const inhalte = [
  ["up",   "https://aiincer.github.io/host/0/dsdmt/src/utils/bar/up.html"],
  ["down", "https://aiincer.github.io/host/0/dsdmt/src/utils/bar/down.html"]
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
