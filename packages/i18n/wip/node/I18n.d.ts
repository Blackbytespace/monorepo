import __I18n from '../shared/I18n.js';
/**
 * @name                SI18n
 * @namespace           node
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
 * import __I18n from '@coffeekraken/s-si18n';
 * const i18n = new __I18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export interface ISI18nExtractParams {
    glob: string;
    outDir: string;
    fileName: string;
}
export interface ISI18nExtractResult {
}
export default class SI18n extends __I18n {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings?: {});
    /**
     * @name            extract
     * @type            Function
     * @async
     *
     * This async method allows you to extract all the translations from your codebase.
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    extract(params: Partial<ISI18nExtractParams>): Promise<ISI18nExtractResult>;
}
