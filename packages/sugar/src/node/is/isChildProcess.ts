// @ts-nocheck

/**
 * @name                isChildProcess
 * @namespace           shared.is
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
 *
 * @todo      tests
 *
 * @snippet         __isChildProcess()
 *
 * @example       js
 * import { __isChildProcess } from '@coffeekraken/sugar/is';
 * __isChildProcess(); // => false
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isChildProcess(): boolean {
  return (
    process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined
  );
}
