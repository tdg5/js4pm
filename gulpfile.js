var babelify = require("babelify"),
  browserify = require("browserify"),
  cleanhtml = require("gulp-cleanhtml"),
  concat = require("gulp-concat"),
  del = require("del"),
  eslint = require("gulp-eslint"),
  globby = require("globby"),
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  karma = require("karma"),
  merge = require("merge-stream"),
  cleanCSS = require("gulp-clean-css"),
  nunjucksGulp = require("./util/nunjucks-gulp"),
  rename = require("gulp-rename"),
  source = require("vinyl-source-stream"),
  uglify = require("gulp-uglify");

var srcDir = "src/";

var config = {
  appFile: "app.js",
  buildDir: "build/",
  distDir: "dist/",
  srcDir: srcDir
};

// Build all the things!
gulp.task("build", ["build:copy", "build:css", "build:html", "build:js"]);

// Clean build directory
gulp.task("build:clean", function() {
  return del(["build/*", "dist/*"]);
});

// Copy files that don't require any build process
gulp.task("build:copy", function() {
  gulp.src(["src/images/*"]).
    pipe(gulp.dest("build/images"));
  return gulp.src("src/manifest.json").
    pipe(gulp.dest("build"));
});

// Build CSS
gulp.task("build:css", function() {
  return gulp.src("src/css/entries/*.css").
    pipe(cleanCSS({
      keepSpecialComments: 0,
      relativeTo: "",
      root: "",
    })).
    pipe(gulp.dest("build/css"));
});

// Build extension!
gulp.task("build:dist", ["build:dist:copy", "build:dist:js"]);

gulp.task("build:dist:copy", ["build"], function() {
  return gulp.src(["build/**/*"]).
    pipe(gulp.dest("dist"));
});

gulp.task("build:dist:js", ["build:js", "build:dist:copy"], function() {
  del(["dist/js/*"]);

  return gulp.src(["build/js/**/*.js"]).
    pipe(uglify()).
    on('error', gutil.log).
    pipe(gulp.dest("dist/js"));
});

// Compile and compress HTML files
gulp.task("build:html", function() {
  return gulp.src(["src/html/**/*.html", "!src/html/templates/**/*"])
  .pipe(nunjucksGulp({
    templateDir: srcDir + "html/templates",
  }))
  .pipe(cleanhtml())
  .pipe(gulp.dest("build"))
});

// Build the browserify bundle including the app
gulp.task("build:js", ["lint"], function(done) {
  function basename(filePath) {
    var components = filePath.split(/\//);
    return components[components.length - 1];
  }

  function bundleEntry(entryFile) {
    var bundle = browserify({
      debug: true,
      entries: entryFile
    });

    return bundle.
      transform("babelify", { presets: ["es2015"] }).
      bundle().
      pipe(source(basename(entryFile))).
      on("error", function(err) {
        gutil.log(err);
        this.emit("end");
      }).
      pipe(gulp.dest(config.buildDir + "js"));
  }
  var entries = globby.sync([config.srcDir + "js/entries/*.js"]),
    bundles = [],
    i;

  for (var i = 0; i < entries.length; ++i) {
    bundles.push(bundleEntry(entries[i]));
  }

  return merge.apply(this, bundles).
    on("alldone", done);
});

// Lint JS
gulp.task("lint", function() {
  return gulp.src("src/js/**/*.js").
    pipe(eslint()).
    pipe(eslint.format());
});

// Test for the more vanilla, transpiled build product.
gulp.task("test", ["lint"], function(done) {
  var opts = {
    configFile: __dirname + "/config/karma/build.conf.js",
    singleRun: true
  };
  new karma.Server.start(opts, done);
});

// Test task for situations where more introspection is needed.
gulp.task("test:chrome", ["lint"], function(done) {
  var opts = {
    autoWatch: true,
    browsers: ["Chrome"],
    configFile: __dirname + "/config/karma/build.conf.js"
  };
  new karma.Server.start(opts, done);
});

// Watch files and run tasks on changes
gulp.task("watch", function() {
  paths = [
    "config/**/*.js",
    "gulpfile.js",
    "src/**/*.*",
    "test/**/*.js"
  ];
  gulp.watch(paths, ["build"]);
});

gulp.task("default", ["test"]);
