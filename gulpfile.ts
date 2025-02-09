const gulp = require('gulp')
const ts = require('gulp-typescript')
const copy = require('gulp-copy')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const tsProject = ts.createProject('tsconfig.json')

// Task to compile TypeScript files
gulp.task('scripts', () => {
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('dist'))
})

// Task to copy views to the dist directory
gulp.task('copy-views', () => {
  return gulp.src('src/views/**/*').pipe(gulp.dest('dist/views'))
})

// Task to copy public assets to the dist directory
gulp.task('copy-public', () => {
  return gulp.src('public/**/*').pipe(gulp.dest('dist/public'))
})

// Task to process JavaScript files with Babel and Uglify
gulp.task('process-js', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist'))
})

// Watch task to monitor changes in source files
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.series('scripts'))
  gulp.watch('src/views/**/*', gulp.series('copy-views'))
  gulp.watch('public/**/*', gulp.series('copy-public'))
  gulp.watch('src/**/*.js', gulp.series('process-js'))
})

// Build task to run all tasks in sequence
gulp.task(
  'build',
  gulp.series('scripts', 'copy-views', 'copy-public', 'process-js')
)

// Default task to run the build task
gulp.task('default', gulp.series('build'))
