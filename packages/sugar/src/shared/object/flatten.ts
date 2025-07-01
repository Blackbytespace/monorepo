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
 * import { __flatten } from '@blackbyte/sugar/object';
 * __flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TFlattenSettings = {
  separator: string;
  prefix: string;
};

export default function __flatten(
  obj,
  settings?: Partial<TFlattenSettings>,
): Record<string, any> {
  const finalSettings: TFlattenSettings = {
    separator: '.',
    prefix: '',
    ...(settings ?? {}),
  };
  return Object.keys(obj).reduce((acc, k) => {
    const pre = finalSettings.prefix.length
      ? finalSettings.prefix + finalSettings.separator
      : '';
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(
        acc,
        __flatten(obj[k], {
          ...finalSettings,
          prefix: pre + k,
        }),
      );
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}
