import __commonAudioFileExtensions from './commonAudioFileExtensions.js';
import __commonImageFileExtensions from './commonImageFileExtensions.js';
import __commonVideoFileExtensions from './commonVideoFileExtensions.js';
import __unique from '../array/unique.js';
/**
 * @name            commonMediaFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common media file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonMediaFileExtensions()
 *
 * @example         js
 * import { __commonMediaFileExtensions } from '@coffeekraken/sugar/extension.js';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return __unique([
        ...__commonImageFileExtensions(finalSettings),
        ...__commonVideoFileExtensions(finalSettings),
        ...__commonAudioFileExtensions(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonMediaFileExtensions.js.map