module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        'lib/angular/angular.js',
        'http://maps.googleapis.com/maps/api/js?sensor=false&language=en',
        'lib/angular-mocks/angular-mocks.js',
        'lib/angular-route/angular-route.js',
        'lib/lodash/dist/lodash.underscore.js',
        'lib/angular-google-maps/dist/angular-google-maps.min.js',
        'src/js/app.js',
        'src/js/**/*.js',
        'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-coverage'
    ],

    preprocessors: {
      'src/**/*.js': 'coverage'
    },

    reporters: ['junit', 'dots', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'tmp/coverage/'
    },

    junitReporter : {
      outputFile: 'tmp/junit/unit.xml',
      suite: 'unit'
    }
  });
};
