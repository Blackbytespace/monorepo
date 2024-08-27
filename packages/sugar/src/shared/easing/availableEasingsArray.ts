/**
 * @name                availableEasingsArray
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply return back an array of all the available easings function in the sugar toolkit
 *
 * @return      {Array}             An array of all the easing functions available
 *
 * @snippet         __availableEasingsArray()
 *
 * @example         js
 * import { __availableEasingsArray } from '@lotsof/sugar/easing';
 * __availableEasingsArray();
 *
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __availableEasingsArray(): string[] {
  return [
    'easeInOutCubic',
    'easeInOutQuad',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInCubic',
    'easeInQuad',
    'easeInQuart',
    'easeInQuint',
    'easeOutCubic',
    'easeOutQuad',
    'easeOutQuart',
    'easeOutQuint',
  ];
}
