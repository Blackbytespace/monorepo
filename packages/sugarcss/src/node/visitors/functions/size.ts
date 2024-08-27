import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

import __ensureEasingFunctionExists from '../../ensure/easingFunctionExists.js';

/**
 * @name            s-size
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a size depending on the
 * min, max and easing function declared using the `--s-sizes` variable.
 *
 * @param      {Number}        size         The size you want to apply between 0 and 100
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      --s-sizes: 0px 80px linear;
 * }
 *
 * .my-element {
 *    font-size: s-size(10); // 8px
 *    font-size: s-size(20); // 16px
 *    font-size: s-size(100); // 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function size(value: any, settings: TSugarCssSettings): any {
  const args = __parseArgs(value.arguments, [], {
    separator: ['white-space', 'comma'],
  });

  const sizeArgs = env.sizes;

  let easing = sizeArgs.easing;

  // check if an easing is specified
  for (let [argName, argValue] of Object.entries(args.values)) {
    // if is an easing specified
    if (typeof argValue === 'string') {
      if (env.easingFunctions[argValue]) {
        easing = argValue;
        continue;
      }
    }
  }

  // protect against invalid easings
  __ensureEasingFunctionExists(sizeArgs.easing);

  // prepare the easing function
  const easingFunction = env.easingFunctions[easing];

  // calculate the delta between min and max
  const sizeDelta = sizeArgs.max - sizeArgs.min;

  const sizes: string[] = [];
  for (let [argName, argValue] of Object.entries(args.values)) {
    // skip easing declaration
    if (env.easings[argName] || typeof argValue !== 'number') {
      continue;
    }

    // get the requested value percentage
    const easingFunctionStr = easingFunction.replace(
      /t/gm,
      `${argValue / 100}`,
    );

    const resultCalc = `calc(((${easingFunctionStr}) * ${
      (sizeDelta / 100) * argValue
    } + ${sizeArgs.min}) * 1px)`;

    // create the calc declaration
    sizes.push(resultCalc);
  }

  return {
    raw: sizes.join(' '),
  };
}
