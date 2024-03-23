import * as __childProcess from 'child_process';
import { homedir as __homedir } from 'os';
import type {
  IComponentList,
  IComponentListArgs,
  IGitSourceSettings,
} from '../components.types.js';
import ComponentSource from '../Source.js';

export default class GitSource extends ComponentSource {
  private _repositoryUrl: string;
  private _repositoryName: string;

  public settings: IGitSourceSettings = {};

  constructor(
    name: string,
    repositoryUrl: string,
    settings: IGitSourceSettings = {},
  ) {
    super(name);
    this.settings = {
      localDir: `${__homedir()}/.lotsof/components/git`,
      ...settings,
    };
    this._repositoryUrl = repositoryUrl;
    this._repositoryName = (<string>repositoryUrl.split('/').pop()).replace(
      '.git',
      '',
    );
  }

  async update(args?: IComponentListArgs): Promise<IComponentList> {
    // cloning the repo
    const res = await __childProcess.spawnSync(
      `git clone ${this._repositoryUrl} ${this.localDir}`,
      [],
      {
        shell: true,
      },
    );

    const output = res.output?.toString() ?? '';

    if (output.includes('already exists')) {
      console.log(`Updating the "${this._repositoryUrl}" repository...`);
      // try to pull the repo
      const pullRes = await __childProcess.spawnSync(`git pull`, [], {
        cwd: this.localDir,
        shell: true,
      });
      const pullOutput = pullRes.output?.toString() ?? '';
      console.log(pullOutput);
    }

    return {
      source: this.metas,
      components: {},
    };
  }
}
