(function() {
    'use strict';

    var gulp =      require('gulp'),
        jshint =    require('gulp-jshint'),
        jscs =      require('gulp-jscs'),
        mocha =     require('gulp-mocha'),
        chalk =     require('chalk');

    var bold = chalk.bold,
        src = 'lib/**/*.js',
        test = 'test/spec/lib/js/**/*.spec.js';

    gulp.task('jshint', function() {
        onMessage([ 'Running JSHint for', test ].join(' '));
        return gulp.src(src)
            .pipe(jshint()
            .on('error', onErr))
            .pipe(jshint.reporter('default', { verbose: true }))
            .pipe(jshint.reporter('fail'));
    });
    gulp.task('jscs', [ 'jshint' ], function() {
        onMessage([ 'Running JSCS for', src ].join(' '));
        return gulp.src(src)
            .pipe(jscs({
                configPath: '.jscsrc'
            }).on('error', onErr));
    });
    gulp.task('mocha', [ 'jscs' ], function () {
        onMessage([ 'Running Mocha Tests for', test ].join(' '));
        return gulp.src(test)
            .pipe(mocha({ reporter: 'nyan' })
            .once('error', onErr));
    });
    gulp.task('watch', [ 'mocha' ], function() {
        gulp.watch([ test ], [ 'mocha' ]);
    });
    gulp.task('default', [ 'mocha' ]);

    function onMessage(m, e) {
        console.log(chalk[ e ? 'red' : 'green' ](bold(m)));
    }

    function onErr(e) {
        onMessage(e, true);
        process.exit(1);
    }
})();
