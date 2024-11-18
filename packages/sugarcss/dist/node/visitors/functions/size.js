import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
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
 *      --s-sizes: 0px, 80px;
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
export default function size(value, settings) {
    const args = __parseArgs(value.arguments, [], {
        separator: ['white-space', 'comma'],
    });
    const sizeArgs = env.sizes;
    let easing = sizeArgs.easing;
    // prepare the easing function
    const easingFunction = env.easingFunctions[easing];
    // calculate the delta between min and max
    const sizeDelta = sizeArgs.max - sizeArgs.min;
    const sizes = [];
    for (let [argName, argValue] of Object.entries(args.values)) {
        let resultCalc = '';
        // easing declaration
        if (typeof argValue === 'number') {
            // get the requested value percentage
            const easingFunctionStr = easingFunction.replace(/t/gm, `${argValue / 100}`);
            resultCalc = `calc(((${easingFunctionStr}) * ${(sizeDelta / 100) * argValue} + ${sizeArgs.min}) * 1px)`;
        }
        // create the calc declaration
        sizes.push(`var(--s-size-${argValue}, ${resultCalc})`);
    }
    return {
        raw: sizes
            .map((s) => {
            return `calc(${s} * var(--s-scale, 1))`;
        })
            .join(' '),
    };
}
//# sourceMappingURL=size.js.map