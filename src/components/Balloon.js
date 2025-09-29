import { Howl } from "howler";
import gsap from "gsap";

// usa import.meta.url para que Vite resuelva la ruta correctamente
const popSound = new Howl({
  src: [new URL("../assets/audio/balloon-pop.mp3", import.meta.url).href],
  volume: 0.8,
});

export default class Balloon {
  constructor(id, letter, onPop) {
    this.id = id;           // índice en la frase
    this.letter = letter;   // carácter (no lo mostramos en el globo)
    this.onPop = onPop;
    this.el = this.createElement();
    this.floatAnim = null;
  }

  createElement() {
    const el = document.createElement("div");
    el.className = "balloon";
    el.dataset.id = String(this.id);
    el.innerText = ""; // NO mostrar la letra en el globo

    // animación por elemento (valores aleatorios para naturalidad)
    this.floatAnim = gsap.to(el, {
      y: -10 - Math.random() * 25,
      x: (Math.random() - 0.5) * 8,
      duration: 2 + Math.random() * 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    el.addEventListener("click", () => this.pop());
    return el;
  }

  pop() {
    if (!this.el || this.el.classList.contains("popped")) return;

    this.el.classList.add("popped");

    // parar la animación de flotación
    if (this.floatAnim) {
      try { this.floatAnim.kill(); } catch (e) {}
      this.floatAnim = null;
    }

    // sonido (silencioso si falla)
    try { popSound.play(); } catch (e) {}

    // animación de desaparición y luego eliminar el nodo
    gsap.to(this.el, {
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: "back.in(2)",
      onComplete: () => {
        if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
      },
    });

    // notificar al Game con el índice (id)
    if (typeof this.onPop === "function") this.onPop(this.id);
  }
}
