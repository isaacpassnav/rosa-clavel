import IntroForm from './components/IntroForm.js';
import Game from './components/Game.js';
import UIManager from './components/UIManager.js';

let playerName = '';
const app = document.getElementById('app');
document.getElementById("year").textContent = new Date().getFullYear();

// Start with name input
const intro = new IntroForm(app, (name) => {
  playerName = name;
  app.innerHTML = ''; // clear
  const game = new Game(app, playerName, () => {
    // callback after all balloons popped
    const ui = new UIManager(app, playerName);
    ui.showFinalScreen();
  });
  game.start();
});
