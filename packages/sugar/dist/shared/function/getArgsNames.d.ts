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
 * import { __getArgsNames } from '@lotsof/sugar/function';
 * function hello(world, coco, plop) { }
 * __getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __getArgsNames(func: Function): string[];
