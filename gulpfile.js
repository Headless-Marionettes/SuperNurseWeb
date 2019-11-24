const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const mmq = require('gulp-merge-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');
const ts = require('gulp-typescript');

function serve() {
    return browserSync.init({
        server: {
            baseDir: '.'
        },
        open  : true,
        port  : 3000,
        watch : true
    });
}

function processJs() {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js/dist/'));
}

function processStyle() {
    return gulp.src('scss/**/*.scss') // Gets all files ending with .scss ./scss directory
        .pipe(sass())
        .pipe(mmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade             : false
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(cssmin())
        .pipe(sourcemaps.write())

        .pipe(gulp.dest('css'));
}

function minifyCss() {
    return gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
}

function watch() {
    gulp.watch('js/*.js', processJs);
    gulp.watch('scss/**/*.scss', processStyle);
    gulp.watch('js/*.ts', tst);
}

function tst() {
    return gulp.src('js/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('./js/'));
}


gulp.task('tst', tst);

gulp.task('serve', serve);

gulp.task('processJs', processJs);

gulp.task('processStyle', processStyle);

 gulp.task('minifyCss', minifyCss);

gulp.task('watch', watch);

gulp.task('default', gulp.series('processStyle', 'tst', gulp.parallel('serve', 'watch')));
