const LOOKUP_URL = "https://aiincer.github.io/api/game/0/3/lookup.json";

const frame = document.getElementById("gameFrame");
const keyboardContainer = document.getElementById("keyboardContainer");

function getGameID() {
  const params = new URLSearchParams(window.location.search);
  return params.get("game");
}

async function fetchLookup() {
  try {
    const res = await fetch(LOOKUP_URL);
    if (!res.ok) throw new Error("Lookup konnte nicht geladen werden");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

function renderError(msg) {
  frame.srcdoc = `<h2 style="color:white;text-align:center;margin-top:50px;">${msg}</h2>`;
}

function loadGame(link) {
  frame.src = link;
}

function sendKeyToGame(key) {
  frame.contentWindow.postMessage({ type: "key", key }, "*");
}

function createKey(label, value) {
  const btn = document.createElement("div");
  btn.className = "key";
  btn.textContent = label;
  btn.addEventListener("click", () => sendKeyToGame(value));
  return btn;
}

function renderKeyboard(type = 0) {

  keyboardContainer.innerHTML = "";

  if (type === 0) {
    keyboardContainer.classList.add("hidden");
    return;
  }

  keyboardContainer.classList.remove("hidden");

  if (type === 1) {
    // Pfeile + Space
    keyboardContainer.append(
      createKey("↑", "ArrowUp"),
      createKey("↓", "ArrowDown"),
      createKey("←", "ArrowLeft"),
      createKey("→", "ArrowRight"),
      createKey("Space", " ")
    );
  }

  if (type === 2) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let c of chars) {
      keyboardContainer.append(createKey(c, c));
    }
    keyboardContainer.append(createKey("Space", " "));
  }
}

async function init() {

  const id = getGameID();
  if (!id) {
    renderError("Keine Game-ID angegeben");
    return;
  }

  const lookup = await fetchLookup();
  if (!lookup || !lookup[id]) {
    renderError("Spiel nicht gefunden");
    return;
  }

  const gameData = lookup[id];

  const link = gameData.link;
  const keys = gameData.keys ?? 0; // Standardwert 0

  if (!link) {
    renderError("Kein Link hinterlegt");
    return;
  }

  loadGame(link);
  renderKeyboard(keys);
}

init();
