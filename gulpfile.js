var gulp = require('gulp'),
    w3cjs = require('gulp-w3cjs'),
    uglify = require("gulp-uglify"),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    ngmin = require("gulp-ngmin"),
    minifycss = require('gulp-minify-css'),
    changed = require('gulp-changed');

var js_vendor_files = [
    "bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js",
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/jquery-ui/jquery-ui.min.js",
    "bower_components/jquery-ui/ui/sortable.js",
    "bower_components/angular/angular.min.js",
    "bower_components/angular-facebook/lib/angular-facebook.js",
    "bower_components/angular-translate/angular-translate.min.js",
    "bower_components/angular-bootstrap/ui-bootstrap.min.js",
    "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    'bower_components/lodash/dist/lodash.underscore.min.js',
    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
    "bower_components/bootstrap/dist/js/bootstrap.min.js",
    "bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "bower_components/angular-ui/build/angular-ui.min.js",
    "bower_components/angular-ui/modules/directives/sortable/sortable.js",
    "bower_components/angular-dialogs-service/dialogs.min.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js"
];

var css_vendor_files = [
    "bower_components/html5-boilerplate/css/normalize.css",
    "bower_components/html5-boilerplate/css/main.css",
    "bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/angular-dialogs-service/dialogs.min.css",
    "app/css/app.css"
];

gulp.task('w3c', function() {
    gulp.src('app/*.html')
        .pipe(w3cjs());
});

gulp.task('build', function() {
    gulp.src('src/**/*.js')
        .pipe(concat("ride-plan.js"))
        .pipe(changed("tmp/"))
        .pipe(gulp.dest("tmp/"))
        .pipe(ngmin())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('app/js/'));

    gulp.src(js_vendor_files, {base: 'bower_components/'})
        .pipe(concat("vendor.js"))
        .pipe(changed("tmp/"))
        .pipe(gulp.dest("tmp/"))
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));

    gulp.src(css_vendor_files)
        .pipe(concat("styles.css"))
        .pipe(changed("tmp/"))
        .pipe(gulp.dest("tmp/"))
        .pipe(minifycss())
        .pipe(gulp.dest('app/css/'));
});

gulp.task('start', ['build'], function() {
    gulp.src('app')
        .pipe(webserver({
            port: 8000,
            fallback: 'index.html',
            open: '#/'
        }));
});

gulp.task('test', function() {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    });
});