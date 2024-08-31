/**
 * @name            isFile
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      tests
 *
 * @snippet         __isFile($1);
 *
 * @example     js
 * import { __isFile } from '@lotsof/sugar/is';
 * __isFile('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TIsFileSettings = {
    symlink?: boolean;
};
export default function __isFile(path: string, settings?: TIsFileSettings): any;
