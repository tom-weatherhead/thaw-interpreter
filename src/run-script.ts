// tom-weatherhead/thaw-interpreter/src/run-script.ts

// import { argv } from 'process';

import { LanguageSelector } from 'thaw-interpreter-types';

import { executeScript } from './common/script-executor';

import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';

export function runScript(languageName: string, scriptFilenames: string[]): void {
	// const languageName = argv[2];
	// const scriptFilename = argv.length > 3 ? argv[3] : '-';
	// let fnScriptExecutor: () => Promise<void>;
	let scriptExecutionPromise: Promise<void>;

	switch (languageName) {
		case 'lcaug':
			scriptExecutionPromise = scriptExecutorLCAug(scriptFilenames[0]);
			break;
		case 'lisp':
			scriptExecutionPromise = executeScript(LanguageSelector.LISP, scriptFilenames);
			break;
		// case 'prolog':
		// 	scriptExecutionPromise = executeScript(LanguageSelector.Prolog2, scriptFilenames);
		// 	break;
		case 'sasl':
			scriptExecutionPromise = executeScript(LanguageSelector.SASL, scriptFilenames);
			break;
		case 'scheme':
			scriptExecutionPromise = executeScript(LanguageSelector.Scheme, scriptFilenames);
			break;
		default:
			console.error(`Script execution error: Unrecognized language '${languageName}'`);
			return;
	}

	scriptExecutionPromise.then().catch((error: unknown) => {
		console.error('Script execution error:', typeof error, error);
	});
}
