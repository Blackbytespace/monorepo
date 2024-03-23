import __md5 from '../crypto/md5.js';
/**
 * @name                gravatarUrl
 * @namespace           shared.url
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @todo      tests
 *
 * @snippet         __gravatarUrl($1)
 *
 * @example       js
 * import { __gravatarUrl } from '@coffeekraken/sugar/url.js';
 * __gravatarUrl('olivier.bossel@gmail.com'); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __gravatarUrl(email, size = 200) {
    return `https://www.gravatar.com/avatar/${__md5.encrypt(email)}?s=${size}`;
}
//# sourceMappingURL=gravatarUrl.js.map