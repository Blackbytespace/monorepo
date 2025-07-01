import { minimatch as __minimatch } from 'minimatch';
import __deepize from './deepize.js';
import __flatten from './flatten.js';

/**
 * @name                        getGlob
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @setting         {Boolean}               [deepize=true]          Specify if you want the result object to be deepized using the ```deepize``` sugar function
 *
 * @todo      tests
 *
 * @snippet         __getGlob($1, $2)
 *
 * @example             js
 * import { __getGlob } from '@blackbyte/sugar/object';
 * __getGlob({
 *  hello: {
 *     world: true,
 *     plop: false
 * }, 'hello.*');
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TGetGlobSettings = {
  deepize?: boolean;
};

export default function __getGlob(
  obj: any,
  glob: string,
  settings: TGetGlobSettings = {},
): any {
  settings = {
    deepize: true,
    ...settings,
  };

  const flat = __flatten(obj);

  const resultObj = {};

  Object.keys(flat).forEach((path) => {
    if (__minimatch(path, glob)) {
      resultObj[path] = flat[path];
    }
  });

  if (settings.deepize === true) return __deepize(resultObj);
  return resultObj;
}
