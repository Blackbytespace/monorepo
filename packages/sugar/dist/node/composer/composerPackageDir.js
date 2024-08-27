import __fs from 'fs';
import __path from 'path';
import __composerVendorDir from './composerVendorDir.js';
export default function composerJsonSync(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // absolute path
    if (__fs.existsSync(`${nameOrPath}/composer.json`)) {
        return __path.resolve(nameOrPath);
    }
    const vendorDir = __composerVendorDir(settings);
    // current package dir "."
    if (nameOrPath === '.') {
        return __path.resolve(`${vendorDir}/../`);
    }
    if (settings.checkExistence &&
        !__fs.existsSync(`${vendorDir}/${nameOrPath}/composer.json`)) {
        throw new Error(`The Composer package "<yellow>${nameOrPath}</yellow>" seems to not exists...`);
    }
    return `${vendorDir}/${nameOrPath}`;
}
//# sourceMappingURL=composerPackageDir.js.map