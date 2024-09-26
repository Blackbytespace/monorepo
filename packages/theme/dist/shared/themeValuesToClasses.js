export default function themeValuesToClasses(themeValues) {
    let str = [];
    for (let [key, parameter] of Object.entries(themeValues !== null && themeValues !== void 0 ? themeValues : {})) {
        str.push(`-${parameter.value}`);
    }
    return str.join(' ');
}
//# sourceMappingURL=themeValuesToClasses.js.map