const generateBtn = document.getElementById('generateBtn');
const gameInput = document.getElementById('gameInput');
const gameFrame = document.getElementById('gameFrame');

// 🔒 Verschlüsselter API-Key (Beispiel)
// Verschlüsselt mit Passwort "meinPasswort123"
const encryptedKey = "U2FsdGVkX1+q4XZTJ8Vt59x6aL3kE4eUqG4tF6ZkFpE=";
const password = "meinPasswort123";

// Funktion zum Entschlüsseln des Keys
function decryptKey(encrypted, password) {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}

generateBtn.addEventListener('click', async () => {
    const prompt = gameInput.value.trim();
    if (!prompt) return alert('Bitte beschreibe dein Spiel!');

    generateBtn.disabled = true;
    generateBtn.textContent = '🎨 Erstelle dein Spiel...';

    try {
        const apiKey = decryptKey(encryptedKey, password); // Key entschlüsseln

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "Du bist ein JavaScript-Spiel-Generator. Gib nur lauffähigen HTML, CSS und JS Code zurück, ohne Erklärungen."
                    },
                    {
                        role: "user",
                        content: `Erstelle ein spielbares Spiel basierend auf folgendem Design: ${prompt}`
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        let code = data.choices[0].message.content;

        // Sicherheitsmaßnahmen: direktes Einfügen in iframe
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        gameFrame.src = url;

    } catch (err) {
        console.error(err);
        alert('Fehler beim Erstellen des Spiels!');
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '🎨 Spiel erstellen';
    }
});
