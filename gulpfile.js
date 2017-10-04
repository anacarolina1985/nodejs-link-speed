(function () {
  'use strict';
  (function () {
    'use strict';
    var gulp     = require('gulp');
    var stylus   = require('gulp-stylus');
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var uglify   = require('gulp-uglify');
    var gutil    = require('gulp-util');

    gulp.task('compress-js', compileJS);

    gulp.task('default',["compress-js"],function() {
      gulp.watch( './frontend/modules/**/**/**/**',["compress-js"]);
    });

    function compileJS() {
        return gulp.src('./frontend/modules/**/*.js')
              .pipe(uglify({mangle: false}).on('error', gutil.log))
              .pipe(gulp.dest('./frontend/statics/js/'));
    }

  })();

}());
