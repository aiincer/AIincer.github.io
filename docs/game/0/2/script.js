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
let userCredits = 0;

// 🔹 Login / Key prüfen
loginBtn.addEventListener("click", async () => {
  userKey = userKeyInput.value.trim();
  if(!userKey) return loginError.textContent = "Bitte gib deinen Code ein!";

  try {
    const res = await fetch("https://shakily-curvy-sofa.mimo.dev/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: userKey })
    });

    const data = await res.json();

    if(res.ok){
      userCredits = data.credits;
      creditCountEl.textContent = userCredits;
      loginStep.style.display = "none";
      gameStep.style.display = "block";
    } else {
      loginError.textContent = data.error || "Code ungültig";
    }
  } catch(err){
    loginError.textContent = "Server Fehler";
    console.error(err);
  }
});

// 🔹 Spiel generieren
generateBtn.addEventListener("click", async () => {
  const prompt = gameInput.value.trim();
  gameError.textContent = "";

  if(!prompt) return gameError.textContent = "Bitte beschreibe dein Spiel!";

  if(userCredits <= 0) return gameError.textContent = "Keine Credits mehr!";

  generateBtn.disabled = true;
  generateBtn.textContent = "🎨 Erstelle dein Spiel...";

  try {
    const res = await fetch("https://shakily-curvy-sofa.mimo.dev/aigenerate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: userKey, message: prompt })
    });

    const data = await res.json();

    if(res.ok && data.response){
      userCredits = data.remainingCredits;
      creditCountEl.textContent = userCredits;

      const blob = new Blob([data.response], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      gameFrame.src = url;

      if(userCredits <= 0){
        gameError.textContent = "Du hast keine Credits mehr!";
      }
    } else {
      gameError.textContent = data.error || "Fehler beim Generieren!";
    }

  } catch(err){
    console.error(err);
    gameError.textContent = "Server Fehler";
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "🎨 Spiel erstellen";
  }
});
