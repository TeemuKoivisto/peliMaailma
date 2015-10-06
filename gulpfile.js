var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json');
    
gulp.task('ts', function() {
    var sourceTsFiles = [
        './public/app/**/*.ts',
        './typings/**/*.d.ts'];
    
    var compiledJs = gulp.src(sourceTsFiles)
            .pipe(tsc(tsconfig));
    
    return compiledJs.js
            .pipe(gulp.dest('./build'));
});