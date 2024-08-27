/**
 * @name                        parseRgba
 * @namespace                   shared.color
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @todo      tests
 *
 * @snippet         __parseRgba($1)
 *
 * @example           js
 * import { __parseRgba } from '@lotsof/sugar/color';
 * __parseRgba('rgba(20,10,100,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TParseRgbaResult = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export default function __parseRgba(rgbaString: string): TParseRgbaResult;
