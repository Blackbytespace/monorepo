import __isDirectory from '../is/isDirectory.js';
import __fileHashSync from './fileHashSync.js';
import * as __fs from 'fs';
import __sha256 from '../../shared/crypto/sha256.js';
export default function __folderHashSync(folderPath, settings = {}) {
    const finalSettings = Object.assign({ recursive: true, algo: 'sha256', encoding: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    const paths = [];
    function readDir(dir) {
        const files = __fs.readdirSync(dir);
        files.forEach((filePath) => {
            if (finalSettings.recursive && __isDirectory(`${dir}/${filePath}`)) {
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
        filesHashes.push(__fileHashSync(path, {
            algo: finalSettings.algo,
            encoding: finalSettings.encoding,
        }));
    });
    return __sha256.encrypt(filesHashes.join('-'));
}
//# sourceMappingURL=folderHashSync.js.map