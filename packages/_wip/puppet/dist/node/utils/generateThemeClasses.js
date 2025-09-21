function generateClassCombinations(classNames) {
    const keys = Object.keys(classNames);
    const combinations = [];
    function combine(prefix, index) {
        if (index === keys.length) {
            if (prefix.trim()) {
                combinations.push(prefix.trim());
            }
            return;
        }
        const key = keys[index];
        const values = classNames[key];
        // Include combinations without the current key
        combine(prefix, index + 1);
        // Include combinations with each value of the current key
        values.forEach((value) => {
            combine(`${prefix} ${value}`, index + 1);
        });
    }
    combine('', 0);
    return combinations;
}
export default function generateThemeClasses(themeJson) {
    const classesByParameter = {};
    for (let [i, parameter] of themeJson.parameters.entries()) {
        if (!classesByParameter[parameter.id]) {
            classesByParameter[parameter.id] = [];
        }
        const sortedOptions = parameter.options
            .filter((o) => o.value)
            .map((o) => o.value)
            .sort();
        for (let [j, option] of sortedOptions.entries()) {
            classesByParameter[parameter.id].push(option);
        }
    }
    let allCombinations = generateClassCombinations(classesByParameter);
    // filter using the "valid" keys
    if (themeJson.valid) {
        allCombinations = allCombinations.filter((c) => {
            var _a, _b;
            const options = c.split(' '), paramId = options.shift();
            const validOptions = (_b = (_a = themeJson.valid) === null || _a === void 0 ? void 0 : _a[paramId]) !== null && _b !== void 0 ? _b : ['*'];
            if (validOptions.includes('*')) {
                return true;
            }
            return options.every((k) => validOptions.includes(k));
        });
    }
    return allCombinations;
}
//# sourceMappingURL=generateThemeClasses.js.map