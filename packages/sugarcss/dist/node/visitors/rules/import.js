import __parseArgs from '../../utils/parseArgs.js';
export default function _import(v, settings) {
    // parse args
    const args = __parseArgs(v.prelude, ['path']);
    console.log(JSON.stringify(v, null, 4));
}
//# sourceMappingURL=import.js.map