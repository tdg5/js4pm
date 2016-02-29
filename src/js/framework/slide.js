import Reveal from "reveal";
import {dom as DOM} from "./dom";
import {styler as Styler} from "./styler";

let HIDE_CONTROLS_CONFIG = { controls: false },
  SHOW_CONTROLS_CONFIG = { controls: true };

class Slide {
  constructor(config = {}) {
    this.element = config.element;
    this.position = config.position;
  }

  activate() {}

  deactivate() {}

  hideControls() {
    Reveal.configure(HIDE_CONTROLS_CONFIG);
    Styler.show(DOM.controlsLock);
  }

  showControls() {
    Styler.hide(DOM.controlsLock);
    Reveal.configure(SHOW_CONTROLS_CONFIG);
  }
}

export default Slide;
