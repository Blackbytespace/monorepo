/**
 * @name                clamp
 * @namespace           shared.math
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Clamp a number between two values
 *
 * @param       {Number}       num             The number to clamp
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
 * @return      {Number}                The clamped number
 *
 * @snippet         __clamp($1, $2, $3)
 *
 * @todo      tests
 *
 * @example       js
 * import { __clamp } from '@blackbyte/sugar/math';
 * __clamp(10, 0, 100); // => 10
 * __clamp(0, 0, 100); // => 0
 * __clamp(100, 0, 100); // => 100
 * __clamp(101, 0, 100); // => 100
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
