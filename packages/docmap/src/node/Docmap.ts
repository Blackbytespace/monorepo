// @ts-nocheck

import { __getConfig } from '@blackbyte/config';

import { __encodeEntities } from '@blackbyte/sugar/html';

import type { TDocblockSettings } from '@blackbyte/docblock';
import __Docblock from '@blackbyte/docblock';
import { __composerJsonSync } from '@blackbyte/sugar/composer';
import {
  __checkPathWithMultipleExtensions,
  __fileName,
  __folderPath,
  __readJsonSync,
  __writeFileSync,
} from '@blackbyte/sugar/fs';

import { __writeJsonSync } from '@blackbyte/sugar/fs';

import {
  __deepFilter,
  __deepMap,
  __deepMerge,
  __get,
  __set,
  __sort,
  __sortDeep,
} from '@blackbyte/sugar/object';

import __defaults from './defaults.js';

import { __packageJsonSync, __packageRootDir } from '@blackbyte/sugar/package';
import { globSync as __globSync } from 'glob';

import { __namespaceCompliant } from '@blackbyte/sugar/string';
import __fs from 'fs';
import __micromatch from 'micromatch';
import __path from 'path';

function __toLowerCase(l = '') {
  return l.toLowerCase();
}

import { __isPlainObject } from '@blackbyte/sugar/is';
import type {
  TDocmap,
  TDocmapBuildParams,
  TDocmapEntries,
  TDocmapEntry,
  TDocmapMenuObj,
  TDocmapObj,
  TDocmapReadParams,
  TDocmapSearchParams,
  TDocmapSearchResult,
  TDocmapSettings,
  TDocmapTagProxyFn,
} from './types';

