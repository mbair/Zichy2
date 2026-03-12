// Karma configuration for Angular CLI test runs.
module.exports = function (config) {
    const defaultBrowser = process.env.KARMA_BROWSER || 'ChromeHeadless';
    let specReporterPlugin = null;

    try {
        specReporterPlugin = require('karma-spec-reporter');
    } catch {
        specReporterPlugin = null;
    }

    const plugins = [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
    ];

    if (specReporterPlugin) {
        plugins.push(specReporterPlugin);
    }

    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins,
        client: {
            jasmine: {
            },
            clearContext: false
        },
        jasmineHtmlReporter: {
            suppressAll: true
        },
        specReporter: {
            suppressPassed: false,
            suppressSkipped: true
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/nfc-reserve'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        reporters: specReporterPlugin ? ['spec', 'kjhtml'] : ['kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--remote-debugging-port=9222'
                ]
            }
        },
        browsers: [defaultBrowser],
        singleRun: false,
        restartOnFileChange: true
    });
};
