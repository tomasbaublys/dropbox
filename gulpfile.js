const {
  src,
  dest,
  series,
  watch,
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

function html() {
  return src('src/**.html', 'src/parts/**.html')
    .pipe(include({
      prefix: '@@',
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('dist'))
}

function reset() {
  return src('src/styles/**.css')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(csso())
    .pipe(concat('reset.css'))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/styles/**.scss', 'src/styles/**.css')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function js() {
  return src('src/js/**.js')
    .pipe(dest('dist'))
}

function img() {
  return src('src/img/**.{png,jpg,jpeg}')
    .pipe(dest('dist/img'))
}

function fonts() {
  return src('src/fonts/**.{ttf,woff,eof,svg}')
    .pipe(dest('dist/fonts'))
}


function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/parts/**.html', series(html)).on('change', sync.reload)
  watch('src/styles/**.{scss,css}', series(scss)).on('change', sync.reload)
  watch('src/js/**.js', series(js)).on('change', sync.reload)
  watch('src/img/**.{png,jpg,jpeg}', series(img)).on('change', sync.reload)
  watch('src/img/**.{ttf,woff,eof,svg}', series(fonts)).on('change', sync.reload)
}

exports.start = series(html, reset, scss, js, img, fonts, serve);