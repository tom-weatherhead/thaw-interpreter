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

export async function scriptExecutorLCAug(): Promise<void> {
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
			// } else if (line.match(/^+β([A-Z]+)/)) { // Specify a Beta-reduction strategy
			// ...
			// 	continue;
		}

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
	);
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
