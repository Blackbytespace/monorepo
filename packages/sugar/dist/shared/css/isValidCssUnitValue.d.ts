/**
 * @name            isValidCssUnitValue
 * @namespace       shared.css
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function tells you if the passed value is a valid css unit based one like 10px, 20em, etc...
 *
 * @param       {String|Number}         value       The value to check
 * @return      {Boolean}                           true if is a valid unit based value, false if not
 *
 * @snippet         __isValidCssUnitValue($1)
 *
 * @example         js
 * import { __isValidCssUnitValue } from '@lotsof/sugar/css';
 * __isValidCssUnitValue('10px'); // => true
 * __isValidCssUnitValue('default'); // => false
 *
 * @since       1.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isValidCssUnitValue(value: string | number): boolean;
