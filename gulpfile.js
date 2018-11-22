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

gulp.task('scripts', function (cb) {
  pump([
    gulp.src(['./docs/js/main.js', './docs/js/marked.js', './docs/js/jquery-3.3.1.min.js']),
    concat('docs.js'),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest('./build/js/'),
    browserSync.reload({ stream: true }),
  ],
    cb
  );
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

gulp.task('md', function () {
  gulp.src('./docs/markdown-content.md')
    .pipe(gulp.dest('./build/'));
});

gulp.task('img', function () {
  gulp.src('./docs/img/**/*.*')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('build', ['html', 'md', 'styles', 'scripts', 'img'])

// Run all Gulp tasks and serve application
gulp.task('default', ['serve', 'build'], function () {
  gulp.watch('docs/scss/**/*.scss', ['styles']);
  gulp.watch('docs/*.html', browserSync.reload);
  gulp.watch('docs/js/**/*.js', browserSync.reload);
});