var gulp = require('gulp'),
    w3cjs = require('gulp-w3cjs'),
    uglify = require("gulp-uglify"),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    ng_annotate = require('gulp-ng-annotate'),
    minifycss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    bower = require('gulp-bower'),
    size = require('gulp-size');

var js_vendor_files = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/jquery-ui/jquery-ui.min.js",
    "bower_components/jquery-ui/ui/sortable.js",
    "bower_components/angular/angular.min.js",
    "bower_components/angular-facebook/lib/angular-facebook.js",
    "bower_components/angular-translate/angular-translate.min.js",
    "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    'bower_components/lodash/dist/lodash.underscore.min.js',
    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
    "bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "bower_components/angular-ui/build/angular-ui.min.js",
    "bower_components/angular-dialogs-service/dialogs.min.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js"
];

var css_vendor_files = [
    "bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/angular-dialogs-service/dialogs.min.css",
    "app/css/app.css"
];

gulp.task('install', function() {
    return bower()
        .pipe(gulp.dest('bower_components/'));
});

gulp.task('build-vendor-js', function() {
    gulp.src(js_vendor_files, {base: 'bower_components/'})
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('build-app-js', function() {
    gulp.src('src/**/*.js')
        .pipe(concat("ride-plan.js"))
        .pipe(ng_annotate())
        .pipe(uglify({mangle: false}))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('build-css', function() {
    gulp.src(css_vendor_files)
        .pipe(concat("styles.css"))
        .pipe(minifycss())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('build', ['build-vendor-js', 'build-app-js', 'build-css']);

gulp.task('start', ['build'], function() {
    gulp.src('app')
        .pipe(webserver({
            port: 8000,
            fallback: 'index.html',
            open: '#/'
        }));
});

gulp.task('w3c', function() {
    gulp.src('app/*.html')
        .pipe(w3cjs());
});

gulp.task('test', ['w3c'], function() {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    });
});