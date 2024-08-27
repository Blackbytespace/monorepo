/**
 * @name                    commonFileExtensions
 * @namespace               shared.extension
 * @type                    Function
 * @platform                node
 * @platform                js
 * @status                  stable
 *
 * This function allows you to get an array of common file extensions with or without the dot.
 * You can filter extensions by types:
 * - audio
 * - compressed
 * - data
 * - disc
 * - email
 * - executable
 * - font
 * - image
 * - media
 * - programming
 * - text
 * - video
 * - web
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonFileExtensions()
 *
 * @example         js
 * import { __commonFileExtensions } from '@lotsof/sugar/extension';
 * const extensions = __commonFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type Types = ('audio' | 'compressed' | 'data' | 'disc' | 'email' | 'executable' | 'font' | 'image' | 'media' | 'programming' | 'text' | 'video' | 'web')[];
export interface ICommonFileExtensionsSettings {
    dot: boolean;
    exclude: string[];
}
export default function __commonFileExtensions(types?: Types, settings?: Partial<ICommonFileExtensionsSettings>): string[];
