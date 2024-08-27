/**
 * @name                 extension
 * @namespace            node.fs
 * @type                 Function
 * @platform             node
 * @status               stable
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @todo        tests
 *
 * @snippet         __extension($1)
 *
 * @example         js
 * import { __extension } from '@lotsof/sugar/fs';
 * __extension('hello/world.jpg'); // => jpg
 *
 * @since         2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __extension(path: string): string;
