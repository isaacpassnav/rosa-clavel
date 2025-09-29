export default class IntroForm {
  constructor(container, onSubmit) {
    this.container = container;
    this.onSubmit = onSubmit;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="intro">
        <h1>Welcome!</h1>
        <p>Enter your name to begin</p>
        <input id="nameInput" type="text" placeholder="Your name" />
        <button id="startBtn">Start</button>
      </div>
    `;

    document.getElementById('startBtn').addEventListener('click', () => {
      const name = document.getElementById('nameInput').value.trim();
      if (name) {
        this.onSubmit(name);
      } else {
        alert('Por favor ingresa tu nombre para juagar!');
      }
    });
  }
}
