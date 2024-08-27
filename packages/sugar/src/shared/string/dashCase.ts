import { kebabCase } from 'change-case';

/**
 * @name                dashCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Dash case a string
 *
 * @param         {String}          text        The string to dashCase
 * @return        {String}                      The dashCased string
 *
 * @todo      tests
 *
 * @snippet         __dashCase($1)
 *
 * @example     js
 * import { __dashCase } from '@lotsof/sugar/string';
 * __dashCase('hello world'); // => hello-world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __dashCase(text: string): string {
  return kebabCase(text);
}
