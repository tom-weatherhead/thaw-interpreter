// tom-weatherhead/thaw-interpreter/src/languages/minimal/minimal-language-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { MinimalLanguageGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class MinimalLanguageInterpreter extends InterpreterBase {
	private readonly globalInfo: MinimalLanguageGlobalInfo; // = new MinimalLanguageGlobalInfo();

	constructor(quiet = false) {
		super(LanguageSelector.MinimalLanguage, quiet);

		this.globalInfo = new MinimalLanguageGlobalInfo({
			tokenizer: this.tokenizer,
			parser: this.parser
		});
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		// const expr = parseResult as IExpression<number>;

		// this.globalInfo.clearPrintedText(); // The minimal language does not support printing.

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				return this.globalInfo.evaluateToString(inputString);
			} catch (ex) {
				return `Exception: ${ex}`;
			}
		} else {
			return this.globalInfo.evaluateToString(inputString);
		}

		// return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
