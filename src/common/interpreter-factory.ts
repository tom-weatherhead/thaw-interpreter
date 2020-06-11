// tom-weatherhead/thaw-interpreter/src/common/interpreter-factory.ts

'use strict';

import { LanguageSelector } from 'thaw-lexical-analyzer';

import { ArgumentException } from 'thaw-grammar';

import { Chapter1Interpreter } from '../languages/chapter1/chapter1-interpreter';
import { LISPInterpreter } from '../languages/lisp/lisp-interpreter';
import { MinimalLanguageInterpreter } from '../languages/minimal/minimal-language-interpreter';
import { SchemeInterpreter } from '../languages/scheme/scheme-interpreter';

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

		// LanguageSelector.APL,

		case LanguageSelector.Scheme:
			return new SchemeInterpreter();

		// LanguageSelector.SASL,
		// LanguageSelector.CLU,
		// LanguageSelector.Smalltalk,
		// LanguageSelector.Prolog,
		// LanguageSelector.Prolog2,    // "Real" Prolog.
		// LanguageSelector.Inference,
		// LanguageSelector.JSON

		default:
			throw new ArgumentException(
				`createInterpreter(): Unsupported language selector ${LanguageSelector[ls]}`,
				'ls'
			);
	}
}
