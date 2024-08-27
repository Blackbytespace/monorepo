import __commonAudioFileExtensions from './commonAudioFileExtensions.js';
import __commonCompressedFileExtensions from './commonCompressedFileExtensions.js';
import __commonDataFileExtensions from './commonDataFileExtensions.js';
import __commonDiscFileExtensions from './commonDiscFileExtensions.js';
import __commonEmailFileExtensions from './commonEmailFileExtensions.js';
import __commonExecutableFileExtensions from './commonExecutableFileExtensions.js';
import __commonFontFileExtensions from './commonFontFileExtensions.js';
import __commonImageFileExtensions from './commonImageFileExtensions.js';
import __commonMediaFileExtensions from './commonMediaFileExtensions.js';
import __commonProgrammingFileExtensions from './commonProgrammingFileExtensions.js';
import __commonTextFileExtensions from './commonTextFileExtensions.js';
import __commonVideoFileExtensions from './commonVideoFileExtensions.js';
import __commonWebFileExtensions from './commonWebFileExtensions.js';
import __unique from '../array/unique.js';
export default function __commonFileExtensions(types = [
    'audio',
    'compressed',
    'data',
    'disc',
    'email',
    'executable',
    'font',
    'image',
    'media',
    'programming',
    'text',
    'video',
    'web',
], settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return __unique([
        ...(types.includes('audio')
            ? __commonAudioFileExtensions(finalSettings)
            : []),
        ...(types.includes('compressed')
            ? __commonCompressedFileExtensions(finalSettings)
            : []),
        ...(types.includes('data')
            ? __commonDataFileExtensions(finalSettings)
            : []),
        ...(types.includes('disc')
            ? __commonDiscFileExtensions(finalSettings)
            : []),
        ...(types.includes('email')
            ? __commonEmailFileExtensions(finalSettings)
            : []),
        ...(types.includes('executable')
            ? __commonExecutableFileExtensions(finalSettings)
            : []),
        ...(types.includes('font')
            ? __commonFontFileExtensions(finalSettings)
            : []),
        ...(types.includes('image')
            ? __commonImageFileExtensions(finalSettings)
            : []),
        ...(types.includes('media')
            ? __commonMediaFileExtensions(finalSettings)
            : []),
        ...(types.includes('programming')
            ? __commonProgrammingFileExtensions(finalSettings)
            : []),
        ...(types.includes('text')
            ? __commonTextFileExtensions(finalSettings)
            : []),
        ...(types.includes('video')
            ? __commonVideoFileExtensions(finalSettings)
            : []),
        ...(types.includes('web') ? __commonWebFileExtensions(finalSettings) : []),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=commonFileExtensions.js.map