var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __Components from './Component.js';
import __GitSource from './sources/GitSource.js';
const DEFAULTS = {
    sources: {
        lotsofGitComponents: new __GitSource('Github lotsof', 'git@github.com:lotsofdev/components.git'),
    },
};
for (let [id, source] of Object.entries(DEFAULTS.sources)) {
    __Components.registerSource(id, source);
}
export default function __registerCommands(program) {
    program.command('components.ls').action(() => __awaiter(this, void 0, void 0, function* () {
        const sources = __Components.getSources();
        console.log(`Listing components from ${Object.keys(sources).length} source(s)...`);
        // updating sources
        for (let [sourceId, source] of Object.entries(sources)) {
            yield source.update();
        }
        // list components from source
        for (let [sourceId, source] of Object.entries(sources)) {
            const components = yield source.listComponents();
        }
    }));
    program
        .command('components.add <components...> ')
        .description('add one or more components into your project')
        .action((components) => {
        console.log(components);
        console.log('clone command called');
    });
}
//# sourceMappingURL=components.js.map