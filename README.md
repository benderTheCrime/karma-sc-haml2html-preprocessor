# Karma Haml2Html Preprocessor
This plugin is heavily based on [karma-html2js-preprocessor](https://github.com/karma-runner/karma-html2js-preprocessor). I do not recommend using it for your own purposes, but if you care to, knock yourself out. It takes in all HAML files and preprocesses them into HTML, which is then stored in `window.__hamlTemplates__`.

This README assumes knowledge of Karma.

To use, first install the plugin with
```bash
npm install karma-sc-haml2-html-preprocessor
```

Then, in your karma configuration:
```javascript
{
    preprocessors: {
        '**/*.haml': 'sc-haml2html'
    }
}
```

### TODO
* tests
* jshint
* jscs
