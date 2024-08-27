/**
 * @name                isImageUrl
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stabke
 *
 * Check if the passed string path is an image url
 *
 * @param                 {String}        string             The string to check
 * @return              {Boolean}           true if is an image url/path, false if not
 *
 * @todo      tests
 *
 * @snippet         __isImageUrl($1)
 *
 * @example               js
 * import { __isImageUrl } from '@lotsof/sugar/is';
 * __isImageUrl('something.jpg); // => true
 * __isImageUrl('other.pdf); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function (string: string): boolean;
