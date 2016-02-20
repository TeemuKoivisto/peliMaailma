var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    
gulp.task('nodemon', ['watch-app'], function() {
    nodemon({
        script: 'index.js',
        ext: 'js html css',
        ignore: ['public/app/**/*.js', 'gulp', 'test', 'node_modules', 'public/bower_components']
    })
})

