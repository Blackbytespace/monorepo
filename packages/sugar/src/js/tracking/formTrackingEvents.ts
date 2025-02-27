import { __generateIdFromForm, __querySelectorLive } from '@lotsof/sugar/dom';

/**
 * @name            formTrackingEvents
 * @namespace       js.tracking
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to automatically track some events on your forms like the start of the form filling,
 * the form submission, etc...
 * Here's the events dispatched thgouth the dataLayer:
 *
 * - `form.{formId}.started`: When the form has been started to be filled
 * - `form.{formId}.{lang}.started`: When the form has been started to be filled in a specific language
 * - `form.{formId}.submitted`: When the form has been submitted
 * - `form.{formId}.{lang}.submitted`: When the form has been submitted in a specific language
 *
 * @setting           {Boolean}         [lang=true]         Specify if you want to emit the language specific events
 * @setting           {Boolean}         [debug=false]       Specify if you want to log some debug informations
 * @setting           {Boolean}         [simplifyLang=true]       Specify if you want to simplify the lang attribute to only the first part like `en` instead of `en-US`
 *
 * @todo      tests
 *
 * @snippet         __formTrackingEvents($1)
 *
 * @example         js
 * import { __formTrackingEvents } from '@lotsof/sugar/tracking';
 * __formTrackingEvents();
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TFormTrackingEventsSettings = {
  lang?: boolean;
  simplifyLang?: boolean;
  debug?: boolean;
};

export default function formTrackingEvents(
  settings?: Partial<TFormTrackingEventsSettings>,
): void {
  const finalSettings: TFormTrackingEventsSettings = {
    lang: true,
    debug: false,
    simplifyLang: true,
    ...(settings || {}),
  };

  // @ts-ignore
  const dataLayer = window.dataLayer || [];

  const _log = (msg: string) => {
    if (!finalSettings.debug) return;
    console.info(`[FormTrackingEvents]: ${msg}`);
  };

  // get each forms in the page
  __querySelectorLive('form', ($form) => {
    // check if the form have an id or not
    // if not, create one based on the form attributes
    if (!$form.id) {
      const formId = __generateIdFromForm($form as HTMLFormElement);
      $form.setAttribute('id', formId);
    }

    // get the language of the page
    let lang = document.documentElement.lang?.toLowerCase();
    if (finalSettings.simplifyLang) {
      lang = lang.split('-')[0];
    }

    // util log for SEO
    _log(`${$form.id} found`);

    // add event listener to the form
    // to track the form submission
    $form.addEventListener('submit', function () {
      if (($form as HTMLFormElement).checkValidity() === false) {
        return;
      }
      if ($form.hasAttribute('submitted')) {
        return;
      }
      $form.setAttribute('submitted', 'true');
      dataLayer?.push({ event: `form.${$form.id}.submitted` });
      _log(`event: form.${$form.id}.submitted`);
      if (finalSettings.lang && lang) {
        dataLayer?.push({ event: `form.${$form.id}.${lang}.submitted` });
        _log(`event: form.${$form.id}.${lang}.submitted`);
      }
    });

    // check the form controls to track the form start
    const $formControls = $form.querySelectorAll('input, select, textarea');
    for (let [i, $formControl] of $formControls.entries()) {
      $formControl.addEventListener('keypress', function () {
        if ($form.hasAttribute('started')) {
          return;
        }
        $form.setAttribute('started', 'true');
        dataLayer?.push({ event: `form.${$form.id}.started` });
        _log(`event: form.${$form.id}.started`);
        if (finalSettings.lang && lang) {
          dataLayer?.push({ event: `form.${$form.id}.${lang}.started` });
          _log(`event: form.${$form.id}.${lang}.started`);
        }
      });
    }
  });
}
