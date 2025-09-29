import { Howl } from "howler";
import gsap from "gsap";

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
      <div class="final">
        <h2>${this.name}, ¿Te gustaría ser mi compañera para Rosa y Clavel?</h2>
        <button id="yesBtn">Yes</button>
        <button id="noBtn">No</button>
        <div id="result"></div>
      </div>
    `;

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const result = document.getElementById("result");

    yesBtn.addEventListener("click", () => {
      applauseSound.play();

      result.innerHTML = `
        <img src="/src/assets/img/rose.svg" alt="Rose" class="rose" />
        <p>🎉 Congratulations ${this.name}! Será una noche inolvidable 💃🕺✨</p>
      `;

      gsap.from(result.querySelector(".rose"), {
        scale: 0,
        rotate: -180,
        duration: 1,
        ease: "back.out(1.7)",
      });
    });

    noBtn.addEventListener("click", () => {
      booSound.play();

      result.innerHTML = `
        <img src="/src/assets/img/sad-face.svg" alt="Sad face" class="sad" />
        <p>Oh no ${this.name}, Pipipipi Pipipipi 😢</p>
      `;

      gsap.from(result.querySelector(".sad"), {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "bounce.out",
      });
    });
  }
}
