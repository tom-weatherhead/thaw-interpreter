// tom-weatherhead/thaw-interpreter/src/common/interpreter-base.ts

import { IGrammar, IParser, ITokenizer, LanguageSelector } from 'thaw-interpreter-types';

import { createTokenizer } from 'thaw-lexical-analyzer';

import { createGlobalInfo, createGrammar, IGlobalInfoForInterpreter } from 'thaw-grammar';

import { createParser } from 'thaw-parser';

import { IInterpreter } from './iinterpreter';

export class InterpreterBase implements IInterpreter {
	protected readonly tokenizer: ITokenizer;
	protected readonly grammar: IGrammar;
	protected readonly parser: IParser;
	protected readonly globalInfo: IGlobalInfoForInterpreter;

	constructor(ls: LanguageSelector, protected readonly quiet = false) {
		this.grammar = createGrammar(ls);
		this.tokenizer = createTokenizer(this.grammar.defaultLexicalAnalyzer, ls);
		this.parser = createParser(this.grammar.defaultParser, this.grammar);
		this.globalInfo = createGlobalInfo(ls, { tokenizer: this.tokenizer, parser: this.parser });

		this.globalInfo.initialize();
	}

	public get languageName(): string {
		return this.grammar.languageName;
	}

	public initialize(): void {
		// Restore the state of the interpreter to its newly-created state.
		this.globalInfo.initialize();
	}

	public evaluateFromString(inputString: string, catchExceptions?: boolean): string {
		this.globalInfo.clearPrintedText();

		let evaluationResultAsString = '';

		if (catchExceptions !== false) {
			// I.e. catchExceptions is true or undefined

			try {
				evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
			} catch (ex) {
				evaluationResultAsString = `Exception: ${ex}`;
			}
		} else {
			evaluationResultAsString = this.globalInfo.evaluateToString(inputString);
		}

		return this.globalInfo.getPrintedText() + evaluationResultAsString;
	}

