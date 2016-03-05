class Sandbox {
  constructor(element, config) {
    this.config = config || {};
    this.element = element;
    this.codeMirrors = {};
    this.result = "";
  }
}

export default Sandbox;
