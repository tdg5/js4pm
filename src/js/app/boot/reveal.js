import Reveal from "reveal";
import hljs from "highlight.js";

class RevealBoot {
  constructor(config = {}) {
    this.config = config;
  }

  boot() {
    if(typeof(this.config.onReady) === "function") {
      let onReady = this.config.onReady;
      delete this.config.onReady;
      Reveal.addEventListener("ready", onReady);
    }
    Reveal.addEventListener("ready", bootHighlight);
    Reveal.initialize(this.config);
  }
}

function bootHighlight() {
  if(typeof window.addEventListener === "function") {
    var hljs_nodes = document.querySelectorAll("pre code");

    for(var i = 0, len = hljs_nodes.length; i < len; i++) {
      var element = hljs_nodes[i];

      // trim whitespace if data-trim attribute is present
      if(element.hasAttribute("data-trim") && typeof element.innerHTML.trim === "function") {
        element.innerHTML = element.innerHTML.trim();
      }

      // Now escape html unless prevented by author
      if(!element.hasAttribute("data-noescape")) {
        element.innerHTML = element.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      // re-highlight when focus is lost (for edited code)
      element.addEventListener("focusout", function(event) {
        hljs.highlightBlock(event.currentTarget);
      }, false);
    }
  }

  hljs.initHighlightingOnLoad();
}

export default RevealBoot;
