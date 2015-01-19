var fs = require('fs');
var path = require('path');
var jsxLoader = require('../index');

var context = {
    cacheable: function() {}
}

var files = fs.readdirSync(__dirname)
    .filter(function(f) { return path.extname(f) == '.test' })
    .forEach(function(f) {
     
        fs.readFile(path.join(__dirname, f), {encoding: 'utf-8'}, function(err, testFile) {
            if (err) return done(err)
            
            fs.writeFile(path.join(__dirname, f+'.output'), jsxLoader.call(context, testFile), {encoding: 'utf-8'});
        })
          
    })
