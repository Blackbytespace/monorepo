import __fs from 'fs';
import __packageRootDir from './packageRootDir.js';
export default function nodeModulesDir(settings) {
    const set = Object.assign({ cwd: process.cwd(), monorepo: false, checkExistence: true }, (settings !== null && settings !== void 0 ? settings : {}));
    let nodeModulesDir = `${__packageRootDir(set.cwd, {
        highest: set.monorepo,
    })}/node_modules`;
    if (set.checkExistence && !__fs.existsSync(nodeModulesDir)) {
        throw new Error(`The NPM node_modules directory "<yellow>${nodeModulesDir}</yellow>" does not exists...`);
    }
    return nodeModulesDir;
}
//# sourceMappingURL=nodeModulesDir.js.map