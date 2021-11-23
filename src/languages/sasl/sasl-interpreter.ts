// tom-weatherhead/thaw-interpreter/src/languages/sasl/sasl-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { SASLGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class SASLInterpreter extends InterpreterBase {
	private readonly globalInfo: SASLGlobalInfo; // = new SASLGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.SASL, quiet);

		this.globalInfo = new SASLGlobalInfo({ tokenizer: this.tokenizer, parser: this.parser });
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as IExpression<ISExpression>;

		this.globalInfo.clearPrintedText();

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

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
