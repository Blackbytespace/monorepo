import { ICommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonCompressedFileExtensions
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
 * @snippet         __commonCompressedFileExtensions()
 *
 * @example         js
 * import { __commonCompressedFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonCompressedFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonCompressedFileExtensions(
  settings: Partial<ICommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: ICommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    ...settings,
  };
  return ['7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'tar.gz', 'z', 'zip']
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
