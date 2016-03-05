class OnReady {
  constructor() {
    this.event = null;
    this.self = null;
    this.listeners = [];
    register(this);
  }

  addListener(listener) {
    if (this.listeners.indexOf(listener) !== -1) { return; }
    if (this.self) {
      listener.call(this.self, this.event);
    } else {
      this.listeners.push(listener);
    }
  }

  removeListener(listener) {
    if (this.self) { return false; }
    let index = this.listeners.indexOf(listener);
    if (index) { this.listeners.splice(index, 1); }
    return true;
  }
}

function ready(onReady, self, event) {
  onReady.self = self;
  onReady.event = event;
  for (let i = 0; i < onReady.listeners.length; ++i) {
    onReady.listeners[i].call(self, event);
  }
}

function register(onReady) {
  function readyListener(event) {
    unregister(readyListener);
    ready(onReady, event);
  }

  document.addEventListener("DOMContentLoaded", readyListener);
  document.addEventListener("load", readyListener);
}

function unregister(listener) {
  document.removeEventListener("DOMContentLoaded", listener);
  document.removeEventListener("load", listener);
}

let onReady = new OnReady();

export {OnReady, onReady};
