import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-layout
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Allow to get some layout related properties like:
 *
 * - `width`: The calculated layout width relative to the `--s-layout-max-width` and the `--s-layout-side-padding` variables
 * - `minWidth`: The min width of the layout
 * - `maxWidth`: The max width of the layout
 * - `sidePadding`: The side padding of the layout
 *
 * @param      {String}        prop         The layout property wanted
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-layout-default: 320px 1200px 20px;
 * }
 *
 * .my-element {
 *    width: s-layout(width);
 *
 *    min-width: s-layout(minWidth);
 *    max-width: s-layout(maxWidth);
 *    padding-left: s-layout(sidePadding);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function layout(value, settings) {
    const args = __parseArgs(value.arguments, ['prop', 'layout'], {
        separator: ['white-space', 'comma'],
    });
    args.values = Object.assign({ layout: 'default', prop: 'width' }, args.values);
    if (!env.layouts[args.values.layout]) {
        throw new Error(`Sorry but the layout <yellow>${args.values.layout}</yellow> is not registered...`);
    }
    const props = [];
    switch (args.values.prop) {
        case 'minWidth':
        case 'min-width':
            props.push(`var(--s-layout-${args.values.layout}-min-width)`);
            break;
        case 'maxWidth':
        case 'max-width':
            props.push(`var(--s-layout-${args.values.layout}-max-width)`);
            break;
        case 'sidePadding':
        case 'side-padding':
            props.push(`var(--s-layout-${args.values.layout}-side-padding)`);
            break;
        case 'width':
            props.push(`clamp(var(--s-layout-${args.values.layout}-min-width, 0px), calc(var(--s-layout-${args.values.layout}-max-width) - var(--s-layout-${args.values.layout}-side-padding) * 2), calc(100% - var(--s-layout-${args.values.layout}-side-padding) * 2))`);
            break;
    }
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=layout.js.map