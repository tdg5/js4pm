import CodeMirror from "../codemirror";
import Sandbox from "../sandbox"

class SandboxFactory {
  constructor(element, config) {
    let sandbox = new Sandbox(element, config || {});
    initializeSandbox(sandbox);
    this.product = sandbox;
  }
}

function initializeActions(sandbox, actions) {
  for (let actionIndex = 0; actionIndex < actions.length; ++actionIndex) {
    let elem = actions[actionIndex];
    let dataAction = elem.attributes["data-action"].value;
    if (dataAction === "run") {
      elem.addEventListener("click", function(event) {
        sandbox.compile();
      });
    }
  }
}

function initializeMirrors(sandbox, mirrors) {
  for (let i = 0, length = mirrors.length; i < length; ++i) {
    let mirrorElem = mirrors[i];
    let mirror = new CodeMirror(mirrorElem);
    mirror.refresh();
    sandbox.codeMirrors[mirror.mode] = mirror;
  }
}

function initializeSandbox(sandbox) {
  let element = sandbox.element;
  let mirrors = element.querySelectorAll(".codemirror");
  initializeMirrors(sandbox, mirrors);
  let actions = element.querySelectorAll(".toolbar .action button");
  initializeActions(sandbox, actions);
}

export default SandboxFactory;
