// tom-weatherhead/thaw-interpreter/src/languages/clu/clu-interpreter.ts

// import { LanguageSelector } from 'thaw-lexical-analyzer';
//
// import { IExpression, ISExpression, CLUGlobalInfo } from 'thaw-grammar';
//
// import { InterpreterBase } from '../../common/interpreter-base';
//
// export class CLUInterpreter extends InterpreterBase<ISExpression> {
// 	constructor(quiet = false) {
// 		super(LanguageSelector.CLU, new CLUGlobalInfo(), quiet);
// 	}
//
// 	public evaluate(parseResult: unknown, catchExceptions?: boolean): string {
// 		const expr = parseResult as IExpression<ISExpression>;
//
// 		this.globalInfo.clearPrintedText();
//
// 		let evaluationResultAsString = '';
//
// 		if (catchExceptions !== false) {
// 			// I.e. catchExceptions is true or undefined
//
// 			try {
// 				evaluationResultAsString = expr
// 					.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
// 					.toString();
// 			} catch (ex) {
// 				evaluationResultAsString = `Exception: ${ex}`;
// 			}
// 		} else {
// 			evaluationResultAsString = expr
// 				.evaluate(this.globalInfo.globalEnvironment, this.globalInfo)
// 				.toString();
// 		}
//
// 		return this.globalInfo.getPrintedText() + evaluationResultAsString;
// 	}
// }
