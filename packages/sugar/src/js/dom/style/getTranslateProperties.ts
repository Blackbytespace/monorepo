import * as __rematrix from 'rematrix';

/**
 * @name            getTranslateProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      tests
 *
 * @snippet         __getTranslateProperties($1)
 *
 * @example  	js
 * import { __getTranslateProperties } from '@lotsof/sugar/dom'
 * const props = __getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TGetTranslatePropertiesResult = {
  x: number;
  y: number;
  z: number;
};

export default function __getTranslateProperties(
  $elm: HTMLElement,
): TGetTranslatePropertiesResult {
  if (!window.getComputedStyle)
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  const style = getComputedStyle($elm);
  const transform =
    style.transform ||
    style.webkitTransform ||
    // @ts-ignore
    style.mozTransform ||
    // @ts-ignore
    style.msTransform;
  if (!transform)
    return {
      x: 0,
      y: 0,
      z: 0,
    };

  const matrix3d = __rematrix.fromString(transform);
  return {
    x: matrix3d[12],
    y: matrix3d[13],
    z: matrix3d[14],
  };
}
