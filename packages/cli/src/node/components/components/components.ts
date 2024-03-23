import __Components from './Component.js';
import __GitSource from './sources/GitSource.js';

const DEFAULTS = {
  sources: {
    lotsofGitComponents: new __GitSource(
      'Github lotsof',
      'git@github.com:lotsofdev/components.git',
    ),
  },
};

for (let [id, source] of Object.entries(DEFAULTS.sources)) {
  __Components.registerSource(id, source);
}

export default function __registerCommands(program: any): void {
  program.command('components.ls').action(async () => {
    const sources = __Components.getSources();

    console.log(
      `Listing components from ${Object.keys(sources).length} source(s)...`,
    );

    // updating sources
    for (let [sourceId, source] of Object.entries(sources)) {
      await source.update();
    }

    // list components from source
    for (let [sourceId, source] of Object.entries(sources)) {
      const components = await source.listComponents();
    }
  });
  program
    .command('components.add <components...> ')
    .description('add one or more components into your project')
    .action((components: string[]) => {
      console.log(components);
      console.log('clone command called');
    });
}
