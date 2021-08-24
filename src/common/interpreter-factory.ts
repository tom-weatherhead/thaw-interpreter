// tom-weatherhead/thaw-interpreter/src/common/interpreter-factory.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { ArgumentException } from 'thaw-grammar';

import { MinimalLanguageInterpreter } from '../languages/minimal/minimal-language-interpreter';

// From Kamin's book:
import { Chapter1Interpreter } from '../languages/chapter1/chapter1-interpreter';
import { LISPInterpreter } from '../languages/lisp/lisp-interpreter';
// import { APLInterpreter } from '../languages/apl/apl-interpreter';
import { SchemeInterpreter } from '../languages/scheme/scheme-interpreter';
import { SASLInterpreter } from '../languages/sasl/sasl-interpreter';
// import { CLUInterpreter } from '../languages/clu/clu-interpreter';
// import { SmalltalkInterpreter } from '../languages/smalltalk/smalltalk-interpreter';
import { PrologInterpreter } from '../languages/prolog/prolog-interpreter';

import { IInterpreter } from './iinterpreter';

// export default function createInterpreter(ls: LanguageSelector): IInterpreter {
export function createInterpreter(ls: LanguageSelector): IInterpreter {
	switch (ls) {
		case LanguageSelector.MinimalLanguage:
			return new MinimalLanguageInterpreter();

		// LanguageSelector.Micro,

		case LanguageSelector.Chapter1:
			return new Chapter1Interpreter();

		case LanguageSelector.LISP:
			return new LISPInterpreter();

		// case LanguageSelector.APL:
		// 	return new APLInterpreter();

		case LanguageSelector.Scheme:
			return new SchemeInterpreter();

		case LanguageSelector.SASL:
			return new SASLInterpreter();

		// case LanguageSelector.CLU:
		// 	return new CLUInterpreter();

		// case LanguageSelector.Smalltalk:
		// 	return new SmalltalkInterpreter();

		// case LanguageSelector.Prolog:
		case LanguageSelector.Prolog2:
			return new PrologInterpreter();

		// case LanguageSelector.Inference:
		// case LanguageSelector.JSON:

		default:
			throw new ArgumentException(
				`createInterpreter(): Unsupported language selector ${LanguageSelector[ls]}`,
				'ls'
			);
	}
}
