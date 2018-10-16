var gulp = require('gulp'),
    concat = require('gulp-concat');
 
gulp.task('default', function() {
  return gulp.src('scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/'));
});