import { capitalCase } from 'change-case';

/**
 * @name                capitalCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Capital case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __capitalCase($1)
 *
 * @example     js
 * import { __capitalCase } from '@coffeekraken/sugar/string.js';
 * __capitalCase('hello world'); // => HELLO WORLD
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __capitalCase(text: string): string {
  return capitalCase(text);
}
