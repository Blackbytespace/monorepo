import __convertTime from '../../../shared/datetime/convertTime.js';
import __getStyleProperty from './getStyleProperty.js';

/**
 * @name            getTransitionProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      tests
 *
 * @snippet         __getTransitionProperties($1)
 *
 * @example  	js
 * import { getTransitionProperties } from '@blackbyte/sugar/dom'
 * const props = __getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TGetTransitionPropertiesResult = {
  transitions: TGetTransitionPropertiesObject[];
  totalDuration: number;
};

export type TGetTransitionPropertiesObject = {
  property: string;
  duration: number;
  delay: number;
  timingFunction: string;
};

function splitIfNeeded(what, separator) {
  if (what.includes?.(separator)) {
    return what.split(separator).map((item) => item.trim());
  }
  return [what];
}

function getTransitionProperties(
  elm: HTMLElement,
): TGetTransitionPropertiesResult {
  // get the transition properties
  const property = __getStyleProperty(elm, 'transition-property');
  const duration = __getStyleProperty(elm, 'transition-duration') || 0;
  const timingFunction = __getStyleProperty(elm, 'transition-timing-function');
  const delay = __getStyleProperty(elm, 'transition-delay');

  // return the transition object
  const props = {
    properties: splitIfNeeded(property, ','),
    durations: splitIfNeeded(duration, ',').map((value) =>
      __convertTime(value, 'ms'),
    ),
    delays: splitIfNeeded(delay, ',').map((value) =>
      __convertTime(value, 'ms'),
    ),
    timingFunctions: splitIfNeeded(timingFunction, ','),
  };

  const result: TGetTransitionPropertiesResult = {
    transitions: [],
    totalDuration: 0,
  };

  for (let [i, property] of props.properties) {
    result.transitions.push({
      property,
      duration: props.durations[i],
      timingFunction: props.timingFunctions[i],
      delay: props.delays[i],
    });
  }

  let i = 0;
  const delays = [0].concat(props.delays);
  [0].concat(props.durations).forEach((val) => {
    if (val + delays[i] > result.totalDuration) {
      result.totalDuration = val + delays[i];
    }
    i++;
  });
  return result;
}
export default getTransitionProperties;
