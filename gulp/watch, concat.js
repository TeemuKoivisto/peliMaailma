var gulp = require('gulp'),
	concat = require('gulp-concat')
	
gulp.task('watch-client', ['ts', 'concat'], function() {
	gulp.watch('client/app/**/*.ts', ['ts']);
	gulp.watch('client/app/**/*.js', ['concat']);
})

gulp.task('concat', function() {
	gulp.src('client/app/**/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('client/'))
});