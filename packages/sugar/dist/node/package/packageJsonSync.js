import __readJsonSync from '../fs/readJsonSync';
import __packageRootDir from '../path/packageRootDir';
export default function __packageJsonSync(settings = {}) {
    settings = Object.assign({ cwd: process.cwd() }, settings);
    const packageRootDir = __packageRootDir(settings.cwd, {
        highest: false,
    });
    const packageJsonFilePath = `${packageRootDir}/package.json`;
    return __readJsonSync(packageJsonFilePath);
}
//# sourceMappingURL=packageJsonSync.js.map