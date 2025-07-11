// import { __dirname, __readJsonSync } from '@blackbyte/sugar/fs';
// import { __packageRootDir } from '@blackbyte/sugar/package';

// import { __getConfig } from '@blackbyte/config';

// // @ts-ignore
// import __Components, {
//   __ComponentsComponent,
//   __ComponentsDependency,
//   type TComponentsComponentsConfigJson,
//   type TComponentsLibrarySettings,
// } from '@blackbyte/components';

// let _components: __Components;

// function setup() {
//   // init a new components instance
//   _components = new __Components();

//   // get the blackbyte file path from this package to register defaults
//   const packageRootDir = __packageRootDir(__dirname()),
//     componentsJson: TComponentsComponentsConfigJson = __readJsonSync(
//       `${packageRootDir}/components.config.json`,
//     );

//   for (let [name, librarySettings] of Object.entries(
//     componentsJson.libraries ?? {},
//   ) as [string, TComponentsLibrarySettings][]) {
//     librarySettings.name = name;
//     _components.registerLibraryFromSettings(
//       <TComponentsLibrarySettings>librarySettings,
//     );
//   }
// }

// export default function __registerCommands(program: any): void {
//   program.hook('preAction', async () => {
//     setup();

//     // @ts-ignore
//     const projectType = _components.getProjectType();
//     console.log(
//       `▓ Project type: <yellow>${projectType.type}</yellow> (<magenta>${projectType.version}</magenta>)`,
//     );
//     console.log(' ');
//   });

//   program.command('components.init').action(async () => {
//     console.log(`▓ Initializing components environment...`);

//     // init components
//     await _components.init();
//   });

//   program.command('components.libraries.ls').action(async () => {
//     console.log(`▓ Listing libraries...`);

//     // list components
//     const libraries = await _components.getLibraries();
//     for (let [libraryName, library] of Object.entries(libraries)) {
//       console.log(`│ <cyan>${libraryName}</cyan>`);
//     }
//     console.log(' ');
//   });

//   program.command('components.ls').action(async () => {
//     const librariesCount = Object.keys(_components.getLibraries()).length;
//     console.log(
//       `▓ Listing components from <yellow>${librariesCount}</yellow> librar${
//         librariesCount > 1 ? 'ies' : 'y'
//       }...`,
//     );

//     // list components
//     const components = await _components.getComponents();

//     let currentPackageName = '';

//     for (let [componentName, component] of Object.entries(components) as [
//       string,
//       any,
//     ][]) {
//       if (currentPackageName !== component.library.name) {
//         currentPackageName = component.library.name;
//         console.log(`│ <cyan>${currentPackageName}</cyan>`);
//       }
//       console.log(
//         `│ - <yellow>${component.name}</yellow> <grey>${component.description}</grey>`,
//       );
//     }
//     console.log(' ');
//   });

//   program
//     .command('components.add')
//     .argument('<componentId>', 'Specify the component id you want to add')
//     .option(
//       '--dir <path>',
//       'Specify the directory to install the component in',
//       `${__packageRootDir()}/components`,
//     )
//     .option('--name <name>', 'Specify a name for the component')
//     .option('--engine', 'Specify the engine to use')
//     .option('-y', 'Specify if you want to answer yes to all questions', false)
//     .action(async (componentId, options) => {
//       console.log(`▓ Adding component <yellow>${componentId}</yellow>...`);

//       // extends options with defaults
//       options = {
//         ...options,
//         ...(__getConfig('components.defaults') ?? {}),
//       };

//       const res = await _components.addComponent(componentId, options);

//       function printComponent(
//         component: __ComponentsDependency | __ComponentsComponent | undefined,
//       ): void {
//         if (!component) {
//           return;
//         }
//         console.log(
//           `│ <yellow>${
//             // @ts-ignore
//             component.component?.name ?? component.name
//           }</yellow> <magenta>${component.version}</magenta>`,
//         );

//         // @ts-ignore
//         if (component.dependencies) {
//           for (let [dependencyId, dependency] of Object.entries(
//             // @ts-ignore
//             component.dependencies,
//           )) {
//             console.log(
//               // @ts-ignore
//               `│ - <cyan>${dependency.type}</cyan> <yellow>${dependency.name}</yellow> <magenta>${component.version}</magenta>`,
//             );
//           }
//         }
//       }

//       if (!res) {
//         return;
//       }

//       console.log(' ');
//       console.log(
//         `▓ Added component${
//           Object.keys(res.addedComponents).length ? 's' : ''
//         }:`,
//       );
//       for (let [componentName, component] of Object.entries(
//         res.addedComponents,
//       )) {
//         printComponent(component);
//       }
//     });

//   program.command('components.update').action(async () => {
//     console.log(`▓ Start updating components libraries...`);

//     // update sources
//     const result = await _components.updateLibraries();

//     let updatedSourcesCount = 0;

//     console.log('│ ');
//     console.log(
//       `▓ Librarie${
//         Object.entries(result.libraries).length ? 's' : ''
//       } updated:`,
//     );
//     for (let [libraryName, library] of Object.entries(result.libraries) as [
//       String,
//       any,
//     ][]) {
//       console.log(
//         `│ - ${library.updated ? '<green>' : ''}${library.name}${
//           library.updated ? '</green>' : ''
//         }`,
//       );
//       updatedSourcesCount += library.updated ? 1 : 0;
//     }
//     const sourcesCount = Object.keys(result.libraries).length;
//     console.log('│');
//     console.log(`▓ Total sources   : <yellow>${sourcesCount}</yellow>`);
//     console.log(`▓ Updated sources : <green>${updatedSourcesCount}</green>`);
//   });
// }
