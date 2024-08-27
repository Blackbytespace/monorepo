import __path from 'path';
import __tmpDir from 'temp-dir';
import __uniqid from '../../node/string/uniqid.js';
import __toString from '../../shared/string/toString.js';
import __writeFileSync from './writeFileSync.js';
export default function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = __path.resolve(__tmpDir, (_a = settings.path) !== null && _a !== void 0 ? _a : __uniqid() + '.tmp');
    __writeFileSync(path, __toString(data));
    return path;
}
//# sourceMappingURL=writeTmpFileSync.js.map