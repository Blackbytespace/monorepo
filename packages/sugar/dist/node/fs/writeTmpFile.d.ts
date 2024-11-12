/**
 * @name                writeTmpFile
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Create a temporary file on the disk with the passed content and returns the path
 * to it.
 *
 * @param       {Any}              data          The data to write in the file
 * @param       {TWriteTmpFileSettings}         [settings={}]           Some settings to customize your temp file creation
 * @return      {Promise<String>}                           A promise that will be resolved when the writeTmpFile is completed with the path to it
 *
 * @todo        tests
 *
 * @setting         {String}            [path=null]         A path relative to the temp folder to store your file
 *
 * @snippet         __writeTmpFile($1, $2)
 * await __writeTmpFile($1, $2)
 *
 * @example       js
 * import { __writeTmpFile } from '@lotsof/sugar/fs';
 * __writeTmpFile('Hello World').then((path) => {
 *    // do something on complete...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TWriteTmpFileSettings = {
    path: string;
};
export default function __writeTmpFile(data: any, settings?: Partial<TWriteTmpFileSettings>): Promise<String>;
