var  isOpened = false;
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemap = require('gulp-sourcemaps'),
    minify = require('gulp-uglify'),
    sequence = require('gulp-sequence'),
    del = require('del'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    server = require('gulp-connect');
let bower = 'bower_components',
    source = 'source',
    public = 'public';


gulp.task('library' ,function(){
    gulp.src([bower + '/jquery/dist/jquery.js',
        bower + '/underscore/underscore.js',
        bower + '/backbone/backbone.js',
        bower + '/backbone.marionette/lib/backbone.marionette.js'
    ])
      .pipe(sourcemap.init())
      .pipe(concat('lib.js'))
      .pipe(sourcemap.write())
    //   .pipe(minify())
      .pipe(gulp.dest(public))
});

gulp.task('scripts' ,function(){
    gulp.src(source + '/js/*.js')
      .pipe(concat('bundel.js'))
      .pipe(gulp.dest(public));
});

gulp.task('index' ,function(){
    gulp.src(source + '/index.html')
      .pipe(gulp.dest(public));
});

gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del.sync(public);
});

gulp.task('bootstrap' ,function(){
    gulp.src([bower + '/bootstrap/dist/css/bootstrap.css'])
      .pipe(gulp.dest(public + '/styles'))
});

gulp.task('styles1' ,function(){
    gulp.src(source + '/styles/*.sass')
      .pipe(concat('style.sass'))
      .pipe(sass())
      .pipe(rename('style.css'))
      .pipe(gulp.dest(public + '/styles'))
});

gulp.task('open', function(){
    server.server({
        root: public ,
        livereload: true
    })
  });

gulp.task('reload', function(){
    gulp.src(source + '/index.html')
    .pipe(server.reload());
});

gulp.task('reloadScript', function(){
    setTimeout(function() {
        gulp.src(source + '/index.html')
        .pipe(server.reload());
    }, 1000);
});

gulp.task('default' ,sequence(['build'],'open'));

gulp.task('build' ,sequence('clean',['library' ,'index' ,'bootstrap' ,'styles1' ,'watch']));

gulp.task('watch', function () {
    gulp.watch([source + '/index.html'], ['index' ,'reload']);
    gulp.watch([source + '/js/*.js'], ['reloadScript']);
    gulp.watch([source + '/styles/*.sass'], ['styles1' ,'reload']);
  });

        