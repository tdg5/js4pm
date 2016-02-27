import Reveal from "reveal";

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
  }

  showControls() {
    Reveal.configure(SHOW_CONTROLS_CONFIG);
  }
}

export default Slide;
