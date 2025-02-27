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
export default function formTrackingEvents(settings?: Partial<TFormTrackingEventsSettings>): void;
