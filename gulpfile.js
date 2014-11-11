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
    "lib/jquery/dist/jquery.min.js",
    "lib/jquery-ui/jquery-ui.min.js",
    "lib/jquery-ui/ui/sortable.js",
    "lib/angular/angular.min.js",
    "lib/angular-facebook/lib/angular-facebook.js",
    "lib/angular-translate/angular-translate.min.js",
    "lib/angular-bootstrap/ui-bootstrap-tpls.min.js",
    'lib/lodash/dist/lodash.underscore.min.js',
    'lib/angular-google-maps/dist/angular-google-maps.min.js',
    "lib/angular-ui-router/release/angular-ui-router.min.js",
    "lib/angular-ui/build/angular-ui.min.js",
    "lib/angular-dialogs-service/dialogs.min.js",
    "lib/angular-sanitize/angular-sanitize.min.js"
];

var css_vendor_files = [
    "lib/bootstrap/dist/css/bootstrap.min.css",
    "lib/angular-dialogs-service/dialogs.min.css",
    "app/css/app.css"
];

gulp.task('install', function() {
    return bower('lib/')
        .pipe(gulp.dest('lib/'));
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