/**
 * @name            isDirectory
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isDirectory($1)
 *
 * @example     js
 * import { __isDirectory } from '@lotsof/sugar/is';
 * __isDirectory('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TIsDirectorySettings = {
    symlink?: boolean;
};
export default function __isDirectory(path: string, settings?: TIsDirectorySettings): any;
