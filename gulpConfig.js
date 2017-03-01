module.exports =  {
  settings: {
    autoPrefixVersions: ['ie 7', 'ie 8', 'ie 9'],
    remoteURL: 'https://wsv-srste.le.ac.uk'
  },  
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
      ]
    }
  }
}