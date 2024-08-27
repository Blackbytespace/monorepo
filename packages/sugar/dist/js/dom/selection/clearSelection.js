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
 * import { __clearSelection } from '@lotsof/sugar/dom';
 * __clearSelection();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __clearSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel === null || sel === void 0 ? void 0 : sel.empty) {
            sel.empty();
        }
        else if (sel === null || sel === void 0 ? void 0 : sel.removeAllRanges) {
            sel.removeAllRanges();
        }
    }
    else if (document.selection) {
        document.selection.empty();
    }
}
//# sourceMappingURL=clearSelection.js.map