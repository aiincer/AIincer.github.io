const generateBtn = document.getElementById('generateBtn');
const gameInput = document.getElementById('gameInput');
const gameFrame = document.getElementById('gameFrame');

// 🔒 Verschlüsselter Key (erstellt mit Passwort "meinPasswort123")
const encryptedKey = "U2FsdGVkX19vS1qT3wQK0l7z5V7E4kPfJ7yqI0JbXJU=";
const password = "meinPasswort123";

// Funktion zum Entschlüsseln des API-Keys
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
        const apiKey = decryptKey(encryptedKey, password);

        const response = await fetch('https://ai.mimo.org/v1/openai/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({ message: `Erstelle ein spielbares Spiel basierend auf: ${prompt}` })
        });

        const data = await response.json();
        const code = data.response; // Mimo API liefert Antwort als 'response'

        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        gameFrame.src = url;

    } catch(err) {
        console.error(err);
        alert('Fehler beim Erstellen des Spiels!');
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Spiel erstellen';
    }
});
