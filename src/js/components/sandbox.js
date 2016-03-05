class Sandbox {
  constructor(element, config) {
    this.config = config || {};
    this.element = element;
    this.codeMirrors = {};
    this.result = "";
  }

  compile() {
    eval(this.codeMirrors.javascript.getValue());
  }
}

export default Sandbox;
