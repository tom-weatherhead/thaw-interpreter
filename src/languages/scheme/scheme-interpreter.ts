// tom-weatherhead/thaw-interpreter/src/languages/scheme/scheme-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { SchemeGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class SchemeInterpreter extends InterpreterBase /* <ISExpression> */ {
	private readonly globalInfo: SchemeGlobalInfo; // = new SchemeGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.Scheme, quiet);

		this.globalInfo = new SchemeGlobalInfo({ tokenizer: this.tokenizer, parser: this.parser });
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
