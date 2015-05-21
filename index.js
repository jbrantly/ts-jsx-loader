var reactTools = require('react-tools')
var path = require('path')
var loaderUtils = require('loader-utils')
var escapeStringRegexp = require('escape-string-regexp');

module.exports = function (content) {
  this.cacheable()

  var query = loaderUtils.parseQuery(this.query);
  
  var reactToolsOptions = {
    harmony: query.harmony == undefined ? true : query.harmony
  }
  
  if (query.target) reactToolsOptions.target = query.target;
  
  var identifier = escapeStringRegexp(query.identifier || "React.jsx");
  
  var that = this;

  var replace = function (match, jsx) {
    try {
      var reactCode = reactTools.transform(jsx, reactToolsOptions)
    }
    catch (ex) {
      that.emitError('Problem transforming the following:\n' + jsx + '\n\n' + ex)
      return match;
    }
    return '(' + reactCode + ')'
  };

  var dollarBraceReplace = function (match, jsx) {
    jsx = jsx.replace(/\$\{(.*?)\}/gm, "{$1}");
    return replace(match, jsx);
  };

  return content
    .replace(new RegExp(identifier + '\\(\\s*?`([^`\\\\]*(\\\\.[^`\\\\]*)*)`\\s*?\\)', 'gm'), dollarBraceReplace) // using template strings
    .replace(new RegExp(identifier + '\\(\\/\\*((.|[\\r\\n])*?)\\*\\/\\)', 'gm'), replace) // using multiline comments
    .replace(/\/\*jsx\*\/((.|[\r\n])*?)\/\*jsx\*\//gm, replace); // using jsx comments
}
