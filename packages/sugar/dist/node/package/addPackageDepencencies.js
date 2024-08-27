import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync.js';
import __writeJsonSync from '../fs/writeJsonSync.js';
import __packageRootDir from './packageRootDir.js';
import * as __semver from 'semver';
export default function __addPackageDependencies(deps, settings) {
    settings = Object.assign({ cwd: process.cwd(), dev: false, global: false, install: false }, (settings !== null && settings !== void 0 ? settings : {}));
    return new Promise((resolve, reject) => {
        // get the package.json file path
        const packageJsonPath = `${__packageRootDir(settings.cwd)}/package.json`;
        if (!__fs.existsSync(packageJsonPath)) {
            throw new Error(`No package.json file found at "<yellow>${packageJsonPath}</yellow>"`);
        }
        // read the current package.json file
        const packageJson = __readJsonSync(packageJsonPath);
        const depProp = settings.dev
            ? 'devDependencies'
            : settings.global
                ? 'globalDependencies'
                : 'dependencies';
        // loop on the deps to add
        for (let [name, version] of Object.entries(deps)) {
            // if the dependency des not exists, add it
            if (!packageJson[depProp]) {
                packageJson[depProp][name] = version;
                continue;
            }
            // if override
            if (settings.override) {
                packageJson[depProp][name] = version;
                continue;
            }
            // check if the dependency satifdy the semver range
            if (!__semver.satisfies(version, packageJson[depProp][name])) {
                throw new Error(`The dependency "<yellow>${name}</yellow>" already exists in the package.json file but with a different version...`);
            }
        }
        // write the new package.json file
        __writeJsonSync(packageJsonPath, packageJson);
        // resolve the promise with the new package.json content
        resolve(packageJson);
    });
}
//# sourceMappingURL=addPackageDepencencies.js.map