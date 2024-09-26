import type { TTheme } from './theme.type.js';
export default class Theme {
    private _theme;
    constructor(theme: TTheme);
    get name(): string;
    get description(): string;
    get parameters(): TTheme['parameters'];
    get previews(): TTheme['previews'];
    get combinations(): TTheme['combinations'];
    get values(): TTheme['values'];
    getDefaultThemeClasses(): string[];
    generateThemeClassesCombinations(): string[];
    themeValuesToClasses(themeValues: TTheme['values']): string;
}
