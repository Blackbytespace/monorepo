// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import '@blackbyte/components';
// import '@blackbyte/factory';
// import '@blackbyte/puppet';
import { packageRootDir } from '@blackbyte/sugar/package';
import fs from 'fs';
import defineConfig from './defineConfig.js';
import getConfig from './getConfig.js';
export default function loadConfig(path, def) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const possibleFiles = [
            `${packageRootDir()}/blackbyte.config.ts`,
            `${packageRootDir()}/blackbyte.config.js`,
            `${packageRootDir()}/blackbyte.config.json`,
        ];
        let configFilePath = '';
        for (let i = 0; i < possibleFiles.length; i++) {
            const file = possibleFiles[i];
            if (fs.existsSync(file)) {
                configFilePath = file;
                break;
            }
            if (!configFilePath) {
                return (_a = process.blackbyteConfig) !== null && _a !== void 0 ? _a : {};
            }
        }
        // read the config file
        const config = yield import(configFilePath).then((mod) => mod.default);
        if (config) {
            // set the new config
            defineConfig(config);
        }
        // return the wanted config
        return getConfig(path, def);
    });
}
//# sourceMappingURL=loadConfig.js.map