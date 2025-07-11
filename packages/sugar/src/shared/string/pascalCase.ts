import { pascalCase } from 'change-case';

/**
 * @name                pascalCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pascal case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __pascalCase($1)
 *
 * @example     js
 * import { __pascalCase } from '@blackbyte/sugar/string';
 * __pascalCase('hello world'); // => HelloWorld
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __pascalCase(text: string): string {
  return pascalCase(text);
}
