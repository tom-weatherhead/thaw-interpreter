// tom-weatherhead/thaw-interpreter/src/languages/chapter1/chapter1-interpreter.ts

'use strict';

import { LanguageSelector } from 'thaw-interpreter-types';

import { Chapter1GlobalInfo, IExpression } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class Chapter1Interpreter extends InterpreterBase<number> {
	constructor(quiet = false) {
		super(LanguageSelector.Chapter1, new Chapter1GlobalInfo(), quiet);
	}

	public evaluate(parseResult: unknown, catchExceptions?: boolean): string {
		const expr = parseResult as IExpression<number>;

		this.globalInfo.clearPrintedText();

		let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				evaluationResultAsString = expr
					.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
					.toString();
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}
		} else {
			evaluationResultAsString = expr
				.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
				.toString();
		}

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
