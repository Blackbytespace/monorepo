import __fs from 'fs';
import __packageDir from './packageDir.js';
export default function __packageJsonSync(nameOrPath, settings) {
    settings = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    const packageDir = __packageDir(nameOrPath, settings);
    return JSON.parse(__fs.readFileSync(`${packageDir}/package.json`, 'utf8'));
}
//# sourceMappingURL=packageJsonSync.js.map