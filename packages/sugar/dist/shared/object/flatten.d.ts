/**
 * @name                        flatten
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
 * @return              {Object}                                                    The flatten object
 *
 * @setting               {String}            [separation="."]          The separation character to use for preperty names
 * @setting               {String}            [prefix=""]               A prefix to add to the property names
 *
 * @todo      tests
 *
 * @snippet         __flatten($1)
 *
 * @example             js
 * import { __flatten } from '@lotsof/sugar/object';
 * __flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TFlattenSettings = {
    separator: string;
    prefix: string;
};
export default function __flatten(obj: any, settings?: Partial<TFlattenSettings>): Record<string, any>;
