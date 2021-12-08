// tom-weatherhead/thaw-interpreter/src/common/script-executor.ts

import { createReadStream } from 'fs';
// import { argv } from 'process';
import { createInterface } from 'readline';

import { LanguageSelector } from 'thaw-interpreter-types';

import {
	createGlobalInfo,
	createGrammar /*,  IExpression, ISExpression, LISPGlobalInfo */
} from 'thaw-grammar';

import { createTokenizer } from 'thaw-lexical-analyzer';

import { createParser /*, SyntaxException */ } from 'thaw-parser';

// const ls = LanguageSelector.LISP;

function numOccurrences(str: string, c: string): number {
	return str.split('').filter((s) => s === c).length;
}

function createBracketMatcher(): (line: string) => boolean {
	let leftMinusRight = 0;

	return (line: string) => {
		leftMinusRight += numOccurrences(line, '(') - numOccurrences(line, ')');

		if (leftMinusRight < 0) {
			throw new Error('BracketMatcher: More ) than (');
		}

		return leftMinusRight === 0;
	};
}

export async function executeScript(ls: LanguageSelector, filename: string): Promise<void> {
	// If argv.length <= 3 || argv[3] === '-' then read from stdin
	// const filename = argv[3];

	// console.log('filename is:', filename);

	const fileStream = createReadStream(filename);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	const grammar = createGrammar(ls);
	const tokenizer = createTokenizer(grammar.defaultLexicalAnalyzer, ls);
	const parser = createParser(grammar.defaultParser, grammar);
	// const globalInfo = new LISPGlobalInfo({ tokenizer, parser });
	const globalInfo = createGlobalInfo(ls, { tokenizer, parser });

	const fnIsLineComplete = createBracketMatcher();

	// if (typeof options.presets !== 'undefined') {
	// 	for (const preset of options.presets) {
	// 		globalInfo.loadPreset(preset);
	// 	}
	// }

	let accumulatedLine = '';

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		// console.log(`Line from file: ${line}`);

		if (line.length === 0 || line.match(/^\s*$/) || line.match(/^\s*#/)) {
			continue;
		}

		accumulatedLine = accumulatedLine + line + ' ';

		if (fnIsLineComplete(line)) {
			console.log('Evaluating:', accumulatedLine);

			globalInfo.clearPrintedText();

			let evaluationResultAsString = '';

			try {
				evaluationResultAsString = globalInfo.evaluateToString(accumulatedLine);
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}

			console.log('Result:', globalInfo.getPrintedText() + evaluationResultAsString);

			accumulatedLine = '';
		}
	}
}
