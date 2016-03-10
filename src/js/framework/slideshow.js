import Reveal from "reveal.js";
import {dom} from "./dom";
import {styler} from "./styler";

let HIDE_CONTROLS_CONFIG = { controls: false },
  SHOW_CONTROLS_CONFIG = { controls: true };

class Slideshow {
  hideControls() {
    Reveal.configure(HIDE_CONTROLS_CONFIG);
    styler.show(dom.controlsLock);
  }

  showControls() {
    styler.hide(dom.controlsLock);
    Reveal.configure(SHOW_CONTROLS_CONFIG);
  }
}

let slideshow = new Slideshow();

export {Slideshow, slideshow};
