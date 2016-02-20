var gulp = require('gulp'),
	concat = require('gulp-concat')
	
gulp.task('watch-app', ['ts', 'concat'], function() {
	gulp.watch('public/app/**/*.ts', ['ts']);
	gulp.watch('public/app/**/*.js', ['concat']);
})

gulp.task('concat', function() {
	gulp.src('public/app/**/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('public/'))
});