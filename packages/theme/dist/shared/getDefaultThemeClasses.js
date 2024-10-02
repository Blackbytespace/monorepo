import { __unique } from '@lotsof/sugar/array';
export default function __getDefaultThemeClasses(theme) {
    const defaultThemeClasses = [];
    for (let [parameterId, parameter] of Object.entries(theme.parameters)) {
        if (parameter.default) {
            defaultThemeClasses.push(parameter.default);
        }
    }
    return __unique(defaultThemeClasses).sort();
}
//# sourceMappingURL=getDefaultThemeClasses.js.map