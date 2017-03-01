## Synopsis

This repository will provide a developer with everything necessary to develop, compile and minify the three sits UI frameworks.

Whilst this toolchain is running, changes to the component .less files will be monitored. On changes, they will be compiled, minified and output to the dist directory.

## Using the tool

To run this tool chain, use the command "npm run start". This will run a proxy of the dev web server but inject your local changes. No other users of the system will be affected.

## Installation

using node.js, open the top level directory and run 'npm install'. Then you're good to go!

## Config

Settings such as the url of the website to be proxied and compilation settings can be found in gulpConfig.js.

To disable any currently active stylesheets on the proxied page, add the href of the link tag to gulpConfig.disableCss.

Any files present in dist/js or dist/(minified/non_minified) will be sent to the browser.