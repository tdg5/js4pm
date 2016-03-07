import SandboxSlide from "../framework/sandbox-slide";

class Variables extends SandboxSlide {
  validateContext(context) {
    return context.index == 2 &&
      context.myName != "Grace Hopper";
  }
}

export default Variables;
