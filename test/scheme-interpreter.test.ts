// tom-weatherhead/thaw-interpreter/test/scheme-interpreter.test.ts

'use strict';

// TODO: Ensure that there is a test function for each primop: (* = Done, ~ = Partially tested)
// * Symbol.terminalPlus
// * Symbol.terminalMinus
// * Symbol.terminalMultiply
// * Symbol.terminalDivide
// * Symbol.terminalEquals
// * Symbol.terminalLessThan
// * Symbol.terminalGreaterThan
// * Symbol.terminalPrint
// * Symbol.terminalCons
// * Symbol.terminalCar
// * Symbol.terminalCdr
// * Symbol.terminalNumberPred
// * Symbol.terminalSymbolPred
// * Symbol.terminalListPred
// * Symbol.terminalNullPred
// * Symbol.terminalPrimOpPred // Added for Scheme.
// * Symbol.terminalClosurePred // Added for Scheme.
// * Symbol.terminalStringPred
// * Symbol.terminalList
// * Symbol.terminalRandom
// * Symbol.terminalFloor
// * Symbol.terminalCond
// * Symbol.terminalLet
// * Symbol.terminalLetStar
// * Symbol.terminalLetRec
// Symbol.terminalToString
// Symbol.terminalListToString
// Symbol.terminalStringToList
// Symbol.terminalStringToSymbol
// Symbol.terminalStringLessThan
// Symbol.terminalRplaca
// Symbol.terminalRplacd
// Symbol.terminalPow
// Symbol.terminalExp
// Symbol.terminalLn
// Symbol.terminalSin
// Symbol.terminalCos
// Symbol.terminalTan
// Symbol.terminalAtan2
// Symbol.terminalThrow

import { LanguageSelector } from 'thaw-interpreter-types';

import { createInterpreter, IInterpreter } from '..';

const trueValueAsString = 'T';
const falseValueAsString = '()';

const exampleNumber = '144';
const exampleSymbol = "'abc";
const exampleList = "'(1 2 3)";
const exampleNull = "'()";
const examplePrimOp = '+';
const exampleClosure = 'myadd';
// const exampleString = '...';

const exampleClosureInput = '(set myadd (lambda (x y) (+ x y)))';

const fnMakeRecursiveFunctionDefinition = (letKeyword: string) => `
(set length (lambda (sexpr)
	(${letKeyword}
		(
			(lll (lambda (sexpr2)
				(if (list? sexpr2) (+ (lll (cdr sexpr2)) 1) 0)
			))
		)
		(lll sexpr)
	)
))`;

let interpreter: IInterpreter;

function evalStr(str: string): string {
	return interpreter.evaluateFromString(str, false); // Here, false means 'Do not catch exceptions'.
}

beforeAll(() => {
	interpreter = createInterpreter(LanguageSelector.Scheme);
});

beforeEach(() => {
	// Run each test with a freshly initialized (not freshly created) interpreter:
	interpreter.initialize();
});

test('SchemeInterpreter instance creation test', () => {
	// Arrange
	// Act
	// Assert
	expect(interpreter).toBeTruthy();
});

test('SchemeInterpreter addition operator test 1', () => {
	// Arrange
	const input = '7';
	const expectedResult = input;

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('SchemeInterpreter addition operator test 2', () => {
	// Arrange
	const input = '(+ 2 3)';
	const expectedResult = '5';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('SchemeInterpreter addition operator test 3', () => {
	// Arrange
	const input = '(+ (+ 2 3) (+ 4 5))';
	const expectedResult = '14';

	// Act
	const actualResult = evalStr(input);

	// Assert
	expect(actualResult).toBe(expectedResult);
});

test('SchemeInterpreter miscellaneous tests', () => {
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
	const functionDefinitonTestSetupInput = exampleClosureInput;
	const functionDefinitonTestExecutionInput = '(myadd 7 13)';

	evalStr(functionDefinitonTestSetupInput);

	// Act
	// Assert
	expect(evalStr(whileTestInput)).toBe('55');
	expect(evalStr(functionDefinitonTestExecutionInput)).toBe('20');
});

test('SchemeInterpreter integer literal test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('7')).toBe('7');
});

test('SchemeInterpreter subtraction test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(- 2 3)')).toBe('-1');
});

test('SchemeInterpreter multiplication test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(* 2 3)')).toBe('6');
});

test('SchemeInterpreter division test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(/ 72 3)')).toBe('24');
	expect(evalStr('(/ 73 3)')).toBe('24');
});

test('SchemeInterpreter equals test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(= 1 1)')).toBe(trueValueAsString);
	expect(evalStr('(= 1 2)')).toBe(falseValueAsString);
	expect(evalStr('(= 2 1)')).toBe(falseValueAsString);
});

test('SchemeInterpreter less than test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(< 1 1)')).toBe(falseValueAsString);
	expect(evalStr('(< 1 2)')).toBe(trueValueAsString);
	expect(evalStr('(< 2 1)')).toBe(falseValueAsString);
});

