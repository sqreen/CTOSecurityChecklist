var gulp = require('gulp');
var sass = require('gulp-sass');
var pump = require('pump');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var autoprefixer = require('gulp-autoprefixer');

// Tasks -------------------------------------------------------------------- >
gulp.task('styles', function () {
  gulp.src('./docs/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./docs/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function () {
  gulp.src('./docs/js/**/*.*')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: "./docs/"
    }
  });
});

gulp.task('html', function () {
  gulp.src('./docs/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./build/'));
});


gulp.task('img', function () {
  gulp.src('./docs/images/**/*.*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('fonts', function () {
  gulp.src('./docs/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build', ['html', 'styles', 'scripts', 'img', 'fonts'])

// Run all Gulp tasks and serve application
gulp.task('default', ['serve', 'build'], function () {
  gulp.watch('docs/scss/**/*.scss', ['styles']);
  gulp.watch('docs/*.html', browserSync.reload);
  gulp.watch('docs/js/**/*.js', browserSync.reload);
});