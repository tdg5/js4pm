# JavaScript for Product Managers

## Development

### Local Development

Setup the repo:

```bash
  git clone git@github.com:tdg5/js4pm.git
  cd js4pm
  npm install
```

The local development flow consists of two components:

  - `gulp watch` to monitor and rebuild as source files are changed.
  - `ws` light-weight HTTP server to serve up the website locally.

```bash
  # In one terminal:
  ./bin/gulp watch

  # In another terminal:
  ./bin/ws
```

And enjoy!

### Structure

- `src/` - The CSS, HTML, JS and image source files
- `build/` - The intermediary build dir. Similar to `dist` but JS is not minified.
Local server serves from this path.
- `dist/` - The final product for deployment. Similar to `build` except that JS is
minified.

- `src/css/entries` - Manifest files that the build process uses to assemble
smaller stylesheets into a single larger stylesheet for distribution.
- `src/js/entries` - Manifest files that the build process uses to assemble
smaller scripts into a single larger script for distribution.

- `src/html/index.html` - Kind of like the JS and CSS entry files, but the root
HTML document that pulls in other templates to compose the full web page.
- `src/html/templates/layouts/reveal.html` - The primary layout template. Home of
the `html`, `head`, and `body` tags.
- `src/html/templates/slides` - All the slides live here!

- `src/js/framework` - JS code that seems more particular to the notion of "slide
deck as a web app" rather than code particular to "JS4PMs".
- `src/js/slides.js` - Manifest of slide javascripts to load. Helps make loading
of slide javascripts more data driven.
- `src/js/slides` - JS for particular slides.
- `src/js/app` - JS that bridges the divide between the framework code and the
application code.

### The build process

The build process leverages gulp as a task runner. It's worth reading
`gulpfile.js` to get a sense of what tasks are defined and how they work. The
most important take aways are:

- The build process is responsible for transpiling the source ES6 into
  compatible ES5 using `babel`.
- The build process is responsible for making scripts installed through `npm`
  available to the more front-end oriented scripts. This process is handled by
  `browserify`. Browserify is what makes the nice ES6 `import` syntax possible.
  Browserify also makes it so that importing vendor scripts into this repo
  should be relatively unnecessary.

### Testing

There aren't a lot of tests, but testing is supported via `gulp test`. The
testing infrastructure is built with `karma` with `jasmine` as a testing
framework. It is encouraged that test files live close to the code they test.
For example, `src/js/framework/test/some-test.js` rather than
`src/js/test/some-test.js`. Linting is also part of the testing process, but the
configuration could probably use some love.