test('SchemeInterpreter greater than test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(> 1 1)')).toBe(falseValueAsString);
	expect(evalStr('(> 1 2)')).toBe(falseValueAsString);
	expect(evalStr('(> 2 1)')).toBe(trueValueAsString);
});

test('SchemeInterpreter if test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(if (= 0 0) 8 13)')).toBe('8');
	expect(evalStr('(if (= 0 1) 8 13)')).toBe('13');
});

test('SchemeInterpreter begin + set test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(begin (set x 34) x)')).toBe('34');
});

test('SchemeInterpreter print test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(print 144)')).toBe('144\n144');
});

test('SchemeInterpreter begin + print test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(begin (print 144) 89)')).toBe('144\n89');
});

test('SchemeInterpreter number? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(number? ${exampleNumber})`)).toBe(trueValueAsString);
	expect(evalStr(`(number? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(number? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(number? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(number? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(number? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter symbol? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(symbol? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(symbol? ${exampleSymbol})`)).toBe(trueValueAsString);
	expect(evalStr(`(symbol? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(symbol? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(symbol? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(symbol? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter list? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(list? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(list? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(list? ${exampleList})`)).toBe(trueValueAsString);
	expect(evalStr(`(list? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(list? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(list? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter null? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(null? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(null? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(null? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(null? ${exampleNull})`)).toBe(trueValueAsString);
	expect(evalStr(`(null? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(null? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter primop? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(primop? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(primop? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(primop? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(primop? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(primop? ${examplePrimOp})`)).toBe(trueValueAsString);
	expect(evalStr(`(primop? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter closure? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(closure? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(closure? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(closure? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(closure? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(closure? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(closure? ${exampleClosure})`)).toBe(trueValueAsString);
});

test('SchemeInterpreter string? test', () => {
	// Arrange
	evalStr(exampleClosureInput);

	// Act
	// Assert
	expect(evalStr(`(string? ${exampleNumber})`)).toBe(falseValueAsString);
	expect(evalStr(`(string? ${exampleSymbol})`)).toBe(falseValueAsString);
	expect(evalStr(`(string? ${exampleList})`)).toBe(falseValueAsString);
	expect(evalStr(`(string? ${exampleNull})`)).toBe(falseValueAsString);
	expect(evalStr(`(string? ${examplePrimOp})`)).toBe(falseValueAsString);
	expect(evalStr(`(string? ${exampleClosure})`)).toBe(falseValueAsString);
});

test('SchemeInterpreter car test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr("(cons 1 '())")).toBe('(1)');
	expect(evalStr("(cons 1 '(2))")).toBe('(1 2)');
	expect(evalStr("(cons 1 '(2 3))")).toBe('(1 2 3)');
});

test('SchemeInterpreter car test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr("(car '(1 2 3))")).toBe('1');
});

test('SchemeInterpreter cdr test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr("(cdr '(1 2 3))")).toBe('(2 3)');
});

test('SchemeInterpreter list (primitive operator) test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(list 1 2 3)')).toBe('(1 2 3)');
});

test('SchemeInterpreter random test', () => {
	// Arrange
	evalStr('(set n 100)');

	// Act
	evalStr('(set r (random n))');

	// Assert
	expect(evalStr('(< r 0)')).toBe(falseValueAsString);
	expect(evalStr('(< r n)')).toBe(trueValueAsString);
});

test('SchemeInterpreter floor test', () => {
	// Arrange
	// Act
	// Assert
	expect(evalStr('(floor 3)')).toBe('3');
	expect(evalStr('(floor 7.125)')).toBe('7');
	expect(evalStr('(floor -7.125)')).toBe('-8');
});

test('SchemeInterpreter cond test', () => {
	// Arrange
	evalStr(`
(set f (lambda (x y)
	(cond
		((< x y) -1)
		((> x y) 1)
		('T 0)
	)
))`);

	// Act
	// Assert
	expect(evalStr('(f 1 1)')).toBe('0');
	expect(evalStr('(f 1 2)')).toBe('-1');
	expect(evalStr('(f 2 1)')).toBe('1');
});

test('SchemeInterpreter let test', () => {
	// Arrange
	// Act
	// Assert
	expect(
		evalStr(`
(let
	(
		(a 2)
		(b 3)
	)
	(+ a b)
)`)
	).toBe('5');
});

test('SchemeInterpreter let throw test 1', () => {
	// Arrange
	// Act
	// Assert
	expect(() =>
		evalStr(`
(let
	(
		(a 2)
		(b (+ a 1))
	)
	b
)`)
	).toThrow(); // ('EvaluationException');
});

test('SchemeInterpreter let throw test 2', () => {
	// Test to ensure that a recursive declaration fails in let and let*, but succeeds in letrec.

	// Arrange
	evalStr(fnMakeRecursiveFunctionDefinition('let'));

	// Act
	// Assert
	// expect(() => evalStr("(length '(1 2 3))")).toThrow('EvaluationException');
	expect(() => evalStr("(length '(1 2 3))")).toThrow();
});

