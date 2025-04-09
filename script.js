/* Reset + Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(120deg, #1f1c2c, #928dab);
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;
}

.dashboard {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.topbar {
  text-align: center;
  margin-bottom: 20px;
}

.topbar h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tabs button {
  background: #ffffff22;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;
}

.tabs button:hover {
  background: #ffffff33;
}

.tab {
  display: none;
  animation: fadeIn 0.4s ease;
  margin-bottom: 20px;
}

.tab.active {
  display: block;
}

textarea {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-family: monospace;
  margin-bottom: 10px;
  background: #ffffff11;
  color: #fff;
  resize: vertical;
}

.buttons button,
.money-btn,
#links button {
  background: #ffdd57;
  color: #111;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  margin: 4px 4px 10px 0;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

.buttons button:hover,
#links button:hover,
.money-btn:hover {
  background: #ffc107;
}

#links input {
  padding: 8px;
  border-radius: 8px;
  border: none;
  margin: 4px;
  width: calc(50% - 16px);
  background: #ffffff11;
  color: #fff;
}

footer {
  text-align: center;
  font-size: 13px;
  margin-top: 30px;
  opacity: 0.8;
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* Animations */
@keyframes fadeIn {
  from {opacity: 0; transform: translateY(10px);}
  to {opacity: 1; transform: translateY(0);}
}
