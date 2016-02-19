import FrontEndSkillsForPMs from "../front-end-skills-for-pms.js";
import RevealBoot from "./boot/reveal";

class Boot {
  constructor(config = {}) {
    this.config = config;
  }

  boot() {
    bootReveal(this.config.reveal);
  }
}

function bootReveal(options) {
  let revealBoot = new RevealBoot(options);
  revealBoot.boot();
}

export default Boot;
