import __uniqid from '../../string/uniqid.js';

/**
 * @name            whenVisible
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element is visible
 *
 * @snippet         __whenVisible($1)
 * __whenVisible($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenVisible } from '@lotsof/sugar/dom'
 * __whenVisible(myCoolHTMLElement).then(($elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TWhenVisibleSettings = {
  whenVisible?: Function;
  whenInvisible?: Function;
  once: boolean;
};

const _whenVisibleStatuses = new WeakMap();

export default function __whenVisible(
  $elm: HTMLElement,
  settings?: Partial<TWhenVisibleSettings>,
): Promise<HTMLElement> {
  let observer: IntersectionObserver;

  const pro = new Promise((resolve, reject) => {
    const finalSettings: TWhenVisibleSettings = {
      whenVisible: undefined,
      whenInvisible: undefined,
      once: true,
      ...(settings ?? {}),
    };

    const statuses = _whenVisibleStatuses.get($elm) ?? {};
    _whenVisibleStatuses.set($elm, statuses);

    // generate a uniqid for this listener
    const id = __uniqid();

    observer = new IntersectionObserver(function (entries) {
      if (entries[0]['intersectionRatio'] == 0) {
        // prevent from triggering multiple times the callback
        // for this listener if already invisible
        if (!statuses[id]) {
          return;
        }

        // set the listener status on the element
        statuses[id] = false;

        // process callbacks
        finalSettings.whenInvisible?.($elm);
      } else {
        // "once" settings support
        if (finalSettings.once) {
          observer.disconnect();
        }

        // prevent from triggering multiple times the callback
        // for this listener if already visible
        if (statuses[id]) {
          return;
        }

        // set the listener status on the element
        statuses[id] = true;

        // process callbacks
        finalSettings.whenVisible?.($elm);

        // resolve the promise only if the "once"
        // setting is true
        if (finalSettings.once) {
          resolve($elm);
        }
      }
    });

    observer.observe($elm);
  });

  pro.finally(() => {
    observer?.disconnect();
  });

  return pro as Promise<HTMLElement>;
}
