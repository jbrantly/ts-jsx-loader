var reactTools = require('react-tools')
var path = require('path')
var fs = require('fs')
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
  var fileIdentifier = escapeStringRegexp((query.identifier && (query.identifier + "File")) || "React.jsxFile");
  
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
  
  var replaceFile = function (match, filename) {
    var filepath = path.join(that.context, filename);
    var jsx = fs.readFileSync(filepath, "utf8");
    if (!jsx) {
      that.emitError('JSX file not found: ' + filepath + '\n\n')
      return match;
    }
    
    try {
      var reactCode = reactTools.transform(jsx, reactToolsOptions)
    }
    catch (ex) {
      that.emitError('Problem transforming the following: ' + filename + '\n' + jsx + '\n\n' + ex)
      return match;
    }
    return '(' + reactCode + ')'
  };
  
  return content
    .replace(new RegExp(identifier + '\\(`([^`\\\\]*(\\\\.[^`\\\\]*)*)`\\)', 'gm'), replace) // using template strings
    .replace(new RegExp(identifier + '\\(\\/\\*((.|[\\r\\n])*?)\\*\\/\\)', 'gm'), replace) // using multiline comments
    .replace(new RegExp(fileIdentifier + '\\([\"\']([^\"\']*?)[\"\']\\)', 'gm'), replaceFile) // using files
    .replace(/\/\*jsx\*\/((.|[\r\n])*?)\/\*jsx\*\//gm, replace); // using jsx comments
}
