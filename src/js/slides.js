import HelloWorld from "./slides/hello-world";
import HelloWorldJsFiddle from "./slides/hello-world-jsfiddle";
import Variables from "./slides/variables";

let slides = [
  HelloWorld,
  HelloWorldJsFiddle,
  Variables,
];

let Slides = {};
for(let i = 0; i < slides.length; ++i) {
  Slides[slides[i].name] = slides[i];
}

export default Slides;
