// @ts-nocheck
import { isPlainObject } from '@blackbyte/sugar/is';
import { mergeDeep, get } from '@blackbyte/sugar/object';
export default function getConfig(path, def) {
    var _a, _b, _c, _d, _e, _f;
    if (!process.blackbyteConfig && !process.blackbyteConfigDefaults) {
        throw new Error('Config not loaded. Please call the loadConfig function before trying to get a config value');
    }
    if (path) {
        const userConfig = (_b = get((_a = process.blackbyteConfig) !== null && _a !== void 0 ? _a : {}, path)) !== null && _b !== void 0 ? _b : (def || {}), defaultConfig = (_d = get((_c = process.blackbyteConfigDefaults) !== null && _c !== void 0 ? _c : {}, path)) !== null && _d !== void 0 ? _d : (def || {});
        if (isPlainObject(userConfig) && isPlainObject(defaultConfig)) {
            return mergeDeep([defaultConfig, userConfig]);
        }
        else {
            return userConfig;
        }
    }
    const config = mergeDeep([
        (_e = process.blackbyteConfigDefaults) !== null && _e !== void 0 ? _e : {},
        (_f = process.blackbyteConfig) !== null && _f !== void 0 ? _f : {},
    ]);
    return config;
}
//# sourceMappingURL=getConfig.js.map