/**
 * @name            styleString2Object
 * @namespace       js.css.transform
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Transform a style string to an object representation
 *
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @todo      tests
 *
 * @snippet         __styleStringToObject($1)
 *
 * @example 	js
 * import { __styleStringToObject } from '@lotsof/sugar/css'
 * const styleString =  __styleStringToObject('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __styleStringToObject(style: string): any;
