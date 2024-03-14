// @ts-nocheck

import __clipboardy from "clipboardy";

/**
 * @name            readText
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Simple function to read things from the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @return       {String}             The text to read
 *
 * @todo      tests
 *
 * @snippet         __read()
 *
 * @example       js
 * import { __copy, __read } from '@lotsof/sugar/clipboard';
 * __copy('Hello world');
 * __read(); // => Hello world
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __readText(): string {
    return __clipboardy.readSync();
}
