import CodeMirror from "../codemirror";
import Sandbox from "../sandbox"

class SandboxFactory {
  constructor(element, config) {
    let sandbox = new Sandbox(element, config || {});
    initializeSandbox(sandbox);
    this.product = sandbox;
  }
}

function initializeSandbox(sandbox) {
  let element = sandbox.element;
  let mirrors = element.querySelectorAll(".codemirror");
  initializeMirrors(sandbox, mirrors);
}

function initializeMirrors(sandbox, mirrors) {
  for (let i = 0, length = mirrors.length; i < length; ++i) {
    let mirrorElem = mirrors[i];
    let mirror = new CodeMirror(mirrorElem);
    sandbox.codeMirrors[mirror.mode] = mirror;
  }
}

export default SandboxFactory;
