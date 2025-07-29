/**
 * @name                                convertTime
 * @namespace                           shared.datetime
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
 *
 * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
 * @param           {String}                    [to='ms']             The format you want to get back
 * @return          {Number}                                          The converted value
 *
 * @todo      tests
 *
 * @snippet         convertTime($1, $2)
 *
 * @example           js
 * import { convertTime } from '@blackbyte/sugar/datetime';
 * convertTime('10s', 'ms'); // => 10000
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
declare function convertTime(from: string | number, to?: string): number;
declare namespace convertTime {
    var MILLISECOND: string;
    var SECOND: string;
    var MINUTE: string;
    var HOUR: string;
    var DAY: string;
    var WEEK: string;
    var MONTH: string;
    var YEAR: string;
}
export default convertTime;
