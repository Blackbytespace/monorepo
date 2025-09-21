import __generateThemeClassesCombinations from './generateThemeClassesCombinations.js';
import __getDefaultThemeClasses from './getDefaultThemeClasses.js';
import type {
  TTheme,
  TThemeCombinations,
  TThemeParameter,
  TThemePreviews,
  TThemeValues,
} from './theme.type.js';
import __themeValuesToClasses from './themeValuesToClasses.js';

export default class Theme {
  private _theme: TTheme;

  constructor(theme: TTheme) {
    this._theme = theme;
  }

  public get name(): string {
    return this._theme.name;
  }

  public get description(): string {
    return this._theme.description ?? '';
  }

  public get parameters(): TThemeParameter[] {
    return this._theme.parameters;
  }

  public get previews(): TThemePreviews | undefined {
    return this._theme.previews;
  }

  public get combinations(): TThemeCombinations | undefined {
    return this._theme.combinations;
  }

  public get values(): TThemeValues {
    return this._theme.values;
  }

  public getDefaultThemeClasses(): string[] {
    return __getDefaultThemeClasses(this._theme);
  }

  public generateThemeClassesCombinations(): string[] {
    return __generateThemeClassesCombinations(this._theme);
  }

  public themeValuesToClasses(themeValues: TTheme['values']): string {
    return __themeValuesToClasses(themeValues);
  }
}
