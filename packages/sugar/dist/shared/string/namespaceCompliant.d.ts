/**
 * @name                namespaceCompliant
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              beta
 *
 * This function take a string and return a version of it that you can safely use
 * as a namespace with just dots and non special characters.
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __namespaceCompliant($1)
 *
 * @todo     tests
 *
 * @example         php
 * import { __namespaceCompliant } from '@lotsof/sugar/string';
 * __namespaceCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TNamespaceCompliantSettings = {
    exclude: string[];
};
export default function __namespaceCompliant(str: string, settings?: TNamespaceCompliantSettings): string;
