// tom-weatherhead/thaw-interpreter/src/languages/lisp/lisp-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { LISPGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class LISPInterpreter extends InterpreterBase {
	private readonly globalInfo: LISPGlobalInfo; // = new LISPGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.LISP, quiet);

		this.globalInfo = new LISPGlobalInfo({ tokenizer: this.tokenizer, parser: this.parser });
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
