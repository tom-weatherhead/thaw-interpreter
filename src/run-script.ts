// tom-weatherhead/thaw-interpreter/src/run-script.ts

import { argv } from 'process';

import { executeScript } from './common/script-executor';

import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';

export function runScript(): void {
	const languageName = argv[2];
	let fnScriptExecutor: () => Promise<void>;

	switch (languageName) {
		case 'lcaug':
			fnScriptExecutor = scriptExecutorLCAug;
			break;
		case 'lisp':
			fnScriptExecutor = executeScript;
			break;
		default:
			console.error(`Script execution error: Unrecognized language '${languageName}'`);
			return;
	}

	fnScriptExecutor()
		.then()
		.catch((error: unknown) => {
			console.error('Script execution error:', typeof error, error);
		});
}
