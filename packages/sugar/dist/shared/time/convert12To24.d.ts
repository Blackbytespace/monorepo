/**
 * @name                 convert12To24
 * @namespace            shared.time
 * @type                 Function
 * @platform             js
 * @platform             node
 * @status               stable
 *
 * Convert a 12 hours time to a 24 hours time
 *
 * @param       {String|Number}        time        The 12 hours time to convert formatted like "12pm" or "12:30am"
 * @return      {String}                    The 24 hours time like "23:00"
 *
 * @todo      tests
 *
 * @snippet         __convert12To24($1)
 *
 * @example    js
 * import { __convert12To24 } from '@lotsof/sugar/time'
 * __convert12To24('12pm') // => '12:00'
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function convert12To24(time: string): string;
