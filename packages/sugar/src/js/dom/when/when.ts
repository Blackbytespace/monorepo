// @ts-nocheck

import type { TWhenEntersViewportSettings } from '../when/whenEntersViewport.js';
import type { TWhenInteractSettings } from '../when/whenInteract.js';
import type { TWhenInViewportSettings } from '../when/whenInViewport.js';
import type { TWhenNearViewportSettings } from '../when/whenNearViewport.js';
import type { TWhenOutOfViewportSettings } from '../when/whenOutOfViewport.js';
import type { IWhenStyleSheetsReadySettings } from '../when/whenStylesheetsReady.js';
import type { TWhenVisibleSettings } from '../when/whenVisible.js';

import __whenAnimationEnd from '../when/whenAnimationEnd.js';
import __whenEntersViewport from '../when/whenEntersViewport.js';
import __whenInteract from '../when/whenInteract.js';
import __whenInViewport from '../when/whenInViewport.js';
import __whenNearViewport from '../when/whenNearViewport.js';
import __whenOutOfViewport from '../when/whenOutOfViewport.js';
import __whenStylesheetsReady from '../when/whenStylesheetsReady.js';
import __whenVisible from '../when/whenVisible.js';

/**
 * @name            when
 * @namespace       js.dom.detect
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function listen for passed `trigger(s)` on the passed `HTMLElement` and resolve the promise once one of them has reached his state.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {String|String[]}       trigger     The trigger(s) to listen on
 * @param       {TwhenSettings}      [settings={}]       Some settings like offset, etc...
 * @return      {SPromise<HTMLElement>}                 A promise resolved when all the triggers are fulfilled
 *
 * @setting         {Partial<TWhenInViewportSettings>}          [whenInViewport={}]            Some settings for the whenInViewport function
 * @setting         {Partial<TWhenNearViewportSettings>}        [whenNearViewport={}]           Some settings for the whenNearViewport function
 * @setting         {Partial<IWhenEntersViewportSettubgs>}      [whenEntersViewport={}]         Some settings for the whenEntersViewport function
 * @setting         {Partial<TWhenOutOfViewportSettings>}      [whenOutOfViewport={}]         Some settings for the whenOutOfViewport function
 * @setting         {Partial<TWhenInteractSettings>}      [whenInteract={}]         Some settings for the whenInteract function
 * @setting         {Partial<TWhenVisibleSettings>}      [whenVisible={}]         Some settings for the whenVisible function
 * @setting         {Partial<IWhenStyleSheetsReadySettings>}      [whenStylesheetsReady={}]         Some settings for the whenStylesheetsReady function
 *
 * @snippet         __when($1, $2, $3)
 * __when($1, $2).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example         js
 * import { __when } from '@lotsof/sugar/dom';
 * __when($elm, 'inViewport', {
 *    whenInViewport: {
 *       offset: 50
 *    }
 * }).then(() => {
 *      // do something
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TwhenSettings = {
  whenInViewport?: TWhenInViewportSettings;
  whenNearViewport?: TWhenNearViewportSettings;
  whenEntersViewport?: TWhenEntersViewportSettings;
  whenOutOfViewport?: TWhenOutOfViewportSettings;
  whenInteract?: TWhenInteractSettings;
  whenVisible?: TWhenVisibleSettings;
  whenStylesheetsReady?: IWhenStyleSheetsReadySettings;
};

export type TWhenTrigger<string> = (
  | 'direct'
  | 'directly'
  | 'inViewport'
  | 'nearViewport'
  | 'enterViewport'
  | 'outOfViewport'
  | 'interact'
  | 'visible'
  | 'domReady'
  | 'stylesheetsReady'
  | 'animationEnd'
)[];

export const WhenTriggers = [
  'direct',
  'directly',
  'inViewport',
  'nearViewport',
  'enterViewport',
  'outOfViewport',
  'interact',
  'visible',
  'stylesheetsReady',
  'domReady',
  'animationEnd',
];

export default function __when(
  $elm: HTMLElement,
  trigger: TWhenTrigger[],
  settings?: TwhenSettings,
): Promise<any> {
  const finalSettings: TwhenSettings = {
    whenInViewport: {},
    whenNearViewport: {},
    whenOutOfViewport: {},
    whenInteract: {},
    whenVisible: {},
    whenStylesheetsReady: {},
    ...(settings ?? {}),
  };

  return new Promise(async (resolve, reject) => {
    // ensure we work with an array of time(s)
    if (!Array.isArray(trigger))
      trigger = trigger.split(',').map((t) => t.trim());

    const promises: Promise = [];

    // adding watchers
    trigger.forEach((t) => {
      // timeout
      const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
      if (timeoutMatches && timeoutMatches[1]) {
        const timeout = parseInt(timeoutMatches[1]);
        const promise = new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
        promises.push(promise);
        return;
      }

      switch (t) {
        case 'inViewport':
          promises.push(__whenInViewport($elm, finalSettings.whenInViewport));
          break;
        case 'nearViewport':
          promises.push(
            __whenNearViewport($elm, finalSettings.whenNearViewport),
          );
          break;
        case 'entersViewport':
          promises.push(
            __whenEntersViewport($elm, finalSettings.whenEntersViewport),
          );
          break;
        case 'outOfViewport':
          promises.push(
            __whenOutOfViewport($elm, finalSettings.whenOutOfViewport),
          );
          break;
        case 'interact':
          promises.push(__whenInteract($elm, finalSettings.whenInteract));
          break;
        case 'visible':
          promises.push(
            __whenVisible($elm, {
              whenVisible: finalSettings.whenVisible,
              once: true,
            }),
          );
          break;
        case 'domReady':
          promises.push(__whenDomReady());
          break;
        case 'stylesheetsReady':
          promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
          break;
        case 'animationEnd':
          promises.push(__whenAnimationEnd($elm));
          break;
      }
    });

    // if no times setted, execute directly
    if (
      !trigger.length ||
      trigger.includes('direct') ||
      trigger.includes('directly')
    ) {
      resolve($elm);
      return;
    }

    // listen for at least 1 promise resolved
    await Promise.race(promises);

    resolve($elm);
  });
}
