import __hashSum from 'hash-sum';
/**
 * @name            objectHash
 * @namespace       shared.object
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to get back an integrity hash passed object.
 *
 * @param           {any}            obj      The object to hash
 * @param           {IObjectHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @snippet             __objectHash($1)
 *
 * @todo    tests
 *
 * @example         js
 * import { __objectHash } from '@coffeekraken/sugar/object.js';
 * __objectHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/hash-sum
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function objectHash(obj) {
    return __hashSum(obj);
}
//# sourceMappingURL=objectHash.js.map