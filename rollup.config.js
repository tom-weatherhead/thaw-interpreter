// rollup.config.js

/**
 * Copyright (c) Tom Weatherhead. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
	input: './dist/lib/main.js',
	output: [
		{
			file: 'dist/thaw-interpreter.cjs.js',
			format: 'cjs',
			exports: 'named'
		},
		{
			file: 'dist/thaw-interpreter.esm.js',
			format: 'es',
			esModule: true,
			compact: true,
			plugins: [terser()]
		}
		// Do not create a browser bundle because it would depend on "stream"
		// and "util", so we would need node polyfills.
		// See https://github.com/ionic-team/rollup-plugin-node-polyfills

		// ,
		// {
		// 	file: 'dist/thaw-interpreter.js',
		// 	name: 'thaw-interpreter',
		// 	format: 'umd',
		// 	compact: true,
		// 	plugins: [terser()]
		// }
	],
	context: 'this',
	plugins: [nodeResolve()]
};
