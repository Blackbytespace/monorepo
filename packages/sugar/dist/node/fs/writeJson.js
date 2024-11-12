var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __ensureDirSync from './ensureDirSync.js';
import __folderPath from './folderPath.js';
import * as __fs from 'fs';
/**
 * @name                writeJson
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @todo        tests
 *
 * @snippet         __writeJson($1, $2)
 * await _writeJson($1, $2)
 *
 * @example       js
 * import { __writeJson } from '@lotsof/sugar/fs';
 * __writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __writeJson(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = __folderPath(path);
        __ensureDirSync(folderPath);
        let jsonStr = data;
        if (typeof jsonStr !== 'string') {
            jsonStr = JSON.stringify(data, null, 4);
        }
        // @ts-ignore
        yield __fs.writeFile(path, jsonStr);
        return path;
    });
}
//# sourceMappingURL=writeJson.js.map