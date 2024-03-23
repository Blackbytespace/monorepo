class Component {
    static registerSource(id, source) {
        source.id = id;
        this._sources[id] = source;
    }
    static getSources() {
        return this._sources;
    }
    static listComponentsFromSource(sourceId) {
        if (!this._sources[sourceId]) {
            throw new Error(`The requested source "${sourceId}" does not exists. Here's the list of available sources:\n-${Object.keys(this._sources).join('\n-')}`);
        }
    }
}
Component._sources = {};
export default Component;
//# sourceMappingURL=Component.js.map