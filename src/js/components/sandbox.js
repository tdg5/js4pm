let RENDERING_SCRIPT = "<script type=\"text/javascript\" src=\"/js/sandbox-rendering.js\"></script>",
  RENDERING_STYLE_SHEET_LINK = "<link rel=\"stylesheet\" href=\"/css/sandbox-rendering.css\"></link>",
  RENDERING_COMPLETE_CALLBACK = "<script type=\"text/javascript\">(function(){window.sandboxSpy.complete();})()</script>",
  CONTENT_SCRIPT_TAG_END = "</script>",
  CONTENT_SCRIPT_TAG_START = "<script type=\"text/javascript\">",
  CONTENT_STYLE_TAG_END = "</style>",
  CONTENT_STYLE_TAG_START = "<style>",
  CONTENT_TOP_TO_STYLE = `<!doctype html><html><head>${RENDERING_STYLE_SHEET_LINK}${RENDERING_SCRIPT}${CONTENT_STYLE_TAG_START}`,
  CONTENT_STYLE_TO_BODY = `${CONTENT_STYLE_TAG_END}</head><body>`,
  CONTENT_SCRIPT_TO_BOTTOM = `${CONTENT_SCRIPT_TAG_END}${RENDERING_COMPLETE_CALLBACK}</body></html>`;

class Sandbox {
  constructor(element, config) {
    this.codeMirrors = {};
    this.config = config || {};
    this.element = element;
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

  let content = CONTENT_TOP_TO_STYLE +
    css +
    CONTENT_STYLE_TO_BODY +
    html +
    CONTENT_SCRIPT_TAG_START +
    js +
    CONTENT_SCRIPT_TO_BOTTOM;

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
