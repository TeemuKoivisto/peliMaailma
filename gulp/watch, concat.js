var gulp = require("gulp"),
  concat = require("gulp-concat");
  
gulp.task("watch-app", ["ts", "concat-js", "concat-css"], function() {
  gulp.watch("public/app/**/*.ts", ["ts"]);
  gulp.watch("public/app/**/*.js", ["concat-js"]);
  gulp.watch("public/app/**/*.css", ["concat-css"]);
})

gulp.task("concat-js", function() {
  gulp.src([
    "public/app/app.routes.js",
    "public/app/components/chess_ts/chess_square.service.js",
    "public/app/components/chess_ts/chess_igniter.service.js",
    "public/app/components/chess_ts/chess_engine.service.js",
    "public/app/components/chess/*.js",
    "public/app/components/tictactoe_ts/tictactoe_engine.service.js",
    "public/app/components/tictactoe_ts/tictactoe_ai.service.js",
    "public/app/components/tictactoe/*.js",
    "public/app/components/mod_ts/mod_creator.service.js",
    "public/app/components/mod_ts/mod_engine.service.js",
    "public/app/components/mod/*.js",
  ])
  .pipe(concat("all.js"))
  .pipe(gulp.dest("public/"))
});

gulp.task("concat-css", function() {
  gulp.src("public/app/**/*.css")
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("public/"))
});