'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserify = require('gulp-browserify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/'));
});

gulp.task('serve', function() {
    //1. serve with default settings
    var server = gls.static('./'); //equals to gls.static('public', 3000);
    server.start();
});

gulp.task('sass:watch', function () {
    gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('browserify', function(){
    return gulp.src('./test.js')
    .pipe(browserify())
        .pipe(gulp.dest('./test.b.js'));
});

gulp.task('test', function () {
    return gulp
        .src('test/runner.html')
        .pipe(mochaPhantomJS());
});