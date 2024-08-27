import { minimatch as __minimatch } from 'minimatch';
import __deepize from './deepize.js';
import __flatten from './flatten.js';
export default function __getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = __flatten(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.deepize === true)
        return __deepize(resultObj);
    return resultObj;
}
//# sourceMappingURL=getGlob.js.map