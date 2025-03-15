// @ts-nocheck
import { __deepMerge } from '@lotsof/sugar/object';
export default function defineConfig(config, settings) {
    var _a, _b;
    if (settings === null || settings === void 0 ? void 0 : settings.defaults) {
        process.lotsofConfigDefaults = __deepMerge([
            (_a = process.lotsofConfigDefaults) !== null && _a !== void 0 ? _a : {},
            config,
        ]);
        return process.lotsofConfigDefaults;
    }
    else {
        process.lotsofConfig = __deepMerge([(_b = process.lotsofConfig) !== null && _b !== void 0 ? _b : {}, config]);
        return process.lotsofConfig;
    }
}
//# sourceMappingURL=defineConfig.js.map