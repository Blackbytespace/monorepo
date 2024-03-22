import { paramCase } from 'param-case';

/**
 * @name                dashCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * dashCase a string
 *
 * @param         {String}          text        The string to dashCase
 * @return        {String}                      The dashCased string
 *
 * @todo      tests
 *
 * @snippet         __dashCase($1)
 *
 * @example     js
 * import { __dashCase } from '@coffeekraken/sugar/string';
 * __dashCase('hello world'); // => hello-world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __dashCase(text: string): string {
  return paramCase(text);
}
