import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SI18nExtractParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SI18nExtract method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
declare class SI18nExtractParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
        outDir: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
        fileName: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
    };
}
export default SI18nExtractParamsInterface;
