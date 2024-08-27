// @ts-nocheck

import __sprintf from 'sprintf-js';

/**
 * @name                printf
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * printf php equavalent
 *
 * @param 		{String} 						source 			The source in which to replace the tokens
 * @param 		{Mixed} 			values... 			  Any number of arguments to replace the placeholders in the string
 * @return 	{String} 										The resulting string
 *
 * @todo      tests
 *
 * @snippet         __printf($1)
 *
 * @example     js
 * import { __printf } from '@lotsof/sugar/string';
 * __printf('Hello %s', 'world'); // => Hello world
 * __printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * __printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __printf(...args): string {
  return __sprintf.sprintf.apply(null, args);
}
