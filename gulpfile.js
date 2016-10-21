'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-clean-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./docs/"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('images', function () {
    gulp.src('docs/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('docs/images/'));
});

gulp.task('styles', function () {
    gulp.src(['docs/scss/style.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('docs/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('docs/css/'))
        .pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function () {
//     return gulp.src('docs/js/**/*.js')
//         .pipe(plumber({
//             errorHandler: function (error) {
//                 console.log(error.message);
//                 this.emit('end');
//             }
//         }))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('docs/js/'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(uglify())
//         .pipe(gulp.dest('docs/js/'))
//         .pipe(browserSync.reload({stream: true}))
// });

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("docs/scss/**/*.scss", ['styles']);
    gulp.watch("docs/js/**/*.js");
    // gulp.watch("docs/js/**/*.js", ['scripts']);
    gulp.watch("*.html", ['bs-reload']);
});
