import * as __fs from 'fs';
import __extension from './extension.js';

/**
 * @name            checkPathWithMultipleExtensions
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function take a path and some extensions to check if a file
 * exists with one of these particular extensions.
 * If a file exists, the function return the path with the first extensions that matches
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {Array<String>}     extensions      The extensions (without the dot) you want to check
 * @return      {String|undefined}                  The first valid path founded, or undefined
 *
 * @snippet         __checkPathWithMultipleExtensions($1, $2)
 * __checkPathWithMultipleExtensions($1, [
 *     $2
 * ])
 *
 * @example         js
 * import { __checkPathWithMultipleExtensions } from '@blackbyte/sugar/fs';
 * __checkPathWithMultipleExtensions('/my/cool/file.txt', ['txt','js','css']);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __checkPathWithMultipleExtensions(
  path: string,
  exts: string[],
): string | undefined {
  const extension = __extension(path) || '';
  const pathWithoutExt = path.replace(`.${extension}`, '');
  for (let i = 0; i < exts.length; i++) {
    const ext = exts[i];
    if (__fs.existsSync(`${pathWithoutExt}.${ext}`)) {
      return `${pathWithoutExt}.${ext}`;
    }
  }
  return undefined;
}
