## Overview

This repository will provide a developer with everything necessary to develop, compile and minify the three sits UI frameworks.

Whilst this toolchain is running, changes to the component .less files will be monitored. On changes, they will be compiled, optionally minified and output to the dist directory. They will also be refreshed in the proxied web session if the proxy is running.

## Using the tool

There are several different uses listed below:

- "npm run dev". This will run a proxy of the dev web server and inject your compiled resource files.
- "npm run dev-minify". This will run a proxy of the dev web server and inject your MINIFIED compiled resource files.
- "npm run build". This will compile the resouce files to the dist folder.
- "npm run build-minify". This will compile and minify resource files to the dist folder.

## Installation

using node.js, open the top level directory and run 'npm install'. Then you're good to go!

## Config

Settings such as the url of the website to be proxied and compilation settings can be found in gulpConfig.js.

To disable any currently active stylesheets on the proxied page, add the href of the link tag to gulpConfig.disableCss.

Any files present in dist/js or dist/(minified/non_minified) will be sent to the browser (not just your compiled less files - feel free to include js or plain old css)