import {slideshow} from "../framework/slideshow";
import Slide from "../framework/slide";

class SandboxSlide extends Slide {
  constructor(config) {
    super(config)
    this.completed = false;
    registerListener(this);
  }

  activate(event) {
    //if (this.completed) { return; }
    //slideshow.hideControls();
  }

  renderComplete(event) {
    if (this.validateContext(event.context)) {
      this.completed = true;
      hideInstructions(this.element);
      slideshow.showControls();
    }
  }

  renderStart(event) {}

  validateContext(context) {
    return true;
  }
}

function discoverIFrameDocument(element) {
  let iframe = element.querySelector("iframe");
  let iframeContent = iframe.contentWindow || iframe.contentDocument;
  return iframeContent.document || iframeContent;
}

function hideInstructions(element) {
  let structs = element.querySelectorAll(".unlock-instructions");
  for (let i = 0, length = structs.length; i < structs.length; ++i) {
    structs[i].classList.add("invisible");
  }
}

function registerListener(sandboxSlide) {
  let iFrameDoc = discoverIFrameDocument(sandboxSlide.element);
  iFrameDoc.addEventListener("spyRegister", function(event) {
    sandboxSlide.renderStart(event);
  });
  iFrameDoc.addEventListener("spyComplete", function(event) {
    sandboxSlide.renderComplete(event);
  });
}

export default SandboxSlide;
