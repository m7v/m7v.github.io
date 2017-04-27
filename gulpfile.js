const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const image = require('gulp-image');
const cssMinify = require('gulp-more-css');
const uncss = require('gulp-uncss');
const cssShorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');

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
      html: ['index.html']
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

gulp.task('default', ['image', 'sprite', 'cssShort']);
