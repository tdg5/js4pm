import SandboxSlide from "../framework/sandbox-slide";

class HtmlExercise extends SandboxSlide {
  validateContext(context) {
    let button = context.document.querySelector("button");
    return button && button.innerText === "Buy Now!" &&
      button.attributes.id &&
      button.attributes.id.value === "cta-buy-now" &&
      button.classList.length == 1 &&
      button.classList.contains("call-to-action");
  }
}

export default HtmlExercise;

