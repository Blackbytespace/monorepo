import Docmap, { defaults } from '@blackbyte/docmap';

export default function __registerCommands(program: any): void {
  program
    .command('docmap.build')
    .option(
      '--outPath <path>',
      'Specify the path where to output the generated docmap.json file. Can be multiple paths separated by commas.',
      defaults.build.outPath,
    )
    .option(
      '--outDir <dir>',
      'Specify the directory where to output the generated docmaps',
      defaults.build.outDir,
    )
    .option(
      '--globs <globs>',
      'Specify the globs to use to search for files to parse',
      defaults.build.globs,
    )
    .option(
      '--save',
      'Specify if you want to save the generated files',
      defaults.build.save,
    )
    .option(
      '--mdx',
      'Specify if you want to generate the .mdx files',
      defaults.build.mdx,
    )
    .option(
      '--no-json',
      'Specify if you want to have the .json files generated when setting up the <outDir> option',
      !defaults.build.json,
    )
    .action(async (args) => {
      const docmap = new Docmap();
      await docmap.build(args);
    });
}
