/**
 * @name            rename
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 * @async
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @snippet         __rename($1, $2)
 *
 * @example       js
 * import { __rename } from '@lotsof/sugar/fs';
 * await __rename('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TRenameSettings = {
    override: boolean;
};
export default function __rename(src: string, newName: string, settings?: Partial<TRenameSettings>): Promise<void>;
