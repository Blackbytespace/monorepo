import { __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';
import __parsedArgsToRawValues from './parsedArgsToRawValues.js';
export default function parseArgs(args, schema = [], settings) {
    var _a;
    const finalSettings = Object.assign({ separator: ['comma'], resolve: true, debug: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (!finalSettings.separator.length) {
        finalSettings.separator = ['comma'];
    }
    const separators = Array.isArray(finalSettings.separator)
        ? finalSettings.separator
        : [finalSettings.separator];
    const resultArgs = {};
    let dashedArg;
    let argId = 0, currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
    const handleArg = (arg) => {
        var _a, _b;
        if (finalSettings.debug) {
            console.log('arg:', arg);
        }
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
            if (finalSettings.debug) {
                console.log('separator', arg, argId);
            }
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
                    // set the resulting value
                    __set(resultArgs, currentProp, arg);
                }
                break;
            default:
                if (finalSettings.debug) {
                    console.log('h', currentProp, arg);
                }
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