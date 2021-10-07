// src/languages/lambda-calculus-augmented-syntax/script-executor.ts

// Execute LCAug scripts via e.g. $ node run-script.js lcaug file.lca

import { createReadStream } from 'fs';
import { argv } from 'process';
import { createInterface } from 'readline';

import { LanguageSelector, LexicalAnalyzerSelector, ParserSelector } from 'thaw-interpreter-types';

import { createTokenizer } from 'thaw-lexical-analyzer';

import { createParser } from 'thaw-parser';

// BetaReductionStrategy,
import { churchNumeralToInteger, createGrammar, getfb2 } from 'thaw-grammar';

// import { makeEcstaSKIEnvironmentFrame } from './domain-object-model/environment-frame';
// import { EcstaSKIGlobalInfo } from './domain-object-model/global-info';
// import { EcstaSKIExpression, isEcstaSKIExpression } from './domain-object-model/types';
//
// import { EcstaSKIGrammar } from './grammar';
// import { GraphReducer } from './graph-reduction/graph-reducer';

// function getInfrastructure(): {
// 	// tokenizer: ITokenizer;
// 	// grammar: IGrammar;
// 	// parser: IParser;
// 	// localEnvironment: EcstaSKIEnvironmentFrame;
// 	// globalInfo: EcstaSKIGlobalInfo;
// 	// graphReducer: GraphReducer;
// 	// parseInput: (str: string) => EcstaSKIExpression;
// 	evaluate: (str: string) => string;
// 	doGraphReduction: (str: string) => string;
// } {
// 	const grammar = new EcstaSKIGrammar();
// 	const tokenizer = createTokenizer(
// 		LexicalAnalyzerSelector.MidnightHack,
// 		LanguageSelector.LambdaCalculusWithAugmentedSyntax
// 	);
// 	const parser = createParser(ParserSelector.LL1, grammar);
// 	// const localEnvironment = makeEcstaSKIEnvironmentFrame();
// 	// const globalInfo = new EcstaSKIGlobalInfo();
// 	// const graphReducer = new GraphReducer(tokenizer, parser, localEnvironment, globalInfo);
// 	const parseInput = (str: string): EcstaSKIExpression => {
// 		const result = parser.parse(tokenizer.tokenize(str)) as EcstaSKIExpression;
//
// 		if (!isEcstaSKIExpression(result)) {
// 			throw new Error(`Parse error: '${str}' does not parse to an EcstaSKIExpression.`);
// 		}
//
// 		return result;
// 	};
//
// 	return {
// 		evaluate: (str: string) =>
// 			parseInput(str).evaluate(localEnvironment, globalInfo).toString(),
// 		doGraphReduction: (str: string) => graphReducer.processInput(str).toString()
// 	};
// }

export async function scriptExecutorLCAug(): Promise<void> {
	// const grammar = new EcstaSKIGrammar();
	// const tokenizer = createTokenizer(
	// 	LexicalAnalyzerSelector.MidnightHack,
	// 	LanguageSelector.LISP
	// );
	// const parser = createParser(ParserSelector.LL1, grammar);
	// const localEnvironment = makeEcstaSKIEnvironmentFrame();
	// const globalInfo = new EcstaSKIGlobalInfo();

	// const { doGraphReduction, evaluate } = getInfrastructure();
	// let isGraphReductionEnabled = false;

	// return (str: string): number =>
	// 	(parser.parse(tokenizer.tokenize(str)) as EcstaSKIExpression).evaluate(
	// 		localEnvironment,
	// 		globalInfo
	// 	).value;

	// If argv.length <= 3 || argv[3] === '-' then read from stdin
	const filename = argv[3];

	console.log('filename is:', filename);

	const fileStream = createReadStream(filename);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	// let argvInjectionDone = false;

	let expressionAsString = '';

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		console.log(`Line from file: ${line}`);

		if (line.length === 0 || line.match(/^\s*$/) || line.match(/^\s*#/)) {
			continue;
			// } else if (line === '+gr') {
			// 	isGraphReductionEnabled = true;
			// 	console.log('Graph reduction enabled.');
			// 	continue;
		}

		// const processInput = isGraphReductionEnabled ? doGraphReduction : evaluate;
		// const match = line.match(/^:argc ([1-9][0-9]*)$/);

		// if (!argvInjectionDone && match && match[1]) {
		// 	const argc = parseInt(match[1], 10);
		//
		// 	for (let i = 0; i < argc; i++) {
		// 		if (Number.isNaN(parseInt(argv[i + 3], 10))) {
		// 			console.error(`Error! '${argv[i + 3]}' is not a number.`);
		// 		}
		//
		// 		const generatedLine = `let argv${i} := ${argv[i + 3]}`;
		//
		// 		console.log(`Generated(${i}) : ${generatedLine}`);
		//
		// 		// (
		// 		// 	parser.parse(tokenizer.tokenize(generatedLine)) as EcstaSKIExpression
		// 		// ).evaluate(localEnvironment, globalInfo);
		// 		processInput(generatedLine);
		// 	}
		//
		// 	argvInjectionDone = true;
		// 	continue;
		// }

		// const lineResult = (
		// 	parser.parse(tokenizer.tokenize(line)) as EcstaSKIExpression
		// ).evaluate(localEnvironment, globalInfo);
		// const lineResult = processInput(line);

		expressionAsString = expressionAsString + line + ' ';
	}

	const ls = LanguageSelector.LambdaCalculusWithAugmentedSyntax;
	const grammar = createGrammar(ls);
	const tokenizer = createTokenizer(LexicalAnalyzerSelector.MidnightHack, ls);
	const parser = createParser(ParserSelector.LL1, grammar);
	const fb2 = getfb2(
		tokenizer,
		parser
		// ,
		// options: {
		// 	readonly strategy?: BetaReductionStrategy;
		// 	readonly generateNewVariableName?: () => string;
		// 	readonly maxDepth?: number;
		// } = {}
	); // : (s: string) => ILCExpression;
	const result = fb2(expressionAsString);
	const resultAsInteger = churchNumeralToInteger(result);
	let resultAsString: string;

	if (!Number.isNaN(resultAsInteger)) {
		resultAsString = `Integer ${resultAsInteger}`;
	} else {
		resultAsString = `${result}`;
	}

	console.log(`\nResult: ${resultAsString}\n`);
}
