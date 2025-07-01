/**
 * @name                parseHsla
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslaString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @todo      tests
 *
 * @snippet         __parseHsla($1)
 *
 * @example         js
 * import { __parseHsla } from '@blackbyte/sugar/color';
 * __parseHsla('hsl(20,20,20)');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TParseHslaResult = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export default function __parseHsla(hslaString: string): TParseHslaResult {
  hslaString = hslaString.toLowerCase();
  const string = hslaString
    .replace('hsla(', '')
    .replace('hsl(', '')
    .replace(')', '')
    .replace(/\s/g, '');
  const array = string.split(',');

  return {
    h: parseFloat(array[0]),
    s: parseFloat(array[1]),
    l: parseFloat(array[2]),
    a: array[3] ? parseFloat(array[3]) : 1,
  };
}
