let CLASSES = {
  hidden: "hidden",
};

class Styler {
  addClass(elem, klass) {
    elem.classList.add(klass);
  }

  get classes() {
    return CLASSES;
  };

  hide(elem) {
    this.addClass(elem, CLASSES.hidden);
  }

  removeClass(elem, klass) {
    elem.classList.remove(klass);
  }

  show(elem) {
    this.removeClass(elem, CLASSES.hidden);
  }
}

let styler = new Styler();

export {Styler, styler};
