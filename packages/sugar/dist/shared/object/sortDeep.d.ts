/**
 * @name                                sortDeep
 * @namespace                           shared.object
 * @type                                Function
 * @platform                            js
 * @platform                            node
 * @status                              stable
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      tests
 *
 * @snippet         __sortDeep($1, $2)
 * __sortDeep($1, (a, b) => {
 *      $2
 * })
 *
 * @example               js
 * import { __sortDeep } from '@lotsof/sugar/object';
 * __sortDeep({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __sortDeep(object: any, sort: (a: {
    key: string;
    value: any;
}, b: {
    key: string;
    value: any;
}) => number): any;
