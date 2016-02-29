import {styler as Styler} from "./styler";

class DOM {
  constructor() {
    this.cache = {};
  }

  get controls() {
    if (this.cache.controls) { return this.cache.controls; }
    return this.cache.controls = this.reveal.querySelector(".controls");
  }

  get controlsLock() {
    if (this.cache.controlsLock) { return this.cache.controlsLock; }
    let elem = this.document.createElement("div");
    Styler.addClass(elem, "controls-lock");
    this.reveal.appendChild(elem);
    return this.cache.controlsLock = elem;
  }

  get document() {
    if (this.cache.document) { return this.cache.document; }
    return this.cache.document = document;
  }

  get reveal() {
    if (this.cache.reveal) { return this.cache.reveal; }
    return this.cache.reveal = document.querySelector(".reveal");
  }
}

let dom = new DOM();

export {DOM, dom};
