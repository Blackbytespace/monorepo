/**
 * @name                isCreditCard
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid credit card number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         __isCreditCard($1)
 *
 * @example 	js
 * import {__isCreditCard } from '@lotsof/sugar/is';
 * __isCreditCard('john.doe@gmail.com') => true
 * __isCreditCard('plop@yop.com') => true
 * __isCreditCard('hello') => false
 * __isCreditCard('378282246310006') => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isCreditCard(value: string): boolean;
