/**
 * @name            cursorToEnd
 * @namespace       js.dom.input
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Place the cursor to the end of the input
 *
 * @param 		{HTMLFormElement} 		$input 		The input to process
 *
 * @todo      tests
 *
 * @snippet         __cursorToEnd($1)
 *
 * @example 	js
 * import { __cursorToEnd } from '@lotsof/sugar/dom';
 * __cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
export default function __cursorToEnd(
  $input: HTMLTextAreaElement | HTMLInputElement,
): void {
  $input.focus();
  setTimeout(() => {
    let len = $input.value.length;
    if ($input.setSelectionRange) {
      $input.focus();
      $input.setSelectionRange(len, len);
      // @ts-ignore
    } else if ($input.createTextRange) {
      // @ts-ignore
      let t = $input.createTextRange();
      t.collapse(true);
      t.moveEnd('character', len);
      t.moveStart('character', len);
      t.select();
    }
  });
}
