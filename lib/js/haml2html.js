(function() {
    'use strict';

    var fs =                require('fs'),
        chalk =             require('chalk'),
        util =              require('util');

    var template = fs.readFileSync(
        __dirname + '/../templates/template.js',
        'utf8'
    );

    module.exports = function createHaml2HtmlPreprocessor() {
        return function(content, file, done) {
            file.path = file.path + '.js';
            require('child_process').exec(
                'haml ' + file.originalPath,
                function(err, stdout, stderr) {
                    if (err) {
                        console.log(chalk.bold(chalk.red(stderr)));
                        process.exit(1);
                    }
                    done(
                        util.format(
                            template,
                            file.originalPath.split('/').pop(),
                            stdout.replace(/'/g, '\\\'').replace(/[\n\r]/g, ' ')
                        )
                    );
                }
            );
        };
    };
})();
