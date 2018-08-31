var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint')

gulp.task('default', ['sass', 'lint'], function() {
  gulp.watch('src/styles/sass/**/*.scss', ['sass'])
  gulp.watch('src/**/*.js', ['lint'])
});

gulp.task('sass', function() {
  gulp.src('src/styles/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browers: ['last 2 versions']
    }))
    .pipe(gulp.dest('src/styles/css'));
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})
