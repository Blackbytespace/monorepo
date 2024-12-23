import { __convert } from '@lotsof/sugar/color';
/**
 * @name            s-color
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a color easily and use it in your css.
 * You can declare as many colors as you want.
 *
 * @param      {String}        color                The color value to declare
 *
 * @example         css
 * :root {
 *    --s-color-main: #ff0000;
 *    --s-color-accent: #d2b02d;
 *    --s-color-complementary: #00f0ff;
 *    --s-color-ternary: #9ec468;
 * }
 *
 * .my-element {
 *   color: s-color(accent);
 *   color: s-color(accent, --saturation 100);
 *   color: s-color(accent, --darken 20 --spin 30);
 *   color: s-color(complementary, --alpha 0.2);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const name = v.name.replace(`--s-color-`, '').replace(/\-[a-z]$/, '');
    // handle the case where the color is the s-color function
    // that will just remap the color to a new one
    if (((_a = v.value[0]) === null || _a === void 0 ? void 0 : _a.type) === 'function' &&
        ((_c = (_b = v.value[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.name) === 's-color') {
        const args = (_e = (_d = v.value[0]) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.arguments, colorName = (_g = (_f = args[0]) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.value;
        if (!colorName || typeof colorName !== 'string') {
            throw new Error(`The s-color function needs a color name as first argument, passed "${colorName}"`);
        }
        const result = [];
        ['', '-o', '-h', '-s', '-l', '-a'].forEach((key) => {
            result.push({
                property: 'custom',
                value: {
                    name: `--s-color-${name}${key}`,
                    value: [
                        {
                            type: 'var',
                            value: {
                                name: {
                                    ident: `--s-color-${colorName}${key}`,
                                    from: null,
                                },
                                fallback: null,
                            },
                        },
                    ],
                },
            });
        });
        // @TODO      do not check for color name
        if (settings.verbose && name !== 'current') {
            console.log(`Registered color: <cyan>${name}</cyan> by remaping it to the <magenta>${colorName}</magenta> one`);
        }
        return result;
    }
    // handle the case where the color is a simple color
    if (((_h = v.value[0]) === null || _h === void 0 ? void 0 : _h.type) === 'color') {
        const result = [
            {
                property: `--s-color-${name}`,
                value: {
                    name: `--s-color-${name}`,
                    value: v.value,
                },
            },
            {
                property: `--s-color-${name}-o`,
                value: {
                    name: `--s-color-${name}-o`,
                    value: v.value,
                },
            },
        ];
        const hslaColor = __convert((_k = (_j = v.value[0]) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : v.value[0], 'hsla'), hexColor = __convert((_m = (_l = v.value[0]) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : v.value[0], 'hex');
        ['h', 's', 'l', 'a'].forEach((key) => {
            result.push({
                property: `--s-color-${name}-${key}`,
                value: {
                    name: `--s-color-${name}-${key}`,
                    value: [
                        {
                            type: 'token',
                            value: {
                                type: 'number',
                                value: hslaColor[key],
                            },
                        },
                    ],
                },
            });
        });
        // @TODO      do not check for color name
        if (settings.verbose && name !== 'current') {
            console.log(`Registered color: <cyan>${name}</cyan>: <magenta>${hexColor}</magenta> <yellow>${JSON.stringify(hslaColor)}</yellow>`);
        }
        return result;
    }
}
//# sourceMappingURL=color.js.map