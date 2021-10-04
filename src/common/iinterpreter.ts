// tom-weatherhead/thaw-interpreter/src/common/iinterpreter.ts

export interface IInterpreter {
	languageName: string; // This is a 'get' accessor.

	// loadFile(filePath: string): void;

	initialize(): void; // Restore the state of the interpreter to its newly-created state.

	// Parameters in functions in interfaces cannot have initializers.
	evaluateFromString(inputString: string, catchExceptions?: boolean): string;
	// Or: evaluateFromString(inputString: string, options?: { catchExceptions?: boolean }): string;
}
