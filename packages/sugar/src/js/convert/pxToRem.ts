/**
 * @name                    pxToRem
 * @namespace            js.convert
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      tests
 *
 * @snippet         __pxToRem($1)
 *
 * @example         js
 * import { __pxToRem } from '@blackbyte/sugar/convert';
 * __pxToRem(36);
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __pxToRem(px: number): number {
  return (
    px /
    parseFloat(getComputedStyle(document.documentElement).fontSize || '16px')
  );
}
