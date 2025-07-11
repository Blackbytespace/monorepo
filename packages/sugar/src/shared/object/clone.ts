import __clone from 'lodash.clone';
import __deepClone from 'lodash.clonedeep';

/**
 * @name                clone
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Object}       [settings={}]   Specify some settings to configure your clone process
 * @return      {Object}                      The cloned object
 *
 * @setting     {Boolean}       [deep=false]      Specify if you want to clone the object deeply
 *
 * @todo      tests
 *
 * @snippet         __clone($1)
 *
 * @example       js
 * import { __clone } from '@blackbyte/sugar/object';
 * __clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TCloneSettings = {
  deep?: boolean;
};

export default function clone(object: any, settings: TCloneSettings = {}): any {
  settings = {
    deep: false,
    ...settings,
  };
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
