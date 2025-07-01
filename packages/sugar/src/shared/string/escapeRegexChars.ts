/**
 * @name                escapeRegexChars
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Escape regex special characters from a string
 *
 * @param         {String}          str        The string to escape regex characters from
 * @return        {String}                      The escaped string
 *
 * @todo      tests
 *
 * @snippet         __escapeRegexChars($1)
 *
 * @example     js
 * import { __escapeRegexChars } from '@blackbyte/sugar/string';
 * __escapeRegexChars('/hello()'); // => \/hello\(\)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __escapeRegexChars(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
