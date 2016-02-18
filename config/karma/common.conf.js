module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: "../../",
    browserify: {
      configure: function(bundler) {
        bundler.once("prebundle", function() {
          bundler.transform("babelify", { presets: ["es2015"] });
        });
      },
      debug: true
    },
    browsers: ["PhantomJS"],
    captureTimeout: 60000,
    colors: true,
    exclude: [],
    frameworks: ["browserify", "jasmine"],
    logLevel: config.LOG_INFO,
    plugins: [
      "karma-browserify",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher"
    ],
    port: 9876,
    preprocessors: {
      "src/js/**/test/**/*.js": ["browserify"],
      "test/**/*.js": ["browserify"]
    },
    reporters: ["dots"],
    runnerPort: 9100,
    singleRun: false
  });
};
