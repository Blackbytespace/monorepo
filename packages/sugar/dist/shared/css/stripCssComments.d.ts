/**
 * @name                stripCssComments
 * @namespace           shared.css
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply remove all the css comments like:
 * - Multiline blocks css comments begining with /* *, ending with * /
 * - Single line comments begining with //
 *
 * @param       {String}        css         The css code to process
 * @param       {Object}      [settings={}]   An object of settings
 * @return      {String}                    The processed css code
 *
 * @setting     {Boolean}     [block=true]       Remove the blocks comments
 * @setting     {Boolean}     [line=true]       Remove the line comments
 *
 * @todo        tests
 *
 * @snippet         __stripCssComments($1)
 *
 * @example       js
 * import { __stripCssComments } from '@lotsof/sugar/css';
 * __stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TStripCssCommentsSettings = {
    block: boolean;
    line: boolean;
};
export default function stripCssComments(css: any, settings?: TStripCssCommentsSettings): string;
