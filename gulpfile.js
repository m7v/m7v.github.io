const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const image = require('gulp-image');
const cssMinify = require('gulp-more-css');
const uncss = require('gulp-uncss');
const cssShorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('copy', function () {
  gulp.src('./src/video/background.mp4')
    .pipe(gulp.dest('./dist/video'));

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/index.hmtl')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/pwa_icon.png')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/README.md')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/sw.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('image', function () {
  gulp.src('src/img/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('cssShort', function() {
  return gulp.src('./src/css/main.css')
    .pipe(uncss({
      html: ['./src/index.html']
    }))
    .pipe(cssShorthand())
    .pipe(cssMinify())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sprite', () => {
  const spriteData = gulp.src('src/img/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));

  return spriteData.pipe(gulp.dest('dist/img/'));
});

gulp.task('default', ['copy', 'image', 'sprite', 'cssShort']);
