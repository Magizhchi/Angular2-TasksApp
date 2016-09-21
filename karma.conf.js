// Karma configuration
// Generated on Tue Jul 05 2016 10:47:26 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js',      
      'node_modules/rxjs/bundles/Rx.umd.js',
      'node_modules/angular2/bundles/angular2-all.umd.js',
      './test/client/**/*.js',
      './public/src/**/*.html',
      

      './public/src/tasks/app/tasks.service.js',
      './public/src/tasks/app/tasks.component.js',
      './public/src/tasks/main.js',
      './public/src/tasks/tasks.html',

      './public/src/users/app/users.service.js',
      './public/src/users/app/users-sort.pipe.js',
      './public/src/users/app/users.component.js',
      './public/src/users/main.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './public/src/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};