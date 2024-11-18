import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-ease
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
 *    --s-ease-default: cubic-bezier(0.745, 0, 0.18, 1);
 *    --s-ease-in-out: cubic-bezier(0.86, 0, 0.07, 1);
 * }
 *
 * .my-element {
 *    transition: all 1s s-ease();
 *    transition: all 1s s-ease(in-out);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function ease(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    }));
    args.values = Object.assign({ name: 'default' }, args.values);
    return {
        raw: `var(--s-ease-${args.values.name})`,
    };
}
//# sourceMappingURL=ease.js.map