// tom-weatherhead/thaw-interpreter/src/cli.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { readEvaluatePrintLoop } from 'thaw-repl';

import { createInterpreter } from './common/interpreter-factory';

process.stdout.write('\nThis is the command line interface for thaw-interpreter\n\n');

function printUsageMessage() {
	process.stdout.write('\n');
	process.stdout.write('Usage: $ intrp [language name]\n');
	process.stdout.write('\n');
	process.stdout.write('E.g.: $ intrp lisp\n');
	process.stdout.write('\n');
	process.stdout.write('Available languages: minimal, chapter1, lisp, scheme, sasl, prolog');
	process.stdout.write('\n');
}

export function driver(): void {
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

		// case 'apl':
		// 	languageSelector = LanguageSelector.APL;
		// 	break;

		case 'scheme':
			languageSelector = LanguageSelector.Scheme;
			break;

		case 'sasl':
			languageSelector = LanguageSelector.SASL;
			break;

		// case 'clu':
		// 	languageSelector = LanguageSelector.CLU;
		// 	break;

		case 'smalltalk':
			languageSelector = LanguageSelector.Smalltalk;
			break;

		case 'prolog':
			// languageSelector = LanguageSelector.Prolog; // Kamin's notation
			languageSelector = LanguageSelector.Prolog2; // Standard
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
