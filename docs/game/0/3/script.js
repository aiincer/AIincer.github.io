* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

body {
  background: linear-gradient(135deg, #0f0f1b, #1a1a2e);
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 95%;
  max-width: 1000px;
  padding: 40px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0,255,255,0.2);
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  font-size: 2.5rem;
  background: linear-gradient(90deg, #00f5ff, #00aaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
}

/* Neon Scrollbar */
.game-grid::-webkit-scrollbar {
  width: 8px;
}

.game-grid::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.game-grid::-webkit-scrollbar-thumb {
  background: #00f5ff;
  border-radius: 10px;
  box-shadow: 0 0 10px #00f5ff;
}

/* Karten */
.card {
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
  border: 1px solid rgba(0, 245, 255, 0.3);
  box-shadow: 0 0 15px rgba(0,245,255,0.2);
  display: flex;
  flex-direction: column;
  text-decoration: none; /* Links nicht unterstreichen */
  color: inherit;        /* Textfarbe übernehmen */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px #00f5ff, 0 0 50px rgba(0,245,255,0.3);
}

.card img {
  width: 100%;
  height: auto;           
  max-height: 200px;      
  object-fit: contain;    
  border-bottom: 1px solid rgba(0,245,255,0.3);
  background: rgba(0,0,0,0.1); 
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.card h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: white; /* Textfarbe für Titel */
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 5px 12px;
  margin: 4px 4px 0 0;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  transition: 0.3s;
  box-shadow: 0 0 5px rgba(0,245,255,0.3);
}

footer {
  text-align: center;
  margin-top: 20px;
  opacity: 0.6;
  font-size: 0.9rem;
}
