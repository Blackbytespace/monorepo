import __mapToObj from '../convert/mapToObject.js';
import __isArray from '../is/isArray.js';
import __isBoolean from '../is/isBoolean.js';
import __isFunction from '../is/isFunction.js';
import __isJson from '../is/isJson.js';
import __isMap from '../is/isMap.js';
import __isObject from '../is/isObject.js';
import __deepMap from '../object/deepMap.js';
import __deepMerge from '../object/deepMerge.js';
// import { highlight as __cliHighlight } from 'cli-highlight';
import { decycle } from 'json-cyclic';

// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';

/**
 * @name        toString
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (true) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * - highlight (true) {Boolean}: Specify if you want to color highlight the output like objects, arrays, etc...
 * - theme ({}) {Object}: The theme to use to colorize the output. See https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
 * @return    {String}    The resulting string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __toString($1)
 *
 * @example    js
 * import { __toString } from '@coffeekraken/sugar/string'
 * __toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function fn(value, settings = {}) {
  settings = __deepMerge({}, settings);

  // string
  if (typeof value === 'string') return value;
  // null
  if (value === null) return null;
  // undefined
  if (value === undefined) return undefined;
  // error
  if (value instanceof Error) {
    const errorStr = value.toString();
    return errorStr;
  }

  // Map
  if (__isMap(value)) {
    value = __mapToObj(value);
  }

  // JSON
  if (__isObject(value) || __isArray(value) || __isJson(value)) {
    try {
      value = decycle(value);
    } catch (e) {}

    value = __deepMap(value, ({ value }) => {
      if (value instanceof Map) return __mapToObj(value);
      return value;
    });

    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\uFFFF/g, '\\"');
    if (settings.highlight) {
      // prettyString = __cliHighlight(prettyString, {
      //   language: 'js',
      //   theme: settings.theme
      // });
    }
    return prettyString;
  }
  // boolean
  if (__isBoolean(value)) {
    if (value) return 'true';
    else return 'false';
  }
  // function
  if (__isFunction(value)) {
    return '' + value;
  }
  // stringify
  let returnString = '';
  try {
    value = decycle(value);
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e) {
      returnString = value;
    }
  }
  return returnString;
}
export default fn;
