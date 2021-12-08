// tom-weatherhead/thaw-interpreter/src/run-script.ts

import { argv } from 'process';

import { LanguageSelector } from 'thaw-interpreter-types';

import { executeScript } from './common/script-executor';

import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';

export function runScript(): void {
	const languageName = argv[2];
	const scriptFilename = argv.length > 3 ? argv[3] : '-';
	// let fnScriptExecutor: () => Promise<void>;
	let scriptExecutionPromise: Promise<void>;

	switch (languageName) {
		case 'lcaug':
			scriptExecutionPromise = scriptExecutorLCAug(scriptFilename);
			break;
		case 'lisp':
			scriptExecutionPromise = executeScript(LanguageSelector.LISP, scriptFilename);
			break;
		// case 'prolog':
		// 	scriptExecutionPromise = executeScript(LanguageSelector.Prolog2, scriptFilename);
		// 	break;
		case 'sasl':
			scriptExecutionPromise = executeScript(LanguageSelector.SASL, scriptFilename);
			break;
		case 'scheme':
			scriptExecutionPromise = executeScript(LanguageSelector.Scheme, scriptFilename);
			break;
		default:
			console.error(`Script execution error: Unrecognized language '${languageName}'`);
			return;
	}

	scriptExecutionPromise.then().catch((error: unknown) => {
		console.error('Script execution error:', typeof error, error);
	});
}
