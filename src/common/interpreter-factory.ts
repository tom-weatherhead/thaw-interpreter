// tom-weatherhead/thaw-interpreter/src/common/interpreter-factory.ts

import { LanguageSelector } from 'thaw-interpreter-types';

import { ArgumentException } from 'thaw-interpreter-core';

import { InterpreterBase } from './interpreter-base';

import { PrologInterpreter } from '../languages/prolog/prolog-interpreter';

import { IInterpreter } from './iinterpreter';

export function createInterpreter(ls: LanguageSelector): IInterpreter {
	switch (ls) {
		// case LanguageSelector.Prolog:	// (Kamin 8/8)
		case LanguageSelector.Prolog2:
			return new PrologInterpreter();

		case LanguageSelector.MinimalLanguage:
		case LanguageSelector.Chapter1: // (Kamin 1/8)
		case LanguageSelector.LISP: // (Kamin 2/8)
		case LanguageSelector.APL: // (Kamin 3/8)
		case LanguageSelector.Scheme: // (Kamin 4/8)
		case LanguageSelector.SASL: // (Kamin 5/8)
		case LanguageSelector.CLU: // (Kamin 6/8)
		case LanguageSelector.Smalltalk: // (Kamin 7/8)
			// case LanguageSelector.Inference:
			// case LanguageSelector.JSON:
			return new InterpreterBase(ls);

		default:
			throw new ArgumentException(
				`createInterpreter(): Unsupported language selector ${LanguageSelector[ls]}`,
				'ls'
			);
	}
}
