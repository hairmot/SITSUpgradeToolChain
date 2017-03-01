## Synopsis

This repository will provide a developer with everything necessary to develop, compile and minify the three sits UI frameworks.

Whilst this toolchain is running, changes to the component .less files will be monitored. On changes, they will be compiled, minified and output to the dist directory. They can also be copied to a dev server - the parameter for this can be found in gulpfile.js.

## Code Example

To run this tool chain, use the command "npm run start". This will run a proxy of the dev web server but inject your local changes. No other users of the system will be affected.

## Installation

using node.js, open the top level directory and run 'npm install'. Then you're good to go!