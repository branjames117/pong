const SPEED = 0.02;

export default class Paddle {
  paddleElem: HTMLElement;

  constructor(paddleElem: HTMLElement) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position(): number {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position')
    );
  }

  set position(value: number) {
    this.paddleElem.style.setProperty('--position', '' + value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset(): void {
    this.position = 50;
  }

  update(delta: number, ballHeight: number): void {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
