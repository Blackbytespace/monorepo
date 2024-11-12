/**
 * @name            moveSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @snippet         __moveSync($1, $2)
 *
 * @example       js
 * import { __moveSync } from '@lotsof/sugar/fs';
 * __moveSync('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __moveSync(src: string, dest: string): void;
