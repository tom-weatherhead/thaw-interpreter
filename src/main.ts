// tom-weatherhead/thaw-interpreter/src/main.ts

import { argv } from 'process';

export { LanguageSelector } from 'thaw-interpreter-types';

export { IInterpreter } from './common/iinterpreter';
export { createInterpreter } from './common/interpreter-factory';

export { driver } from './cli';

import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';

export function runScript(): void {
	const languageName = argv[2];
	let fnScriptExecutor: () => Promise<void>;

	switch (languageName) {
		case 'lcaug':
			fnScriptExecutor = scriptExecutorLCAug;
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
