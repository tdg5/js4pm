import Codemirror from "codemirror";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";

let MODE_STRING_CSS = "css",
  MODE_STRING_HTML = "html",
  MODE_STRING_JS = "javascript";

class CodeMirror {
  static get configKey() {
    return "codemirror";
  }

  constructor(element, config = {}) {
    this.element = element;
    this.mode = null;
    initializeMirror(this, config);
  }

  isCSS() {
    return this.mode === MODE_STRING_CSS;
  }

  isHTML() {
    return this.mode === MODE_STRING_HTML;
  }

  isJS() {
    return this.mode === MODE_STRING_JS;
  }

  setMode(modeString) {
    let mode = modeString.toLowerCase();
    let knownMode = mode === MODE_STRING_JS ||
      mode === MODE_STRING_CSS ||
      mode.substring(0, 4) === MODE_STRING_HTML;

    if (!knownMode) {
      throw new Error(`Unknown codemirror mode: ${mode}`);
    }
    this.mode = mode;
    return mode;
  }
}

function initializeMirror(mirror, config) {
  let element = mirror.element;
  let options = {};

  let modeAttr = element.attributes["data-mode"];
  if (modeAttr) { options.mode = mirror.setMode(modeAttr.value); }

  let content = element.innerHTML;
  if (content) {
    element.innerHTML = "";
    options.value = content;
  }

  let lineNumbersAttr = element.attributes["data-line-numbers"];
  if (lineNumbersAttr) { options.lineNumbers = true; }

  let codeMirror = Codemirror(element, options);
  mirror.getValue = function() { return codeMirror.getValue(); };
}

export default CodeMirror;
