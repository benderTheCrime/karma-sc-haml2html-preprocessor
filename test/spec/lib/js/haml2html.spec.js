(function() {
    'use strict';

    var haml =              require('../../../../lib/js/haml2html')(),
        simple =            require('simple-mock'),
        assert =            require('assert');

    describe('haml2html', function() {
        describe('test exec', function() {
            afterEach(function() {
                simple.restore();
            });
            it('exec', function() {
                var file = {
                    path: 'test',
                    originalPath: 'test/templates/test.haml'
                };
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
        });
    });
})();
