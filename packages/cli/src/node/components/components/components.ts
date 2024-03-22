import __listComponents from './listComponents';

export default function __registerCommands(program: any): void {
  program.command('components.ls').action(() => {
    __listComponents();
  });
  program
    .command('components.add <components...> ')
    .description('add one or more components into your project')
    .action((components: string[]) => {
      console.log(components);
      console.log('clone command called');
    });
}
