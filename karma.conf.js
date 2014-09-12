module.exports = function(config) {

    config.set({

        basePath: 'dist/',

        frameworks: ['jasmine-given','jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../bower_components/jquery/dist/jquery.min.js',
            '../bower_components/angular/angular.min.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/jstree/dist/jstree.min.js',
            'ngJsTree.js',
            '../test/**/*.js'
        ],

        reporters: ['progress'],

        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};