// @ts-nocheck

import type { TPuppetConfig } from '@blackbyte/puppet';
import __Puppet from '@blackbyte/puppet';

import { __getConfig } from '@blackbyte/config';

let puppetConfig: TPuppetConfig;

let _puppet: __Puppet;

function setup() {
  puppetConfig = __getConfig().puppet;
  _puppet = new __Puppet(puppetConfig.settings);
}

export default function __registerCommands(program: any): void {
  program.hook('preAction', async () => {
    setup();
  });

  program
    .command('puppet.shot')
    .option('-u, --url <url>', 'Specify the url to take a screenshot of')
    .option('--vw <number>', 'Specify the width of the viewport', parseInt)
    .option('--vh <number>', 'Specify the height of the viewport', parseInt)
    .option(
      '-w, --width <number>',
      'Specify the width of the screenshot',
      parseInt,
    )
    .option(
      '-h, --height <number>',
      'Specify the height of the screenshot',
      parseInt,
    )
    .option(
      '-s, --selector <string>',
      'Specify a css selector to take a screenshot of',
    )
    .option(
      '--themeFiles <string>',
      'Specify the path to the theme files. Can be a glob pattern',
    )
    .action(async (options) => {
      console.log(`▓ Making a screenshot...`);

      // extends options with defaults
      options = {
        ...puppetConfig.screenshot,
        ...options,
      };

      await _puppet.screenshot(options);
    });
}
