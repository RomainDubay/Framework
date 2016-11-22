// Gulp manager

var babel = require('gulp-babel'),
    cssnano = require('gulp-cssnano'),
    gulp = require('gulp'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    webpack = require('webpack-stream');

var config = require('./config.json'),
    webpackConfig = require('./webpack.config.js');

// Default task
gulp.task('default', config.tasks.default);

// Build tasks
gulp.task('build', config.tasks.build);

var style = config.css;
gulp.task('build:css', () => {
    var task = gulp.src(style.files.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(cssnano(style.options.cssNano))
        .pipe(gulp.dest(style.files.dest))
        .pipe(notify({
            title: 'Build CSS',
            message:'CSS compiled, Chief !',
        }));

    return task;
});

// var app = config.js;


gulp.task('build:js', () => {

    var task = gulp.src('./src/js/main.js')
        .pipe(webpack(webpackConfig, null, (err, stats) => {
            if (err) {
                throw new util.PluginError('webpack', err);
            }
        }))
        .pipe(gulp.dest('./public/js/'))
        .pipe(notify({
            title: 'Build JS',
            message:'JS compiled, Chief !',
        }));

    return task;
});


// Watchers
gulp.task('watch', config.tasks.watch );

gulp.task('watch:css',() => {
	return gulp.watch(config.css.watch,['build:css']);
});

gulp.task('watch:js',function() {
    return gulp.watch(config.js.watch,['build:js']);
});





