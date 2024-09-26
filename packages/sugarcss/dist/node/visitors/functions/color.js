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
 * The shades are registered like so: --s-shade-placeholder: --darken 10;
 *
 * @param      {String}        color                The color name you want to apply like "main", "accent", etc...
 * @param      {String}        shadeOrModifiers      The shade name you want to apply like "text", "placeholder", etc... or a string of modifiers like --lighten 10 --saturate 20
 * @param      {String}        modifiers             A string of modifiers like --lighten 10 --saturate 20, etc...
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const args = __parseArgs(value.arguments, ['color', 'shade', 'modifiers']), availableModifiers = [
        'lightness',
        'lighten',
        'darken',
        'saturation',
        'saturate',
        'desaturate',
        'hue',
        'spin',
        'alpha',
    ];
    let color = args.values.color, shade, modifiers;
    // shade argument
    if (typeof args.values.shade === 'string') {
        shade = args.values.shade;
    }
    else if (typeof args.values.shade === 'object') {
        modifiers = args.values.shade;
    }
    // modifiers argument
    if (typeof args.values.modifiers === 'object') {
        modifiers = args.values.modifiers;
    }
    // a simple color
    if (!modifiers && !shade) {
        return {
            raw: `var(--s-color-${color})`,
        };
    }
    // shade AND modifiers
    if (typeof shade === 'string' && typeof modifiers === 'object') {
        const hSpecial = `var(--s-shade-${shade}-${color}-spin, var(--s-shade-${shade}-spin, 0))`, sSpecial = `var(--s-shade-${shade}-${color}-saturate, var(--s-shade-${shade}-saturate, 0)) - var(--s-shade-${shade}-${color}-desaturate, var(--s-shade-${shade}-desaturate, 0))`, lSpecial = `var(--s-shade-${shade}-${color}-lighten, var(--s-shade-${shade}-lighten, 0)) - var(--s-shade-${shade}-${color}-darken, var(--s-shade-${shade}-darken ,0))`, aSpecial = `var(--s-shade-${shade}-${color}-alpha, var(--s-shade-${shade}-alpha, var(--s-color-${color}-a, 1)))`;
        const hModifiers = modifiers.spin
            ? `calc(${hSpecial} + ${modifiers.spin})`
            : hSpecial, sModifiers = modifiers.saturate
            ? `calc(${sSpecial} + ${modifiers.saturate})`
            : modifiers.desaturate
                ? `calc(${sSpecial} - ${modifiers.desaturate})`
                : sSpecial, lModifiers = modifiers.lighten
            ? `calc(${lSpecial} + ${modifiers.lighten})`
            : modifiers.darken
                ? `calc(${lSpecial} - ${modifiers.darken})`
                : lSpecial;
        const h = `var(--s-shade-${shade}-${color}-hue, var(--s-shade-${shade}-hue, calc(var(--s-color-${color}-h) + ${hModifiers})))`, s = modifiers.saturation
            ? modifiers.saturation
            : `var(--s-shade-${shade}-${color}-saturation, var(--s-shade-${shade}-saturation, calc(var(--s-color-${color}-s) + ${sModifiers})))`, l = modifiers.lightness
            ? modifiers.lightness
            : `var(--s-shade-${shade}-${color}-lightness, var(--s-shade-${shade}-lightness, calc(var(--s-color-${color}-l) + ${lModifiers})))`, a = (_a = modifiers.alpha) !== null && _a !== void 0 ? _a : aSpecial;
        return {
            raw: [
                `hsla(`,
                `${h},`,
                `calc(${s} * 1%),`,
                `calc(${l} * 1%),`,
                `${a}`,
                `)`,
            ].join(''),
        };
    }
    if (typeof shade === 'string') {
        const hSpecial = `var(--s-shade-${shade}-${color}-spin, var(--s-shade-${shade}-spin, 0))`, sSpecial = `var(--s-shade-${shade}-${color}-saturate, var(--s-shade-${shade}-saturate, 0)) - var(--s-shade-${shade}-${color}-desaturate, var(--s-shade-${shade}-desaturate, 0))`, lSpecial = `var(--s-shade-${shade}-${color}-lighten, var(--s-shade-${shade}-lighten, 0)) - var(--s-shade-${shade}-${color}-darken, var(--s-shade-${shade}-darken ,0))`, aSpecial = `var(--s-shade-${shade}-${color}-alpha, var(--s-shade-${shade}-alpha, var(--s-color-${color}-a, 1)))`;
        const h = `var(--s-shade-${shade}-${color}-hue, var(--s-shade-${shade}-hue, calc(var(--s-color-${color}-h) + ${hSpecial})))`, s = `var(--s-shade-${shade}-${color}-saturation, var(--s-shade-${shade}-saturation, calc(var(--s-color-${color}-s) + ${sSpecial})))`, l = `var(--s-shade-${shade}-${color}-lightness, var(--s-shade-${shade}-lightness, calc(var(--s-color-${color}-l) + ${lSpecial})))`, a = aSpecial;
        return {
            raw: [
                `hsla(`,
                `${h},`,
                `calc(${s} * 1%),`,
                `calc(${l} * 1%),`,
                `${a}`,
                `)`,
            ].join(''),
        };
    }
    // inline shades
    return {
        raw: [
            `hsla(`,
            `calc(var(--s-color-${color}-h) + ${(_b = modifiers.spin) !== null && _b !== void 0 ? _b : '0'}),`,
            `calc(${(_c = modifiers.saturation) !== null && _c !== void 0 ? _c : `calc(calc(var(--s-color-${color}-s) + ${(_d = modifiers.saturate) !== null && _d !== void 0 ? _d : '0'}) - ${(_e = modifiers.desaturate) !== null && _e !== void 0 ? _e : '0'})`} * 1%),`,
            `calc(${(_f = modifiers.lightness) !== null && _f !== void 0 ? _f : `calc(calc(var(--s-color-${color}-l) + ${(_g = modifiers.lighten) !== null && _g !== void 0 ? _g : '0'}) - ${(_h = modifiers.darken) !== null && _h !== void 0 ? _h : '0'})`} * 1%),`,
            `${(_j = modifiers.alpha) !== null && _j !== void 0 ? _j : `var(--s-color-${color}-a, 1)`}`,
            `)`,
        ].join(''),
    };
}
//# sourceMappingURL=color.js.map