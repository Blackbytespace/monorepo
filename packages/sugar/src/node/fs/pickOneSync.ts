import * as __fs from 'fs';
import __micromatch from 'micromatch';

/**
 * @name            pickOneSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to specify multiple files to check and pick one of them
 *
 * @param       {String[]}      filesNames          The names of the files you want to check
 * @param       {IPickOneSyncSettings}       [settings={}]       An object of settings to configure your research
 * @return     {SFile|String}                   Either an SFile instance if set in the config, or the path of the file found
 *
 * @todo        tests
 *
 * @setting         {String}        [cwd=process.cwd()]       The current working directory to search in
 * @setting         {Boolean}         [SFile=true]          Return an SFile instance if true, otherwise just a simple path string
 *
 * @snippet         __pickOneSync([$1])
 *
 * @example         js
 * import { __pickOneSync } from '@coffeekraken/sugar/fs.js';
 * __pickOneSync(['myCoolFile.json', 'myCoolFile2.json'], {});
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPickOneSyncSettings {
  cwd: string;
}

export default function __pickOneSync(
  filesNames: string[],
  settings?: Partial<IPickOneSyncSettings>,
): string {
  const finalSettings: IPickOneSyncSettings = {
    cwd: process.cwd(),
    ...(settings ?? {}),
  };
  let result: string = '';
  // check if we have a file
  const files = __fs.readdirSync(finalSettings.cwd);
  for (const fileName of files) {
    if (__micromatch.isMatch(fileName, filesNames)) {
      result = `${finalSettings.cwd}/${fileName}`;
      break;
    }
  }
  return result;
}
