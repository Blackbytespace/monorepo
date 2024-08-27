import { ICommonFileExtensionsSettings } from './commonFileExtensions.js';
/**
 * @name            commonTextFileExtensions
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
 * @snippet         __commonTextFileExtensions()
 *
 * @example         js
 * import { __commonTextFileExtensions } from '@lotsof/sugar/extension';
 * const extensions = __commonTextFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __commonTextFileExtensions(settings?: Partial<ICommonFileExtensionsSettings>): string[];
