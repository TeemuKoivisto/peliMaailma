var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsconfig = require('../tsconfig.json'),
    config = require('../gulp.config');
    
gulp.task('ts', function() {
    var sourceTsFiles = [
        './public/app/**/*.ts',
        './typings/**/*.d.ts'];
    
    var compiledJs = gulp.src(sourceTsFiles)
            .pipe(tsc(tsconfig));
    
    return compiledJs.js
            .pipe(gulp.dest('./public/app'));
});

gulp.task('ts-lint', function() {
    var sourceTsFiles = [
    './public/app/**/*.ts',
    './typings/**/*.d.ts'];
    // ['./public/app/**/*.ts']
    return gulp.src(config.allTs)
        // .pipe(tslint())
        // // .pipe(tslint.report('verbose'))
        // .pipe(tslint.report('prose', {
            // emitError: false
        // }))
        .pipe(tslint({
            configuration: {
                "rules": {
                "align": [true,
                "parameters",
                "arguments",
                "statements"],
                "ban": false,
                "class-name": true,
                "comment-format": [true,
                "check-space",
                "check-lowercase"
                ],
                "curly": true,
                "eofline": true,
                "forin": true,
                "indent": [true, "spaces"],
                "interface-name": true,
                "jsdoc-format": true,
                "label-position": true,
                "label-undefined": true,
                "max-line-length": [true, 140],
                "member-access": true,
                "member-ordering": [true,
                "public-before-private",
                "static-before-instance",
                "variables-before-functions"
                ],
                "no-any": false,
                "no-arg": true,
                "no-bitwise": true,
                "no-conditional-assignment": true,
                "no-console": [true,
                "debug",
                "info",
                "time",
                "timeEnd",
                "trace"
                ],
                "no-construct": true,
                "no-constructor-vars": true,
                "no-debugger": true,
                "no-duplicate-key": true,
                "no-shadowed-variable": true,
                "no-duplicate-variable": true,
                "no-empty": true,
                "no-eval": true,
                "no-inferrable-types": false,
                "no-internal-module": true,
                "no-require-imports": true,
                "no-string-literal": true,
                "no-switch-case-fall-through": true,
                "no-trailing-comma": true,
                "no-trailing-whitespace": true,
                "no-unreachable": true,
                "no-unused-expression": true,
                "no-unused-variable": true,
                "no-use-before-declare": true,
                "no-var-keyword": true,
                "no-var-requires": true,
                "one-line": [true,
                "check-open-brace",
                "check-catch",
                "check-else",
                "check-whitespace"
                ],
                "quotemark": [true, "double", "avoid-escape"],
                "radix": true,
                "semicolon": true,
                "sort-object-literal-keys": true,
                "switch-default": true,
                "triple-equals": [true, "allow-null-check"],
                "typedef": [true,
                "call-signature",
                "parameter",
                "property-declaration",
                "variable-declaration",
                "member-variable-declaration"
                ],
                "typedef-whitespace": [true, {
                "call-signature": "nospace",
                "index-signature": "nospace",
                "parameter": "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace"
                }],
                "use-strict": [true,
                "check-module",
                "check-function"
                ],
                "variable-name": false,
                "whitespace": [true,
                "check-branch",
                "check-decl",
                "check-operator",
                "check-separator",
                "check-type"
                ]
                }
            }
        }))
        .pipe(tslint.report('prose'));;
});