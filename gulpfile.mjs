import * as dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import browserSyncLib from 'browser-sync';
import { deleteSync } from 'del';

const { src, dest, series, parallel, watch } = gulp;
const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

const paths = {
  html: 'src/*.html',
  styles: 'src/style/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
  images: 'src/img/**/*',
  icons: 'src/icons/**/*',
  dist: 'dist'
};

// Очистка
function clean(done) {
  deleteSync([paths.dist]);
  done();
}

// HTML
function html() {
  return src(paths.html)
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// Стили
function styles() {
  return src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('style.min.css'))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(browserSync.stream());
}

// Скрипты
function scripts() {
  return src(paths.scripts)
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Картинки
function images() {
  return src(paths.images)
    .pipe(dest(`${paths.dist}/img`))
    .pipe(browserSync.stream());
}

// Иконки
function icons() {
  return src(paths.icons)
    .pipe(dest(`${paths.dist}/icons`))
    .pipe(browserSync.stream());
}

// Сервер
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });
  watch(paths.html, html);
  watch(paths.styles, styles);
  watch(paths.scripts, scripts);
  watch(paths.images, images);
  watch(paths.icons, icons);
}

// Экспорт
export default series(
  clean,
  parallel(html, styles, scripts, images, icons),
  serve
);