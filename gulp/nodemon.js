var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    
gulp.task('nodemon', ['watch-client'], function() {
    nodemon({
        script: 'index.js',
        ext: 'js html css',
        ignore: ['client/app/**/*.js', 'gulp', 'test', 'node_modules', 'client/bower_components']
    })
})

