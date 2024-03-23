var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { globSync as __globSync } from 'glob';
import { __readJsonSync } from '@lotsof/sugar/fs';
export default class ComponentSource {
    get localDir() {
        return `${this.settings.localDir}/${this.id}`;
    }
    constructor(name, settings = {}) {
        this.id = '';
        this.name = 'Unimplementedsource';
        this.settings = {};
        this.name = name;
        this.settings = Object.assign({}, settings);
    }
    get metas() {
        return {
            name: this.name,
        };
    }
    update(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                source: {
                    name: 'Error',
                },
                components: {},
            };
        });
    }
    listComponents() {
        var _a;
        // reading the "lotsof.json" file
        const lotsofJson = __readJsonSync(`${this.localDir}/lotsof.json`);
        let folders = ['src/components/*'];
        // check if we have the "components.folders" settings
        if ((_a = lotsofJson.components) === null || _a === void 0 ? void 0 : _a.folders) {
            folders = lotsofJson.components.folders;
        }
        // list components
        for (let [i, path] of folders.entries()) {
            const components = __globSync(path, {
                cwd: this.localDir,
            });
            console.log(components);
        }
        console.log(folders);
    }
}
//# sourceMappingURL=Source.js.map