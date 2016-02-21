var pkg = require("../package.json");

var pkgFiles = {
  /* don't need to include anything, browserify should handle it via ES6 imports */
  build: [],
  karma: [
  ],
  "karma-build-exclude": [
  ],
  "karma-build": [
    "@karma",
    "@build",
    "@karma-tests"
  ],
  "karma-tests": [
    "test/**/*-test.js",
    "src/js/**/test/**/*-test.js"
  ]
};

if (exports) {
  exports.files = pkgFiles;
  exports.mergeFilesFor = function() {
    var files = [];

    Array.prototype.slice.call(arguments, 0).forEach(function(filegroup) {
      pkgFiles[filegroup].forEach(function(file) {
        // replace @refs
        var match = file.match(/^\@(.*)/);
        if (match) {
          files = files.concat(pkgFiles[match[1]]);
        } else {
          files.push(file);
        }
      });
    });

    return files;
  };
}
