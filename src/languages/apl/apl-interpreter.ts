// tom-weatherhead/thaw-interpreter/src/languages/apl/apl-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { APLGlobalInfo /*, IAPLValue, IExpression */ } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class APLInterpreter extends InterpreterBase {
	private readonly globalInfo: APLGlobalInfo; // = new APLGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.APL, quiet);

		this.globalInfo = new APLGlobalInfo({ tokenizer: this.tokenizer, parser: this.parser });
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as IExpression<IAPLValue>;

		this.globalInfo.clearPrintedText();

		let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
				// .evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
				// .toString();
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}
		} else {
			evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
			// .evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
			// .toString();
		}

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
