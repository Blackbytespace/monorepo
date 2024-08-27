import __parseArgs from '../../utils/parseArgs.js';
import __hideAst from './scrollbar/hide.ast.js';
import __scrollbarAst from './scrollbar/scrollbar.ast.js';
/**
 * @name            s-scrollbar
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to style the scrollbar of an element or to hide it completely.
 *
 * @param      {String}        sizeOrHide        The size of the scrollbar or "hide" to hide it
 * @param      {String}        thumbColor        The thumb color
 * @param      {String}        trackColor        The track color
 * @return     {Css}                             The generated css
 *
 * @snippet       @s-scrollbar($1, $2, $3);
 *
 * @example         css
 * .my-element {
 *      @s-scrollbar(10px, s-color(accent), s-color(accent, --darken 20));
 *      @s-scrollbar(hide);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function scrollbar(v, settings) {
    // parse args
    const args = __parseArgs(v.prelude);
    if (args.values.arg0 === 'hide') {
        return __hideAst();
    }
    else {
        return __scrollbarAst(args.ast.arg0, args.ast.arg1, args.ast.arg2);
    }
}
//# sourceMappingURL=scrollbar.js.map