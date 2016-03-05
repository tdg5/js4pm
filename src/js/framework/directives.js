import {onReady} from "./events/on-ready";

class DirectiveRegistry {
  constructor() {
    this.directives = {};
    onReady.addListener(onReadyListener(this));
  }

  register(selector, klass) {
    let directives = this.directives[selector];
    if (!directives) {
      this.directives[selector] = directives = [];
    }
    directives.push(klass);
  }
}

function eachDirectiveElement(registry, fn) {
  let selectors = Object.keys(registry.directives);
  for (let selectorIndex = 0; selectorIndex < selectors.length; ++selectorIndex) {
    let selector = selectors[selectorIndex];
    let elements = document.querySelectorAll(selector);
    let directives = registry.directives[selector];

    for (let elementIndex = 0; elementIndex < elements.length; ++elementIndex) {
      for (let directiveIndex = 0; directiveIndex < directives.length; ++directiveIndex) {
        let element = elements[elementIndex];
        let directive = directives[directiveIndex];
        fn.call(undefined, directive, element);
      }
    }
  }
}

function onReadyListener(registry) {
  return function onReady(event) {
    transformElements(registry);
  };
}

function transformDirectiveElement(directive, element) {
  new directive(element);
}

function transformElements(registry) {
  eachDirectiveElement(registry, transformDirectiveElement);
}

let directives = new DirectiveRegistry();

export {DirectiveRegistry, directives};
