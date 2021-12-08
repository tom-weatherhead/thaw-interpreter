// tom-weatherhead/thaw-interpreter/src/run-script.ts

// import { LanguageSelector } from 'thaw-interpreter-types';

// import { executeScript } from './common/script-executor';
//
// import { scriptExecutorLCAug } from './languages/lambda-calculus-augmented-syntax/script-executor';
//
// import { languageNameStringToLanguageSelector } from './cli';
//
// export function runScript(languageName: string, scriptFilenames: string[]): void {
// 	// let fnScriptExecutor: () => Promise<void>;
// 	let scriptExecutionPromise: Promise<void>;
//
// 	if (languageName === 'lcaug') {
// 		scriptExecutionPromise = scriptExecutorLCAug(scriptFilenames[0]);
// 	} else {
// 		scriptExecutionPromise = executeScript(
// 			languageNameStringToLanguageSelector(languageName),
// 			scriptFilenames
// 		);
// 	}
//
// 	scriptExecutionPromise.then().catch((error: unknown) => {
// 		console.error('Script execution error:', typeof error, error);
// 	});
// }
