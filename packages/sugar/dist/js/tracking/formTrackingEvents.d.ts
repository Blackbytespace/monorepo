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
 * Each event has as data the form id "formId" and the language of the page "lang".
 * Here's the events dispatched thgouth the dataLayer:
 *
 * - `form.started`: When the form has been started to be filled
 * - `form.submitted`: When the form has been submitted
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
    enabled?: boolean;
};
export default function formTrackingEvents(settings?: Partial<TFormTrackingEventsSettings>): void;
