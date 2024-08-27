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
 * import { __parseHsla } from '@lotsof/sugar/color';
 * __parseHsla('hsl(20,20,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TParseHslaResult = {
    h: number;
    s: number;
    l: number;
    a: number;
};
export default function __parseHsla(hslaString: string): TParseHslaResult;
