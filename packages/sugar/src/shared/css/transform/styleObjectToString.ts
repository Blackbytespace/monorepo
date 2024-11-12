import __uncamelize from '../../../shared/string/uncamelize.js';

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
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __styleObjectToString(styleObj: any): string {
  // process the style object
  const propertiesArray: string[] = [];
  for (const key in styleObj) {
    const value = styleObj[key];
    // if the value is ''
    // mean that we need to get rid of
    if (value === undefined || value === '') {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${__uncamelize(key)}:${value};`);
    }
  }
  // return the css text
  return propertiesArray.join(' ');
}
