// @ts-nocheck
import __fs from 'fs';
export default function __packageMetasSync(path = process.cwd(), settings) {
    const finalSettings = Object.assign({ sources: ['package.json', 'composer.json'], fields: ['name', 'description', 'version', 'author', 'license'] }, (settings !== null && settings !== void 0 ? settings : {}));
    let foundFieldsCount = 0;
    const finalMetas = {};
    for (let source of finalSettings.sources) {
        // if we have already found everything
        // stop here
        if (foundFieldsCount >= finalSettings.fields.length) {
            break;
        }
        // if the file exist, read it and handle fields
        if (__fs.existsSync(`${path}/${source}`)) {
            const json = JSON.parse(__fs.readFileSync(`${path}/${source}`).toString());
            // check every fields to grab info from
            for (let field of finalSettings.fields) {
                if (!finalMetas[field] && json[field] !== undefined) {
                    finalMetas[field] = json[field];
                    foundFieldsCount++;
                }
            }
            // handle the "type" field
            if (source === 'composer.json') {
                finalMetas.type = 'composer';
            }
            else if (source === 'package.json') {
                finalMetas.type = 'npm';
            }
            else {
                finalMetas.type = 'unknown';
            }
        }
    }
    // return the metas
    return finalMetas;
}
//# sourceMappingURL=packageMetasSync.js.map