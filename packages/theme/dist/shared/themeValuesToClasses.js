export default function themeValuesToClasses(themeValues) {
    let str = [];
    for (let [parameter, value] of Object.entries(themeValues !== null && themeValues !== void 0 ? themeValues : {})) {
        if (value) {
            str.push(`-${value}`);
        }
    }
    return str.join(' ');
}
//# sourceMappingURL=themeValuesToClasses.js.map