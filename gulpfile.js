var gulp = require('gulp'),
 less = require('gulp-less'),
 path = require('path');
 LessAutoprefix = require('less-plugin-autoprefix'),
 minify = require('gulp-minify-css'),
 watch = require('gulp-watch'),
 browserSync = require('browser-sync').create(),
 runSequence = require('run-sequence');
 gulpConfig = require('./gulpConfig');
 fs = require('fs');

//will add css vendor prefixes for specified browsers
var autoprefix = new LessAutoprefix({ browsers: 'last 30 versions, ' + gulpConfig.settings.autoPrefixVersions.join(',') });

var reload = browserSync.reload;

var flags = {
	minify: false
};

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: {
      target: gulpConfig.settings.remoteURL
    },
    rewriteRules: [
      {
        // Inject Local CSS at the end of HEAD
        match: /<\/head>/i,
        fn: function(req, res, match) {
          var localCssAssets = '';
          if(fs.existsSync(__dirname + '/' + gulpConfig.localPath + '/css/'))
          {
            //bring in all css in directory
            localCssAssets += fs.readdirSync(__dirname + '/' + gulpConfig.localPath + '/css/').map(css => 
                '<link rel="stylesheet" type="text/css" href="'  + gulpConfig.localPath + '/css/' + css + '"/>'
              ).join('');
          }
          //disable all old css assets
          localCssAssets += '<script>$(document).ready(function() {$("' + gulpConfig.disableCss.map(link => 'link[href=\'' + link + '\']').join(',') + '").prop(\'disabled\', true);});</script>';
          return localCssAssets + match;
        }
      },
      {
        // Inject Local JS at the end of BODY
        match: /<\/body>/i,
        fn: function(req, res, match) {
          var localJsAssets = '';
          if(fs.existsSync(__dirname + '/' + gulpConfig.localPath + '/js/'))
          {
            localJsAssets += fs.readdirSync(__dirname + '/' + gulpConfig.localPath + '/js/').map(js => 
                '<script type="text/javascript" src="'  + gulpConfig.localPath + '/js/' + js + '"></script>'
              ).join('');
          }
          return localJsAssets + match;
        }
      }
    ],
    serveStatic: [{
      route: gulpConfig.localPath,
      dir: gulpConfig.injectDir
    }],
    watchTask: true
  });
});

gulp.task('less_compile', function() {
	return gulp.src('./src/*.less')
	.pipe(less(
				{
					paths:[path.join('./src', 'less', 'includes')], 
					plugins:[autoprefix]
				}
		)
	)
  .pipe(gulp.dest('./dist/css/'));
 
});

gulp.task('less_minify_complete', ['less_minify'], function() {
  reload("*.css");
});

gulp.task('less_compile_complete', ['less_compile'], function() {
  reload("*.css");
});

gulp.task('less_minify', function() {
	return gulp.src('./src/*.less')
	.pipe(less(
				{
					paths:[path.join('./src', 'less', 'includes')], 
					plugins:[autoprefix]
				}
		)
	)
	.pipe(minify({keepSpecialComments : 0}))	
  .pipe(gulp.dest('./dist/css/'));  	
  
});

gulp.task('watch', function() {
	gulp.watch('src/uol/**/*.less', ['less_compile_complete']); 
});

gulp.task('watch_minify', function() {
	gulp.watch('src/uol/**/*.less', ['less_minify_complete']); 
});

gulp.task('default', ['watch', 'less_compile_complete', 'browserSync']);

gulp.task('default-minify', ['watch_minify','less_minify_complete', 'browserSync']);

gulp.task('minify', function () {
  flags.minify = true;
});

gulp.task('build', ['less_compile']);

gulp.task('build-minify', ['less_minify']);