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

gulp.task('browserSync',['less_deploy'], function() {
  browserSync.init({
    proxy: {
      target: gulpConfig.settings.remoteURL
    },
    rewriteRules: [
      {
        // Inject Local CSS at the end of HEAD
        match: /<\/head>/i,
        fn: function(req, res, match) {

          //bring in all css in directory
          localCssAssets = fs.readdirSync(__dirname + '/' + gulpConfig.localPath + '/non_minified/').map(css => 
              '<link rel="stylesheet" type="text/css" href="'  + gulpConfig.localPath + '/non_minified/' + css + '"/>'
            ).join('');

          //disable all old css assets
          localCssAssets += '<script>$(document).ready(function() {$("' + gulpConfig.disableCss.map(link => 'link[href=\'' + link + '\']').join(',') + '").prop(\'disabled\', true);});</script>';
          return localCssAssets + match;
        }
      },
      {
        // Inject Local JS at the end of BODY
        match: /<\/body>/i,
        fn: function(req, res, match) {
           localJsAssets = fs.readdirSync(__dirname + '/' + gulpConfig.localPath + '/js/').map(js => 
              '<script type="text/javascript" src="'  + gulpConfig.localPath + '/js/' + js + '"></script>'
            ).join('');
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

gulp.task('less_compile',function() {
	gulp.src('./src/*.less')
	.pipe(less(
				{
					paths:[path.join('./src', 'less', 'includes')], 
					plugins:[autoprefix]
				}
		)
	)
	.pipe(gulp.dest('./dist/non_minified/'));
});

gulp.task('less_minify',function() {
	return gulp.src('./src/*.less')
	.pipe(less(
				{
					paths:[path.join('./src', 'less', 'includes')], 
					plugins:[autoprefix]
				}
		)
	)
	.pipe(minify({keepSpecialComments : 0}))	
	.pipe(gulp.dest('./dist/minified/'));	
});

gulp.task('less_deploy',['less_minify', 'less_compile']);

gulp.task('watch', function() {
	gulp.watch('src/uol/**/*.less', ['less_deploy']); 
});

gulp.task('default',['watch', 'browserSync']);
