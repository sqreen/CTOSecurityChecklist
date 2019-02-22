const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const autoprefixer = require('gulp-autoprefixer');

// Tasks -------------------------------------------------------------------- >
function styles() {
  return src('./docs/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('./docs/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS())
    .pipe(dest('./build/css/'))
    .pipe(browserSync.reload({ stream: true }));
};

function scripts() {
  return src('./docs/js/**/*.*')
    .pipe(dest('./build/js'));
};

function serve() {
  browserSync({
    server: {
      baseDir: "./docs/"
    }
  });
};

function html() {
  return src('./docs/index.html')
    .pipe(useref())
    .pipe(dest('./build/'));
};

function img() {
  return src('./docs/images/**/*.*')
    .pipe(dest('./build/images'));
};

function fonts() {
  return src('./docs/fonts/**/*.*')
    .pipe(dest('./build/fonts'));
};

exports.serve = parallel(serve, html, styles, scripts, img, fonts);
exports.default = parallel(html, styles, scripts, img, fonts);