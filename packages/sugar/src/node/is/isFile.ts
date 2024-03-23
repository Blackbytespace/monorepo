import * as __fs from 'fs';

/**
 * @name            isFile
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      tests
 *
 * @snippet         __isFile($1);
 *
 * @example     js
 * import { __isFile } from '@coffeekraken/sugar/is.js';
 * __isFile('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

interface IIsFileSettings {
  symlink?: boolean;
}

export default function __isFile(path: string, settings: IIsFileSettings = {}) {
  settings = {
    symlink: true,
    ...settings,
  };

  let isMatching = __fs.existsSync(path);
  if (!isMatching) return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isFile();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isFile();
  }
  return isMatching;
}
