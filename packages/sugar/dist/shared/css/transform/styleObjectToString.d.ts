/**
 * @name            styleObject2String
 * @namespace       js.css.transform
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Transform a style object to inline string separated by ;
 *
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @todo      tests
 *
 * @snippet         __styleObjectToString($1)
 *
 * @example 	js
 * import { __styleObjectToString } from '@lotsof/sugar/css'
 * const styleString =  __styleObjectToString({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __styleObjectToString(styleObj: any): string;
