#!/usr/bin/env node

// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line @typescript-eslint/no-var-requires
require = require('esm')(module/*, options*/)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const engine = require('.');

engine.driver();
