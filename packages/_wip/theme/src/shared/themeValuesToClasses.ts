import { TThemeValues } from './theme.type.js';

export default function themeValuesToClasses(
  themeValues: TThemeValues,
): string {
  let str: string[] = [];
  for (let [parameter, value] of Object.entries(themeValues ?? {})) {
    if (value) {
      str.push(`-${value}`);
    }
  }
  return str.join(' ');
}