test('SchemeInterpreter let* test', () => {
	// Arrange
	// Act
	// Assert
	expect(
		evalStr(`
(let*
	(
		(a 2)
		(b 3)
	)
	(+ a b)
)`)
	).toBe('5');
	expect(
		evalStr(`
(let*
	(
		(a 2)
		(b a)
	)
	b
)`)
	).toBe('2');
});

test('SchemeInterpreter let* throw test 1', () => {
	// Test to ensure that a recursive declaration fails in let and let*, but succeeds in letrec.

	// Arrange
	evalStr(fnMakeRecursiveFunctionDefinition('let*'));

	// Act
	// Assert
	// expect(() => evalStr("(length '(1 2 3))")).toThrow('EvaluationException');
	expect(() => evalStr("(length '(1 2 3))")).toThrow();
});

test('SchemeInterpreter letrec test', () => {
	// Arrange
	evalStr(fnMakeRecursiveFunctionDefinition('letrec'));

	// Act
	// Assert
	expect(
		evalStr(`
(letrec
	(
		(a 2)
		(b 3)
	)
	(+ a b)
)`)
	).toBe('5');
	expect(
		evalStr(`
(letrec
	(
		(a 2)
		(b a)
	)
	b
)`)
	).toBe('2');
	// Test to ensure that a recursive declaration fails in let and let*, but succeeds in letrec.
	expect(evalStr("(length '(1 2 3))")).toBe('3');
});

test('SchemeInterpreter call/cc test 1', () => {
	// Arrange
	evalStr(fnMakeRecursiveFunctionDefinition('letrec'));

	// Act
	// Assert
	expect(
		evalStr(`
(call/cc (lambda (continuation) (begin
	(continuation 7)
	13
)))`)
	).toBe('7');
});

test('SchemeInterpreter nested call/cc test', () => {
	// Arrange
	evalStr(fnMakeRecursiveFunctionDefinition('letrec'));

	// Act
	// Assert
	expect(
		evalStr(`
(call/cc (lambda (continuation1) (+ 1
	(call/cc (lambda (continuation2) (begin
		(continuation1 2)
		4
	)))
)))`)
	).toBe('2'); // Will the result be 2, 3, 4, or 5?
});

// **** More complex tests ****

test('SchemeInterpreter gcd function test', () => {
	// Arrange
	const gcdFunctionDefinition =
		'(set gcd (lambda (a b) (if (= b 0) a (gcd b (- a (* (/ a b) b))))))';

	evalStr(gcdFunctionDefinition);

	// Act
	// Assert
	expect(evalStr('(gcd 36 21)')).toBe('3');
	expect(evalStr('(gcd 21 36)')).toBe('3');
});

test('SchemeInterpreter Fibonacci generator test', () => {
	// Arrange
	const fibonacciGeneratorDefinition = `
(set fib (lambda (a b)
	(lambda () (begin
		(print a b)
		(fib b (+ a b))
	))
))`;
	const fibonacciGeneratorCreation = '(set gen (fib 1 1))';
	const fibonacciGeneratorCall = '(set gen (gen))';

	evalStr(fibonacciGeneratorDefinition);
	evalStr(fibonacciGeneratorCreation);

	// Act
	// Assert
	expect(evalStr(fibonacciGeneratorCall)).toBe('1, 1\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('1, 2\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('2, 3\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('3, 5\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('5, 8\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('8, 13\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('13, 21\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('21, 34\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('34, 55\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('55, 89\n<closure>');
	expect(evalStr(fibonacciGeneratorCall)).toBe('89, 144\n<closure>');
});

test('SchemeInterpreter list length test 1', () => {
	// Arrange
	const listLengthFunctionDefinition = `
(set length (lambda (sexpr)
	(if (null? sexpr)
		0
		(+ 1 (length (cdr sexpr)))
	)
))`;

	evalStr(listLengthFunctionDefinition);

	// Act
	// Assert
	expect(evalStr("(length '())")).toBe('0');
	expect(evalStr("(length '(a))")).toBe('1');
	expect(evalStr("(length '(a b))")).toBe('2');
	expect(evalStr("(length '(a b c))")).toBe('3');
});

test('SchemeInterpreter list length test 2', () => {
	// Arrange
	const listLengthFunctionDefinition = `
(set length (lambda (sexpr)
	(letrec
		(
			(lll (lambda (sexpr2)
				(if (list? sexpr2) (+ (lll (cdr sexpr2)) 1) 0)
			))
		)
		(lll sexpr)
	)
))`;

	evalStr(listLengthFunctionDefinition);

	// Act
	// Assert
	expect(evalStr("(length '())")).toBe('0'); // Passes
	expect(evalStr("(length '(a))")).toBe('1');
	expect(evalStr("(length '(a b))")).toBe('2');
	expect(evalStr("(length '(a b c))")).toBe('3');
	expect(evalStr(`(length ${exampleNumber})`)).toBe('0');
	expect(evalStr('(length 3)')).toBe('0');
	expect(evalStr(`(length ${exampleSymbol})`)).toBe('0');
	expect(evalStr(`(length ${examplePrimOp})`)).toBe('0');

	evalStr(exampleClosureInput);
	expect(evalStr(`(length ${exampleClosure})`)).toBe('0');
});
