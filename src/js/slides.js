import HelloWorld from "./slides/hello-world";
import HelloWorldJsFiddle from "./slides/hello-world-jsfiddle";

let slides = [
  HelloWorld,
  HelloWorldJsFiddle,
];

let Slides = {};
for(let i = 0; i < slides.length; ++i) {
  Slides[slides[i].name] = slides[i];
}

export default Slides;
