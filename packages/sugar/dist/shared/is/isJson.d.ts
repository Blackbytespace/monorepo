/**
 * @name                isJson
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @todo      tests
 *
 * @snippet         __isJson($1)
 *
 * @example    js
 * import { __isJson } from '@lotsof/sugar/is'
 * if (__isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isJson(value: string): boolean;
