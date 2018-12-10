const gulp = require('gulp')
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')
const pump = require('pump')
const dotenv = require('dotenv');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('del', [], () => {
    return del.sync(['dist/**'])
})

gulp.task('browserify', [], () => {
    return browserify('./js/app.js')
        .transform("babelify", {
            presets: ["es2015"]
        })
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(gulp.dest(__dirname + '/dist/js'))
})

gulp.task('compress', ['browserify'], (cb) => {
    const options = {
        mangle: false,
        compress: {
            conditionals: true,
            passes: 2,
            drop_console: true
        },
        warnings: false,
        ie8: false
    }

    pump([
        gulp.src(__dirname + '/dist/js/bundle.min.js'),
        uglify(options),
        gulp.dest(__dirname + '/dist/js')
    ], cb);
})

gulp.task('env', () => {
    const envirement = dotenv.config({
        path: '.env'
    });

    const env = "/* jshint strict: false */\r" +
        "var constants = angular.module('app.constant', []);\r" +
        "constants.constant('ENV'," + JSON.stringify(envirement.parsed) + ");";

    fs.writeFileSync('./js/constants.js', env);
});

gulp.task('style', () => {
    gulp.src('./css/*.css')
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({ debug: true, compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('index', () => {
    gulp.src('./index-release.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('templates', () => {
    gulp.src('./templates/**')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/templates'))
})

gulp.task('images', () => {
    gulp.src('./img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('public_files', () => {
    gulp.src('./public_files/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/public'))
})

gulp.task('fonts', () => {
    gulp.src('./fonts/**')
        .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('release', ['del', 'env', 'compress', 'style', 'templates', 'index', 'images', 'fonts', 'public_files'])
gulp.task('default', ['del', 'env', 'browserify', 'style', 'templates', 'index', 'images', 'fonts', 'public_files'], () => {
    gulp.watch('./js/**/*.js', ['browserify'])
    gulp.watch('./.env', ['env'])
    gulp.watch('./index-release.html', ['index'])
    gulp.watch('./css/*.css', ['style'])
    gulp.watch('./js/**/*.json', ['browserify'])
    gulp.watch('./templates/**', ['templates'])
})
