var nunjucksEscapedInclude = require("./nunjucks/escaped-include-tag"),
  nunjucksRender = require("gulp-nunjucks-render"),
  nunjucksGulp = {};

function environmentManager(env) {
  nunjucksEscapedInclude.register(env);
}

function pipe(config) {
  config = config || {};
  return nunjucksRender({
    manageEnv: environmentManager,
    path: config.templateDir,
  });
}

module.exports = pipe;
