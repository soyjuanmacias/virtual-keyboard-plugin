// Karma configuration
// Generated on Sat Nov 18 2017 14:45:54 GMT+0100 (CET)
const isparta = require('isparta');
// const istanbul = require('browserify-istanbul');
let browserifyBabellIstanbul = require('browserify-babel-istanbul');
var path = require('path');
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      // 'src/*.js',
      'test/*.spec.js'
    ],
    webpack: {
      module: {
        rules: [
          // instrument only testing sources with Istanbul
          {
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader'
            },
            include: path.resolve('src/components/')
          }
        ]
      }
    },
    browserify: {
      debug: true,
      bundleDelay: 1000,
      transform: [
        [
          'babelify',
          {
            ignore: /node_modules/
          }
        ],
        browserifyBabellIstanbul({
          // instrumenter: isparta, // <--module capable of reading babelified code
          ignore: ['**/node_modules/**', '**/client-libs/**']
        })
      ],
      extensions: ['.js']
    },
    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 'src/*.js': ['browserify'],
      'test/*.spec.js': ['browserify']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['jasmine-diff', 'progress', 'coverage'],
    coverageReporter: {
      reporters: [
        {
          type: 'text'
        },
        {
          type: 'html',
          dir: 'coverage',
          subdir: 'html'
        }, // generates ./coverage/lcov.info
        {
          type: 'lcovonly',
          subdir: '.'
        },
        // generates ./coverage/coverage-final.json
        {
          type: 'json',
          subdir: '.'
        }
      ]
    },

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
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
