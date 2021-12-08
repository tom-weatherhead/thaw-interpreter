// tom-weatherhead/thaw-interpreter/src/cli.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { readEvaluatePrintLoop } from 'thaw-repl';

import { createInterpreter } from './common/interpreter-factory';

import { executeScript } from './common/script-executor';

import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';

function printUsageMessage() {
	process.stdout.write('\n');
	process.stdout.write('Usage: $ intrprtr [language name]\n');
	process.stdout.write('\n');
	process.stdout.write('E.g.: $ intrprtr lisp\n');
	process.stdout.write('\n');
	process.stdout.write('Available languages: minimal, chapter1, lisp, scheme, sasl, prolog');
	process.stdout.write('\n');
}

function languageNameStringToLanguageSelector(languageName: string): LanguageSelector {
	switch (languageName) {
		case 'minimal':
			return LanguageSelector.MinimalLanguage;

		case 'chapter1':
			return LanguageSelector.Chapter1;

		case 'lisp':
			return LanguageSelector.LISP;

		case 'apl':
			return LanguageSelector.APL;

		case 'scheme':
			return LanguageSelector.Scheme;

		case 'sasl':
			return LanguageSelector.SASL;

		case 'clu':
			return LanguageSelector.CLU;

		case 'smalltalk':
			return LanguageSelector.Smalltalk;

		case 'prolog':
			// return LanguageSelector.Prolog; // Kamin's notation
			return LanguageSelector.Prolog2; // Standard

		default:
			throw new Error('languageNameStringToLanguageSelector()');
	}
}

function doInteractiveMode(languageName: string): void {
	process.stdout.write('\nThis is the command line interface for thaw-interpreter\n\n');

	if (process.argv.length < 3) {
		process.stdout.write('Error: No language specified.\n');
		printUsageMessage();
		return;
	}

	const languageSelector = languageNameStringToLanguageSelector(languageName);

	// if (languageSelector === undefined) {
	// 	process.stdout.write(`Error: No interpreter available for language '${languageName}'.\n`);
	// 	printUsageMessage();
	// 	return;
	// }

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

function runScript(languageName: string, scriptFilenames: string[]): void {
	// let fnScriptExecutor: () => Promise<void>;
	let scriptExecutionPromise: Promise<void>;

	if (languageName === 'lcaug') {
		scriptExecutionPromise = scriptExecutorLCAug(scriptFilenames[0]);
	} else {
		scriptExecutionPromise = executeScript(
			languageNameStringToLanguageSelector(languageName),
			scriptFilenames
		);
	}

	scriptExecutionPromise.then().catch((error: unknown) => {
		console.error('Script execution error:', typeof error, error);
	});
}

export function driver(argv: string[]): void {
	if (argv.length <= 2) {
		// TODO: Use process.stderr.write() ?
		console.error('Usage: intrprtr language-name [script-path-list]');
		process.exit(1);
	}

	const languageName = argv[2];
	const supportedLanguages = [
		'apl',
		'chapter1',
		'clu',
		'lcaug',
		'lisp',
		'minimal',
		'prolog',
		'scheme',
		'smalltalk'
	];

	if (supportedLanguages.indexOf(languageName) < 0) {
		console.error(`Error: Unknown language name '${languageName}'.`);
		console.error('The language name must be one of:', supportedLanguages.join(', '));
		process.exit(1);
	}

	if (argv.length === 3) {
		// Interactive mode
		doInteractiveMode(languageName);
	} else {
		// Script mode
		runScript(languageName, argv.slice(3));
	}
}
