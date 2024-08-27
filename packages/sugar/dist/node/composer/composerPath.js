import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';
import __packageRootDir from '../path/packageRootDir.js';
export default function composerPath(name, settings) {
    const set = __deepMerge({
        cwd: process.cwd(),
        monorepo: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir;
    monoDir = `${__packageRootDir(set.cwd, {
        highest: set.monorepo,
    })}/vendor`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.cwd}/vendor/${name}/composer.json`)) {
        return __fs.realpathSync(`${set.cwd}/vendor/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        __fs.existsSync(`${monoDir}/${name}/composer.json`)) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }
}
//# sourceMappingURL=composerPath.js.map