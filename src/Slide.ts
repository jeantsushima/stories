import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  timer: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;

  constructor(container: Element, slides: Element[], controls: Element, timer: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.timer = timer;

    this.timeout = null;
    this.index = 0;
    this.slide = this.slides[this.index]

    this.init();
  }
  hide(el: Element) {
    el.classList.remove('active')
  };
  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach(el => this.hide(el));
    this.slide.classList.add('active');
    this.auto(this.timer)
  };
  auto(timer: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), timer);
  }
  prev() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  next() {
    const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
    this.show(next)
  }

  private addControls() {
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.innerText = 'Anterior';
    nextButton.innerText = 'Próximo';
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    nextButton.addEventListener('pointerup', () => this.next())
    prevButton.addEventListener('pointerup', () => this.prev())
  }
  private init() {
    this.addControls();
    this.show(this.index);
  }
}
