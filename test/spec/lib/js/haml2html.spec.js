(function() {
    'use strict';

    var haml =              require('../../../../lib/js/haml2html')(),
        child =             require('child_process'),
        simple =            require('simple-mock'),
        assert =            require('assert');

    describe('haml2html', function() {
        describe('test exec', function() {
            var file;
            beforeEach(function() {
                file = {
                    path: 'test',
                    originalPath: 'test/templates/test.haml'
                };
            });
            afterEach(function() {
                simple.restore();
            });
            it('exec', function() {
                haml('', file, simple.spy(function(x) {
                    assert.equal(
                        '(function(w) {\n' +
                        '    \'use strict\';\n\n' +
                        '    if (typeof(w.__haml__) === \'undefined\') {\n' +
                        '        w.__haml__ = {};\n' +
                        '    }\n' +
                        '    w.__haml__[\'test.haml\'] = ' +
                        '\'<div class=\\\'test\\\'></div> \';\n' +
                        '})(window);\n', x);
                }));

                assert.equal(file.path, 'test.js');
            });
            it('error', function() {
                var spy = simple.spy().returnWith(undefined);
                simple.mock(child, 'exec', function(i, o) {
                    o(true, '', 'test');
                });
                simple.mock(console, 'log').returnWith(undefined);
                simple.mock(process, 'exit').returnWith(undefined);
                haml('', file, spy);

                assert(child.exec.called);
                assert(process.exit.called);
            });
        });
    });
})();
