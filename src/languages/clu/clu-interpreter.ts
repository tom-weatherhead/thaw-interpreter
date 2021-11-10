// tom-weatherhead/thaw-interpreter/src/languages/clu/clu-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { ICLUExpression, /* ICLUValue, */ CLUGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class CLUInterpreter extends InterpreterBase {
	private readonly globalInfo = new CLUGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.CLU, quiet);
	}

	public evaluate(parseResult: unknown, catchExceptions?: boolean): string {
		const expr = parseResult as ICLUExpression;

		// this.globalInfo.clearPrintedText();

		let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				evaluationResultAsString = this.globalInfo.evaluate(expr).toString();
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}
		} else {
			evaluationResultAsString = this.globalInfo.evaluate(expr).toString();
		}

		// return this.globalInfo.getPrintedText() + evaluationResultAsString;

		return evaluationResultAsString;
	}
}
