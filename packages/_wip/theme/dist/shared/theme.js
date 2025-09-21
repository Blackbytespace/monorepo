import __generateThemeClassesCombinations from './generateThemeClassesCombinations.js';
import __getDefaultThemeClasses from './getDefaultThemeClasses.js';
import __themeValuesToClasses from './themeValuesToClasses.js';
export default class Theme {
    constructor(theme) {
        this._theme = theme;
    }
    get name() {
        return this._theme.name;
    }
    get description() {
        var _a;
        return (_a = this._theme.description) !== null && _a !== void 0 ? _a : '';
    }
    get parameters() {
        return this._theme.parameters;
    }
    get previews() {
        return this._theme.previews;
    }
    get combinations() {
        return this._theme.combinations;
    }
    get values() {
        return this._theme.values;
    }
    getDefaultThemeClasses() {
        return __getDefaultThemeClasses(this._theme);
    }
    generateThemeClassesCombinations() {
        return __generateThemeClassesCombinations(this._theme);
    }
    themeValuesToClasses(themeValues) {
        return __themeValuesToClasses(themeValues);
    }
}
//# sourceMappingURL=theme.js.map