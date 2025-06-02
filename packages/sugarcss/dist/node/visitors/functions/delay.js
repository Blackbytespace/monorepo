import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-delay
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply some delay based on the registered ones in your congfig.
 * You can also pass another delay to add to the registered one.
 *
 * @param       {String|Number}          [nameOrDelay='default']       The delay name to apply or a delay value
 * @param       {Number}                 [delay=0]         An additional delay to add to the registered one
 * @return     {Css}                             The generated css
 *
 * @example         css
 * :root {
 *    --s-delay-default: 0.2s;
 *    --s-delay-in-viewport: 1s;
 * }
 *
 * .my-element {
 *     transition-delay: s-delay(); // 0.2s
 *     transition-delay: s-delay(in-viewport); // 1s
 *     transition-delay: s-delay(in-viewport, 0.5s); // 1.5s
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function delay(value, settings) {
    var _a;
    const args = Object.assign({}, __parseArgs(value.arguments, ['nameOrDelay', 'delay'], {
        separator: ['white-space', 'comma'],
    }));
    let name = typeof args.values.nameOrDelay === 'string'
        ? args.values.nameOrDelay
        : 'default';
    let delay = typeof args.values.nameOrDelay === 'number'
        ? args.values.nameOrDelay
        : (_a = args.values.delay) !== null && _a !== void 0 ? _a : 0;
    if (typeof name === 'number') {
        delay = 0;
    }
    return {
        raw: `calc(var(--s-delay-${name}, 0s) + ${delay !== null && delay !== void 0 ? delay : 0}s )`,
    };
}
//# sourceMappingURL=delay.js.map