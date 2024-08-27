export default function toString(value, settings) {
    var _a;
    const finalSettings = Object.assign({ numberFixed: 3 }, (settings !== null && settings !== void 0 ? settings : {}));
    const parts = [];
    switch (value.type.toLowerCase()) {
        case 'token':
            return toString(value.value);
            break;
        case 'number':
            return `${value.value.toFixed(finalSettings.numberFixed)}${(_a = value.unit) !== null && _a !== void 0 ? _a : ''}`;
            break;
        case 'comma':
            parts.push(',');
            break;
        case 'function':
            parts.push(`${value.value.name}(`);
            for (let arg of value.value.arguments) {
                parts.push(toString(arg));
            }
            parts.push(')');
            break;
    }
    return parts.join('');
}
//# sourceMappingURL=toString.js.map