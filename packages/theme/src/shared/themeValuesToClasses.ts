import { TThemeValues } from './theme.type.js';

export default function themeValuesToClasses(
  themeValues: TThemeValues,
): string {
  let str: string[] = [];
  for (let [key, parameter] of Object.entries(themeValues ?? {})) {
    if ((<any>parameter).value) {
      str.push(`-${(<any>parameter).value}`);
    }
  }
  return str.join(' ');
}
