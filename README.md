# Karma Haml2Html Preprocessor
This plugin is heavily based on [karma-html2js-preprocessor](https://github.com/karma-runner/karma-html2js-preprocessor). It takes in all HAML files and preprocesses them into HTML, which is then stored in `window.__haml__`.

This README assumes knowledge of Karma.

To use, first install the HAML Ruby gem and plugin with
```bash
gem install bundler gemrat
gemrat haml
bundle install
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

###TODO
* Write more tests: currently the package only has one test, but it's a damn good test.
