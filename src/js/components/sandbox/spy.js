let EVENT_SPY_COMPLETE, EVENT_SPY_REGISTER;

(function createEvents() {
  let e = EVENT_SPY_REGISTER = new Event("spyRegister");
  e.context = window;
  e = EVENT_SPY_COMPLETE = new Event("spyComplete");
  e.context = window;
})();

class Spy {
  constructor() {
    register();
  }

  complete() {
    dispatchEvent(EVENT_SPY_COMPLETE);
  }
}

function dispatchEvent(event) {
  window.parent.document.dispatchEvent(event);
}

function register() {
  dispatchEvent(EVENT_SPY_REGISTER);
}

export default Spy;
