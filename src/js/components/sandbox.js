let CONTENT_TOP_TO_STYLE = "<!doctype html>\n<html>\n<head>\n<style>\n",
  CONTENT_STYLE_TO_SCRIPT = "</style>\n<script type=\"text/javascript\">\n",
  CONTENT_SCRIPT_TO_BODY = "</script>\n</head>\n<body>\n",
  CONTENT_BODY_TO_BOTTOM = "</body>\n</html>";

class Sandbox {
  constructor(element, config) {
    this.config = config || {};
    this.element = element;
    this.codeMirrors = {};
  }

  compile() {
    let content = generateContent(this);
    let output = this.element.querySelector(".output");
    writeContent(output, content);
  }
}

function generateContent(sandbox) {
  let css = "", html = "", js = "";
  if (sandbox.codeMirrors.css) {
    css = sandbox.codeMirrors.css.getValue();
  }
  if (sandbox.codeMirrors.html) {
    html = sandbox.codeMirrors.html.getValue();
  }
  if (sandbox.codeMirrors.javascript) {
    js = sandbox.codeMirrors.javascript.getValue();
  }

  let content = CONTENT_TOP_TO_STYLE + css + CONTENT_STYLE_TO_SCRIPT + js +
    CONTENT_SCRIPT_TO_BODY + html + CONTENT_BODY_TO_BOTTOM;

  return content;
}

function writeContent(wrapper, content) {
  wrapper.innerHTML = "";
  let iframe = document.createElement("iframe");
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("height", "100%");
  iframe.setAttribute("width", "100%");
  wrapper.appendChild(iframe);
  let iframeContent = iframe.contentWindow ||
    iframe.contentDocument.document ||
    iframe.contentDocument;
  let iframeDoc = iframeContent.document;
  iframeDoc.open();
  iframeDoc.write(content);
  iframeDoc.close();
}

export default Sandbox;
