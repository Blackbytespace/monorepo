/**
 * @name                getArgsNames
 * @namespace           shared.function
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              beta
 *
 * Get the arguments names of the passed function. Return an array of the arguments names
 *
 * @param             {Function}              func                  The function reference of which get the arguments names
 * @return            {Array}                                       An array of arguments names
 *
 * @todo        tests
 *
 * @snippet         __getArgsNames($1)
 *
 * @example         js
 * import { __getArgsNames } from '@blackbyte/sugar/function';
 * function hello(world, coco, plop) { }
 * __getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __getArgsNames(func: Function): string[] {
  // String representaation of the function code
  let str = func.toString();
  // Remove comments of the form /* ... */
  // Removing comments of the form //
  // Remove body of the function { ... }
  // removing '=>' if func is arrow function
  str = str
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/(.)*/g, '')
    .replace(/{[\s\S]*}/, '')
    .replace(/=>/g, '')
    .trim();

  // Start parameter names after first '('
  const start = str.indexOf('(') + 1;

  // End parameter names is just before last ')'
  const end = str.length - 1;

  const result = str.substring(start, end).split(', ');

  const params: string[] = [];

  result.forEach((element) => {
    // Removing any default value
    element = element.replace(/=[\s\S]*/g, '').trim();

    if (element.length > 0) params.push(element);
  });

  return params;
}
