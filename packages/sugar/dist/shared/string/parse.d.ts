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
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function (value: string): any;
