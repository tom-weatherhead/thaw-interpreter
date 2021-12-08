// tom-weatherhead/thaw-interpreter/src/cli.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { readEvaluatePrintLoop } from 'thaw-repl';

import { createInterpreter } from './common/interpreter-factory';

function printUsageMessage() {
	process.stdout.write('\n');
	process.stdout.write('Usage: $ intrprtr [language name]\n');
	process.stdout.write('\n');
	process.stdout.write('E.g.: $ intrprtr lisp\n');
	process.stdout.write('\n');
	process.stdout.write('Available languages: minimal, chapter1, lisp, scheme, sasl, prolog');
	process.stdout.write('\n');
}

export function languageNameStringToLanguageSelector(languageName: string): LanguageSelector {
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

export function driver(languageName: string): void {
	process.stdout.write('\nThis is the command line interface for thaw-interpreter\n\n');

	if (process.argv.length < 3) {
		process.stdout.write('Error: No language specified.\n');
		printUsageMessage();
		return;
	}

	// const languageName = process.argv[2];
	// let languageSelector: LanguageSelector | undefined;
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
