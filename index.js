var reactTools = require('react-tools')
var path = require('path')
var loaderUtils = require('loader-utils')

module.exports = function (content) {
  this.cacheable()

  var query = loaderUtils.parseQuery(this.query);
  if (query.harmony == undefined) { query.harmony = true }

  var that = this;

  var replace = function (match, jsx) {
    try {
      var reactCode = reactTools.transform(jsx, { harmony: query.harmony })
    }
    catch (ex) {
      that.emitError('Problem transforming the following:\n' + jsx + '\n\n' + ex)
      return match;
    }
    return '(' + reactCode + ')'
  };

  return content
    .replace(/React\.jsx\(`([^`\\]*(\\.[^`\\]*)*)`\)/gm, replace) // using template strings
    .replace(/React\.jsx\(\/\*((.|[\r\n])*?)\*\/\)/gm, replace) // using multiline comments
}