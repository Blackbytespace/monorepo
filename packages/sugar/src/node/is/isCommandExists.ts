import { spawnSync } from 'child_process';

/**
 * @name            isCommandExists
 * @namespace       node.is
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function allows you to check if a command exists on the system where the script is running
 *
 * @todo        tests
 *
 * @param       {String}            command         The command to check like "ls", "node", etc...
 * @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
 *
 * @snippet         __isCommandExists($1)
 * await __isCommandExists($1)
 *
 * @example         js
 * import { __isCommandExists } from '@blackbyte/sugar/is';
 * await  __isCommandExists('ls'); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default async function __isCommandExists(
  command: string,
): Promise<boolean | string> {
  const isWin = process.platform === 'win32';
  const where = isWin ? 'where' : 'whereis';

  const out = spawnSync(where + ' ' + command, [], {
    encoding: 'utf8',
    shell: true,
  });
  if (!out.stdout) return false;
  return out.stdout.replace(`${command}:`, '').trim() !== '';
}
