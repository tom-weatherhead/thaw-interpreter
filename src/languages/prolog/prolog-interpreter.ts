// tom-weatherhead/thaw-interpreter/src/languages/prolog/prolog-interpreter.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { PrologClause, PrologGlobalInfo, PrologGoal } from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class PrologInterpreter extends InterpreterBase {
	constructor(quiet = false) {
		super(LanguageSelector.Prolog2, quiet);
	}

	public override evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		const parseResult = this.parser.parse(this.tokenizer.tokenize(inputString));
		const expr = parseResult as PrologClause | PrologGoal[];

		this.globalInfo.clearPrintedText();

		if (catchExceptions !== false) {
			console.log('catchExceptions is not currently supported by the Prolog interpreter.');
		}

		const evaluationResultAsString = (this.globalInfo as PrologGlobalInfo).ProcessInput(expr);

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
