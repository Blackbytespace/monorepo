// @ts-nocheck
import { __deepMerge } from '@lotsof/sugar/object';
process.lotsofConfigDefaults = {};
process.lotsofConfig = {};
export default function defineConfig(config, settings) {
    var _a;
    if (settings === null || settings === void 0 ? void 0 : settings.defaults) {
        process.lotsofConfigDefaults = __deepMerge([
            process.lotsofConfigDefaults,
            config,
        ]);
        return process.lotsofConfigDefaults;
    }
    else {
        process.lotsofConfig = __deepMerge([(_a = process.lotsofConfig) !== null && _a !== void 0 ? _a : {}, config]);
        return process.lotsofConfig;
    }
}
//# sourceMappingURL=defineConfig.js.map