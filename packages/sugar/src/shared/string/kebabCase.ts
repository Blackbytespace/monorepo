import { kebabCase } from 'change-case';

/**
 * @name                kebabCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Kebab case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __kebabCase($1)
 *
 * @example     js
 * import { __kebabCase } from '@coffeekraken/sugar/string.js';
 * __kebabCase('hello world'); // => Hello World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __kebabCase(text: string): string {
  return kebabCase(text);
}
