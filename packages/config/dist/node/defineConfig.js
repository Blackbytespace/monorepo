// @ts-nocheck
import { mergeDeep } from '@blackbyte/sugar/object';
process.blackbyteConfigDefaults = {};
process.blackbyteConfig = {};
export default function defineConfig(config, settings) {
    var _a;
    if (settings === null || settings === void 0 ? void 0 : settings.defaults) {
        process.blackbyteConfigDefaults = mergeDeep([
            process.blackbyteConfigDefaults,
            config,
        ]);
        return process.blackbyteConfigDefaults;
    }
    else {
        process.blackbyteConfig = mergeDeep([
            (_a = process.blackbyteConfig) !== null && _a !== void 0 ? _a : {},
            config,
        ]);
        return process.blackbyteConfig;
    }
}
//# sourceMappingURL=defineConfig.js.map