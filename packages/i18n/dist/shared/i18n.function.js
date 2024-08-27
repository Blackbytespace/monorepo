var _a;
import { __get } from '@lotsof/sugar/object';
/**
 * @name            i18n
 * @namespace       shared
 * @type            Function
 * @status          beta
 * @platform        node
 * @platform        js
 *
 * This function is the one to use to set retreive a translated string.
 * It support tokens and pluralization as well.
 *
 * @example         js          Simple example
 * import { __i18n } from '@coffeekraken/s-i18n';
 * __i18n('Hello world', {
 *      id: 'myApp.hello'
 * });
 *
 * @example         js          With some tokens
 * import { __i18n } from '@coffeekraken/s-i18n';
 * __i18n('Hello %s, how\'s %t?', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 'James',
 *          t: 'Jane
 *      }
 * });
 *
 * @example         js          Simple pluralization
 * import { __i18n } from '@coffeekraken/s-i18n';
 * __i18n('I have seen %s bird__(s)__', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 1
 *      }
 * }); // I have seen 1 bird
 *
 * __i18n('I have seen %s bird__(s)__', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 10
 *      }
 * }); // I have seen 10 birds
 *
 * @example         js          Different words/sentences
 * import { __i18n } from '@coffeekraken/s-i18n';
 * __i18n('I like to eat %s __(banana|oranges)__ for lunch', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 1
 *      }
 * }); I like to eat 1 banana for lunch
 *
 * __i18n('I like to eat %s __(banana|oranges)__ for lunch', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 10
 *      }
 * }); // I like to eat 10 oranges for lunch
 *
 * @example         js          With specific token
 * import { __i18n } from '@coffeekraken/s-i18n';
 * __i18n('I like to eat %s __(%t|banana|oranges)__ and %t __(%s|fruit|kiwis)__', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 1,
 *          t: 10
 *      }
 * }); I like to eat 1 oranges and 10 fruit
 *
 * __i18n('I like to eat %s __(%t|banana|oranges)__ and %t __(%s|fruit|kiwis)__', {
 *      id: 'myApp.hello',
 *      tokens: {
 *          s: 10,
 *          t: 1
 *      }
 * }); I like to eat 10 banana and 1 kiwis
 *
 * @todo            tests
 *
 * @since       1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
// make sure the process.env.I18N is set
if (!((_a = window.process) === null || _a === void 0 ? void 0 : _a.env)) {
    window.process = {
        env: {
            I18N: {},
        },
    };
}
else if (!window.process.env.I18N) {
    window.process.env.I18N = {};
}
export default function __i18n(str, settings) {
    var _a, _b, _c, _d;
    const finalSettings = Object.assign({ tokens: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    const i18n = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.I18N) !== null && _b !== void 0 ? _b : {};
    // get the correct translation
    let translation;
    if (finalSettings.id) {
        translation = (_c = i18n[finalSettings.id]) !== null && _c !== void 0 ? _c : __get(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = (_d = i18n[str]) !== null && _d !== void 0 ? _d : str;
    }
    // store missing translations
    if (!i18n[str]) {
        if (!i18n._missing) {
            i18n._missing = {};
        }
        i18n._missing[str] = str;
    }
    // get all the tokens in the translation
    const tokens = ` ${translation} `.match(/(__\([^__\)]*\)__|(?!\|)%[a-zA-Z0-9])/gm);
    // if no tokens, return the translation directly
    if (!tokens) {
        return translation;
    }
    function getTokenValue(t) {
        var _a, _b;
        return ((_b = (_a = finalSettings.tokens[t]) !== null && _a !== void 0 ? _a : finalSettings.tokens[t.replace(/^%/, '')]) !== null && _b !== void 0 ? _b : t);
    }
    let currentToken;
    tokens.forEach((token) => {
        var _a;
        if (token.match(/^%/)) {
            currentToken = token;
            const tokenValue = getTokenValue(token);
            translation = translation.replaceAll(new RegExp(`([^\(])?${token}`, 'g'), `$1${tokenValue}`);
        }
        else {
            // pluralize token
            const tokenMatch = token.match(/\|(%[a-zA-Z0-9]+)\)__/), activeToken = (_a = tokenMatch === null || tokenMatch === void 0 ? void 0 : tokenMatch[1]) !== null && _a !== void 0 ? _a : currentToken, tokenValue = getTokenValue(activeToken);
            if (typeof tokenValue !== 'number') {
                translation = translation.replace(token, `**(invalid token "${activeToken}" for pluralization)**`);
                return;
            }
            // trick to keep "\|" string
            token = token.replace(/\\\|/gm, '_$_');
            let parts = token.split(/\|/gm);
            parts = parts.map((p) => {
                return p
                    .replace(/_\$_/gm, '|')
                    .replace(/^__\(/, '')
                    .replace(/\)__$/, '');
            });
            // take | back in the token
            token = token.replace(/_\$_/gm, '\\|');
            if (parts.length === 1) {
                // item__(s)__
                translation = translation.replace(token, tokenValue > 1 ? parts[0] : '');
            }
            else if (parts.length === 2 && parts[0].match(/^%[a-zA-Z0-9]+/)) {
                // item__(s|%s)__
                translation = translation.replace(token, tokenValue > 1 ? parts[1] : '');
            }
            else if (parts.length === 2 && !parts[0].match(/^%[a-zA-Z0-9]+/)) {
                // __(item|items)__
                translation = translation.replace(token, tokenValue > 1 ? parts[1] : parts[0]);
            }
            else if (parts.length === 3) {
                // __(%s|item|items)
                translation = translation.replace(token, tokenValue > 1 ? parts[2] : parts[1]);
            }
        }
    });
    return translation;
}
//# sourceMappingURL=i18n.function.js.map