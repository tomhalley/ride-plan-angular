var gulp = require('gulp'),
    fs = require('fs'),
    w3cjs = require('gulp-w3cjs'),
    uglify = require("gulp-uglify"),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    ng_annotate = require('gulp-ng-annotate'),
    minifycss = require('gulp-minify-css'),
    bower = require('gulp-bower'),
    size = require('gulp-size'),
    rev = require('gulp-rev'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    run_sequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    jpegtran = require('imagemin-jpegtran');

var js_files = [
    "lib/jquery/dist/jquery.min.js",
    "lib/jquery-ui/ui/minified/core.min.js",
    "lib/jquery-ui/ui/minified/widget.min.js",
    "lib/jquery-ui/ui/minified/mouse.min.js",
    "lib/jquery-ui/ui/minified/sortable.min.js",
    "lib/angular/angular.min.js",
    "lib/angular-facebook/lib/angular-facebook.js",
    "lib/angular-translate/angular-translate.min.js",
    "lib/angular-bootstrap/ui-bootstrap-tpls.min.js",
    'lib/lodash/dist/lodash.underscore.min.js',
    'lib/angular-google-maps/dist/angular-google-maps.min.js',
    "lib/angular-ui-router/release/angular-ui-router.min.js",
    "lib/angular-ui/build/angular-ui.min.js",
    "lib/angular-dialogs-service/dialogs.min.js",
    "lib/angular-sanitize/angular-sanitize.min.js",
    'src/js/**/*.js'
];

var css_files = [
    "lib/bootstrap/dist/css/bootstrap.min.css",
    "lib/angular-dialogs-service/dialogs.min.css",
    "src/css/app.css"
];

gulp.task('install', function() {
    return bower('lib/')
        .pipe(gulp.dest('lib/'));
});

gulp.task('compile index.html', function () {
    var manifest = JSON.parse(fs.readFileSync('tmp/assets/rev-manifest.json', 'utf8'));

    return gulp.src('src/index.html')
        .pipe(handlebars(manifest, {
            helpers: {
                assetPath: function (path, context) {
                    return ['js', context.data.root[path]].join('/');
                }
            }
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app/'));
});

gulp.task('move partials/', function() {
    return gulp.src('src/partials/**/*.html')
        .pipe(gulp.dest('app/partials/'));
});

gulp.task('compress jpgs', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))
        .pipe(gulp.dest('app/img/'));
});

gulp.task('build app.js', function() {
    return gulp.src(js_files)
        .pipe(concat("app.js"))
        .pipe(ng_annotate())
        .pipe(uglify({mangle: false}))
        .pipe(rev())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('app/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('tmp/assets/'));
});

gulp.task('build styles.css', function() {
    return gulp.src(css_files)
        .pipe(concat("styles.css"))
        .pipe(minifycss())
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('build', function() {
    return run_sequence(
        'install',
        ['build app.js', 'build styles.css'],
        ['move partials/', 'compress jpgs'],
        'compile index.html');
});

gulp.task('start', function() {
    return gulp.src('app')
        .pipe(webserver({
            port: 8000,
            fallback: 'index.html',
            open: '#/'
        }));
});

gulp.task('w3c', function() {
    return gulp.src('app/*.html')
        .pipe(w3cjs());
});

gulp.task('run-karma', function() {
    return karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    });
});

gulp.task('test', function() {
    return run_sequence('build', 'w3c', 'run-karma');
});