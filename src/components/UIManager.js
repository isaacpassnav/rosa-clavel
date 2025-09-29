import { Howl } from "howler";

const applauseSound = new Howl({
  src: [new URL("../assets/audio/applause.mp3", import.meta.url).href],
  volume: 0.8,
});

const booSound = new Howl({
  src: [new URL("../assets/audio/boo.mp3", import.meta.url).href],
  volume: 0.8,
});

export default class UIManager {
  constructor(container, name) {
    this.container = container;
    this.name = name;
  }

  showFinalScreen() {
    this.container.innerHTML = `
      <div class="final no-party">
        <h2>${this.name}, ¿Te gustaría ser mi compañera para Rosa y Clavel?</h2>
        <button id="yesBtn">Yes</button>
        <button id="noBtn">No</button>
        <div id="result"></div>
      </div>
    `;

    const finalDiv = this.container.querySelector(".final");

    // YES button
    document.getElementById("yesBtn").addEventListener("click", () => {
      applauseSound.play();

      finalDiv.classList.remove("no-party");
      finalDiv.classList.add("party");

      // Solo mostramos mensaje + emoji
      document.getElementById("result").innerHTML = `
        <div class="celebration">
          <span class="emoji">🥳</span>
          <p>Congratulations ${this.name}! ¡Será una noche inolvidable! 💃🕺</p>
        </div>
      `;

      // Eliminar botones y pregunta
      finalDiv.querySelector("h2").remove();
      document.getElementById("yesBtn").remove();
      document.getElementById("noBtn").remove();
    });

    // NO button
    document.getElementById("noBtn").addEventListener("click", () => {
      booSound.play();

      finalDiv.classList.remove("no-party");
      finalDiv.classList.remove("party");

      // Solo mostramos mensaje triste
      document.getElementById("result").innerHTML = `
        <div class="celebration">
          <span class="emoji">😢</span>
          <p>Oh no ${this.name}, pipipipi…</p>
        </div>
      `;

      // Eliminar botones y pregunta
      finalDiv.querySelector("h2").remove();
      document.getElementById("yesBtn").remove();
      document.getElementById("noBtn").remove();
    });
  }
}
