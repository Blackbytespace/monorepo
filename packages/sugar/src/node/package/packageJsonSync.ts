import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';

/**
 * @name                    packageJsonSync
 * @namespace               node.package
 * @type                    Function
 * @platform                node
 * @status                  stable
 *
 * Returns the package.json file depending on the passed cwd.
 * It will go up the directories tree and get the first package.json found.
 *
 * @param       {IPackageJsonSyncSettings}          [settings={}]           Some settings like cwd, etc...
 *
 * @setting       {String}        [cwd=process.cwd()]       The working directory to start from
 *
 * @todo      tests
 *
 * @snippet         __packageJsonSync()
 *
 * @example         js
 * import { __packageJsonSync } from '@coffeekraken/sugar/package';
 * const root = __packageJsonSync();
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPackageJsonSyncSettings {
  cwd?: string;
}

export default function __packageJsonSync(
  settings: IPackageJsonSyncSettings = {},
): any {
  settings = {
    cwd: process.cwd(),
    ...settings,
  };
  const packageRootDir = __packageRootDir(settings.cwd, {
    highest: false,
  });
  const packageJsonFilePath = `${packageRootDir}/package.json`;
  return __readJsonSync(packageJsonFilePath);
}
