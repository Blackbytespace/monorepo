import __deepMerge from '../../shared/object/deepMerge.js';
import __isDirectory from '../is/isDirectory.js';
import __fileHashSync from './fileHashSync.js';
import * as __fs from 'fs';
import __sha256 from '../crypto/sha256.js';
export default function __folderHashSync(folderPath, settings = {}) {
    settings = __deepMerge({
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    const paths = [];
    function readDir(dir) {
        const files = __fs.readdirSync(dir);
        files.forEach((filePath) => {
            if (settings.recursive && __isDirectory(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }
    readDir(folderPath);
    const filesHashes = [];
    paths.forEach((path) => {
        if (__isDirectory(path))
            return;
        filesHashes.push(__fileHashSync(path, settings));
    });
    return __sha256.encrypt(filesHashes.join('-'));
}
//# sourceMappingURL=folderHashSync.js.map