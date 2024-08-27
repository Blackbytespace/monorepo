import __fs from 'fs';
import __ensureDirSync from './ensureDirSync.js';
import __moveSync from './moveSync.js';
import __unlinkSync from './unlinkSync.js';
export default function __renameSync(src, newName, settings) {
    const finalSettings = Object.assign({ override: true, dry: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const parts = src.split('/');
    let ext = '';
    // remove the file name
    const currentName = parts.pop();
    const currentNameParts = currentName.split('.');
    currentNameParts.shift();
    const currentExt = currentNameParts.join('.');
    let newPath = src;
    // handle the case where the new name has an extension
    if (newName.includes('.')) {
        ext = src.split('.').pop();
        newPath = parts.join('/') + '/' + newName;
    }
    else {
        ext = currentExt;
        newPath = parts.join('/') + '/' + newName + (ext ? '.' + ext : '');
    }
    // if already the same name
    if (src === newPath) {
        return newPath;
    }
    // only execute if not dry
    if (!finalSettings.dry) {
        // if want to override and file exists,
        // remove it
        if (finalSettings.override && __fs.existsSync(newPath)) {
            __unlinkSync(newPath);
        }
        // make sure we have the folder to write in
        __ensureDirSync(newPath);
        // move the file to his new destination
        __moveSync(src, newPath);
    }
    return newPath;
}
//# sourceMappingURL=renameSync.js.map