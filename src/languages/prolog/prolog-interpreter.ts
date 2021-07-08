// tom-weatherhead/thaw-interpreter/src/languages/prolog/prolog-interpreter.ts

import { LanguageSelector } from 'thaw-lexical-analyzer';

// import { IExpression, ISExpression, SchemeGlobalInfo } from 'thaw-grammar';
import {
	// IExpression,
	IPrologExpression,
	PrologClause,
	PrologGlobalInfo,
	PrologGoal
} from 'thaw-grammar';

import { InterpreterBase } from '../../common/interpreter-base';

export class PrologInterpreter extends InterpreterBase<IPrologExpression> {
	constructor(quiet = false) {
		super(LanguageSelector.Prolog2, new PrologGlobalInfo(), quiet);
	}

	public evaluate(parseResult: any, catchExceptions?: boolean): string {
		const prologGlobalInfo = this.globalInfo as PrologGlobalInfo;
		// const expr = parseResult as IExpression<IPrologExpression>;
		const expr = parseResult as PrologClause | PrologGoal[];

		this.globalInfo.clearPrintedText();

		// let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			console.log('catchExceptions is not currently supported by the Prolog interpreter.');
		}

		// if (catchExceptions !== false) {
		// 	// I.e. catchExceptions is true or undefined

		// 	try {
		// 		evaluationResultAsString = expr
		// 			.evaluate(
		// 				this.globalInfo.globalEnvironment,
		// 				this.globalInfo
		// 			)
		// 			.toString();
		// 	} catch (ex) {
		// 		evaluationResultAsString = `Exception: ${ex}`;
		// 	}
		// } else {
		// 	evaluationResultAsString = expr
		// 		.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
		// 		.toString();
		// }

		const evaluationResultAsString = prologGlobalInfo.ProcessInput(expr);

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}
}
