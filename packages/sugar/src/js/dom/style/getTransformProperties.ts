import __getRotateProperties from './getRotateProperties.js';
import __getTranslateProperties from './getTranslateProperties.js';

/**
 * @name            getTransformProperties
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
 * @snippet         __getTransformProperties($1)
 *
 * @example  	js
 * import { __getTransformProperties } from '@lotsof/sugar/dom'
 * const props = getTransformProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	translateX : 100,
 * // 	translateY : 0,
 * // 	translateZ : 0,
 * //   rotateX: 0,
 * //   rotateY: 0,
 * //   rotateZ: 0
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TGetTransformPropertiesResult = {
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};

function getTransformProperties(
  $elm: HTMLElement,
): TGetTransformPropertiesResult {
  const rotates = __getRotateProperties($elm),
    translates = __getTranslateProperties($elm);

  return {
    translateX: translates.x,
    translateY: translates.y,
    translateZ: translates.z,
    rotateX: rotates?.x ?? 0,
    rotateY: rotates?.y ?? 0,
    rotateZ: rotates?.z ?? 0,
  };
}
export default getTransformProperties;
