/**
 * @name                isDdmmyyyyDate
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if is a valid dd.mm.yyyy date
 * This will match : dd.mm.yyyy | dd/mm/yyyy | dd-mm-yyyy | dd mm yyyy
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @todo      tests
 *
 * @snippet         __isDdmmyyyyDate($1)
 *
 * @example    js
 * import { __isDdmmyyyyDate } from '@lotsof/sugar/is'
 * if (__isDdmmyyyyDate('20.12.2018')) {
 *     // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isDdmmyyyyDate(date: string): boolean;
