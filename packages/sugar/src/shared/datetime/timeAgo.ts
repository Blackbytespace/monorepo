// @ts-nocheck
import __jsAgo from 'js-ago';

/**
 * @name                timeAgo
 * @namespace           shared.datetime
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Simple "time" ago for your Unix timestamps and JavaScript Date objects.
 *
 * @param           {Number}             timestamp                 The timestamp to transform
 * @param           {'short'|'medium'|'long'}       [format='medium']       The format you want back
 * @return          {String}                                          The converted value
 *
 * @todo      tests
 *
 * @snippet         __timeAgo($1)
 *
 * @example           js
 * import { __timeAgo } from '@blackbyte/sugar/datetime';
 * __timeAgo(1611344957); // => 7 secs ago
 *
 * @see         https://www.npmjs.com/package/js-ago
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __timeAgo(
  timestamp: number,
  format: 'short' | 'medium' | 'long' = 'medium',
): string {
  return __jsAgo(timestamp, {
    format,
  });
}
