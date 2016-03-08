class Logger {
  constructor() {
    this.output = null;
    this.pendingMessages = [];
    let listener = spyCompleteListener(this);
    document.addEventListener("spyComplete", listener);
  }

  log(message) {
    if (!this.output) {
      this.pendingMessages.push(message);
      return;
    }

    let elem = document.createElement("div");
    elem.classList.add("sandbox-log-message");
    elem.innerHTML = message;
    this.output.appendChild(elem);
  }
}

function attachToOutput(logger, outputElem) {
  logger.output = outputElem;
  purgePendingMessages(logger);
}

function purgePendingMessages(logger) {
  let message;
  while (message = logger.pendingMessages.shift()) {
    logger.log(message);
  }
}

function spyCompleteListener(logger) {
  return function(event) {
    let outputElem = document.querySelector("body");
    attachToOutput(logger, outputElem);
  };
}

export default Logger;
