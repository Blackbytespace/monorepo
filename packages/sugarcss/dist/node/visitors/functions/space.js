import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-spaces
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a space depending on the
 * min, max and easing function declared using the `--s-spaces` variable.
 *
 * @param      {Number}        size         The space you want to apply between 0 and 100
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      --s-spaces: 0, 80px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 8px
 *    padding: s-space(20); // 16px
 *    padding: s-space(100); // 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function space(value, settings) {
    const args = __parseArgs(value.arguments, [], {
        separator: ['white-space', 'comma'],
    });
    const spaceArgs = env.spaces;
    let easing = spaceArgs.easing;
    // check if an easing is specified
    for (let [argName, argValue] of Object.entries(args.values)) {
        // if is an easing specified
        if (typeof argValue === 'string' && env.easings[argValue]) {
            easing = argValue;
            continue;
        }
    }
    // prepare the easing function
    const easingFunction = env.easingFunctions[easing];
    // calculate the delta between min and max
    const spaceDelta = spaceArgs.max - spaceArgs.min;
    const spaces = [];
    for (let [argName, argValue] of Object.entries(args.values)) {
        // skip easing declaration
        if (env.easingFunctions[argName] || typeof argValue !== 'number') {
            continue;
        }
        // get the requested value percentage
        const easingFunctionStr = easingFunction.replace(/t/gm, `${argValue / 100}`);
        const resultCalc = `calc(((${easingFunctionStr}) * ${(spaceDelta / 100) * argValue} + ${spaceArgs.min}) * 1px)`;
        // create the calc declaration
        spaces.push(resultCalc);
    }
    return {
        raw: spaces.join(' '),
    };
}
//# sourceMappingURL=space.js.map