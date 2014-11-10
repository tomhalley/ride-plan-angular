var gulp = require('gulp'),
    w3cjs = require('gulp-w3cjs'),
    uglify = require("gulp-uglify"),
    karma = require('karma').server,
    ngmin = require('gulp-ngmin'),
    concat = require('gulp-concat');

gulp.task('w3c', function() {
    gulp.src('app/*.html')
        .pipe(w3cjs());
});

gulp.task('build', function() {
    gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(concat("dist/build-file.js"))
        .pipe(gulp.dest(''));
});

gulp.task('start', function() {

});

gulp.task('test', function() {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    });
});