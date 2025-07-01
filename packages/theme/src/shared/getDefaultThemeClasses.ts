import { __unique } from '@blackbyte/sugar/array';
import { TTheme } from './theme.type.js';

export default function __getDefaultThemeClasses(theme: TTheme): string[] {
  const defaultThemeClasses: string[] = [];
  for (let [parameterId, parameter] of Object.entries(theme.parameters)) {
    if (parameter.default) {
      defaultThemeClasses.push(parameter.default);
    }
  }
  return __unique(defaultThemeClasses).sort();
}
