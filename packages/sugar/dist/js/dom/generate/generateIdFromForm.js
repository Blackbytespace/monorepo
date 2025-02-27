import { __md5 } from '@lotsof/sugar/crypto';
/**
 * @name            generateIfFromForm
 * @namespace       js.dom.generate
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function generate a uniqid based on the form element passed.
 * If the form has an action attribute, this will be used to generate the uniqid.
 * If not, the function will generate a uniqid based on the form attributes and named controls.
 * Note that the named controlls will be sorted before generating the uniqid.
 *
 * @param           {HTMLFormElement}          $form           The form element to generate the uniqid from
 * @return          {String}            A uniqid
 *
 * @todo      tests
 *
 * @snippet         __generateIdFromForm()
 *
 * @example         js
 * import { __generateIdFromForm } from '@lotsof/sugar/dom';
 * const id = __generateIdFromForm($myForm); // => a md5 hash id
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function generateIfFromForm($form) {
    let attrStr = '';
    if ($form.hasAttribute('action') && $form.getAttribute('action')) {
        attrStr = $form.getAttribute('action');
    }
    else {
        for (let [i, attr] of Array.from($form.attributes).entries()) {
            attrStr += attr.name + '' + attr.value;
        }
        const $namedControls = $form.querySelectorAll('[name]');
        const controlsNames = [];
        for (let [i, $namedControl] of $namedControls.entries()) {
            controlsNames.push($namedControl.getAttribute('name'));
        }
        const sortedControlsNames = controlsNames.sort();
        for (let [i, controlName] of sortedControlsNames.entries()) {
            attrStr += controlName;
        }
    }
    return `f${__md5.encrypt(attrStr)}`;
}
//# sourceMappingURL=generateIdFromForm.js.map