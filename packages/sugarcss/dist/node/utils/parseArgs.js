import { __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';
import __parsedArgsToRawValues from './parsedArgsToRawValues.js';
export default function parseArgs(args, schema = [], settings) {
    var _a;
    const finalSettings = Object.assign({ separator: ['comma'], resolve: true }, (settings !== null && settings !== void 0 ? settings : {}));
    const separators = Array.isArray(finalSettings.separator)
        ? finalSettings.separator
        : [finalSettings.separator];
    const resultArgs = {};
    let dashedArg;
    let argId = 0, currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
    const handleArg = (arg) => {
        var _a, _b, _c;
        // some tokens to avoid
        const avoid = [
            'parenthesis-block',
            'close-parenthesis',
            'white-space',
            'comment',
            'colon',
            'semicolon',
        ];
        if (avoid.includes(arg.value.type)) {
            return;
        }
        if (separators.includes(arg.value.type)) {
            dashedArg = '';
            argId++;
            currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
            return;
        }
        switch (arg.type) {
            case 'dashed-ident':
                // flag that we are in a dashed ident
                if (!dashedArg) {
                    dashedArg = currentProp;
                }
                // handle dashed ident like (--darken 10) etc...
                if (resultArgs[dashedArg] === undefined) {
                    resultArgs[dashedArg] = {};
                }
                currentProp = `${dashedArg}.${arg.value.replace(/-{1,2}/g, '')}`;
                break;
            case 'function':
                if (arg.value.name === 'cubic-bezier') {
                    arg.rawValue = __toString(arg);
                    __set(resultArgs, currentProp, arg);
                }
                else if (env.functions[arg.value.name]) {
                    const v = env.functions[arg.value.name](arg.value);
                    // get the raw value
                    arg.rawValue = (_b = v.raw) !== null && _b !== void 0 ? _b : v;
                    __set(resultArgs, currentProp, arg);
                    // set the new currentProp
                    currentProp = (_c = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _c !== void 0 ? _c : `arg${argId}`;
                }
                break;
            default:
                // get the raw value
                arg.rawValue = arg.value.value;
                // handle others
                __set(resultArgs, currentProp, arg);
        }
    };
    for (let [i, arg] of args.entries()) {
        handleArg(arg);
    }
    return {
        ast: resultArgs,
        values: __parsedArgsToRawValues(resultArgs),
    };
}
//# sourceMappingURL=parseArgs.js.map