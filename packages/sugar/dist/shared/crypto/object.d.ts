/**
 * @name                object
 * @namespace           shared.crypto
 * @type                Object
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @snippet         __object.encrypt($1)
 *
 * @example         js
 * import { __object } from '@lotsof/sugar/crypto';
 * __object.encrypt({
 *      hello: 'world'
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.io)
 */
declare const _default: {
    encrypt: (object: any, salt?: string) => string;
    decrypt: (encodedObject: string, salt?: string) => any;
};
export default _default;
