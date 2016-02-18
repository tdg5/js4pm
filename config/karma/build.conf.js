var files = require("../files");
var commonConfig = require("./common.conf");

module.exports = function(config) {
  commonConfig(config);

  config.set({
    exclude: files.mergeFilesFor("karma-build-exclude"),
    files: files.mergeFilesFor("karma-build"),
  });
};
