// tom-weatherhead/thaw-interpreter/src/languages/minimal/minimal-language-interpreter.ts

'use strict';

import { LanguageSelector } from 'thaw-lexical-analyzer';

import { IExpression, MinimalLanguageGlobalInfo } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class MinimalLanguageInterpreter extends InterpreterBase<number> {
	constructor(quiet: boolean = false) {
		super(
			LanguageSelector.MinimalLanguage,
			new MinimalLanguageGlobalInfo(),
			quiet
		);
	}

	public evaluate(parseResult: any, catchExceptions?: boolean): string {
		const expr = parseResult as IExpression<number>;

		// this.globalInfo.clearPrintedText(); // The minimal language does not support printing.

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				return expr
					.evaluate(
						this.globalInfo.globalEnvironment,
						this.globalInfo
					)
					.toString();
			} catch (ex) {
				return `Exception: ${ex}`;
			}
		} else {
			return expr
				.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
				.toString();
		}

		// return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
