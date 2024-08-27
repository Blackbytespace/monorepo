import { ICommonFileExtensionsSettings } from './commonFileExtensions.js';
/**
 * @name            commonDataFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonDataFileExtensions()
 *
 * @example         js
 * import { __commonDataFileExtensions } from '@lotsof/sugar/extension';
 * const extensions = __commonDataFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __commonDataFileExtensions(settings?: Partial<ICommonFileExtensionsSettings>): string[];
