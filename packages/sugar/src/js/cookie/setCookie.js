export default function __setCookie(name, value, settings = {}) {
    settings = Object.assign({ path: '/' }, settings);
    try {
        value = JSON.stringify(value);
    }
    catch (e) { }
    // @ts-ignore
    if (settings.expires instanceof Date) {
        settings.expires = settings.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in settings) {
        updatedCookie += '; ' + optionKey;
        let optionValue = settings[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
//# sourceMappingURL=setCookie.js.map