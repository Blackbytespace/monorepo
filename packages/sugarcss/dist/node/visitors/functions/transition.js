import __ensureTransitionExists from '../../ensure/transitionExists.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-transition
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a transition from the transitions registered ones.
 *
 * @param     {String}      name      The transition name you want to apply from registered ones
 * @return    {Css}                   The generated css
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all 0.3s s-easing();
 *    --s-transition-default: all 0.2s s-easing();
 *    --s-transition-fast: all 0.1s s-easing();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function transition(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    }));
    args.values = Object.assign({ name: 'default' }, args.values);
    __ensureTransitionExists(args.values.name);
    const parts = [];
    parts.push(`var(--s-transition-${args.values.name}-duration, 0.3s)`);
    parts.push(`var(--s-transition-${args.values.name}-property, all)`);
    parts.push(`var(--s-transition-${args.values.name}-easing, linear)`);
    parts.push(`var(--s-transition-${args.values.name}-delay, 0s)`);
    return {
        raw: parts.join(' '),
    };
}
//# sourceMappingURL=transition.js.map