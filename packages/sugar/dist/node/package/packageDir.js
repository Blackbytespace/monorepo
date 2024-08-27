import __fs from 'fs';
import __path from 'path';
import __nodeModulesDir from './nodeModulesDir.js';
export default function packageDir(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // absolute path
    if (__fs.existsSync(`${nameOrPath}/package.json`)) {
        return __path.resolve(nameOrPath);
    }
    const vendorDir = __nodeModulesDir(settings);
    // current package dir "."
    if (nameOrPath === '.') {
        return __path.resolve(`${vendorDir}/../`);
    }
    if (settings.checkExistence &&
        !__fs.existsSync(`${vendorDir}/${nameOrPath}/package.json`)) {
        throw new Error(`The NPM package "<yellow>${nameOrPath}</yellow>" seems to not exists...`);
    }
    return `${vendorDir}/${nameOrPath}`;
}
//# sourceMappingURL=packageDir.js.map