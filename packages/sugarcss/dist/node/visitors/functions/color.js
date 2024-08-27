import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-color
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a color from the colors registered ones.
 * Allow to apply modifiers or shades to the color like darken, lighten, saturate, desaturate, spin, etc...
 * Here's the list of available modifiers:
 *
 * - `lighten`: 0-100
 * - `darken`: 0-100
 * - `saturate`: 0-100
 * - `desaturate`: 0-100
 * - `spin`: 0-360
 * - `alpha`: 0-1
 *
 * The shades are registered like so: --s-shade-placeholder: --darken 10;
 *
 * @param      {String}        color                The color name you want to apply like "main", "accent", etc...
 * @param      {String}        shadeOrModifiers      The shade name you want to apply like "text", "placeholder", etc... or a string of modifiers like --lighten 10 --saturate 20
 * @return     {Css}                                The generated css
 *
 * @example         css
 * :root {
 *    --s-shade-test: --lighten 10;
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
export default function color(value, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const args = __parseArgs(value.arguments, ['color', 'modifiers']), availableModifiers = [
        'lighten',
        'darken',
        'saturate',
        'desaturate',
        'spin',
        'alpha',
    ];
    let color = args.values.color, modifiers = args.values.modifiers;
    // a simple color
    if (!modifiers) {
        return {
            raw: `var(--s-color-${color})`,
        };
    }
    if (typeof modifiers === 'string') {
        const shade = modifiers;
        // simple shade
        const hSpecial = `var(--s-shade-${shade}-${color}-spin, var(--s-shade-${shade}-spin, 0))`, sSpecial = `var(--s-shade-${shade}-${color}-saturate, var(--s-shade-${shade}-saturate, 0)) - var(--s-shade-${shade}-${color}-desaturate, var(--s-shade-${shade}-desaturate, 0))`, lSpecial = `var(--s-shade-${shade}-${color}-lighten, var(--s-shade-${shade}-lighten, 0)) - var(--s-shade-${shade}-${color}-darken, var(--s-shade-${shade}-darken ,0))`, aSpecial = `var(--s-shade-${shade}-${color}-alpha, var(--s-shade-${shade}-alpha, var(--s-color-${color}-a, 1)))`;
        const h = `calc(var(--s-color-${color}-h) + ${hSpecial})`, s = `calc(var(--s-color-${color}-s) + ${sSpecial})`, l = `calc(var(--s-color-${color}-l) + ${lSpecial})`, a = aSpecial;
        return {
            raw: [
                `hsla(`,
                `var(--s-shade-${shade}-hue, ${h}),`,
                `calc(var(--s-shade-${shade}-saturation, ${s}) * 1%),`,
                `calc(var(--s-shade-${shade}-lightness, ${l}) * 1%),`,
                `${a}`,
                `)`,
            ].join(''),
        };
    }
    // inline shades
    return {
        raw: 'red',
    };
    return {
        raw: [
            `hsla(`,
            `calc(var(--s-color-${color}-h) + ${(_a = modifiers.spin) !== null && _a !== void 0 ? _a : '0'}),`,
            `calc(${(_b = modifiers.saturation) !== null && _b !== void 0 ? _b : `(var(--s-color-${color}-s) + ${(_c = modifiers.lighten) !== null && _c !== void 0 ? _c : '0'} - ${(_d = modifiers.darken) !== null && _d !== void 0 ? _d : '0'})`} * 1%),`,
            `calc(${(_e = modifiers.lightness) !== null && _e !== void 0 ? _e : `var(--s-color-${color}-l) + ${(_f = modifiers.saturate) !== null && _f !== void 0 ? _f : '0'} - ${(_g = modifiers.desaturate) !== null && _g !== void 0 ? _g : '0'})`} * 1%),`,
            `${(_h = modifiers.alpha) !== null && _h !== void 0 ? _h : `var(--s-color-${color}-a, 1)`}`,
            `)`,
        ].join(''),
    };
}
//# sourceMappingURL=color.js.map