import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-shade
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a color shade easily and use it in your css.
 * You can declare as many color shades as you want.
 *
 * Available modifiers:
 * - `lightness`: 0-100
 * - `lighten`: 0-100
 * - `darken`: 0-100
 * - `saturation`: 0-100
 * - `saturate`: 0-100
 * - `desaturate`: 0-100
 * - `hue`: 0-360
 * - `spin`: 0-360
 * - `alpha`: 0-1
 *
 * @param      {String}        color                The color value to declare
 *
 * @example         css
 * :root {
 *    --s-color-main: #ff0000;
 *
 *    --s-shade-text: --lighten 20;
 *    --s-shade-text-main: --lighten 35;
 *    --s-shade-placeholder: --alpha 0.4;
 *    --s-shade-foreground: --lighten 50;
 *    --s-shade-background: --darken 40;
 *    --s-shade-surface: --darken 40;
 *    --s-shade-border: --alpha 0.2;
 *    --s-shade-hover: --lighten 40;
 *    --s-shade-active: --darken 10;
 * }
 *
 * .my-element {
 *   color: s-color(accent);
 *   color: s-color(accent, test);
 *   color: s-color(accent, --darken 20 --spin 30);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function share(v, settings) {
    var _a;
    const shade = v.name.replace(`--s-shade-`, '');
    const args = __parseArgs(v.value);
    const result = [];
    // save in config
    let finalShade = {};
    for (let [arg, value] of Object.entries(args.values)) {
        if (typeof value === 'object') {
            finalShade = Object.assign(Object.assign({}, finalShade), value);
        }
    }
    const supportedModifiers = [
        'lighten',
        'darken',
        'saturate',
        'desaturate',
        'spin',
        'hue',
        'saturation',
        'lightness',
        'alpha',
    ];
    // custom css variables
    for (let key of supportedModifiers) {
        const value = (_a = finalShade[key]) !== null && _a !== void 0 ? _a : 0;
        if (!value) {
            if (!['lighten', 'darken', 'saturate', 'desaturate'].includes(key)) {
                continue;
            }
        }
        result.push({
            property: `--s-shade-${shade}-${key}`,
            value: {
                name: `--s-shade-${shade}-${key}`,
                value: [
                    {
                        type: 'token',
                        value: {
                            type: 'number',
                            value,
                        },
                    },
                ],
            },
        });
    }
    if (settings.verbose) {
        console.log(`Registered shade: <cyan>${shade}</cyan>: <yellow>${JSON.stringify(finalShade, null)}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=shade.js.map