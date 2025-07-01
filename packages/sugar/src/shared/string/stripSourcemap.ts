/**
 * @name            stripSourcemap
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function simply take a string and get rid of all sourcemap
 *
 * @feature        Support sourcemap like `//# sourceMappingURL=...`
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __stripSourcemap($1)
 *
 * @todo     tests
 *
 * @example         js
 * import { __stripSourcemap } from '@blackbyte/sugar/string';
 * __stripSourcemap('...');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __stripSourcemap(str: string): string {
  str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, '');
  return str;
}
