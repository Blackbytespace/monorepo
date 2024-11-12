/**
 * @name                            parse
 * @namespace                       shared.string
 * @type                            Function
 * @platform                        js
 * @platform                        node
 * @status                          stable
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @todo      tests
 *
 * @snippet         __parse($1)
 *
 * @example           js
 * import { __parse } from '@lotsof/sugar/string';
 *  __parse('10'); // => 10
 *
 * @since     1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function (value) {
    // if the value is not a string
    // return it as he's
    if (typeof value !== 'string')
        return value;
    // true | false | null | undefined
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    if (value === 'null')
        return null;
    if (value === 'undefined')
        return undefined;
    // small dirty hack
    value = value.split('⠀').join('').trim();
    // try to parse the string into a native value
    try {
        return Function(`
            "use strict";
            return (${value});
        `)();
    }
    catch (e) {
        return value;
    }
}
//# sourceMappingURL=parse.js.map