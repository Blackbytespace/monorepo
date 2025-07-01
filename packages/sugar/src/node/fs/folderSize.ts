// @ts-ignore
import __fastFolderSize from 'fast-folder-size';

/**
 * @name                folderSize
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 * @async
 *
 * Calculate the size of the passed folder and return it through a promise in bytes format
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @todo            tests
 *
 * @snippet         __folderSize($1)
 * await __folderSize($1)
 *
 * @example           js
 * import { __folderSize } from '@blackbyte/sugar/fs';
 * await __folderSize('my/cool/folder');
 *
 *
 * @see             https://www.npmjs.com/package/get-folder-size
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __folderSize(folderPath: string): Promise<number> {
  return new Promise(async (resolve, reject) => {
    __fastFolderSize(folderPath, (err, bytes) => {
      resolve(bytes ?? 0);
    });
  });
}
