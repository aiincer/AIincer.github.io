// 2.js – "UNFERTIG" auf der Tastatur-Tasten anzeigen
(function() {
  const kbContainer = document.getElementById("keyboardContainer");
  if (!kbContainer) return;

  // Hole alle Tasten im Container
  const keys = kbContainer.querySelectorAll(".key");
  const overlayText = "-------------------------------------";

  // Overlay-Buchstaben auf die ersten Tasten legen
  for (let i = 0; i < Math.min(keys.length, overlayText.length); i++) {
    const key = keys[i];
    
    // Buchstaben-Overlay erstellen
    const letterOverlay = document.createElement("div");
    letterOverlay.textContent = overlayText[i];
    Object.assign(letterOverlay.style, {
      position: "absolute",
      color: "red",
      fontWeight: "bold",
      fontSize: "40px",
      pointerEvents: "none", // Klicks durch Overlay
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    });

    // Stelle sicher, dass die Taste relativ positioniert ist
    key.style.position = "relative";
    key.appendChild(letterOverlay);
  }
})();
