import __fs from 'fs';

/**
 * @name            detectProjectType
 * @namespace       node.project
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to detect the project type like "next", "nuxt", etc...
 * If the project type is not detected, it will return "generic" for the type and "1.0.0" for the version.
 *
 * @param       {String}            [cwd=process.cwd()]         The root project directory to detect the type from
 * @return      {IDetectProjectTypeResult}                      An object that describe the detected project type
 *
 * @snippet         __detectProjectType()
 *
 * @example         js
 * import { __detectProjectType } from '@coffeekraken/sugar/project';
 * __detectProjectType();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export type TDetectProjectTypeResult = {
  type: string;
  version: string;
  rawVersion: string;
  major: number;
  minor: number;
  fix: number;
};

export default function detectProjectType(
  cwd = process.cwd(),
): TDetectProjectTypeResult {
  const packageJson = JSON.parse(
    __fs.readFileSync(`${cwd}/package.json`, 'utf8').toString(),
  );

  // detecting the package type next
  if (
    __fs.existsSync(`${cwd}/next.config.js`) ||
    __fs.existsSync(`${cwd}/next.config.mjs`) ||
    __fs.existsSync(`${cwd}/next.config.ts`)
  ) {
    const version = packageJson.dependencies.next.replace(/\^/, '');
    return {
      type: 'next',
      version,
      rawVersion: packageJson.dependencies.next,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type nuxt
  if (
    __fs.existsSync(`${cwd}/nuxt.config.js`) ||
    __fs.existsSync(`${cwd}/nuxt.config.mjs`) ||
    __fs.existsSync(`${cwd}/nuxt.config.ts`)
  ) {
    const version = packageJson.dependencies.nuxt.replace(/\^/, '');
    return {
      type: 'nuxt',
      version,
      rawVersion: packageJson.dependencies.nuxt,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  // detecting the package type astro
  if (
    __fs.existsSync(`${cwd}/astro.config.js`) ||
    __fs.existsSync(`${cwd}/astro.config.mjs`) ||
    __fs.existsSync(`${cwd}/astro.config.ts`)
  ) {
    const version = packageJson.dependencies.astro.replace(/\^/, '');
    return {
      type: 'astro',
      version,
      rawVersion: packageJson.dependencies.astro,
      major: parseInt(version.split('.')[0]),
      minor: parseInt(version.split('.')[1]),
      fix: parseInt(version.split('.')[2]),
    };
  }

  return {
    type: 'unknown',
    version: '1.0.0',
    rawVersion: '1.0.0',
    major: 1,
    minor: 0,
    fix: 0,
  };
}
