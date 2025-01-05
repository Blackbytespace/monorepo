import __getTheme from './getTheme.js';
import __setTheme from './setTheme.js';
export default function setTheme(defaultTheme, settings) {
    const finalSettings = Object.assign({ cookieName: 'theme' }, (settings !== null && settings !== void 0 ? settings : {}));
    const theme = __getTheme(defaultTheme, finalSettings);
    __setTheme(theme);
}
//# sourceMappingURL=restoreTheme.js.map