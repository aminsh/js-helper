var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify');

gulp.task('concat', function () {
    gulp.src('src/*.js')
        .pipe(concat('jshelper.bundle.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('concatAndUglify', function () {
    gulp.src('src/*.js')
        .pipe(concat('jshelper.bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('bundle-kendo', function () {
    return browserify({
        entries: "./src/kendo/kendoAndPersianDate/index",
        debug: true
    })
        .bundle()
        .pipe(gulp.dest('./dist/kendo.all.persian.js'));
});

gulp.task('default', ['concat', 'concatAndUglify']);