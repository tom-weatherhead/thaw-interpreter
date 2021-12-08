#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('process');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const engine = require('.');

if (process.argv.length <= 2) {
	console.error('Usage: intrprtr language-name [script-path-list]');
	process.exit(1);
}

const languageName = process.argv[2];

if (['apl', 'chapter1', 'clu', 'lcaug', 'lisp', 'minimal', 'prolog', 'scheme', 'smalltalk'].indexOf(languageName) < 0) {
	console.error(`Error: Unknown language name '${languageName}'.`);
	console.error('The language name must be one of ...');
	process.exit(1);
}

if (process.argv.length === 3) {
	// Interactive mode
	engine.driver(languageName);
} else {
	// Script mode
	engine.runScript(languageName, process.argv.slice(3));
}
