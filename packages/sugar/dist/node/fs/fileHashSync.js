import { Buffer } from 'buffer';
import __crypto from 'crypto';
import * as __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
export default function __fileHashSync(filePath, settings = {}) {
    var _a;
    settings = __deepMerge({
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: true,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    let fileBuffer = __fs.readFileSync(filePath);
    if ((_a = settings.include) === null || _a === void 0 ? void 0 : _a.ctime) {
        try {
            const ctime = __fs.statSync(filePath).ctime;
            const buffer = Buffer.from(ctime);
            fileBuffer = Buffer.concat([fileBuffer, buffer]);
        }
        catch (e) { }
    }
    const hashSum = __crypto.createHash(settings.algo);
    hashSum.update(fileBuffer);
    return hashSum.digest(settings.digest);
}
//# sourceMappingURL=fileHashSync.js.map