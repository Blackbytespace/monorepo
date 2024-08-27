// @ts-nocheck
import { __isPlainObject } from '@lotsof/sugar/is';
export default function parsedArgsToRawValues(args) {
    const rawValues = {};
    for (let [key, value] of Object.entries(args)) {
        if (__isPlainObject(value)) {
            if (value.rawValue !== undefined) {
                rawValues[key] = value.rawValue;
                delete value.rawValue;
                if (__isPlainObject(rawValues[key])) {
                    rawValues[key] = parsedArgsToRawValues(rawValues[key]);
                }
            }
            else {
                rawValues[key] = parsedArgsToRawValues(value);
            }
        }
    }
    return rawValues;
}
//# sourceMappingURL=parsedArgsToRawValues.js.map