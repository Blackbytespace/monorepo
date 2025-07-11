/**
 * @name            getFormValues
 * @namespace       js.dom.form
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function take a form element and return an object with all the values
 *
 * @param       {HTMLFormElement}      $form       The form element to get the values from
 * @return      {Object}                          An object with all the values
 *
 * @todo      tests
 *
 * @snippet         __getFormValues($1)
 *
 * @example  	js
 * import { __getFormValues } from '@blackbyte/sugar/dom'
 * const values = __getFormValues(myForm);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __getFormValues($form: HTMLFormElement): any {
  const formData = new FormData($form);
  return Object.fromEntries(formData);
}
