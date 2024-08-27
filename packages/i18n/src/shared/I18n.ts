/**
 * @name                I18n
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class allows you to handle translations (i18n) easily and elegantly.
 * It works in node as well as in the browser.
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      implement the load and set methods
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __I18n()
 * const i18n = new __I18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @example             js
 * import __I18n from '@lotsof/i18n';
 * const i18n = new __I18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @since           1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export type TI18nSettings = {};

export default class I18n {
  /**
   * @name            settings
   * @type           T18nSettings
   *
   * Store the settings
   *
   * @since      1.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  settings: TI18nSettings;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       1.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings: Partial<TI18nSettings> = {}) {
    this.settings = {
      ...(settings ?? {}),
    };
  }
}
