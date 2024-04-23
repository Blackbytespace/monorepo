import { __get } from '@lotsof/sugar/object';
export default function getConfig(path, def) {
    var _a, _b, _c;
    if (!process.lotsofConfig) {
        throw new Error('Config not loaded. Please call the loadConfig function before trying to get a config value');
    }
    if (path) {
        return (_b = __get((_a = process.lotsofConfig) !== null && _a !== void 0 ? _a : {}, path)) !== null && _b !== void 0 ? _b : def;
    }
    return (_c = process.lotsofConfig) !== null && _c !== void 0 ? _c : {};
}
//# sourceMappingURL=getConfig.js.map