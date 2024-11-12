import { ICommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonImageFileExtensions
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
 * @snippet         __commonImageFileExtensions()
 *
 * @example         js
 * import { __commonImageFileExtensions } from '@lotsof/sugar/extension';
 * const extensions = __commonImageFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __commonImageFileExtensions(
  settings: Partial<ICommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: ICommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    ...settings,
  };
  return [
    'ai',
    'bmp',
    'gif',
    'ico',
    'jpeg',
    'jpg',
    'png',
    'ps',
    'psd',
    'svg',
    'tif',
    'tiff',
    'webp',
  ]
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
