// tom-weatherhead/thaw-interpreter/src/languages/chapter1/chapter1-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { Chapter1GlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class Chapter1Interpreter extends InterpreterBase {
	private readonly globalInfo: Chapter1GlobalInfo; // = new Chapter1GlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.Chapter1, quiet);

		this.globalInfo = new Chapter1GlobalInfo({
			tokenizer: this.tokenizer,
			parser: this.parser
		});
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as IExpression<number>;

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
