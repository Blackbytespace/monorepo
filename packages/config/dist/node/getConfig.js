// @ts-nocheck
import { __get, __deepMerge } from '@lotsof/sugar/object';
import { __isPlainObject } from '@lotsof/sugar/is';
export default function getConfig(path, def) {
    var _a, _b, _c, _d, _e, _f;
    if (!process.lotsofConfig && !process.lotsofConfigDefaults) {
        throw new Error('Config not loaded. Please call the loadConfig function before trying to get a config value');
    }
    if (path) {
        const userConfig = (_b = __get((_a = process.lotsofConfig) !== null && _a !== void 0 ? _a : {}, path)) !== null && _b !== void 0 ? _b : (def || {}), defaultConfig = (_d = __get((_c = process.lotsofConfigDefaults) !== null && _c !== void 0 ? _c : {}, path)) !== null && _d !== void 0 ? _d : (def || {});
        if (__isPlainObject(userConfig) && __isPlainObject(defaultConfig)) {
            return __deepMerge(defaultConfig, userConfig);
        }
        else {
            return userConfig;
        }
    }
    return __deepMerge((_e = process.lotsofConfigDefaults) !== null && _e !== void 0 ? _e : {}, (_f = process.lotsofConfig) !== null && _f !== void 0 ? _f : {});
}
//# sourceMappingURL=getConfig.js.map