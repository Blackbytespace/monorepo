/**
 * @name            getCookie
 * @namespace       js.cookie
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a cookie value
 *
 * @param       {String}            name            The cookie name to get
 * @return      {any}                               The cookie value
 *
 * @snippet         __getCookie($1)
 *
 * @todo            tests
 *
 * @example         js
 * import { __getCookie } from '@blackbyte/sugar/cookie';
 * __getCookie('myCookie');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __getCookie(name: string): any {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );

  let value;

  if (matches?.[1]) {
    value = decodeURIComponent(matches[1]);

    try {
      value = JSON.parse(value);
    } catch (e) {}
  }

  return value;
}
