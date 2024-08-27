import __fs from 'fs';
import __composerPackageDir from './composerPackageDir.js';
export default function composerJsonSync(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    const packageDir = __composerPackageDir(nameOrPath, settings);
    return JSON.parse(__fs.readFileSync(`${packageDir}/composer.json`, 'utf8'));
}
//# sourceMappingURL=composerJsonSync.js.map