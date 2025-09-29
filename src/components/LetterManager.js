export default class LetterManager {
  constructor(phrase) {
    this.phrase = phrase.split('');
    this.revealed = new Array(this.phrase.length).fill(false);
  }

  revealLetter(index) {
    this.revealed[index] = true;
  }

  getMaskedPhrase() {
    return this.phrase
      .map((ch, i) => (this.revealed[i] || ch === ' ' ? ch : '_'))
      .join(' ');
  }
}
