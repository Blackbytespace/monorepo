/**
 * @name            pickSome
 * @namespace       shared.array
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This returns you one or more random item of the passed array
 *
 * @param       {Any[]}         array          The array in which you want to pick a random item
 * @param       {Number}       [$min=1]        The minimum number of items to pick
 * @param       {Number}       [$max=null]        The maximum number of items to pick
 * @return      {Any}                         The random array item(s)
 *
 * @snippet         __pickSome($1,$2,$3);
 *
 * @example         ts
 * import { __pickSome } from '@blackbyte/sugar/array':
 * __pickSome(['hello','world','test'], 1, 2);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __pickSome(
  array: any[],
  min: number = 1,
  max?: number,
) {
  if (!max) {
    max = array.length;
  }
  const availableIdx: number[] = [];
  for (let i = 0; i < array.length; i++) {
    availableIdx.push(i);
  }
  const picked: any[] = [];
  while (true) {
    if (picked.length >= max) {
      break;
    }
    if (picked.length >= min && Math.round(Math.random())) {
      break;
    }
    const idx = Math.floor(Math.random() * availableIdx.length);
    picked.push(array[availableIdx[idx]]);
    availableIdx.splice(idx, 1);
    if (availableIdx.length === 0) {
      break;
    }
  }
  return picked;
}
