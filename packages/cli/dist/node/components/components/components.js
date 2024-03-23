import __listComponents from './listComponents.js';
export default function __registerCommands(program) {
    program.command('components.ls').action(() => {
        __listComponents();
    });
    program
        .command('components.add <components...> ')
        .description('add one or more components into your project')
        .action((components) => {
        console.log(components);
        console.log('clone command called');
    });
}
//# sourceMappingURL=components.js.map