import HelloWorld from "./slides/hello-world";
import HelloWorldJsFiddle from "./slides/hello-world-jsfiddle";
import Variables from "./slides/variables";
import HtmlExercise from "./slides/html-exercise";
import TypesExercise from "./slides/types-exercise";

let slides = [
  HelloWorld,
  HelloWorldJsFiddle,
  HtmlExercise,
  Variables,
  TypesExercise,
];

let Slides = {};
for(let i = 0; i < slides.length; ++i) {
  Slides[slides[i].name] = slides[i];
}

export default Slides;
