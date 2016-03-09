import Codemirror from "codemirror";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";

let MODE_STRING_CSS = "css",
  MODE_STRING_HTML = "html",
  MODE_STRING_JS = "javascript",
  KNOWN_MODES = {
    html: MODE_STRING_HTML,
    htmlmixed: MODE_STRING_HTML,
    css: MODE_STRING_CSS,
    javascript: MODE_STRING_JS,
  };

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
    let mode = KNOWN_MODES[modeString.toLowerCase()];
    if (!mode) {
      throw new Error(`Unknown codemirror mode: ${mode}`);
    }
    return this.mode = mode;
  }
}

function initializeMirror(mirror, config) {
  let element = mirror.element;
  let options = {};

  let modeAttr = element.attributes["data-mode"];
  if (modeAttr) {
    let mode = options.mode = modeAttr.value.toLowerCase();
    mirror.setMode(mode);
  }

  let content = element.innerHTML;
  if (content) {
    element.innerHTML = "";
    options.value = content;
  }

  let lineNumbersAttr = element.attributes["data-line-numbers"];
  if (lineNumbersAttr) { options.lineNumbers = true; }

  let codeMirror = Codemirror(element, options);
  mirror.getValue = function() { return codeMirror.getValue(); };
  mirror.refresh = function() { return codeMirror.refresh(); };
}

export default CodeMirror;
