const grid = document.getElementById("gameGrid");

// Funktion zum Rendern der Spiele
function renderGames(games) {
  grid.innerHTML = ""; // vorher leeren
  Object.entries(games).forEach(([name, game]) => {

    // Verwende <a> anstelle von <div>, falls Link vorhanden
    const card = document.createElement(game.link ? "a" : "div");
    card.className = "card";

    if (game.link) {
      card.href = game.link;  
      // kein target → öffnet im selben Tab
    }

    const img = document.createElement("img");
    img.src = game.bild;
    img.alt = name;

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("h3");
    title.textContent = name;

    const tagContainer = document.createElement("div");
    tagContainer.className = "tag-container";

    // Tags rendern mit Standardwerten
    if (Array.isArray(game.tag)) {
      game.tag.forEach(tagData => {
        const [tagName, colors] = tagData;
        const outline = colors?.[0] || "white";
        const fill = colors?.[1] || "transparent";
        const textColor = colors?.[2] || "white";

        const tagElement = document.createElement("span");
        tagElement.className = "tag";
        tagElement.textContent = tagName;
        tagElement.style.border = `2px solid ${outline}`;
        tagElement.style.background = fill;
        tagElement.style.color = textColor;

        tagContainer.appendChild(tagElement);
      });
    }

    content.append(title, tagContainer);
    card.append(img, content);

    grid.appendChild(card);
  });
}

// JSON laden
async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fehler beim Abrufen: ${url}`);
    return await res.json();
  } catch (err) {
    console.warn(err.message);
    return {}; 
  }
}

// Hauptfunktion
async function loadGames() {
  let combinedGames = {};

  const data1 = await fetchJSON("https://aiincer.github.io/api/game/0/3/lib.json");
  combinedGames = { ...combinedGames, ...data1 };

  let ip = "";
  try {
    const resIp = await fetch("https://aiincer.github.io/api/game/ip.txt");
    if (resIp.ok) ip = (await resIp.text()).trim();
  } catch (err) {
    console.warn("IP konnte nicht abgerufen werden:", err);
  }

  if (ip) {
    const data2 = await fetchJSON(`${ip}/api/game/0/3/lib`);
    combinedGames = { ...combinedGames, ...data2 };
  }

  renderGames(combinedGames);
}

// Start
loadGames();
