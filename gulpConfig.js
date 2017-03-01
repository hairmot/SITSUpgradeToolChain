module.exports =  {
  settings: {
    autoPrefixVersions: ['ie 7', 'ie 8', 'ie 9'],
    remoteURL: 'https://wsv-srste.le.ac.uk' //the site being developed/proxied
  },  
  srcDir: './src',
  injectDir: './dist',
  localPath: '/dist',    
  disableCss: // add entires here to disable existing css files that are being loaded to the page
    [
      '../css/sits.css',
      '../css/sv.css',
      '../plugins/css/ui/sits-ui.css',
      '../UOL/css/uol.css'
    ]
}
  