/**
 * @name                Docmap
 * @namespace           node
 * @type                Class
 * @platform            node
 * @status              beta
 *
 * This class represent the ```docmap.json``` file and allows you to build it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docmap instance
 *
 * @setting         {Record<String, TDocmapCustomMenuSettingFn>}       [customMenu={}]         Specify some custom menus you want to extract from the docmap.
 * @setting         {Record<String, TDocmapTagProxyFn>}                [tagsProxy={}]          Specify some tags proxy to transform some tags values at BUILD process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __Docmap($1)
 * new __Docmap($1)
 *
 * @example             js
 * import __Docmap from '@blackbyte/s-docmap';
 * const docmap = new __Docmap();
 * await docmap.read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

class Docmap implements TDocmap {
  static _cachedDocmapJson = {};

  static _registeredTagsProxy = {};
  /**
   * @name           registerTagProxy
   * @type            Function
   * @static
   *
   * This static method allows you to register a tag proxy for all the Docmap instances
   *
   * @param               {String}            tag           The tag you want to proxy
   * @param               {TDocmapTagProxyFn}      processor       The processor function
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  static registerTagProxy(tag: string, processor: TDocmapTagProxyFn): any {
    this._registeredTagsProxy[tag] = processor;
  }

  /**
   * @name          settings
   * @type         TDocmapSettings
   * @public
   *
   * Store the settings
   *
   * @since      2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  settings: TDocmapSettings;

  /**
   * @name          _entries
   * @type           TDocmapEntries
   * @private
   *
   * This store the docmap.json entries
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  _entries: TDocmapEntries = {};

  /**
   * @name    _docmapJson
   * @type    Object
   * @private
   *
   * Store the docmap readed with the method "read"
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  _docmapJson: any;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  constructor(settings?: Partial<TDocmapSettings>) {
    this.settings = __deepMerge([
      __defaults.settings,
      __getConfig('docmap.settings') ?? {},
      settings ?? {},
    ]);
    // @ts-ignore
    this.settings.tagsProxy = {
      // @ts-ignore
      ...this.constructor._registeredTagsProxy,
      ...this.settings.tagsProxy,
    };
  }

  /**
   * @name          read
   * @type          Function
   * @async
   *
   * This method allows you to search for docmap.json files and read them to get
   * back the content of them in one call. It can take advantage of the cache if
   *
   * @todo      update documentation
   * @todo      integrate the "cache" feature
   *
   * @param       {TDocmapReadParams}            [params=null]       An TDocmapReadParams object to configure your read process
   * @return      {Promise<TDocmapObj>}                          A promise instance that will be resolved once the docmap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  read(params?: Partial<TDocmapReadParams>): Promise<TDocmapObj> {
    return new Promise(async (resolve) => {
      const finalParams: TDocmapReadParams = __deepMerge([
        __defaults.read,
        __getConfig('docmap.read') ?? {},
        params ?? {},
      ]);

      let docmapVersion = 'current';

      // @ts-ignore
      if (this.constructor._cachedDocmapJson[docmapVersion]) {
        return resolve(
          // @ts-ignore
          this.constructor._cachedDocmapJson[docmapVersion],
        );
      }

      let docmapRootPath = __folderPath(finalParams.input);

      if (!__fs.existsSync(finalParams.input)) {
        return resolve({
          map: {},
          menu: {},
        });
      }

      const packageMonoRoot = __packageRootDir(process.cwd(), {
        highest: true,
      });

      const finalDocmapJson: TDocmapObj = {
        map: {},
        menu: {},
      };

      const loadJson = async (
        packageNameOrPath,
        type: 'npm' | 'composer' = 'npm',
        isDependency = false,
      ) => {
        let currentPathDocmapJsonPath,
          potentialPackageDocmapJsonPath = __path.resolve(
            docmapRootPath,
            type === 'npm' ? 'node_modules' : 'vendor',
            packageNameOrPath,
            'docmap.json',
          ),
          potentialRootPackageDocmapJsonPath = __path.resolve(
            packageMonoRoot,
            type === 'npm' ? 'node_modules' : 'vendor',
            packageNameOrPath,
            'docmap.json',
          );

        if (__fs.existsSync(potentialPackageDocmapJsonPath)) {
          currentPathDocmapJsonPath = potentialPackageDocmapJsonPath;
        } else if (__fs.existsSync(`${packageNameOrPath}/docmap.json`)) {
          currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
        } else if (__fs.existsSync(potentialRootPackageDocmapJsonPath)) {
          currentPathDocmapJsonPath = potentialRootPackageDocmapJsonPath;
        } else {
          return;
        }

        const packageRootPath = currentPathDocmapJsonPath.replace(
          '/docmap.json',
          '',
        );

        // read the docmap file
        const docmapJson = __readJsonSync(currentPathDocmapJsonPath);

        // get package metas
        const packageMetas = __packageJsonSync(packageRootPath);
        Object.keys(docmapJson.map).forEach((namespace) => {
          if (docmapJson.map[namespace]) {
            docmapJson.map[namespace].isDependency = isDependency;
            docmapJson.map[namespace].package = packageMetas;
          }
        });
        Object.keys(docmapJson.generated?.map ?? []).forEach((namespace) => {
          if (docmapJson.generated.map[namespace]) {
            docmapJson.generated.map[namespace].isDependency = isDependency;
            docmapJson.generated.map[namespace].package = packageMetas;
          }
        });

        // add the readed docmap to the existing one
        docmapJson.map = {
          ...(docmapJson.map ?? {}),
          ...(docmapJson.generated?.map ?? {}),
        };

        // clean
        delete docmapJson.generated;

        // resolve the actual docmap "path"
        for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
          const namespace = Object.keys(docmapJson.map)[i];
          const obj = docmapJson.map[namespace];

          obj.path = __path.resolve(packageRootPath, obj.relPath);

          // checking ".dev...."
          let ext = obj.relPath.split('.').pop();
          obj.path =
            __checkPathWithMultipleExtensions(obj.path, [`dev.${ext}`, ext]) ??
            obj.path;

          docmapJson.map[namespace] = obj;
        }

        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
          let blockId = namespace;
          if (!finalDocmapJson.map[blockId]) {
            const docmapEntry: TDocmapEntry = docmapObj as TDocmapEntry;

            // assigning an id to the block.
            // This id is the string used as map property to store the block
            docmapEntry.id = blockId;
            // saving the block into our final docmap map
            finalDocmapJson.map[blockId] = docmapEntry;
          }
        }
      };

      // load package docmap
      const docmapJsonFolderPath = __folderPath(finalParams.input);
      await loadJson(docmapJsonFolderPath);

      // load npm dependencies docmap
      if (finalParams.dependencies) {
        const docmapPackageJson = __packageJsonSync(docmapJsonFolderPath);
        const packageJsonDeps = {
          ...(docmapPackageJson.dependencies ?? {}),
          ...(docmapPackageJson.devDependencies ?? {}),
        };
        for (let [depName, depVersion] of Object.entries(packageJsonDeps)) {
          await loadJson(depName, 'npm', true);
        }
      }

      // load composer dependencies
      const docmapComposerJson = __composerJsonSync(docmapJsonFolderPath);

      if (finalParams.dependencies) {
        const composerJsonDeps = {
          ...(docmapComposerJson?.require ?? {}),
          ...(docmapComposerJson?.requireDev ?? {}),
        };
        for (let [depName, depVersion] of Object.entries(composerJsonDeps)) {
          await loadJson(depName, 'composer', true);
        }
      }

      // save the docmap json
      this._docmapJson = finalDocmapJson;

      // extract the menu
      finalDocmapJson.menu = this._extractMenu(finalDocmapJson);

      // cache it in memory
      // @ts-ignore
      this.constructor._cachedDocmapJson[docmapVersion] = finalDocmapJson;

      // sorting
      finalParams.sort.forEach((dotPath) => {
        const toSort = __get(finalDocmapJson, dotPath);
        if (!toSort) return;
        __set(
          finalDocmapJson,
          dotPath,
          __sort(toSort, (a, b) => {
            return a.key.localeCompare(b.key);
          }),
        );
      });
      finalParams.sortDeep.forEach((dotPath) => {
        const toSort = __get(finalDocmapJson, dotPath);
        if (!toSort) return;
        __set(
          finalDocmapJson,
          dotPath,
          __sortDeep(toSort, (a, b) => {
            return a.key.localeCompare(b.key);
          }),
        );
      });

      // add the "parseDocblocksFromSourceFile" to each elements
      for (let [id, docmapObj] of Object.entries(finalDocmapJson.map)) {
        if (docmapObj.path) {
          docmapObj.parseDocblocksFromSourceFile = async (
            settings?: TDocblockSettings,
          ) => {
            const docblock = new __Docblock(docmapObj.path, settings);
            await docblock.parse();
            return docblock.toObject();
          };
        }
      }

      // return the final docmap
      resolve(finalDocmapJson);
    });
  }

  /**
   * @name          search
   * @type          Function
   *
   * This methodallows you to search for an docmap item by it's slug.
   * You can specify if you want to search also in the "packages" section or not
   *
   * @param           {TDocmapSearchParams}      params          Some params to configure your search
   * @return        {TDocmapSearchResult}                        The result of your search
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  search(params?: Partial<TDocmapSearchParams>): Promise<TDocmapSearchResult> {
    return new Promise(async (resolve) => {
      const finalParams: TDocmapSearchParams = __deepMerge([
        __defaults.search,
        __getConfig('docmap.search') ?? {},
        params ?? {},
      ]);

      const docmapJson = await this.read(finalParams);

      const result: TDocmapSearchResult = {
        search: finalParams,
        items: {},
      };

      for (let [key, item] of Object.entries(docmapJson.map)) {
        let itemMatch = true;

        const props = ['type', 'id', 'slug', 'namespace'];
        for (let i = 0; i < props.length; i++) {
          const prop = props[i];

          if (finalParams[prop] === undefined) {
            continue;
          }

          if (item[prop] === undefined) {
            itemMatch = false;
            break;
          }

          let valueToCheck = item[prop];
          if (prop === 'type') {
            // @ts-ignore
            valueToCheck = item.type?.raw ?? item.type;
          }

          if (finalParams[prop].match(/^\/.*\/$/)) {
            itemMatch = new RegExp(finalParams[prop].slice(1, -1)).test(
              valueToCheck.toLowerCase(),
            );
          } else {
            itemMatch = __micromatch.isMatch(
              valueToCheck.toLowerCase(),
              finalParams[prop].toLowerCase(),
            );
          }

          if (!itemMatch) {
            break;
          }
        }

        if (itemMatch) {
          result.items[item.id] = item;
        }
      }

      resolve(result);
    });
  }

  /**
   * @name          extractMenu
   * @type          Function
   *
   * This method allows you to extract the docmap items that have a "menu" array property and
   * return all of these in a structured object
   *
   * @return        {Record<string: SFile>}       The structured menu tree with an SFile instance attached for each source file
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  _extractMenu(
    docmapJson: Partial<TDocmapObj> = this._docmapJson,
  ): TDocmapMenuObj {
    const docmapJsonMenuByPackage = {};

    // split menus by packages
    // @ts-ignore
    Object.keys(docmapJson.map).forEach((namespace) => {
      // @ts-ignore
      const docmapObj = docmapJson.map[namespace];
      if (!docmapObj.menu) return;
      if (!docmapJsonMenuByPackage[docmapObj.package.name]) {
        docmapJsonMenuByPackage[docmapObj.package.name] = [];
      }
      docmapJsonMenuByPackage[docmapObj.package.name].push(docmapObj);
    });

    let finalMenu: TDocmapMenuObj = {
      packages: {},
      tree: {},
      slug: {},
      custom: {},
    };
    const packageJson = __packageJsonSync();

    Object.keys(docmapJsonMenuByPackage).forEach((packageName) => {
      const menuObj = this._extractMenuFromDocmapJsonStack(
        docmapJsonMenuByPackage[packageName],
      );

      if (packageName === packageJson.name) {
        finalMenu = {
          ...finalMenu,
          ...menuObj,
        };
      } else {
        const scopedSlugMenu = {};
        Object.keys(menuObj.slug).forEach((slug) => {
          scopedSlugMenu[`/package/${packageName}${slug}`] = {
            ...menuObj.slug[slug],
            slug: `/package/${packageName}${slug}`,
          };
        });
        // @ts-ignore
        finalMenu.packages[packageName] = {
          name: packageName,
          tree: __deepMap(menuObj.tree, ({ prop, value }) => {
            if (prop === 'slug') return `/package/${packageName}${value}`;
            return value;
          }),
          slug: scopedSlugMenu,
        };
      }
    });

    Object.keys(this.settings.customMenu).forEach((menuName) => {
      if (!finalMenu.custom[menuName]) finalMenu.custom[menuName] = {};
      // @ts-ignore
      finalMenu.custom[menuName].tree = __deepFilter(
        finalMenu.tree,
        // @ts-ignore
        this.settings.customMenu[menuName],
      );
      // @ts-ignore
      finalMenu.custom[menuName].slug = __deepFilter(
        finalMenu.slug,
        // @ts-ignore
        this.settings.customMenu[menuName],
      );

      Object.keys(finalMenu.packages).forEach((packageName) => {
        const packageObj = finalMenu.packages[packageName];
        // @ts-ignore
        const packageFilteredTree = __deepFilter(
          packageObj.tree,
          // @ts-ignore
          this.settings.customMenu[menuName],
        );
        finalMenu.custom[menuName].tree = __deepMerge([
          finalMenu.custom[menuName].tree,
          packageFilteredTree,
        ]);
        // @ts-ignore
        const packageFilteredSlug = __deepFilter(
          packageObj.slug,
          // @ts-ignore
          this.settings.customMenu[menuName],
        );
        finalMenu.custom[menuName].slug = __deepMerge([
          finalMenu.custom[menuName].slug,
          packageFilteredSlug,
        ]);
      });
    });

    // @ts-ignore
    return finalMenu;
  }

  _extractMenuFromDocmapJsonStack(docmapJsonMap) {
    const menuObj = {},
      menuObjBySlug = {},
      menuObjByPackage = {};

    // extract menus
    Object.keys(docmapJsonMap).forEach((namespace) => {
      const docmapObj = docmapJsonMap[namespace];

      if (!docmapObj.menu) return;

      const dotPath = docmapObj.menu.tree
        .map((l) => {
          return __toLowerCase(l);
        })
        .join('.');

      let currentObj = menuObj;

      dotPath.split('.').forEach((part, i) => {
        if (!currentObj[part]) {
          currentObj[part] = {
            name: docmapObj.menu.tree[i],
          };
        }

        if (i >= dotPath.split('.').length - 1) {
          currentObj[part][docmapObj.name] = {
            name: docmapObj.name,
            as: docmapObj.as,
            slug: docmapObj.menu.slug,
            tree: docmapObj.menu.tree,
            // docmap: docmapObj
          };
          menuObjBySlug[docmapObj.menu.slug] = {
            name: docmapObj.name,
            as: docmapObj.as,
            slug: docmapObj.menu.slug,
            tree: docmapObj.menu.tree,
            docmap: docmapObj,
          };
        }

        currentObj = currentObj[part];
      });
    });

    return {
      tree: menuObj,
      slug: menuObjBySlug,
    };
  }

  /**
   * @name          build
   * @type          Function
   *
   * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
   * and extract all the necessary informations to build the docmap.json file
   *
   * @param         {Partial<TDocmapBuildParams>}          params        The params to use to build your docmap
   * @return        {Promise}                                     A promise resolved once the scan process has been finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  build(params?: Partial<TDocmapBuildParams>): Promise<any> {
    const finalParams: TDocmapBuildParams = __deepMerge([
      __defaults.build,
      __getConfig('docmap.build') ?? {},
      params ?? {},
    ]);

    return new Promise(async (resolve) => {
      let docmapJson = {
        map: {},
        generated: {
          map: {},
        },
      };

      const packageRoot = __packageRootDir();
      const packageMonoRoot = __packageRootDir(process.cwd(), {
        highest: true,
      });

      // check if a file already exists
      if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
        const currentDocmapJson = __readJsonSync(`${packageRoot}/docmap.json`);
        docmapJson = currentDocmapJson;
        docmapJson.generated = {
          map: {},
        };
      }

      console.log(
        `<yellow>[build]</yellow> Building map by searching for files inside the current package`,
      );

      // clear if needed
      if (finalParams.clear) {
        if (finalParams.outDir) {
          try {
            __fs.rmSync(finalParams.outDir, {
              recursive: true,
            });
          } catch (e) {}
        }
        if (typeof finalParams.outPath === 'string') {
          try {
            __fs.rmSync(finalParams.outPath);
          } catch (e) {}
        }
      }

      // searching inside the current package for docblocks to use
      const filesInPackage = __globSync(finalParams.globs, {
        cwd: packageRoot,
        ignore: finalParams.exclude,
      });

      console.log(
        `<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`,
      );

      for (let i = 0; i < filesInPackage.length; i++) {
        const filePath = filesInPackage[i];

        console.log(
          `<yellow>[build]</yellow> Parsing file "<cyan>${__path.relative(
            __packageRootDir(),
            // @ts-ignore
            filePath,
          )}</cyan>"`,
        );

        const docblocksInstance = new __Docblock(filePath, {
          ...(this.settings.docblock?.settings ?? {}),
          filepath: filePath,
        });

        await docblocksInstance.parse();

        const docblocks = docblocksInstance.toObject();

        if (!docblocks || !docblocks.length) continue;

        let docblockObj: any = {};
        const children: any = {};
        for (let j = 0; j < docblocks.length; j++) {
          const docblock = docblocks[j];

          let matchFilters = false;

          for (
            let k = 0;
            // @ts-ignore
            k < Object.keys(finalParams.excludeByTags).length;
            k++
          ) {
            const key = Object.keys(finalParams.excludeByTags)[k];
            let filterRegs =
              // @ts-ignore
              finalParams.excludeByTags[key];
            if (!Array.isArray(filterRegs)) {
              filterRegs = [filterRegs];
            }

            // @ts-ignore
            let value = docblock[key];

            // do not take care of undefined value
            if (value === undefined) continue;

            // if the "toString" method is a custom one
            // calling it to have the proper string value back
            if (
              typeof value !== 'string' &&
              value.toString?.() !== '[object Object]'
            ) {
              value = value.toString();
            }

            // check if the value match the filter or not
            // if not, we do not take the docblock
            if (typeof value === 'string') {
              filterRegs.forEach((reg) => {
                if (value.match(reg)) {
                  matchFilters = true;
                } else {
                }
              });
              if (matchFilters) {
                break;
              }
            }
          }

          // exclude this item if match any of the excludeByTags filters
          if (matchFilters) {
            continue;
          }

          if (docblock.name && docblock.name.slice(0, 1) === '_') continue;
          if (docblock.private) continue;

          // const path = __path.relative(outputDir, filepath);
          const filename = __fileName(filePath);

          const docblockEntryObj: TDocmapEntry = {
            id: 'undefined',
          };

          for (let l = 0; l < finalParams.tags.length; l++) {
            const tag = finalParams.tags[l];
            if (docblock[tag] === undefined) continue;
            // props proxy
            if (this.settings.tagsProxy[tag]) {
              docblockEntryObj[tag] = await this.settings.tagsProxy[tag](
                docblock[tag],
              );
            } else {
              docblockEntryObj[tag] = docblock[tag];
            }
          }

          const dotPath = __namespaceCompliant(
            `${docblock.namespace}.${docblock.name}`,
          );

          if (docblock.namespace && !this._entries[dotPath]) {
            docblockObj = {
              ...docblockEntryObj,
              filename,
              extension: filename.split('.').slice(1)[0],
              relPath: __path.relative(__packageRootDir(), filePath),
            };
            this._entries[dotPath] = docblockObj;
          } else if (docblock.name) {
            children[__toLowerCase(docblock.name)] = docblockEntryObj;
          }
        }
        docblockObj.children = children;
      }

      console.log(
        `<yellow>[build]</yellow> <green>${
          Object.keys(this._entries).length
        }</green> entries gathered for this docmap`,
      );

      // save entries inside the json map property
      docmapJson.generated.map = this._entries;

      if (finalParams.save) {
        // save indivudual files
        // into the outDir
        if (finalParams.outDir || typeof finalParams.outPath === 'function') {
          for (let [namespace, docmapObj] of Object.entries(
            docmapJson.generated.map,
          )) {
            let finalOutPath;

            if (typeof finalParams.outPath === 'function') {
              finalOutPath = finalParams.outPath(docmapObj, this.settings);
            } else {
              finalOutPath = `${__path.resolve(
                finalParams.outDir,
                docmapObj.id.replace(/\./gm, '/'),
              )}.json`;
            }

            // json
            if (finalParams.json) {
              __writeJsonSync(finalOutPath, docmapObj);
              console.log(
                `<green>[save]</green> JSON file saved <green>successfully</green> under "<cyan>${outPath.replace(
                  __packageRootDir() + '/',
                  '',
                )}</cyan>"`,
              );
            }

            // mdx
            if (finalParams.mdx) {
              // update outpath
              const mdxOutPath = finalOutPath.replace(/\.json$/, '.mdx');
              // transform to mdx
              const mdx = this.toMdx(docmapObj);
              // write to disk
              __writeFileSync(mdxOutPath, mdx);
              console.log(
                `<green>[save]</green> MDX file saved <green>successfully</green> under "<cyan>${mdxOutPath.replace(
                  __packageRootDir() + '/',
                  '',
                )}</cyan>"`,
              );
            }
          }
        }

        // save the docmap.json file if wanted
        if (typeof finalParams.outPath === 'string') {
          __fs.writeFileSync(
            finalParams.outPath,
            JSON.stringify(docmapJson, null, 4),
          );
          console.log(
            `<green>[save]</green> docmap.json file saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(
              __packageRootDir() + '/',
              '',
            )}</cyan>"`,
          );
        }
      }

      resolve(docmapJson);
    });
  }

  toMdx(docmapObj: TDocmapObj): string {
    const result: string[] = [];

    function encodeEntities(str: string): string {
      if (typeof str !== 'string') {
        str = `${str}`;
      }
      return __encodeEntities(str);
    }

    result.push('---');
    result.push(`title: '${docmapObj.name}'`);
    result.push(`namespace: '${docmapObj.namespace}'`);
    if (docmapObj.description) {
      result.push(
        `description: '${docmapObj.description.split('\n').join(' ')}'`,
      );
    }
    if (docmapObj.type) {
      result.push(`type: '${encodeEntities(docmapObj.type.raw ?? '')}'`);
    }
    if (docmapObj.status) {
      result.push(`status: '${docmapObj.status}'`);
    }
    if (docmapObj.since) {
      result.push(`since: '${docmapObj.since}'`);
    }
    if (docmapObj.platform) {
      result.push(
        `platform: '${JSON.stringify(
          docmapObj.platform.sort((a, b) => a.name.localeCompare(b.name)),
        )}'`,
      );
    }
    if (docmapObj.support) {
      result.push(
        `support: '${JSON.stringify(
          docmapObj.support.sort((a, b) => a.name.localeCompare(b.name)),
        )}'`,
      );
    }
    if (docmapObj.author) {
      result.push(`author: '${JSON.stringify(docmapObj.author)}'`);
    }
    result.push('---');

    result.push('<div class="docmap-mdx">');

    result.push(`# ${docmapObj.name}`);

    // metas (type, status, since, platform)
    if (docmapObj.status || docmapObj.since || docmapObj.platform) {
      result.push('<div class="_metas">');
    }
    if (docmapObj.type) {
      result.push(
        `<div class="_type"><span class="_type-label">Type:</span><span class="_type-value">${encodeEntities(
          docmapObj.type.raw ?? docmapObj.type ?? '',
        )}</span></div>`,
      );
    }
    if (docmapObj.status) {
      result.push(
        `<div class="_status"><span class="_status-label">Status:</span><span class="_status-value -${docmapObj.status}">${docmapObj.status}</span></div>`,
      );
    }
    if (docmapObj.since) {
      result.push(
        `<div class="_since"><span class="_since-label">Since:</span><span class="_since-value">${docmapObj.since}</span></div>`,
      );
    }
    if (docmapObj.platform) {
      result.push(
        `<div class="_platform"><span class="_platform-label">Platform:</span>${docmapObj.platform
          .map(
            (p) => `<span class="_platform-value -${p.name}">${p.name}</span>`,
          )
          .join('')}</div>`,
      );
    }
    if (docmapObj.status || docmapObj.since || docmapObj.platform) {
      result.push('</div>');
    }

    // namespace
    result.push(`<div class="_namespace">${docmapObj.namespace}</div>`);

    // description
    if (docmapObj.description) {
      result.push('<div class="_description typo-lead typo-format">');
      result.push(docmapObj.description);
      result.push('</div>');
    }

    // params
    if (docmapObj.param) {
      result.push('<div class="_params">');
      result.push('## Params');

      result.push(`<ol class="_list">`);
      Object.entries(docmapObj.param).forEach(([id, paramObj], i) => {
        // handle default value
        let defaultStr = paramObj.default ?? '-';
        if (__isPlainObject(paramObj)) {
          defaultStr = JSON.stringify(paramObj.default, null, 4);
        }

        result.push('<li class="_item">');
        result.push(
          `<span class="_name">${paramObj.name}${
            paramObj.default === undefined
              ? '<span class="_required">*</span>'
              : ''
          }</span><span class="_default">${encodeEntities(
            defaultStr ?? '-',
          )}</span> <span class="_type">${encodeEntities(
            paramObj.type.raw ?? '',
          )}</span>`,
        );
        result.push(
          `<p class="_description">${encodeEntities(
            paramObj.description ?? '',
          )}</p>`,
        );
        result.push('</li>');
      });
      result.push('</ol>');

      result.push('</div>');
    }

    // return
    if (docmapObj.return) {
      result.push('<div class="_return">');

      result.push(`## Return`);

      result.push('<ol class="_list">');
      result.push('<li class="_item">');
      result.push(
        `<span class="_default">${
          docmapObj.return.default ?? '-'
        }</span><span class="_type">${encodeEntities(
          docmapObj.return.type.raw ?? '',
        )}</span>`,
      );
      result.push(
        `<p class="_description">${encodeEntities(
          docmapObj.return.description ?? '',
        )}</p>`,
      );

      result.push('</li>');
      result.push('</ol>');

      result.push('</div>');
    }

    // examples
    if (docmapObj.example?.length) {
      result.push('<div class="_examples">');

      result.push(`## sssExample${docmapObj.example.length > 1 ? 's' : ''}`);
      docmapObj.example.forEach((exampleObj) => {
        result.push(`\`\`\`${exampleObj.language}`);
        result.push(exampleObj.code);
        result.push(`\`\`\``);
      });

      result.push('</div>');
    }

    // settings
    if (docmapObj.setting) {
      result.push('<div class="_settings">');
      result.push('## Settings');

      result.push(`<ol class="_list">`);
      Object.entries(docmapObj.setting).forEach(([id, settingObj], i) => {
        result.push('<li class="_item">');
        result.push(
          `<span class="_name">${settingObj.name}${
            settingObj.default === undefined
              ? '<span class="_required">*</span>'
              : ''
          }</span><span class="_default">${encodeEntities(
            settingObj.default ?? '-',
          )}</span> <span class="_type">${encodeEntities(
            settingObj.type.raw ?? '',
          )}</span>`,
        );
        result.push(`<p class="_description">${settingObj.description}</p>`);
        result.push('</li>');
      });
      result.push('</ol>');

      result.push('</div>');
    }

    // todo
    if (docmapObj.todo) {
      result.push('<div class="_todo">');

      result.push(`## Todo`);

      result.push('<ul class="_list">');
      docmapObj.todo.forEach((todo) => {
        result.push('<li class="_item">');
        result.push(`<span class="_description">${todo.description}</span>`);
        if (todo.priority) {
          result.push(
            `<span class="_priority -${todo.priority}">${todo.priority}</span>`,
          );
        }
        result.push('</li>');
      });
      result.push('</ul>');

      result.push('</div>');
    }

    // author
    if (docmapObj.author) {
      result.push('<div class="_author">');

      result.push('## Author');

      result.push('<ul class="_list">');
      result.push('<li class="_item">');
      result.push(`<span class="_name">${docmapObj.author.name}</span>`);
      if (docmapObj.author.email) {
        result.push(`<span class="_email">${docmapObj.author.email}</span>`);
      }
      if (docmapObj.author.url) {
        result.push(
          `<a href="${docmapObj.author.url}" target="_blank" class="_url">${docmapObj.author.url}</a>`,
        );
      }
      result.push('</li>');
      result.push('</ul>');

      result.push('</div>');
    }

    // contributor
    if (docmapObj.contributor) {
      result.push('<div class="_contributors">');

      result.push(
        `## Contributor${docmapObj.contributor.length > 1 ? 's' : ''}`,
      );

      result.push('<ul class="_list">');
      docmapObj.contributor.forEach((contributorObj) => {
        result.push('<li class="_item">');
        result.push(`<span class="_name">${contributorObj.name}</span>`);
        if (contributorObj.email) {
          result.push(`<span class="_email">${contributorObj.email}</span>`);
        }
        if (contributorObj.url) {
          result.push(
            `<a href="${contributorObj.url}" target="_blank" class="_url">${contributorObj.url}</a>`,
          );
        }
        result.push('</li>');
      });
      result.push('</ul>');

      result.push('</div>');
    }

    result.push('</div>');

    return result.join('\n');
  }
}

export default Docmap;
