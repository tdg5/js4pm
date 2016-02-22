import HelloWorld from "./slides/hello-world";

let slides = [
  HelloWorld,
];

let Slides = {};
for(let i = 0; i < slides.length; ++i) {
  Slides[slides[i].name] = slides[i];
}

export default Slides;
