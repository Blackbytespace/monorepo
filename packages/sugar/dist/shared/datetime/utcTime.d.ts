/**
 * @name            utcTime
 * @namespace       shared.date
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This method allows you to display easily the time in UTC format like "10:20:32"
 *
 * @param       {Boolean}          [hours=true]             Display the hours or not
 * @param       {Boolean}          [minutes=true]             Display the minutes or not
 * @param       {Boolean}          [seconds=true]             Display the seconds or not
 * @param       {Date}           [date=new Date()]         The date to use to display the time
 * @return      {String}                                    The time string
 *
 * @todo        tests
 *
 * @snippet         __utcTime()
 *
 * @example         js
 * import { __utcTime } from '@lotsof/sugar/date';
 * __utcTime(); // => 10:20:32
 * __utcTime(true, true, false); // => 10:20
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __utcTime(hours?: boolean, minutes?: boolean, seconds?: boolean, date?: Date): string;
