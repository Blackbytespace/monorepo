/**
 * @name                    extractSame
 * @namespace               shared.string
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function return you what has been find the same in the two passed string.
 * It will return you either an array of same string parts or a simple string
 * representing the first same part found.
 *
 * @param         {String}            string1         The string 1 to compare
 * @param         {String}            string2         The string 2 to compare
 * @param         {Boolean}           [multiple=false]      Specify if you want to get back multiple same string if exists as an array
 * @return      {String|Array}                      The same string part(s) found
 *
 * @todo      tests
 *
 * @snippet             __extractSame($1)
 *
 * @example       js
 * import { __extractSame } from '@lotsof/sugar/string';
 * __extractSame('Hello world', 'Hello plop'); // => 'Hello '
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __extractSame(string1: string, string2: string, multiple?: boolean): string[];
