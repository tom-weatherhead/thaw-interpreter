# thaw-interpreter
Programming language interpreters, including LISP, Scheme, and Prolog.

Obligatory BadgeFest:

[![apple][apple-badge-image]][apple-url]
[![atom][atom-badge-image]][atom-url]
[![circleci][circleci-badge-image]][circleci-url]
[![codeclimate][codeclimate-badge-image]][codeclimate-url]
[![git][git-badge-image]][git-url]
[![github][github-badge-image]][github-url]
[![npm][npm-badge-image]][npm-url]
[![packagephobia][packagephobia-badge-image]][packagephobia-url]
[![terminal][terminal-badge-image]][terminal-url]
[![typescript][typescript-badge-image]][typescript-url]

[![status][status-badge-image]][status-url]
[![build status][build-status-badge-image]][build-status-url]
[![npm version][npm-version-badge-image]][npm-version-url]
[![latest tag][latest-tag-badge-image]][latest-tag-url]
[![npm total downloads][npm-total-downloads-badge-image]][npm-total-downloads-url]
[![watchers][watchers-badge-image]][watchers-url]
[![stars][stars-badge-image]][stars-url]
[![issues][issues-badge-image]][issues-url]
[![forks][forks-badge-image]][forks-url]
[![contributors][contributors-badge-image]][contributors-url]
[![branches][branches-badge-image]][branches-url]
[![releases][releases-badge-image]][releases-url]
[![commits][commits-badge-image]][commits-url]
[![last commit][last-commit-badge-image]][last-commit-url]
[![types][types-badge-image]][types-url]
[![install size][install-size-badge-image]][install-size-url]
[![known vulnerabilities][known-vulnerabilities-badge-image]][known-vulnerabilities-url]
[![lines of code][lines-of-code-badge-image]][lines-of-code-url]
[![technical debt][technical-debt-badge-image]][technical-debt-url]
[![maintainability][maintainability-badge-image]][maintainability-url]
[![test coverage][test-coverage-badge-image]][test-coverage-url]
[![tested with jest][jest-badge-image]][jest-url]
[![code style: prettier][prettier-badge-image]][prettier-url]
[![license][license-badge-image]][license-url]

Much of the code in this library was based on or inspired by the book 'Programming Languages: An Interpreter-Based Approach', by Samuel N. Kamin, 1990, Addison Wesley, ISBN 0-201-06824-9.

## Building and Installing the App

Build and install the app via:

```console
$ npm run all
$ npm link
```

## Launching the App

Start an interpreter via the command:

```console
$ intrp [language-name]
```

... where [language-name] is one of:

- minimal
- chapter1
- lisp
- apl
- scheme
- sasl
- clu
- smalltalk
- prolog

## Session Example

```console
$ intrp scheme

This is the command line interface for thaw-interpreter

Starting the read-evaluate-print loop:

> (+ 2 3)
5

> exit
Exiting...

$
```

## The Script Runner

The interpreter provides a limited facility for running scripts. Currently, it is capable of reducing Lambda calculus expressions.

Example: Addition of two Church numerals using pure Lambda calculus:

