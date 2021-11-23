// tom-weatherhead/thaw-interpreter/src/languages/clu/clu-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { CLUGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class CLUInterpreter extends InterpreterBase {
	private readonly globalInfo: CLUGlobalInfo; // = new CLUGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.CLU, quiet);

		this.globalInfo = new CLUGlobalInfo({ tokenizer: this.tokenizer, parser: this.parser });
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as ICLUExpression;

		// this.globalInfo.clearPrintedText();

		let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}
		} else {
			evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
		}

		// return this.globalInfo.getPrintedText() + evaluationResultAsString;

		return evaluationResultAsString;
	}
}
