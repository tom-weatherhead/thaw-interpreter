#!/usr/bin/env node

// tom-weatherhead/thaw-interpreter/src/cli.ts

import { LanguageSelector } from 'thaw-lexical-analyzer';

import { readEvaluatePrintLoop } from 'thaw-repl';

import { createInterpreter } from './common/interpreter-factory';

process.stdout.write('\nThis is the command line interface for thaw-interpreter\n\n');

function printUsageMessage() {
	process.stdout.write('\n');
	process.stdout.write('Usage:\n');
	process.stdout.write('\n');
	process.stdout.write('    intrp lisp\n');
	process.stdout.write('    intrp scheme\n');
	process.stdout.write('    intrp sasl\n');
	process.stdout.write('    intrp prolog\n');
	process.stdout.write('\n');
}

function driver() {
	if (process.argv.length < 3) {
		process.stdout.write('Error: No language specified.\n');
		printUsageMessage();
		return;
	}

	const languageName = process.argv[2];
	let languageSelector: LanguageSelector | undefined;

	switch (languageName) {
		case 'minimal':
			languageSelector = LanguageSelector.MinimalLanguage;
			break;

		case 'chapter1':
			languageSelector = LanguageSelector.Chapter1;
			break;

		case 'lisp':
			languageSelector = LanguageSelector.LISP;
			break;

		case 'prolog':
			// languageSelector = LanguageSelector.Prolog; // Kamin's notation
			languageSelector = LanguageSelector.Prolog2; // Standard
			break;

		case 'scheme':
			languageSelector = LanguageSelector.Scheme;
			break;

		default:
			break;
	}

	if (languageSelector === undefined) {
		process.stdout.write(`Error: No interpreter available for language '${languageName}'.\n`);
		printUsageMessage();
		return;
	}

	const interpreter = createInterpreter(languageSelector);

	const isExitCommand = (command: string) => command === 'exit';
	const evaluate = (command: string) => interpreter.evaluateFromString(command);

	readEvaluatePrintLoop(isExitCommand, evaluate)
		.then(() => {
			// process.stdout.write('readEvaluatePrintLoop() resolved successfully.\n\n');
		})
		.catch((error: unknown) => {
			process.stderr.write(`Error in readEvaluatePrintLoop(): ${typeof error} ${error}\n`);
		});
}

driver();
