var assert = require("assert")
var fs = require('fs');
var path = require('path');
var jsxLoader = require('../index');

function runTests(tests, query) {
  
  var context = {
    cacheable: function() {},
    emitError: function() {},
    query: query
  }
  
  tests.forEach(function(f) {
    var filename = f + '.test';
    describe(filename, function() {
      it('should have the correct output', function(done){
        fs.readFile(path.join(__dirname, filename), {encoding: 'utf-8'}, function(err, testFile) {
          if (err) return done(err)
          fs.readFile(path.join(__dirname, filename+'.output'), {encoding: 'utf-8'}, function(err, outputFile) {
            if (err) return done(err)
            
            assert.equal(jsxLoader.call(context, testFile), outputFile);
            done();
          })
        })
      })
    })
  })
}

runTests([
  'comment',
  'error',
  'es5',
  'harmony',
  'jsx-comment',
  'stringtemplate',
  'dollar-brace'
])

runTests([
  'identifier'
], "?identifier=react.jsx")

runTests([
  'es3'
], "?target=es3")
