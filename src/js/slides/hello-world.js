import {slideshow} from "../framework/slideshow";
import Slide from "../framework/slide";

class HelloWorld extends Slide {
  constructor(config) {
    super(config);
    this.completed = false;
    this.init();
  }

  init() {
    let self = this;
    let elem = this.element.querySelector(".slide-action");
    elem.addEventListener("click", function() {
      alert("Hello, World!");
      if(!self.completed) {
        self.completed = true;
        slideshow.showControls();
      }
    });
  }

  activate() {
    if (!this.completed) { slideshow.hideControls(); }
  }
}

export default HelloWorld;
