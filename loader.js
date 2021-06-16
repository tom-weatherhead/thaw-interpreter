#!/usr/bin/env node

// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line @typescript-eslint/no-var-requires
require = require('esm')(module/*, options*/)

// module.exports = require("./main.js")
require('./dist/types/cli.js');
