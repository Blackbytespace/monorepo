export default function toRem(astToken) {
    var _a, _b, _c, _d;
    let finalValue = astToken;
    // handle simple number
    if (typeof finalValue === 'number') {
        return (finalValue * 0.0625);
    }
    // cases where we don't need to convert to rem
    const isSimpleNumber = typeof finalValue === 'number', isRemValue = ((_a = finalValue.value) === null || _a === void 0 ? void 0 : _a.unit) === 'rem', isNumberToken = finalValue.type === 'token' && ((_b = finalValue.value) === null || _b === void 0 ? void 0 : _b.type) === 'number';
    if (isSimpleNumber || isRemValue || isNumberToken) {
        return finalValue;
    }
    // handle value 0
    if (((_c = finalValue.value) === null || _c === void 0 ? void 0 : _c.value) === 0) {
        finalValue.type = 'length';
        finalValue.value = {
            unit: 'rem',
            value: 0,
        };
        return finalValue;
    }
    // px values
    if (finalValue.type === 'length' && ((_d = finalValue.value) === null || _d === void 0 ? void 0 : _d.unit) === 'px') {
        finalValue.value.unit = 'rem';
        finalValue.value.value *= 0.0625;
        return finalValue;
    }
    // return the final value that has not been modified
    return finalValue;
}
//# sourceMappingURL=toRem.js.map