	//     public virtual bool ProcessCommand(string input, out string output) {
	//         var result = true;
	//         const string strLoadSpace = "load ";
	//         const string strLoadPresetSpace = "loadPreset ";
	//         const string strScopeRuleCannotBeChanged = "The scoping rule for this language cannot be changed.";
	//         const string strDebugModeCannotBeChanged = "The debug mode cannot be changed for this language.";
	//
	//         if (input.StartsWith(strLoadSpace)) {
	//             const string fileLoadedMessage = "The file has been loaded; ";
	//             int numExpressionsEvaluated;
	//
	//             output = CompletePathAndLoadFile(input.Substring(strLoadSpace.Length).Trim(), out numExpressionsEvaluated, string.Empty);
	//
	//             if (!quiet) {
	//
	//                 if (numExpressionsEvaluated == 1) {
	//                     Console.WriteLine("{0}1 expression has been read.", fileLoadedMessage);
	//                 } else {
	//                     Console.WriteLine("{0}{1} expressions have been read.", fileLoadedMessage, numExpressionsEvaluated);
	//                 }
	//             }
	//         } else if (input.StartsWith(strLoadPresetSpace)) {
	//             var presetName = input.Substring(strLoadPresetSpace.Length).Trim();
	//
	//             output = globalInfoOps.LoadPreset(presetName);
	//         } else if (InputMatchesCommand(input, "clear")) {
	//             globalInfoOps.Clear();
	//             globalInfoOps.LoadPresets();
	//             output = "The global info has been cleared.";
	//         } else if (InputMatchesCommand(input, "static")) {
	//
	//             if (globalInfoOps.SetScoping(false)) {
	//                 output = "Scoping is now static.";
	//             } else {
	//                 output = strScopeRuleCannotBeChanged;
	//             }
	//         } else if (InputMatchesCommand(input, "dynamic")) {
	//
	//             if (globalInfoOps.SetScoping(true)) {
	//                 output = "Scoping is now dynamic.";
	//             } else {
	//                 output = strScopeRuleCannotBeChanged;
	//             }
	//         } else if (InputMatchesCommand(input, "debug on")) {
	//
	//             if (globalInfoOps.SetDebug(true)) {
	//                 output = "Debug mode is now on.";
	//             } else {
	//                 output = strDebugModeCannotBeChanged;
	//             }
	//         } else if (InputMatchesCommand(input, "debug off")) {
	//
	//             if (globalInfoOps.SetDebug(false)) {
	//                 output = "Debug mode is now off.";
	//             } else {
	//                 output = strDebugModeCannotBeChanged;
	//             }
	//         } else {
	//             output = string.Empty;
	//             result = false;
	//         }
	//
	//         return result;
	//     }
	//
	//     // Process commands that can only occur in files, e.g. Prolog's :- [file1, file2, file3]
	//
	//     protected virtual bool ProcessFileOnlyCommand(string line, out string commandOutput) {
	//         commandOutput = string.Empty;
	//         return false;
	//     }
	//
	//     // Returns true iff the trimmed line begins with a character that can begin a command in a file, e.g. not '[' in Prolog.
	//
	//     protected virtual bool LineFromFileStartsWithCommandChar(string line) {
	//         return true;
	//     }
	//
	//     protected virtual string EvaluateFromListOfTokens(List<Token> listOfTokens, ref string currentModuleName) {
	//         return Evaluate(parser.Parse(listOfTokens));
	//     }
	//
	//     private string ReadLines(string line, List<string> remainingLines, out int numExpressionsEvaluated, string currentModuleName = "") {
	//         var listOfTokens = new List<Token>();
	//         var numLeftBrackets = 0;
	//         var numRightBrackets = 0;
	//         var lineNum = 1;
	//         var baseLineNum = 1;
	//         var sb = new StringBuilder();
	//         var result = string.Empty;
	//
	//         numExpressionsEvaluated = 0;
	//
	//         for (; ; ) {
	//             string commandOutput;
	//
	//             var isInteractive = remainingLines == null;
	//             var tryToProcessFileOnlyCommand = !isInteractive;
	//             var tryToProcessCommand = isInteractive || LineFromFileStartsWithCommandChar(line);
	//
	//             if (listOfTokens.All(t => t.TokenType == TokenType.T_EOF) &&
	//                 ((tryToProcessFileOnlyCommand && ProcessFileOnlyCommand(line, out commandOutput)) ||
	//                 (tryToProcessCommand && ProcessCommand(line, out commandOutput)))) {
	//                 result = commandOutput;
	//
	//                 if (remainingLines == null) {
	//                     break;
	//                 }
	//
	//                 if (!quiet) {
	//                     Console.WriteLine(result);
	//                 }
	//
	//                 ++lineNum;
	//                 sb.Clear();
	//             } else {
	//
	//                 if (sb.Length > 0) {
	//                     sb.Append("\n");
	//                 } else {
	//                     baseLineNum = lineNum;
	//                 }
	//
	//                 sb.Append(line);
	//
	//                 listOfTokens = tokenizer.Tokenize(sb.ToString()).Select(token => token.CloneWithNewLineNumber(token.Line + baseLineNum - 1)).ToList();
	//
	//                 numLeftBrackets = listOfTokens.Count(token => token.TokenType == TokenType.T_LeftBracket);
	//                 numRightBrackets = listOfTokens.Count(token => token.TokenType == TokenType.T_RightBracket);
	//
	//                 if (numLeftBrackets < numRightBrackets) {
	//                     throw new Exception(string.Format("{0} too many right bracket(s) on line '{1}'.", numRightBrackets - numLeftBrackets, line));
	//                 }
	//
	//                 ++lineNum;
	//
	//                 if (numLeftBrackets == numRightBrackets && listOfTokens.Count > 1 && IsTokenListACompleteStatement(listOfTokens)) {
	//                     result = EvaluateFromListOfTokens(listOfTokens, ref currentModuleName);
	//                     listOfTokens.Clear();
	//                     sb.Clear();
	//                     ++numExpressionsEvaluated;
	//                     numLeftBrackets = 0;
	//                     numRightBrackets = 0;
	//
	//                     if (remainingLines == null) {
	//                         break;
	//                     }
	//
	//                     if (!quiet) {
	//                         Console.WriteLine(result);
	//                     }
	//                 }
	//             }
	//
	//             if (remainingLines == null) {
	//                 Console.Write("> ");
	//                 line = Console.ReadLine();
	//             } else if (remainingLines.Count > 0) {
	//                 line = remainingLines[0];
	//                 remainingLines.RemoveAt(0);
	//             } else {
	//                 break;
	//             }
	//         }
	//
	//         if (numLeftBrackets > numRightBrackets) {
	//             throw new Exception(string.Format("Incomplete file; {0} too many left bracket(s).", numLeftBrackets - numRightBrackets));
	//         } else if (listOfTokens.Any(t => t.TokenType != TokenType.T_EOF)) {
	//             throw new Exception("Unexpected end of input");
	//         }
	//
	//         return result;
	//     }
	//
	//     private string ReadLines(List<string> lines, out int numExpressionsEvaluated, string currentModuleName = "") {
	//
	//         if (lines == null || lines.Count == 0) {
	//             numExpressionsEvaluated = 0;
	//             return string.Empty;
	//         }
	//
	//         var line = lines[0];
	//
	//         lines.RemoveAt(0);
	//
	//         return ReadLines(line, lines, out numExpressionsEvaluated, currentModuleName);
	//     }
	//
	//     private string ReadLines(string line, List<string> lines) {
	//         int numExpressionsEvaluated;
	//
	//         return ReadLines(line, lines, out numExpressionsEvaluated);
	//     }
	//
	//     public string ReadLines(List<string> lines) {
	//         int numExpressionsEvaluated;
	//
	//         return ReadLines(lines, out numExpressionsEvaluated);
	//     }
	//
	//     private string ReadLineFromConsole(string line) {
	//         return ReadLines(line, null);
	//     }
	//
	//     public string ReadLineForTest(string line) {
	//         return ReadLines(line, new List<string>());
	//     }
	//
	//     protected virtual bool IsTokenListACompleteStatement(List<Token> listOfTokens) {
	//         return true;
	//     }
	//
	//     protected string CompletePathAndLoadFile(string filename, out int numExpressionsEvaluated, string currentModuleName) {
	//
	//         //if (!filename.Contains('\\'))
	//         if (!filename.StartsWith(@"\") && !filename.Contains(':')) { // I.e. if  filename is relative, not absolute.
	//             filename = Path.Combine(DefaultDirectory, filename);
	//         }
	//
	//         return LoadFileUsingCompletedPath(filename, out numExpressionsEvaluated, currentModuleName);
	//     }
	//
	//     protected string LoadFileUsingCompletedPath(string filename, out int numExpressionsEvaluated, string currentModuleName) {
	//
	//         if (!quiet) {
	//             Console.WriteLine("Loading file '{0}'...", filename);
	//         }
	//
	//         return ReadLines(File.ReadLines(filename).ToList(), out numExpressionsEvaluated, currentModuleName);
	//     }
	//
	//     public string LoadFileUsingCompletedPath(string filename, string currentModuleName = "") {
	//         int numExpressionsEvaluated;
	//
	//         return LoadFileUsingCompletedPath(filename, out numExpressionsEvaluated, currentModuleName);
	//     }
	//
	//     public void LoadFile(string filename) {
	//         int numExpressionsEvaluated;
	//
	//         CompletePathAndLoadFile(filename, out numExpressionsEvaluated, string.Empty);
	//     }
}

