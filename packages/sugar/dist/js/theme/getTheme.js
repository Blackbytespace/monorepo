import { __getCookie } from '@lotsof/sugar/cookie';
export default function getTheme(defaultTheme, settings) {
    var _a;
    const finalSettings = Object.assign({ cookieName: 'theme' }, (settings !== null && settings !== void 0 ? settings : {}));
    return (_a = __getCookie(finalSettings.cookieName)) !== null && _a !== void 0 ? _a : defaultTheme;
}
//# sourceMappingURL=getTheme.js.map