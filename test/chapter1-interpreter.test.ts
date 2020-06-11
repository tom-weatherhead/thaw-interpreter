// tom-weatherhead/thaw-interpreter/test/chapter1-interpreter.test.ts

// TODO: Test operators: - * / = < >
// TODO: Test: if while set begin print functionDefinitons
// Example test: gcd(a, b)
// Test that 1 / 0 throws.

'use strict';

import {
	createInterpreter,
	IInterpreter,
	LanguageSelector
} from '../lib/main';

const trueValueAsString = '1';
const falseValueAsString = '0';

let interpreter: IInterpreter;

function evalStr(str: string): string {
	return interpreter.evaluateFromString(str, false); // Here, false means 'Do not catch exceptions'.
}

beforeAll(() => {
	interpreter = createInterpreter(LanguageSelector.Chapter1);
});

beforeEach(() => {
	// Run each test with a freshly initialized (not freshly created) interpreter:
	interpreter.initialize();
});

test('Chapter1Interpreter instance creation test', () => {
	// Arrange
	// Act
	// Assert
	expect(interpreter).toBeTruthy();
});

test('Chapter1Interpreter addition operator test 1', () => {
	// Arrange
	const input = '7';
	const expectedResult = input;

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('Chapter1Interpreter addition operator test 2', () => {
	// Arrange
	const input = '(+ 2 3)';
	const expectedResult = '5';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('Chapter1Interpreter addition operator test 3', () => {
	// Arrange
	const input = '(+ (+ 2 3) (+ 4 5))';
	const expectedResult = '14';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('Chapter1Interpreter miscellaneous tests', () => {
	// Arrange
	const whileTestInput =
		'(begin\n' +
		'  (set i 0)\n' +
		'  (set sum 0)\n' +
		'  (while (< i 10)\n' +
		'    (begin\n' +
		'      (set i (+ i 1))\n' +
		'      (set sum (+ sum i))\n' +
		'    )\n' +
		'  )\n' +
		'  sum\n' +
		')\n';
	const functionDefinitonTestSetupInput = '(define myadd (x y) (+ x y))';
	const functionDefinitonTestExecutionInput = '(myadd 7 13)';

	evalStr(functionDefinitonTestSetupInput);

	// Act

	// Assert
	expect(evalStr('7')).toBe('7');
	expect(evalStr('(- 2 3)')).toBe('-1');
	expect(evalStr('(* 2 3)')).toBe('6');
	expect(evalStr('(/ 72 3)')).toBe('24');
	expect(evalStr('(/ 73 3)')).toBe('24');
	expect(evalStr('(= 1 1)')).toBe(trueValueAsString);
	expect(evalStr('(= 1 2)')).toBe(falseValueAsString);
	expect(evalStr('(= 2 1)')).toBe(falseValueAsString);
	expect(evalStr('(< 1 1)')).toBe(falseValueAsString);
	expect(evalStr('(< 1 2)')).toBe(trueValueAsString);
	expect(evalStr('(< 2 1)')).toBe(falseValueAsString);
	expect(evalStr('(> 1 1)')).toBe(falseValueAsString);
	expect(evalStr('(> 1 2)')).toBe(falseValueAsString);
	expect(evalStr('(> 2 1)')).toBe(trueValueAsString);
	expect(evalStr('(if 1 8 13)')).toBe('8');
	expect(evalStr('(if 0 8 13)')).toBe('13');
	expect(evalStr(whileTestInput)).toBe('55');
	expect(evalStr('(begin (set x 34) x)')).toBe('34');
	expect(evalStr('(print 144)')).toBe('144\n144');
	expect(evalStr('(begin (print 144) 89)')).toBe('144\n89');
	expect(evalStr(functionDefinitonTestExecutionInput)).toBe('20');
});

test('Chapter1Interpreter gcd function test', () => {
	// Arrange
	const gcdFunctionDefinition =
		'(define gcd (a b) (if (= b 0) a (gcd b (- a (* (/ a b) b)))))';

	evalStr(gcdFunctionDefinition);

	// Act
	// Assert
	expect(evalStr('(gcd 36 21)')).toBe('3');
	expect(evalStr('(gcd 21 36)')).toBe('3');
});
