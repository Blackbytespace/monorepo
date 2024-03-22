import __deepMerge from '../object/deepMerge';
function replaceTokens(string, argsObj, settings = {}) {
    settings = __deepMerge({
        regexp: '\\[([a-zA-Z0-9-_]+)\\]',
        stripUndefined: true,
    }, settings);
    let tokens;
    const reg = new RegExp(settings.regexp, 'g');
    while ((tokens = reg.exec(string))) {
        if (argsObj[tokens[1]] === undefined && !settings.stripUndefined)
            return;
        string = string.replace(tokens[0], argsObj[tokens[1]] || '');
    }
    return string;
}
export default replaceTokens;
//# sourceMappingURL=replaceTokens.js.map