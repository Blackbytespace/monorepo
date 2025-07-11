/**
 * @name 		        distanceBetween
 * @namespace           shared.math
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Get the distance between two points
 *
 * @param    {Point}    point1    The point 1, x and y value
 * @param    {Point}    point2    The point 2, x and y value
 * @return    {Number}    The distance between the two points
 *
 * @todo      tests
 *
 * @snippet         __distanceBetween($1, $2)
 * __distanceBeetween({
 *      x: $1, y: $2
 * }, {
 *      x: $3, y: $4
 * })
 *
 * @example    js
 * import { __distanceBetween } from '@blackbyte/sugar/geom'
 * __distanceBetween({
 * 	x: 10, y: 20
 * }, {
 * 	x: 10, y: 30
 * }) // 10
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TDistanceBetweenPoint = {
  x: number;
  y: number;
};

export default function __distanceBetween(
  point1: TDistanceBetweenPoint,
  point2: TDistanceBetweenPoint,
): number {
  let xs = 0;
  let ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}
