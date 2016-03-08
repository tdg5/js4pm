import SandboxSlide from "../framework/sandbox-slide";

let EXPECTED_TEXT = "Length: 3\n1\n2\n3";

class TypesExercise extends SandboxSlide {
  validateContext(context) {
    return context.document.body.innerText == EXPECTED_TEXT
  }
}

export default TypesExercise;
