var gulp = require('gulp'),
 less = require('gulp-less'),
 path = require('path');
 LessAutoprefix = require('less-plugin-autoprefix'),
 minify = require('gulp-minify-css'),
 watch = require('gulp-watch'),
 browserSync = require('browser-sync').create(),
 runSequence = require('run-sequence');

var autoprefix = new LessAutoprefix({ browsers: ['last 30 versions', 'ie 7', 'ie 8', 'ie 9'] });
var siwebFolder = '//stp.evision.co.uk/server/siweb';//where should the compiled css end up (if production build)?

var flags = {
	//by default, do not deploy files to web server
	production: false
};

var config = {
  remoteURL: 'https://wsv-srste.le.ac.uk',
  srcDir: './src',
  injectDir: './dist',
  localPath: '/dist',
  localAssets: {
    deploy: {
      css: [
        'non_minified/sv.css',
        'non_minified/sits-ui.css',
        'non_minified/font-awesome.min.css'  
        ],
        js: [
        ]
      },
    disable: {
      css: [
        '../css/sits.css',
        '../css/sv.css',
        '../plugins/css/ui/sits-ui.css',
        '../UOL/css/uol.css'
      ],
      js : [

      ]
    }
  }

};

var reload = browserSync.reload;

gulp.task('browserSync',['less_deploy'], function() {
  browserSync.init({
    proxy: {
      target: config.remoteURL
    },
    rewriteRules: [
      {
        // Inject Local CSS at the end of HEAD
        match: /<\/head>/i,
        fn: function(req, res, match) {
          localCssAssets = '';
          for (i=0;i<config.localAssets.deploy.css.length;i++) {
            localCssAssets += '<link rel="stylesheet" type="text/css" href="' + config.localPath + '/' + config.localAssets.desploy.css[i] + '">';
          }
          //disable all old css assets
          localCssAssets += '<script>$(document).ready(function() {$("' + config.localAssets.disable.css.map(link => 'link[href=\'' + link + '\']').join(',') + '").prop(\'disabled\', true);});</script>';
          return localCssAssets + match;
        }
      },
      {
        // Inject Local JS at the end of BODY
        match: /<\/body>/i,
        fn: function(req, res, match) {
          localJsAssets = '';
          for (i=0;i<config.localAssets.deploy.js.length;i++) {
            localJsAssets += '<script src="' + config.localPath + '/' + config.localAssets.deploy.js[i] + '"></script>';
          }
          return localJsAssets + match;
        }
      }
    ],
    serveStatic: [{
      route: config.localPath,
      dir: config.injectDir
    }],
    watchTask: true
  });
});


gulp.task('less_dev',function() {
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

gulp.task('less_deploy',['less_minify', 'less_dev'], function() {
	var folder = (flags.production ? 'minified' : 'non_minified');
	if (flags.production) {
		gulp.src('dist/' + folder + '/sv.css')
		.pipe(gulp.dest(siwebFolder + '/css'));
		
		gulp.src('dist/' + folder + '/sv-portal.css')
		.pipe(gulp.dest(siwebFolder + '/css'));
		
		gulp.src('dist/' + folder + '/sits-ui.css')
		.pipe(gulp.dest(siwebFolder + '/plugins/css/ui'));	
	}
});

gulp.task('watch', function() {
	gulp.watch('src/uol/**/*.less', ['less_deploy']); 
});

gulp.task('production', function () {
  flags.production = true;
});

gulp.task('default',['watch', 'browserSync']);

gulp.task('build',['less_dev','less_deploy']);
