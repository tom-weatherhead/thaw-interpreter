// tom-weatherhead/thaw-interpreter/src/common/interpreter-factory.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { ArgumentException } from 'thaw-interpreter-core';

import { MinimalLanguageInterpreter } from '../languages/minimal/minimal-language-interpreter';

// From Kamin's book:
import { Chapter1Interpreter } from '../languages/chapter1/chapter1-interpreter';
import { LISPInterpreter } from '../languages/lisp/lisp-interpreter';
// import { APLInterpreter } from '../languages/apl/apl-interpreter';
import { SchemeInterpreter } from '../languages/scheme/scheme-interpreter';
import { SASLInterpreter } from '../languages/sasl/sasl-interpreter';
// import { CLUInterpreter } from '../languages/clu/clu-interpreter';
import { SmalltalkInterpreter } from '../languages/smalltalk/smalltalk-interpreter';
import { PrologInterpreter } from '../languages/prolog/prolog-interpreter';

import { IInterpreter } from './iinterpreter';

// export default function createInterpreter(ls: LanguageSelector): IInterpreter {
export function createInterpreter(ls: LanguageSelector): IInterpreter {
	switch (ls) {
		case LanguageSelector.MinimalLanguage:
			return new MinimalLanguageInterpreter();

		// LanguageSelector.Micro,

		case LanguageSelector.Chapter1: // (Kamin 1/8)
			return new Chapter1Interpreter();

		case LanguageSelector.LISP: // (Kamin 2/8)
			return new LISPInterpreter();

		// case LanguageSelector.APL:		// (Kamin 3/8)
		// 	return new APLInterpreter();

		case LanguageSelector.Scheme: // (Kamin 4/8)
			return new SchemeInterpreter();

		case LanguageSelector.SASL: // (Kamin 5/8)
			return new SASLInterpreter();

		// case LanguageSelector.CLU:		// (Kamin 6/8)
		// 	return new CLUInterpreter();

		case LanguageSelector.Smalltalk: // (Kamin 7/8)
			return new SmalltalkInterpreter();

		// case LanguageSelector.Prolog:	// (Kamin 8/8)
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
