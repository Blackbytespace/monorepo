import { sentenceCase } from 'change-case';

/**
 * @name                sentenceCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Sentence case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __sentenceCase($1)
 *
 * @example     js
 * import { __sentenceCase } from '@blackbyte/sugar/string';
 * __sentenceCase('hello world'); // => Hello world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __sentenceCase(text: string): string {
  return sentenceCase(text);
}
