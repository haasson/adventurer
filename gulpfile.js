const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const tinypng = require('gulp-tinypng-compress');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const smartgrid = require('smart-grid');

let isDev = process.argv.indexOf('--dev') !== -1;
let isSync = process.argv.indexOf('--unsync') !== -1;
let isProd = !isDev;

let jsFiles = [
   './src/js/jquery-3.2.1.slim.min.js',
   './src/js/magnific-popup.min.js',
   './src/js/slick.min.js',
   './src/js/main.js'
]

function styles() {
   return gulp.src('./src/sass/style.sass')
              .pipe(gulpif(isDev, sourcemaps.init()))
              .pipe(sass().on('error', sass.logError))
              .pipe(gcmq())
              .pipe(autoprefixer({
                 overrideBrowserslist: ['> 0.1%'],
                 cascade: false
              }))
              .pipe(gulpif(isProd, cleanCSS({
                 level: 2
              })))
              .pipe(gulpif(isDev, sourcemaps.write()))
              .pipe(gulp.dest('./build/css/'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function img() {
   return gulp.src('./src/img/**/*')
              .pipe(gulpif(isProd, tinypng({
                  key: 'ILGj6BYXCPvw7nOQJ2KZ3ufdgWdDQ3NS',
               })))
              .pipe(gulp.dest('./build/img'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function video() {
   return gulp.src('./src/video/*')
              .pipe(gulp.dest('./build/video'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function fonts() {
   return gulp.src('./src/fonts/*')
              .pipe(gulp.dest('./build/fonts'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function html() {
   return gulp.src('./src/**/*.html')
              .pipe(gulp.dest('./build'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function scripts() {
   return gulp.src(jsFiles)
              .pipe(gulpif(isDev, sourcemaps.init()))
              .pipe(concat('main.js'))
              .pipe(babel({
                  presets: ['@babel/env']
               }))
              .pipe(uglify({
                 toplevel: true
              }))
              .pipe(gulpif(isDev, sourcemaps.write()))
              .pipe(gulp.dest('./build/js'))
              .pipe(gulpif(!isSync, browserSync.stream()));
}

function grid(done) {
   delete require.cache[require.resolve('./src/smartgrid.js')];

   let settings = require('./src/smartgrid.js');
   smartgrid('./src/sass/', settings);
   done();
}

function watch() {
   if(!isSync) {
      browserSync.init({
         server: {
            baseDir: './build'
         }
      })
   }

   gulp.watch('./src/sass/**/*.+(sass|scss)', styles);
   gulp.watch('./src/img/**/*', img);
   gulp.watch('./src/video/**/*', video);
   gulp.watch('./src/js/**/*.js', scripts);
   gulp.watch('./src/*.html', html);
   gulp.watch('./src/fonts/**/*', fonts);
   gulp.watch('./src/smartgrid.js', grid);
}

function clean() {
   return del(['build/*'])
}

let build = gulp.series(
   clean, 
   gulp.parallel(styles, img, video, scripts, html, fonts)
)
   
gulp.task('del', clean);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);