import classify from "underscore.string/classify";
import Reveal from "reveal";

class SlideActivator {
  static get configKey() {
    return "slides";
  }

  constructor(slideMap) {
    this.slides = slideMap;
  }

  boot() {
    let slideActivator = this;
    Reveal.addEventListener("slidechanged", function(event) {
      let controllerName = event.currentSlide.getAttribute("slide-controller");
      if(!controllerName) { return; }
      let controllerClassName = classify(controllerName);
      let slideClass = slideActivator.slides[controllerClassName];
      if(!slideClass) { return; }
      let slide = new slideClass();
      slide.activate();
    });
  }
}

export default SlideActivator;
