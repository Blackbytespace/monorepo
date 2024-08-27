/**
 * @name          packageMetasSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function take a package root path and returns the metas informations from one of these sources:
 * - package.json
 * - composer.json
 *
 * @param     {String}      [path=process.cwd()]      The path of the package to search metas for
 * @return    {Object}          The metas object information containing these data: name, description, version, author and license
 *
 * @todo      tests
 *
 * @snippet         __packageMetasSync($1)
 *
 * @example     js
 * import { __packageMetasSync } from '@lotsof/sugar/package';
 * __packageMetasSync();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export interface IPackageMetas {
    type: 'npm' | 'composer';
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
}
export interface IPackageMetasSettings {
    sources: string[];
    fields: string[];
}
export default function __packageMetasSync(path?: string, settings?: Partial<IPackageMetasSettings>): IPackageMetas;
