import __fs from 'fs';
import __packageRootDir from './packageRootDir.js';

/**
 * @name                    nodeModulesDir
 * @namespace               node.package
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply returns the "node_modules" directory path
 *
 * @param       {TNodeModulesDirSettings}      [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         __nodeModulesDir($1)
 *
 * @example         js
 * import { __nodeModulesDir } from '@blackbyte/sugar/composer`;
 * __nodeModulesDir('lodash');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TNodeModulesDirSettings = {
  cwd: string;
  monorepo: boolean;
  checkExistence: boolean;
};

export default function nodeModulesDir(
  settings?: Partial<TNodeModulesDirSettings>,
): any {
  const set = <TNodeModulesDirSettings>{
    cwd: process.cwd(),
    monorepo: false,
    checkExistence: true,
    ...(settings ?? {}),
  };

  let nodeModulesDir = `${__packageRootDir(set.cwd, {
    highest: set.monorepo,
  })}/node_modules`;

  if (set.checkExistence && !__fs.existsSync(nodeModulesDir)) {
    throw new Error(
      `The NPM node_modules directory "<yellow>${nodeModulesDir}</yellow>" does not exists...`,
    );
  }

  return nodeModulesDir;
}
