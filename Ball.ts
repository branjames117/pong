const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  ballElem: HTMLElement;
  direction = { x: 0, y: 0 };
  velocity = INITIAL_VELOCITY;

  constructor(ballElem: HTMLElement) {
    this.ballElem = ballElem;
    this.reset();
  }

  get x(): number {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
  }

  set x(value: number) {
    this.ballElem.style.setProperty('--x', '' + value);
  }

  get y(): number {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
  }

  set y(value: number) {
    this.ballElem.style.setProperty('--y', '' + value);
  }

  rect(): DOMRect {
    return this.ballElem.getBoundingClientRect();
  }

  reset(): void {
    this.x = 50;
    this.y = 50;
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = this.randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  randomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  isCollision(rect1: DOMRect, rect2: DOMRect) {
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }

  update(delta: number, paddleRects: DOMRect[]) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (paddleRects.some((r) => this.isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}
