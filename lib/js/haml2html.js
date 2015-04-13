(function() {
    'use strict';

    var fs =    require('fs'),
        util =  require('util'),
        exec =  require('child_process').exec;

    var template = fs.readFileSync(
        __dirname + '/../templates/template.js',
        'utf8'
    );

    module.exports = function createHaml2HtmlPreprocessor() {
        return function(content, file, done) {
            file.path = file.path + '.js';

            console.log(__dirname);
            exec('haml ' + file.originalPath, function(err, stdout, stderr) {
                console.log(stderr);
                done(
                    util.format(
                        template,
                        file.originalPath.split('/').pop(),
                        stdout.replace(/'/g, '\\\'').replace(/[\n\r]/g, ' ')
                    )
                );
            });
        };
    };
})();
