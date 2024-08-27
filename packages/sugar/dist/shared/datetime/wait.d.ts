/**
 * @name            wait
 * @namespace       shared.datetime
 * @type            Function
 * @platform        js
 * @platform        node
 * @async
 * @status          stable
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to wait in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @todo      tests
 *
 * @snippet         __wait($1)
 * await __wait($1)
 *
 * @example       js
 * import { __wait } from '@lotsof/sugar/datetime';
 * await __wait(2000);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __wait(timeout?: number): Promise<void>;
