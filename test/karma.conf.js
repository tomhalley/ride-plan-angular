module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
        "lib/angular/angular.min.js",
        'lib/angular-mocks/angular-mocks.js',
        'http://maps.googleapis.com/maps/api/js?sensor=false&language=en',
        'app/js/app-*.js',
        'test/unit/**/*.js'
    ],
    frameworks: ['mocha', 'chai'],
    browsers: ['Firefox'],
    plugins: [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-mocha-reporter',
        'karma-mocha',
        'karma-chai',
        'karma-coverage'
    ],
    reporters: ['mocha', 'coverage'],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      type: 'html',
      dir: 'tmp/coverage/'
    },
    mochaReport: {
      ignoreSkipped: true
    }
  });
};
