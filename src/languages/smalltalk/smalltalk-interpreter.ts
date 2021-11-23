// tom-weatherhead/thaw-interpreter/src/languages/smalltalk/smalltalk-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { SmalltalkGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class SmalltalkInterpreter extends InterpreterBase {
	private readonly globalInfo: SmalltalkGlobalInfo; // = new SmalltalkGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.Smalltalk, quiet);

		this.globalInfo = new SmalltalkGlobalInfo({
			tokenizer: this.tokenizer,
			parser: this.parser
		});
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as ISmalltalkExpression;

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
