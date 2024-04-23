import { __deepMerge } from '@lotsof/sugar/object';
export default function defineConfig(config) {
    var _a;
    process.lotsofConfig = __deepMerge((_a = process.lotsofConfig) !== null && _a !== void 0 ? _a : {}, config);
    return process.lotsofConfig;
}
//# sourceMappingURL=defineConfig.js.map