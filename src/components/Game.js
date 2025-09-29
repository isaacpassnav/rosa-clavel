import Balloon from "./Balloon.js";
import LetterManager from "./LetterManager.js";

export default class Game {
  constructor(container, name, onFinish) {
    this.container = container;
    this.name = name;
    this.onFinish = onFinish;
    this.letters = new LetterManager(
      `¿${name} te gustaría ser mi compañera para Rosa y Clavel?`
    );
    this.balloons = [];
    this.poppedCount = 0;
    // cuántos caracteres deben revelarse (excluye espacios)
    this.revealableCount = this.letters.phrase.reduce(
      (acc, ch) => acc + (ch === " " ? 0 : 1),
      0
    );
  }

  start() {
    this.container.innerHTML = `
      <div class="game-area" role="application" aria-label="Balloon game"></div>
      <div class="phrase" aria-live="polite">${this.letters.getMaskedPhrase()}</div>
    `;
    const gameArea = this.container.querySelector(".game-area");
    const phraseEl = this.container.querySelector(".phrase");

    this.letters.phrase.forEach((letter, i) => {
      if (letter === " ") {
        const spacer = document.createElement("div");
        spacer.className = "spacer"; // estilo ocupador (no clickable)
        gameArea.appendChild(spacer);
        return;
      }

      const balloon = new Balloon(i, letter, (index) => {
        // reveal by index (aseguramos revelar la posición correcta)
        this.letters.revealLetter(index);
        phraseEl.textContent = this.letters.getMaskedPhrase();

        this.poppedCount++;
        if (this.poppedCount >= this.revealableCount) {
          this.onFinish();
        }
      });

      this.balloons.push(balloon);
      gameArea.appendChild(balloon.el);
    });
  }
}