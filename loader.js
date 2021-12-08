#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const engine = require('.');

engine.driver(process.argv);
