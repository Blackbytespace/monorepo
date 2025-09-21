import type { TTheme, TThemeCombinations, TThemeParameter, TThemePreviews, TThemeValues } from './theme.type.js';
export default class Theme {
    private _theme;
    constructor(theme: TTheme);
    get name(): string;
    get description(): string;
    get parameters(): TThemeParameter[];
    get previews(): TThemePreviews | undefined;
    get combinations(): TThemeCombinations | undefined;
    get values(): TThemeValues;
    getDefaultThemeClasses(): string[];
    generateThemeClassesCombinations(): string[];
    themeValuesToClasses(themeValues: TTheme['values']): string;
}
