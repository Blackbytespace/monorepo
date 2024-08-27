/**
 * @name                isPath
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo        tests
 *
 * @snippet         __isPath($1)
 *
 * @example       js
 * import { __isPath } from '@lotsof/sugar/fs';
 * __isPath('hello/world'); // => true
 *
 * @see         https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isPath(path: string, checkExistence?: boolean): boolean;
