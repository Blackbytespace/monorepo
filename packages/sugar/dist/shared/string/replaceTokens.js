function replaceTokens(string, argsObj, settings = {}) {
    var _a;
    settings = Object.assign({ regexp: '\\[([a-zA-Z0-9-_]+)\\]', stripUndefined: true }, settings);
    let tokens;
    const reg = new RegExp((_a = settings.regexp) !== null && _a !== void 0 ? _a : '\\[([a-zA-Z0-9-_]+)\\]', 'g');
    while ((tokens = reg.exec(string))) {
        if (argsObj[tokens[1]] === undefined && !settings.stripUndefined)
            return '';
        string = string.replace(tokens[0], argsObj[tokens[1]] || '');
    }
    return string;
}
export default replaceTokens;
//# sourceMappingURL=replaceTokens.js.map