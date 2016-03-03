import {slideshow} from "../framework/slideshow";
import Slide from "../framework/slide";

class HelloWorld extends Slide {
  constructor(config) {
    super(config);
    this.completed = false;
    this.init();
  }

  init() {
    let elem = this.element.querySelector(".slide-action");
    elem.addEventListener("click", onClickHandler(this));
  }

  activate(event) {
    if (this.completed) { return; }
    slideshow.hideControls();
  }
}

function onClickHandler(slide) {
  return function() {
    alert("Hello, World!");
    if(!slide.completed) {
      slide.completed = true;
      slideshow.showControls();
    }
  };
}

export default HelloWorld;
