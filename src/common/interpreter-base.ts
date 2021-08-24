// tom-weatherhead/thaw-interpreter/src/common/interpreter-base.ts

'use strict';

import {
	IGrammar,
	IParser,
	ITokenizer,
	LanguageSelector,
	LexicalAnalyzerSelector,
	ParserSelector
} from 'thaw-interpreter-types';

import { createTokenizer } from 'thaw-lexical-analyzer';

import { createGrammar, IGlobalInfo } from 'thaw-grammar';

import { createParser } from 'thaw-parser';

import { IInterpreter } from './iinterpreter';

export abstract class InterpreterBase<T> implements IInterpreter {
	/* , IInterpreterUnitTestInterface */
	protected readonly tokenizer: ITokenizer;
	protected readonly grammar: IGrammar;
	protected readonly parser: IParser;
	protected globalInfo: IGlobalInfo<T>;
	protected readonly quiet: boolean;

	protected constructor(ls: LanguageSelector, globalInfo: IGlobalInfo<T>, quiet = false) {
		this.globalInfo = globalInfo;
		this.quiet = quiet;

		this.grammar = createGrammar(ls);
		this.tokenizer = createTokenizer(LexicalAnalyzerSelector.MidnightHack, ls);
		this.parser = createParser(ParserSelector.LL1, this.grammar);
	}

	public get languageName(): string {
		return this.grammar.languageName;
	}

	public initialize(): void {
		// Restore the state of the interpreter to its newly-created state.
		this.globalInfo.initialize();
	}

	public abstract evaluate(parseResult: unknown, catchExceptions?: boolean): string;

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		const listOfTokens = this.tokenizer.tokenize(inputString);
		const parseResult = this.parser.parse(listOfTokens);

		return this.evaluate(parseResult, catchExceptions);
	}
}