// The C# version:

// public interface IInterpreter {
//     void LoadFile(string filePath);
//     void ReadEvalPrintLoop();
// }
//
// public interface IInterpreterFileLoader {
//     string LoadFileUsingCompletedPath(string filename, string currentModuleName = "");
// }
//
// public interface IInterpreterUnitTestInterface extends IInterpreterFileLoader {
//     string DefaultDirectoryFromTests { get; }
//     string ReadLines(List<string> lines);
//     string ReadLineForTest(string line);
// }
//
// public abstract class InterpreterBase : IInterpreter, IInterpreterUnitTestInterface
// {
//     protected readonly ITokenizer tokenizer;
//     protected readonly IParser parser;
//     private IGlobalInfoOps globalInfoOps = null;
//     protected readonly bool quiet;
//
//     protected InterpreterBase(GrammarSelector gs, bool quiet = false) {
//         this.quiet = quiet;
//
//         if (!quiet) {
//             Console.WriteLine("Initializing...");
//         }
//
//         tokenizer = TokenizerFactory.Create(gs);
//         parser = ParserFactory.Create(ps, gs);
//
//         if (!quiet) {
//             Console.WriteLine("There are {0} states in the parser's state machine.", parser.NumberOfStates);
//         }
//     }
//
//     protected void SetGlobalInfoOps(IGlobalInfoOps g) {
//         globalInfoOps = g;
//         globalInfoOps.LoadPresets();
//     }
//
//     public abstract string LanguageName { get; }
//
//     public virtual string DefaultDirectory { get { return string.Format(@"..\..\..\InferenceLibs\Inference\Interpreter\{0}\Code", LanguageName); } }
//
//     public string DefaultDirectoryFromTests { get { return @"..\" + DefaultDirectory; } }
//
//     public abstract string Evaluate(object parseResult);
//
//     private bool InputMatchesCommand(string input, string command) {
//         return input == command || input.StartsWith(command + " ");
//     }
//
//     public void ReadEvalPrintLoop() {
//         // Note: This method is never quiet.
//         Console.WriteLine("{0} interpreter", LanguageName);
//         Console.WriteLine();
//
//         for (; ; ) {
//             // Read.
//             Console.Write("-> ");
//
//             var input = Console.ReadLine();
//             string output;
//
//             // Evaluate.
//
//             if (input.StartsWith("quit") || input.StartsWith("exit") || input.StartsWith("bye")) {
//                 break;
//             }
//
//             try
//             {
//                 output = ReadLineFromConsole(input);
//             }
//             catch (ExceptionWithLineAndColumnNumbers ex)
//             {
//                 output = string.Format("{0}: {1}", ex.GetType().Name, ex.FullMessage);
//             }
//             catch (Exception ex)
//             {
//                 output = string.Format("{0}: {1}", ex.GetType().FullName, ex.Message);
//             }
//
//             // Print.
//
//             if (!string.IsNullOrEmpty(output))
//             {
//                 Console.WriteLine(output);
//             }
//
//             Console.WriteLine();
//         }
//     }
// }
