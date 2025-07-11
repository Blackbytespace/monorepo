/**
 * @name                        isNode
 * @namespace                   shared.is
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      tests
 *
 * @snippet         __isNode()
 *
 * @example               js
 * import { __isNode } from '@blackbyte/sugar/is';
 * __isNode(); // => true
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isNode(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.release &&
    process.release.name === 'node'
  );
}
