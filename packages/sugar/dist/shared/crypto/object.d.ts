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
 * @snippet         object.encrypt($1)
 *
 * @example         js
 * import { object } from '@blackbyte/sugar/crypto';
 * object.encrypt({
 *      hello: 'world'
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
 */
declare const _default: {
    encrypt: (object: any, salt?: string) => string;
    decrypt: (encodedObject: string, salt?: string) => any;
};
export default _default;
