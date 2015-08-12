/**************************************************************************************************************
*
* GulpFile.js
*
**************************************************************************************************************/

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    php = require('gulp-connect-php'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    minifyCss = require('gulp-minify-css');


gulp.task('reload', ['build'], browserSync.reload);

gulp.task('php', function() {
    php.server({ base: './', port: 8010, keepalive: true});
});

gulp.task('css', function() {
    gulp.src('./css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));

    gulp.src('./css/*.css')
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['css'], function () {
  browserify({
    entries: './js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('server',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('default', ['build', 'server'], function(){

});