```console
$ ./run-script.js lcaug examples/scripts/lambda-calculus-augmented-syntax/test1.lca 

Expression as string: (+ 2 3) 

Parsed expression: λf.λx.((λf.λx.(f (f (f x))) f) ((λf.λx.(f (f x)) f) x))

Reduced expression: Integer 5
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

[apple-badge-image]: https://badgen.net/badge/icon/apple?icon=apple&label
[apple-url]: https://www.apple.com
[atom-badge-image]: https://badgen.net/badge/icon/atom?icon=atom&label
[atom-url]: https://atom.io
[circleci-badge-image]: https://badgen.net/badge/icon/circleci?icon=circleci&label
[circleci-url]: https://circleci.com
[codeclimate-badge-image]: https://badgen.net/badge/icon/codeclimate?icon=codeclimate&label
[codeclimate-url]: https://codeclimate.com
[git-badge-image]: https://badgen.net/badge/icon/git?icon=git&label
[git-url]: https://git-scm.com
[github-badge-image]: https://badgen.net/badge/icon/github?icon=github&label
[github-url]: https://github.com
[npm-badge-image]: https://badgen.net/badge/icon/npm?icon=npm&label
[npm-url]: https://npmjs.com
[packagephobia-badge-image]: https://badgen.net/badge/icon/packagephobia?icon=packagephobia&label
[packagephobia-url]: https://packagephobia.com/
[terminal-badge-image]: https://badgen.net/badge/icon/terminal?icon=terminal&label
[terminal-url]: https://en.wikipedia.org/wiki/History_of_Unix
[typescript-badge-image]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[typescript-url]: https://www.typescriptlang.org

[status-badge-image]: https://badgen.net/github/status/tom-weatherhead/thaw-interpreter
[status-url]: https://badgen.net/github/status/tom-weatherhead/thaw-interpreter
[build-status-badge-image]: https://circleci.com/gh/tom-weatherhead/thaw-interpreter.svg?style=shield
[build-status-url]: https://circleci.com/gh/tom-weatherhead/thaw-interpreter
[npm-version-badge-image]: https://img.shields.io/npm/v/thaw-interpreter.svg
[npm-version-url]: https://www.npmjs.com/package/thaw-interpreter
[latest-tag-badge-image]: https://badgen.net/github/tag/tom-weatherhead/thaw-interpreter
[latest-tag-url]: https://github.com/tom-weatherhead/thaw-interpreter/tags
[npm-total-downloads-badge-image]: https://img.shields.io/npm/dt/thaw-interpreter.svg
[npm-total-downloads-url]: https://www.npmjs.com/package/thaw-interpreter
[watchers-badge-image]: https://badgen.net/github/watchers/tom-weatherhead/thaw-interpreter
[watchers-url]: https://github.com/tom-weatherhead/thaw-interpreter/watchers
[stars-badge-image]: https://badgen.net/github/stars/tom-weatherhead/thaw-interpreter
[stars-url]: https://github.com/tom-weatherhead/thaw-interpreter/stargazers
[issues-badge-image]: https://badgen.net/github/issues/tom-weatherhead/thaw-interpreter
[issues-url]: https://github.com/tom-weatherhead/thaw-interpreter/issues
[forks-badge-image]: https://badgen.net/github/forks/tom-weatherhead/thaw-interpreter
[forks-url]: https://github.com/tom-weatherhead/thaw-interpreter/network/members
[contributors-badge-image]: https://badgen.net/github/contributors/tom-weatherhead/thaw-interpreter
[contributors-url]: https://github.com/tom-weatherhead/thaw-interpreter/graphs/contributors
[branches-badge-image]: https://badgen.net/github/branches/tom-weatherhead/thaw-interpreter
[branches-url]: https://github.com/tom-weatherhead/thaw-interpreter/branches
[releases-badge-image]: https://badgen.net/github/releases/tom-weatherhead/thaw-interpreter
[releases-url]: https://github.com/tom-weatherhead/thaw-interpreter/releases
[commits-badge-image]: https://badgen.net/github/commits/tom-weatherhead/thaw-interpreter
[commits-url]: https://github.com/tom-weatherhead/thaw-interpreter/commits/master
[last-commit-badge-image]: https://badgen.net/github/last-commit/tom-weatherhead/thaw-interpreter
[last-commit-url]: https://github.com/tom-weatherhead/thaw-interpreter
[types-badge-image]: https://badgen.net/npm/types/thaw-interpreter
[types-url]: https://badgen.net/npm/types/thaw-interpreter
[install-size-badge-image]: https://badgen.net/packagephobia/install/thaw-interpreter
[install-size-url]: https://badgen.net/packagephobia/install/thaw-interpreter
[known-vulnerabilities-badge-image]: https://snyk.io/test/github/tom-weatherhead/thaw-interpreter/badge.svg?targetFile=package.json&package-lock.json
[known-vulnerabilities-url]: https://snyk.io/test/github/tom-weatherhead/thaw-interpreter?targetFile=package.json&package-lock.json
[lines-of-code-badge-image]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-interpreter
[lines-of-code-url]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-interpreter
[technical-debt-badge-image]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-interpreter
[technical-debt-url]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-interpreter
[maintainability-badge-image]: https://api.codeclimate.com/v1/badges/00fd26bf392fe00fc933/maintainability
[maintainability-url]: https://codeclimate.com/github/tom-weatherhead/thaw-interpreter/maintainability
[test-coverage-badge-image]: https://api.codeclimate.com/v1/badges/00fd26bf392fe00fc933/test_coverage
[test-coverage-url]: https://codeclimate.com/github/tom-weatherhead/thaw-interpreter/test_coverage
[jest-badge-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest
[prettier-badge-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-badge-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/tom-weatherhead/thaw-interpreter/blob/master/LICENSE
