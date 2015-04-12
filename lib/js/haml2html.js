(function() {
    'use strict';

    var fs =    require('fs'),
        util =  require('util'),
        exec =  require('child_process').exec;

    var template = fs.readFileSync(
        __dirname + '/../templates/template.coffee',
        'utf8'
    );

    module.exports = function createHaml2HtmlPreprocessor(config) {
        config = typeof config === 'object' ? config : {};
        var moduleName = config.moduleName || 'ngHaml2Js';

        return function(content, file, done) {
            var fileName = file.originalPath.split('/').pop();
            
            file.path = file.path + '.js';

            exec('haml ' + file.originalPath, function(err, stdout, stderr) {
                var x = util.format(
                    template,
                    fileName,
                    stdout.replace(/'/g, '\\\'').replace(/[\n\r]/g, ' ')
                );
                done(x);
            });
        };
    };
})();
