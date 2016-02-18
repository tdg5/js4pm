/*
 * When minified the name of the unusedVariable in the function below should
 * minified to something else. Bracket in the regex is to ensure the regex
 * doesn't match itself.
 */
function isMinified(unusedVariable) {
  return !(/[u]nusedVariable/.test(isMinified.toString()));
}

function isTranspiled() {
  var expected = "Greetings from the ES6 future!",
    standard = "ES6",
    templateString = `Greetings from the ${standard} future!`;

  return templateString === expected;
}

var buildObserver = {
  isMinified: isMinified,
  isTranspiled: isTranspiled
};

export default buildObserver;
