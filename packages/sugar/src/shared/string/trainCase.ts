import { trainCase } from 'change-case';

/**
 * @name                trainCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Train case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __trainCase($1)
 *
 * @example     js
 * import { __trainCase } from '@blackbyte/sugar/string';
 * __trainCase('hello world'); // => Hello-World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __trainCase(text: string): string {
  return trainCase(text);
}
