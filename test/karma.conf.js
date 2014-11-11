module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        'bower_components/angular/angular.js',
        'http://maps.googleapis.com/maps/api/js?sensor=false&language=en',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/lodash/dist/lodash.underscore.js',
        'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
        'src/app.js',
        'src/**/*.js',
        'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
