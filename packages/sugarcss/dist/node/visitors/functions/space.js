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
 * min, max and easing function declared using the `--s-spaces` variable, or registered with
 * a custom name like --s-space-small, --s-space-medium, etc...
 *
 * @param      {Number|String}        space         The space you want to apply
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      /* Define min, max and a easing function * /
 *      --s-spaces: 0 80px;
 *
 *      /* Define named spaces * /
 *      --s-spaces-small: 10px;
 *      --s-spaces-medium: 20px;
 *      --s-spaces-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 80px / 100 * 10 = 8px
 *    padding: s-space(100); // 80px / 100 * 100 = 80px
 *    padding: s-space(small); // 10px
 *    padding: s-space(medium); // 20px
 *    padding: s-space(large); // 40px
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
    let easing = spaceArgs === null || spaceArgs === void 0 ? void 0 : spaceArgs.easing;
    // prepare the easing function
    const easingFunction = env.easingFunctions[easing];
    // calculate the delta between min and max
    const spaceDelta = `calc(
      (var(--s-spaces-max) - var(--s-spaces-min)) * 0.01
    )`;
    const spaces = [];
    for (let [argName, argValue] of Object.entries(args.values)) {
        let resultCalc = '';
        // skip easing declaration
        if (typeof argValue === 'number') {
            // get the requested value percentage
            const easingFunctionStr = easingFunction.replace(/t/gm, `${argValue * 0.01}`);
            resultCalc = `(${easingFunctionStr} * ${spaceDelta} * ${argValue}) + var(--s-spaces-min)`;
        }
        // create the calc declaration
        spaces.push(`var(--s-space-${argValue}, ${resultCalc})`);
    }
    return {
        raw: spaces
            .map((s) => {
            return `calc(${s} * var(--s-scale, 1))`;
        })
            .join(' '),
    };
}
//# sourceMappingURL=space.js.map