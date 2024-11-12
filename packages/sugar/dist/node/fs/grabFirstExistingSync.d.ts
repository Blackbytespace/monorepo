/**
 * @name                grabFirstExistingSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check every passed paths and return the first existing one.
 *
 * @param         {String[]}            paths              The paths to check
 * @return          {String}                            The first existing path
 *
 * @todo            tests
 *
 * @snippet         __gradFirst
 *
 * @example       js
 * import { __grabFirstExistinSync } from '@lotsof/sugar/fs';
 * __grabFirstExisting([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __grabFirstExistingSync(paths: string[]): string;
