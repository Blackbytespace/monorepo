import { TSugarCssEnv, TSugarCssSettings } from './sugarcss.types.js';
import { TransformOptions } from 'lightningcss';
export declare const env: TSugarCssEnv;
export declare function sugarize(ligningcss: TransformOptions<any>, settings?: Partial<TSugarCssSettings>): any;
export default function sugarcss(settings?: Partial<TSugarCssSettings>): any;
