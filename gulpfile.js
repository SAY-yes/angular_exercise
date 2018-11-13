var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

var reload = browserSync.reload;

var config = {
    baseDir: './',
    watchFiles: ['*.html', './css/*.css', './js/*.js']
};

// 静态服务器
gulp.task('server', ['sass', 'postcss'], function () {
    browserSync.init({
        files: config.watchFiles,
        server: {
            baseDir: config.baseDir
        },
        port: 8000
    });
    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./css/*.css", ['postcss']);
    gulp.watch("./script/*.js", ['js-uglify']);
    gulp.watch("./*.html").on('change', reload);
});

//给css添加前缀
gulp.task('postcss', function () {
    var processors = [
        autoprefixer({
            browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"]
        })
    ];

    return gulp.src('./css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest("./css"));
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});

// 处理完JS文件后返回流
gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./asset'));
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-uglify', ['js'], reload);

gulp.task('default', ['server']); //定义默认任务