const loginStep = document.getElementById("loginStep"); 
const gameStep = document.getElementById("gameStep");
const loginBtn = document.getElementById("loginBtn");
const userKeyInput = document.getElementById("userKey");
const loginError = document.getElementById("loginError");

const creditCountEl = document.getElementById("creditCount");
const gameInput = document.getElementById("gameInput");
const generateBtn = document.getElementById("generateBtn");
const gameFrame = document.getElementById("gameFrame");
const gameError = document.getElementById("gameError");

let userKey = "";
let userCredits = 100; // immer 100 Credits

// 🔹 Login / Key prüfen (nur Dummy, zeigt immer 100 Credits)
loginBtn.addEventListener("click", () => {
  userKey = userKeyInput.value.trim();
  if(!userKey) return loginError.textContent = "Bitte gib deinen Code ein!";

  creditCountEl.textContent = userCredits;
  loginStep.style.display = "none";
  gameStep.style.display = "block";
});

// 🔹 Spiel generieren
generateBtn.addEventListener("click", async () => {
  const prompt = gameInput.value.trim();
  gameError.textContent = "";

  if(!prompt) return gameError.textContent = "Bitte beschreibe dein Spiel!";

  generateBtn.disabled = true;
  generateBtn.textContent = "🎨 Erstelle dein Spiel...";

  try {
    // 🔹 IP-Adresse von der externen Datei abfragen
    const ipRes = await fetch("https://aiincer.github.io/api/game/0/2/ip.txt");
    const ipAddress = (await ipRes.text()).trim();

    // 🔹 Check: IP muss mit http beginnen
    if (!ipAddress.startsWith("http")) {
      gameError.textContent = "Ungültige IP-Adresse oder Datei nicht gefunden!";
      generateBtn.disabled = false;
      generateBtn.textContent = "🎨 Spiel erstellen";
      return;
    }

    // 🔹 Spiel generieren Anfrage an die API mit IP
    const res = await fetch(ipAddress, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        key: userKey, 
        prompt: prompt, 
        ip: ipAddress // ✅ die geprüfte IP wird gesendet
      })
    });

    const data = await res.json();

    if(res.ok && data.response){
      const blob = new Blob([data.response], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      gameFrame.src = url;
    } else {
      gameError.textContent = data.error || "Fehler beim Generieren!";
    }

  } catch(err){
    console.error(err);
    gameError.textContent = "Server Fehler oder IP-Datei konnte nicht geladen werden!";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "🎨 Spiel erstellen";
  }
});
