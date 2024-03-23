import ComponentSource from './Source.js';

export default class Component {
  private static _sources: Record<string, ComponentSource> = {};

  static registerSource(id: string, source: ComponentSource): void {
    source.id = id;
    this._sources[id] = source;
  }

  static getSources(): Record<string, ComponentSource> {
    return this._sources;
  }

  static listComponentsFromSource(sourceId: string): any {
    if (!this._sources[sourceId]) {
      throw new Error(
        `The requested source "${sourceId}" does not exists. Here's the list of available sources:\n-${Object.keys(
          this._sources,
        ).join('\n-')}`,
      );
    }
  }
}
