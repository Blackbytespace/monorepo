import __path from 'path';
import __tmpDir from 'temp-dir';
import __uniqid from '../../node/string/uniqid.js';
import __toString from '../../shared/string/toString.js';
import __writeFileSync from './writeFileSync.js';

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
 * @param       {IWriteTmpFileSettings}         [settings={}]           Some settings to customize your temp file creation
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
 * import { __writeTmpFile } from '@coffeekraken/sugar/fs.js';
 * __writeTmpFile('Hello World').then((path) => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWriteTmpFileSettings {
  path: string;
}

export default async function __writeTmpFile(
  data: any,
  settings: Partial<IWriteTmpFileSettings> = {},
): Promise<String> {
  settings = {
    path: undefined,
    ...settings,
  };

  let path = __path.resolve(__tmpDir, settings.path ?? __uniqid() + '.tmp');
  __writeFileSync(path, __toString(data));
  return path;
}
