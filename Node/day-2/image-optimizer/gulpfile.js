import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import dotenv from 'dotenv';

dotenv.config();

gulp.task('compress', () => {
  return gulp.src(`${process.env.UPLOAD_DIR}/*.{jpg,jpeg,png}`)
    .pipe(imagemin())
    .pipe(rename({ suffix: '-compressed' }))
    .pipe(gulp.dest(process.env.COMPRESSED_DIR));
});

gulp.task('default', gulp.series('compress'));
