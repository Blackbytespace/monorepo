import { randomUUID } from 'crypto';

/**
 * @name            uniqid
 * @namespace       node.string
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @todo      tests
 *
 * @snippet         __uniqid()
 *
 * @example       js
 * import { __uniqid } from '@coffeekraken/sugar/string.js';
 * console.log(__uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://geshan.com.np/blog/2022/01/nodejs-uuid/
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __uniqid(): string {
  return `s-${randomUUID()}`;
}
