// tom-weatherhead/thaw-interpreter/test/minimal-language-interpreter.test.ts

'use strict';

import { createInterpreter, IInterpreter, LanguageSelector } from '..';

let interpreter: IInterpreter;

function evalStr(str: string): string {
	return interpreter.evaluateFromString(str, false); // Here, false means 'Do not catch exceptions'.
}

beforeAll(() => {
	interpreter = createInterpreter(LanguageSelector.MinimalLanguage);
});

beforeEach(() => {
	// Run each test with a freshly initialized (not freshly created) interpreter:
	interpreter.initialize();
});

test('MinimalLanguageInterpreter instance creation test', () => {
	// Arrange
	// Act
	// Assert
	expect(interpreter).toBeTruthy();
});

test('MinimalLanguageInterpreter addition operator test 1', () => {
	// Arrange
	const input = '7';
	const expectedResult = input;

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('MinimalLanguageInterpreter addition operator test 2', () => {
	// Arrange
	const input = '(+ 2 3)';
	const expectedResult = '5';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('MinimalLanguageInterpreter addition operator test 3', () => {
	// Arrange
	const input = '(+ (+ 2 3) (+ 4 5))';
	const expectedResult = '14';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});
