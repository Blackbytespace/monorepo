import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-weight
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to get a font weight from the registered ones or from the default ones that are:
 *
 * - thin: 100
 * - extra-light: 200
 * - lighter: 200
 * - light: 300
 * - regular/normal: 400
 * - medium: 500
 * - semi-bold: 600
 * - bold: 700
 * - bolder: 800
 * - extra-bold: 800
 * - black: 900
 *
 * @param      {String}        weight        The weight you want to get like "bold", "light", etc...
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    --s-weight-boldeeeeeerrrrrr: 9000;
 * }
 *
 * .my-element {
 *    font-weight: s-weight(bold); // 700
 *    font-weight: s-weight(light); // 300
 *    font-weight: s-weight(boldeeeeeerrrrrr); // 9000
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function rem(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['weight'], {
        separator: ['white-space', 'comma'],
    }));
    const fallbacks = {
        thin: 100,
        'extra-light': 200,
        lighter: 200,
        light: 300,
        regular: 400,
        normal: 400,
        medium: 500,
        'semi-bold': 600,
        bold: 700,
        bolder: 800,
        'extra-bold': 800,
        black: 900,
    };
    return {
        raw: `var(--s-weight-${args.values.weight}, ${fallbacks[args.values.weight]})`,
    };
}
//# sourceMappingURL=weight.js.map