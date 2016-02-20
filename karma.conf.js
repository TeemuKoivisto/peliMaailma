// Karma configuration
// Generated on Tue Oct 27 2015 21:06:49 GMT+0200 (Suomen normaaliaika)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      
		"public/bower_components/angular/angular.min.js",
		"public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
		"public/bower_components/jquery/dist/jquery.min.js",
		"public/bower_components/bootstrap/dist/js/bootsrap.min.js",

		'node_modules/angular-mocks/angular-mocks.js',

		"public/app/all.js",
		"test/**/*.js"
		],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		"public/app/all.js": ['coverage']
    },

	coverageReporter: {
		type: 'text'
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

	plugins : [
      'karma-phantomjs-launcher',
	  'karma-coverage',
      'karma-jasmine'
    ],
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
	browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
