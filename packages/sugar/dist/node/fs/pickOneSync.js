import * as __fs from 'fs';
import __micromatch from 'micromatch';
export default function __pickOneSync(filesNames, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd() }, (settings !== null && settings !== void 0 ? settings : {}));
    // check if we have a file
    const files = __fs.readdirSync(finalSettings.cwd);
    for (const fileName of files) {
        if (__micromatch.isMatch(fileName, filesNames)) {
            return `${finalSettings.cwd}/${fileName}`;
        }
    }
}
//# sourceMappingURL=pickOneSync.js.map