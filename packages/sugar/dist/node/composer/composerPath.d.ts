/**
 * @name                    composerPath
 * @namespace               node.composer
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * composer package path
 *
 * @param       {String}        name        the package name wanted
 * @param       {IComposerPathSettings}      [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @snippet         __composerPath($1)
 *
 * @example         js
 * import { __composerPath } from '@lotsof/sugar/composer`;
 * __composerPath('lodash');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export interface IComposerPathSettings {
    cwd: string;
    monorepo: boolean;
}
export default function composerPath(name: string, settings?: Partial<IComposerPathSettings>): any;
