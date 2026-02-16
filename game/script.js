const generateBtn = document.getElementById('generateBtn');
const gameInput = document.getElementById('gameInput');
const gameFrame = document.getElementById('gameFrame');

generateBtn.addEventListener('click', async () => {
    const prompt = gameInput.value.trim();
    const lkey = document.getElementById('lkey').value.trim();
    if (!prompt) return alert('Bitte beschreibe dein Spiel!');

    generateBtn.disabled = true;
    generateBtn.textContent = '🎨 Erstelle dein Spiel...';

    try {
        const response = await fetch("https://shakily-curvy-sofa.mimo.dev/aigenerate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Erstelle ein spielbares HTML/CSS/JS Spiel basierend auf: ${prompt}; GIB NUR HTML AUS IN DEM CSS UND JS INTIGRIERT SIND; GIB NUR HTML CODE AUS SONST NICHTS, KEINEN ZUSÄTZLICHEN TEXT!!!!!!!!`,
                key: lkey
            })
        });

        const data = await response.json();

        // Mimo API gibt Antwort in data.response zurück
        const code = data.response;

        if (!code) {
            throw new Error("Keine Antwort erhalten");
        }

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
