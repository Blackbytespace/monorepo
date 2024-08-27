import __hexToRgba from './hexToRgba.js';
import __hslaToRgba from './hslaToRgba.js';
import __parseHsla from './parseHsla.js';
import __parseRgba from './parseRgba.js';
import __rgbaToHsla from './rgbaToHsla.js';
export default function __parseColor(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    let parsedColor;
    if (color.startsWith('rgb')) {
        parsedColor = __parseRgba(color);
    }
    else if (color.startsWith('hsl')) {
        const hsla = __parseHsla(color);
        parsedColor = __hslaToRgba(hsla.h, hsla.s, hsla.l);
    }
    else if (color.startsWith('#')) {
        parsedColor = __hexToRgba(color);
    }
    else {
        throw new Error(`The passed color "${color}" is in a format that cannot be parsed for now...`);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return __rgbaToHsla(parsedColor.r, parsedColor.g, parsedColor.b, parsedColor.a);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return parsedColor;
            break;
    }
}
//# sourceMappingURL=parseColor.js.map