#!/usr/bin/env -S node --experimental-json-modules --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution=node

import { __parseHtml } from '@lotsof/sugar/console';
import { Command as __Command } from 'commander';
import __figlet from 'figlet';

// @ts-ignore
import __packageJson from '../../package.json' with { type: 'json' };

import { __loadConfig } from '@lotsof/config';
// import __registerComponentsCommands from './modules/components/components.api.js';
import __registerDocmapCommands from './modules/docmap/docmap.api.js';
import __registerFactoryCommands from './modules/factory/factory.api.js';
import __registerPuppetCommands from './modules/puppet/puppet.api.js';

const nativeConsoleLog = console.log;
console.log = (...args): void => {
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      arg = __parseHtml(arg);
    }
    nativeConsoleLog(arg);
  });
};

const program = new __Command();

console.log(__figlet.textSync('Lotsof'));

program.version(__packageJson.version).description(__packageJson.description);

program.hook('preAction', async () => {
  await __loadConfig();
});

// register commands
__registerDocmapCommands(program);
// __registerComponentsCommands(program);
__registerFactoryCommands(program);
__registerPuppetCommands(program);

program.parse(process.argv);
