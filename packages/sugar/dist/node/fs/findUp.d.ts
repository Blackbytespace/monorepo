/**
 * @name            findUp
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function simply walk across upper folders to search for a file
 * and returns you the first finded
 *
 * @param       {IFindUpSearch}         search          The name of the file you search
 * @param       {TFindUpSettings}       [settings={}]       An object of settings to configure your research
 * @return      {SFile|null}                                 An SFile instance or null if nothings founded
 *
 * @todo            tests
 *
 * @snippet         __findUp($1)
 * await __findUp($1)
 *
 * @example         js
 * import { __findUp } from '@lotsof/sugar/fs';
 * const file = await __findUp('myCoolFile.json', {});
 * console.log(file.path);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TFindUpSettings = {
    symlinks?: boolean;
    cwd?: string;
    stopWhenFound?: boolean;
};
export default function __findUp(search: string, settings: TFindUpSettings): Promise<string[]>;
