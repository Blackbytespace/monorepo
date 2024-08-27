import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-mode
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This function allows you to define some dark/light mode styles easily.
 *
 * @param       {String}        mode              The mode to target
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-mode($1);
 *
 * @example         css
 * :root {
 *    --s-color-accent: red;
 *
 *    @s-mode dark {
 *       --s-color-accent: blue;
 *    }
 * }
 *
 * .my-element {
 *     color: red;
 *
 *     @s-mode dark {
 *        color: blue;
 *     }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function mode(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['mode']));
    args.values = Object.assign({ mode: 'light' }, args.values);
    const a = {
        type: 'style',
        value: {
            selectors: [
                [
                    {
                        type: 'class',
                        name: '-dark',
                    },
                ],
            ],
            declarations: {
                importantDeclarations: [],
                declarations: v.block,
                rules: v.block,
            },
            loc: {
                source_index: 4,
                line: 0,
                column: 19,
            },
        },
    };
    return a;
    return ast;
}
//# sourceMappingURL=mode.js.map