///
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var copy = require('gulp-copy');
var bower = require('gulp-bower');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');

var config = {
   
    angularsrc: [
        'bower_components/angular/angular.min.js',
    ],
    angularbundle: 'app/js/external/angular.min.js',

    appsrc: [
        'app/js/sources/wheel-app.js',
    ],
    appbundle: 'app/js/internal/app.js',

    bootstrapsrc: [
        'bower_components/bootstrap/dist/js/bootstrap.min.js'    ],
    bootstrapbundle: 'app/js/external/abootstrap-bundle.min.js',

    jquerysrc: [
        'bower_components/jquery/dist/jquery.min.js'
    ],
    jquerybundle: 'app/js/external/jquery-bundle.min.js',

    bootstrapcss: 'bower_components/bootstrap/dist/css/bootstrap.css',
    boostrapfonts: 'bower_components/bootstrap/dist/fonts/*.*',

    appcss: 'app/styles/sources/main.css',
    cssout: 'app/styles/dist',
    fontsout: 'app/styles/fonts',

    internalsrc: 'app/js/internal',
    externalsrc: 'app/js/external'

}

gulp.task('clean-scripts', function (cb) {
    del.sync([config.jquerybundle,
              config.bootstrapbundle,
              config.angularbundle,
              config.appbundle], cb);
});

gulp.task('jquery-bundle', [ ], function () {
    return gulp.src(config.jquerysrc)
     .pipe(concat('jquery-bundle.min.js'))
     .pipe(gulp.dest(config.externalsrc));
});


gulp.task('bootstrap-bundle', [], function () {
    return gulp.src(config.bootstrapsrc)
     .pipe(concat('bootstrap-bundle.min.js'))
     .pipe(gulp.dest(config.externalsrc));
});

gulp.task('angular', [], function () {
    return gulp.src(config.angularsrc)
        .pipe(concat('angular-bundle.min.js'))
        .pipe(gulp.dest(config.externalsrc));
});

// Combine and the vendor files from bower into bundles (output to the scripts folder)
gulp.task('scripts', ['clean-scripts', 'jquery-bundle', 'bootstrap-bundle', 'angular'], function () {

});

// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function (cb) {
    del([config.cssout], cb);
});

gulp.task('css', [], function () {
    return gulp.src([config.bootstrapcss,config.appcss])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});

gulp.task('less', function() {
   gulp.src('app/styles/sources/*.less')
      .pipe(watch('app/styles/sources/*.less'))
      .pipe(less())
      .pipe(gulp.dest('app/styles/dist'))
      .pipe(livereload());
});
gulp.task('app', [ ], function () {
    return gulp.src('app/js/sources/*.js')
     .pipe(watch('app/js/sources/*.js'))
     .pipe(jshint())
     .pipe(jshint.reporter('default'))
     .pipe(gulp.dest(config.internalsrc))
     .pipe(livereload());
});


gulp.task('fonts', [], function () {
    return
    gulp.src(config.boostrapfonts)
        .pipe(gulp.dest(config.fontsout));
});

gulp.task('styles', ['clean-styles', 'css', 'fonts'], function () {

});

//Restore all bower packages
gulp.task('bower-restore', function () {
    return bower();
});

//Set a default tasks
gulp.task('default', ['scripts', 'styles'], function () {

});