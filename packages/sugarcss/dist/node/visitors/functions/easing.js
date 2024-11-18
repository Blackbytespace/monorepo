import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-easing
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply an easing from the registered ones.
 *
 * @param      {String}        name         The easing name you want to apply from registered ones
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    --s-easing-default: cubic-bezier(0.745, 0, 0.18, 1);
 *    --s-radius-in-out: cubic-bezier(0.86, 0, 0.07, 1);
 * }
 *
 * .my-element {
 *    transition: all 1s s-easing();
 *    transition: all 1s s-easing(in-out);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function easing(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    }));
    args.values = Object.assign({ name: 'default' }, args.values);
    return {
        raw: `var(--s-easing-${args.values.name})`,
    };
}
//# sourceMappingURL=easing.js.map