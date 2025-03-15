var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __I18n from '../shared/I18n.js';
import __I18nExtractParamsInterface from './interface/SI18nExtractParamsInterface';
import __ts from 'typescript';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __sort } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __SGlob from '@coffeekraken/s-glob';
export default class SI18n extends __I18n {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        super(__deepMerge([{}, settings]));
    }
    /**
     * @name            extract
     * @type            Function
     * @async
     *
     * This async method allows you to extract all the translations from your codebase.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    extract(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __I18nExtractParamsInterface.apply(params);
            const duration = new __SDuration();
            console.log(`<yellow>[extract]</yellow> i18n extraction starting...`);
            const files = __SGlob.resolveSync(finalParams.glob, {
                cwd: __packageRootDir(),
            });
            console.log(`<yellow>[extract]</yellow> <cyan>${files.length}</cyan> file${files.length > 1 ? 's' : ''} found`);
            let i18n = {};
            // recursive function that process each nodes
            function delintNode(node) {
                var _a;
                if (node.kind === __ts.SyntaxKind.CallExpression) {
                    let text = node.getFullText().trim();
                    if (text.startsWith('__i18n')) {
                        // make sure that the text is not on the same line as the
                        const id = (_a = text.match(/id:\s?('|"|`)(.+)('|"|`)/)) === null || _a === void 0 ? void 0 : _a[2], string = node.arguments[0].text;
                        // set the translation in the i18n object
                        i18n[id !== null && id !== void 0 ? id : string] = string;
                    }
                }
                // process every child nodes
                __ts.forEachChild(node, delintNode);
            }
            // loop on each founded files to process them
            files.forEach((file) => {
                const sourceFile = __ts.createSourceFile('foo.ts', file.raw, __ts.ScriptTarget.ES5, true);
                delintNode(sourceFile);
            });
            // sort the i18n by keys
            i18n = __sort(i18n);
            // writing the file on the disk
            __writeJsonSync(`${finalParams.outDir}/${finalParams.fileName}`, i18n);
            console.log(`<green>[extract]</green> i18n extraction complete <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>!`);
            console.log(`<green>[extract]</green> Your i18n file has been saved here "<cyan>${__path.relative(__packageRootDir(), `${finalParams.outDir}/${finalParams.fileName}`)}</cyan>"`);
            resolve();
        }));
    }
}
//# sourceMappingURL=I18n.js.map