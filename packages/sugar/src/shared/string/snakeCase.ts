import { snakeCase } from 'change-case';

/**
 * @name                snakeCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Snake case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __snakeCase($1)
 *
 * @example     js
 * import { __snakeCase } from '@lotsof/sugar/string';
 * __snakeCase('hello world'); // => hello_world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __snakeCase(text: string): string {
  return snakeCase(text);
}
