'use strict';

class EscapedIncludeTag {
  static register(env) {
    env.addExtension(this.name, new this());
  }

  get tags() { return ['escapedInclude']; }

  parse(parser, nodes, lexer) {
    // get the tag token
    var tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  };

  run(context, templatePath) {
    var template = context.env.getTemplate(templatePath);
    var output = template.render();
    output = context.env.filters.escape(output);
    // Remove raw tags
    var rawMatcher = /{% +raw +%}\n?/;
    output = context.env.filters.replace(output, rawMatcher, "");
    // Remove raw tags
    var endrawMatcher = /{% +endraw +%}\n?/;
    output = context.env.filters.replace(output, endrawMatcher, "");
    output = context.env.filters.safe(output);
    return output;
  }
}

module.exports = EscapedIncludeTag;
