// tom-weatherhead/thaw-interpreter/src/common/interpreter-base.ts

import { IGrammar, IParser, ITokenizer, LanguageSelector } from 'thaw-interpreter-types';

import { createTokenizer } from 'thaw-lexical-analyzer';

import { createGlobalInfo, createGrammar, IGlobalInfoForInterpreter } from 'thaw-grammar';

import { createParser } from 'thaw-parser';

import { IInterpreter } from './iinterpreter';

export class InterpreterBase implements IInterpreter {
	/* , IInterpreterUnitTestInterface */
	protected readonly tokenizer: ITokenizer;
	protected readonly grammar: IGrammar;
	protected readonly parser: IParser;
	protected readonly globalInfo: IGlobalInfoForInterpreter;
	// protected readonly quiet: boolean;

	constructor(ls: LanguageSelector, protected readonly quiet = false) {
		// this.quiet = quiet;

		this.grammar = createGrammar(ls);
		this.tokenizer = createTokenizer(this.grammar.defaultLexicalAnalyzer, ls);
		this.parser = createParser(this.grammar.defaultParser, this.grammar);
		this.globalInfo = createGlobalInfo(ls, { tokenizer: this.tokenizer, parser: this.parser });

		this.globalInfo.initialize();
	}

	public get languageName(): string {
		return this.grammar.languageName;
	}

	public initialize(): void {
		// Restore the state of the interpreter to its newly-created state.
		this.globalInfo.initialize();
	}

	// public abstract evaluateFromString(inputString: string, catchExceptions?: boolean): string;

	// public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
	// 	const listOfTokens = this.tokenizer.tokenize(inputString);
	// 	const parseResult = this.parser.parse(listOfTokens);
	//
	// 	return this.evaluate(parseResult, catchExceptions);
	// }

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
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
