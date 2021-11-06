// tom-weatherhead/thaw-interpreter/src/languages/smalltalk/smalltalk-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { ISmalltalkExpression, SmalltalkGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class SmalltalkInterpreter extends InterpreterBase {
	private readonly globalInfo = new SmalltalkGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.Smalltalk, quiet);
	}

	public evaluate(parseResult: unknown, catchExceptions?: boolean): string {
		const expr = parseResult as ISmalltalkExpression;

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
