/**
 * @name            renameSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This method allows you to rename a file or directory synchronously.
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 * @param       {TRenameSyncSettings} [settings={}] The settings for the operation
 * @return      {String}                          The new path
 *
 * @snippet         __renameSync($1, $2)
 *
 * @example       js
 * import { __renameSync } from '@lotsof/sugar/fs';
 * __renameSync('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TRenameSyncSettings = {
    override: boolean;
    dry: boolean;
};
export default function __renameSync(src: string, newName: string, settings?: Partial<TRenameSyncSettings>): string;
