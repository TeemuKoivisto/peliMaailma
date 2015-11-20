var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    
gulp.task('nodemon', function() {
	nodemon({
		script: 'index.js',
		ext: 'js html css',
		ignore: ['client/app/**/*.js', 'gulp', 'test', 'node_modules']
	})
})

