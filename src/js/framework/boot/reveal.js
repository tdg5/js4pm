import Reveal from "reveal";

class RevealBoot {
  static get configKey() {
    return "reveal";
  }

  constructor(config = {}) {
    this.config = config;
  }

  boot() {
    if(typeof(this.config.onReady) === "function") {
      let onReady = this.config.onReady;
      delete this.config.onReady;
      Reveal.addEventListener("ready", onReady);
    }
    Reveal.initialize(this.config);
  }
}

export default RevealBoot;
