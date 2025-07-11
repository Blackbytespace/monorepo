/**
 * @name                clearSelection
 * @namespace           js.dom.selection
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Clear the current selection in the DOM even in inputs, etc...
 **
 * @snippet         __clearSelection()
 *
 * @todo        tests
 *
 * @example       js
 * import { __clearSelection } from '@blackbyte/sugar/dom';
 * __clearSelection();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __clearSelection(): void {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel?.empty) {
      sel.empty();
    } else if (sel?.removeAllRanges) {
      sel.removeAllRanges();
    }
  } else if ((<any>document).selection) {
    (<any>document).selection.empty();
  }
}
