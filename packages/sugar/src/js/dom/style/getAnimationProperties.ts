import __convertTime from '../../../shared/datetime/convertTime.js';
import __getStyleProperty from './getStyleProperty.js';

/**
 * @name            getAnimationProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get the css animation properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      tests
 *
 * @snippet         __getAnimationProperties($1)
 *
 * @example  	js
 * import { __getAnimationProperties } from '@lotsof/sugar/dom'
 * const props = __getAnimationProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	name : ['animation1'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	iterationCount : [1],
 * // 	direction : ['forward'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TGetAnimationPropertiesObject = {
  name: string;
  duration: number;
  delay: number;
  timingFunction: string;
  iterationCount: number;
  direction: string;
  fillMode: string;
  playState: string;
};

export type TGetAnimationPropertiesResult = {
  totalDuration: number;
  animations: TGetAnimationPropertiesObject[];
};

export default function __getAnimationProperties(elm: HTMLElement) {
  // get the animation properties
  const name = __getStyleProperty(elm, 'animation-name') || '';
  const duration = __getStyleProperty(elm, 'animation-duration') || '0s';
  const timingFunction =
    __getStyleProperty(elm, 'animation-timing-function') || 'linear';
  const delay = __getStyleProperty(elm, 'animation-delay') || '0s';
  const iterationCount =
    __getStyleProperty(elm, 'animation-iteration-count') || 1;
  const direction = __getStyleProperty(elm, 'animation-direction') || 'normal';
  const fillMode = __getStyleProperty(elm, 'animation-fill-mode') || 'none';
  const playState =
    __getStyleProperty(elm, 'animation-play-state') || 'running';

  // return the animation object
  const props = {
    names: name.split(','),
    durations: duration.split(',').map((value) => __convertTime(value, 'ms')),
    delays: `${delay}`.split(',').map((value) => __convertTime(value, 'ms')),
    timingFunctions:
      timingFunction.split?.(',') ?? timingFunction.name
        ? [timingFunction.name]
        : ['linear'],
    iterationCounts: `${iterationCount}`.split(','),
    directions: direction.split(','),
    fillModes: fillMode.split(','),
    playStates: playState.split(','),
  };

  const animations: TGetAnimationPropertiesObject[] = [];
  const result: TGetAnimationPropertiesResult = {
    totalDuration: 0,
    animations,
  };

  for (let [i, name] of props.names) {
    animations.push({
      name,
      duration: props.durations[i],
      delay: props.delays[i],
      timingFunction: props.timingFunctions[i],
      iterationCount: parseInt(props.iterationCounts[i]),
      direction: props.directions[i],
      fillMode: props.fillModes[i],
      playState: props.playStates[i],
    });
  }

  let totalDuration = 0;
  const i = 0;
  const delays = [0].concat(props.delays);
  [0].concat(props.durations).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
  });
  result.totalDuration = totalDuration;
  return result;
}
