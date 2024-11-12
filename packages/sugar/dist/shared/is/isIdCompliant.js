import __idCompliant from '../string/idCompliant.js';
/**
 * @name            isIdCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function check if the passed value is "id" compliant.
 * This mean that it has no special characters, no spaces and that it is lowercase
 *
 * @param       {String}        string         The string to process
 * @return      {Boolean}                        true if compliant, false if not
 *
 * @snippet         __isIdCompliant($1)
 *
 * @example         php
 * import { __isIdCompliant } from '@lotsof/sugar/string';
 * __isIdCompliant('Hello world'); // => false
 * __isIdCompliant('hello-world'); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isIdCompliant(str) {
    if (!str) {
        return false;
    }
    return __idCompliant(str) === str;
}
//# sourceMappingURL=isIdCompliant.js.map