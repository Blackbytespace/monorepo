import __parseArgs from '../../utils/parseArgs.js';
import __containerExists from '../../ensure/containerExists.js';
/**
 * @name            s-container
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Allow to get some container related properties like:
 *
 * - `width`: The calculated container width relative to the `--s-container-max-width` and the `--s-container-side-padding` variables
 * - `minWidth` (`min-width`): The min width of the container
 * - `maxWidth` (`max-width`): The max width of the container
 * - `sidePadding` (`side-padding`): The side padding of the container
 *
 * @param      {String}        prop         The container property wanted
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-container-default: 320px 1200px 20px;
 * }
 *
 * .my-element {
 *    width: s-container(width);
 *
 *    min-width: s-container(minWidth);
 *    max-width: s-container(maxWidth);
 *    padding-left: s-container(sidePadding);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function container(value, settings) {
    const args = __parseArgs(value.arguments, ['prop', 'container'], {
        separator: ['white-space', 'comma'],
    });
    args.values = Object.assign({ container: 'default', prop: 'width' }, args.values);
    __containerExists(args.values.container);
    const props = [];
    switch (args.values.prop) {
        case 'minWidth':
        case 'min-width':
            props.push(`var(--s-container-${args.values.container}-min-width)`);
            break;
        case 'maxWidth':
        case 'max-width':
            props.push(`var(--s-container-${args.values.container}-max-width)`);
            break;
        case 'sidePadding':
        case 'side-padding':
            props.push(`var(--s-container-${args.values.container}-side-padding)`);
            break;
        case 'width':
            props.push(`clamp(var(--s-container-${args.values.container}-min-width, 0px), calc(var(--s-container-${args.values.container}-max-width) - var(--s-container-${args.values.container}-side-padding) * 2), calc(100% - var(--s-container-${args.values.container}-side-padding) * 2))`);
            break;
    }
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=container.js.map