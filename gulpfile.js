var path       = require('path');
var gulp       = require('gulp');
var connect    = require('gulp-connect');
var open       = require('gulp-open');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');

gulp.task('open', function () {
  gulp.src(__filename)
        .pipe(open({ uri: 'http://localhost:8080' }))
});

gulp.task('connect', function () {
  connect.server({
    root: path.resolve('./'),
    livereload: true
  });
});

gulp.task('browserify', function () {
  var b = browserify({
    entries: ['./js/main.js']
  });

  return b.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(connect.reload())
            .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./js/**/*.js', ['browserify']);
});

gulp.task('serve', ['connect', 'open', 'watch']);
