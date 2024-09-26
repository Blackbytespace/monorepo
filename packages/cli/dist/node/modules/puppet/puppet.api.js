// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __Puppet from '@lotsof/puppet';
import { __getConfig } from '@lotsof/config';
let puppetConfig;
let _puppet;
function setup() {
    puppetConfig = __getConfig().puppet;
    _puppet = new __Puppet(puppetConfig.settings);
}
export default function __registerCommands(program) {
    program.hook('preAction', () => __awaiter(this, void 0, void 0, function* () {
        setup();
    }));
    program
        .command('puppet.shot')
        .option('-u, --url <url>', 'Specify the url to take a screenshot of')
        .option('--vw <number>', 'Specify the width of the viewport', parseInt)
        .option('--vh <number>', 'Specify the height of the viewport', parseInt)
        .option('-w, --width <number>', 'Specify the width of the screenshot', parseInt)
        .option('-h, --height <number>', 'Specify the height of the screenshot', parseInt)
        .option('-s, --selector <string>', 'Specify a css selector to take a screenshot of')
        .option('--themeFiles <string>', 'Specify the path to the theme files. Can be a glob pattern')
        .action((options) => __awaiter(this, void 0, void 0, function* () {
        console.log(`▓ Making a screenshot...`);
        // extends options with defaults
        options = Object.assign(Object.assign({}, puppetConfig.screenshot), options);
        yield _puppet.screenshot(options);
    }));
}
//# sourceMappingURL=puppet.api.js.map